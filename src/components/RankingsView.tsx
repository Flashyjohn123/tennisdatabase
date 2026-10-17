import React, { useState, useMemo, useEffect } from 'react';
import { Player, Tour, PlayerRankSummary, AtpLiveRankEntry } from '../types/tennis';
import { useAtpLiveRankings, ATP_LIVE_URL } from '../services/atpLiveRankingsService';
import { useWtaLiveRankings, WtaLiveRankEntry } from '../services/wtaLiveRankingsService';
import { playerService } from '../services/playerService';
import { getAssetUrl } from '../utils/assetUtils';
import {
  Search,
  TrendingUp,
  TrendingDown,
  Minus,
  ExternalLink,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface RankingsViewProps {
  players?: Player[];
  selectedTour?: Tour | 'ALL';
  onSelectPlayer: (player: Player) => void;
  atpLiveRankings?: AtpLiveRankEntry[];
  isSyncing?: boolean;
  lastSynced?: string | Date | null;
  isLiveSource?: boolean;
}

type RankRange = 'TOP_50' | '51_100' | '101_200' | '201_300' | '301_400' | '401_500' | 'ALL';

const ITEMS_PER_PAGE = 50;

export const RankingsView: React.FC<RankingsViewProps> = ({
  onSelectPlayer,
  selectedTour: propSelectedTour,
  atpLiveRankings: propAtpLiveRankings,
  isSyncing: propIsSyncing,
  lastSynced: propLastSynced,
  isLiveSource: propIsLiveSource,
}) => {
  // Use hook fallback if not passed directly via props
  const hookData = useAtpLiveRankings();
  const wtaHookData = useWtaLiveRankings();
  const atpData = propAtpLiveRankings || hookData.atpLiveRankings;
  const isSyncing = propIsSyncing !== undefined ? propIsSyncing : (hookData.isSyncing || wtaHookData.isSyncing);
  const lastSynced = propLastSynced !== undefined ? propLastSynced : (hookData.lastSynced || wtaHookData.lastSynced);
  const isLiveSource = propIsLiveSource !== undefined ? propIsLiveSource : hookData.isLiveSource;

  const [selectedTour, setSelectedTour] = useState<Tour>(
    propSelectedTour && propSelectedTour !== 'ALL' ? propSelectedTour : 'ATP'
  );

  useEffect(() => {
    if (propSelectedTour && propSelectedTour !== 'ALL') {
      setSelectedTour(propSelectedTour);
    }
  }, [propSelectedTour]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<string>('ALL');
  const [selectedRange, setSelectedRange] = useState<RankRange>('ALL');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Active dataset depending on ATP vs WTA
  const currentDataset: (PlayerRankSummary | AtpLiveRankEntry | WtaLiveRankEntry)[] = useMemo(() => {
    return selectedTour === 'ATP' ? atpData : wtaHookData.wtaLiveRankings;
  }, [selectedTour, atpData, wtaHookData.wtaLiveRankings]);

  // List of unique countries in the current dataset
  const countries = useMemo(() => {
    return Array.from(new Set(currentDataset.map((p) => p.country))).sort();
  }, [currentDataset]);

  // Filtered dataset
  const filteredDataset = useMemo(() => {
    return currentDataset.filter((player) => {
      // Query filter
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        player.name.toLowerCase().includes(q) ||
        player.country.toLowerCase().includes(q) ||
        player.countryCode.toLowerCase().includes(q) ||
        (player.tournamentStatus && player.tournamentStatus.toLowerCase().includes(q));

      // Country filter
      const matchesCountry = selectedCountry === 'ALL' || player.country === selectedCountry;

      // Range filter
      const rank = player.liveRank || player.rank;
      let matchesRange = true;
      if (selectedRange === 'TOP_50') matchesRange = rank <= 50;
      else if (selectedRange === '51_100') matchesRange = rank >= 51 && rank <= 100;
      else if (selectedRange === '101_200') matchesRange = rank >= 101 && rank <= 200;
      else if (selectedRange === '201_300') matchesRange = rank >= 201 && rank <= 300;
      else if (selectedRange === '301_400') matchesRange = rank >= 301 && rank <= 400;
      else if (selectedRange === '401_500') matchesRange = rank >= 401 && rank <= 500;

      return matchesQuery && matchesCountry && matchesRange;
    });
  }, [currentDataset, searchQuery, selectedCountry, selectedRange]);

  // Reset page when filters change
  const totalPages = Math.max(1, Math.ceil(filteredDataset.length / ITEMS_PER_PAGE));
  const validPage = Math.min(currentPage, totalPages);

  const paginatedPlayers = useMemo(() => {
    const start = (validPage - 1) * ITEMS_PER_PAGE;
    return filteredDataset.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredDataset, validPage]);

  // Hydrate and open player details
  const handlePlayerClick = (item: PlayerRankSummary | AtpLiveRankEntry | WtaLiveRankEntry) => {
    const fullProfile = playerService.hydratePlayer(item);
    onSelectPlayer(fullProfile);
  };

  // Format relative sync time
  const formatLastSync = (isoString: string | Date | null) => {
    if (!isoString) return 'Pending initial sync';
    try {
      const diffMs = Date.now() - new Date(isoString).getTime();
      const diffMins = Math.floor(diffMs / (1000 * 60));
      if (diffMins < 1) return 'Just now';
      if (diffMins === 1) return '1 minute ago';
      if (diffMins < 60) return `${diffMins} minutes ago`;
      const diffHours = Math.floor(diffMins / 60);
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } catch {
      return 'Recently';
    }
  };

  // Movement delta badge
  const renderMovementBadge = (movement: number = 0) => {
    if (movement > 0) {
      return (
        <span className="inline-flex items-center gap-0.5 text-xs font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-1.5 py-0.5 rounded-md">
          <TrendingUp className="w-3 h-3" />
          <span>+{movement}</span>
        </span>
      );
    }
    if (movement < 0) {
      return (
        <span className="inline-flex items-center gap-0.5 text-xs font-black text-rose-400 bg-rose-500/10 border border-rose-500/30 px-1.5 py-0.5 rounded-md">
          <TrendingDown className="w-3 h-3" />
          <span>{movement}</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center text-xs font-bold text-emerald-400/50 px-1.5 py-0.5">
        <Minus className="w-3 h-3" />
      </span>
    );
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      
      {/* ATP Live Rankings Scraper Header Banner in Double-Bezel Shell */}
      <div className="double-bezel-card-outer">
        <div className="double-bezel-card-inner p-6 sm:p-8 relative overflow-hidden bg-gradient-to-b from-[#0e1219] to-[#080b0f]">
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-theme-accent" />
                <span className="font-mono text-xs uppercase tracking-widest text-theme-accent font-semibold">
                  Official Circuit Leaderboard
                </span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-white/[0.04] text-white/60 border border-white/[0.08]">
                  {isLiveSource ? 'Live Scraped' : 'Official Engine'}
                </span>
                <span className="text-white/30 hidden sm:inline">•</span>
                <a
                  href={ATP_LIVE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-white/50 hover:text-white transition"
                >
                  <span>atptour.com/rankings/live</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>

              <h1 className="font-display font-semibold text-2xl sm:text-4xl text-white tracking-tight">
                2026 Top 500 World Rankings
              </h1>
              <p className="text-xs sm:text-sm text-white/60 mt-1 max-w-2xl font-normal">
                Complete Top 500 ATP Live Rankings and WTA Standings. Real-time points calculation, tournament progression, and ladder mobility.
              </p>
            </div>

            {/* Automatic Live Sync Status & Tour Switcher */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 bg-black/40 rounded-full px-3.5 py-1.5 border border-white/[0.08] text-xs font-mono">
                <span className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-amber-400 animate-ping' : 'bg-emerald-400 animate-pulse'}`} />
                <span className="text-[11px] uppercase tracking-wider text-white/80 font-medium">
                  {isSyncing ? 'Auto-Syncing Live...' : 'Auto-Sync Active'}
                </span>
                <span className="text-[10px] text-white/40 border-l border-white/10 pl-2 hidden sm:inline tabular-nums">
                  {formatLastSync(lastSynced)}
                </span>
              </div>

              {/* Tour Switcher (ATP vs WTA) */}
              <div className="flex bg-black/40 rounded-full p-1 border border-white/[0.08] text-xs font-mono">
                <button
                  onClick={() => {
                    setSelectedTour('ATP');
                    setCurrentPage(1);
                  }}
                  className={`px-3.5 py-1 rounded-full transition ${
                    selectedTour === 'ATP'
                      ? 'bg-white/[0.12] text-white font-semibold border border-white/20 shadow-sm'
                      : 'text-white/45 hover:text-white'
                  }`}
                >
                  ATP Men (500)
                </button>
                <button
                  onClick={() => {
                    setSelectedTour('WTA');
                    setCurrentPage(1);
                  }}
                  className={`px-3.5 py-1 rounded-full transition ${
                    selectedTour === 'WTA'
                      ? 'bg-white/[0.12] text-white font-semibold border border-white/20 shadow-sm'
                      : 'text-white/45 hover:text-white'
                  }`}
                >
                  WTA Women (500)
                </button>
              </div>
            </div>
          </div>

          {/* Filter Bar: Search, Nation, Range Pills */}
          <div className="mt-6 pt-6 border-t border-white/[0.06] space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Search Input */}
              <div className="sm:col-span-2 relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/35" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder={`Search ${selectedTour} Top 500 by player name, country code, or match status...`}
                  className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-white/[0.08] focus:border-white/20 rounded-xl pl-9 pr-8 py-2 text-xs text-white placeholder-white/35 focus:outline-none transition font-sans"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/40 hover:text-white"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Country Dropdown */}
              <div>
                <select
                  value={selectedCountry}
                  onChange={(e) => {
                    setSelectedCountry(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full bg-white/[0.02] border border-white/[0.08] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none"
                >
                  <option value="ALL" className="bg-black">All Nations ({countries.length})</option>
                  {countries.map((c) => (
                    <option key={c} value={c} className="bg-black">
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Rank Range Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs font-mono">
              <span className="text-white/35 text-[10px] uppercase tracking-wider mr-1 shrink-0">
                Range:
              </span>
              {[
                { id: 'ALL', label: 'All 500' },
                { id: 'TOP_50', label: 'Top 50' },
                { id: '51_100', label: '51-100' },
                { id: '101_200', label: '101-200' },
                { id: '201_300', label: '201-300' },
                { id: '301_400', label: '301-400' },
                { id: '401_500', label: '401-500' },
              ].map((range) => {
                const isSelected = selectedRange === range.id;
                return (
                  <button
                    key={range.id}
                    onClick={() => {
                      setSelectedRange(range.id as RankRange);
                      setCurrentPage(1);
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs transition border whitespace-nowrap ${
                      isSelected
                        ? 'bg-white/[0.1] text-white border-white/20 shadow-sm'
                        : 'bg-white/[0.02] hover:bg-white/[0.05] text-white/50 border-white/[0.06]'
                    }`}
                  >
                    {range.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Rankings Table in Double-Bezel Concentric Shell */}
      <div className="double-bezel-card-outer">
        <div className="double-bezel-card-inner relative overflow-hidden bg-gradient-to-b from-[#0c1015] to-[#080a0d]">
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
          
          {/* Table Results Counter */}
          <div className="px-6 py-4 bg-black/40 border-b border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
            <div className="text-white/50">
              Showing <strong className="text-white font-medium">{filteredDataset.length > 0 ? (validPage - 1) * ITEMS_PER_PAGE + 1 : 0}</strong>-
              <strong className="text-white font-medium">{Math.min(validPage * ITEMS_PER_PAGE, filteredDataset.length)}</strong> of{' '}
              <strong className="text-theme-accent font-medium">{filteredDataset.length}</strong> {selectedTour} Competitors
            </div>

            {/* Quick Page Jump Controls */}
            {totalPages > 1 && (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={validPage <= 1}
                  className="p-1 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-white/70 disabled:opacity-20 border border-white/[0.08] transition"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs font-mono text-white/60 px-2 font-medium">
                  Page {validPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={validPage >= totalPages}
                  className="p-1 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-white/70 disabled:opacity-20 border border-white/[0.08] transition"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-black/20 border-b border-white/[0.06] text-[10px] font-mono uppercase tracking-widest text-white/40">
                  <th className="py-3.5 px-4 sm:px-6 w-16">Rank</th>
                  <th className="py-3.5 px-3 w-16 text-center">Move</th>
                  <th className="py-3.5 px-4">Athlete & Circuit Status</th>
                  <th className="py-3.5 px-3 text-center hidden sm:table-cell">Age</th>
                  <th className="py-3.5 px-4 text-right">Live Points</th>
                  <th className="py-3.5 px-4 text-right hidden md:table-cell">Official Pts</th>
                  <th className="py-3.5 px-4 text-center hidden lg:table-cell">Win Rate</th>
                  <th className="py-3.5 px-4 text-right">Bio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04] text-sm">
                {paginatedPlayers.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-16 text-center text-white/40 text-xs font-mono">
                      No players found matching current search and filter settings.
                    </td>
                  </tr>
                ) : (
                  paginatedPlayers.map((player) => {
                    const currentRank = player.liveRank || player.rank;
                    const movement = player.movement || 0;
                    const livePoints = player.livePoints || player.points;
                    const officialPoints = player.officialPoints || player.points;
                    const winRate = player.winPercentage || 50;
                    const pObj = playerService.getPlayerByName(player.name);
                    const photoUrl = pObj?.avatarUrl;
                    const initials = player.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

                    return (
                      <tr
                        key={player.id}
                        onClick={() => handlePlayerClick(player)}
                        className="hover:bg-white/[0.02] transition group cursor-pointer"
                      >
                        {/* Rank Number */}
                        <td className="py-3.5 px-4 sm:px-6 font-mono tabular-nums">
                          <span
                            className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                              currentRank === 1
                                ? 'bg-theme-accent text-black shadow-sm font-semibold'
                                : currentRank === 2
                                ? 'bg-white/20 text-white font-semibold'
                                : currentRank === 3
                                ? 'bg-amber-500/20 text-amber-200 font-semibold'
                                : 'bg-white/[0.03] text-white/70 border border-white/[0.06]'
                            }`}
                          >
                            {currentRank}
                          </span>
                        </td>

                        {/* Movement */}
                        <td className="py-3.5 px-3 text-center">
                          {renderMovementBadge(movement)}
                        </td>

                        {/* Player Name, Photo Avatar & Tournament Status */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            {/* Real Player Photo Thumbnail */}
                            <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-white/[0.1] bg-black/60 shrink-0 group-hover:border-white/20 transition-all shadow-sm">
                              {photoUrl ? (
                                <img
                                  src={getAssetUrl(photoUrl)}
                                  alt={player.name}
                                  className="w-full h-full object-cover object-top"
                                  loading="lazy"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center font-mono text-[10px] text-theme-accent font-semibold">
                                  {initials}
                                </div>
                              )}
                            </div>

                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-white group-hover:text-theme-accent transition-colors truncate text-xs sm:text-sm">
                                  {player.name}
                                </span>
                                <span className="text-[10px] text-white/40 font-mono">
                                  ({player.countryCode || player.country?.slice(0, 3).toUpperCase()})
                                </span>
                              </div>

                              {player.tournamentStatus ? (
                                <div className="text-[10px] text-theme-accent/85 font-mono truncate mt-0.5 flex items-center gap-1">
                                  <span className="w-1 h-1 rounded-full bg-theme-accent shrink-0" />
                                  <span className="truncate">{player.tournamentStatus}</span>
                                </div>
                              ) : (
                                <div className="text-[10px] text-white/35 truncate mt-0.5 font-mono">
                                  {player.country} • {player.tournamentsPlayed} tournaments
                                </div>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Age */}
                        <td className="py-3.5 px-3 text-center hidden sm:table-cell text-white/60 font-mono text-xs">
                          {player.age}
                        </td>

                        {/* Live Points */}
                        <td className="py-3.5 px-4 text-right">
                          <span className="font-mono font-semibold tabular-nums text-theme-accent text-xs sm:text-sm">
                            {livePoints.toLocaleString()}
                          </span>
                        </td>

                        {/* Official Points */}
                        <td className="py-3.5 px-4 text-right hidden md:table-cell">
                          <span className="font-mono tabular-nums text-white/50 text-xs sm:text-sm">
                            {officialPoints.toLocaleString()}
                          </span>
                        </td>

                        {/* Win Rate */}
                        <td className="py-3.5 px-4 text-center hidden lg:table-cell">
                          <span className="font-mono tabular-nums text-white/80 text-xs">
                            {winRate}%
                          </span>
                        </td>

                        {/* Profile Action */}
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePlayerClick(player);
                            }}
                            className="px-2.5 py-1 rounded-full bg-white/[0.03] hover:bg-white/[0.08] text-white/70 hover:text-white text-[11px] font-mono border border-white/[0.07] transition"
                          >
                            Bio
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Bottom Pagination Bar */}
          {totalPages > 1 && (
            <div className="p-4 bg-black/40 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
              <div className="text-white/40">
                Page {validPage} of {totalPages} ({filteredDataset.length} athletes)
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentPage(1)}
                  disabled={validPage <= 1}
                  className="px-2.5 py-1 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-white/70 disabled:opacity-20 border border-white/[0.07] transition text-[11px]"
                >
                  First
                </button>
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={validPage <= 1}
                  className="px-3 py-1 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-white/70 disabled:opacity-20 border border-white/[0.07] transition flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Prev</span>
                </button>

                {/* Page Number Buttons */}
                <div className="hidden sm:flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum: number;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (validPage <= 3) {
                      pageNum = i + 1;
                    } else if (validPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = validPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-7 h-7 rounded-lg font-mono text-xs transition border ${
                          validPage === pageNum
                            ? 'bg-white/[0.12] text-white border-white/20 font-semibold'
                            : 'bg-white/[0.02] hover:bg-white/[0.06] text-white/50 border-white/[0.06]'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={validPage >= totalPages}
                  className="px-3 py-1 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-white/70 disabled:opacity-20 border border-white/[0.07] transition flex items-center gap-1"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={validPage >= totalPages}
                  className="px-2.5 py-1 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-white/70 disabled:opacity-20 border border-white/[0.07] transition text-[11px]"
                >
                  Last
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RankingsView;

