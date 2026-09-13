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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-court-950/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-court-900 border border-court-700 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-court-750 flex items-center justify-between bg-court-950/60">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-volt-500" />
            <h3 className="text-xl font-black text-white tracking-tight">Record Tennis Match</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-court-800 hover:bg-court-750 text-emerald-300 hover:text-white flex items-center justify-center transition border border-court-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto custom-scrollbar flex-1">
          {/* Tournament & Year */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black text-emerald-300 uppercase tracking-wider mb-1">Tournament *</label>
              <input
                type="text"
                required
                value={tournamentName}
                onChange={(e) => setTournamentName(e.target.value)}
                placeholder="e.g. Wimbledon 2026"
                className="w-full bg-court-950/90 border border-court-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-volt-500/60 focus:border-volt-500"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-emerald-300 uppercase tracking-wider mb-1">Year</label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="w-full bg-court-950/90 border border-court-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-volt-500/60 focus:border-volt-500"
              />
            </div>
          </div>

          {/* Surface & Round */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black text-emerald-300 uppercase tracking-wider mb-1">Surface</label>
              <select
                value={surface}
                onChange={(e) => setSurface(e.target.value as Surface)}
                className="w-full bg-court-950/90 border border-court-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-volt-500/60 focus:border-volt-500"
              >
                <option value="Hard">Hard Court</option>
                <option value="Clay">Clay Court</option>
                <option value="Grass">Grass Court</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-black text-emerald-300 uppercase tracking-wider mb-1">Round</label>
              <select
                value={round}
                onChange={(e) => setRound(e.target.value)}
                className="w-full bg-court-950/90 border border-court-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-volt-500/60 focus:border-volt-500"
              >
                <option value="Final">Final</option>
                <option value="Semifinal">Semifinal</option>
                <option value="Quarterfinal">Quarterfinal</option>
                <option value="Round of 16">Round of 16</option>
                <option value="Round of 32">Round of 32</option>
              </select>
            </div>
          </div>

          {/* Players Selection */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black text-emerald-300 uppercase tracking-wider mb-1">Player 1 *</label>
              <select
                value={player1Id}
                onChange={(e) => setPlayer1Id(e.target.value)}
                className="w-full bg-court-950/90 border border-court-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-volt-500/60 focus:border-volt-500"
              >
                {players.map((p) => (
                  <option key={p.id} value={p.id}>{p.flag} {p.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-black text-emerald-300 uppercase tracking-wider mb-1">Player 2 *</label>
              <select
                value={player2Id}
                onChange={(e) => setPlayer2Id(e.target.value)}
                className="w-full bg-court-950/90 border border-court-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-volt-500/60 focus:border-volt-500"
              >
                {players.map((p) => (
                  <option key={p.id} value={p.id}>{p.flag} {p.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Winner & Score */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black text-emerald-300 uppercase tracking-wider mb-1">Match Winner *</label>
              <select
                value={winnerId}
                onChange={(e) => setWinnerId(e.target.value)}
                className="w-full bg-court-950/90 border border-court-700 rounded-xl px-3 py-2 text-sm text-volt-400 font-bold focus:outline-none focus:ring-2 focus:ring-volt-500/60 focus:border-volt-500"
              >
                <option value={player1Id}>Player 1 ({players.find(p => p.id === player1Id)?.name})</option>
                <option value={player2Id}>Player 2 ({players.find(p => p.id === player2Id)?.name})</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-black text-emerald-300 uppercase tracking-wider mb-1">Scoreline *</label>
              <input
                type="text"
                required
                value={score}
                onChange={(e) => setScore(e.target.value)}
                placeholder="e.g. 6-4, 3-6, 7-6(5)"
                className="w-full bg-court-950/90 border border-court-700 rounded-xl px-4 py-2 text-sm text-white font-mono focus:outline-none focus:ring-2 focus:ring-volt-500/60 focus:border-volt-500"
              />
            </div>
          </div>

          {/* Headline */}
          <div>
            <label className="block text-xs font-black text-emerald-300 uppercase tracking-wider mb-1">Match Headline</label>
            <input
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="e.g. Epic 5-set comeback victory"
              className="w-full bg-court-950/90 border border-court-700 rounded-xl px-4 py-2 text-sm text-white placeholder-emerald-500/40 focus:outline-none focus:ring-2 focus:ring-volt-500/60 focus:border-volt-500"
            />
          </div>

          {/* Highlights */}
          <div>
            <label className="block text-xs font-black text-emerald-300 uppercase tracking-wider mb-1">Key Match Highlights</label>
            <input
              type="text"
              value={highlights}
              onChange={(e) => setHighlights(e.target.value)}
              placeholder="e.g. Saved 3 match points in the fourth set tiebreak..."
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
              Record Match
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
