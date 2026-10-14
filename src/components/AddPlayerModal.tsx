import React, { useState } from 'react';
import { Player, Tour, Hand } from '../types/tennis';
import { X, UserPlus } from 'lucide-react';

interface AddPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPlayer: (player: Player) => void;
}

export const AddPlayerModal: React.FC<AddPlayerModalProps> = ({ isOpen, onClose, onAddPlayer }) => {
  const [name, setName] = useState('');
  const [tour, setTour] = useState<Tour>('ATP');
  const [country, setCountry] = useState('');
  const [flag, setFlag] = useState('');
  const [age, setAge] = useState<number>(22);
  const [plays, setPlays] = useState<Hand>('Right-handed (two-handed backhand)');
  const [currentRank, setCurrentRank] = useState<number>(10);
  const [careerHighRank, setCareerHighRank] = useState<number>(5);
  const [careerTitles, setCareerTitles] = useState<number>(3);
  const [grandSlams, setGrandSlams] = useState<number>(0);
  const [prizeMoney, setPrizeMoney] = useState('$5,000,000');
  const [bio, setBio] = useState('');
  const [playStyle, setPlayStyle] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const id = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    const newPlayer: Player = {
      id: id || `player-${Date.now()}`,
      name: name.trim(),
      tour,
      country: country.trim() || 'International',
      countryCode: country.slice(0, 3).toUpperCase() || 'INT',
      flag: flag.trim() || '',
      age: Number(age) || 20,
      birthDate: `${2026 - age}-01-01`,
      birthPlace: country.trim() || 'Unknown',
      heightCm: 185,
      turnedPro: 2020,
      plays,
      currentRank: Number(currentRank) || 0,
      careerHighRank: Number(careerHighRank) || 1,
      careerTitles: Number(careerTitles) || 0,
      grandSlams: Number(grandSlams) || 0,
      slamBreakdown: {
        australianOpen: 0,
        rolandGarros: 0,
        wimbledon: 0,
        usOpen: Number(grandSlams) || 0,
      },
      prizeMoneyUsd: prizeMoney.trim() || '$1,000,000',
      careerWinLoss: {
        wins: 100,
        losses: 40,
        winPercentage: 71.4,
      },
      surfaceStats: {
        hard: { wins: 60, losses: 25, winPercentage: 70.5 },
        clay: { wins: 25, losses: 10, winPercentage: 71.4 },
        grass: { wins: 15, losses: 5, winPercentage: 75.0 },
      },
      avatarUrl: '',
      bio: bio.trim() || `${name} is a competitive ${tour} tennis player.`,
      playStyle: playStyle.trim() || 'All-court player with solid groundstrokes and agile movement.',
      notableRivalries: [],
    };

    onAddPlayer(newPlayer);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-lg double-bezel-card-outer max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="double-bezel-card-inner flex flex-col overflow-hidden bg-gradient-to-b from-[#0e1219] via-[#0c1015] to-[#080a0d]">
          {/* Top Sheen */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

          <div className="p-5 sm:p-6 border-b border-white/[0.08] flex items-center justify-between bg-black/40 relative z-10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/25 flex items-center justify-center text-amber-300">
                <UserPlus className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-display font-semibold text-white tracking-tight">Add New Tennis Player</h3>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-white/50 hover:text-white flex items-center justify-center transition border border-white/[0.08]"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 overflow-y-auto custom-scrollbar flex-1 relative z-10">
            {/* Player Name */}
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-white/50 mb-1">Player Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Taylor Fritz, Qinwen Zheng..."
                className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-amber-400/40 rounded-xl px-3.5 py-2 text-xs text-white placeholder-white/25 focus:outline-none transition font-sans"
              />
            </div>

            {/* Tour & Flag */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-white/50 mb-1">Tour *</label>
                <select
                  value={tour}
                  onChange={(e) => setTour(e.target.value as Tour)}
                  className="w-full bg-[#0c0f16] border border-white/[0.08] focus:border-amber-400/40 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                >
                  <option value="ATP" className="bg-[#0c0f16]">ATP (Men)</option>
                  <option value="WTA" className="bg-[#0c0f16]">WTA (Women)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-white/50 mb-1">Flag Emoji</label>
                <input
                  type="text"
                  value={flag}
                  onChange={(e) => setFlag(e.target.value)}
                  placeholder="e.g. 🇺🇸, 🇪🇸, 🇮🇹"
                  className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-amber-400/40 rounded-xl px-3.5 py-2 text-xs text-white placeholder-white/25 focus:outline-none transition font-sans"
                />
              </div>
            </div>

            {/* Country & Age */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-white/50 mb-1">Country</label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="e.g. United States"
                  className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-amber-400/40 rounded-xl px-3.5 py-2 text-xs text-white placeholder-white/25 focus:outline-none transition font-sans"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-white/50 mb-1">Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  min={14}
                  max={60}
                  className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-amber-400/40 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none transition font-mono"
                />
              </div>
            </div>

            {/* Playing Hand */}
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-white/50 mb-1">Playing Style / Hand</label>
              <select
                value={plays}
                onChange={(e) => setPlays(e.target.value as Hand)}
                className="w-full bg-[#0c0f16] border border-white/[0.08] focus:border-amber-400/40 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              >
                <option value="Right-handed (two-handed backhand)" className="bg-[#0c0f16]">Right-handed (two-handed backhand)</option>
                <option value="Right-handed (one-handed backhand)" className="bg-[#0c0f16]">Right-handed (one-handed backhand)</option>
                <option value="Left-handed (two-handed backhand)" className="bg-[#0c0f16]">Left-handed (two-handed backhand)</option>
                <option value="Left-handed (one-handed backhand)" className="bg-[#0c0f16]">Left-handed (one-handed backhand)</option>
              </select>
            </div>

            {/* Rank & Career High */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-white/50 mb-1">Current Rank</label>
                <input
                  type="number"
                  value={currentRank}
                  onChange={(e) => setCurrentRank(Number(e.target.value))}
                  min={0}
                  className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-amber-400/40 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none transition font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-white/50 mb-1">Career High Rank</label>
                <input
                  type="number"
                  value={careerHighRank}
                  onChange={(e) => setCareerHighRank(Number(e.target.value))}
                  min={1}
                  className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-amber-400/40 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none transition font-mono"
                />
              </div>
            </div>

            {/* Slams, Titles & Prize Money */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-white/50 mb-1">Slams</label>
                <input
                  type="number"
                  value={grandSlams}
                  onChange={(e) => setGrandSlams(Number(e.target.value))}
                  min={0}
                  className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-amber-400/40 rounded-xl px-3 py-2 text-xs text-white focus:outline-none transition font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-white/50 mb-1">Titles</label>
                <input
                  type="number"
                  value={careerTitles}
                  onChange={(e) => setCareerTitles(Number(e.target.value))}
                  min={0}
                  className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-amber-400/40 rounded-xl px-3 py-2 text-xs text-white focus:outline-none transition font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-white/50 mb-1">Prize Money</label>
                <input
                  type="text"
                  value={prizeMoney}
                  onChange={(e) => setPrizeMoney(e.target.value)}
                  placeholder="$5,000,000"
                  className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-amber-400/40 rounded-xl px-3 py-2 text-xs text-white focus:outline-none transition font-mono"
                />
              </div>
            </div>

            {/* Playstyle */}
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-white/50 mb-1">Playstyle Summary</label>
              <input
                type="text"
                value={playStyle}
                onChange={(e) => setPlayStyle(e.target.value)}
                placeholder="e.g. Big server with powerful forehand"
                className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-amber-400/40 rounded-xl px-3.5 py-2 text-xs text-white placeholder-white/25 focus:outline-none transition font-sans"
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-white/50 mb-1">Short Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={2}
                placeholder="Career highlights or background notes..."
                className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-amber-400/40 rounded-xl px-3.5 py-2 text-xs text-white placeholder-white/25 focus:outline-none transition font-sans"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-mono font-medium text-white/60 hover:text-white rounded-xl bg-white/[0.04] hover:bg-white/[0.08] transition border border-white/[0.08]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-mono font-semibold text-black rounded-xl bg-amber-300 hover:bg-amber-200 shadow-lg shadow-amber-400/10 transition"
              >
                Save Player Dossier
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
