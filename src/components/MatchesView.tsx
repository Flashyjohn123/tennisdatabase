import React, { useState } from 'react';
import { Match, Surface, Player } from '../types/tennis';
import { ChevronDown, ChevronUp, Timer, Activity } from 'lucide-react';

interface MatchesViewProps {
  matches: Match[];
  players: Player[];
  onSelectPlayer: (player: Player) => void;
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

const getCountryCode = (country?: string): string => {
  if (!country) return 'INT';
  if (COUNTRY_ISO_MAP[country]) return COUNTRY_ISO_MAP[country];
  return country.length <= 3 ? country.toUpperCase() : country.slice(0, 3).toUpperCase();
};

export const MatchesView: React.FC<MatchesViewProps> = ({
  matches,
  players,
  onSelectPlayer,
}) => {
  const [selectedSurface, setSelectedSurface] = useState<Surface | 'ALL'>('ALL');
  const [expandedMatchId, setExpandedMatchId] = useState<string | null>(null);

  const getPlayer = (id: string) => players.find((p) => p.id === id);

  const filteredMatches = matches.filter(
    (m) => selectedSurface === 'ALL' || m.surface === selectedSurface
  );

  const toggleExpand = (id: string) => {
    setExpandedMatchId(expandedMatchId === id ? null : id);
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      
      {/* Header & Surface Filter Banner in Double-Bezel Concentric Shell */}
      <div className="double-bezel-card-outer">
        <div className="double-bezel-card-inner p-6 sm:p-8 relative overflow-hidden bg-gradient-to-b from-[#0e1219] to-[#080b0f]">
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Activity className="w-4 h-4 text-theme-accent" />
                <span className="font-mono text-xs uppercase tracking-widest text-theme-accent font-semibold">
                  Championship Archive & Box Scores
                </span>
              </div>
              <h2 className="font-display font-semibold text-2xl sm:text-3xl text-white tracking-tight">
                Championship Match Log
              </h2>
              <p className="text-xs sm:text-sm text-white/60 mt-1 font-normal">
                Detailed scorecards, serve telemetry, break point conversions, and rally stats for premier Grand Slam encounters.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Refined Oyster Surface Selector */}
              <div className="flex bg-white/[0.02] rounded-full p-1 border border-white/[0.06] text-xs font-mono">
                {(['ALL', 'Hard', 'Clay', 'Grass'] as const).map((surf) => (
                  <button
                    key={surf}
                    onClick={() => setSelectedSurface(surf)}
                    className={`px-3.5 py-1.5 rounded-full transition font-medium text-xs ${
                      selectedSurface === surf
                        ? 'bg-white/[0.12] text-white border border-white/20 shadow-sm font-semibold'
                        : 'text-white/45 hover:text-white'
                    }`}
                  >
                    {surf === 'ALL' ? 'All Courts' : `${surf} Court`}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Match Cards List in Concentric Double-Bezel Architecture */}
      <div className="space-y-4">
        {filteredMatches.length === 0 ? (
          <div className="rounded-2xl bg-white/[0.02] border border-white/[0.06] p-12 text-center">
            <p className="text-white/50 text-xs font-mono uppercase tracking-wider">
              No matches found for the selected surface filter
            </p>
          </div>
        ) : (
          filteredMatches.map((m) => {
            const p1 = getPlayer(m.player1Id);
            const p2 = getPlayer(m.player2Id);
            const p1Won = m.winnerId === m.player1Id;
            const isExpanded = expandedMatchId === m.id;

            return (
              <div
                key={m.id}
                className="double-bezel-card-outer group"
              >
                <div className="double-bezel-card-inner p-5 sm:p-6 relative overflow-hidden bg-gradient-to-b from-[#0c1015] to-[#080a0d]">
                  <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

                  {/* Match Header Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-white/[0.06]">
                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className="font-display font-semibold text-white text-sm">{m.tournamentName}</span>
                      <span className="text-white/20">•</span>
                      <span className="text-white/70">{m.round}</span>
                      <span className="text-white/20">•</span>
                      <span className="text-white/40">{m.year}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-white/[0.04] text-white/70 border border-white/[0.08]">
                        {m.surface} Court
                      </span>
                    </div>
                  </div>

                  {/* Scoreboard Layout */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center mb-3">
                    
                    {/* Players Section */}
                    <div className="md:col-span-8 space-y-2">
                      
                      {/* Player 1 Row */}
                      <div 
                        onClick={() => p1 && onSelectPlayer(p1)}
                        className={`flex items-center justify-between p-2.5 sm:p-3 rounded-xl border transition cursor-pointer ${
                          p1Won 
                            ? 'bg-white/[0.04] border-white/[0.14] shadow-sm' 
                            : 'bg-black/30 border-white/[0.05] hover:border-white/[0.1]'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {/* Real Player Photo Thumbnail */}
                          <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-white/[0.1] bg-black/60 shrink-0 shadow-sm">
                            {p1?.avatarUrl ? (
                              <img
                                src={p1.avatarUrl}
                                alt={m.player1Name}
                                className="w-full h-full object-cover object-top"
                                loading="lazy"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center font-mono text-[10px] text-theme-accent font-semibold">
                                {m.player1Name.slice(0, 2).toUpperCase()}
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-2 min-w-0">
                            <span className="font-mono text-[10px] text-white/50 px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.06]">
                              {getCountryCode(p1?.country)}
                            </span>
                            <span className={`text-sm sm:text-base tracking-tight truncate ${p1Won ? 'font-semibold text-white' : 'font-normal text-white/70'}`}>
                              {m.player1Name}
                            </span>
                          </div>
                        </div>

                        {p1Won && (
                          <span className="text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full bg-white/[0.05] text-theme-accent border border-theme-accent/30 shrink-0">
                            Winner
                          </span>
                        )}
                      </div>

                      {/* Player 2 Row */}
                      <div 
                        onClick={() => p2 && onSelectPlayer(p2)}
                        className={`flex items-center justify-between p-2.5 sm:p-3 rounded-xl border transition cursor-pointer ${
                          !p1Won 
                            ? 'bg-white/[0.04] border-white/[0.14] shadow-sm' 
                            : 'bg-black/30 border-white/[0.05] hover:border-white/[0.1]'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {/* Real Player Photo Thumbnail */}
                          <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-white/[0.1] bg-black/60 shrink-0 shadow-sm">
                            {p2?.avatarUrl ? (
                              <img
                                src={p2?.avatarUrl}
                                alt={m.player2Name}
                                className="w-full h-full object-cover object-top"
                                loading="lazy"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center font-mono text-[10px] text-theme-accent font-semibold">
                                {m.player2Name.slice(0, 2).toUpperCase()}
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-2 min-w-0">
                            <span className="font-mono text-[10px] text-white/50 px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.06]">
                              {getCountryCode(p2?.country)}
                            </span>
                            <span className={`text-sm sm:text-base tracking-tight truncate ${!p1Won ? 'font-semibold text-white' : 'font-normal text-white/70'}`}>
                              {m.player2Name}
                            </span>
                          </div>
                        </div>

                        {!p1Won && (
                          <span className="text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full bg-white/[0.05] text-theme-accent border border-theme-accent/30 shrink-0">
                            Winner
                          </span>
                        )}
                      </div>

                    </div>

                    {/* Final Scoreline & Telemetry Toggle */}
                    <div className="md:col-span-4 flex flex-col items-start md:items-end justify-center bg-black/40 p-4 rounded-xl border border-white/[0.06]">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-white/35 mb-1">
                        Final Scoreline
                      </span>
                      <div className="font-mono tabular-nums font-bold text-theme-accent text-sm sm:text-base tracking-wider">
                        {m.score}
                      </div>

                      {m.stats && (
                        <button
                          onClick={() => toggleExpand(m.id)}
                          className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-white/75 hover:text-white text-xs font-mono border border-white/[0.07] transition"
                        >
                          <span>{isExpanded ? 'Hide Match Stats' : 'View Box Score'}</span>
                          {isExpanded ? <ChevronUp className="w-3 h-3 text-theme-accent" /> : <ChevronDown className="w-3 h-3 text-white/50" />}
                        </button>
                      )}
                    </div>

                  </div>

                  {/* Match Headline / Editorial Note */}
                  {m.headline && (
                    <div className="text-xs text-white/75 mt-3 bg-black/30 p-3.5 rounded-xl border border-white/[0.05]">
                      <span className="text-theme-accent font-medium font-mono text-[11px]">Editorial Summary: </span>
                      <span className="font-serif italic text-white/80">"{m.headline}"</span>
                      {m.highlights && <span className="text-white/45 block mt-1 font-sans">{m.highlights}</span>}
                    </div>
                  )}

                  {/* Expandable Match Box Score Table */}
                  {isExpanded && m.stats && (
                    <div className="mt-4 pt-4 border-t border-white/[0.06] space-y-3 animate-fadeIn">
                      <div className="flex items-center justify-between text-xs font-mono text-white/60 pb-1">
                        <span className="text-white/80 flex items-center gap-1.5">
                          <span>Box Score Statistics</span>
                        </span>
                        <span className="flex items-center gap-1.5 text-white/40">
                          <Timer className="w-3 h-3 text-white/40" /> Duration: {m.stats.matchDurationMinutes} mins
                        </span>
                      </div>

                      <div className="bg-black/40 rounded-xl p-4 border border-white/[0.06] space-y-2.5">
                        {/* Column Header */}
                        <div className="flex justify-between text-xs font-mono text-white/70 border-b border-white/[0.06] pb-2">
                          <span className="w-1/3 truncate text-white font-medium">{m.player1Name}</span>
                          <span className="w-1/3 text-center uppercase tracking-widest text-white/35 text-[9px]">Match Category</span>
                          <span className="w-1/3 text-right truncate text-white font-medium">{m.player2Name}</span>
                        </div>

                        <StatBoxRow label="Aces" val1={m.stats.aces[0]} val2={m.stats.aces[1]} />
                        <StatBoxRow label="Double Faults" val1={m.stats.doubleFaults[0]} val2={m.stats.doubleFaults[1]} />
                        <StatBoxRow label="1st Serve %" val1={`${m.stats.firstServePercentage[0]}%`} val2={`${m.stats.firstServePercentage[1]}%`} />
                        <StatBoxRow label="Break Points Won" val1={m.stats.breakPointsWon[0]} val2={m.stats.breakPointsWon[1]} />
                        <StatBoxRow label="Unforced Errors" val1={m.stats.unforcedErrors[0]} val2={m.stats.unforcedErrors[1]} />
                        <StatBoxRow label="Total Points Won" val1={m.stats.totalPointsWon[0]} val2={m.stats.totalPointsWon[1]} />
                      </div>
                    </div>
                  )}

                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};

const StatBoxRow: React.FC<{ label: string; val1: string | number; val2: string | number }> = ({
  label,
  val1,
  val2,
}) => {
  return (
    <div className="flex justify-between items-center text-xs font-mono py-1">
      <span className="w-1/3 tabular-nums font-semibold text-white/90">{val1}</span>
      <span className="w-1/3 text-center text-white/40 text-[10px] uppercase tracking-wider">{label}</span>
      <span className="w-1/3 text-right tabular-nums font-semibold text-white/90">{val2}</span>
    </div>
  );
};

export default MatchesView;
