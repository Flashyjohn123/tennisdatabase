import React, { useState, useEffect } from 'react';
import { DrawMatchup, DrawCompetitor, TreeMatch, TreeCompetitor, Player } from '../types/tennis';
import { TOURNAMENT_DRAWS, FULL_TOURNAMENT_BRACKETS } from '../data/tournamentDrawsData';
import { playerService } from '../services/playerService';
import { Trophy, MapPin, Activity, Check, Sparkles, RotateCcw, Zap } from 'lucide-react';

interface TournamentDrawsViewProps {
  onSelectPlayer?: (player: Player) => void;
}

export const TournamentDrawsView: React.FC<TournamentDrawsViewProps> = ({ onSelectPlayer }) => {
  const [bracketViewMode, setBracketViewMode] = useState<'rounds-grid' | 'full-tree'>('rounds-grid');
  const [selectedDrawId, setSelectedDrawId] = useState<string>(TOURNAMENT_DRAWS[0].id);
  const [isSimulatorMode, setIsSimulatorMode] = useState<boolean>(false);

  // Original tournament draw data
  const officialDraw = TOURNAMENT_DRAWS.find((d) => d.id === selectedDrawId) || TOURNAMENT_DRAWS[0];
  const fullBracket = FULL_TOURNAMENT_BRACKETS[0];

  // Simulator state for Championship Rounds Grid (QF -> SF -> Final -> Champion)
  const [simQuarterfinals, setSimQuarterfinals] = useState<DrawMatchup[]>([]);
  const [simSemifinals, setSimSemifinals] = useState<DrawMatchup[]>([]);
  const [simFinal, setSimFinal] = useState<DrawMatchup | null>(null);
  const [predictedChampion, setPredictedChampion] = useState<DrawCompetitor | null>(null);

  // Initialize or reset simulated bracket from official draw data
  const initSimulatedBracket = () => {
    const qfs: DrawMatchup[] = JSON.parse(JSON.stringify(officialDraw.quarterfinals));
    const sfs: DrawMatchup[] = JSON.parse(JSON.stringify(officialDraw.semifinals));
    const fnl: DrawMatchup = JSON.parse(JSON.stringify(officialDraw.final));

    setSimQuarterfinals(qfs);
    setSimSemifinals(sfs);
    setSimFinal(fnl);

    const initialWinner = fnl.player1.isWinner
      ? fnl.player1
      : fnl.player2.isWinner
      ? fnl.player2
      : null;
    setPredictedChampion(initialWinner);
  };

  useEffect(() => {
    initSimulatedBracket();
  }, [selectedDrawId]);

  const getCompetitorAvatar = (comp: DrawCompetitor | TreeCompetitor): string | undefined => {
    if (comp.avatarUrl && !comp.avatarUrl.startsWith('/images/')) {
      return comp.avatarUrl;
    }
    const p = comp.id
      ? playerService.getPlayerById(comp.id) || playerService.getPlayerByName(comp.name)
      : playerService.getPlayerByName(comp.name);
    if (p && p.avatarUrl) {
      return p.avatarUrl;
    }
    return undefined;
  };

  const handlePlayerDossierClick = (comp: DrawCompetitor | TreeCompetitor, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!onSelectPlayer) return;
    const p = comp.id
      ? playerService.getPlayerById(comp.id) || playerService.getPlayerByName(comp.name)
      : playerService.getPlayerByName(comp.name);
    if (p) {
      onSelectPlayer(p);
    }
  };

  // --- PREDICTOR & SIMULATOR LOGIC ---

  // Handle manual winner selection in Quarterfinals
  const handleSelectQuarterfinalWinner = (matchIndex: number, winnerPlayerNum: 1 | 2) => {
    if (!isSimulatorMode) return;

    const newQFs = [...simQuarterfinals];
    const match = newQFs[matchIndex];
    const winningPlayer = winnerPlayerNum === 1 ? match.player1 : match.player2;
    const losingPlayer = winnerPlayerNum === 1 ? match.player2 : match.player1;

    winningPlayer.isWinner = true;
    losingPlayer.isWinner = false;
    setSimQuarterfinals(newQFs);

    // Advance winner into the corresponding Semifinal
    if (simSemifinals.length >= 2) {
      const newSFs = [...simSemifinals];
      const sfIndex = matchIndex < 2 ? 0 : 1;
      const sfSlot = matchIndex % 2 === 0 ? 'player1' : 'player2';

      newSFs[sfIndex][sfSlot] = {
        ...winningPlayer,
        sets: [6, 6],
        isWinner: false,
      };

      setSimSemifinals(newSFs);
    }
  };

  // Handle manual winner selection in Semifinals
  const handleSelectSemifinalWinner = (sfIndex: number, winnerPlayerNum: 1 | 2) => {
    if (!isSimulatorMode) return;

    const newSFs = [...simSemifinals];
    const match = newSFs[sfIndex];
    const winningPlayer = winnerPlayerNum === 1 ? match.player1 : match.player2;
    const losingPlayer = winnerPlayerNum === 1 ? match.player2 : match.player1;

    winningPlayer.isWinner = true;
    losingPlayer.isWinner = false;
    setSimSemifinals(newSFs);

    // Advance winner into Championship Final
    if (simFinal) {
      const newFinal = { ...simFinal };
      const finalSlot = sfIndex === 0 ? 'player1' : 'player2';

      newFinal[finalSlot] = {
        ...winningPlayer,
        sets: [6, 6, 6],
        isWinner: false,
      };

      setSimFinal(newFinal);
    }
  };

  // Handle manual winner selection in Championship Final
  const handleSelectFinalWinner = (winnerPlayerNum: 1 | 2) => {
    if (!isSimulatorMode || !simFinal) return;

    const newFinal = { ...simFinal };
    const winningPlayer = winnerPlayerNum === 1 ? newFinal.player1 : newFinal.player2;
    const losingPlayer = winnerPlayerNum === 1 ? newFinal.player2 : newFinal.player1;

    winningPlayer.isWinner = true;
    losingPlayer.isWinner = false;
    setSimFinal(newFinal);
    setPredictedChampion(winningPlayer);
  };

  // AI Probabilistic Match Winner Simulation Helper
  const simulateMatchWinner = (p1: DrawCompetitor, p2: DrawCompetitor): DrawCompetitor => {
    const seed1 = p1.seed || 999;
    const seed2 = p2.seed || 999;

    let p1WinProb = 0.5;
    if (seed1 < seed2) {
      const diff = Math.min(seed2 - seed1, 30);
      p1WinProb = 0.55 + (diff / 30) * 0.28;
    } else if (seed2 < seed1) {
      const diff = Math.min(seed1 - seed2, 30);
      p1WinProb = 0.45 - (diff / 30) * 0.28;
    }

    const p1Wins = Math.random() < p1WinProb;
    return p1Wins ? p1 : p2;
  };

  // Run full AI Monte Carlo tournament simulation
  const runAiBracketSimulation = () => {
    const qfs: DrawMatchup[] = JSON.parse(JSON.stringify(officialDraw.quarterfinals));
    const sfs: DrawMatchup[] = JSON.parse(JSON.stringify(officialDraw.semifinals));
    const fnl: DrawMatchup = JSON.parse(JSON.stringify(officialDraw.final));

    // 1. Simulate Quarterfinals
    const qfWinners: DrawCompetitor[] = [];
    qfs.forEach((qf) => {
      const winner = simulateMatchWinner(qf.player1, qf.player2);
      if (winner.id === qf.player1.id) {
        qf.player1.isWinner = true;
        qf.player2.isWinner = false;
        qfWinners.push(qf.player1);
      } else {
        qf.player1.isWinner = false;
        qf.player2.isWinner = true;
        qfWinners.push(qf.player2);
      }
    });

    // 2. Advance to Semifinals
    sfs[0].player1 = { ...qfWinners[0], isWinner: false, sets: [6, 4, 6] };
    sfs[0].player2 = { ...qfWinners[1], isWinner: false, sets: [4, 6, 3] };
    sfs[1].player1 = { ...qfWinners[2], isWinner: false, sets: [7, 6] };
    sfs[1].player2 = { ...qfWinners[3], isWinner: false, sets: [5, 4] };

    // 3. Simulate Semifinals
    const sfWinners: DrawCompetitor[] = [];
    sfs.forEach((sf) => {
      const winner = simulateMatchWinner(sf.player1, sf.player2);
      if (winner.id === sf.player1.id) {
        sf.player1.isWinner = true;
        sf.player2.isWinner = false;
        sfWinners.push(sf.player1);
      } else {
        sf.player1.isWinner = false;
        sf.player2.isWinner = true;
        sfWinners.push(sf.player2);
      }
    });

    // 4. Advance to Final
    fnl.player1 = { ...sfWinners[0], isWinner: false, sets: [6, 3, 6, 7] };
    fnl.player2 = { ...sfWinners[1], isWinner: false, sets: [4, 6, 4, 6] };

    // 5. Simulate Final
    const finalWinner = simulateMatchWinner(fnl.player1, fnl.player2);
    if (finalWinner.id === fnl.player1.id) {
      fnl.player1.isWinner = true;
      fnl.player2.isWinner = false;
      setPredictedChampion(fnl.player1);
    } else {
      fnl.player1.isWinner = false;
      fnl.player2.isWinner = true;
      setPredictedChampion(fnl.player2);
    }

    setSimQuarterfinals(qfs);
    setSimSemifinals(sfs);
    setSimFinal(fnl);
  };

  const activeQFs = isSimulatorMode ? simQuarterfinals : officialDraw.quarterfinals;
  const activeSFs = isSimulatorMode ? simSemifinals : officialDraw.semifinals;
  const activeFinal = isSimulatorMode && simFinal ? simFinal : officialDraw.final;

  const currentChampion = isSimulatorMode && predictedChampion
    ? predictedChampion
    : officialDraw.final.player1.isWinner
    ? officialDraw.final.player1
    : officialDraw.final.player2;

  const championAvatar = getCompetitorAvatar(currentChampion);

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      
      {/* Top Banner & Control Center in Double-Bezel Concentric Shell */}
      <div className="double-bezel-card-outer">
        <div className="double-bezel-card-inner p-6 sm:p-8 relative overflow-hidden bg-gradient-to-b from-[#0e1219] to-[#080b0f]">
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Activity className="w-4 h-4 text-theme-accent" />
                <span className="font-mono text-xs uppercase tracking-widest text-theme-accent font-semibold">
                  {isSimulatorMode ? 'Interactive Bracket Predictor & Simulation Engine' : 'Official Grand Slam Elimination Tree'}
                </span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-white/[0.04] text-white/60 border border-white/[0.08]">
                  {bracketViewMode === 'full-tree' ? `${fullBracket.name} 128 Draw` : `${officialDraw.tour} Draw`}
                </span>
              </div>

              <h1 className="font-display font-semibold text-2xl sm:text-4xl text-white tracking-tight">
                {bracketViewMode === 'full-tree'
                  ? `${fullBracket.name} Official Bracket Tree`
                  : isSimulatorMode
                  ? `${officialDraw.tournamentName} Bracket Predictor`
                  : `${officialDraw.tournamentName} Championship Draw`}
              </h1>

              <div className="flex flex-wrap items-center gap-3 text-xs text-white/60 mt-2 font-mono">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-white/40" />
                  {bracketViewMode === 'full-tree' ? fullBracket.venue : officialDraw.venue}
                </span>
                <span className="text-white/20">•</span>
                <span>
                  {bracketViewMode === 'full-tree'
                    ? `${fullBracket.surface} Court (Fast)`
                    : `${officialDraw.surface} Court (${officialDraw.surfaceSpeed || 'Medium-Fast'})`}
                </span>
                <span className="text-white/20">•</span>
                <span className="text-white/80">
                  {bracketViewMode === 'full-tree'
                    ? `Official ${fullBracket.year} Men's Singles Draw`
                    : officialDraw.edition}
                </span>
              </div>
            </div>

            {/* Controls & Mode Selectors */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              
              {/* Simulator Mode Switcher */}
              <div className="flex items-center gap-1.5 bg-black/50 p-1 rounded-2xl border border-white/[0.08]">
                <button
                  onClick={() => setIsSimulatorMode(false)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition ${
                    !isSimulatorMode
                      ? 'bg-white/[0.12] text-white border border-white/20 shadow-sm font-semibold'
                      : 'text-white/45 hover:text-white'
                  }`}
                >
                  Official Draw
                </button>
                <button
                  onClick={() => {
                    setIsSimulatorMode(true);
                    setBracketViewMode('rounds-grid');
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono flex items-center gap-1.5 transition ${
                    isSimulatorMode
                      ? 'bg-theme-accent/20 text-theme-accent border border-theme-accent/30 shadow-sm font-semibold'
                      : 'text-white/45 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Bracket Simulator</span>
                </button>
              </div>

              {/* Layout Switcher (Tree vs Rounds Grid) */}
              {!isSimulatorMode && (
                <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-2xl border border-white/[0.08]">
                  <button
                    onClick={() => setBracketViewMode('rounds-grid')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition ${
                      bracketViewMode === 'rounds-grid'
                        ? 'bg-white/[0.12] text-white border border-white/20 shadow-sm font-semibold'
                        : 'text-white/45 hover:text-white'
                    }`}
                  >
                    Rounds Grid
                  </button>
                  <button
                    onClick={() => setBracketViewMode('full-tree')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition ${
                      bracketViewMode === 'full-tree'
                        ? 'bg-white/[0.12] text-white border border-white/20 shadow-sm font-semibold'
                        : 'text-white/45 hover:text-white'
                    }`}
                  >
                    7-Round Tree
                  </button>
                </div>
              )}

            </div>
          </div>

          {/* SIMULATOR ACTION BAR (When Simulator Mode is Active) */}
          {isSimulatorMode && (
            <div className="mt-6 pt-6 border-t border-white/[0.06] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-mono text-white/70">
                <Zap className="w-4 h-4 text-theme-accent animate-pulse" />
                <span>Interactive Pick Mode: Click any competitor to predict and advance them to the next round</span>
              </div>

              <div className="flex items-center gap-2 self-stretch sm:self-auto">
                <button
                  onClick={runAiBracketSimulation}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-theme-accent/15 hover:bg-theme-accent/25 text-theme-accent border border-theme-accent/30 font-mono text-xs font-semibold transition shadow-sm"
                  title="Run AI probabilistic simulation based on player seedings"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Simulate AI Bracket</span>
                </button>

                <button
                  onClick={initSimulatedBracket}
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white/70 hover:text-white border border-white/[0.08] font-mono text-xs transition"
                  title="Reset predictions back to official results"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>
            </div>
          )}

          {/* Tournament Selector Pills (in Rounds Grid mode) */}
          {bracketViewMode === 'rounds-grid' && (
            <div className="mt-6 pt-6 border-t border-white/[0.06] flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {TOURNAMENT_DRAWS.map((draw) => {
                const isSelected = selectedDrawId === draw.id;
                return (
                  <button
                    key={draw.id}
                    onClick={() => setSelectedDrawId(draw.id)}
                    className={`px-4 py-2 rounded-full text-xs font-mono font-medium whitespace-nowrap transition border ${
                      isSelected
                        ? 'bg-white/[0.12] text-white border-white/20 shadow-sm font-semibold'
                        : 'bg-white/[0.02] hover:bg-white/[0.05] text-white/50 border-white/[0.06]'
                    }`}
                  >
                    <span>{draw.tournamentName} '{String(draw.year).slice(-2)} ({draw.tour})</span>
                  </button>
                );
              })}
            </div>
          )}

        </div>
      </div>

      {/* CHAMPION PODIUM SHOWCASE BANNER (Visible in Simulator Mode or when Champion exists) */}
      {currentChampion && (
        <div className="double-bezel-card-outer">
          <div className="double-bezel-card-inner p-5 sm:p-6 relative overflow-hidden bg-gradient-to-r from-[#0c1015] via-[#101720] to-[#080a0d] border border-amber-400/20">
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/30 to-transparent pointer-events-none" />

            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div
                  onClick={(e) => handlePlayerDossierClick(currentChampion, e)}
                  className="relative w-16 h-16 rounded-2xl overflow-hidden border border-amber-400/30 bg-black/60 shrink-0 cursor-pointer group shadow-xl"
                >
                  {championAvatar ? (
                    <img
                      src={championAvatar}
                      alt={currentChampion.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-mono text-sm text-theme-accent font-semibold">
                      {currentChampion.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <Trophy className="w-3.5 h-3.5 text-theme-accent" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-theme-accent font-semibold">
                      {isSimulatorMode ? 'Simulated Bracket Champion' : 'Official Crowned Champion'}
                    </span>
                  </div>

                  <h3
                    onClick={(e) => handlePlayerDossierClick(currentChampion, e)}
                    className="font-display font-semibold text-lg sm:text-xl text-white hover:text-theme-accent cursor-pointer transition-colors"
                  >
                    {currentChampion.name}
                  </h3>

                  <p className="font-mono text-xs text-white/50 mt-0.5">
                    {currentChampion.countryCode} �� Seed [{currentChampion.seedLabel || currentChampion.seed || 'Unseeded'}] • Projected Purse: <span className="text-theme-accent font-semibold">$5,500,000</span>
                  </p>
                </div>
              </div>

              {isSimulatorMode && (
                <div className="bg-black/40 border border-white/[0.08] rounded-xl px-4 py-2.5 text-right font-mono text-xs self-end sm:self-auto">
                  <span className="text-white/40 block text-[10px] uppercase">Simulation Status</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1.5 justify-end">
                    <Check className="w-3 h-3" /> Bracket Complete
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 1: CHAMPIONSHIP ROUNDS GRID (With Full Interactive Simulator Support) */}
      {bracketViewMode === 'rounds-grid' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Column 1: Quarterfinals */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.06] px-1">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-theme-accent" />
                <h2 className="font-display font-semibold text-base text-white tracking-tight">
                  Quarterfinals
                </h2>
              </div>
              <span className="font-mono text-[11px] text-white/40">
                {isSimulatorMode ? 'Click Winner to Advance' : '4 Matches'}
              </span>
            </div>

            <div className="space-y-4">
              {activeQFs.map((matchup, idx) => (
                <InteractiveDrawMatchCard
                  key={matchup.id}
                  matchup={matchup}
                  getAvatar={getCompetitorAvatar}
                  onSelectPlayerDossier={handlePlayerDossierClick}
                  isSimulatorMode={isSimulatorMode}
                  onPickWinner={(playerNum) => handleSelectQuarterfinalWinner(idx, playerNum)}
                />
              ))}
            </div>
          </div>

          {/* Column 2: Semifinals */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.06] px-1">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-theme-accent" />
                <h2 className="font-display font-semibold text-base text-white tracking-tight">
                  Semifinals
                </h2>
              </div>
              <span className="font-mono text-[11px] text-white/40">
                {isSimulatorMode ? 'Click Winner to Advance' : '2 Matches'}
              </span>
            </div>

            <div className="space-y-4 lg:pt-8">
              {activeSFs.map((matchup, idx) => (
                <InteractiveDrawMatchCard
                  key={matchup.id}
                  matchup={matchup}
                  getAvatar={getCompetitorAvatar}
                  onSelectPlayerDossier={handlePlayerDossierClick}
                  isSimulatorMode={isSimulatorMode}
                  onPickWinner={(playerNum) => handleSelectSemifinalWinner(idx, playerNum)}
                />
              ))}
            </div>
          </div>

          {/* Column 3: Championship Final */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.06] px-1">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-theme-accent" />
                <h2 className="font-display font-semibold text-base text-white tracking-tight">
                  Championship Final
                </h2>
              </div>
              <span className="font-mono text-[11px] text-theme-accent font-semibold">
                {isSimulatorMode ? 'Click Winner to Crown Champion' : 'Grand Slam Decider'}
              </span>
            </div>

            <div className="lg:pt-20">
              <InteractiveDrawMatchCard
                matchup={activeFinal}
                getAvatar={getCompetitorAvatar}
                onSelectPlayerDossier={handlePlayerDossierClick}
                isChampionshipFinal={true}
                isSimulatorMode={isSimulatorMode}
                onPickWinner={handleSelectFinalWinner}
              />
            </div>
          </div>

        </div>
      )}

      {/* VIEW 2: OFFICIAL 7-ROUND BRACKET TREE (Matching screenshot) */}
      {bracketViewMode === 'full-tree' && (
        <div className="space-y-4">
          <div className="double-bezel-card-outer">
            <div className="double-bezel-card-inner p-4 sm:p-6 overflow-hidden bg-gradient-to-b from-[#0c1015] to-[#080a0d]">
              
              <div className="overflow-x-auto custom-scrollbar pb-6">
                <div className="min-w-[1920px] space-y-6">
                  
                  {/* Top Prize Money Header Bar (7 Round Columns matching screenshot) */}
                  <div className="grid grid-cols-7 gap-6 border-b border-white/[0.08] pb-4">
                    {fullBracket.rounds.map((rnd, idx) => (
                      <div
                        key={idx}
                        className="bg-black/40 border border-white/[0.06] rounded-xl p-3 text-center"
                      >
                        <span className="font-mono text-xs font-semibold text-white/90 block uppercase tracking-wider">
                          {rnd.title}
                        </span>
                        <span className="font-mono text-[10px] text-theme-accent font-semibold block mt-0.5">
                          ({rnd.prizeMoney})
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* 7 Round Columns with Orthogonal Connectors */}
                  <div className="grid grid-cols-7 gap-6 items-start relative min-h-[920px]">
                    
                    {/* Column 0: Round 1 */}
                    <div className="flex flex-col justify-around h-full space-y-3">
                      {fullBracket.matchesByRound[0]?.map((match) => (
                        <TreeMatchCard
                          key={match.id}
                          match={match}
                          onSelectCompetitor={handlePlayerDossierClick}
                          hasRightConnector={true}
                        />
                      ))}
                    </div>

                    {/* Column 1: Round 2 */}
                    <div className="flex flex-col justify-around h-full space-y-6 pt-4">
                      {fullBracket.matchesByRound[1]?.map((match) => (
                        <TreeMatchCard
                          key={match.id}
                          match={match}
                          onSelectCompetitor={handlePlayerDossierClick}
                          hasLeftConnector={true}
                          hasRightConnector={true}
                        />
                      ))}
                    </div>

                    {/* Column 2: Round 3 */}
                    <div className="flex flex-col justify-around h-full space-y-12 pt-8">
                      {fullBracket.matchesByRound[2]?.map((match) => (
                        <TreeMatchCard
                          key={match.id}
                          match={match}
                          onSelectCompetitor={handlePlayerDossierClick}
                          hasLeftConnector={true}
                          hasRightConnector={true}
                        />
                      ))}
                    </div>

                    {/* Column 3: Round 4 (Round of 16) */}
                    <div className="flex flex-col justify-center h-full pt-16">
                      {fullBracket.matchesByRound[3]?.map((match) => (
                        <TreeMatchCard
                          key={match.id}
                          match={match}
                          onSelectCompetitor={handlePlayerDossierClick}
                          hasLeftConnector={true}
                          hasRightConnector={true}
                        />
                      ))}
                    </div>

                    {/* Column 4: Quarterfinals */}
                    <div className="flex flex-col justify-center h-full pt-16">
                      {fullBracket.matchesByRound[4]?.map((match) => (
                        <TreeMatchCard
                          key={match.id}
                          match={match}
                          onSelectCompetitor={handlePlayerDossierClick}
                          hasLeftConnector={true}
                          hasRightConnector={true}
                        />
                      ))}
                    </div>

                    {/* Column 5: Semifinals */}
                    <div className="flex flex-col justify-around h-full py-20 space-y-16">
                      {fullBracket.matchesByRound[5]?.map((match) => (
                        <TreeMatchCard
                          key={match.id}
                          match={match}
                          onSelectCompetitor={handlePlayerDossierClick}
                          hasLeftConnector={true}
                          hasRightConnector={true}
                        />
                      ))}
                    </div>

                    {/* Column 6: Final & Champion Podium */}
                    <div className="flex flex-col justify-center h-full space-y-6">
                      {fullBracket.matchesByRound[6]?.map((match) => (
                        <TreeMatchCard
                          key={match.id}
                          match={match}
                          onSelectCompetitor={handlePlayerDossierClick}
                          hasLeftConnector={true}
                          isFinalMatch={true}
                        />
                      ))}

                      {/* Crowned Champion Showcase Podium Box */}
                      {fullBracket.champion && (
                        <div className="p-4 rounded-xl bg-black/60 border border-amber-400/30 text-center relative overflow-hidden shadow-2xl">
                          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
                          <div className="flex items-center justify-center gap-1.5 mb-1 text-theme-accent">
                            <Trophy className="w-4 h-4" />
                            <span className="font-mono text-[10px] uppercase tracking-widest font-semibold">
                              Crowned Champion
                            </span>
                          </div>
                          <div className="font-display font-semibold text-base text-white">
                            {fullBracket.champion.name} {fullBracket.champion.seedLabel}
                          </div>
                          <div className="font-mono text-xs text-white/50 mt-0.5">
                            {fullBracket.champion.countryCode} • Winner Purse: <span className="text-theme-accent font-semibold">{fullBracket.champion.prizeMoney}</span>
                          </div>
                        </div>
                      )}
                    </div>

                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

/* =========================================================================
   COMPONENTS: INTERACTIVE MATCH CARD WITH SIMULATOR CLICK SUPPORT
   ========================================================================= */

interface InteractiveDrawMatchCardProps {
  matchup: DrawMatchup;
  getAvatar: (comp: DrawCompetitor) => string | undefined;
  onSelectPlayerDossier: (comp: DrawCompetitor, e?: React.MouseEvent) => void;
  isSimulatorMode?: boolean;
  onPickWinner?: (winnerPlayerNum: 1 | 2) => void;
  isChampionshipFinal?: boolean;
}

const InteractiveDrawMatchCard: React.FC<InteractiveDrawMatchCardProps> = ({
  matchup,
  getAvatar,
  onSelectPlayerDossier,
  isSimulatorMode,
  onPickWinner,
  isChampionshipFinal,
}) => {
  return (
    <div className={`double-bezel-card-outer group ${isChampionshipFinal ? 'ring-1 ring-amber-400/20' : ''}`}>
      <div className="double-bezel-card-inner p-4 sm:p-5 relative overflow-hidden bg-gradient-to-b from-[#0c1015] to-[#080a0d]">
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

        {/* Match Header Bar */}
        <div className="flex items-center justify-between gap-2 pb-2.5 mb-3 border-b border-white/[0.06] text-[10px] font-mono">
          <div className="flex items-center gap-1.5 text-white/50 truncate">
            {matchup.court && <span className="truncate">{matchup.court}</span>}
            {matchup.court && matchup.date && <span>•</span>}
            {matchup.date && <span>{matchup.date}</span>}
          </div>

          <span className="px-2 py-0.5 rounded-full bg-white/[0.04] text-white/70 border border-white/[0.08] shrink-0 uppercase tracking-wider">
            {isSimulatorMode ? 'Simulated' : matchup.status}
          </span>
        </div>

        {/* Competitor Rows */}
        <div className="space-y-2">
          <InteractiveCompetitorRow
            comp={matchup.player1}
            avatarUrl={getAvatar(matchup.player1)}
            isSimulatorMode={isSimulatorMode}
            onSelectDossier={(e) => onSelectPlayerDossier(matchup.player1, e)}
            onPickThisWinner={() => onPickWinner && onPickWinner(1)}
          />

          <InteractiveCompetitorRow
            comp={matchup.player2}
            avatarUrl={getAvatar(matchup.player2)}
            isSimulatorMode={isSimulatorMode}
            onSelectDossier={(e) => onSelectPlayerDossier(matchup.player2, e)}
            onPickThisWinner={() => onPickWinner && onPickWinner(2)}
          />
        </div>

        {/* Score Display Footer */}
        <div className="mt-3 pt-2.5 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
          <span className="text-[10px] uppercase tracking-wider text-white/40">
            {isSimulatorMode ? 'Projected Scoreline' : 'Set Lineup'}
          </span>
          <span className="tabular-nums font-semibold text-theme-accent tracking-wide">
            {matchup.scoreDisplay}
          </span>
        </div>

      </div>
    </div>
  );
};

interface InteractiveCompetitorRowProps {
  comp: DrawCompetitor;
  avatarUrl?: string;
  isSimulatorMode?: boolean;
  onSelectDossier: (e: React.MouseEvent) => void;
  onPickThisWinner: () => void;
}

const InteractiveCompetitorRow: React.FC<InteractiveCompetitorRowProps> = ({
  comp,
  avatarUrl,
  isSimulatorMode,
  onSelectDossier,
  onPickThisWinner,
}) => {
  const isWinner = comp.isWinner;

  return (
    <div
      onClick={isSimulatorMode ? onPickThisWinner : onSelectDossier}
      className={`p-2 sm:p-2.5 rounded-xl border transition flex items-center justify-between gap-3 cursor-pointer select-none ${
        isWinner
          ? 'bg-white/[0.06] border-amber-400/30 ring-1 ring-amber-400/20 shadow-sm'
          : 'bg-black/30 border-white/[0.05] hover:border-white/[0.12] hover:bg-white/[0.03]'
      }`}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        {/* Athlete Portrait Thumbnail */}
        <div 
          onClick={onSelectDossier}
          className="relative w-8 h-8 rounded-lg overflow-hidden border border-white/[0.1] bg-black/60 shrink-0 shadow-sm hover:border-theme-accent transition-colors"
          title="Click to view full player dossier"
        >
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={comp.name}
              className="w-full h-full object-cover object-top"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center font-mono text-[10px] text-theme-accent font-semibold">
              {comp.name.slice(0, 2).toUpperCase()}
            </div>
          )}
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            {comp.seedLabel && (
              <span className="font-mono text-[10px] text-theme-accent font-semibold">
                [{comp.seedLabel}]
              </span>
            )}
            <span className={`text-xs sm:text-sm tracking-tight truncate ${isWinner ? 'font-semibold text-white' : 'font-normal text-white/60'}`}>
              {comp.name}
            </span>
          </div>
          <span className="font-mono text-[9px] text-white/40 block">
            {comp.countryCode}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {/* Set Scores */}
        <div className="flex items-center gap-1 font-mono tabular-nums text-xs">
          {comp.sets.map((set, sIdx) => (
            <span
              key={sIdx}
              className={`w-5 text-center font-medium ${isWinner ? 'text-white font-semibold' : 'text-white/40'}`}
            >
              {set}
            </span>
          ))}
        </div>

        {/* Winner Tag / Checkmark */}
        {isWinner && (
          <span className="text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full bg-theme-accent/15 text-theme-accent border border-theme-accent/30 font-semibold flex items-center gap-1">
            <Check className="w-3 h-3" />
            <span className="hidden sm:inline">Winner</span>
          </span>
        )}
      </div>
    </div>
  );
};

/* =========================================================================
   COMPONENTS: TREE BRACKET MATCH CARD (Matching image-1.png)
   ========================================================================= */

interface TreeMatchCardProps {
  match: TreeMatch;
  onSelectCompetitor: (comp: TreeCompetitor) => void;
  hasLeftConnector?: boolean;
  hasRightConnector?: boolean;
  isFinalMatch?: boolean;
}

const TreeMatchCard: React.FC<TreeMatchCardProps> = ({
  match,
  onSelectCompetitor,
  hasLeftConnector,
  hasRightConnector,
  isFinalMatch,
}) => {
  return (
    <div className={`relative bg-[#0a0d12] hover:bg-[#0e1218] border border-white/[0.08] hover:border-white/20 rounded-xl p-2.5 transition shadow-lg ${isFinalMatch ? 'ring-1 ring-amber-400/30' : ''}`}>
      
      {/* Left Inbound Connector Branch */}
      {hasLeftConnector && (
        <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-3 h-[1px] bg-white/20 pointer-events-none" />
      )}

      {/* Right Outbound Connector Branch */}
      {hasRightConnector && (
        <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-3 h-[1px] bg-white/20 pointer-events-none" />
      )}

      {/* Competitor 1 Row */}
      <TreeCompetitorRow
        comp={match.player1}
        onSelect={() => onSelectCompetitor(match.player1)}
      />

      {/* Hairline Divider */}
      <div className="border-t border-white/[0.06] my-1" />

      {/* Competitor 2 Row */}
      <TreeCompetitorRow
        comp={match.player2}
        onSelect={() => onSelectCompetitor(match.player2)}
      />

    </div>
  );
};

interface TreeCompetitorRowProps {
  comp: TreeCompetitor;
  onSelect: () => void;
}

const TreeCompetitorRow: React.FC<TreeCompetitorRowProps> = ({ comp, onSelect }) => {
  const isWinner = comp.isWinner;

  return (
    <div
      onClick={onSelect}
      className={`flex items-center justify-between gap-2 py-1 px-1.5 rounded-lg transition cursor-pointer ${
        isWinner ? 'bg-white/[0.04]' : 'hover:bg-white/[0.02]'
      }`}
    >
      {/* Left: Nation Code + Name + Seed + Checkmark */}
      <div className="flex items-center gap-2 min-w-0 flex-1">
        {/* ISO Nation Code */}
        <span className="font-mono text-[9px] text-white/50 px-1 py-0.2 rounded bg-white/[0.04] border border-white/[0.06] shrink-0">
          {comp.countryCode}
        </span>

        {/* Player Name */}
        <span className={`text-xs font-sans tracking-tight truncate ${isWinner ? 'text-white font-semibold' : 'text-white/60'}`}>
          {comp.shortName || comp.name}
        </span>

        {/* Seed Badge */}
        {comp.seedLabel && (
          <span className="font-mono text-[10px] text-theme-accent font-semibold shrink-0">
            {comp.seedLabel}
          </span>
        )}

        {/* Green Winner Checkmark */}
        {isWinner && (
          <Check className="w-3 h-3 text-emerald-400 stroke-[3] shrink-0" />
        )}
      </div>

      {/* Right: Set Scores with Tiebreak Superscripts */}
      <div className="flex items-center gap-1 font-mono text-xs tabular-nums shrink-0">
        {comp.scores.map((score, sIdx) => {
          if (typeof score === 'object' && score !== null && 'games' in score) {
            return (
              <span
                key={sIdx}
                className={`w-4 text-center font-medium ${isWinner ? 'text-white' : 'text-white/40'}`}
              >
                {score.games}
                {score.tiebreak !== undefined && (
                  <sup className="text-[8px] text-theme-accent font-semibold ml-0.5">
                    {score.tiebreak}
                  </sup>
                )}
              </span>
            );
          }
          return (
            <span
              key={sIdx}
              className={`w-4 text-center font-medium ${isWinner ? 'text-white' : 'text-white/40'}`}
            >
              {score}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default TournamentDrawsView;
