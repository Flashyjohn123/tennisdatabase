import { Match } from '../types/tennis';

export const INITIAL_MATCHES: Match[] = [
  {
    id: 'paris-2024-olympic-final',
    tournamentId: 'olympics-paris-2024',
    tournamentName: 'Paris 2024 Olympic Games',
    year: 2024,
    round: 'Gold Medal Final',
    surface: 'Clay',
    player1Id: 'novak-djokovic',
    player1Name: 'Novak Djokovic',
    player2Id: 'carlos-alcaraz',
    player2Name: 'Carlos Alcaraz',
    winnerId: 'novak-djokovic',
    score: '7-6(3), 7-6(2)',
    headline: 'Djokovic completes Career Golden Slam with masterclass tiebreak display over Alcaraz',
    highlights: 'In one of the highest quality Olympic finals in tennis history on Court Philippe-Chatrier, Djokovic fended off 8 break points and played two flawless tiebreaks to capture his elusive Olympic Gold Medal.',
    stats: {
      aces: [6, 4],
      doubleFaults: [2, 1],
      firstServePercentage: [68, 64],
      breakPointsWon: ['0/6', '0/8'],
      unforcedErrors: [25, 33],
      totalPointsWon: [91, 84],
      matchDurationMinutes: 170,
    },
  },
  {
    id: 'rg-2024-sf',
    tournamentId: 'roland-garros',
    tournamentName: 'Roland Garros 2024',
    year: 2024,
    round: 'Semifinal',
    surface: 'Clay',
    player1Id: 'carlos-alcaraz',
    player1Name: 'Carlos Alcaraz',
    player2Id: 'jannik-sinner',
    player2Name: 'Jannik Sinner',
    winnerId: 'carlos-alcaraz',
    score: '2-6, 6-3, 3-6, 6-4, 6-3',
    headline: 'Alcaraz outlasts Sinner in 4-hour 5-set clay court battle of the new titans',
    highlights: 'A grueling 4-hour and 9-minute physical war on Court Philippe-Chatrier. Alcaraz found extra gear in sets 4 and 5 with sensational drop shots and clutch baseline winners to reach his first Roland Garros final.',
    stats: {
      aces: [8, 7],
      doubleFaults: [7, 8],
      firstServePercentage: [62, 58],
      breakPointsWon: ['6/14', '6/15'],
      unforcedErrors: [58, 64],
      totalPointsWon: [145, 147],
      matchDurationMinutes: 249,
    },
  },
  {
    id: 'madrid-2024-final',
    tournamentId: 'madrid-open',
    tournamentName: 'Mutua Madrid Open 2024',
    year: 2024,
    round: 'Final',
    surface: 'Clay',
    player1Id: 'iga-swiatek',
    player1Name: 'Iga Świątek',
    player2Id: 'aryna-sabalenka',
    player2Name: 'Aryna Sabalenka',
    winnerId: 'iga-swiatek',
    score: '7-5, 4-6, 7-6(7)',
    headline: 'Swiatek saves 3 championship points in instant classic clay final against Sabalenka',
    highlights: 'A 3-hour, 11-minute WTA blockbuster hailed as one of the greatest women finals of the century. Swiatek saved 3 championship points in a breathtaking 16-point deciding tiebreak to capture Madrid.',
    stats: {
      aces: [2, 4],
      doubleFaults: [3, 4],
      firstServePercentage: [69, 65],
      breakPointsWon: ['4/11', '4/12'],
      unforcedErrors: [34, 42],
      totalPointsWon: [122, 120],
      matchDurationMinutes: 191,
    },
  },
  {
    id: 'wimbledon-2023-final',
    tournamentId: 'wimbledon',
    tournamentName: 'Wimbledon 2023',
    year: 2023,
    round: 'Final',
    surface: 'Grass',
    player1Id: 'carlos-alcaraz',
    player1Name: 'Carlos Alcaraz',
    player2Id: 'novak-djokovic',
    player2Name: 'Novak Djokovic',
    winnerId: 'carlos-alcaraz',
    score: '1-6, 7-6(6), 6-1, 3-6, 6-4',
    headline: 'Alcaraz dethrones Djokovic in 5-set historic Wimbledon thriller',
    highlights: 'A 4-hour, 42-minute Centre Court epic that ended Djokovic 34-match Wimbledon winning streak. Alcaraz showed unmatched courage on championship point.',
    stats: {
      aces: [9, 2],
      doubleFaults: [7, 3],
      firstServePercentage: [66, 64],
      breakPointsWon: ['5/19', '5/15'],
      unforcedErrors: [45, 40],
      totalPointsWon: [168, 166],
      matchDurationMinutes: 282,
    },
  },
  {
    id: 'ao-2024-final',
    tournamentId: 'australian-open',
    tournamentName: 'Australian Open 2024',
    year: 2024,
    round: 'Final',
    surface: 'Hard',
    player1Id: 'jannik-sinner',
    player1Name: 'Jannik Sinner',
    player2Id: 'daniil-medvedev',
    player2Name: 'Daniil Medvedev',
    winnerId: 'jannik-sinner',
    score: '3-6, 3-6, 6-4, 6-4, 6-3',
    headline: 'Sinner stages legendary comeback from 2 sets down to lift Australian Open crown',
    highlights: 'Sinner rallied back after Medvedev charged out with hyper-aggressive tactics in sets 1 and 2, showcasing immense stamina, laser serving, and icy composure.',
    stats: {
      aces: [14, 11],
      doubleFaults: [3, 5],
      firstServePercentage: [62, 61],
      breakPointsWon: ['4/9', '4/12'],
      unforcedErrors: [31, 57],
      totalPointsWon: [142, 141],
      matchDurationMinutes: 224,
    },
  },
  {
    id: 'us-open-2023-final-women',
    tournamentId: 'us-open',
    tournamentName: 'US Open 2023',
    year: 2023,
    round: 'Final',
    surface: 'Hard',
    player1Id: 'coco-gauff',
    player1Name: 'Coco Gauff',
    player2Id: 'aryna-sabalenka',
    player2Name: 'Aryna Sabalenka',
    winnerId: 'coco-gauff',
    score: '2-6, 6-3, 6-2',
    headline: 'Coco Gauff clinches maiden Grand Slam title at Arthur Ashe Stadium',
    highlights: 'Gauff absorbed Sabalenka ferocious firepower in the opening set before turning the tide with superhuman defense and crowd momentum.',
    stats: {
      aces: [2, 4],
      doubleFaults: [4, 6],
      firstServePercentage: [63, 51],
      breakPointsWon: ['6/9', '4/10'],
      unforcedErrors: [19, 46],
      totalPointsWon: [83, 75],
      matchDurationMinutes: 126,
    },
  },
  {
    id: 'french-open-2024-final',
    tournamentId: 'roland-garros',
    tournamentName: 'Roland Garros 2024',
    year: 2024,
    round: 'Final',
    surface: 'Clay',
    player1Id: 'carlos-alcaraz',
    player1Name: 'Carlos Alcaraz',
    player2Id: 'alexander-zverev',
    player2Name: 'Alexander Zverev',
    winnerId: 'carlos-alcaraz',
    score: '6-3, 2-6, 5-7, 6-1, 6-2',
    headline: 'Alcaraz survives 5-set duel against Zverev to conquer Roland Garros',
    highlights: 'Alcaraz became the youngest man in history to win Grand Slam singles titles on all three surfaces (Hard, Grass, and Clay).',
    stats: {
      aces: [6, 8],
      doubleFaults: [6, 6],
      firstServePercentage: [60, 73],
      breakPointsWon: ['9/24', '6/23'],
      unforcedErrors: [56, 41],
      totalPointsWon: [154, 139],
      matchDurationMinutes: 259,
    },
  },
  {
    id: 'us-open-2024-final',
    tournamentId: 'us-open',
    tournamentName: 'US Open 2024',
    year: 2024,
    round: 'Final',
    surface: 'Hard',
    player1Id: 'jannik-sinner',
    player1Name: 'Jannik Sinner',
    player2Id: 'taylor-fritz',
    player2Name: 'Taylor Fritz',
    winnerId: 'jannik-sinner',
    score: '6-3, 6-4, 7-5',
    headline: 'Sinner silences Arthur Ashe Stadium to capture second Grand Slam title of 2024',
    highlights: 'Flawless baseline and serving performance from Sinner, hitting 88% first-serve win rate and zero double faults in the final against America\'s Taylor Fritz.',
    stats: {
      aces: [12, 7],
      doubleFaults: [1, 4],
      firstServePercentage: [68, 59],
      breakPointsWon: ['6/12', '2/7'],
      unforcedErrors: [21, 34],
      totalPointsWon: [102, 85],
      matchDurationMinutes: 136,
    },
  },
  {
    id: 'us-open-2024-final-women',
    tournamentId: 'us-open',
    tournamentName: 'US Open 2024',
    year: 2024,
    round: 'Final',
    surface: 'Hard',
    player1Id: 'aryna-sabalenka',
    player1Name: 'Aryna Sabalenka',
    player2Id: 'jessica-pegula',
    player2Name: 'Jessica Pegula',
    winnerId: 'aryna-sabalenka',
    score: '7-5, 7-5',
    headline: 'Sabalenka conquers New York crowd to capture maiden US Open title',
    highlights: 'Overcoming home-favorite Jessica Pegula in two fiercely competitive sets, Sabalenka used blistering baseline power to hit 40 winners and lift her first US Open trophy.',
    stats: {
      aces: [6, 4],
      doubleFaults: [5, 2],
      firstServePercentage: [62, 60],
      breakPointsWon: ['6/15', '4/7'],
      unforcedErrors: [34, 22],
      totalPointsWon: [88, 77],
      matchDurationMinutes: 113,
    },
  },
  {
    id: 'us-open-2025-final',
    tournamentId: 'us-open',
    tournamentName: 'US Open 2025',
    year: 2025,
    round: 'Final',
    surface: 'Hard',
    player1Id: 'carlos-alcaraz',
    player1Name: 'Carlos Alcaraz',
    player2Id: 'jannik-sinner',
    player2Name: 'Jannik Sinner',
    winnerId: 'carlos-alcaraz',
    score: '6-2, 3-6, 6-1, 6-4',
    headline: 'Alcaraz dethrones defending champion Sinner to claim second US Open and sixth major title',
    highlights: 'In a 2-hour 42-minute high-octane masterclass on Arthur Ashe Stadium, Alcaraz struck 42 winners, fired 10 aces with zero double faults, and reclaimed World No. 1.',
    stats: {
      aces: [10, 2],
      doubleFaults: [0, 4],
      firstServePercentage: [61, 48],
      breakPointsWon: ['5/11', '1/1'],
      unforcedErrors: [24, 28],
      totalPointsWon: [112, 89],
      matchDurationMinutes: 162,
    },
  },
  {
    id: 'us-open-2025-final-women',
    tournamentId: 'us-open',
    tournamentName: 'US Open 2025',
    year: 2025,
    round: 'Final',
    surface: 'Hard',
    player1Id: 'aryna-sabalenka',
    player1Name: 'Aryna Sabalenka',
    player2Id: 'amanda-anisimova',
    player2Name: 'Amanda Anisimova',
    winnerId: 'aryna-sabalenka',
    score: '6-3, 7-6(3)',
    headline: 'Sabalenka defends US Open crown in straight-sets triumph over Anisimova',
    highlights: 'Sabalenka became the first woman to achieve back-to-back US Open titles since 2014, navigating heavy baseline exchanges and winning the decisive second-set tiebreak.',
    stats: {
      aces: [1, 4],
      doubleFaults: [2, 7],
      firstServePercentage: [65, 58],
      breakPointsWon: ['5/6', '4/7'],
      unforcedErrors: [15, 29],
      totalPointsWon: [76, 59],
      matchDurationMinutes: 94,
    },
  },
  {
  "id": "laver-cup-2024-alcaraz-fritz",
  "tournamentId": "laver-cup-2024",
  "tournamentName": "Laver Cup Berlin 2024",
  "year": 2024,
  "round": "Singles Match 12 (Decider)",
  "surface": "Hard",
  "player1Id": "carlos-alcaraz",
  "player1Name": "Carlos Alcaraz",
  "player2Id": "taylor-fritz",
  "player2Name": "Taylor Fritz",
  "winnerId": "carlos-alcaraz",
  "score": "6-2, 7-5",
  "headline": "Alcaraz clinches Laver Cup title for Team Europe over Fritz",
  "highlights": "In the winner-takes-all final match of the 2024 Laver Cup at Uber Arena in Berlin, Alcaraz displayed electrifying shotmaking, firing 22 winners and converting four break points against America top star Taylor Fritz to seal victory for Team Europe.",
  "stats": {
    "aces": [
      4,
      7
    ],
    "doubleFaults": [
      1,
      2
    ],
    "firstServePercentage": [
      68,
      62
    ],
    "breakPointsWon": [
      "4/7",
      "1/2"
    ],
    "unforcedErrors": [
      16,
      24
    ],
    "totalPointsWon": [
      71,
      54
    ],
    "matchDurationMinutes": 89
  }
},
  {
  "id": "miami-2023-alcaraz-fritz",
  "tournamentId": "miami-open",
  "tournamentName": "Miami Open presented by Itau 2023",
  "year": 2023,
  "round": "Quarterfinal",
  "surface": "Hard",
  "player1Id": "carlos-alcaraz",
  "player1Name": "Carlos Alcaraz",
  "player2Id": "taylor-fritz",
  "player2Name": "Taylor Fritz",
  "winnerId": "carlos-alcaraz",
  "score": "6-4, 6-2",
  "headline": "Alcaraz dominates Fritz in straight sets to reach Miami semifinals",
  "highlights": "Under the lights at Hard Rock Stadium, defending champion Carlos Alcaraz neutralized Fritz powerful serve with aggressive return positioning and precision drop shots, conceding only six games in a 78-minute clinic.",
  "stats": {
    "aces": [
      3,
      5
    ],
    "doubleFaults": [
      1,
      3
    ],
    "firstServePercentage": [
      72,
      59
    ],
    "breakPointsWon": [
      "3/5",
      "0/2"
    ],
    "unforcedErrors": [
      14,
      26
    ],
    "totalPointsWon": [
      63,
      45
    ],
    "matchDurationMinutes": 78
  }
},
  {
  "id": "cincinnati-2024-sf-sinner-zverev",
  "tournamentId": "cincinnati-open",
  "tournamentName": "Cincinnati Open 2024",
  "year": 2024,
  "round": "Semifinal",
  "surface": "Hard",
  "player1Id": "jannik-sinner",
  "player1Name": "Jannik Sinner",
  "player2Id": "alexander-zverev",
  "player2Name": "Alexander Zverev",
  "winnerId": "jannik-sinner",
  "score": "7-6(9), 5-7, 7-6(4)",
  "headline": "Sinner conquers Zverev in 3-hour epic deciding tiebreak",
  "highlights": "World No. 1 Jannik Sinner snapped a four-match losing streak against Alexander Zverev in an extraordinary 3-hour and 7-minute clash in Ohio, saving two set points in the opening tiebreak and holding his nerve in the final-set breaker.",
  "stats": {
    "aces": [
      12,
      15
    ],
    "doubleFaults": [
      3,
      4
    ],
    "firstServePercentage": [
      66,
      74
    ],
    "breakPointsWon": [
      "2/8",
      "3/9"
    ],
    "unforcedErrors": [
      36,
      40
    ],
    "totalPointsWon": [
      129,
      126
    ],
    "matchDurationMinutes": 187
  }
},
  {
  "id": "atp-finals-2024-sf-fritz-zverev",
  "tournamentId": "nitto-atp-finals",
  "tournamentName": "Nitto ATP Finals 2024",
  "year": 2024,
  "round": "Semifinal",
  "surface": "Hard",
  "player1Id": "taylor-fritz",
  "player1Name": "Taylor Fritz",
  "player2Id": "alexander-zverev",
  "player2Name": "Alexander Zverev",
  "winnerId": "taylor-fritz",
  "score": "6-3, 3-6, 7-6(3)",
  "headline": "Fritz edges Zverev in third-set tiebreak to reach historic ATP Finals championship match",
  "highlights": "Taylor Fritz produced a masterclass in high-pressure serving in Turin, fending off three break points in the decider before dominating the tiebreak 7-3 to earn his fourth consecutive victory over World No. 2 Alexander Zverev.",
  "stats": {
    "aces": [
      15,
      12
    ],
    "doubleFaults": [
      2,
      1
    ],
    "firstServePercentage": [
      70,
      75
    ],
    "breakPointsWon": [
      "1/3",
      "1/4"
    ],
    "unforcedErrors": [
      21,
      25
    ],
    "totalPointsWon": [
      97,
      92
    ],
    "matchDurationMinutes": 141
  }
},
  {
  "id": "shanghai-2024-final-sinner-djokovic",
  "tournamentId": "rolex-shanghai-masters",
  "tournamentName": "Rolex Shanghai Masters 2024",
  "year": 2024,
  "round": "Final",
  "surface": "Hard",
  "player1Id": "jannik-sinner",
  "player1Name": "Jannik Sinner",
  "player2Id": "novak-djokovic",
  "player2Name": "Novak Djokovic",
  "winnerId": "jannik-sinner",
  "score": "7-6(4), 6-3",
  "headline": "Sinner denies Djokovic 100th career title with flawless serving in Shanghai",
  "highlights": "Jannik Sinner did not face a single break point against the 24-time major champion on Stadium Court, unleashing 22 winners and controlling the baseline rallies to claim his third Masters 1000 crown of 2024.",
  "stats": {
    "aces": [
      8,
      4
    ],
    "doubleFaults": [
      1,
      0
    ],
    "firstServePercentage": [
      71,
      67
    ],
    "breakPointsWon": [
      "1/2",
      "0/0"
    ],
    "unforcedErrors": [
      17,
      23
    ],
    "totalPointsWon": [
      67,
      54
    ],
    "matchDurationMinutes": 97
  }
},
  {
  "id": "wimbledon-2024-sf-alcaraz-medvedev",
  "tournamentId": "wimbledon",
  "tournamentName": "The Championships, Wimbledon 2024",
  "year": 2024,
  "round": "Semifinal",
  "surface": "Grass",
  "player1Id": "carlos-alcaraz",
  "player1Name": "Carlos Alcaraz",
  "player2Id": "daniil-medvedev",
  "player2Name": "Daniil Medvedev",
  "winnerId": "carlos-alcaraz",
  "score": "6-7(1), 6-3, 6-4, 6-4",
  "headline": "Alcaraz overcomes Medvedev in 4 sets to book Wimbledon final return",
  "highlights": "Defending champion Carlos Alcaraz regrouped after dropping a tense opening-set tiebreak, dismantling Medvedev deep baseline defense with exquisite drop volleys, crosscourt forehand angles, and 55 total winners.",
  "stats": {
    "aces": [
      6,
      5
    ],
    "doubleFaults": [
      6,
      4
    ],
    "firstServePercentage": [
      64,
      61
    ],
    "breakPointsWon": [
      "6/15",
      "3/7"
    ],
    "unforcedErrors": [
      37,
      34
    ],
    "totalPointsWon": [
      142,
      126
    ],
    "matchDurationMinutes": 175
  }
},
  {
  "id": "ao-2024-sf-sabalenka-gauff",
  "tournamentId": "australian-open",
  "tournamentName": "Australian Open 2024",
  "year": 2024,
  "round": "Semifinal",
  "surface": "Hard",
  "player1Id": "aryna-sabalenka",
  "player1Name": "Aryna Sabalenka",
  "player2Id": "coco-gauff",
  "player2Name": "Coco Gauff",
  "winnerId": "aryna-sabalenka",
  "score": "7-6(2), 6-4",
  "headline": "Sabalenka avenges US Open defeat with clutch straight-sets win over Gauff",
  "highlights": "In a heavyweight battle of power and defense on Rod Laver Arena, Aryna Sabalenka fired 33 winners and dominated the first-set tiebreak before serving out the match in 1 hour 42 minutes on her path to back-to-back Australian Open titles.",
  "stats": {
    "aces": [
      4,
      3
    ],
    "doubleFaults": [
      4,
      8
    ],
    "firstServePercentage": [
      68,
      59
    ],
    "breakPointsWon": [
      "4/10",
      "3/4"
    ],
    "unforcedErrors": [
      28,
      24
    ],
    "totalPointsWon": [
      82,
      70
    ],
    "matchDurationMinutes": 102
  }
},
  {
  "id": "rg-2024-sf-swiatek-gauff",
  "tournamentId": "roland-garros",
  "tournamentName": "Roland Garros 2024",
  "year": 2024,
  "round": "Semifinal",
  "surface": "Clay",
  "player1Id": "iga-swiatek",
  "player1Name": "Iga Swiatek",
  "player2Id": "coco-gauff",
  "player2Name": "Coco Gauff",
  "winnerId": "iga-swiatek",
  "score": "6-2, 6-4",
  "headline": "Swiatek commands Court Philippe-Chatrier to defeat Gauff and advance to final",
  "highlights": "Three-time champion Iga Swiatek extended her dominance on Parisian clay, hitting heavy topspin forehands to control baseline tempo and securing her 20th consecutive match win at Roland Garros.",
  "stats": {
    "aces": [
      0,
      3
    ],
    "doubleFaults": [
      0,
      4
    ],
    "firstServePercentage": [
      67,
      56
    ],
    "breakPointsWon": [
      "4/7",
      "1/2"
    ],
    "unforcedErrors": [
      14,
      39
    ],
    "totalPointsWon": [
      65,
      48
    ],
    "matchDurationMinutes": 97
  }
},
  {
  "id": "ao-2024-final-sabalenka-zheng",
  "tournamentId": "australian-open",
  "tournamentName": "Australian Open 2024",
  "year": 2024,
  "round": "Final",
  "surface": "Hard",
  "player1Id": "aryna-sabalenka",
  "player1Name": "Aryna Sabalenka",
  "player2Id": "zheng-qinwen",
  "player2Name": "Zheng Qinwen",
  "winnerId": "aryna-sabalenka",
  "score": "6-3, 6-2",
  "headline": "Sabalenka cruises past Zheng to successfully defend Australian Open crown",
  "highlights": "Sabalenka completed a flawless tournament without dropping a single set across seven rounds, producing 14 aces and unreturnable serves to defeat China Olympic star Zheng Qinwen in 76 minutes.",
  "stats": {
    "aces": [
      3,
      6
    ],
    "doubleFaults": [
      0,
      3
    ],
    "firstServePercentage": [
      67,
      53
    ],
    "breakPointsWon": [
      "3/6",
      "0/4"
    ],
    "unforcedErrors": [
      14,
      16
    ],
    "totalPointsWon": [
      63,
      44
    ],
    "matchDurationMinutes": 76
  }
},
  {
  "id": "atp-finals-2024-sinner-medvedev",
  "tournamentId": "nitto-atp-finals",
  "tournamentName": "Nitto ATP Finals 2024",
  "year": 2024,
  "round": "Round Robin",
  "surface": "Hard",
  "player1Id": "jannik-sinner",
  "player1Name": "Jannik Sinner",
  "player2Id": "daniil-medvedev",
  "player2Name": "Daniil Medvedev",
  "winnerId": "jannik-sinner",
  "score": "6-3, 6-4",
  "headline": "Sinner powers past Medvedev in straight sets before home crowd in Turin",
  "highlights": "Cheered on by a passionate Italian crowd at Inalpi Arena, Sinner neutralized Medvedev defensive counter-punching with penetrating baseline drives, losing just 8 points behind his first serve.",
  "stats": {
    "aces": [
      7,
      6
    ],
    "doubleFaults": [
      1,
      2
    ],
    "firstServePercentage": [
      69,
      63
    ],
    "breakPointsWon": [
      "2/5",
      "0/2"
    ],
    "unforcedErrors": [
      19,
      27
    ],
    "totalPointsWon": [
      65,
      49
    ],
    "matchDurationMinutes": 73
  }
},
  {
  "id": "cincinnati-2024-sf-sabalenka-swiatek",
  "tournamentId": "cincinnati-open",
  "tournamentName": "Cincinnati Open 2024",
  "year": 2024,
  "round": "Semifinal",
  "surface": "Hard",
  "player1Id": "aryna-sabalenka",
  "player1Name": "Aryna Sabalenka",
  "player2Id": "iga-swiatek",
  "player2Name": "Iga Swiatek",
  "winnerId": "aryna-sabalenka",
  "score": "6-3, 6-3",
  "headline": "Sabalenka powers past World No. 1 Swiatek in Cincinnati semifinal clinic",
  "highlights": "Aryna Sabalenka delivered one of her sharpest performances of the summer hard-court swing, overpowering Swiatek with 37 winners and saving multiple break points in key deuce games to reach the Cincinnati final.",
  "stats": {
    "aces": [
      5,
      2
    ],
    "doubleFaults": [
      3,
      4
    ],
    "firstServePercentage": [
      67,
      64
    ],
    "breakPointsWon": [
      "5/16",
      "2/4"
    ],
    "unforcedErrors": [
      22,
      28
    ],
    "totalPointsWon": [
      79,
      62
    ],
    "matchDurationMinutes": 107
  }
},
  {
  "id": "us-open-2024-sf-sinner-draper",
  "tournamentId": "us-open",
  "tournamentName": "US Open 2024",
  "year": 2024,
  "round": "Semifinal",
  "surface": "Hard",
  "player1Id": "jannik-sinner",
  "player1Name": "Jannik Sinner",
  "player2Id": "jack-draper",
  "player2Name": "Jack Draper",
  "winnerId": "jannik-sinner",
  "score": "7-5, 7-6(3), 6-2",
  "headline": "Sinner battles past Draper in physical Arthur Ashe semifinal",
  "highlights": "In high humidity in New York, Sinner withstood a valiant challenge from close friend Jack Draper, recovering from an awkward wrist fall to win a critical second-set tiebreak before cruising through the third set.",
  "stats": {
    "aces": [
      11,
      8
    ],
    "doubleFaults": [
      2,
      10
    ],
    "firstServePercentage": [
      68,
      52
    ],
    "breakPointsWon": [
      "4/11",
      "1/4"
    ],
    "unforcedErrors": [
      34,
      43
    ],
    "totalPointsWon": [
      118,
      96
    ],
    "matchDurationMinutes": 184
  }
},
  {
  "id": "brisbane-2024-final-rybakina-sabalenka",
  "tournamentId": "brisbane-international",
  "tournamentName": "Brisbane International 2024",
  "year": 2024,
  "round": "Final",
  "surface": "Hard",
  "player1Id": "elena-rybakina",
  "player1Name": "Elena Rybakina",
  "player2Id": "aryna-sabalenka",
  "player2Name": "Aryna Sabalenka",
  "winnerId": "elena-rybakina",
  "score": "6-0, 6-3",
  "headline": "Rybakina sweeps Sabalenka to capture Brisbane title in commanding fashion",
  "highlights": "Elena Rybakina produced an awe-inspiring display on Pat Rafter Arena, winning the first eight games of the match with blistering baseline accuracy and 7 aces to capture her sixth career WTA title.",
  "stats": {
    "aces": [
      7,
      2
    ],
    "doubleFaults": [
      1,
      3
    ],
    "firstServePercentage": [
      74,
      58
    ],
    "breakPointsWon": [
      "5/7",
      "0/3"
    ],
    "unforcedErrors": [
      10,
      24
    ],
    "totalPointsWon": [
      58,
      33
    ],
    "matchDurationMinutes": 73
  }
}
];

export default INITIAL_MATCHES;
