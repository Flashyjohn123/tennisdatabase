import React, { useState, useEffect, useRef } from 'react';
import { Search, X, User, Trophy, ArrowRight, Star } from 'lucide-react';
import { Player, Tournament } from '../types/tennis';
import { favoritesService } from '../services/favoritesService';

interface GlobalSearchPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  players: Player[];
  tournaments: Tournament[];
  onSelectPlayer: (player: Player) => void;
  onNavigateTab: (tab: string) => void;
}

export const GlobalSearchPalette: React.FC<GlobalSearchPaletteProps> = ({
  isOpen,
  onClose,
  players,
  tournaments,
  onSelectPlayer,
  onNavigateTab,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [favorites, setFavorites] = useState<string[]>(() => favoritesService.getFavorites());

  useEffect(() => {
    return favoritesService.subscribe(setFavorites);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && document.activeElement?.tagName !== 'INPUT')) {
        e.preventDefault();
        onClose(); // toggle or open
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const cleanQuery = query.trim().toLowerCase();

  const matchedPlayers = cleanQuery
    ? players.filter(
        (p) =>
          p.name.toLowerCase().includes(cleanQuery) ||
          p.country.toLowerCase().includes(cleanQuery) ||
          p.countryCode.toLowerCase().includes(cleanQuery)
      ).slice(0, 5)
    : players.filter((p) => favorites.includes(p.id)).slice(0, 4);

  const matchedTournaments = cleanQuery
    ? tournaments.filter(
        (t) =>
          t.name.toLowerCase().includes(cleanQuery) ||
          t.city.toLowerCase().includes(cleanQuery) ||
          t.surface.toLowerCase().includes(cleanQuery)
      ).slice(0, 4)
    : tournaments.slice(0, 3);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-xl rounded-2xl bg-[#090b10] border border-white/[0.12] shadow-2xl overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/[0.08] gap-3 bg-white/[0.02]">
          <Search className="w-4 h-4 text-amber-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type player name, country, tournament, or surface..."
            className="flex-1 bg-transparent text-sm text-white placeholder-white/35 focus:outline-none font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-white/40 hover:text-white transition p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-white/40 bg-white/[0.06] border border-white/[0.08] rounded">
            ESC
          </kbd>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4">
          {/* Players Group */}
          <div>
            <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-widest text-white/40 flex items-center justify-between">
              <span>{cleanQuery ? 'Matched Athletes' : 'Pinned Watchlist Stars'}</span>
              <span className="text-amber-400/70">{matchedPlayers.length} found</span>
            </div>
            {matchedPlayers.length === 0 ? (
              <p className="px-3 py-2 text-xs text-white/30 italic">No athletes matching "{query}"</p>
            ) : (
              <div className="mt-1 space-y-1">
                {matchedPlayers.map((player) => {
                  const isFav = favorites.includes(player.id);
                  return (
                    <div
                      key={player.id}
                      onClick={() => {
                        onSelectPlayer(player);
                        onClose();
                      }}
                      className="group flex items-center justify-between px-3 py-2 rounded-xl hover:bg-white/[0.05] border border-transparent hover:border-white/[0.08] cursor-pointer transition"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg overflow-hidden bg-white/[0.03] border border-white/[0.08] flex items-center justify-center shrink-0">
                          {player.avatarUrl ? (
                            <img src={player.avatarUrl} alt={player.name} className="w-full h-full object-cover" />
                          ) : (
                            <User className="w-4 h-4 text-white/40" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-semibold text-white group-hover:text-amber-300 transition">
                              {player.name}
                            </span>
                            <span className="text-[10px] text-white/40 font-mono">
                              {player.flag} {player.countryCode}
                            </span>
                            {isFav && <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />}
                          </div>
                          <div className="text-[10px] font-mono text-white/45 flex items-center gap-2 mt-0.5">
                            <span>Rank #{player.currentRank}</span>
                            <span>•</span>
                            <span>{player.tour}</span>
                            <span>•</span>
                            <span>{player.careerTitles} Titles</span>
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-white/20 group-hover:text-white group-hover:translate-x-0.5 transition" />
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Tournaments Group */}
          <div>
            <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-widest text-white/40 flex items-center justify-between">
              <span>Tournaments & Grand Slams</span>
              <span className="text-sky-400/70">{matchedTournaments.length}</span>
            </div>
            {matchedTournaments.length === 0 ? (
              <p className="px-3 py-2 text-xs text-white/30 italic">No tournaments matching "{query}"</p>
            ) : (
              <div className="mt-1 space-y-1">
                {matchedTournaments.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => {
                      onNavigateTab('tournaments');
                      onClose();
                    }}
                    className="group flex items-center justify-between px-3 py-2 rounded-xl hover:bg-white/[0.05] border border-transparent hover:border-white/[0.08] cursor-pointer transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-sky-400/10 border border-sky-400/20 flex items-center justify-center shrink-0">
                        <Trophy className="w-3.5 h-3.5 text-sky-400" />
                      </div>
                      <div>
                        <div className="text-xs font-medium text-white group-hover:text-sky-300 transition">
                          {t.name}
                        </div>
                        <div className="text-[10px] font-mono text-white/45 flex items-center gap-2 mt-0.5">
                          <span className="capitalize">{t.surface}</span>
                          <span>•</span>
                          <span>{t.category}</span>
                          <span>•</span>
                          <span>{t.city}</span>
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-white/20 group-hover:text-white group-hover:translate-x-0.5 transition" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Route Shortcuts */}
          <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-white/40 px-2">
            <span>Navigation Quick Links:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  onNavigateTab('draws');
                  onClose();
                }}
                className="hover:text-amber-300 transition underline"
              >
                Draws Simulator
              </button>
              <span>•</span>
              <button
                onClick={() => {
                  onNavigateTab('h2h');
                  onClose();
                }}
                className="hover:text-amber-300 transition underline"
              >
                H2H Predictor
              </button>
              <span>•</span>
              <button
                onClick={() => {
                  onNavigateTab('rankings');
                  onClose();
                }}
                className="hover:text-amber-300 transition underline"
              >
                Top 500
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
