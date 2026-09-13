// Profile hydration and search service for ATP & WTA Top 500 players
import { Player, PlayerRankSummary, PlayerInjury, Tour, Hand } from '../types/tennis';
import { INITIAL_PLAYERS } from '../data/playersData';
import { RANKINGS_TOP_500_ATP } from '../data/rankingsTop500ATP';
import { RANKINGS_TOP_500_WTA } from '../data/rankingsTop500WTA';
import { MOCK_LIVE_FEED_ITEMS } from '../data/mockLiveFeedData';

// Curated active injuries mapped to player IDs
const KNOWN_INJURIES: Record<string, PlayerInjury> = {
  'carlos-alcaraz': {
    type: 'Right Forearm Muscular Pronator Strain',
    status: 'Recovering',
    returnEstimate: '10-14 days',
    details: 'Pronator strain in hitting forearm undergoing targeted physiotherapy in Murcia.',
    severity: 'high',
    reportedDate: '2026-05-02',
  },
  'novak-djokovic': {
    type: 'Right Medial Meniscus Post-Op Care',
    status: 'Recovering',
    returnEstimate: 'Cleared for court training',
    details: 'Underwent minor arthroscopic intervention; mobility tests showing strong progress.',
    severity: 'medium',
    reportedDate: '2026-06-12',
  },
  'elena-rybakina': {
    type: 'Acute Gastrointestinal Viral Illness',
    status: 'Day-to-day',
    returnEstimate: '3-5 days',
    details: 'Withdrew under doctor orders due to severe dehydration and low electrolyte balance.',
    severity: 'high',
    reportedDate: '2026-03-08',
  },
  'holger-rune': {
    type: 'Dominant Right Wrist Tendon Irritation',
    status: 'Day-to-day',
    returnEstimate: '5 days',
    details: 'Scans revealed minor sheath inflammation with no structural ligament tear.',
    severity: 'low',
    reportedDate: '2026-04-16',
  },
  'jannik-sinner': {
    type: 'Right Hip Joint Soreness',
    status: 'Recovering',
    returnEstimate: 'Active management',
    details: 'Preventative joint decompression therapy and load management with physiotherapist.',
    severity: 'medium',
    reportedDate: '2026-05-18',
  },
  'ons-jabeur': {
    type: 'Chronic Patellar Knee Tendon Rehab',
    status: 'Out for Season',
    returnEstimate: '6-8 weeks',
    details: 'Undergoing regenerative platelet-rich plasma (PRP) therapy and strength rebuilding.',
    severity: 'high',
    reportedDate: '2026-07-28',
  },
  'jack-draper': {
    type: 'Intercostal Abdominal Strain',
    status: 'Day-to-day',
    returnEstimate: '1 week',
    details: 'Mild abdominal wall pull experienced during grass-court service follow-through.',
    severity: 'medium',
    reportedDate: '2026-06-20',
  },
  'paula-badosa': {
    type: 'Lumbar Vertebral Bone Edema Recovery',
    status: 'Cleared',
    returnEstimate: 'Fully cleared',
    details: 'Spine stress response resolved after rest protocol and physical reconditioning.',
    severity: 'low',
    reportedDate: '2026-02-14',
  },
  'madison-keys': {
    type: 'Left Hamstring Grade 1 Strain',
    status: 'Recovering',
    returnEstimate: '2-3 weeks',
    details: 'Hamstring tweak suffered during Wimbledon warmup sprint drills.',
    severity: 'high',
    reportedDate: '2026-07-04',
  },
  'daniil-medvedev': {
    type: 'Adductor Muscle Tightening',
    status: 'Day-to-day',
    returnEstimate: '4-6 days',
    details: 'Withdrew as precaution before Rome quarterfinal to avoid groin muscle pull.',
    severity: 'medium',
    reportedDate: '2026-05-15',
  },
  'matteo-berrettini': {
    type: 'Abdominal Oblique Recurrence',
    status: 'Recovering',
    returnEstimate: '2 weeks',
    details: 'Re-aggravation of abdominal muscle wall requiring ultrasound monitoring.',
    severity: 'high',
    reportedDate: '2026-06-18',
  },
};

// High quality avatar pools
const ATP_AVATARS = [
  'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80',
];

const WTA_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80',
];

// Helper string hash
function stringHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

// Generate realistic prize money string
function calculatePrizeMoney(rank: number, age: number, _tour: Tour, titles: number): string {
  let baseMillion = 0;
  if (rank <= 3) baseMillion = 28 + titles * 1.5;
  else if (rank <= 10) baseMillion = 14 + titles * 1.2;
  else if (rank <= 30) baseMillion = 6 + titles * 0.8;
  else if (rank <= 100) baseMillion = 2.2 + (age - 18) * 0.3;
  else if (rank <= 250) baseMillion = 0.8 + (age - 18) * 0.1;
  else baseMillion = 0.25 + (age - 18) * 0.04;

  const totalUsd = Math.round(baseMillion * 1000000);
  return '$' + totalUsd.toLocaleString();
}

