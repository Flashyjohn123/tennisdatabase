// Service for fetching, parsing, and streaming live and recent tournament match scores from ESPN Tennis API
import { useState, useEffect, useCallback } from 'react';

export interface ScoreboardCompetitor {
  name: string;
  seed?: string;
  winner?: boolean;
  sets: number[];
}

export interface LiveScoreboardMatch {
  id: string;
  tournamentName: string;
  round: string;
  surface: string;
  tour: 'ATP' | 'WTA';
  status: string;
  state: 'in' | 'post' | 'pre';
  isLive: boolean;
  player1: ScoreboardCompetitor;
  player2: ScoreboardCompetitor;
  scoreText: string;
  court?: string;
}

const STORAGE_KEY_SCOREBOARD = 'tennisdb_live_scoreboard_v2';
const STORAGE_KEY_SCOREBOARD_TIME = 'tennisdb_live_scoreboard_time_v2';

const CORS_PROXIES = [
  (url: string) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  (url: string) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
  (url: string) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`,
];

async function fetchEspnScores(tour: 'atp' | 'wta'): Promise<any> {
  const targetUrl = `https://site.api.espn.com/apis/site/v2/sports/tennis/${tour}/scoreboard`;
  
  // Try local Vite proxy in dev mode first
  if (import.meta.env.DEV) {
    try {
      const res = await fetch(`/api/proxy/espn-scoreboard-${tour}`, {
        headers: { Accept: 'application/json' },
      });
      if (res.ok) return await res.json();
    } catch {
      // Fall through to direct or CORS
    }
  }

  // Try direct fetch
  try {
    const res = await fetch(targetUrl, {
      headers: {
        'Accept': 'application/json',
      },
    });
    if (res.ok) return await res.json();
  } catch {
    // Continue to proxies
  }

  // Try CORS proxies in production
  for (const proxy of CORS_PROXIES) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);
      const res = await fetch(proxy(targetUrl), { signal: controller.signal });
      clearTimeout(timeoutId);
      if (res.ok) return await res.json();
    } catch {
      continue;
    }
  }

  return null;
}

export function parseEspnScoreboard(data: any, tour: 'ATP' | 'WTA'): LiveScoreboardMatch[] {
  if (!data || !data.events) return [];
  const matches: LiveScoreboardMatch[] = [];

  for (const event of data.events) {
    const tournamentName = event.name || `${tour} Tour Event`;
    const venueName = event.venue?.fullName || '';
    
    // Guess surface based on venue/name if possible
    let surface = 'Hard';
    const lower = (tournamentName + ' ' + venueName).toLowerCase();
    if (lower.includes('clay') || lower.includes('garros') || lower.includes('rome') || lower.includes('madrid') || lower.includes('monte carlo')) {
      surface = 'Clay';
    } else if (lower.includes('grass') || lower.includes('wimbledon') || lower.includes('halle') || lower.includes('queens')) {
      surface = 'Grass';
    }

    for (const grp of event.groupings || []) {
      for (const comp of grp.competitions || []) {
        const c1 = comp.competitors?.[0];
        const c2 = comp.competitors?.[1];
        if (!c1 || !c2) continue;

        const p1Name = c1.athlete?.displayName || 'TBD';
        const p2Name = c2.athlete?.displayName || 'TBD';
        const p1Sets: number[] = (c1.linescores || []).map((l: any) => Number(l.value) || 0);
        const p2Sets: number[] = (c2.linescores || []).map((l: any) => Number(l.value) || 0);
        
        const state = (comp.status?.type?.state || 'pre') as 'in' | 'post' | 'pre';
        const status = comp.status?.type?.detail || comp.status?.type?.description || (state === 'in' ? 'Live' : 'Final');
        const isLive = state === 'in';

        // Build score summary e.g. "6-4, 3-6, 7-6"
        const maxSets = Math.max(p1Sets.length, p2Sets.length);
        const scoreParts: string[] = [];
        for (let i = 0; i < maxSets; i++) {
          const s1 = p1Sets[i] ?? 0;
          const s2 = p2Sets[i] ?? 0;
          scoreParts.push(`${s1}-${s2}`);
        }
        const scoreText = scoreParts.length > 0 ? scoreParts.join(', ') : 'Upcoming';

        matches.push({
          id: comp.id || `${tour}-${Math.random().toString(36).slice(2, 8)}`,
          tournamentName,
          round: comp.type?.text || 'Singles',
          surface,
          tour,
          status,
          state,
          isLive,
          player1: {
            name: p1Name,
            sets: p1Sets,
            winner: c1.winner,
          },
          player2: {
            name: p2Name,
            sets: p2Sets,
            winner: c2.winner,
          },
          scoreText,
          court: comp.venue?.court || undefined,
        });
      }
    }
  }

  return matches;
}

export function useLiveScoreboard() {
  const [matches, setMatches] = useState<LiveScoreboardMatch[]>(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY_SCOREBOARD);
      if (cached) return JSON.parse(cached);
    } catch {}
    return [];
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_SCOREBOARD_TIME);
    } catch {}
    return null;
  });

  const refresh = useCallback(async () => {
    setIsLoading(true);
    try {
      const [atpData, wtaData] = await Promise.all([
        fetchEspnScores('atp'),
        fetchEspnScores('wta'),
      ]);

      const atpMatches = parseEspnScoreboard(atpData, 'ATP');
      const wtaMatches = parseEspnScoreboard(wtaData, 'WTA');
      const combined = [...atpMatches, ...wtaMatches];

      if (combined.length > 0) {
        setMatches(combined);
        const now = new Date().toISOString();
        setLastUpdated(now);
        try {
          localStorage.setItem(STORAGE_KEY_SCOREBOARD, JSON.stringify(combined.slice(0, 100)));
          localStorage.setItem(STORAGE_KEY_SCOREBOARD_TIME, now);
        } catch {}
      }
    } catch (e) {
      console.warn('Scoreboard fetch error:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
    // Auto-refresh every 60 seconds
    const interval = setInterval(refresh, 60000);
    return () => clearInterval(interval);
  }, [refresh]);

  const liveMatches = matches.filter(m => m.isLive);
  const recentMatches = matches.filter(m => m.state === 'post');
  const featuredMatch = liveMatches[0] || recentMatches[0] || null;

  return {
    matches,
    liveMatches,
    recentMatches,
    featuredMatch,
    isLoading,
    lastUpdated,
    refresh,
  };
}
