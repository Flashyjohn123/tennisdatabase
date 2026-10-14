export type Tour = 'ATP' | 'WTA';
export type Surface = 'Hard' | 'Clay' | 'Grass';
export type Hand =
  | 'Right-handed (two-handed backhand)'
  | 'Right-handed (one-handed backhand)'
  | 'Left-handed (two-handed backhand)'
  | 'Left-handed (one-handed backhand)';

export type FeedCategory =
  | 'injury'
  | 'withdrawal'
  | 'breaking'
  | 'controversy'
  | 'match_result'
  | 'tournament_update';

export type FeedSeverity = 'low' | 'medium' | 'high' | 'urgent';

export type TournamentTier =
  | 'Grand Slam'
  | 'ATP Masters 1000'
  | 'WTA 1000'
  | 'ATP 500'
  | 'WTA 500'
  | 'ATP Finals'
  | 'WTA Finals';

export interface SurfaceStats {
  wins: number;
  losses: number;
  winPercentage: number;
}

export interface PlayerInjury {
  type: string;
  status: 'Active' | 'Recovering' | 'Day-to-day' | 'Out for Season' | 'Cleared';
  returnEstimate?: string;
  details: string;
  severity: FeedSeverity;
  reportedDate: string;
}

export interface CareerInjuryRecord {
  year: number | string;
  injury: string;
  durationOrTournament: string;
  details: string;
  severity?: 'mild' | 'moderate' | 'severe';
  status?: 'Resolved' | 'Rehabilitated' | 'Active Monitoring' | 'Cleared';
}

export interface Player {
  id: string;
  name: string;
  tour: Tour;
  country: string;
  countryCode: string;
  flag: string;
  age: number;
  birthDate: string;
  birthPlace: string;
  heightCm: number;
  turnedPro: number;
  plays: Hand;
  currentRank: number;
  careerHighRank: number;
  careerTitles: number;
  grandSlams: number;
  slamFinals?: number;
  slamBreakdown: {
    australianOpen: number;
    rolandGarros: number;
    wimbledon: number;
    usOpen: number;
  };
  prizeMoneyUsd: string;
  careerWinLoss: {
    wins: number;
    losses: number;
    winPercentage: number;
  };
  surfaceStats: {
    hard: SurfaceStats;
    clay: SurfaceStats;
    grass: SurfaceStats;
  };
  avatarUrl: string;
  bio: string;
  playStyle: string;
  notableRivalries: string[];
  activeInjury?: PlayerInjury | null;
  injuryHistory?: CareerInjuryRecord[];
  points?: number;
  movement?: number;
  tournamentsPlayed?: number;
  status?: 'active' | 'active_on_tour';
}

export interface PlayerRankSummary {
  rank: number;
  previousRank: number;
  movement: number;
  id: string;
  name: string;
  tour: Tour;
  country: string;
  countryCode: string;
  flag: string;
  age: number;
  points: number;
  tournamentsPlayed: number;
  winPercentage?: number;
  wins?: number;
  losses?: number;
  careerTitles?: number;
  activeInjury?: PlayerInjury | null;
  livePoints?: number;
  officialPoints?: number;
  deltaPoints?: number;
  pointsDelta?: number;
  droppingPoints?: number;
  nextBestPoints?: number;
  tournamentStatus?: string;
  liveRank?: number;
  isLiveScraped?: boolean;
}

export interface AtpLiveRankEntry extends PlayerRankSummary {
  liveRank?: number;
  officialRank?: number;
  livePoints?: number;
  officialPoints?: number;
  deltaPoints?: number;
  tournamentStatus?: string;
  isLiveScraped?: boolean;
}

export interface WtaLiveRankEntry extends PlayerRankSummary {
  liveRank?: number;
  officialRank?: number;
  livePoints?: number;
  officialPoints?: number;
  deltaPoints?: number;
  tournamentStatus?: string;
  isLiveScraped?: boolean;
}

export interface MatchStats {
  aces: [number, number];
  doubleFaults: [number, number];
  firstServePercentage: [number, number];
  breakPointsWon: [string, string];
  unforcedErrors: [number, number];
  totalPointsWon: [number, number];
  matchDurationMinutes: number;
}

export interface Match {
  id: string;
  tournamentId: string;
  tournamentName: string;
  year: number;
  round: string;
  surface: Surface;
  player1Id: string;
  player1Name: string;
  player2Id: string;
  player2Name: string;
  winnerId: string;
  score: string;
  stats?: MatchStats;
  headline?: string;
  highlights?: string;
}

