import React, { useState } from 'react';
import { Player, Tour } from '../types/tennis';
import { PlayerCard } from './PlayerCard';
import { Users, Search } from 'lucide-react';

interface PlayersViewProps {
  players: Player[];
  selectedTour: Tour | 'ALL';
  searchQuery: string;
  onSelectPlayer: (player: Player) => void;
  onComparePlayer: (player: Player) => void;
}

export const PlayersView: React.FC<PlayersViewProps> = ({
  players,
  selectedTour,
  searchQuery,
  onSelectPlayer,
  onComparePlayer,
}) => {
  const [localSearch, setLocalSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('ALL');
  const [selectedStyle, setSelectedStyle] = useState<string>('ALL');

  const effectiveSearch = (searchQuery || localSearch).toLowerCase();

  const countries = Array.from(new Set(players.map((p) => p.country))).sort();

  const filteredPlayers = players.filter((player) => {
    const matchesTour = selectedTour === 'ALL' || player.tour === selectedTour;
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

    return matchesTour && matchesSearch && matchesCountry && matchesStyle;
  });

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Header & Filter Controls in Double-Bezel Concentric Shell */}
      <div className="double-bezel-card-outer">
        <div className="double-bezel-card-inner p-6 sm:p-8 relative overflow-hidden bg-gradient-to-b from-[#0e1219] to-[#080b0f]">
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
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
          </div>

          {/* Filter Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-white/[0.06] relative z-10">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/35" />
              <input
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Search by name, play style, nationality..."
                className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-white/[0.08] focus:border-white/20 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-white/35 focus:outline-none transition font-sans"
              />
            </div>

            <div>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
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

            <div>
              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                className="w-full bg-white/[0.02] border border-white/[0.08] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none"
              >
                <option value="ALL" className="bg-black">All Play Styles</option>
                <option value="2HBH" className="bg-black">Two-Handed Backhand</option>
                <option value="1HBH" className="bg-black">One-Handed Backhand</option>
                <option value="Left" className="bg-black">Left-Handed</option>
              </select>
            </div>
          </div>

        </div>
      </div>

      {/* Players Grid */}
      {filteredPlayers.length === 0 ? (
        <div className="rounded-2xl bg-white/[0.02] border border-white/[0.06] p-12 text-center">
          <p className="font-display font-semibold text-base text-white">No players found matching your search and filter criteria.</p>
          <p className="text-xs font-mono text-white/40 mt-1">Try resetting the nationality or style filters.</p>
          <button
            onClick={() => {
              setLocalSearch('');
              setSelectedCountry('ALL');
              setSelectedStyle('ALL');
            }}
            className="mt-4 text-xs font-mono text-white/80 hover:text-white px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] transition"
          >
            Clear Filters
          </button>
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
