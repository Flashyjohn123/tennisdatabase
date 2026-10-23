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
        return 'Injury';
      case 'withdrawal':
        return 'Withdrawal';
      case 'controversy':
        return 'News';
      case 'tournament_update':
        return 'Tournament';
      case 'match_result':
        return 'Result';
      default:
        return 'Update';
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      
      {/* SECTION 1: Tour Highlights */}
      <div className="bg-[#0e1217] border border-white/10 rounded-xl p-5 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-theme-accent" />
            <h2 className="text-sm font-semibold tracking-wider text-white uppercase">
              Tour Highlights
            </h2>
          </div>

          <div className="flex items-center gap-2.5 text-xs text-white/60">
            <span>Current Surface:</span>
            <span className="text-theme-accent font-medium">{activeSeasonData.name}</span>
            <span className="text-white/40 hidden md:inline">({safeDateRange})</span>
          </div>
        </div>

        {/* 4 Metric Columns */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.06]">
            <div className="flex items-center justify-between text-white/50 mb-1.5">
              <span className="text-xs font-medium uppercase tracking-wider">Major Titles</span>
              <Trophy className="w-4 h-4 text-theme-accent" />
            </div>
            <div className="font-display tabular-nums text-2xl sm:text-3xl font-bold text-white">
              {totalSlamsTracked}
            </div>
            <span className="text-xs text-white/40 mt-1 block">
              Grand Slam Honors
            </span>
          </div>

          <div className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.06]">
            <div className="flex items-center justify-between text-white/50 mb-1.5">
              <span className="text-xs font-medium uppercase tracking-wider">Ranked Players</span>
              <Activity className="w-4 h-4 text-white/40" />
            </div>
            <div className="font-display tabular-nums text-2xl sm:text-3xl font-bold text-white">
              {players.length}
            </div>
            <span className="text-xs text-white/40 mt-1 block">
              {atpPlayers.length} ATP · {wtaPlayers.length} WTA
            </span>
          </div>

          <div className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.06]">
            <div className="flex items-center justify-between text-white/50 mb-1.5">
              <span className="text-xs font-medium uppercase tracking-wider">Tournaments</span>
              <Layers className="w-4 h-4 text-white/40" />
            </div>
            <div className="font-display tabular-nums text-2xl sm:text-3xl font-bold text-white">
              {tournaments.length}
            </div>
            <span className="text-xs text-white/40 mt-1 block">
              Slams & Masters 1000
            </span>
          </div>

          <div className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.06]">
            <div className="flex items-center justify-between text-white/50 mb-1.5">
              <span className="text-xs font-medium uppercase tracking-wider">Featured Matches</span>
              <Clock className="w-4 h-4 text-white/40" />
            </div>
            <div className="font-display tabular-nums text-2xl sm:text-3xl font-bold text-white">
              {matches.length}
            </div>
            <span className="text-xs text-white/40 mt-1 block">
              Championship Results
            </span>
          </div>
        </div>
      </div>

      {/* SECTION: Your Watchlist */}
      {favoritePlayers.length > 0 && (
        <div className="bg-[#0e1217] border border-white/10 rounded-xl p-5 sm:p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-display font-semibold text-lg sm:text-xl text-white tracking-tight">
                    Your Watchlist
                  </h2>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/20">
                    {favoritePlayers.length} {favoritePlayers.length === 1 ? 'Player' : 'Players'}
                  </span>
                </div>
                <p className="text-xs text-white/50 mt-0.5">
                  Pinned players and quick stats
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onNavigateTab('players')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-white/70 hover:text-white text-xs font-medium border border-white/10 hover:border-white/20 transition-colors"
              >
                <span>View All Players</span>
                <ArrowRight className="w-3.5 h-3.5 text-white/40" />
              </button>
            </div>
          </div>

          {/* Athletes Cards */}
          <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0 custom-scrollbar">
            {favoritePlayers.map((player) => {
              const countryCode = getCountryCode(player.country);
              const initials = getPlayerInitials(player.name);

              return (
                <div
                  key={player.id}
                  className="min-w-[240px] sm:min-w-0 bg-[#0a0d12] hover:bg-[#111620] border border-white/10 hover:border-amber-400/30 rounded-lg p-4 flex flex-col justify-between transition-colors group"
                >
                  <div>
                    {/* Top Row: Avatar, Country, Tour & Rank */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-white/10 bg-black/60 shrink-0">
                          {player.avatarUrl ? (
                            <img
                              src={getAssetUrl(player.avatarUrl)}
                              alt={player.name}
                              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs text-amber-300 font-semibold">
                              {initials}
                            </div>
                          )}
                        </div>

                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-semibold text-white/90">
                              {countryCode}
                            </span>
                            {player.flag && (
                              <span className="text-xs">{player.flag}</span>
                            )}
                            <span className="w-1 h-1 rounded-full bg-white/20" />
                            <span className="text-[10px] font-medium px-1.5 py-0.2 rounded bg-white/[0.05] text-white/60 border border-white/10">
                              {player.tour}
                            </span>
                          </div>
                          <span className="text-[11px] text-white/40 block mt-0.5">
                            Age {player.age}
                          </span>
                        </div>
                      </div>

                      {player.currentRank > 0 && (
                        <div className="px-2 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/25">
                          <span className="text-xs font-semibold text-amber-300">
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

                    <p className="text-xs text-white/40 truncate mt-0.5 font-normal">
                      {player.plays}
                    </p>

                    {/* Micro Stats */}
                    <div className="grid grid-cols-2 gap-2 mt-3 pt-2.5 border-y border-white/[0.06] text-center">
                      <div>
                        <div className="tabular-nums text-xs font-semibold text-white">
                          {player.grandSlams}
                        </div>
                        <div className="text-[10px] uppercase tracking-wider text-white/40 mt-0.5">
                          Slams
                        </div>
                      </div>
                      <div>
                        <div className="tabular-nums text-xs font-semibold text-amber-300">
                          {player.careerWinLoss.winPercentage}%
                        </div>
                        <div className="text-[10px] uppercase tracking-wider text-white/40 mt-0.5">
                          Win Rate
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 mt-3 border-t border-white/[0.06] flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectPlayer(player)}
                      className="flex-1 flex items-center justify-between px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-white text-xs font-medium border border-white/10 hover:border-white/20 transition-colors group/btn"
                    >
                      <span>View Bio</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-white/60 group-hover/btn:text-white" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        favoritesService.toggleFavorite(player.id);
                      }}
                      className="w-7 h-7 rounded-lg flex items-center justify-center bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 border border-amber-400/30 transition-colors shrink-0"
                      title="Remove from watchlist"
                      aria-label={`Remove ${player.name} from watchlist`}
                    >
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION 2: Center Court Scoreboard */}
      {(currentLiveMatch || featuredMatch) && (
        <div className="bg-[#0e1217] border border-white/10 rounded-xl p-5 sm:p-6 relative overflow-hidden">
          {/* Header & Match Mode Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-white/10 gap-3">
            <div className="flex items-center gap-3">
              {filteredEspnMatches.length > 0 && (
                <div className="flex items-center p-0.5 rounded-lg bg-white/[0.03] border border-white/10">
                  <button
                    type="button"
                    onClick={() => setScoreboardTab('live')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                      scoreboardTab === 'live'
                        ? 'bg-theme-accent/15 text-theme-accent border border-theme-accent/30'
                        : 'text-white/50 hover:text-white'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Live Matches ({filteredEspnMatches.length})</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setScoreboardTab('championship')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                      scoreboardTab === 'championship'
                        ? 'bg-theme-accent/15 text-theme-accent border border-theme-accent/30'
                        : 'text-white/50 hover:text-white'
                    }`}
                  >
                    <Trophy className="w-3.5 h-3.5 text-amber-400" />
                    <span>Featured Match</span>
                  </button>
                </div>
              )}

              {filteredEspnMatches.length === 0 && (
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-theme-accent" />
                  <span className="text-sm font-semibold tracking-wide text-white uppercase">
                    Featured Match
                  </span>
                </div>
              )}
            </div>

            {/* Carousel and Context Controls */}
            <div className="flex items-center gap-2 text-xs">
              {scoreboardTab === 'live' && currentLiveMatch && (
                <>
                  <button
                    type="button"
                    onClick={refreshScoreboard}
                    disabled={isScoreboardLoading}
                    title="Refresh Live Scores"
                    className="p-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-white/50 hover:text-white transition-colors border border-white/10"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isScoreboardLoading ? 'animate-spin text-theme-accent' : ''}`} />
                  </button>

                  <div className="flex items-center gap-1 bg-white/[0.03] px-2 py-1 rounded-lg border border-white/10">
                    <button
                      type="button"
                      onClick={() => setActiveScoreIndex(prev => (prev > 0 ? prev - 1 : filteredEspnMatches.length - 1))}
                      className="text-white/50 hover:text-white p-0.5"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-white/70 px-1 font-mono text-[11px]">
                      {activeScoreIndex + 1} / {filteredEspnMatches.length}
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveScoreIndex(prev => (prev + 1) % filteredEspnMatches.length)}
                      className="text-white/50 hover:text-white p-0.5"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/10 text-white/70">
                    {currentLiveMatch.tour} • {currentLiveMatch.surface} Court
                  </span>
                </>
              )}

              {scoreboardTab === 'championship' && featuredMatch && (
                <>
                  <span className="px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/10 text-white/70">
                    {featuredMatch.surface} Court
                  </span>
                  <span className="text-white/40 hidden sm:inline">{featuredMatch.tournamentName}</span>
                </>
              )}
            </div>
          </div>

          {/* Presentation Grid */}
          {scoreboardTab === 'live' && currentLiveMatch ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* Scorecard Display */}
              <div className="lg:col-span-8 bg-[#0a0d12] rounded-lg p-4 sm:p-5 border border-white/10">
                <div className="space-y-4">
                  
                  {/* Competitor 1 */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="font-display font-semibold text-lg sm:text-xl text-white tracking-tight truncate">
                        {currentLiveMatch.player1.name}
                      </span>
                      {currentLiveMatch.player1.winner && (
                        <span className="text-[10px] uppercase font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 shrink-0">
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
                            className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center font-semibold text-xs sm:text-sm rounded-md border tabular-nums ${
                              isWon
                                ? 'bg-theme-accent/20 text-theme-accent border-theme-accent/40'
                                : 'bg-white/[0.03] text-white/70 border-white/10'
                            }`}
                          >
                            {setVal}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Competitor 2 */}
                  <div className="flex items-center justify-between gap-4 border-t border-white/[0.06] pt-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="font-display font-semibold text-lg sm:text-xl text-white/90 tracking-tight truncate">
                        {currentLiveMatch.player2.name}
                      </span>
                      {currentLiveMatch.player2.winner && (
                        <span className="text-[10px] uppercase font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 shrink-0">
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
                            className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center font-semibold text-xs sm:text-sm rounded-md border tabular-nums ${
                              isWon
                                ? 'bg-theme-accent/20 text-theme-accent border-theme-accent/40'
                                : 'bg-white/[0.03] text-white/70 border-white/10'
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
                    <span className="text-xs text-white/60">
                      {currentLiveMatch.tournamentName} • {currentLiveMatch.round}
                    </span>
                  </div>
                  <span className="font-semibold text-xs sm:text-sm text-theme-accent tracking-wide">
                    {currentLiveMatch.status}
                  </span>
                </div>
              </div>

              {/* Tournament Column */}
              <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/10 text-xs text-white/60 mb-2">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>ESPN Live Feed</span>
                  </div>
                  <p className="text-xs text-white/70 leading-relaxed font-sans">
                    Live match updates from {currentLiveMatch.tournamentName}. Real-time set progression and match scoring.
                  </p>
                </div>

                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => onNavigateTab('tournaments')}
                    className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs font-medium border border-white/10 hover:border-white/20 transition-colors group"
                  >
                    <span>View Tournament Schedule & Draws</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-white/60 group-hover:text-white transition-colors" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigateTab('matches')}
                    className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.06] text-white/70 hover:text-white text-xs font-medium border border-white/5 hover:border-white/10 transition-colors"
                  >
                    <span>Match Results & Archives</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white/40" />
                  </button>
                </div>
              </div>

            </div>
          ) : (
            /* Featured Match Fallback */
            featuredMatch && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-8 bg-[#0a0d12] rounded-lg p-4 sm:p-5 border border-white/10">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-display font-semibold text-lg sm:text-xl text-white tracking-tight">
                          {featuredMatch.player1Name}
                        </span>
                        {featuredMatch.winnerId === featuredMatch.player1Id && (
                          <span className="text-[10px] uppercase font-semibold text-theme-accent px-2 py-0.5 rounded border border-theme-accent/25">
                            Winner
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-white/40">Player 1</span>
                    </div>

                    <div className="flex items-center justify-between border-t border-white/[0.06] pt-3">
                      <div className="flex items-center gap-3">
                        <span className="font-display font-semibold text-lg sm:text-xl text-white/80 tracking-tight">
                          {featuredMatch.player2Name}
                        </span>
                        {featuredMatch.winnerId === featuredMatch.player2Id && (
                          <span className="text-[10px] uppercase font-semibold text-theme-accent px-2 py-0.5 rounded border border-theme-accent/25">
                            Winner
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-white/40">Player 2</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs text-white/40">
                      {featuredMatch.round} • Final Sets
                    </span>
                    <span className="tabular-nums font-bold text-base sm:text-lg text-theme-accent tracking-wider font-mono">
                      {featuredMatch.score}
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-4">
                  <div>
                    {featuredMatch.headline && (
                      <p className="text-xs text-white/80 italic mb-2 leading-relaxed">
                        "{featuredMatch.headline}"
                      </p>
                    )}
                    {featuredMatch.highlights && (
                      <p className="text-xs text-white/50 leading-relaxed">
                        {featuredMatch.highlights}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => onNavigateTab('matches')}
                    className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs font-medium border border-white/10 hover:border-white/20 transition-colors group"
                  >
                    <span>View Match Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-white/60 group-hover:text-white transition-colors" />
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      )}

      {/* SECTION 3: World No. 1s & Latest News */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: World No. 1s (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display font-semibold text-lg text-white tracking-tight">
                World No. 1s
              </h2>
              <p className="text-xs text-white/50 mt-0.5">
                Current ATP & WTA ranking leaders
              </p>
            </div>

            <button
              onClick={() => onNavigateTab('rankings')}
              className="inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-white transition-colors font-medium"
            >
              <span>Full Standings</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className={`grid gap-4 ${selectedTour === 'ALL' ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
            
            {/* ATP World No. 1 Card */}
            {(selectedTour === 'ALL' || selectedTour === 'ATP') && atpNo1 && (
              <div className="bg-[#0e1217] border border-white/10 hover:border-white/20 rounded-xl p-5 flex flex-col justify-between transition-colors group">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-white/10 bg-black/50 shrink-0">
                      {atpNo1.avatarUrl ? (
                        <img
                          src={getAssetUrl(atpNo1.avatarUrl)}
                          alt={atpNo1.name}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-theme-accent font-semibold">
                          {getPlayerInitials(atpNo1.name)}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1.5">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-semibold text-white/90">
                            {getCountryCode(atpNo1.country)}
                          </span>
                          {atpNo1.flag && (
                            <span className="text-xs">{atpNo1.flag}</span>
                          )}
                        </div>
                        <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-white/[0.04] text-theme-accent border border-theme-accent/20">
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

                  {/* Honors Row */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/10 text-center my-3.5">
                    <div>
                      <div className="font-display text-lg font-bold text-white tabular-nums">{atpNo1.grandSlams}</div>
                      <div className="text-[10px] text-white/40 uppercase tracking-wider mt-0.5">Slams</div>
                    </div>
                    <div className="border-x border-white/10">
                      <div className="font-display text-lg font-bold text-white tabular-nums">{atpNo1.careerTitles}</div>
                      <div className="text-[10px] text-white/40 uppercase tracking-wider mt-0.5">Titles</div>
                    </div>
                    <div>
                      <div className="font-display text-lg font-bold text-theme-accent tabular-nums">{atpNo1.careerWinLoss.winPercentage}%</div>
                      <div className="text-[10px] text-white/40 uppercase tracking-wider mt-0.5">Win Rate</div>
                    </div>
                  </div>

                  {/* Surface Win Rates Progress Meters */}
                  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 mb-4">
                    <div className="text-[11px] font-medium text-white/50 uppercase tracking-wider mb-2.5">
                      Surface Win Rates
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-sky-400 font-medium">Hard</span>
                          <span className="font-medium text-white tabular-nums">{atpNo1.surfaceStats.hard.winPercentage}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-sky-400 rounded-full transition-all"
                            style={{ width: `${Math.min(100, atpNo1.surfaceStats.hard.winPercentage)}%` }}
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-amber-500 font-medium">Clay</span>
                          <span className="font-medium text-white tabular-nums">{atpNo1.surfaceStats.clay.winPercentage}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-500 rounded-full transition-all"
                            style={{ width: `${Math.min(100, atpNo1.surfaceStats.clay.winPercentage)}%` }}
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-emerald-400 font-medium">Grass</span>
                          <span className="font-medium text-white tabular-nums">{atpNo1.surfaceStats.grass.winPercentage}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-400 rounded-full transition-all"
                            style={{ width: `${Math.min(100, atpNo1.surfaceStats.grass.winPercentage)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* View Bio & Compare Action Buttons */}
                <div className="flex gap-2 pt-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => onSelectPlayer(atpNo1)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs font-medium border border-white/10 hover:border-white/20 transition-colors"
                  >
                    <User className="w-3.5 h-3.5 text-white/60" />
                    <span>View Bio</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onComparePlayer(atpNo1)}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.02] hover:bg-white/[0.06] text-white/70 hover:text-white text-xs font-medium border border-white/10 hover:border-white/20 transition-colors"
                    title={`Compare ${atpNo1.name}`}
                  >
                    <Swords className="w-3.5 h-3.5 text-white/50" />
                    <span>Compare</span>
                  </button>
                </div>
              </div>
            )}

            {/* WTA World No. 1 Card */}
            {(selectedTour === 'ALL' || selectedTour === 'WTA') && wtaNo1 && (
              <div className="bg-[#0e1217] border border-white/10 hover:border-white/20 rounded-xl p-5 flex flex-col justify-between transition-colors group">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-white/10 bg-black/50 shrink-0">
                      {wtaNo1.avatarUrl ? (
                        <img
                          src={getAssetUrl(wtaNo1.avatarUrl)}
                          alt={wtaNo1.name}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-theme-accent font-semibold">
                          {getPlayerInitials(wtaNo1.name)}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1.5">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-semibold text-white/90">
                            {getCountryCode(wtaNo1.country)}
                          </span>
                          {wtaNo1.flag && (
                            <span className="text-xs">{wtaNo1.flag}</span>
                          )}
                        </div>
                        <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-white/[0.04] text-theme-accent border border-theme-accent/20">
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

                  {/* Honors Row */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/10 text-center my-3.5">
                    <div>
                      <div className="font-display text-lg font-bold text-white tabular-nums">{wtaNo1.grandSlams}</div>
                      <div className="text-[10px] text-white/40 uppercase tracking-wider mt-0.5">Slams</div>
                    </div>
                    <div className="border-x border-white/10">
                      <div className="font-display text-lg font-bold text-white tabular-nums">{wtaNo1.careerTitles}</div>
                      <div className="text-[10px] text-white/40 uppercase tracking-wider mt-0.5">Titles</div>
                    </div>
                    <div>
                      <div className="font-display text-lg font-bold text-theme-accent tabular-nums">{wtaNo1.careerWinLoss.winPercentage}%</div>
                      <div className="text-[10px] text-white/40 uppercase tracking-wider mt-0.5">Win Rate</div>
                    </div>
                  </div>

                  {/* Surface Win Rates Progress Meters */}
                  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 mb-4">
                    <div className="text-[11px] font-medium text-white/50 uppercase tracking-wider mb-2.5">
                      Surface Win Rates
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-sky-400 font-medium">Hard</span>
                          <span className="font-medium text-white tabular-nums">{wtaNo1.surfaceStats.hard.winPercentage}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-sky-400 rounded-full transition-all"
                            style={{ width: `${Math.min(100, wtaNo1.surfaceStats.hard.winPercentage)}%` }}
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-amber-500 font-medium">Clay</span>
                          <span className="font-medium text-white tabular-nums">{wtaNo1.surfaceStats.clay.winPercentage}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-500 rounded-full transition-all"
                            style={{ width: `${Math.min(100, wtaNo1.surfaceStats.clay.winPercentage)}%` }}
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-emerald-400 font-medium">Grass</span>
                          <span className="font-medium text-white tabular-nums">{wtaNo1.surfaceStats.grass.winPercentage}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-400 rounded-full transition-all"
                            style={{ width: `${Math.min(100, wtaNo1.surfaceStats.grass.winPercentage)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* View Bio & Compare Action Buttons */}
                <div className="flex gap-2 pt-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => onSelectPlayer(wtaNo1)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs font-medium border border-white/10 hover:border-white/20 transition-colors"
                  >
                    <User className="w-3.5 h-3.5 text-white/60" />
                    <span>View Bio</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onComparePlayer(wtaNo1)}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.02] hover:bg-white/[0.06] text-white/70 hover:text-white text-xs font-medium border border-white/10 hover:border-white/20 transition-colors"
                    title={`Compare ${wtaNo1.name}`}
                  >
                    <Swords className="w-3.5 h-3.5 text-white/50" />
                    <span>Compare</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Right Column: Latest News (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-theme-accent" />
              <h2 className="font-display font-semibold text-lg text-white tracking-tight">
                Latest News
              </h2>
            </div>

            <button
              onClick={() => onNavigateTab('live')}
              className="inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-white transition-colors font-medium"
            >
              <span>All News</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-[#0e1217] border border-white/10 rounded-xl p-5 flex-1 flex flex-col justify-between space-y-3">
            <div className="space-y-2.5">
              {allItems.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  onClick={() => onNavigateTab('live')}
                  className="p-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded bg-white/[0.04] text-white/60 border border-white/10">
                      {getCategoryLabel(item.category)}
                    </span>
                    <span className="text-[11px] text-white/40 tabular-nums">
                      {getRelativeTime(item.timestamp)}
                    </span>
                  </div>
                  <p className="text-xs text-white/85 line-clamp-2 leading-relaxed font-normal">
                    {decodeHtmlEntities(item.title)}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={() => onNavigateTab('live')}
              className="w-full mt-3 flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 text-white text-xs font-medium transition-colors"
            >
              <span>View Live Newsroom</span>
              <ArrowRight className="w-3.5 h-3.5 text-theme-accent" />
            </button>
          </div>
        </div>

      </div>

      {/* SECTION 4: Top Players */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-center text-theme-accent">
              <Target className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-display font-semibold text-xl text-white tracking-tight">
                Top Players
              </h2>
              <p className="text-xs text-white/50 mt-0.5">
                {selectedTour === 'ALL'
                  ? 'Leading ATP & WTA contenders'
                  : selectedTour === 'ATP'
                  ? "Leading ATP men's contenders"
                  : "Leading WTA women's contenders"}
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('players')}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.07] text-white text-xs font-medium border border-white/10 hover:border-white/20 transition-colors"
          >
            <span>
              {selectedTour === 'ALL'
                ? `View All Players (${players.length})`
                : `View ${selectedTour} Players (${displayedPlayers.length})`}
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-white/50" />
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
