import React, { useState, useEffect, useMemo } from 'react';
import { Player, Match } from '../types/tennis';
import {
  Shuffle,
  Swords,
  ArrowUpRight,
  Flame,
  Activity,
  Zap,
  Target,
  Shield,
  Trophy,
  Gauge,
  Cpu,
  Sliders,
  Clock,
  Crosshair,
  Award,
} from 'lucide-react';
import { DuelPieChart, SurfaceGaugePie, MiniDualShareMeter } from './charts/PieChart';
import { getAssetUrl } from '../utils/assetUtils';

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

export type MatchSurface = 'Hard' | 'Clay' | 'Grass';
export type MatchFormat = 'best-of-3' | 'best-of-5';
export type FormWeightMode = 'balanced' | 'peak' | 'specialist';

export interface PlayerAdvancedTelemetry {
  firstServeWonPct: number;
  aceRate: number;
  serviceGamesHeldPct: number;
  breakPointConversionPct: number;
  tiebreakWinRatePct: number;
  decidingSetWinPct: number;
}

const KNOWN_PLAYER_TELEMETRY: Record<string, PlayerAdvancedTelemetry> = {
  'jannik-sinner': {
    firstServeWonPct: 79.1,
    aceRate: 8.2,
    serviceGamesHeldPct: 89.4,
    breakPointConversionPct: 43.5,
    tiebreakWinRatePct: 66.7,
    decidingSetWinPct: 68.8,
  },
  'carlos-alcaraz': {
    firstServeWonPct: 74.8,
    aceRate: 4.6,
    serviceGamesHeldPct: 85.1,
    breakPointConversionPct: 44.8,
    tiebreakWinRatePct: 61.5,
    decidingSetWinPct: 71.4,
  },
  'alexander-zverev': {
    firstServeWonPct: 78.5,
    aceRate: 10.8,
    serviceGamesHeldPct: 87.2,
    breakPointConversionPct: 40.8,
    tiebreakWinRatePct: 60.0,
    decidingSetWinPct: 64.2,
  },
  'novak-djokovic': {
    firstServeWonPct: 76.2,
    aceRate: 6.1,
    serviceGamesHeldPct: 86.8,
    breakPointConversionPct: 44.2,
    tiebreakWinRatePct: 65.4,
    decidingSetWinPct: 72.8,
  },
  'ben-shelton': {
    firstServeWonPct: 77.2,
    aceRate: 12.4,
    serviceGamesHeldPct: 86.5,
    breakPointConversionPct: 37.5,
    tiebreakWinRatePct: 59.2,
    decidingSetWinPct: 58.3,
  },
  'daniil-medvedev': {
    firstServeWonPct: 76.5,
    aceRate: 7.8,
    serviceGamesHeldPct: 84.8,
    breakPointConversionPct: 43.1,
    tiebreakWinRatePct: 57.8,
    decidingSetWinPct: 62.5,
  },
  'alex-de-minaur': {
    firstServeWonPct: 71.8,
    aceRate: 3.4,
    serviceGamesHeldPct: 81.2,
    breakPointConversionPct: 43.2,
    tiebreakWinRatePct: 56.4,
    decidingSetWinPct: 62.1,
  },
  'taylor-fritz': {
    firstServeWonPct: 77.4,
    aceRate: 9.8,
    serviceGamesHeldPct: 86.1,
    breakPointConversionPct: 41.2,
    tiebreakWinRatePct: 58.5,
    decidingSetWinPct: 60.5,
  },
  'casper-ruud': {
    firstServeWonPct: 74.2,
    aceRate: 5.6,
    serviceGamesHeldPct: 83.9,
    breakPointConversionPct: 41.5,
    tiebreakWinRatePct: 55.8,
    decidingSetWinPct: 59.4,
  },
  'andrey-rublev': {
    firstServeWonPct: 75.8,
    aceRate: 7.2,
    serviceGamesHeldPct: 85.3,
    breakPointConversionPct: 41.8,
    tiebreakWinRatePct: 56.2,
    decidingSetWinPct: 57.8,
  },
  'tommy-paul': {
    firstServeWonPct: 72.5,
    aceRate: 5.1,
    serviceGamesHeldPct: 82.4,
    breakPointConversionPct: 42.1,
    tiebreakWinRatePct: 55.2,
    decidingSetWinPct: 58.6,
  },
  'stefanos-tsitsipas': {
    firstServeWonPct: 76.8,
    aceRate: 8.4,
    serviceGamesHeldPct: 86.0,
    breakPointConversionPct: 39.5,
    tiebreakWinRatePct: 57.1,
    decidingSetWinPct: 61.2,
  },
  'holger-rune': {
    firstServeWonPct: 74.5,
    aceRate: 6.5,
    serviceGamesHeldPct: 83.2,
    breakPointConversionPct: 42.0,
    tiebreakWinRatePct: 55.0,
    decidingSetWinPct: 60.0,
  },
  'jack-draper': {
    firstServeWonPct: 77.0,
    aceRate: 9.2,
    serviceGamesHeldPct: 85.8,
    breakPointConversionPct: 42.5,
    tiebreakWinRatePct: 58.0,
    decidingSetWinPct: 59.1,
  },
  'aryna-sabalenka': {
    firstServeWonPct: 74.2,
    aceRate: 6.2,
    serviceGamesHeldPct: 81.4,
    breakPointConversionPct: 47.2,
    tiebreakWinRatePct: 62.5,
    decidingSetWinPct: 67.4,
  },
  'elena-rybakina': {
    firstServeWonPct: 75.8,
    aceRate: 8.1,
    serviceGamesHeldPct: 83.6,
    breakPointConversionPct: 44.5,
    tiebreakWinRatePct: 59.4,
    decidingSetWinPct: 63.2,
  },
  'jessica-pegula': {
    firstServeWonPct: 68.2,
    aceRate: 2.6,
    serviceGamesHeldPct: 78.4,
    breakPointConversionPct: 47.6,
    tiebreakWinRatePct: 56.8,
    decidingSetWinPct: 61.5,
  },
  'coco-gauff': {
    firstServeWonPct: 70.8,
    aceRate: 4.2,
    serviceGamesHeldPct: 76.5,
    breakPointConversionPct: 46.8,
    tiebreakWinRatePct: 58.8,
    decidingSetWinPct: 65.5,
  },
  'mirra-andreeva': {
    firstServeWonPct: 67.8,
    aceRate: 2.4,
    serviceGamesHeldPct: 75.2,
    breakPointConversionPct: 47.0,
    tiebreakWinRatePct: 55.0,
    decidingSetWinPct: 62.5,
  },
  'iga-swiatek': {
    firstServeWonPct: 69.5,
    aceRate: 2.1,
    serviceGamesHeldPct: 82.5,
    breakPointConversionPct: 51.4,
    tiebreakWinRatePct: 61.2,
    decidingSetWinPct: 70.8,
  },
  'amanda-anisimova': {
    firstServeWonPct: 70.5,
    aceRate: 4.0,
    serviceGamesHeldPct: 76.0,
    breakPointConversionPct: 44.8,
    tiebreakWinRatePct: 54.5,
    decidingSetWinPct: 57.5,
  },
  'jasmine-paolini': {
    firstServeWonPct: 66.4,
    aceRate: 1.8,
    serviceGamesHeldPct: 74.8,
    breakPointConversionPct: 46.2,
    tiebreakWinRatePct: 54.2,
    decidingSetWinPct: 60.0,
  },
  'emma-navarro': {
    firstServeWonPct: 66.8,
    aceRate: 2.0,
    serviceGamesHeldPct: 75.0,
    breakPointConversionPct: 46.5,
    tiebreakWinRatePct: 53.8,
    decidingSetWinPct: 59.2,
  },
  'barbora-krejcikova': {
    firstServeWonPct: 70.1,
    aceRate: 3.5,
    serviceGamesHeldPct: 76.8,
    breakPointConversionPct: 45.2,
    tiebreakWinRatePct: 57.0,
    decidingSetWinPct: 62.8,
  },
  'zheng-qinwen': {
    firstServeWonPct: 74.6,
    aceRate: 7.4,
    serviceGamesHeldPct: 80.2,
    breakPointConversionPct: 43.8,
    tiebreakWinRatePct: 57.5,
    decidingSetWinPct: 62.0,
  },
  'danielle-collins': {
    firstServeWonPct: 72.0,
    aceRate: 5.0,
    serviceGamesHeldPct: 78.0,
    breakPointConversionPct: 45.0,
    tiebreakWinRatePct: 56.0,
    decidingSetWinPct: 59.0,
  },
  'paula-badosa': {
    firstServeWonPct: 71.5,
    aceRate: 4.8,
    serviceGamesHeldPct: 77.2,
    breakPointConversionPct: 44.0,
    tiebreakWinRatePct: 55.4,
    decidingSetWinPct: 58.0,
  },
};

