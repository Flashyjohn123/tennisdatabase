import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Player, Tour, Match, PlayerRankSummary, AtpLiveRankEntry } from './types/tennis';
import { INITIAL_PLAYERS } from './data/playersData';
import { INITIAL_TOURNAMENTS } from './data/tournamentsData';
import { INITIAL_MATCHES } from './data/matchesData';
import { CommandRail, CommandBar } from './components/Navbar';
import { LiveFeedTicker } from './components/LiveFeedTicker';
import { OverviewView } from './components/OverviewView';
import { PlayerDetailModal } from './components/PlayerDetailModal';
import { useAtpLiveRankings } from './services/atpLiveRankingsService';
import { playerService } from './services/playerService';
import {
  SeasonKey,
  SeasonPreference,
  getStoredSeasonPreference,
  setStoredSeasonPreference,
  resolveActiveSeason,
  applySeasonThemeToDom,
  SEASONS_DATA,
} from './services/seasonThemeService';

// Lazy-loaded secondary route modules for optimal bundle code-splitting
const LiveNewsroomView = lazy(() => import('./components/LiveNewsroomView').then(m => ({ default: m.LiveNewsroomView })));
const PlayersView = lazy(() => import('./components/PlayersView').then(m => ({ default: m.PlayersView })));
const HeadToHeadView = lazy(() => import('./components/HeadToHeadView').then(m => ({ default: m.HeadToHeadView })));
const TournamentsView = lazy(() => import('./components/TournamentsView').then(m => ({ default: m.TournamentsView })));
const RankingsView = lazy(() => import('./components/RankingsView').then(m => ({ default: m.RankingsView })));
const MatchesView = lazy(() => import('./components/MatchesView').then(m => ({ default: m.MatchesView })));

