import React, { useState, useEffect } from 'react';
import { Player, Match } from '../types/tennis';
import { Shuffle, Swords, ArrowUpRight, Flame } from 'lucide-react';

interface HeadToHeadViewProps {
  players: Player[];
  matches: Match[];
  initialPlayer1?: Player | null;
  initialPlayer2?: Player | null;
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

const getCountryCode = (country: string): string => {
  if (!country) return 'INT';
  if (COUNTRY_ISO_MAP[country]) return COUNTRY_ISO_MAP[country];
  return country.length <= 3 ? country.toUpperCase() : country.slice(0, 3).toUpperCase();
};

export const HeadToHeadView: React.FC<HeadToHeadViewProps> = ({
  players,
  matches,
  initialPlayer1,
  initialPlayer2,
  onSelectPlayer,
}) => {
  const [player1Id, setPlayer1Id] = useState<string>(
    initialPlayer1?.id || players[0]?.id || 'carlos-alcaraz'
  );
  const [player2Id, setPlayer2Id] = useState<string>(
    initialPlayer2?.id || players[1]?.id || 'jannik-sinner'
  );

  // Sync state when incoming props change (e.g. clicking H2H from another view)
  useEffect(() => {
    if (initialPlayer1) {
      setPlayer1Id(initialPlayer1.id);
    }
  }, [initialPlayer1?.id]);

  useEffect(() => {
    if (initialPlayer2) {
      setPlayer2Id(initialPlayer2.id);
    }
  }, [initialPlayer2?.id]);

  const p1 = players.find((p) => p.id === player1Id) || players[0];
  const p2 = players.find((p) => p.id === player2Id) || players[1];

  // Featured Marquee Rivalries with recorded clashes
  const FEATURED_RIVALRIES = [
    { label: 'Alcaraz vs Sinner', p1: 'carlos-alcaraz', p2: 'jannik-sinner' },
    { label: 'Djokovic vs Alcaraz', p1: 'novak-djokovic', p2: 'carlos-alcaraz' },
    { label: 'Alcaraz vs Fritz', p1: 'carlos-alcaraz', p2: 'taylor-fritz' },
    { label: 'Sinner vs Zverev', p1: 'jannik-sinner', p2: 'alexander-zverev' },
    { label: 'Fritz vs Zverev', p1: 'taylor-fritz', p2: 'alexander-zverev' },
    { label: 'Sinner vs Djokovic', p1: 'jannik-sinner', p2: 'novak-djokovic' },
    { label: 'Alcaraz vs Medvedev', p1: 'carlos-alcaraz', p2: 'daniil-medvedev' },
    { label: 'Sabalenka vs Swiatek', p1: 'aryna-sabalenka', p2: 'iga-swiatek' },
    { label: 'Sabalenka vs Gauff', p1: 'aryna-sabalenka', p2: 'coco-gauff' },
    { label: 'Swiatek vs Gauff', p1: 'iga-swiatek', p2: 'coco-gauff' },
    { label: 'Sabalenka vs Zheng', p1: 'aryna-sabalenka', p2: 'zheng-qinwen' },
    { label: 'Rybakina vs Sabalenka', p1: 'elena-rybakina', p2: 'aryna-sabalenka' },
  ];

  // Randomize Matchup
  const handleRandomize = () => {
    if (players.length < 2) return;
    const idx1 = Math.floor(Math.random() * players.length);
    let idx2 = Math.floor(Math.random() * players.length);
    while (idx2 === idx1) {
      idx2 = Math.floor(Math.random() * players.length);
    }
    setPlayer1Id(players[idx1].id);
    setPlayer2Id(players[idx2].id);
  };

  // Find direct match history
  const directMatches = matches.filter(
    (m) =>
      (m.player1Id === p1.id && m.player2Id === p2.id) ||
      (m.player1Id === p2.id && m.player2Id === p1.id)
  );

  const p1WinsInDirect = directMatches.filter((m) => m.winnerId === p1.id).length;
  const p2WinsInDirect = directMatches.filter((m) => m.winnerId === p2.id).length;

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      
      {/* Center Court Matchup Selector in Double-Bezel Concentric Shell */}
      <div className="double-bezel-card-outer">
        <div className="double-bezel-card-inner p-6 sm:p-8 relative overflow-hidden bg-gradient-to-b from-[#0e1219] to-[#080b0f]">
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

          {/* Section Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Swords className="w-4 h-4 text-theme-accent" />
                <span className="font-mono text-xs uppercase tracking-widest text-theme-accent font-semibold">
                  Head-to-Head Laboratory
                </span>
              </div>
              <h2 className="font-display font-semibold text-2xl sm:text-3xl text-white tracking-tight">
                Comparative Matchup Matrix
              </h2>
              <p className="text-xs sm:text-sm text-white/60 mt-1 font-normal">
                Direct encounter history, surface differential analysis, and career honors telemetry.
              </p>
            </div>

            <button
              onClick={handleRandomize}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs font-mono border border-white/[0.08] transition shadow-sm"
            >
              <Shuffle className="w-3.5 h-3.5 text-theme-accent" />
              <span>Random Matchup</span>
            </button>
          </div>

          {/* Featured Marquee Rivalries Bar */}
          <div className="mb-8 pb-6 border-b border-white/[0.06]">
            <div className="flex items-center gap-2 mb-3">
              <Flame className="w-3.5 h-3.5 text-amber-200/80" />
              <span className="font-mono text-[11px] uppercase tracking-wider text-white/50">
                Featured Head-to-Head Showdowns
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {FEATURED_RIVALRIES.map((riv) => {
                const isActive =
                  (player1Id === riv.p1 && player2Id === riv.p2) ||
                  (player1Id === riv.p2 && player2Id === riv.p1);
                return (
                  <button
                    key={riv.label}
                    onClick={() => {
                      setPlayer1Id(riv.p1);
                      setPlayer2Id(riv.p2);
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all border ${
                      isActive
                        ? 'bg-white/[0.14] text-white border-amber-200/30 shadow-sm'
                        : 'bg-white/[0.02] text-white/60 hover:text-white border-white/[0.06] hover:border-white/[0.15]'
                    }`}
                  >
                    {riv.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Competitor Arena Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-11 gap-6 items-center">
            
            {/* Competitor 1 Card */}
            <div className="lg:col-span-4 rounded-2xl bg-[#090b10] border border-white/[0.08] p-5 relative overflow-hidden group">
              {/* Subtle Player Portrait Vignette */}
              {p1.avatarUrl && (
                <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full overflow-hidden opacity-10 pointer-events-none filter blur-xl group-hover:opacity-15 transition-opacity">
                  <img src={p1.avatarUrl} alt="" className="w-full h-full object-cover" />
                </div>
              )}

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/[0.04] text-white/60 border border-white/[0.08]">
                    Competitor A
                  </span>
                  {p1.currentRank > 0 && (
                    <span className="font-mono text-xs text-theme-accent font-semibold">
                      No. {p1.currentRank} {p1.tour}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4 mb-4">
                  {/* Real Player Photo */}
                  <div 
                    onClick={() => onSelectPlayer(p1)}
                    className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border border-white/[0.12] bg-black/60 shrink-0 shadow-lg cursor-pointer group-hover:border-white/25 transition-all"
                  >
                    {p1.avatarUrl ? (
                      <img
                        src={p1.avatarUrl}
                        alt={p1.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-mono text-base text-theme-accent">
                        {p1.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="font-mono text-xs font-semibold text-white/90">
                        {getCountryCode(p1.country)}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      <span className="font-mono text-[10px] text-white/40 uppercase">
                        {p1.tour} Tour
                      </span>
                    </div>
                    <h3 
                      onClick={() => onSelectPlayer(p1)}
                      className="font-display font-semibold text-lg sm:text-xl text-white group-hover:text-theme-accent transition-colors cursor-pointer tracking-tight truncate"
                    >
                      {p1.name}
                    </h3>
                    <p className="text-xs text-white/40 mt-0.5 truncate font-normal">
                      {p1.plays}
                    </p>
                  </div>
                </div>

                {/* Athlete Switcher Select */}
                <select
                  value={player1Id}
                  onChange={(e) => setPlayer1Id(e.target.value)}
                  className="w-full bg-white/[0.03] hover:bg-white/[0.05] border border-white/[0.08] focus:border-white/20 text-white font-mono text-xs rounded-xl px-3 py-2 focus:outline-none transition mb-2"
                >
                  {players.map((p) => (
                    <option key={p.id} value={p.id} disabled={p.id === player2Id} className="bg-black text-white">
                      {p.name} ({getCountryCode(p.country)} • {p.tour})
                    </option>
                  ))}
                </select>

                {/* Direct Rivals quick chips for Competitor A */}
                {p1.notableRivalries && p1.notableRivalries.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 mb-2">
                    <span className="text-[10px] font-mono text-white/40 mr-0.5">Top Rivals:</span>
                    {p1.notableRivalries.slice(0, 3).map((rName) => {
                      const rivalPlayer = players.find(p => p.name.toLowerCase() === rName.toLowerCase() || p.name.toLowerCase().includes(rName.toLowerCase()));
                      if (!rivalPlayer || rivalPlayer.id === p1.id) return null;
                      return (
                        <button
                          key={rivalPlayer.id}
                          onClick={() => setPlayer2Id(rivalPlayer.id)}
                          className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all border ${
                            player2Id === rivalPlayer.id
                              ? 'bg-amber-200/20 text-amber-100 border-amber-200/40'
                              : 'bg-white/[0.04] text-white/60 hover:text-white border-white/[0.08]'
                          }`}
                        >
                          vs {rivalPlayer.name.split(' ').pop()}
                        </button>
                      );
                    })}
                  </div>
                )}