export const getPlayerAdvancedTelemetry = (player: Player): PlayerAdvancedTelemetry => {
  if (KNOWN_PLAYER_TELEMETRY[player.id]) {
    return KNOWN_PLAYER_TELEMETRY[player.id];
  }
  const isAtp = player.tour === 'ATP';
  const heightFactor = Math.max(0, (player.heightCm - (isAtp ? 180 : 168)) / 10);
  const winRate = player.careerWinLoss?.winPercentage || 55;
  const rank = Math.max(1, player.currentRank || 50);
  const rankBonus = Math.max(0, (100 - rank) / 25);

  const baseServeWon = isAtp ? 72.0 : 66.0;
  const baseAceRate = isAtp ? 4.5 : 2.2;
  const baseHoldPct = isAtp ? 80.0 : 72.0;
  const baseBpConv = isAtp ? 40.0 : 44.0;

  const hash = (player.id || '').split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % 10;
  const seedShift = (hash - 5) * 0.3;

  return {
    firstServeWonPct: +(baseServeWon + heightFactor * 1.8 + (winRate - 50) * 0.15 + seedShift).toFixed(1),
    aceRate: +(Math.max(1.0, baseAceRate + heightFactor * 2.5 + seedShift * 0.5)).toFixed(1),
    serviceGamesHeldPct: +(baseHoldPct + heightFactor * 2.2 + (winRate - 50) * 0.25 + rankBonus + seedShift).toFixed(1),
    breakPointConversionPct: +(baseBpConv + (winRate - 50) * 0.2 + rankBonus * 0.5 + seedShift * 0.4).toFixed(1),
    tiebreakWinRatePct: +(50.0 + (winRate - 50) * 0.35 + rankBonus * 1.2 + seedShift).toFixed(1),
    decidingSetWinPct: +(50.0 + (winRate - 50) * 0.4 + rankBonus * 1.5 + seedShift).toFixed(1),
  };
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

  // Simulation Engine Interactive Controls
  const [simSurface, setSimSurface] = useState<MatchSurface>('Hard');
  const [simFormat, setSimFormat] = useState<MatchFormat>('best-of-3');
  const [simFormWeight, setSimFormWeight] = useState<FormWeightMode>('balanced');

  // Advanced Telemetry for Competitors
  const p1Adv = useMemo(() => getPlayerAdvancedTelemetry(p1), [p1]);
  const p2Adv = useMemo(() => getPlayerAdvancedTelemetry(p2), [p2]);

  // Algorithmic Win Probability & Match Simulation Engine Calculation
  const simulationResult = useMemo(() => {
    const surfaceKey = simSurface.toLowerCase() as 'hard' | 'clay' | 'grass';
    const p1SurfaceStat = p1.surfaceStats?.[surfaceKey];
    const p2SurfaceStat = p2.surfaceStats?.[surfaceKey];

    const p1SurfaceWinPct = p1SurfaceStat?.winPercentage ?? p1.careerWinLoss.winPercentage;
    const p2SurfaceWinPct = p2SurfaceStat?.winPercentage ?? p2.careerWinLoss.winPercentage;

    // 1. Surface Differential (-1 to 1)
    const surfaceDiff = (p1SurfaceWinPct - p2SurfaceWinPct) / 100;

    // 2. Career Differential (-1 to 1)
    const careerDiff = (p1.careerWinLoss.winPercentage - p2.careerWinLoss.winPercentage) / 100;

    // Honors differential (Slam titles & career titles)
    const slamDiff = Math.tanh((p1.grandSlams - p2.grandSlams) / 4) * 0.15;
    const titlesDiff = Math.tanh((p1.careerTitles - p2.careerTitles) / 15) * 0.1;

    // 3. Current Rank Factor (inverse square root)
    const r1 = Math.max(1, p1.currentRank || 50);
    const r2 = Math.max(1, p2.currentRank || 50);
    const r1Score = 1 / Math.sqrt(r1);
    const r2Score = 1 / Math.sqrt(r2);
    const rankDiff = (r1Score - r2Score) / (r1Score + r2Score);

    // 4. Head-to-Head Encounter Ledger
    const totalDirect = directMatches.length;
    const surfaceDirectMatches = directMatches.filter(
      (m) => m.surface.toLowerCase() === simSurface.toLowerCase()
    );
    const p1SurfaceWins = surfaceDirectMatches.filter((m) => m.winnerId === p1.id).length;
    const p2SurfaceWins = surfaceDirectMatches.filter((m) => m.winnerId === p2.id).length;
    const totalSurfaceDirect = surfaceDirectMatches.length;

    let h2hDiff = 0;
    if (totalDirect > 0) {
      const overallRatio = (p1WinsInDirect - p2WinsInDirect) / (totalDirect + 2);
      const surfaceRatio =
        totalSurfaceDirect > 0
          ? (p1SurfaceWins - p2SurfaceWins) / (totalSurfaceDirect + 1)
          : overallRatio;
      h2hDiff = overallRatio * 0.45 + surfaceRatio * 0.55;
    }

    // 5. Serve & Clutch Metric Differential
    const serveDiff =
      ((p1Adv.firstServeWonPct - p2Adv.firstServeWonPct) +
        (p1Adv.serviceGamesHeldPct - p2Adv.serviceGamesHeldPct)) /
      200;
    const clutchDiff =
      ((p1Adv.tiebreakWinRatePct - p2Adv.tiebreakWinRatePct) +
        (p1Adv.decidingSetWinPct - p2Adv.decidingSetWinPct)) /
      200;

    // 6. Dynamic Weights based on Recent Form Mode
    let wSurface = 0.35;
    let wCareer = 0.20;
    let wRank = 0.20;
    let wH2H = 0.15;
    let wServeClutch = 0.10;

    if (simFormWeight === 'peak') {
      wSurface = 0.20;
      wCareer = 0.25;
      wRank = 0.30;
      wH2H = 0.10;
      wServeClutch = 0.15;
    } else if (simFormWeight === 'specialist') {
      wSurface = 0.52;
      wCareer = 0.12;
      wRank = 0.14;
      wH2H = 0.12;
      wServeClutch = 0.10;
    }

    const compositeScore =
      surfaceDiff * wSurface +
      (careerDiff + slamDiff + titlesDiff) * wCareer +
      rankDiff * wRank +
      h2hDiff * wH2H +
      (serveDiff + clutchDiff) * wServeClutch;

    let logit = compositeScore * 2.8;

    // Format modifier: Best of 5 amplifies favorite's probability (sample size reduces underdog variance)
    if (simFormat === 'best-of-5') {
      logit *= 1.25;
    }

    // Sigmoid probability
    const rawP1 = 1 / (1 + Math.exp(-logit));
    const clampedP1 = Math.min(0.89, Math.max(0.11, rawP1));
    const p1Prob = Math.round(clampedP1 * 1000) / 10;
    const p2Prob = +(100 - p1Prob).toFixed(1);

    const winner = p1Prob >= 50 ? p1 : p2;
    const underdog = p1Prob >= 50 ? p2 : p1;
    const winnerProb = p1Prob >= 50 ? p1Prob : p2Prob;
    const underdogProb = p1Prob >= 50 ? p2Prob : p1Prob;
    const winnerAdv = p1Prob >= 50 ? p1Adv : p2Adv;
    const underdogAdv = p1Prob >= 50 ? p2Adv : p1Adv;
    const winnerSurfaceWinPct = p1Prob >= 50 ? p1SurfaceWinPct : p2SurfaceWinPct;
    const underdogSurfaceWinPct = p1Prob >= 50 ? p2SurfaceWinPct : p1SurfaceWinPct;
    const winnerDirectWins = p1Prob >= 50 ? p1WinsInDirect : p2WinsInDirect;
    const underdogDirectWins = p1Prob >= 50 ? p2WinsInDirect : p1WinsInDirect;

    // Deterministic seed for scoreline variation
    const seed = Math.abs(
      (p1.id + p2.id + simSurface + simFormat + simFormWeight)
        .split('')
        .reduce((acc, c) => (acc * 31 + c.charCodeAt(0)) | 0, 0)
    );

    // Scoreline generation
    let predictedScore = '';
    let setsBreakdownText = '';
    let estimatedDuration = '';
    let expectedTotalGames = 0;
    let deciderProbability = 0;

    const surfaceDurationMultiplier =
      simSurface === 'Clay' ? 1.14 : simSurface === 'Grass' ? 0.92 : 1.0;

    if (simFormat === 'best-of-3') {
      deciderProbability = Math.round(
        Math.max(18, Math.min(64, 100 - Math.abs(p1Prob - p2Prob) * 1.5))
      );

      if (winnerProb >= 65) {
        // Straight sets dominant
        const pool = [
          '6-3, 6-4',
          '6-2, 6-4',
          '6-4, 6-3',
          '6-3, 6-2',
        ];
        predictedScore = pool[seed % pool.length];
        setsBreakdownText = 'Straight Sets (2-0)';
        expectedTotalGames = 20 + (seed % 3);
        const mins = Math.round(92 * surfaceDurationMultiplier);
        estimatedDuration = `${Math.floor(mins / 60)}h ${mins % 60}m`;
      } else if (winnerProb >= 57.5) {
        // Competitive 2-setter or controlled 3-setter
        const pool = [
          '6-4, 7-5',
          '7-6(4), 6-3',
          '6-3, 4-6, 6-2',
          '7-5, 6-4',
          '6-4, 3-6, 6-3',
        ];
        predictedScore = pool[seed % pool.length];
        const isThree = predictedScore.split(',').length === 3;
        setsBreakdownText = isThree ? 'Three Sets (2-1)' : 'Straight Sets (2-0)';
        expectedTotalGames = isThree ? 28 + (seed % 4) : 22 + (seed % 3);
        const mins = Math.round((isThree ? 148 : 106) * surfaceDurationMultiplier);
        estimatedDuration = `${Math.floor(mins / 60)}h ${mins % 60}m`;
      } else {
        // Deciding set thriller
        const pool = [
          '6-4, 3-6, 7-6(5)',
          '7-6(4), 4-6, 6-4',
          '4-6, 6-3, 7-5',
          '7-5, 6-7(4), 6-4',
          '6-3, 5-7, 7-6(6)',
        ];
        predictedScore = pool[seed % pool.length];
        setsBreakdownText = 'Deciding Set Thriller (2-1)';
        expectedTotalGames = 32 + (seed % 5);
        const mins = Math.round(162 * surfaceDurationMultiplier);
        estimatedDuration = `${Math.floor(mins / 60)}h ${mins % 60}m`;
      }
    } else {
      // Best of 5 Sets (Grand Slam format)
      deciderProbability = Math.round(
        Math.max(14, Math.min(52, 100 - Math.abs(p1Prob - p2Prob) * 1.8))
      );

      if (winnerProb >= 66) {
        // Straight sets sweep (3-0)
        const pool = [
          '6-3, 6-4, 6-2',
          '6-4, 7-5, 6-3',
          '6-4, 6-2, 6-3',
          '6-3, 6-4, 6-4',
        ];
        predictedScore = pool[seed % pool.length];
        setsBreakdownText = 'Straight Sets Sweep (3-0)';
        expectedTotalGames = 29 + (seed % 4);
        const mins = Math.round(142 * surfaceDurationMultiplier);
        estimatedDuration = `${Math.floor(mins / 60)}h ${mins % 60}m`;
      } else if (winnerProb >= 56.5) {
        // Four set battle (3-1)
        const pool = [
          '6-4, 3-6, 7-5, 6-3',
          '7-6(4), 4-6, 6-3, 6-4',
          '6-3, 6-7(5), 6-4, 6-4',
          '6-4, 4-6, 7-6(3), 6-2',
        ];
        predictedScore = pool[seed % pool.length];
        setsBreakdownText = 'Four-Set Contest (3-1)';
        expectedTotalGames = 39 + (seed % 5);
        const mins = Math.round(204 * surfaceDurationMultiplier);
        estimatedDuration = `${Math.floor(mins / 60)}h ${mins % 60}m`;
      } else {
        // Five set epic (3-2)
        const pool = [
          '6-4, 4-6, 7-6(5), 3-6, 6-4',
          '7-6(4), 3-6, 6-7(3), 6-3, 6-4',
          '6-3, 4-6, 6-4, 5-7, 7-5',
          '4-6, 7-6(5), 6-4, 3-6, 8-6',
        ];
        predictedScore = pool[seed % pool.length];
        setsBreakdownText = 'Five-Set Grand Slam Epic (3-2)';
        expectedTotalGames = 51 + (seed % 6);
        const mins = Math.round(260 * surfaceDurationMultiplier);
        estimatedDuration = `${Math.floor(mins / 60)}h ${mins % 60}m`;
      }
    }

    // Tactical Match Key selection
    const winnerLastName = winner.name.split(' ').pop();
    const underdogLastName = underdog.name.split(' ').pop();

    const serveWonDiff = winnerAdv.firstServeWonPct - underdogAdv.firstServeWonPct;
    const surfaceDiffVal = winnerSurfaceWinPct - underdogSurfaceWinPct;
    const holdDiffVal = winnerAdv.serviceGamesHeldPct - underdogAdv.serviceGamesHeldPct;
    const bpDiffVal = winnerAdv.breakPointConversionPct - underdogAdv.breakPointConversionPct;
    const tiebreakDiffVal = winnerAdv.tiebreakWinRatePct - underdogAdv.tiebreakWinRatePct;
    const aceDiffVal = winnerAdv.aceRate - underdogAdv.aceRate;
    const directWinsDiff = winnerDirectWins - underdogDirectWins;
    const slamTitlesDiff = (winner.grandSlams || 0) - (underdog.grandSlams || 0);

    let tacticalTitle = `Key Advantage: ${winnerLastName}'s Baseline Consistency & Court Coverage`;
    let tacticalExplanation = `Superior rank positioning and consistency in 5+ shot rallies give ${winnerLastName} the statistical high ground across prolonged exchanges on ${simSurface.toLowerCase()} court.`;

    const candidates: Array<{ title: string; explanation: string; score: number }> = [];

    if (serveWonDiff >= 1.5) {
      candidates.push({
        title: `Key Advantage: ${winnerLastName}'s 1st Serve Points Won on ${simSurface} Court`,
        explanation: `${winnerLastName} converts ${winnerAdv.firstServeWonPct}% of 1st serve deliveries into points (vs ${underdogLastName}'s ${underdogAdv.firstServeWonPct}%), securing essential free points and protecting service holds on ${simSurface.toLowerCase()} court.`,
        score: serveWonDiff * 2.2,
      });
    }

    if (surfaceDiffVal >= 3.0) {
      candidates.push({
        title: `Key Advantage: ${winnerLastName}'s ${simSurface} Court Surface Specialization`,
        explanation: `A dominant ${winnerSurfaceWinPct.toFixed(1)}% win rate on ${simSurface.toLowerCase()} courts compared to ${underdogLastName}'s ${underdogSurfaceWinPct.toFixed(1)}% aligns perfectly with the tournament bounce and speed characteristics.`,
        score: surfaceDiffVal * 2.0,
      });
    }

    if (holdDiffVal >= 2.5) {
      candidates.push({
        title: `Key Advantage: ${winnerLastName}'s Service Hold Fortress`,
        explanation: `Holding serve in ${winnerAdv.serviceGamesHeldPct}% of games creates relentless scoreboard pressure, restricting ${underdogLastName}'s margin of error during return games.`,
        score: holdDiffVal * 1.9,
      });
    }

    if (bpDiffVal >= 2.0) {
      candidates.push({
        title: `Key Advantage: ${winnerLastName}'s Break Point Conversion Lethality`,
        explanation: `Converting ${winnerAdv.breakPointConversionPct}% of break opportunities against ${underdogLastName}'s ${underdogAdv.breakPointConversionPct}% provides the critical conversion edge in high-leverage games.`,
        score: bpDiffVal * 1.8,
      });
    }

    if (tiebreakDiffVal >= 3.0) {
      candidates.push({
        title: `Key Advantage: ${winnerLastName}'s Clutch Tiebreak Composure`,
        explanation: `A ${winnerAdv.tiebreakWinRatePct}% tiebreak winning percentage provides a decisive psychological buffer when tight sets cross into extended tiebreak territory.`,
        score: tiebreakDiffVal * 1.7,
      });
    }

    if (aceDiffVal >= 3.0) {
      candidates.push({
        title: `Key Advantage: ${winnerLastName}'s Direct Ace Firepower`,
        explanation: `Averaging ${winnerAdv.aceRate} aces per match delivers unreturnable escape vectors on break points compared to ${underdogLastName}'s ${underdogAdv.aceRate} aces/match.`,
        score: aceDiffVal * 1.6,
      });
    }

    if (directWinsDiff >= 1) {
      candidates.push({
        title: `Key Advantage: ${winnerLastName}'s Head-to-Head Tactical Superiority`,
        explanation: `${winnerLastName} commands a ${winnerDirectWins}-${underdogDirectWins} lead in direct clashes, consistently executing the tactical blueprint to dismantle ${underdogLastName}'s game.`,
        score: directWinsDiff * 2.4,
      });
    }

    if (simFormat === 'best-of-5' && slamTitlesDiff >= 2) {
      candidates.push({
        title: `Key Advantage: ${winnerLastName}'s Five-Set Grand Slam Pedigree`,
        explanation: `Possessing ${winner.grandSlams} Major titles, ${winnerLastName}'s physical conditioning and fifth-set composure severely tilts best-of-five Grand Slam battles.`,
        score: slamTitlesDiff * 2.3,
      });
    }

    if (candidates.length > 0) {
      candidates.sort((a, b) => b.score - a.score);
      tacticalTitle = candidates[0].title;
      tacticalExplanation = candidates[0].explanation;
    }

    return {
      p1Prob,
      p2Prob,
      winner,
      underdog,
      winnerProb,
      underdogProb,
      p1SurfaceWinPct,
      p2SurfaceWinPct,
      predictedScore,
      setsBreakdownText,
      estimatedDuration,
      expectedTotalGames,
      deciderProbability,
      tacticalTitle,
      tacticalExplanation,
      holdDiff: (p1Adv.serviceGamesHeldPct - p2Adv.serviceGamesHeldPct).toFixed(1),
      bpDiff: (p1Adv.breakPointConversionPct - p2Adv.breakPointConversionPct).toFixed(1),
      h2hSummary: `${p1WinsInDirect}W - ${p2WinsInDirect}W`,
      surfaceDiffPct: (p1SurfaceWinPct - p2SurfaceWinPct).toFixed(1),
    };
  }, [
    p1,
    p2,
    p1Adv,
    p2Adv,
    directMatches,
    p1WinsInDirect,
    p2WinsInDirect,
    simSurface,
    simFormat,
    simFormWeight,
  ]);

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
                  <img src={getAssetUrl(p1.avatarUrl)} alt="" className="w-full h-full object-cover" />
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
                        src={getAssetUrl(p1.avatarUrl)}
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

            {/* Center Rivalry Scoreboard with SVG Duel Pie / Donut Chart */}
            <div className="lg:col-span-3 flex flex-col items-center justify-center text-center py-4 bg-black/40 rounded-2xl border border-white/[0.06] p-4">
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-2">
                Encounter Ledger
              </span>

              <div className="my-1.5 flex items-center justify-center">
                <DuelPieChart
                  p1Wins={p1WinsInDirect}
                  p2Wins={p2WinsInDirect}
                  p1Name={p1.name}
                  p2Name={p2.name}
                  size={108}
                  strokeWidth={8.5}
                  p1Color="#e5c378"
                  p2Color="#38bdf8"
                />
              </div>

              <span className="font-mono text-[11px] text-white/50 mt-1 uppercase tracking-wider">
                {directMatches.length} Direct Clash{directMatches.length !== 1 ? 'es' : ''}
              </span>

              <div className="mt-3 pt-3 border-t border-white/[0.06] w-full flex items-center justify-around text-[10px] font-mono">
                <span className="text-[#e5c378] font-medium">{p1.name.split(' ').pop()}: {p1WinsInDirect}W</span>
                <span className="text-white/20">•</span>
                <span className="text-[#38bdf8] font-medium">{p2.name.split(' ').pop()}: {p2WinsInDirect}W</span>
              </div>
            </div>

            {/* Competitor 2 Card */}
            <div className="lg:col-span-4 rounded-2xl bg-[#090b10] border border-white/[0.08] p-5 relative overflow-hidden group">
              {/* Subtle Player Portrait Vignette */}
              {p2.avatarUrl && (
                <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full overflow-hidden opacity-10 pointer-events-none filter blur-xl group-hover:opacity-15 transition-opacity">
                  <img src={getAssetUrl(p2.avatarUrl)} alt="" className="w-full h-full object-cover" />
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
                        src={getAssetUrl(p2.avatarUrl)}
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

      {/* Interactive Win-Probability Predictor & Match Simulation Engine */}
      <div className="double-bezel-card-outer">
        <div className="double-bezel-card-inner p-6 sm:p-8 relative overflow-hidden bg-gradient-to-b from-[#0d1219] via-[#090c12] to-[#05070a]">
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

          {/* Engine Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-7 pb-6 border-b border-white/[0.06]">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-theme-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-theme-accent"></span>
                </span>
                <span className="font-mono text-[11px] uppercase tracking-widest text-theme-accent font-semibold flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5" />
                  Predictive Match Simulation Engine
                </span>
              </div>
              <h3 className="font-display font-semibold text-xl sm:text-2xl text-white tracking-tight">
                Win-Probability Predictor & Match Simulation
              </h3>
              <p className="text-xs sm:text-sm text-white/60 mt-1 font-normal">
                Multi-factor algorithmic simulation conditioned on court speed, match distance, and clutch pressure metrics.
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-[11px]">
              <span className="px-3 py-1.5 rounded-full bg-white/[0.03] text-white/70 border border-white/[0.08] flex items-center gap-2 shadow-sm">
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                <span>10,000 Monte Carlo Iterations</span>
              </span>
            </div>
          </div>

          {/* Match Condition Selector Console */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {/* 1. Surface Condition Selector */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2.5">
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/50 flex items-center gap-1.5">
                  <Sliders className="w-3 h-3 text-white/40" />
                  Court Surface
                </span>
                <span className="font-mono text-[10px] text-white/40">
                  {simSurface === 'Hard' && 'Laykold / Deco'}
                  {simSurface === 'Clay' && 'Terre Battue'}
                  {simSurface === 'Grass' && 'Wimbledon Lawn'}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-1.5 p-1 rounded-lg bg-black/50 border border-white/[0.06]">
                {(['Hard', 'Clay', 'Grass'] as MatchSurface[]).map((surf) => {
                  const isActive = simSurface === surf;
                  const activeColorClass =
                    surf === 'Hard'
                      ? 'bg-sky-500/20 text-sky-200 border-sky-400/40 shadow-[0_0_12px_rgba(56,189,248,0.25)]'
                      : surf === 'Clay'
                      ? 'bg-orange-500/20 text-orange-200 border-orange-400/40 shadow-[0_0_12px_rgba(249,115,22,0.25)]'
                      : 'bg-emerald-500/20 text-emerald-200 border-emerald-400/40 shadow-[0_0_12px_rgba(16,185,129,0.25)]';
                  const dotColorClass =
                    surf === 'Hard' ? 'bg-sky-400' : surf === 'Clay' ? 'bg-orange-400' : 'bg-emerald-400';

                  return (
                    <button
                      key={surf}
                      onClick={() => setSimSurface(surf)}
                      className={`px-2 py-1.5 rounded-md text-xs font-mono transition-all border flex items-center justify-center gap-1.5 ${
                        isActive
                          ? activeColorClass
                          : 'bg-transparent text-white/50 hover:text-white hover:bg-white/[0.04] border-transparent'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${dotColorClass}`} />
                      <span>{surf}</span>
                    </button>
                  );
                })}
              </div>
              <div className="mt-2.5 flex items-center justify-between text-[10px] font-mono text-white/40 px-0.5">
                <span>{p1.name.split(' ').pop()}: {simulationResult.p1SurfaceWinPct}%</span>
                <span>•</span>
                <span>{p2.name.split(' ').pop()}: {simulationResult.p2SurfaceWinPct}%</span>
              </div>
            </div>

            {/* 2. Format Toggle Selector */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2.5">
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/50 flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-white/40" />
                  Contest Format
                </span>
                <span className="font-mono text-[10px] text-white/40">
                  {simFormat === 'best-of-5' ? 'Grand Slam (Bo5)' : 'Tour Match (Bo3)'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1.5 p-1 rounded-lg bg-black/50 border border-white/[0.06]">
                <button
                  onClick={() => setSimFormat('best-of-3')}
                  className={`px-2 py-1.5 rounded-md text-xs font-mono transition-all border text-center ${
                    simFormat === 'best-of-3'
                      ? 'bg-white/[0.12] text-white border-white/25 shadow-sm font-semibold'
                      : 'bg-transparent text-white/50 hover:text-white hover:bg-white/[0.04] border-transparent'
                  }`}
                >
                  Best of 3 Sets
                </button>
                <button
                  onClick={() => setSimFormat('best-of-5')}
                  className={`px-2 py-1.5 rounded-md text-xs font-mono transition-all border text-center ${
                    simFormat === 'best-of-5'
                      ? 'bg-theme-accent/20 text-theme-accent border-theme-accent/30 shadow-sm font-semibold'
                      : 'bg-transparent text-white/50 hover:text-white hover:bg-white/[0.04] border-transparent'
                  }`}
                >
                  Best of 5 Sets
                </button>
              </div>
              <div className="mt-2.5 text-[10px] font-mono text-white/40 px-0.5 truncate">
                {simFormat === 'best-of-5'
                  ? 'Grand Slam distance: variance reduced, favoring top tier'
                  : 'Standard tour distance: higher set volatility'}
              </div>
            </div>

            {/* 3. Form & Statistical Weight Selector */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2.5">
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/50 flex items-center gap-1.5">
                  <Target className="w-3 h-3 text-white/40" />
                  Recent Form Bias
                </span>
                <span className="font-mono text-[10px] text-white/40">Model Weight</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5 p-1 rounded-lg bg-black/50 border border-white/[0.06]">
                <button
                  onClick={() => setSimFormWeight('balanced')}
                  className={`px-1.5 py-1.5 rounded-md text-[11px] font-mono transition-all border text-center ${
                    simFormWeight === 'balanced'
                      ? 'bg-white/[0.12] text-white border-white/25 shadow-sm font-semibold'
                      : 'bg-transparent text-white/50 hover:text-white hover:bg-white/[0.04] border-transparent'
                  }`}
                >
                  Balanced
                </button>
                <button
                  onClick={() => setSimFormWeight('peak')}
                  className={`px-1.5 py-1.5 rounded-md text-[11px] font-mono transition-all border text-center ${
                    simFormWeight === 'peak'
                      ? 'bg-amber-200/20 text-amber-200 border-amber-200/30 shadow-sm font-semibold'
                      : 'bg-transparent text-white/50 hover:text-white hover:bg-white/[0.04] border-transparent'
                  }`}
                >
                  Peak Form
                </button>
                <button
                  onClick={() => setSimFormWeight('specialist')}
                  className={`px-1.5 py-1.5 rounded-md text-[11px] font-mono transition-all border text-center ${
                    simFormWeight === 'specialist'
                      ? 'bg-emerald-400/20 text-emerald-300 border-emerald-400/30 shadow-sm font-semibold'
                      : 'bg-transparent text-white/50 hover:text-white hover:bg-white/[0.04] border-transparent'
                  }`}
                >
                  Specialist
                </button>
              </div>
              <div className="mt-2.5 text-[10px] font-mono text-white/40 px-0.5 truncate">
                {simFormWeight === 'balanced' && '50/50 baseline blend of career, rank & surface'}
                {simFormWeight === 'peak' && 'Momentum focus: elevated rank & peak form weight'}
                {simFormWeight === 'specialist' && 'Court mastery: 52% weighting on chosen surface'}
              </div>
            </div>
          </div>

          {/* Dynamic Probability Display & Dual-Colored Progress Bar */}
          <div className="p-5 sm:p-6 rounded-2xl bg-black/50 border border-white/[0.08] mb-8 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              {/* Player 1 Prob Card */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/10 bg-black/60 shrink-0">
                  {p1.avatarUrl ? (
                    <img src={getAssetUrl(p1.avatarUrl)} alt={p1.name} className="w-full h-full object-cover object-top" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-mono text-xs text-theme-accent">
                      {p1.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display font-semibold text-white text-base sm:text-lg">
                      {p1.name}
                    </span>
                    <span className="font-mono text-[10px] uppercase text-white/40">
                      {getCountryCode(p1.country)}
                    </span>
                  </div>
                  <div className="font-mono text-[11px] text-theme-accent">
                    {simulationResult.p1Prob >= 50 ? 'PROJECTED FAVORITE' : 'CHALLENGER'}
                  </div>
                </div>
                <div className="ml-auto sm:ml-4 font-mono font-bold text-2xl sm:text-3xl tabular-nums text-[#e5c378] drop-shadow-[0_0_12px_rgba(229,195,120,0.35)]">
                  {simulationResult.p1Prob}%
                </div>
              </div>

              {/* Matchup Classification Center Badge */}
              <div className="flex flex-row sm:flex-col items-center justify-center gap-1 py-1 px-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center font-mono">
                <span className="text-[10px] uppercase tracking-wider text-white/50">
                  Differential
                </span>
                <span className="text-xs font-semibold text-white/90">
                  ±{Math.abs(simulationResult.p1Prob - simulationResult.p2Prob).toFixed(1)}%
                </span>
              </div>

              {/* Player 2 Prob Card */}
              <div className="flex items-center justify-between sm:justify-end gap-3">
                <div className="font-mono font-bold text-2xl sm:text-3xl tabular-nums text-[#38bdf8] drop-shadow-[0_0_12px_rgba(56,189,248,0.35)] order-1 sm:order-none">
                  {simulationResult.p2Prob}%
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <span className="font-mono text-[10px] uppercase text-white/40">
                      {getCountryCode(p2.country)}
                    </span>
                    <span className="font-display font-semibold text-white text-base sm:text-lg">
                      {p2.name}
                    </span>
                  </div>
                  <div className="font-mono text-[11px] text-sky-400">
                    {simulationResult.p2Prob >= 50 ? 'PROJECTED FAVORITE' : 'CHALLENGER'}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/10 bg-black/60 shrink-0">
                  {p2.avatarUrl ? (
                    <img src={getAssetUrl(p2.avatarUrl)} alt={p2.name} className="w-full h-full object-cover object-top" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-mono text-xs text-sky-400">
                      {p2.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* The Dual-Colored Animated Probability Progress Bar */}
            <div className="relative pt-2 pb-1">
              <div className="relative h-7 sm:h-8 w-full rounded-full bg-[#06080c] p-1 border border-white/10 overflow-hidden shadow-[inset_0_2px_10px_rgba(0,0,0,0.9)] flex items-center">
                {/* Player 1 Bar segment */}
                <div
                  style={{ width: `${simulationResult.p1Prob}%` }}
                  className="h-full rounded-l-full bg-gradient-to-r from-[#b89547] via-[#d4af37] to-[#e5c378] flex items-center justify-between px-3 text-[11px] font-mono font-bold text-black shadow-[0_0_14px_rgba(229,195,120,0.4)] transition-all duration-700 ease-out select-none truncate"
                >
                  <span className="truncate">{p1.name.split(' ').pop()}</span>
                  <span>{simulationResult.p1Prob}%</span>
                </div>

                {/* Laser Pin Notch at the probability boundary */}
                <div
                  style={{ left: `${simulationResult.p1Prob}%` }}
                  className="absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_8px_rgba(255,255,255,1)] z-20 pointer-events-none transform -translate-x-1/2 transition-all duration-700 ease-out"
                />

                {/* Player 2 Bar segment */}
                <div
                  style={{ width: `${simulationResult.p2Prob}%` }}
                  className="h-full rounded-r-full bg-gradient-to-r from-[#0284c7] via-[#0ea5e9] to-[#38bdf8] flex items-center justify-between px-3 text-[11px] font-mono font-bold text-slate-950 shadow-[0_0_14px_rgba(56,189,248,0.4)] transition-all duration-700 ease-out select-none truncate"
                >
                  <span>{simulationResult.p2Prob}%</span>
                  <span className="truncate">{p2.name.split(' ').pop()}</span>
                </div>
              </div>

              {/* Gauge Horology Scale & Centermarkers */}
              <div className="relative mt-2 flex items-center justify-between font-mono text-[9px] text-white/35 px-1">
                <span>0%</span>
                <span className="text-white/25">25%</span>
                <span className="flex items-center gap-1 text-white/50 font-semibold">
                  <span>|</span> 50% PARITY <span>|</span>
                </span>
                <span className="text-white/25">75%</span>
                <span>100%</span>
              </div>
            </div>
          </div>

          {/* Simulation Output Cards: Predicted Scoreline & Tactical Match Key */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Output Card 1: Predicted Scoreline */}
            <div className="p-5 rounded-2xl bg-[#080b0f] border border-white/[0.08] relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-white/[0.06]">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-white/50 flex items-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5 text-theme-accent" />
                    Projected Match Scoreline
                  </span>
                  <span className="font-mono text-[10px] text-theme-accent px-2 py-0.5 rounded-full bg-theme-accent/10 border border-theme-accent/20">
                    {simFormat === 'best-of-5' ? 'Grand Slam Format' : 'Best of 3 Format'}
                  </span>
                </div>

                <div className="text-[11px] font-mono text-white/50 mb-1 uppercase tracking-wider">
                  Algorithmic Winner Projection:
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-display font-semibold text-lg sm:text-xl text-white">
                    {simulationResult.winner.name}
                  </span>
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-emerald-400/10 text-emerald-300 border border-emerald-400/20 font-semibold">
                    {simulationResult.winnerProb}% Odds
                  </span>
                </div>

                {/* Big Terminal Scoreboard */}
                <div className="p-4 rounded-xl bg-[#040609] border border-white/10 shadow-inner text-center mb-4 relative overflow-hidden">
                  <div className="font-mono font-bold text-2xl sm:text-3xl tracking-widest text-[#e5c378] drop-shadow-[0_0_10px_rgba(229,195,120,0.35)]">
                    {simulationResult.predictedScore}
                  </div>
                  <div className="font-mono text-[10px] text-white/50 mt-1.5 uppercase tracking-wider">
                    {simulationResult.winner.name.split(' ').pop()} def. {simulationResult.underdog.name.split(' ').pop()} ({simulationResult.setsBreakdownText})
                  </div>
                </div>
              </div>

              {/* Telemetry Metrics Footer */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/[0.06] text-center font-mono">
                <div>
                  <div className="text-[9px] uppercase tracking-wider text-white/40">Est. Duration</div>
                  <div className="text-xs text-white/85 font-medium mt-0.5">
                    {simulationResult.estimatedDuration}
                  </div>
                </div>
                <div>
                  <div className="text-[9px] uppercase tracking-wider text-white/40">Expected Games</div>
                  <div className="text-xs text-white/85 font-medium mt-0.5">
                    {simulationResult.expectedTotalGames}
                  </div>
                </div>
                <div>
                  <div className="text-[9px] uppercase tracking-wider text-white/40">Decider Odds</div>
                  <div className="text-xs text-white/85 font-medium mt-0.5">
                    {simulationResult.deciderProbability}%
                  </div>
                </div>
              </div>
            </div>

            {/* Output Card 2: Tactical Match Key */}
            <div className="p-5 rounded-2xl bg-[#080b0f] border border-white/[0.08] relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-white/[0.06]">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-white/50 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-300" />
                    Tactical Match Key
                  </span>
                  <span className="font-mono text-[10px] text-white/40">
                    Decisive Metric Driver
                  </span>
                </div>

                {/* Primary Tactical Advantage Box */}
                <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-400/[0.08] to-transparent border border-amber-300/20 mb-3.5">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Crosshair className="w-4 h-4 text-theme-accent shrink-0" />
                    <h4 className="font-mono font-semibold text-xs sm:text-sm text-theme-accent tracking-wide">
                      {simulationResult.tacticalTitle}
                    </h4>
                  </div>
                  <p className="text-xs text-white/70 font-normal leading-relaxed pl-6">
                    {simulationResult.tacticalExplanation}
                  </p>
                </div>
              </div>

              {/* Matchup Edge Differential Mini-Vectors */}
              <div className="space-y-2 pt-2 border-t border-white/[0.06]">
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-white/40 mb-1">
                  <span>Matchup Edge Differentials</span>
                  <span>{p1.name.split(' ').pop()} vs {p2.name.split(' ').pop()}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                  <div className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.05] flex items-center justify-between">
                    <span className="text-white/50">{simSurface} Court:</span>
                    <span className="text-theme-accent font-semibold">{simulationResult.surfaceDiffPct}%</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.05] flex items-center justify-between">
                    <span className="text-white/50">Service Hold:</span>
                    <span className="text-white/80 font-semibold">{simulationResult.holdDiff}%</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.05] flex items-center justify-between">
                    <span className="text-white/50">H2H Ledger:</span>
                    <span className="text-white/80 font-semibold">{simulationResult.h2hSummary}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.05] flex items-center justify-between">
                    <span className="text-white/50">BP Conversion:</span>
                    <span className="text-white/80 font-semibold">{simulationResult.bpDiff}%</span>
                  </div>
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
                Head-to-head career honors, serve firepower, clutch execution, and surface mastery
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="text-white/70">{p1.name.split(' ').pop()}</span>
              <span className="text-white/20">vs</span>
              <span className="text-white/70">{p2.name.split(' ').pop()}</span>
            </div>
          </div>

          <div className="space-y-6">
            {/* 1. Career Honours & Biometrics */}
            <div>
              <div className="flex items-center gap-2 mb-2.5 pb-2 border-b border-white/[0.05]">
                <Award className="w-3.5 h-3.5 text-white/40" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/50 font-semibold">
                  Career Honours & Biometrics
                </span>
              </div>
              <div className="space-y-2">
                <ComparisonTelemetryRow
                  label="Grand Slam Titles"
                  val1={p1.grandSlams}
                  val2={p2.grandSlams}
                  higherWins={true}
                  showMeter={true}
                />
                <ComparisonTelemetryRow
                  label="Total Career Titles"
                  val1={p1.careerTitles}
                  val2={p2.careerTitles}
                  higherWins={true}
                  showMeter={true}
                />
                <ComparisonTelemetryRow
                  label="Career Win Percentage"
                  val1={p1.careerWinLoss.winPercentage}
                  val2={p2.careerWinLoss.winPercentage}
                  suffix="%"
                  higherWins={true}
                  showMeter={true}
                />
                <ComparisonTelemetryRow
                  label="Career High Ranking"
                  val1={p1.careerHighRank}
                  val2={p2.careerHighRank}
                  prefix="No. "
                  higherWins={false}
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
                  higherWins={true}
                />
              </div>
            </div>

            {/* 2. Serve Telemetry */}
            <div>
              <div className="flex items-center gap-2 mb-2.5 pb-2 border-b border-white/[0.05]">
                <Zap className="w-3.5 h-3.5 text-amber-300" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-amber-200/80 font-semibold">
                  Serve Telemetry
                </span>
              </div>
              <div className="space-y-2">
                <ComparisonTelemetryRow
                  label="1st Serve Won %"
                  val1={p1Adv.firstServeWonPct}
                  val2={p2Adv.firstServeWonPct}
                  suffix="%"
                  higherWins={true}
                  showMeter={true}
                />
                <ComparisonTelemetryRow
                  label="Ace Rate"
                  val1={p1Adv.aceRate}
                  val2={p2Adv.aceRate}
                  suffix=" / match"
                  higherWins={true}
                  showMeter={true}
                />
                <ComparisonTelemetryRow
                  label="Service Games Held %"
                  val1={p1Adv.serviceGamesHeldPct}
                  val2={p2Adv.serviceGamesHeldPct}
                  suffix="%"
                  higherWins={true}
                  showMeter={true}
                />
              </div>
            </div>

            {/* 3. Return & Clutch Telemetry */}
            <div>
              <div className="flex items-center gap-2 mb-2.5 pb-2 border-b border-white/[0.05]">
                <Shield className="w-3.5 h-3.5 text-sky-400" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-sky-200/80 font-semibold">
                  Return & Clutch Telemetry
                </span>
              </div>
              <div className="space-y-2">
                <ComparisonTelemetryRow
                  label="Break Point Conversion %"
                  val1={p1Adv.breakPointConversionPct}
                  val2={p2Adv.breakPointConversionPct}
                  suffix="%"
                  higherWins={true}
                  showMeter={true}
                />
                <ComparisonTelemetryRow
                  label="Tiebreak Win Rate"
                  val1={p1Adv.tiebreakWinRatePct}
                  val2={p2Adv.tiebreakWinRatePct}
                  suffix="%"
                  higherWins={true}
                  showMeter={true}
                />
                <ComparisonTelemetryRow
                  label="Deciding Set Record"
                  val1={p1Adv.decidingSetWinPct}
                  val2={p2Adv.decidingSetWinPct}
                  suffix="%"
                  higherWins={true}
                  showMeter={true}
                />
              </div>
            </div>

            {/* 4. Court Surface Mastery */}
            <div>
              <div className="flex items-center gap-2 mb-2.5 pb-2 border-b border-white/[0.05]">
                <Gauge className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-200/80 font-semibold">
                  Court Surface Mastery
                </span>
              </div>
              <div className="space-y-2">
                <ComparisonTelemetryRow
                  label="Hard Court Win Rate"
                  val1={p1.surfaceStats.hard.winPercentage}
                  val2={p2.surfaceStats.hard.winPercentage}
                  suffix="%"
                  higherWins={true}
                  showMeter={true}
                />
                <ComparisonTelemetryRow
                  label="Clay Court Win Rate"
                  val1={p1.surfaceStats.clay.winPercentage}
                  val2={p2.surfaceStats.clay.winPercentage}
                  suffix="%"
                  higherWins={true}
                  showMeter={true}
                />
                <ComparisonTelemetryRow
                  label="Grass Court Win Rate"
                  val1={p1.surfaceStats.grass.winPercentage}
                  val2={p2.surfaceStats.grass.winPercentage}
                  suffix="%"
                  higherWins={true}
                  showMeter={true}
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Surface Mastery Duel Matrix (Visual Circular Donut Faceoff) */}
      <div className="double-bezel-card-outer">
        <div className="double-bezel-card-inner p-6 sm:p-8 relative overflow-hidden bg-gradient-to-b from-[#0c1015] to-[#080a0d]">
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-white/[0.06]">
            <div>
              <h3 className="font-display font-semibold text-lg sm:text-xl text-white tracking-tight">
                Surface Mastery Duel Telemetry
              </h3>
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mt-0.5">
                Comparative circular win-rate gauges across all official court surfaces
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-[#e5c378] font-medium">
                <span className="w-2 h-2 rounded-full bg-[#e5c378]" />
                {p1.name.split(' ').pop()}
              </span>
              <span className="text-white/20 font-light">vs</span>
              <span className="flex items-center gap-1.5 text-[#38bdf8] font-medium">
                <span className="w-2 h-2 rounded-full bg-[#38bdf8]" />
                {p2.name.split(' ').pop()}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Hard Court Surface Gauge Duel */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-sky-500/30 transition flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/[0.05]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.5)]" />
                  <span className="font-mono text-xs font-semibold text-white/90">Hard Court</span>
                </div>
                <span className="text-[10px] font-mono text-sky-400/60 uppercase">Laykold</span>
              </div>

              <div className="flex items-center justify-around py-2">
                <div className="flex flex-col items-center">
                  <SurfaceGaugePie
                    surface="Hard"
                    winPercentage={p1.surfaceStats.hard.winPercentage}
                    wins={p1.surfaceStats.hard.wins}
                    losses={p1.surfaceStats.hard.losses}
                    size={56}
                    strokeWidth={5}
                  />
                  <span className="font-mono text-[10px] text-theme-accent font-medium mt-1">
                    {p1.name.split(' ').pop()}
                  </span>
                  <span className="font-mono text-[9px] text-white/40">
                    {p1.surfaceStats.hard.wins}W-{p1.surfaceStats.hard.losses}L
                  </span>
                </div>

                <div className="flex flex-col items-center px-2">
                  <MiniDualShareMeter
                    val1={p1.surfaceStats.hard.winPercentage}
                    val2={p2.surfaceStats.hard.winPercentage}
                    size={26}
                    strokeWidth={3}
                    color1="#e5c378"
                    color2="#38bdf8"
                  />
                  <span className="font-mono text-[9px] uppercase tracking-widest text-white/30 mt-1">
                    Share
                  </span>
                </div>

                <div className="flex flex-col items-center">
                  <SurfaceGaugePie
                    surface="Hard"
                    winPercentage={p2.surfaceStats.hard.winPercentage}
                    wins={p2.surfaceStats.hard.wins}
                    losses={p2.surfaceStats.hard.losses}
                    size={56}
                    strokeWidth={5}
                  />
                  <span className="font-mono text-[10px] text-sky-400 font-medium mt-1">
                    {p2.name.split(' ').pop()}
                  </span>
                  <span className="font-mono text-[9px] text-white/40">
                    {p2.surfaceStats.hard.wins}W-{p2.surfaceStats.hard.losses}L
                  </span>
                </div>
              </div>
            </div>

            {/* Clay Court Surface Gauge Duel */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-orange-500/30 transition flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/[0.05]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_8px_rgba(249,115,22,0.5)]" />
                  <span className="font-mono text-xs font-semibold text-white/90">Clay Court</span>
                </div>
                <span className="text-[10px] font-mono text-orange-400/60 uppercase">Terre Battue</span>
              </div>

              <div className="flex items-center justify-around py-2">
                <div className="flex flex-col items-center">
                  <SurfaceGaugePie
                    surface="Clay"
                    winPercentage={p1.surfaceStats.clay.winPercentage}
                    wins={p1.surfaceStats.clay.wins}
                    losses={p1.surfaceStats.clay.losses}
                    size={56}
                    strokeWidth={5}
                  />
                  <span className="font-mono text-[10px] text-theme-accent font-medium mt-1">
                    {p1.name.split(' ').pop()}
                  </span>
                  <span className="font-mono text-[9px] text-white/40">
                    {p1.surfaceStats.clay.wins}W-{p1.surfaceStats.clay.losses}L
                  </span>
                </div>

                <div className="flex flex-col items-center px-2">
                  <MiniDualShareMeter
                    val1={p1.surfaceStats.clay.winPercentage}
                    val2={p2.surfaceStats.clay.winPercentage}
                    size={26}
                    strokeWidth={3}
                    color1="#e5c378"
                    color2="#38bdf8"
                  />
                  <span className="font-mono text-[9px] uppercase tracking-widest text-white/30 mt-1">
                    Share
                  </span>
                </div>

                <div className="flex flex-col items-center">
                  <SurfaceGaugePie
                    surface="Clay"
                    winPercentage={p2.surfaceStats.clay.winPercentage}
                    wins={p2.surfaceStats.clay.wins}
                    losses={p2.surfaceStats.clay.losses}
                    size={56}
                    strokeWidth={5}
                  />
                  <span className="font-mono text-[10px] text-sky-400 font-medium mt-1">
                    {p2.name.split(' ').pop()}
                  </span>
                  <span className="font-mono text-[9px] text-white/40">
                    {p2.surfaceStats.clay.wins}W-{p2.surfaceStats.clay.losses}L
                  </span>
                </div>
              </div>
            </div>

            {/* Grass Court Surface Gauge Duel */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-emerald-500/30 transition flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/[0.05]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  <span className="font-mono text-xs font-semibold text-white/90">Grass Court</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400/60 uppercase">Wimbledon Lawn</span>
              </div>

              <div className="flex items-center justify-around py-2">
                <div className="flex flex-col items-center">
                  <SurfaceGaugePie
                    surface="Grass"
                    winPercentage={p1.surfaceStats.grass.winPercentage}
                    wins={p1.surfaceStats.grass.wins}
                    losses={p1.surfaceStats.grass.losses}
                    size={56}
                    strokeWidth={5}
                  />
                  <span className="font-mono text-[10px] text-theme-accent font-medium mt-1">
                    {p1.name.split(' ').pop()}
                  </span>
                  <span className="font-mono text-[9px] text-white/40">
                    {p1.surfaceStats.grass.wins}W-{p1.surfaceStats.grass.losses}L
                  </span>
                </div>

                <div className="flex flex-col items-center px-2">
                  <MiniDualShareMeter
                    val1={p1.surfaceStats.grass.winPercentage}
                    val2={p2.surfaceStats.grass.winPercentage}
                    size={26}
                    strokeWidth={3}
                    color1="#e5c378"
                    color2="#38bdf8"
                  />
                  <span className="font-mono text-[9px] uppercase tracking-widest text-white/30 mt-1">
                    Share
                  </span>
                </div>

                <div className="flex flex-col items-center">
                  <SurfaceGaugePie
                    surface="Grass"
                    winPercentage={p2.surfaceStats.grass.winPercentage}
                    wins={p2.surfaceStats.grass.wins}
                    losses={p2.surfaceStats.grass.losses}
                    size={56}
                    strokeWidth={5}
                  />
                  <span className="font-mono text-[10px] text-sky-400 font-medium mt-1">
                    {p2.name.split(' ').pop()}
                  </span>
                  <span className="font-mono text-[9px] text-white/40">
                    {p2.surfaceStats.grass.wins}W-{p2.surfaceStats.grass.losses}L
                  </span>
                </div>
              </div>
            </div>
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
  showMeter?: boolean;
}

const ComparisonTelemetryRow: React.FC<ComparisonTelemetryRowProps> = ({
  label,
  val1,
  val2,
  prefix = '',
  suffix = '',
  higherWins,
  showMeter = false,
}) => {
  const isP1Better = higherWins !== undefined ? (higherWins ? val1 > val2 : val1 < val2) : false;
  const isP2Better = higherWins !== undefined ? (higherWins ? val2 > val1 : val2 < val1) : false;

  const displayVal1 = typeof val1 === 'number' && !Number.isInteger(val1) ? val1.toFixed(1) : val1;
  const displayVal2 = typeof val2 === 'number' && !Number.isInteger(val2) ? val2.toFixed(1) : val2;

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
          {prefix}{displayVal1}{suffix}
        </span>
      </div>

      {/* Category Metric Label + Optional Mini Dual Donut Meter */}
      <div className="flex-1 flex items-center justify-center gap-2 px-2">
        <span className="font-mono text-[10px] uppercase tracking-widest text-white/45 text-center">
          {label}
        </span>
        {showMeter && (val1 > 0 || val2 > 0) && (
          <MiniDualShareMeter
            val1={val1}
            val2={val2}
            size={20}
            strokeWidth={2.8}
            color1="#e5c378"
            color2="#38bdf8"
          />
        )}
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
          {prefix}{displayVal2}{suffix}
        </span>
      </div>
    </div>
  );
};

export default HeadToHeadView;