export const App: React.FC = () => {
  // Surface Season Theme State
  const [seasonPreference, setSeasonPreferenceState] = useState<SeasonPreference>(getStoredSeasonPreference);
  const [activeSeason, setActiveSeason] = useState<SeasonKey>(() => resolveActiveSeason(getStoredSeasonPreference()));

  // Apply Season Theme to Document Root whenever active season changes
  useEffect(() => {
    applySeasonThemeToDom(activeSeason);
  }, [activeSeason]);

  const handleSeasonPreferenceChange = (newPref: SeasonPreference) => {
    setSeasonPreferenceState(newPref);
    setStoredSeasonPreference(newPref);
    const resolved = resolveActiveSeason(newPref);
    setActiveSeason(resolved);
    applySeasonThemeToDom(resolved);
  };

  // ATP Live Rankings Hook
  const {
    atpLiveRankings,
    isSyncing: isSyncingLive,
    lastSynced: lastSyncedLive,
    syncLiveRankings,
    isLiveSource,
  } = useAtpLiveRankings();

  // State for Players, Matches, and Tournaments with LocalStorage Persistence (v9 2026 season)
  const [players, setPlayers] = useState<Player[]>(() => {
    const saved = localStorage.getItem('tennisdb_players_v9');
    if (saved) {
      try {
        const parsed: Player[] = JSON.parse(saved);
        // Ensure official avatar URLs and injury histories from INITIAL_PLAYERS are always applied
        const initialMap = new Map(INITIAL_PLAYERS.map(p => [p.id, p.avatarUrl]));
        const initialInjuryMap = new Map(INITIAL_PLAYERS.map(p => [p.id, p.injuryHistory]));
        return parsed.map(p => ({
          ...p,
          avatarUrl: initialMap.get(p.id) || p.avatarUrl,
          injuryHistory: initialInjuryMap.get(p.id) || p.injuryHistory,
        }));
      } catch (e) {
        console.error('Error loading players from localStorage', e);
      }
    }
    return INITIAL_PLAYERS;
  });

  const [matches, setMatches] = useState<Match[]>(() => {
    const saved = localStorage.getItem('tennisdb_matches_v9');
    if (saved) {
      try {
        const parsed: Match[] = JSON.parse(saved);
        // Ensure new matches from INITIAL_MATCHES are always merged
        const matchMap = new Map<string, Match>();
        INITIAL_MATCHES.forEach(m => { if (m && m.id) matchMap.set(m.id, m); });
        if (Array.isArray(parsed)) {
          parsed.forEach(m => { if (m && m.id) matchMap.set(m.id, m); });
        }
        return Array.from(matchMap.values());
      } catch (e) {
        console.error('Error loading matches from localStorage', e);
      }
    }
    return INITIAL_MATCHES;
  });

  // Save to LocalStorage when players/matches update
  useEffect(() => {
    try {
      localStorage.setItem('tennisdb_players_v9', JSON.stringify(players));
    } catch (e) {
      console.error('Failed to save players to localStorage', e);
    }
  }, [players]);

  useEffect(() => {
    try {
      localStorage.setItem('tennisdb_matches_v9', JSON.stringify(matches));
    } catch (e) {
      console.error('Failed to save matches to localStorage', e);
    }
  }, [matches]);

  const tournaments = INITIAL_TOURNAMENTS;

  // Navigation & Filter State
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [selectedTour, setSelectedTour] = useState<Tour | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modal States
  const [selectedPlayerForDetail, setSelectedPlayerForDetail] = useState<Player | null>(null);

  // H2H Initial Selection State
  const [h2hPlayer1, setH2hPlayer1] = useState<Player | null>(null);
  const [h2hPlayer2, setH2hPlayer2] = useState<Player | null>(null);

  // Sync with LocalStorage
  useEffect(() => {
    localStorage.setItem('tennisdb_players_v7', JSON.stringify(players));
  }, [players]);

  useEffect(() => {
    localStorage.setItem('tennisdb_matches_v7', JSON.stringify(matches));
  }, [matches]);

  // Player Selection Handler (hydrates full profile if rank summary or ID is passed)
  const handleSelectPlayer = (playerOrSummary: Player | PlayerRankSummary | AtpLiveRankEntry) => {
    if ('bio' in playerOrSummary && 'playStyle' in playerOrSummary) {
      setSelectedPlayerForDetail(playerOrSummary as Player);
    } else {
      const hydrated = playerService.hydratePlayer(playerOrSummary as PlayerRankSummary);
      setSelectedPlayerForDetail(hydrated);
    }
  };

  const handleComparePlayer = (player: Player) => {
    setH2hPlayer1(player);
    // Smartly pick top rival for meaningful head-to-head analysis
    let opponent: Player | undefined;
    if (player.notableRivalries && player.notableRivalries.length > 0) {
      for (const rivalName of player.notableRivalries) {
        const found = players.find(
          (p) => p.id !== player.id && (p.name.toLowerCase() === rivalName.toLowerCase() || p.name.toLowerCase().includes(rivalName.toLowerCase()))
        );
        if (found) {
          opponent = found;
          break;
        }
      }
    }
    if (!opponent) {
      const matchWithPlayer = matches.find(
        (m) => m.player1Id === player.id || m.player2Id === player.id
      );
      if (matchWithPlayer) {
        const oppId = matchWithPlayer.player1Id === player.id ? matchWithPlayer.player2Id : matchWithPlayer.player1Id;
        opponent = players.find((p) => p.id === oppId);
      }
    }
    if (!opponent) {
      opponent =
        players.find((p) => p.id !== player.id && p.tour === player.tour) ||
        players.find((p) => p.id !== player.id);
    }
    setH2hPlayer2(opponent || null);
    setActiveTab('h2h');
  };

  const activeSeasonInfo = SEASONS_DATA[activeSeason];

  return (
    <div className="min-h-screen bg-[#07080b] text-slate-100 flex flex-col lg:flex-row relative transition-colors duration-500">
      {/* Subtle Atmospheric Vignette Glow */}
      <div 
        className="fixed top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none -z-10 transition-all duration-1000 opacity-15"
        style={{ background: activeSeasonInfo.ambientGlowColors[0] }}
      />
      <div 
        className="fixed top-24 right-1/4 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none -z-10 transition-all duration-1000 opacity-15"
        style={{ background: activeSeasonInfo.ambientGlowColors[1] }}
      />

      {/* Left Navigation Rail (Desktop & Mobile Drawer) */}
      <CommandRail
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedTour={selectedTour}
        setSelectedTour={setSelectedTour}
        currentSeason={activeSeason}
        seasonPreference={seasonPreference}
        onSelectSeasonPreference={handleSeasonPreferenceChange}
      />

      {/* Main Analytics Canvas */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Command Bar */}
        <CommandBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isSyncingLive={isSyncingLive}
          lastSyncedLive={lastSyncedLive}
          onSyncLive={syncLiveRankings}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          selectedTour={selectedTour}
          setSelectedTour={setSelectedTour}
          currentSeason={activeSeason}
          seasonPreference={seasonPreference}
          onSelectSeasonPreference={handleSeasonPreferenceChange}
        />

        {/* 24/7 Live Feed Breaking Ticker */}
        <LiveFeedTicker
          onOpenLiveNewsroom={() => setActiveTab('live')}
          onSelectPlayer={handleSelectPlayer}
        />

        {/* Main View Area with Suspense for Code-Split Routes */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Suspense
            fallback={
              <div className="py-24 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-8 h-8 rounded-full border-2 border-white/10 border-t-amber-200/90 animate-spin" />
                <span className="font-mono text-xs text-white/40 uppercase tracking-widest">
                  Loading Circuit Telemetry...
                </span>
              </div>
            }
          >
            {activeTab === 'overview' && (
              <OverviewView
                players={players}
                tournaments={tournaments}
                matches={matches}
                currentSeason={activeSeason}
                onSelectPlayer={handleSelectPlayer}
                onComparePlayer={handleComparePlayer}
                onNavigateTab={(tab) => setActiveTab(tab)}
              />
            )}

            {activeTab === 'live' && (
              <LiveNewsroomView onSelectPlayer={handleSelectPlayer} />
            )}

            {activeTab === 'rankings' && (
              <RankingsView
                players={players}
                onSelectPlayer={handleSelectPlayer}
                atpLiveRankings={atpLiveRankings}
                isSyncing={isSyncingLive}
                lastSynced={lastSyncedLive}
                onSyncLiveRankings={syncLiveRankings}
                isLiveSource={isLiveSource}
              />
            )}

            {activeTab === 'tournaments' && (
              <TournamentsView currentSeason={activeSeason} onSelectPlayer={handleSelectPlayer} />
            )}

            {activeTab === 'players' && (
              <PlayersView
                players={players}
                selectedTour={selectedTour}
                searchQuery={searchQuery}
                onSelectPlayer={handleSelectPlayer}
                onComparePlayer={handleComparePlayer}
              />
            )}

            {activeTab === 'h2h' && (
              <HeadToHeadView
                players={players}
                matches={matches}
                initialPlayer1={h2hPlayer1}
                initialPlayer2={h2hPlayer2}
                onSelectPlayer={handleSelectPlayer}
              />
            )}

            {activeTab === 'matches' && (
              <MatchesView
                matches={matches}
                players={players}
                onSelectPlayer={handleSelectPlayer}
              />
            )}
          </Suspense>
        </main>

      {/* Tennis Stadium Footer with Seasonal Theme Indicator */}
      <footer className="bg-court-950/90 border-t border-white/[0.08] py-10 mt-16 relative transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-white/[0.06] text-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.1] flex items-center justify-center text-amber-100">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-amber-200/80" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" strokeOpacity="0.4" />
                  <path d="M7 7l10 10M17 7L7 17" strokeOpacity="0.8" />
                  <circle cx="12" cy="12" r="2.5" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display text-sm font-semibold tracking-[0.14em] text-white">
                    TENNIS ARCHIVE
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/[0.05] text-white/70 border border-white/[0.1]">
                    2026 {activeSeasonInfo.shortName} Season
                  </span>
                </div>
                <p className="text-white/40 text-[11px] font-mono tracking-wider mt-0.5">
                  Official Grand Slam Chronicle & Circuit Intelligence
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-xs text-emerald-300/60">
            <div>
              <span>Active Circuit: <strong className="text-white">{activeSeasonInfo.name}</strong></span>
              <span className="mx-2">•</span>
              <span>All 4 Grand Slams Tracked</span>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  localStorage.removeItem('tennisdb_matches_v9');
                  localStorage.removeItem('tennisdb_players_v9');
                  localStorage.removeItem('tennisdb_players_v8');
                  localStorage.removeItem('tennisdb_matches_v8');
                  localStorage.removeItem('tennisdb_players_v7');
                  localStorage.removeItem('tennisdb_matches_v7');
                  localStorage.removeItem('tennisdb_players_v6');
                  localStorage.removeItem('tennisdb_matches_v6');
                  localStorage.removeItem('tennisdb_players_v4');
                  localStorage.removeItem('tennisdb_matches_v4');
                  localStorage.removeItem('tennisdb_players');
                  localStorage.removeItem('tennisdb_matches');
                  localStorage.removeItem('tennisdb_atp_live_rankings');
                  localStorage.removeItem('tennisdb_atp_live_last_sync');
                  localStorage.removeItem('tennisdb_atp_live_rankings_v2');
                  localStorage.removeItem('tennisdb_atp_live_last_sync_v2');
                  localStorage.removeItem('tennisdb_wta_live_rankings');
                  localStorage.removeItem('tennisdb_wta_live_last_sync');
                  localStorage.removeItem('tennisdb_wta_live_rankings_v2');
                  localStorage.removeItem('tennisdb_wta_live_last_sync_v2');
                  localStorage.removeItem('tennisdb_surface_season_preference');
                  setPlayers(INITIAL_PLAYERS);
                  setMatches(INITIAL_MATCHES);
                  handleSeasonPreferenceChange('auto');
                }}
                className="hover:text-volt-400 transition underline text-[11px] text-emerald-400/80"
                title="Reset data to initial defaults"
              >
                Reset to Default Roster & Matches
              </button>
            </div>
          </div>
        </div>
      </footer>
      </div>

      {/* Modals */}
      <PlayerDetailModal
        player={selectedPlayerForDetail}
        onClose={() => setSelectedPlayerForDetail(null)}
        onCompare={(p) => {
          setSelectedPlayerForDetail(null);
          handleComparePlayer(p);
        }}
      />
    </div>
  );
};

export default App;