export class PlayerService {
  private initialPlayersMap: Map<string, Player> = new Map();
  private atpRankingsMap: Map<string, PlayerRankSummary> = new Map();
  private wtaRankingsMap: Map<string, PlayerRankSummary> = new Map();

  constructor() {
    INITIAL_PLAYERS.forEach((p) => {
      this.initialPlayersMap.set(p.id, p);
      this.initialPlayersMap.set(p.name.toLowerCase(), p);
    });

    RANKINGS_TOP_500_ATP.forEach((p) => {
      this.atpRankingsMap.set(p.id, p);
      this.atpRankingsMap.set(p.name.toLowerCase(), p);
    });

    RANKINGS_TOP_500_WTA.forEach((p) => {
      this.wtaRankingsMap.set(p.id, p);
      this.wtaRankingsMap.set(p.name.toLowerCase(), p);
    });
  }

  // Get active injury info for a player
  public getInjuryStatus(playerId: string, playerName?: string): PlayerInjury | null {
    if (KNOWN_INJURIES[playerId]) {
      return KNOWN_INJURIES[playerId];
    }

    // Check live feed items for real-time injury mentions
    const feedMention = MOCK_LIVE_FEED_ITEMS.find(
      (item) =>
        (item.category === 'injury' || item.category === 'withdrawal') &&
        (item.playerIds?.includes(playerId) ||
          (playerName && item.playerNames?.some((n) => n.toLowerCase() === playerName.toLowerCase())))
    );

    if (feedMention) {
      return {
        type: feedMention.title,
        status: feedMention.category === 'withdrawal' ? 'Day-to-day' : 'Recovering',
        details: feedMention.summary,
        severity: feedMention.severity,
        reportedDate: feedMention.timestamp.split('T')[0],
      };
    }

    return null;
  }

  // Hydrate a full Player profile from PlayerRankSummary
  public hydratePlayer(summary: PlayerRankSummary): Player {
    // If we have a comprehensive hand-crafted profile in INITIAL_PLAYERS, return that with updated rankings & injury
    const existing = this.initialPlayersMap.get(summary.id) || this.initialPlayersMap.get(summary.name.toLowerCase());
    const injury = this.getInjuryStatus(summary.id, summary.name);

    if (existing) {
      return {
        ...existing,
        currentRank: summary.rank,
        points: summary.points,
        movement: summary.movement,
        tournamentsPlayed: summary.tournamentsPlayed,
        activeInjury: injury,
      };
    }

    const hash = stringHash(summary.id + summary.name);
    const isATP = summary.tour === 'ATP';
    const birthYear = 2026 - summary.age;
    const birthMonth = String((hash % 12) + 1).padStart(2, '0');
    const birthDay = String((hash % 27) + 1).padStart(2, '0');
    const birthDate = `${birthYear}-${birthMonth}-${birthDay}`;

    const turnedPro = Math.max(2005, birthYear + 16 + (hash % 3));
    const heightCm = isATP ? 180 + (hash % 18) : 168 + (hash % 16);

    const hands: Hand[] = [
      'Right-handed (two-handed backhand)',
      'Right-handed (two-handed backhand)',
      'Right-handed (two-handed backhand)',
      'Right-handed (one-handed backhand)',
      'Left-handed (two-handed backhand)',
    ];
    const plays = hands[hash % hands.length];

    const careerHighRank =
      summary.rank === 1
        ? 1
        : Math.max(1, Math.min(summary.rank, Math.round(summary.rank * 0.78 - (hash % 8))));

    const careerTitles = summary.careerTitles || (summary.rank <= 50 ? (hash % 3) : 0);
    const winPercentage = summary.winPercentage || Math.max(45, Math.min(80, 78 - summary.rank * 0.08));

    const totalWins = summary.wins || Math.round(summary.tournamentsPlayed * (summary.rank <= 50 ? 25 : 12) * (winPercentage / 100));
    const totalLosses = summary.losses || Math.round(totalWins * ((100 - winPercentage) / winPercentage));

    const hardWins = Math.round(totalWins * 0.58);
    const hardLosses = Math.round(totalLosses * 0.56);
    const clayWins = Math.round(totalWins * 0.3);
    const clayLosses = Math.round(totalLosses * 0.32);
    const grassWins = Math.max(0, totalWins - hardWins - clayWins);
    const grassLosses = Math.max(0, totalLosses - hardLosses - clayLosses);

    const avatarPool = isATP ? ATP_AVATARS : WTA_AVATARS;
    const avatarUrl = avatarPool[hash % avatarPool.length];

    // Peer rivalries
    const peers = isATP ? RANKINGS_TOP_500_ATP : RANKINGS_TOP_500_WTA;
    const nearbyPeers = peers
      .filter((p) => Math.abs(p.rank - summary.rank) <= 6 && p.id !== summary.id)
      .slice(0, 3)
      .map((p) => p.name);

    const playStyles = [
      'Aggressive baseline counter-puncher with explosive crosscourt backhand angles.',
      'Big-serving offensive all-court player with heavy top-spin forehand delivery.',
      'Tactical baseline strategist relying on heavy court coverage, depth, and sudden drop shots.',
      'Power baseline hitter with rapid first-strike groundstrokes and high first-serve percentage.',
      'Dynamic rhythm disruptor with sharp transition volleys and consistent passing shots.',
    ];
    const playStyle = playStyles[hash % playStyles.length];

    const bio = `${summary.name} represents ${summary.country} on the ${summary.tour} Tour. Currently ranked World No. ${summary.rank} with a career-high ranking of No. ${careerHighRank}. Having turned pro in ${turnedPro}, ${summary.name.split(' ')[0]} has competed in ${summary.tournamentsPlayed} tournaments this season with ${careerTitles} career title${careerTitles === 1 ? '' : 's'}.`;

    return {
      id: summary.id,
      name: summary.name,
      tour: summary.tour,
      country: summary.country,
      countryCode: summary.countryCode,
      flag: summary.flag,
      age: summary.age,
      birthDate,
      birthPlace: `${summary.country}`,
      heightCm,
      turnedPro,
      plays,
      currentRank: summary.rank,
      careerHighRank,
      careerTitles,
      grandSlams: 0,
      slamBreakdown: {
        australianOpen: 0,
        rolandGarros: 0,
        wimbledon: 0,
        usOpen: 0,
      },
      prizeMoneyUsd: calculatePrizeMoney(summary.rank, summary.age, summary.tour, careerTitles),
      careerWinLoss: {
        wins: totalWins,
        losses: totalLosses,
        winPercentage,
      },
      surfaceStats: {
        hard: {
          wins: hardWins,
          losses: hardLosses,
          winPercentage: Number(((hardWins / (hardWins + hardLosses || 1)) * 100).toFixed(1)),
        },
        clay: {
          wins: clayWins,
          losses: clayLosses,
          winPercentage: Number(((clayWins / (clayWins + clayLosses || 1)) * 100).toFixed(1)),
        },
        grass: {
          wins: grassWins,
          losses: grassLosses,
          winPercentage: Number(((grassWins / (grassWins + grassLosses || 1)) * 100).toFixed(1)),
        },
      },
      avatarUrl,
      bio,
      playStyle,
      notableRivalries: nearbyPeers.length > 0 ? nearbyPeers : ['Carlos Alcaraz', 'Jannik Sinner'],
      activeInjury: injury,
      points: summary.points,
      movement: summary.movement,
      tournamentsPlayed: summary.tournamentsPlayed,
    };
  }

