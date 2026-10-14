import React, { useState } from 'react';
import { Player, Match, Surface } from '../types/tennis';
import { X, Trophy } from 'lucide-react';

interface AddMatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  players: Player[];
  onAddMatch: (match: Match) => void;
}

export const AddMatchModal: React.FC<AddMatchModalProps> = ({
  isOpen,
  onClose,
  players,
  onAddMatch,
}) => {
  const [player1Id, setPlayer1Id] = useState(players[0]?.id || '');
  const [player2Id, setPlayer2Id] = useState(players[1]?.id || '');
  const [winnerId, setWinnerId] = useState(players[0]?.id || '');
  const [tournamentName, setTournamentName] = useState('US Open 2026');
  const [round, setRound] = useState('Final');
  const [surface, setSurface] = useState<Surface>('Hard');
  const [year, setYear] = useState(2026);
  const [score, setScore] = useState('6-4, 7-6(5), 6-3');
  const [headline, setHeadline] = useState('');
  const [highlights, setHighlights] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const p1 = players.find((p) => p.id === player1Id);
    const p2 = players.find((p) => p.id === player2Id);
    if (!p1 || !p2) return;

    const newMatch: Match = {
      id: `match-${Date.now()}`,
      tournamentId: tournamentName.toLowerCase().replace(/\s+/g, '-'),
      tournamentName: tournamentName.trim(),
      year: Number(year),
      round,
      surface,
      player1Id: p1.id,
      player1Name: p1.name,
      player2Id: p2.id,
      player2Name: p2.name,
      winnerId,
      score: score.trim(),
      headline: headline.trim() || undefined,
      highlights: highlights.trim() || undefined,
      stats: {
        aces: [8, 5],
        doubleFaults: [2, 3],
        firstServePercentage: [65, 62],
        breakPointsWon: ['4/7', '2/5'],
        unforcedErrors: [24, 30],
        totalPointsWon: [95, 84],
        matchDurationMinutes: 140,
      }
    };

    onAddMatch(newMatch);
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
                <Trophy className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-display font-semibold text-white tracking-tight">Record Tennis Match</h3>
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
            {/* Tournament & Year */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-white/50 mb-1">Tournament *</label>
                <input
                  type="text"
                  required
                  value={tournamentName}
                  onChange={(e) => setTournamentName(e.target.value)}
                  placeholder="e.g. Wimbledon 2026"
                  className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-amber-400/40 rounded-xl px-3.5 py-2 text-xs text-white placeholder-white/25 focus:outline-none transition font-sans"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-white/50 mb-1">Year</label>
                <input
                  type="number"
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-amber-400/40 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none transition font-mono"
                />
              </div>
            </div>

            {/* Surface & Round */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-white/50 mb-1">Surface</label>
                <select
                  value={surface}
                  onChange={(e) => setSurface(e.target.value as Surface)}
                  className="w-full bg-[#0c0f16] border border-white/[0.08] focus:border-amber-400/40 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                >
                  <option value="Hard" className="bg-[#0c0f16]">Hard Court</option>
                  <option value="Clay" className="bg-[#0c0f16]">Clay Court</option>
                  <option value="Grass" className="bg-[#0c0f16]">Grass Court</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-white/50 mb-1">Round</label>
                <select
                  value={round}
                  onChange={(e) => setRound(e.target.value)}
                  className="w-full bg-[#0c0f16] border border-white/[0.08] focus:border-amber-400/40 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                >
                  <option value="Final" className="bg-[#0c0f16]">Final</option>
                  <option value="Semifinal" className="bg-[#0c0f16]">Semifinal</option>
                  <option value="Quarterfinal" className="bg-[#0c0f16]">Quarterfinal</option>
                  <option value="Round of 16" className="bg-[#0c0f16]">Round of 16</option>
                  <option value="Round of 32" className="bg-[#0c0f16]">Round of 32</option>
                </select>
              </div>
            </div>

            {/* Players Selection */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-white/50 mb-1">Player 1 *</label>
                <select
                  value={player1Id}
                  onChange={(e) => setPlayer1Id(e.target.value)}
                  className="w-full bg-[#0c0f16] border border-white/[0.08] focus:border-amber-400/40 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                >
                  {players.map((p) => (
                    <option key={p.id} value={p.id} className="bg-[#0c0f16]">{p.flag} {p.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-white/50 mb-1">Player 2 *</label>
                <select
                  value={player2Id}
                  onChange={(e) => setPlayer2Id(e.target.value)}
                  className="w-full bg-[#0c0f16] border border-white/[0.08] focus:border-amber-400/40 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                >
                  {players.map((p) => (
                    <option key={p.id} value={p.id} className="bg-[#0c0f16]">{p.flag} {p.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Winner & Score */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-white/50 mb-1">Match Winner *</label>
                <select
                  value={winnerId}
                  onChange={(e) => setWinnerId(e.target.value)}
                  className="w-full bg-[#0c0f16] border border-white/[0.08] focus:border-amber-400/40 rounded-xl px-3 py-2 text-xs text-amber-300 font-semibold focus:outline-none"
                >
                  <option value={player1Id} className="bg-[#0c0f16]">Player 1 ({players.find(p => p.id === player1Id)?.name})</option>
                  <option value={player2Id} className="bg-[#0c0f16]">Player 2 ({players.find(p => p.id === player2Id)?.name})</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-white/50 mb-1">Scoreline *</label>
                <input
                  type="text"
                  required
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                  placeholder="e.g. 6-4, 3-6, 7-6(5)"
                  className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-amber-400/40 rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:outline-none transition"
                />
              </div>
            </div>

            {/* Headline */}
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-white/50 mb-1">Match Headline</label>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="e.g. Epic 5-set comeback victory"
                className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-amber-400/40 rounded-xl px-3.5 py-2 text-xs text-white placeholder-white/25 focus:outline-none transition font-sans"
              />
            </div>

            {/* Highlights */}
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-white/50 mb-1">Key Match Highlights</label>
              <input
                type="text"
                value={highlights}
                onChange={(e) => setHighlights(e.target.value)}
                placeholder="e.g. Saved 3 match points in the fourth set tiebreak..."
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
                Record Match
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
