import React, { useState, useEffect } from 'react';
import { Player, Tour } from '../types/tennis';
import { PlayerCard } from './PlayerCard';
import { Users, Search, Star, UserPlus } from 'lucide-react';
import { favoritesService } from '../services/favoritesService';

interface PlayersViewProps {
  players: Player[];
  selectedTour: Tour | 'ALL';
  onSelectTour?: (tour: Tour | 'ALL') => void;
  searchQuery: string;
  onSelectPlayer: (player: Player) => void;
  onComparePlayer: (player: Player) => void;
  onOpenAddPlayer?: () => void;
}

export const PlayersView: React.FC<PlayersViewProps> = ({
  players,
  selectedTour,
  onSelectTour,
  searchQuery,
  onSelectPlayer,
  onComparePlayer,
  onOpenAddPlayer,
}) => {
  const [internalTour, setInternalTour] = useState<Tour | 'ALL'>(selectedTour);
  const activeTour = onSelectTour ? selectedTour : internalTour;
  const handleTourChange = (t: Tour | 'ALL') => {
    if (onSelectTour) onSelectTour(t);
    else setInternalTour(t);
  };

  const [localSearch, setLocalSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('ALL');
  const [selectedStyle, setSelectedStyle] = useState<string>('ALL');
  const [watchlistOnly, setWatchlistOnly] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<string[]>(() => favoritesService.getFavorites());

  useEffect(() => {
    setFavorites(favoritesService.getFavorites());
    return favoritesService.subscribe((favs) => {
      setFavorites(favs);
    });
  }, []);

  const effectiveSearch = (searchQuery || localSearch).toLowerCase();

  const countries = Array.from(new Set(players.map((p) => p.country))).sort();

  const filteredPlayers = players.filter((player) => {
    const matchesTour = activeTour === 'ALL' || player.tour === activeTour;
    const matchesSearch =
      player.name.toLowerCase().includes(effectiveSearch) ||
      player.country.toLowerCase().includes(effectiveSearch) ||
      player.playStyle.toLowerCase().includes(effectiveSearch);
    const matchesCountry = selectedCountry === 'ALL' || player.country === selectedCountry;
    const matchesStyle =
      selectedStyle === 'ALL' ||
      (selectedStyle === '1HBH' && player.plays.includes('one-handed')) ||
      (selectedStyle === '2HBH' && player.plays.includes('two-handed')) ||
      (selectedStyle === 'Left' && player.plays.includes('Left-handed'));
    const matchesWatchlist = !watchlistOnly || favorites.includes(player.id);

    return matchesTour && matchesSearch && matchesCountry && matchesStyle && matchesWatchlist;
  });

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Header & Filter Controls in Double-Bezel Concentric Shell */}
      <div className="double-bezel-card-outer">
        <div className="double-bezel-card-inner p-6 sm:p-8 relative overflow-hidden bg-gradient-to-b from-[#0e1219] to-[#080b0f]">
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Users className="w-4 h-4 text-theme-accent" />
                <span className="font-mono text-xs uppercase tracking-widest text-theme-accent font-semibold">
                  Athlete Database
                </span>
              </div>
              <h2 className="font-display font-semibold text-2xl sm:text-3xl text-white tracking-tight">
                Player Dossiers ({filteredPlayers.length})
              </h2>
              <p className="text-xs sm:text-sm text-white/60 mt-1 font-normal">
                Inspect world stars, Grand Slam trophy cabinets, bio telemetry, and surface statistics.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Tour Switcher: ALL / ATP / WTA */}
              <div className="flex items-center p-1 rounded-xl bg-white/[0.03] border border-white/[0.08] shrink-0">
                {(['ALL', 'ATP', 'WTA'] as const).map((tour) => {
                  const isSelected = activeTour === tour;
                  return (
                    <button
                      key={tour}
                      type="button"
                      onClick={() => handleTourChange(tour)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold tracking-wider transition-all ${
                        isSelected
                          ? 'bg-white/[0.12] text-white border border-white/20 shadow-sm'
                          : 'text-white/40 hover:text-white/80 hover:bg-white/[0.04]'
                      }`}
                    >
                      {tour === 'ALL' ? 'ALL TOURS' : tour}
                    </button>
                  );
                })}
              </div>

              {onOpenAddPlayer && (
                <button
                  type="button"
                  onClick={onOpenAddPlayer}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 border border-amber-400/30 hover:border-amber-400/50 text-xs font-mono font-semibold transition-all shadow-[0_0_16px_rgba(251,191,36,0.1)] group shrink-0"
                >
                  <UserPlus className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                  <span>+ Add Player</span>
                </button>
              )}
            </div>
          </div>

          {/* Filter Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 mt-6 pt-6 border-t border-white/[0.06] relative z-10 items-center">
            {/* Search Input */}
            <div className="sm:col-span-5 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/35" />
              <input
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Search by name, play style, nationality..."
                className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-white/[0.08] focus:border-white/20 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-white/35 focus:outline-none transition font-sans"
              />
            </div>

            {/* Watchlist Toggle Tab */}
            <div className="sm:col-span-3">
              <button
                type="button"
                onClick={() => setWatchlistOnly(!watchlistOnly)}
                className={`w-full flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-medium transition-all border ${
                  watchlistOnly
                    ? 'bg-amber-400/20 border-amber-400/50 text-amber-300 shadow-[0_0_14px_rgba(251,191,36,0.2)]'
                    : 'bg-white/[0.02] border-white/[0.08] text-white/60 hover:text-white hover:bg-white/[0.05]'
                }`}
                title="Filter to star-rated watchlist players"
              >
                <Star
                  className={`w-3.5 h-3.5 transition-transform ${
                    watchlistOnly ? 'fill-amber-400 text-amber-400 scale-110' : 'text-amber-400/70'
                  }`}
                />
                <span className="font-semibold">★ Watchlist</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono tabular-nums ${
                    watchlistOnly
                      ? 'bg-amber-400/30 text-amber-200'
                      : 'bg-white/[0.05] text-white/50'
                  }`}
                >
                  {favorites.length}
                </span>
              </button>
            </div>

            {/* Country Selector */}
            <div className="sm:col-span-2">
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full bg-white/[0.02] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              >
                <option value="ALL" className="bg-[#0b0e14]">All Nations ({countries.length})</option>
                {countries.map((c) => (
                  <option key={c} value={c} className="bg-[#0b0e14]">
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Style Selector */}
            <div className="sm:col-span-2">
              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                className="w-full bg-white/[0.02] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              >
                <option value="ALL" className="bg-[#0b0e14]">All Styles</option>
                <option value="2HBH" className="bg-[#0b0e14]">Two-Handed Backhand</option>
                <option value="1HBH" className="bg-[#0b0e14]">One-Handed Backhand</option>
                <option value="Left" className="bg-[#0b0e14]">Left-Handed</option>
              </select>
            </div>
          </div>

        </div>
      </div>

      {/* Players Grid */}
      {filteredPlayers.length === 0 ? (
        <div className="rounded-2xl bg-white/[0.02] border border-white/[0.06] p-12 text-center">
          {watchlistOnly ? (
            <>
              <div className="w-12 h-12 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 text-amber-400" />
              </div>
              <p className="font-display font-semibold text-base text-white">Your Watchlist is empty.</p>
              <p className="text-xs font-mono text-white/40 mt-1 max-w-md mx-auto">
                Star players across the database to track their matches, titles, and live telemetry here.
              </p>
              <button
                onClick={() => setWatchlistOnly(false)}
                className="mt-4 text-xs font-mono text-amber-300 hover:text-white px-4 py-2 rounded-full bg-amber-400/10 border border-amber-400/30 transition"
              >
                Show All Players
              </button>
            </>
          ) : (
            <>
              <p className="font-display font-semibold text-base text-white">No players found matching your search and filter criteria.</p>
              <p className="text-xs font-mono text-white/40 mt-1">Try resetting the nationality or style filters.</p>
              <button
                onClick={() => {
                  setLocalSearch('');
                  setSelectedCountry('ALL');
                  setSelectedStyle('ALL');
                  setWatchlistOnly(false);
                }}
                className="mt-4 text-xs font-mono text-white/80 hover:text-white px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] transition"
              >
                Clear Filters
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlayers.map((player) => (
            <PlayerCard
              key={player.id}
              player={player}
              onSelect={onSelectPlayer}
              onCompare={onComparePlayer}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PlayersView;