                <div className="flex items-center justify-between text-[11px] font-mono text-white/40 pt-2 border-t border-white/[0.05]">
                  <span>Age {p1.age}</span>
                  <button
                    onClick={() => onSelectPlayer(p1)}
                    className="hover:text-theme-accent transition flex items-center gap-1"
                  >
                    <span>View Dossier</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Center Rivalry Scoreboard */}
            <div className="lg:col-span-3 flex flex-col items-center justify-center text-center py-4 bg-black/40 rounded-2xl border border-white/[0.06] p-4">
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-2">
                Encounter Ledger
              </span>

              <div className="flex items-center gap-4 text-4xl sm:text-5xl font-mono tabular-nums font-semibold my-1">
                <span className={p1WinsInDirect > p2WinsInDirect ? 'text-theme-accent font-bold' : 'text-white/80'}>
                  {p1WinsInDirect}
                </span>
                <span className="text-white/20 text-2xl font-light">-</span>
                <span className={p2WinsInDirect > p1WinsInDirect ? 'text-theme-accent font-bold' : 'text-white/80'}>
                  {p2WinsInDirect}
                </span>
              </div>

              <span className="font-mono text-[11px] text-white/50 mt-1 uppercase tracking-wider">
                {directMatches.length} Direct Clash{directMatches.length !== 1 ? 'es' : ''}
              </span>

              <div className="mt-3 pt-3 border-t border-white/[0.06] w-full flex items-center justify-around text-[10px] font-mono text-white/40">
                <span>{p1.name.split(' ').pop()} Wins: {p1WinsInDirect}</span>
                <span>•</span>
                <span>{p2.name.split(' ').pop()} Wins: {p2WinsInDirect}</span>
              </div>
            </div>

            {/* Competitor 2 Card */}
            <div className="lg:col-span-4 rounded-2xl bg-[#090b10] border border-white/[0.08] p-5 relative overflow-hidden group">
              {/* Subtle Player Portrait Vignette */}
              {p2.avatarUrl && (
                <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full overflow-hidden opacity-10 pointer-events-none filter blur-xl group-hover:opacity-15 transition-opacity">
                  <img src={p2.avatarUrl} alt="" className="w-full h-full object-cover" />
                </div>
              )}

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/[0.04] text-white/60 border border-white/[0.08]">
                    Competitor B
                  </span>
                  {p2.currentRank > 0 && (
                    <span className="font-mono text-xs text-theme-accent font-semibold">
                      No. {p2.currentRank} {p2.tour}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4 mb-4">
                  {/* Real Player Photo */}
                  <div 
                    onClick={() => onSelectPlayer(p2)}
                    className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border border-white/[0.12] bg-black/60 shrink-0 shadow-lg cursor-pointer group-hover:border-white/25 transition-all"
                  >
                    {p2.avatarUrl ? (
                      <img
                        src={p2.avatarUrl}
                        alt={p2.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-mono text-base text-theme-accent">
                        {p2.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="font-mono text-xs font-semibold text-white/90">
                        {getCountryCode(p2.country)}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      <span className="font-mono text-[10px] text-white/40 uppercase">
                        {p2.tour} Tour
                      </span>
                    </div>
                    <h3 
                      onClick={() => onSelectPlayer(p2)}
                      className="font-display font-semibold text-lg sm:text-xl text-white group-hover:text-theme-accent transition-colors cursor-pointer tracking-tight truncate"
                    >
                      {p2.name}
                    </h3>
                    <p className="text-xs text-white/40 mt-0.5 truncate font-normal">
                      {p2.plays}
                    </p>
                  </div>
                </div>

                {/* Athlete Switcher Select */}
                <select
                  value={player2Id}
                  onChange={(e) => setPlayer2Id(e.target.value)}
                  className="w-full bg-white/[0.03] hover:bg-white/[0.05] border border-white/[0.08] focus:border-white/20 text-white font-mono text-xs rounded-xl px-3 py-2 focus:outline-none transition mb-2"
                >
                  {players.map((p) => (
                    <option key={p.id} value={p.id} disabled={p.id === player1Id} className="bg-black text-white">
                      {p.name} ({getCountryCode(p.country)} • {p.tour})
                    </option>
                  ))}
                </select>

                {/* Direct Rivals quick chips for Competitor B */}
                {p2.notableRivalries && p2.notableRivalries.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 mb-2">
                    <span className="text-[10px] font-mono text-white/40 mr-0.5">Top Rivals:</span>
                    {p2.notableRivalries.slice(0, 3).map((rName) => {
                      const rivalPlayer = players.find(p => p.name.toLowerCase() === rName.toLowerCase() || p.name.toLowerCase().includes(rName.toLowerCase()));
                      if (!rivalPlayer || rivalPlayer.id === p2.id) return null;
                      return (
                        <button
                          key={rivalPlayer.id}
                          onClick={() => setPlayer1Id(rivalPlayer.id)}
                          className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all border ${
                            player1Id === rivalPlayer.id
                              ? 'bg-amber-200/20 text-amber-100 border-amber-200/40'
                              : 'bg-white/[0.04] text-white/60 hover:text-white border-white/[0.08]'
                          }`}
                        >
                          vs {rivalPlayer.name.split(' ').pop()}
                        </button>
                      );
                    })}
                  </div>
                )}

                <div className="flex items-center justify-between text-[11px] font-mono text-white/40 pt-2 border-t border-white/[0.05]">
                  <span>Age {p2.age}</span>
                  <button
                    onClick={() => onSelectPlayer(p2)}
                    className="hover:text-theme-accent transition flex items-center gap-1"
                  >
                    <span>View Dossier</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Executive Telemetry Comparison Matrix (Zero Arcade Bars) */}
      <div className="double-bezel-card-outer">
        <div className="double-bezel-card-inner p-6 sm:p-8 relative overflow-hidden bg-gradient-to-b from-[#0c1015] to-[#080a0d]">
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

          <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/[0.06]">
            <div>
              <h3 className="font-display font-semibold text-lg sm:text-xl text-white tracking-tight">
                Tale of the Tape Telemetry
              </h3>
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mt-0.5">
                Head-to-head career honors, physical specs, and surface mastery
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="text-white/70">{p1.name.split(' ').pop()}</span>
              <span className="text-white/20">vs</span>
              <span className="text-white/70">{p2.name.split(' ').pop()}</span>
            </div>
          </div>

          <div className="space-y-2.5">
            <ComparisonTelemetryRow
              label="Grand Slam Titles"
              val1={p1.grandSlams}
              val2={p2.grandSlams}
              higherWins={true}
            />

            <ComparisonTelemetryRow
              label="Total Career Titles"
              val1={p1.careerTitles}
              val2={p2.careerTitles}
              higherWins={true}
            />

            <ComparisonTelemetryRow
              label="Career Win Percentage"
              val1={p1.careerWinLoss.winPercentage}
              val2={p2.careerWinLoss.winPercentage}
              suffix="%"
              higherWins={true}
            />

            <ComparisonTelemetryRow
              label="Career High Ranking"
              val1={p1.careerHighRank}
              val2={p2.careerHighRank}
              prefix="No. "
              higherWins={false}
            />

            <ComparisonTelemetryRow
              label="Hard Court Win Rate"
              val1={p1.surfaceStats.hard.winPercentage}
              val2={p2.surfaceStats.hard.winPercentage}
              suffix="%"
              higherWins={true}
            />

            <ComparisonTelemetryRow
              label="Clay Court Win Rate"
              val1={p1.surfaceStats.clay.winPercentage}
              val2={p2.surfaceStats.clay.winPercentage}
              suffix="%"
              higherWins={true}
            />

            <ComparisonTelemetryRow
              label="Grass Court Win Rate"
              val1={p1.surfaceStats.grass.winPercentage}
              val2={p2.surfaceStats.grass.winPercentage}
              suffix="%"
              higherWins={true}
            />

            <ComparisonTelemetryRow
              label="Age"
              val1={p1.age}
              val2={p2.age}
              suffix=" yrs"
            />

            <ComparisonTelemetryRow
              label="Height"
              val1={p1.heightCm}
              val2={p2.heightCm}
              suffix=" cm"
            />
          </div>

        </div>
      </div>

      {/* Official Match Ledger (Direct Encounters) */}
      <div className="double-bezel-card-outer">
        <div className="double-bezel-card-inner p-6 sm:p-8 relative overflow-hidden bg-gradient-to-b from-[#0c1015] to-[#080a0d]">
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

          <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/[0.06]">
            <div>
              <h3 className="font-display font-semibold text-lg sm:text-xl text-white tracking-tight">
                Official Match Encounters Ledger
              </h3>
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mt-0.5">
                Archived head-to-head championship clash records ({directMatches.length})
              </p>
            </div>
          </div>

          {directMatches.length === 0 ? (
            <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-8 text-center">
              <p className="text-xs font-mono text-white/50">
                No archived head-to-head matches between {p1.name} and {p2.name} in this session database.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {directMatches.map((m) => {
                const winnerIsP1 = m.winnerId === p1.id;
                return (
                  <div
                    key={m.id}
                    className="p-4 sm:p-5 rounded-xl bg-black/40 border border-white/[0.06] hover:border-white/[0.15] flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-[11px] font-mono text-white/50 mb-1.5">
                        <span className="text-theme-accent font-medium">{m.tournamentName}</span>
                        <span>•</span>
                        <span>{m.round}</span>
                        <span>•</span>
                        <span>{m.surface} Court</span>
                        <span>•</span>
                        <span>{m.year}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm sm:text-base font-semibold text-white">
                        <span className={winnerIsP1 ? 'text-theme-accent' : 'text-white/70'}>
                          {p1.name} {winnerIsP1 && '(Winner)'}
                        </span>
                        <span className="text-white/25 text-xs font-mono">vs</span>
                        <span className={!winnerIsP1 ? 'text-theme-accent' : 'text-white/70'}>
                          {p2.name} {!winnerIsP1 && '(Winner)'}
                        </span>
                      </div>

                      {m.headline && (
                        <p className="text-xs text-white/60 mt-1 italic font-serif">
                          "{m.headline}"
                        </p>
                      )}
                    </div>

                    <div className="sm:text-right sm:border-l sm:border-white/[0.06] sm:pl-6 shrink-0">
                      <div className="font-mono tabular-nums font-bold text-theme-accent text-sm sm:text-base tracking-wider">
                        {m.score}
                      </div>
                      <div className="text-[10px] font-mono text-white/40 mt-0.5">
                        Winner: <strong className="text-white/80 font-normal">{m.winnerId === p1.id ? p1.name : p2.name}</strong>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </div>

    </div>
  );
};

interface ComparisonTelemetryRowProps {
  label: string;
  val1: number;
  val2: number;
  prefix?: string;
  suffix?: string;
  higherWins?: boolean;
}

const ComparisonTelemetryRow: React.FC<ComparisonTelemetryRowProps> = ({
  label,
  val1,
  val2,
  prefix = '',
  suffix = '',
  higherWins,
}) => {
  const isP1Better = higherWins !== undefined ? (higherWins ? val1 > val2 : val1 < val2) : false;
  const isP2Better = higherWins !== undefined ? (higherWins ? val2 > val1 : val2 < val1) : false;

  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.015] border border-white/[0.05] hover:bg-white/[0.03] transition">
      {/* Player 1 Stat */}
      <div className="w-24 sm:w-32 text-left">
        <span
          className={`font-mono tabular-nums text-xs sm:text-sm ${
            isP1Better
              ? 'text-theme-accent font-semibold px-2 py-0.5 rounded bg-white/[0.04] border border-theme-accent/25'
              : 'text-white/80 font-medium'
          }`}
        >
          {prefix}{val1}{suffix}
        </span>
      </div>

      {/* Category Metric Label */}
      <div className="flex-1 text-center px-2">
        <span className="font-mono text-[10px] uppercase tracking-widest text-white/45">
          {label}
        </span>
      </div>

      {/* Player 2 Stat */}
      <div className="w-24 sm:w-32 text-right">
        <span
          className={`font-mono tabular-nums text-xs sm:text-sm ${
            isP2Better
              ? 'text-theme-accent font-semibold px-2 py-0.5 rounded bg-white/[0.04] border border-theme-accent/25'
              : 'text-white/80 font-medium'
          }`}
        >
          {prefix}{val2}{suffix}
        </span>
      </div>
    </div>
  );
};

export default HeadToHeadView;
