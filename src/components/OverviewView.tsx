import React, { useState, useEffect, useMemo } from 'react';
import { Player, Tournament, Match, Tour } from '../types/tennis';
import { SeasonKey, SEASONS_DATA } from '../services/seasonThemeService';
import { useLiveFeed } from '../services/liveFeedEngine';
import { favoritesService } from '../services/favoritesService';
import { 
  Trophy, 
  ArrowRight, 
  User, 
  Swords, 
  ArrowUpRight, 
  Activity, 
  Layers, 
  Radio, 
  Clock, 
  ExternalLink, 
  Target,
  Star,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Zap
} from 'lucide-react';
import { PlayerCard } from './PlayerCard';
import { MiniStatGauge, SurfaceGaugePie } from './charts/PieChart';
import { useLiveScoreboard } from '../services/liveScoreboardService';
import { getAssetUrl } from '../utils/assetUtils';
import { decodeHtmlEntities } from '../services/rssFeedService';

interface OverviewViewProps {
  players: Player[];
  tournaments: Tournament[];
  matches: Match[];
  currentSeason?: SeasonKey;
  selectedTour?: Tour | 'ALL';
  onSelectPlayer: (player: Player) => void;
  onComparePlayer: (player: Player) => void;
  onNavigateTab: (tab: string) => void;
}

const COUNTRY_ISO_MAP: Record<string, string> = {
  'Italy': 'ITA',
  'Spain': 'ESP',
  'Germany': 'GER',
  'United States': 'USA',
  'USA': 'USA',
  'Serbia': 'SRB',
  'Poland': 'POL',
  'Belarus': 'BLR',
  'Greece': 'GRE',
  'Russia': 'AIN',
  'Norway': 'NOR',
  'Kazakhstan': 'KAZ',
  'Czech Republic': 'CZE',
  'Czechia': 'CZE',
  'France': 'FRA',
  'Switzerland': 'SUI',
  'United Kingdom': 'GBR',
  'Great Britain': 'GBR',
  'Canada': 'CAN',
  'Australia': 'AUS',
  'Argentina': 'ARG',
  'Brazil': 'BRA',
  'Denmark': 'DEN',
  'Bulgaria': 'BUL',
  'Croatia': 'CRO',
  'Japan': 'JPN',
  'China': 'CHN',
};

const getCountryCode = (country: string): string => {
  if (!country) return 'INT';
  if (COUNTRY_ISO_MAP[country]) return COUNTRY_ISO_MAP[country];
  return country.length <= 3 ? country.toUpperCase() : country.slice(0, 3).toUpperCase();
};

const getPlayerInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export const OverviewView: React.FC<OverviewViewProps> = ({
  players,
  tournaments,
  matches,
  currentSeason = 'hard',
  selectedTour = 'ALL',
  onSelectPlayer,
  onComparePlayer,
  onNavigateTab,
}) => {
  const { allItems } = useLiveFeed();
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => favoritesService.getFavorites());

  useEffect(() => {
    setFavoriteIds(favoritesService.getFavorites());
    return favoritesService.subscribe((favs) => {
      setFavoriteIds(favs);
    });
  }, []);

  const favoritePlayers = useMemo(() => {
    return favoriteIds
      .map((id) => players.find((p) => p.id === id))
      .filter((p): p is Player => Boolean(p));
  }, [players, favoriteIds]);

  const atpPlayers = players.filter((p) => p.tour === 'ATP');
  const wtaPlayers = players.filter((p) => p.tour === 'WTA');

  const displayedPlayers = useMemo(() => {
    if (selectedTour === 'ALL') return players.slice(0, 6);
    return players.filter((p) => p.tour === selectedTour).slice(0, 6);
  }, [players, selectedTour]);

  const atpNo1 = atpPlayers.find((p) => p.currentRank === 1) || atpPlayers[0];
  const wtaNo1 = wtaPlayers.find((p) => p.currentRank === 1) || wtaPlayers[0];

  const totalSlamsTracked = players.reduce((acc, p) => acc + p.grandSlams, 0);
  const featuredMatch = matches[0];

  // ESPN Live Tournament Scoreboard
  const { matches: espnMatches, isLoading: isScoreboardLoading, refresh: refreshScoreboard } = useLiveScoreboard();
  const [scoreboardTab, setScoreboardTab] = useState<'live' | 'championship'>('live');
  const [activeScoreIndex, setActiveScoreIndex] = useState<number>(0);

  const filteredEspnMatches = useMemo(() => {
    let pool = espnMatches;
    if (selectedTour !== 'ALL') {
      pool = pool.filter(m => m.tour === selectedTour);
    }
    const live = pool.filter(m => m.isLive);
    const recent = pool.filter(m => m.state === 'post');
    return [...live, ...recent];
  }, [espnMatches, selectedTour]);

  const currentLiveMatch = filteredEspnMatches.length > 0
    ? filteredEspnMatches[activeScoreIndex % filteredEspnMatches.length]
    : null;

  const activeSeasonData = SEASONS_DATA[currentSeason];
  const safeDateRange = activeSeasonData.dateRangeText.replace(/[\u2013\u2014]/g, '-');

  // Format relative timestamp
  const getRelativeTime = (isoString: string) => {
    try {
      const diffMs = Date.now() - new Date(isoString).getTime();
      const diffMins = Math.max(1, Math.floor(diffMs / (1000 * 60)));
      if (diffMins < 60) return `${diffMins}m ago`;
      const diffHours = Math.floor(diffMins / 60);
      if (diffHours < 24) return `${diffHours}h ago`;
      const diffDays = Math.floor(diffHours / 24);
      return `${diffDays}d ago`;
    } catch {
      return 'Recent';
    }
  };

  const getCategoryLabel = (category: string): string => {
    switch (category) {
      case 'injury':
        return 'Medical Alert';
      case 'withdrawal':
        return 'Withdrawal';
      case 'controversy':
        return 'Inquiry';
      case 'tournament_update':
        return 'Draw Intel';
      case 'match_result':
        return 'Match Score';
      default:
        return 'Dispatch';
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      
      {/* SECTION 1: Live Circuit Telemetry Strip */}
      <div className="rounded-2xl bg-[#090b10] border border-white/[0.08] p-4 sm:p-6 relative overflow-hidden shadow-xl">
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

        {/* Telemetry Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-theme-accent animate-pulse" />
            <span className="font-mono text-xs font-semibold tracking-widest text-white/90 uppercase">
              Circuit Radar Telemetry
            </span>
            <span className="font-mono text-[10px] text-white/40">
              Live Feed 2026
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="text-white/40">Active Surface:</span>
            <span className="text-theme-accent font-medium">{activeSeasonData.name}</span>
            <span className="text-white/30 hidden md:inline">({safeDateRange})</span>
          </div>
        </div>

        {/* 4 High-Density Metric Columns */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
            <div className="flex items-center justify-between text-white/40 mb-1">
              <span className="font-mono text-[10px] uppercase tracking-wider">Titles Documented</span>
              <Trophy className="w-3.5 h-3.5 text-theme-accent" />
            </div>
            <div className="font-display tabular-nums text-2xl sm:text-3xl font-bold text-white">
              {totalSlamsTracked}
            </div>
            <span className="font-mono text-[10px] text-white/35 mt-0.5 block">
              Grand Slam Honors
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
            <div className="flex items-center justify-between text-white/40 mb-1">
              <span className="font-mono text-[10px] uppercase tracking-wider">Ranked Stars</span>
              <Activity className="w-3.5 h-3.5 text-white/40" />
            </div>
            <div className="font-mono tabular-nums text-2xl sm:text-3xl font-bold text-white">
              {players.length}
            </div>
            <span className="font-mono text-[10px] text-white/35 mt-0.5 block">
              {atpPlayers.length} ATP / {wtaPlayers.length} WTA
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
            <div className="flex items-center justify-between text-white/40 mb-1">
              <span className="font-mono text-[10px] uppercase tracking-wider">Official Draws</span>
              <Layers className="w-3.5 h-3.5 text-white/40" />
            </div>
            <div className="font-mono tabular-nums text-2xl sm:text-3xl font-bold text-white">
              {tournaments.length}
            </div>
            <span className="font-mono text-[10px] text-white/35 mt-0.5 block">
              Slams & Masters 1000
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
            <div className="flex items-center justify-between text-white/40 mb-1">
              <span className="font-mono text-[10px] uppercase tracking-wider">Classic Finals</span>
              <Clock className="w-3.5 h-3.5 text-white/40" />
            </div>
            <div className="font-mono tabular-nums text-2xl sm:text-3xl font-bold text-white">
              {matches.length}
            </div>
            <span className="font-mono text-[10px] text-white/35 mt-0.5 block">
              Championship Box Scores
            </span>
          </div>

        </div>
      </div>

      {/* SECTION: Tracked Athletes / Watchlist */}
      {favoritePlayers.length > 0 && (
        <div className="double-bezel-card-outer">
          <div className="double-bezel-card-inner p-5 sm:p-6 relative overflow-hidden bg-gradient-to-b from-[#0f141d] via-[#0b0f16] to-[#080b0f]">
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/30 to-transparent pointer-events-none" />
            
            {/* Ambient amber telemetry glow */}
            <div className="absolute -top-16 -right-16 w-60 h-60 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-white/[0.06] relative z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/25 flex items-center justify-center text-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.15)]">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-display font-semibold text-lg sm:text-xl text-white tracking-tight">
                      Tracked Athletes / Watchlist
                    </h2>
                    <span className="font-mono text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-400/15 text-amber-300 border border-amber-400/30">
                      {favoritePlayers.length} {favoritePlayers.length === 1 ? 'Player' : 'Players'}
                    </span>
                  </div>
                  <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mt-0.5">
                    Personalized Telemetry & Grand Slam Bios
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onNavigateTab('players')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] text-white/70 hover:text-white text-xs font-mono border border-white/[0.08] hover:border-white/20 transition-all group"
                >
                  <span>Filter Watchlist in Database</span>
                  <ArrowRight className="w-3 h-3 text-white/40 group-hover:text-white transition-colors" />
                </button>
              </div>
            </div>

            {/* Athletes Cards: Horizontal scroller on small screens, compact responsive grid on tablet/desktop */}
            <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0 custom-scrollbar -mx-1 px-1 relative z-10">
              {favoritePlayers.map((player) => {
                const countryCode = getCountryCode(player.country);
                const initials = getPlayerInitials(player.name);

                return (
                  <div
                    key={player.id}
                    className="min-w-[240px] sm:min-w-0 bg-[#0c1017]/90 hover:bg-[#101520] border border-white/[0.07] hover:border-amber-400/30 rounded-xl p-3.5 flex flex-col justify-between transition-all duration-200 group shadow-md"
                  >
                    <div>
                      {/* Top Row: Avatar, Country, Tour & Rank */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2.5">
                          <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-white/[0.1] bg-black/60 shrink-0 shadow">
                            {player.avatarUrl ? (
                              <img
                                src={getAssetUrl(player.avatarUrl)}
                                alt={player.name}
                                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                                loading="lazy"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center font-mono text-[11px] text-amber-300 font-semibold">
                                {initials}
                              </div>
                            )}
                          </div>

                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-mono text-xs font-semibold text-white/90">
                                {countryCode}
                              </span>
                              {player.flag && (
                                <span className="text-xs">{player.flag}</span>
                              )}
                              <span className="w-1 h-1 rounded-full bg-white/20" />
                              <span className="font-mono text-[9px] uppercase px-1.5 py-0.2 rounded bg-white/[0.04] text-white/50 border border-white/[0.06]">
                                {player.tour}
                              </span>
                            </div>
                            <span className="font-mono text-[9px] text-white/35 block">
                              Age {player.age}
                            </span>
                          </div>
                        </div>

                        {player.currentRank > 0 && (
                          <div className="px-2 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/25">
                            <span className="font-mono text-[11px] font-semibold text-amber-300">
                              #{player.currentRank}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Name */}
                      <h3
                        onClick={() => onSelectPlayer(player)}
                        className="font-display font-semibold text-sm sm:text-base text-white group-hover:text-amber-300 transition-colors cursor-pointer tracking-tight truncate"
                      >
                        {player.name}
                      </h3>

                      <p className="text-[11px] text-white/40 truncate mt-0.5 font-normal">
                        {player.plays}
                      </p>

                      {/* Micro Stats */}
                      <div className="grid grid-cols-2 gap-2 mt-3 pt-2.5 border-y border-white/[0.05] text-center">
                        <div>
                          <div className="font-mono text-xs font-semibold text-white tabular-nums">
                            {player.grandSlams}
                          </div>
                          <div className="font-mono text-[8px] uppercase tracking-wider text-white/35">
                            Slams
                          </div>
                        </div>
                        <div>
                          <div className="font-mono text-xs font-semibold text-amber-300 tabular-nums">
                            {player.careerWinLoss.winPercentage}%
                          </div>
                          <div className="font-mono text-[8px] uppercase tracking-wider text-white/35">
                            Win Rate
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Link Action Button & Star Toggle */}
                    <div className="pt-3 mt-3 border-t border-white/[0.05] flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => onSelectPlayer(player)}
                        className="flex-1 flex items-center justify-between pl-3 pr-2 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-white text-[11px] font-medium border border-white/[0.06] hover:border-white/15 transition-all group/btn"
                      >
                        <span>Open Bio</span>
                        <ArrowUpRight className="w-3 h-3 text-white/60 group-hover/btn:text-white" />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          favoritesService.toggleFavorite(player.id);
                        }}
                        className="w-7 h-7 rounded-lg flex items-center justify-center bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 border border-amber-400/30 transition-all shrink-0"
                        title="Remove from watchlist"
                        aria-label={`Remove ${player.name} from watchlist`}
                      >
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: Center Court Scoreboard (Dual Mode: Live Circuit & Championship Marquee) */}
      {(currentLiveMatch || featuredMatch) && (
        <div className="rounded-2xl bg-[#090b10] border border-white/[0.08] p-5 sm:p-7 relative overflow-hidden shadow-xl">
          {/* Dramatic Grand Slam Stadium Action Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img 
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&auto=format&fit=crop&q=80" 
              alt="Grand Slam Stadium" 
              className="w-full h-full object-cover opacity-15 filter brightness-75 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#090b10] via-[#090b10]/95 to-[#090b10]/75" />
          </div>

          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-theme-accent/20 to-transparent pointer-events-none" />

          {/* Mode Switcher & Context Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 border-b border-white/[0.06] relative z-10 gap-3">
            <div className="flex items-center gap-3">
              {filteredEspnMatches.length > 0 && (
                <div className="flex items-center p-0.5 rounded-lg bg-white/[0.03] border border-white/[0.08]">
                  <button
                    type="button"
                    onClick={() => setScoreboardTab('live')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-mono font-medium transition-all ${
                      scoreboardTab === 'live'
                        ? 'bg-theme-accent/15 text-theme-accent border border-theme-accent/30 shadow-[0_0_12px_rgba(251,191,36,0.15)]'
                        : 'text-white/40 hover:text-white/80'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Live Circuit ({filteredEspnMatches.length})</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setScoreboardTab('championship')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-mono font-medium transition-all ${
                      scoreboardTab === 'championship'
                        ? 'bg-theme-accent/15 text-theme-accent border border-theme-accent/30 shadow-[0_0_12px_rgba(251,191,36,0.15)]'
                        : 'text-white/40 hover:text-white/80'
                    }`}
                  >
                    <Trophy className="w-3 h-3 text-amber-400" />
                    <span>Grand Slam Final</span>
                  </button>
                </div>
              )}

              {filteredEspnMatches.length === 0 && (
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  <span className="font-mono text-xs uppercase font-semibold tracking-widest text-white/80">
                    Center Court Marquee Matchup
                  </span>
                </div>
              )}
            </div>

            {/* Context Controls */}
            <div className="flex items-center gap-2 text-[10px] font-mono">
              {scoreboardTab === 'live' && currentLiveMatch && (
                <>
                  <button
                    type="button"
                    onClick={refreshScoreboard}
                    disabled={isScoreboardLoading}
                    title="Refresh Live Scores"
                    className="p-1 rounded bg-white/[0.03] hover:bg-white/[0.08] text-white/50 hover:text-white transition border border-white/[0.08]"
                  >
                    <RefreshCw className={`w-3 h-3 ${isScoreboardLoading ? 'animate-spin text-theme-accent' : ''}`} />
                  </button>

                  <div className="flex items-center gap-1 bg-white/[0.03] px-2 py-0.5 rounded border border-white/[0.08]">
                    <button
                      type="button"
                      onClick={() => setActiveScoreIndex(prev => (prev > 0 ? prev - 1 : filteredEspnMatches.length - 1))}
                      className="text-white/50 hover:text-white"
                    >
                      <ChevronLeft className="w-3 h-3" />
                    </button>
                    <span className="text-white/70 px-1">
                      {activeScoreIndex + 1} / {filteredEspnMatches.length}
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveScoreIndex(prev => (prev + 1) % filteredEspnMatches.length)}
                      className="text-white/50 hover:text-white"
                    >
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>

                  <span className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.08] text-white/70">
                    {currentLiveMatch.tour} • {currentLiveMatch.surface} Court
                  </span>
                </>
              )}

              {scoreboardTab === 'championship' && featuredMatch && (
                <>
                  <span className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.08] text-white/70">
                    {featuredMatch.surface} Court
                  </span>
                  <span className="text-white/40 hidden sm:inline">{featuredMatch.tournamentName}</span>
                </>
              )}
            </div>
          </div>

          {/* Scoreboard Presentation Grid */}
          {scoreboardTab === 'live' && currentLiveMatch ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
              
              {/* Scorecard Display */}
              <div className="lg:col-span-8 bg-black/60 rounded-xl p-4 sm:p-5 border border-white/[0.08] backdrop-blur-sm">
                <div className="space-y-4">
                  
                  {/* Competitor 1 */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="font-display font-semibold text-lg sm:text-xl text-white tracking-tight truncate">
                        {currentLiveMatch.player1.name}
                      </span>
                      {currentLiveMatch.player1.winner && (
                        <span className="font-mono text-[9px] uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/25 shrink-0">
                          Winner
                        </span>
                      )}
                    </div>
                    {/* Set Scores */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      {currentLiveMatch.player1.sets.map((setVal, idx) => {
                        const oppSet = currentLiveMatch.player2.sets[idx] ?? 0;
                        const isWon = setVal > oppSet;
                        return (
                          <span
                            key={idx}
                            className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center font-mono font-bold text-xs sm:text-sm rounded-lg border tabular-nums ${
                              isWon
                                ? 'bg-theme-accent/15 text-theme-accent border-theme-accent/40 shadow-[0_0_8px_rgba(251,191,36,0.2)]'
                                : 'bg-white/[0.03] text-white/70 border-white/[0.08]'
                            }`}
                          >
                            {setVal}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Competitor 2 */}
                  <div className="flex items-center justify-between gap-4 border-t border-white/[0.05] pt-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="font-display font-semibold text-lg sm:text-xl text-white/90 tracking-tight truncate">
                        {currentLiveMatch.player2.name}
                      </span>
                      {currentLiveMatch.player2.winner && (
                        <span className="font-mono text-[9px] uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/25 shrink-0">
                          Winner
                        </span>
                      )}
                    </div>
                    {/* Set Scores */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      {currentLiveMatch.player2.sets.map((setVal, idx) => {
                        const oppSet = currentLiveMatch.player1.sets[idx] ?? 0;
                        const isWon = setVal > oppSet;
                        return (
                          <span
                            key={idx}
                            className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center font-mono font-bold text-xs sm:text-sm rounded-lg border tabular-nums ${
                              isWon
                                ? 'bg-theme-accent/15 text-theme-accent border-theme-accent/40 shadow-[0_0_8px_rgba(251,191,36,0.2)]'
                                : 'bg-white/[0.03] text-white/70 border-white/[0.08]'
                            }`}
                          >
                            {setVal}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                </div>

                {/* Score Meta Bar */}
                <div className="mt-4 pt-3 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="font-mono text-[10px] uppercase tracking-wider text-white/60">
                      {currentLiveMatch.tournamentName} • {currentLiveMatch.round}
                    </span>
                  </div>
                  <span className="font-mono tabular-nums font-bold text-xs sm:text-sm text-theme-accent tracking-widest">
                    {currentLiveMatch.status}
                  </span>
                </div>
              </div>

              {/* Tournament Telemetry Column */}
              <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.08] text-[10px] font-mono text-white/60 mb-2">
                    <Zap className="w-3 h-3 text-amber-400" />
                    <span>ESPN Live Feed Stream</span>
                  </div>
                  <p className="text-xs text-white/80 leading-relaxed font-sans">
                    Live match updates from {currentLiveMatch.tournamentName}. Real-time set progression and match scoring.
                  </p>
                </div>

                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => onNavigateTab('tournaments')}
                    className="inline-flex items-center justify-between w-full pl-4 pr-2.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs font-medium border border-white/[0.08] hover:border-white/20 transition-all group backdrop-blur-sm"
                  >
                    <span>View Tournament Schedule & Draws</span>
                    <div className="w-6 h-6 rounded-full bg-white/10 group-hover:bg-theme-accent group-hover:text-black flex items-center justify-center transition-all">
                      <ArrowUpRight className="w-3 h-3" />
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigateTab('matches')}
                    className="inline-flex items-center justify-between w-full pl-4 pr-2.5 py-2 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] text-white/70 hover:text-white text-xs font-mono border border-white/[0.05] transition-all"
                  >
                    <span>Championship Log</span>
                    <ArrowRight className="w-3 h-3 text-white/40" />
                  </button>
                </div>
              </div>

            </div>
          ) : (
            /* Grand Slam Finals Fallback Card */
            featuredMatch && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
                <div className="lg:col-span-8 bg-black/60 rounded-xl p-4 sm:p-5 border border-white/[0.08] backdrop-blur-sm">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-display font-semibold text-lg sm:text-xl text-white tracking-tight">
                          {featuredMatch.player1Name}
                        </span>
                        {featuredMatch.winnerId === featuredMatch.player1Id && (
                          <span className="font-mono text-[9px] uppercase tracking-widest text-theme-accent px-1.5 py-0.2 rounded border border-theme-accent/25">
                            Winner
                          </span>
                        )}
                      </div>
                      <span className="font-mono text-xs text-white/40">Competitor 1</span>
                    </div>

                    <div className="flex items-center justify-between border-t border-white/[0.05] pt-3">
                      <div className="flex items-center gap-3">
                        <span className="font-display font-semibold text-lg sm:text-xl text-white/80 tracking-tight">
                          {featuredMatch.player2Name}
                        </span>
                        {featuredMatch.winnerId === featuredMatch.player2Id && (
                          <span className="font-mono text-[9px] uppercase tracking-widest text-theme-accent px-1.5 py-0.2 rounded border border-theme-accent/25">
                            Winner
                          </span>
                        )}
                      </div>
                      <span className="font-mono text-xs text-white/40">Competitor 2</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">
                      {featuredMatch.round} • Final Sets
                    </span>
                    <span className="font-mono tabular-nums font-bold text-base sm:text-lg text-theme-accent tracking-widest">
                      {featuredMatch.score}
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-4">
                  <div>
                    {featuredMatch.headline && (
                      <p className="text-xs text-white/80 italic mb-2 leading-relaxed font-serif">
                        "{featuredMatch.headline}"
                      </p>
                    )}
                    {featuredMatch.highlights && (
                      <p className="text-[11px] text-white/45 leading-relaxed font-sans">
                        {featuredMatch.highlights}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => onNavigateTab('matches')}
                    className="inline-flex items-center justify-between w-full pl-4 pr-2.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs font-medium border border-white/[0.08] hover:border-white/20 transition-all group backdrop-blur-sm"
                  >
                    <span>Championship Match Telemetry</span>
                    <div className="w-6 h-6 rounded-full bg-white/10 group-hover:bg-theme-accent group-hover:text-black flex items-center justify-center transition-all">
                      <ArrowUpRight className="w-3 h-3" />
                    </div>
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      )}

      {/* SECTION 3: Apex Bento Command Center (World No. 1s + Live Wire) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Reigning World No. 1s (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display font-semibold text-lg text-white tracking-tight">
                Apex Champions
              </h2>
              <p className="font-mono text-[10px] text-white/40 uppercase tracking-wider">
                World No. 1 Bios & Surface Diagnostics
              </p>
            </div>

            <button
              onClick={() => onNavigateTab('rankings')}
              className="inline-flex items-center gap-1 font-mono text-xs text-white/60 hover:text-white transition-colors"
            >
              <span>Full Standings</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className={`grid gap-4 ${selectedTour === 'ALL' ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
            
            {/* ATP World No. 1 Card */}
            {(selectedTour === 'ALL' || selectedTour === 'ATP') && atpNo1 && (
              <div className="rounded-xl bg-[#0a0c11] border border-white/[0.08] p-5 flex flex-col justify-between hover:border-white/20 transition-all relative overflow-hidden group">
                {/* Background Player Vignette */}
                {atpNo1.avatarUrl && (
                  <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full overflow-hidden opacity-10 pointer-events-none filter blur-xl group-hover:opacity-15 transition-opacity">
                    <img src={getAssetUrl(atpNo1.avatarUrl)} alt="" className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    {/* Real Player Portrait Photo */}
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-white/[0.12] bg-black/50 shrink-0 shadow-md">
                      {atpNo1.avatarUrl ? (
                        <img
                          src={getAssetUrl(atpNo1.avatarUrl)}
                          alt={atpNo1.name}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-mono text-xs text-theme-accent">
                          {getPlayerInitials(atpNo1.name)}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-semibold text-white/90">
                          {getCountryCode(atpNo1.country)}
                        </span>
                        <span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-white/[0.04] text-theme-accent border border-theme-accent/25">
                          ATP No. 1
                        </span>
                      </div>
                      <h3 
                        onClick={() => onSelectPlayer(atpNo1)}
                        className="font-display font-semibold text-base sm:text-lg text-white group-hover:text-theme-accent transition-colors cursor-pointer tracking-tight truncate mt-0.5"
                      >
                        {atpNo1.name}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-white/40 mb-3 font-normal">
                    Age {atpNo1.age} • {atpNo1.plays}
                  </p>

                  {/* Tabular Honors with Mini Donut Win Rate Gauge */}
                  <div className="grid grid-cols-3 gap-2 py-2.5 border-y border-white/[0.06] text-center my-3 items-center">
                    <div>
                      <div className="font-mono tabular-nums text-base font-semibold text-white">{atpNo1.grandSlams}</div>
                      <div className="font-mono text-[8px] text-white/35 uppercase tracking-wider mt-0.5">Slams</div>
                    </div>
                    <div className="border-x border-white/[0.06]">
                      <div className="font-mono tabular-nums text-base font-semibold text-white">{atpNo1.careerTitles}</div>
                      <div className="font-mono text-[8px] text-white/35 uppercase tracking-wider mt-0.5">Titles</div>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <MiniStatGauge
                        percentage={atpNo1.careerWinLoss.winPercentage}
                        size={36}
                        strokeWidth={3.6}
                        strokeColor="#e5c378"
                      />
                      <div className="font-mono text-[8px] text-white/35 uppercase tracking-wider mt-0.5">Win Rate</div>
                    </div>
                  </div>

                  {/* Surface Telemetry Circular Gauges */}
                  <div className="flex items-center justify-around text-[10px] font-mono text-white/50 px-2 py-2 mb-4 rounded-xl bg-white/[0.015] border border-white/[0.04]">
                    <div className="flex flex-col items-center">
                      <SurfaceGaugePie
                        surface="Hard"
                        winPercentage={atpNo1.surfaceStats.hard.winPercentage}
                        size={36}
                        strokeWidth={3.6}
                      />
                      <span className="text-sky-400/70 text-[8px] uppercase tracking-wider mt-1 font-semibold">Hard</span>
                    </div>
                    <span className="text-white/10">|</span>
                    <div className="flex flex-col items-center">
                      <SurfaceGaugePie
                        surface="Clay"
                        winPercentage={atpNo1.surfaceStats.clay.winPercentage}
                        size={36}
                        strokeWidth={3.6}
                      />
                      <span className="text-orange-400/70 text-[8px] uppercase tracking-wider mt-1 font-semibold">Clay</span>
                    </div>
                    <span className="text-white/10">|</span>
                    <div className="flex flex-col items-center">
                      <SurfaceGaugePie
                        surface="Grass"
                        winPercentage={atpNo1.surfaceStats.grass.winPercentage}
                        size={36}
                        strokeWidth={3.6}
                      />
                      <span className="text-emerald-400/70 text-[8px] uppercase tracking-wider mt-1 font-semibold">Grass</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-3 border-t border-white/[0.06] relative z-10">
                  <button
                    onClick={() => onSelectPlayer(atpNo1)}
                    className="flex-1 flex items-center justify-between pl-3 pr-2 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.07] text-white text-xs font-medium border border-white/[0.08] transition-all"
                  >
                    <span>Bio</span>
                    <User className="w-3 h-3 text-white/60" />
                  </button>
                  <button
                    onClick={() => onComparePlayer(atpNo1)}
                    className="px-2.5 py-1.5 rounded-lg bg-black/40 hover:bg-black/60 text-white/70 hover:text-white text-xs font-mono border border-white/[0.08] transition-all"
                  >
                    <Swords className="w-3 h-3 text-white/50" />
                  </button>
                </div>
              </div>
            )}

            {/* WTA World No. 1 Card */}
            {(selectedTour === 'ALL' || selectedTour === 'WTA') && wtaNo1 && (
              <div className="rounded-xl bg-[#0a0c11] border border-white/[0.08] p-5 flex flex-col justify-between hover:border-white/20 transition-all relative overflow-hidden group">
                {/* Background Player Vignette */}
                {wtaNo1.avatarUrl && (
                  <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full overflow-hidden opacity-10 pointer-events-none filter blur-xl group-hover:opacity-15 transition-opacity">
                    <img src={getAssetUrl(wtaNo1.avatarUrl)} alt="" className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    {/* Real Player Portrait Photo */}
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-white/[0.12] bg-black/50 shrink-0 shadow-md">
                      {wtaNo1.avatarUrl ? (
                        <img
                          src={getAssetUrl(wtaNo1.avatarUrl)}
                          alt={wtaNo1.name}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-mono text-xs text-theme-accent">
                          {getPlayerInitials(wtaNo1.name)}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-semibold text-white/90">
                          {getCountryCode(wtaNo1.country)}
                        </span>
                        <span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-white/[0.04] text-theme-accent border border-theme-accent/25">
                          WTA No. 1
                        </span>
                      </div>
                      <h3 
                        onClick={() => onSelectPlayer(wtaNo1)}
                        className="font-display font-semibold text-base sm:text-lg text-white group-hover:text-theme-accent transition-colors cursor-pointer tracking-tight truncate mt-0.5"
                      >
                        {wtaNo1.name}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-white/40 mb-3 font-normal">
                    Age {wtaNo1.age} • {wtaNo1.plays}
                  </p>

                  {/* Tabular Honors with Mini Donut Win Rate Gauge */}
                  <div className="grid grid-cols-3 gap-2 py-2.5 border-y border-white/[0.06] text-center my-3 items-center">
                    <div>
                      <div className="font-mono tabular-nums text-base font-semibold text-white">{wtaNo1.grandSlams}</div>
                      <div className="font-mono text-[8px] text-white/35 uppercase tracking-wider mt-0.5">Slams</div>
                    </div>
                    <div className="border-x border-white/[0.06]">
                      <div className="font-mono tabular-nums text-base font-semibold text-white">{wtaNo1.careerTitles}</div>
                      <div className="font-mono text-[8px] text-white/35 uppercase tracking-wider mt-0.5">Titles</div>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <MiniStatGauge
                        percentage={wtaNo1.careerWinLoss.winPercentage}
                        size={36}
                        strokeWidth={3.6}
                        strokeColor="#e5c378"
                      />
                      <div className="font-mono text-[8px] text-white/35 uppercase tracking-wider mt-0.5">Win Rate</div>
                    </div>
                  </div>

                  {/* Surface Telemetry Circular Gauges */}
                  <div className="flex items-center justify-around text-[10px] font-mono text-white/50 px-2 py-2 mb-4 rounded-xl bg-white/[0.015] border border-white/[0.04]">
                    <div className="flex flex-col items-center">
                      <SurfaceGaugePie
                        surface="Hard"
                        winPercentage={wtaNo1.surfaceStats.hard.winPercentage}
                        size={36}
                        strokeWidth={3.6}
                      />
                      <span className="text-sky-400/70 text-[8px] uppercase tracking-wider mt-1 font-semibold">Hard</span>
                    </div>
                    <span className="text-white/10">|</span>
                    <div className="flex flex-col items-center">
                      <SurfaceGaugePie
                        surface="Clay"
                        winPercentage={wtaNo1.surfaceStats.clay.winPercentage}
                        size={36}
                        strokeWidth={3.6}
                      />
                      <span className="text-orange-400/70 text-[8px] uppercase tracking-wider mt-1 font-semibold">Clay</span>
                    </div>
                    <span className="text-white/10">|</span>
                    <div className="flex flex-col items-center">
                      <SurfaceGaugePie
                        surface="Grass"
                        winPercentage={wtaNo1.surfaceStats.grass.winPercentage}
                        size={36}
                        strokeWidth={3.6}
                      />
                      <span className="text-emerald-400/70 text-[8px] uppercase tracking-wider mt-1 font-semibold">Grass</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-3 border-t border-white/[0.06] relative z-10">
                  <button
                    onClick={() => onSelectPlayer(wtaNo1)}
                    className="flex-1 flex items-center justify-between pl-3 pr-2 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.07] text-white text-xs font-medium border border-white/[0.08] transition-all"
                  >
                    <span>Bio</span>
                    <User className="w-3 h-3 text-white/60" />
                  </button>
                  <button
                    onClick={() => onComparePlayer(wtaNo1)}
                    className="px-2.5 py-1.5 rounded-lg bg-black/40 hover:bg-black/60 text-white/70 hover:text-white text-xs font-mono border border-white/[0.08] transition-all"
                  >
                    <Swords className="w-3 h-3 text-white/50" />
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Right Column: Real-Time Circuit Dispatch Wire (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 text-theme-accent animate-pulse" />
              <h2 className="font-display font-semibold text-lg text-white tracking-tight">
                Circuit Wire
              </h2>
            </div>

            <button
              onClick={() => onNavigateTab('live')}
              className="inline-flex items-center gap-1 font-mono text-xs text-white/60 hover:text-white transition-colors"
            >
              <span>Live Newsroom</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <div className="rounded-xl bg-[#090b10] border border-white/[0.08] p-4 flex-1 flex flex-col justify-between space-y-3">
            <div className="space-y-2.5">
              {allItems.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  onClick={() => onNavigateTab('live')}
                  className="p-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.05] cursor-pointer transition-all"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.2 rounded bg-white/[0.04] text-white/60 border border-white/[0.06]">
                      {getCategoryLabel(item.category)}
                    </span>
                    <span className="font-mono text-[9px] text-white/35 tabular-nums">
                      {getRelativeTime(item.timestamp)}
                    </span>
                  </div>
                  <p className="text-xs text-white/85 line-clamp-2 leading-snug font-normal">
                    {decodeHtmlEntities(item.title)}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={() => onNavigateTab('live')}
              className="w-full mt-3 flex items-center justify-between pl-3.5 pr-2 py-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.07] text-white text-xs font-mono transition-all"
            >
              <span>Open Complete 24/7 Intelligence Wire</span>
              <ArrowRight className="w-3 h-3 text-theme-accent" />
            </button>
          </div>
        </div>

      </div>

      {/* SECTION 4: Top Seeds Interactive Matrix */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-theme-accent">
              <Target className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-display font-semibold text-xl text-white tracking-tight">
                Top Seeds Command Matrix
              </h2>
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mt-0.5">
                {selectedTour === 'ALL'
                  ? 'Official ATP & WTA Competitors'
                  : selectedTour === 'ATP'
                  ? "Official ATP Men's Competitors"
                  : "Official WTA Women's Competitors"}
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('players')}
            className="inline-flex items-center gap-2 pl-3.5 pr-2 py-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.07] text-white text-xs font-medium border border-white/[0.08] hover:border-white/20 transition-all duration-200 group"
          >
            <span>
              {selectedTour === 'ALL'
                ? `Complete Archive (${players.length})`
                : `${selectedTour} Stars (${displayedPlayers.length})`}
            </span>
            <div className="w-5 h-5 rounded-full bg-white/10 group-hover:bg-theme-accent group-hover:text-black flex items-center justify-center transition-all">
              <ArrowRight className="w-3 h-3" />
            </div>
          </button>
        </div>

        {/* High-Density Player Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayedPlayers.map((player) => (
            <PlayerCard
              key={player.id}
              player={player}
              onSelect={onSelectPlayer}
              onCompare={onComparePlayer}
            />
          ))}
        </div>
      </div>

    </div>
  );
};

export default OverviewView;
