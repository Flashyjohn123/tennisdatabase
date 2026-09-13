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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-court-950/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-court-900 border border-court-700 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-court-750 flex items-center justify-between bg-court-950/60">
          <div className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-volt-500" />
            <h3 className="text-xl font-black text-white tracking-tight">Add New Tennis Player</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-court-800 hover:bg-court-750 text-emerald-300 hover:text-white flex items-center justify-center transition border border-court-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto custom-scrollbar flex-1">
          {/* Player Name */}
          <div>
            <label className="block text-xs font-black text-emerald-300 uppercase tracking-wider mb-1">Player Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Taylor Fritz, Qinwen Zheng..."
              className="w-full bg-court-950/90 border border-court-700 rounded-xl px-4 py-2 text-sm text-white placeholder-emerald-500/40 focus:outline-none focus:ring-2 focus:ring-volt-500/60 focus:border-volt-500"
            />
          </div>

          {/* Tour & Flag */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black text-emerald-300 uppercase tracking-wider mb-1">Tour *</label>
              <select
                value={tour}
                onChange={(e) => setTour(e.target.value as Tour)}
                className="w-full bg-court-950/90 border border-court-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-volt-500/60 focus:border-volt-500"
              >
                <option value="ATP">ATP (Men)</option>
                <option value="WTA">WTA (Women)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-black text-emerald-300 uppercase tracking-wider mb-1">Flag Emoji</label>
              <input
                type="text"
                value={flag}
                onChange={(e) => setFlag(e.target.value)}
                placeholder="e.g. 🇺🇸, 🇪🇸, 🇮🇹"
                className="w-full bg-court-950/90 border border-court-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-volt-500/60 focus:border-volt-500"
              />
            </div>
          </div>

          {/* Country & Age */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black text-emerald-300 uppercase tracking-wider mb-1">Country</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="e.g. United States"
                className="w-full bg-court-950/90 border border-court-700 rounded-xl px-4 py-2 text-sm text-white placeholder-emerald-500/40 focus:outline-none focus:ring-2 focus:ring-volt-500/60 focus:border-volt-500"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-emerald-300 uppercase tracking-wider mb-1">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                min={14}
                max={60}
                className="w-full bg-court-950/90 border border-court-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-volt-500/60 focus:border-volt-500"
              />
            </div>
          </div>

          {/* Playing Hand */}
          <div>
            <label className="block text-xs font-black text-emerald-300 uppercase tracking-wider mb-1">Playing Style / Hand</label>
            <select
              value={plays}
              onChange={(e) => setPlays(e.target.value as Hand)}
              className="w-full bg-court-950/90 border border-court-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-volt-500/60 focus:border-volt-500"
            >
              <option value="Right-handed (two-handed backhand)">Right-handed (two-handed backhand)</option>
              <option value="Right-handed (one-handed backhand)">Right-handed (one-handed backhand)</option>
              <option value="Left-handed (two-handed backhand)">Left-handed (two-handed backhand)</option>
              <option value="Left-handed (one-handed backhand)">Left-handed (one-handed backhand)</option>
            </select>
          </div>

          {/* Rank & Career High */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-black text-emerald-300 uppercase tracking-wider mb-1">Current Rank</label>
              <input
                type="number"
                value={currentRank}
                onChange={(e) => setCurrentRank(Number(e.target.value))}
                min={0}
                className="w-full bg-court-950/90 border border-court-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-volt-500/60"
              />
            </div>

            <div>
              <label className="block text-[11px] font-black text-emerald-300 uppercase tracking-wider mb-1">Career High Rank</label>
              <input
                type="number"
                value={careerHighRank}
                onChange={(e) => setCareerHighRank(Number(e.target.value))}
                min={1}
                className="w-full bg-court-950/90 border border-court-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-volt-500/60"
              />
            </div>
          </div>

          {/* Slams, Titles & Prize Money */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-black text-emerald-300 uppercase tracking-wider mb-1">Grand Slams</label>
              <input
                type="number"
                value={grandSlams}
                onChange={(e) => setGrandSlams(Number(e.target.value))}
                min={0}
                className="w-full bg-court-950/90 border border-court-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-volt-500/60"
              />
            </div>

            <div>
              <label className="block text-[11px] font-black text-emerald-300 uppercase tracking-wider mb-1">Career Titles</label>
              <input
                type="number"
                value={careerTitles}
                onChange={(e) => setCareerTitles(Number(e.target.value))}
                min={0}
                className="w-full bg-court-950/90 border border-court-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-volt-500/60"
              />
            </div>

            <div>
              <label className="block text-[11px] font-black text-emerald-300 uppercase tracking-wider mb-1">Prize Money</label>
              <input
                type="text"
                value={prizeMoney}
                onChange={(e) => setPrizeMoney(e.target.value)}
                placeholder="$5,000,000"
                className="w-full bg-court-950/90 border border-court-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-volt-500/60"
              />
            </div>
          </div>

          {/* Playstyle */}
          <div>
            <label className="block text-xs font-black text-emerald-300 uppercase tracking-wider mb-1">Playstyle Summary</label>
            <input
              type="text"
              value={playStyle}
              onChange={(e) => setPlayStyle(e.target.value)}
              placeholder="e.g. Big server with powerful forehand"
              className="w-full bg-court-950/90 border border-court-700 rounded-xl px-4 py-2 text-sm text-white placeholder-emerald-500/40 focus:outline-none focus:ring-2 focus:ring-volt-500/60 focus:border-volt-500"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-xs font-black text-emerald-300 uppercase tracking-wider mb-1">Short Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={2}
              placeholder="Career highlights or background notes..."
              className="w-full bg-court-950/90 border border-court-700 rounded-xl px-4 py-2 text-sm text-white placeholder-emerald-500/40 focus:outline-none focus:ring-2 focus:ring-volt-500/60 focus:border-volt-500"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-emerald-300/80 hover:text-white rounded-xl bg-court-800 hover:bg-court-750 transition border border-court-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-xs font-black text-court-950 rounded-xl bg-gradient-to-r from-volt-500 to-grass-500 hover:from-volt-400 hover:to-grass-400 shadow-lg shadow-volt-500/20 transition border border-volt-300/40"
            >
              Save Player
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