export interface Tournament {
  id: string;
  name: string;
  category:
    | 'Grand Slam'
    | 'ATP Finals'
    | 'WTA Finals'
    | 'Masters 1000'
    | 'ATP Masters 1000'
    | 'WTA 1000'
    | 'ATP 500'
    | 'WTA 500';
  location: string;
  city: string;
  country: string;
  surface: Surface;
  surfaceSpeed: 'Slow' | 'Medium' | 'Fast';
  founded: number;
  mostSuccessfulPlayer: {
    name: string;
    titles: number;
  };
  defendingChampions?: {
    singlesMen?: string;
    singlesWomen?: string;
    singles?: string;
  };
  description: string;
  icon: string;
}

export interface TournamentScheduleItem {
  id: string;
  name: string;
  tier: TournamentTier;
  category:
    | TournamentTier
    | 'Grand Slam'
    | 'ATP Finals'
    | 'WTA Finals'
    | 'Masters 1000'
    | 'WTA 1000'
    | 'ATP 500'
    | 'WTA 500';
  tour: Tour | 'ATP & WTA' | 'COMBINED';
  surface: Surface;
  surfaceSpeed?: 'Slow' | 'Medium' | 'Fast';
  dates: string;
  startDate: string;
  endDate: string;
  prizeMoney: string;
  winnerPoints: number;
  drawSize: number;
  defendingChampions: {
    singlesMen?: string;
    singlesWomen?: string;
    singles?: string;
  };
  city: string;
  country: string;
  flag: string;
  venue: string;
  description?: string;
}

export interface RankingsEntry {
  rank: number;
  previousRank: number;
  points: number;
  playerId: string;
  tournamentsPlayed: number;
}

export interface LiveFeedItem {
  id: string;
  title: string;
  summary: string;
  category: FeedCategory;
  severity: FeedSeverity;
  timestamp: string;
  source: string;
  url?: string;
  playerIds?: string[];
  playerNames?: string[];
  tournamentId?: string;
  tournamentName?: string;
  isLive?: boolean;
  verified?: boolean;
  tags?: string[];
}

export interface ApiConfig {
  rapidApiKey?: string;
  apiTennisKey?: string;
  pollIntervalMs?: number;
  enabledFeeds?: string[];
  useMockFallback?: boolean;
  autoRefresh?: boolean;
}

export interface DrawCompetitor {
  id: string;
  name: string;
  countryCode: string;
  seed?: number;
  seedLabel?: string;
  avatarUrl?: string;
  sets: (number | string)[];
  isWinner: boolean;
}

export interface DrawMatchup {
  id: string;
  round: 'Quarterfinal' | 'Semifinal' | 'Final' | 'Championship Final';
  matchNumber: number;
  player1: DrawCompetitor;
  player2: DrawCompetitor;
  scoreDisplay: string;
  status: 'Final' | 'Live' | 'Scheduled';
  court?: string;
  date?: string;
}

export interface TournamentDraw {
  id: string;
  tournamentId: string;
  tournamentName: string;
  edition: string;
  year: number;
  tour: Tour;
  surface: Surface;
  surfaceSpeed?: string;
  venue: string;
  quarterfinals: DrawMatchup[];
  semifinals: DrawMatchup[];
  final: DrawMatchup;
}

export interface DrawSetScore {
  games: number;
  tiebreak?: number;
}

export interface TreeCompetitor {
  id?: string;
  name: string;
  shortName?: string;
  countryCode: string;
  flag?: string;
  seed?: number;
  seedLabel?: string;
  avatarUrl?: string;
  scores: (string | DrawSetScore)[];
  isWinner: boolean;
}

export interface TreeMatch {
  id: string;
  roundIndex: number;
  player1: TreeCompetitor;
  player2: TreeCompetitor;
  winner?: 'player1' | 'player2';
}

export interface BracketRoundHeader {
  title: string;
  prizeMoney: string;
}

export interface FullTournamentBracket {
  id: string;
  name: string;
  year: number;
  tour: Tour;
  surface: Surface;
  venue: string;
  champion?: {
    name: string;
    prizeMoney: string;
    seedLabel?: string;
    countryCode: string;
  };
  rounds: BracketRoundHeader[];
  matchesByRound: TreeMatch[][];
}