  // Find player by ID across all Top 500 ATP, WTA, and Initial datasets
  public getPlayerById(id: string): Player | null {
    const atpSummary = this.atpRankingsMap.get(id);
    if (atpSummary) return this.hydratePlayer(atpSummary);

    const wtaSummary = this.wtaRankingsMap.get(id);
    if (wtaSummary) return this.hydratePlayer(wtaSummary);

    const initial = this.initialPlayersMap.get(id);
    if (initial) {
      return {
        ...initial,
        activeInjury: this.getInjuryStatus(initial.id, initial.name),
      };
    }

    return null;
  }

  // Find player by full or partial name
  public getPlayerByName(name: string): Player | null {
    const clean = name.trim().toLowerCase();
    const atpSummary = this.atpRankingsMap.get(clean);
    if (atpSummary) return this.hydratePlayer(atpSummary);

    const wtaSummary = this.wtaRankingsMap.get(clean);
    if (wtaSummary) return this.hydratePlayer(wtaSummary);

    const initial = this.initialPlayersMap.get(clean);
    if (initial) {
      return {
        ...initial,
        activeInjury: this.getInjuryStatus(initial.id, initial.name),
      };
    }

    return null;
  }

  // Get full rankings summaries by tour
  public getRankings(tour: Tour): PlayerRankSummary[] {
    return tour === 'ATP' ? RANKINGS_TOP_500_ATP : RANKINGS_TOP_500_WTA;
  }

  // Fast search across all 1000 ATP + WTA players
  public searchPlayers(query: string, tour: Tour | 'ALL' = 'ALL', limit = 50): PlayerRankSummary[] {
    const q = query.trim().toLowerCase();
    let pool: PlayerRankSummary[] = [];

    if (tour === 'ATP') pool = RANKINGS_TOP_500_ATP;
    else if (tour === 'WTA') pool = RANKINGS_TOP_500_WTA;
    else pool = [...RANKINGS_TOP_500_ATP, ...RANKINGS_TOP_500_WTA];

    if (!q) {
      return pool.slice(0, limit);
    }

    return pool
      .filter((p) => p.name.toLowerCase().includes(q) || p.country.toLowerCase().includes(q) || p.countryCode.toLowerCase().includes(q))
      .slice(0, limit);
  }
}

export const playerService = new PlayerService();
export default playerService;
