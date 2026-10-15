import { Player } from '../types/tennis';

export const INITIAL_PLAYERS: Player[] = [
  {
    "id": "jannik-sinner",
    "name": "Jannik Sinner",
    "tour": "ATP",
    "country": "Italy",
    "countryCode": "ITA",
    "flag": "🇮🇹",
    "age": 25,
    "birthDate": "2001-08-16",
    "birthPlace": "San Candido, Italy",
    "heightCm": 191,
    "turnedPro": 2018,
    "plays": "Right-handed (two-handed backhand)",
    "currentRank": 1,
    "careerHighRank": 1,
    "careerTitles": 18,
    "grandSlams": 3,
    "slamFinals": 3,
    "slamBreakdown": {
      "australianOpen": 1,
      "rolandGarros": 0,
      "wimbledon": 1,
      "usOpen": 1
    },
    "prizeMoneyUsd": "$43,500,000",
    "careerWinLoss": {
      "wins": 334,
      "losses": 79,
      "winPercentage": 80.9
    },
    "surfaceStats": {
      "hard": {
        "wins": 225,
        "losses": 48,
        "winPercentage": 82.5
      },
      "clay": {
        "wins": 68,
        "losses": 21,
        "winPercentage": 76.5
      },
      "grass": {
        "wins": 41,
        "losses": 10,
        "winPercentage": 78
      }
    },
    "avatarUrl": "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&auto=format&fit=crop&q=80",
    "bio": "Reigning World No. 1 and three-time Grand Slam champion (Australian Open 2024, US Open 2024, and Wimbledon 2026). Known for his ferocious baseline timing, devastating crosscourt forehands, and icy temperament in pressure moments.",
    "playStyle": "Explosive baseline first-strike aggressor with pinpoint timing and elite court coverage.",
    "notableRivalries": [
      "Carlos Alcaraz",
      "Daniil Medvedev",
      "Alexander Zverev",
      "Novak Djokovic"
    ],
    "points": 11000,
    "movement": 0,
    "tournamentsPlayed": 17
  },
  {
    "id": "carlos-alcaraz",
    "name": "Carlos Alcaraz",
    "tour": "ATP",
    "country": "Spain",
    "countryCode": "ESP",
    "flag": "🇪🇸",
    "age": 23,
    "birthDate": "2003-05-05",
    "birthPlace": "El Palmar, Murcia, Spain",
    "heightCm": 183,
    "turnedPro": 2018,
    "plays": "Right-handed (two-handed backhand)",
    "currentRank": 3,
    "careerHighRank": 1,
    "careerTitles": 18,
    "grandSlams": 5,
    "slamFinals": 5,
    "slamBreakdown": {
      "australianOpen": 1,
      "rolandGarros": 1,
      "wimbledon": 2,
      "usOpen": 1
    },
    "prizeMoneyUsd": "$45,200,000",
    "careerWinLoss": {
      "wins": 388,
      "losses": 92,
      "winPercentage": 80.8
    },
    "surfaceStats": {
      "hard": {
        "wins": 175,
        "losses": 40,
        "winPercentage": 81.5
      },
      "clay": {
        "wins": 132,
        "losses": 28,
        "winPercentage": 82.5
      },
      "grass": {
        "wins": 38,
        "losses": 12,
        "winPercentage": 76
      }
    },
    "avatarUrl": "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=800&auto=format&fit=crop&q=80",
    "bio": "Five-time Grand Slam champion across all three surfaces. By capturing the 2026 Australian Open alongside Roland Garros, Wimbledon, and the US Open, Alcaraz became the youngest man in tennis history to achieve the Career Grand Slam.",
    "playStyle": "Dynamic all-court shotmaker combining thunderous groundstrokes with delicate disguised drop shots.",
    "notableRivalries": [
      "Jannik Sinner",
      "Novak Djokovic",
      "Alexander Zverev"
    ],
    "points": 5560,
    "movement": 0,
    "tournamentsPlayed": 17
  },
  {
    "id": "alexander-zverev",
    "name": "Alexander Zverev",
    "tour": "ATP",
    "country": "Germany",
    "countryCode": "GER",
    "flag": "🇩🇪",
    "age": 29,
    "birthDate": "1997-04-20",
    "birthPlace": "Hamburg, Germany",
    "heightCm": 198,
    "turnedPro": 2013,
    "plays": "Right-handed (two-handed backhand)",
    "currentRank": 2,
    "careerHighRank": 1,
    "careerTitles": 24,
    "grandSlams": 2,
    "slamFinals": 4,
    "slamBreakdown": {
      "australianOpen": 0,
      "rolandGarros": 1,
      "wimbledon": 0,
      "usOpen": 1
    },
    "prizeMoneyUsd": "$49,800,000",
    "careerWinLoss": {
      "wins": 485,
      "losses": 198,
      "winPercentage": 71
    },
    "surfaceStats": {
      "hard": {
        "wins": 298,
        "losses": 125,
        "winPercentage": 70.5
      },
      "clay": {
        "wins": 152,
        "losses": 48,
        "winPercentage": 76
      },
      "grass": {
        "wins": 35,
        "losses": 25,
        "winPercentage": 62
      }
    },
    "avatarUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80",
    "bio": "Two-time Grand Slam champion in 2026 (Roland Garros and US Open) and Olympic Gold medalist. Towering competitor anchored by a world-class backhand and massive first serve delivery.",
    "playStyle": "Big-serving defensive baseline powerhouse with lethal backhand down-the-line accuracy.",
    "notableRivalries": [
      "Carlos Alcaraz",
      "Daniil Medvedev",
      "Jannik Sinner"
    ],
    "points": 9720,
    "movement": 0,
    "tournamentsPlayed": 20
  },
  {
    "id": "novak-djokovic",
    "name": "Novak Djokovic",
    "tour": "ATP",
    "country": "Serbia",
    "countryCode": "SRB",
    "flag": "🇷🇸",
    "age": 39,
    "birthDate": "1987-05-22",
    "birthPlace": "Belgrade, Serbia",
    "heightCm": 188,
    "turnedPro": 2003,
    "plays": "Right-handed (two-handed backhand)",
    "currentRank": 8,
    "careerHighRank": 1,
    "careerTitles": 100,
    "grandSlams": 24,
    "slamFinals": 37,
    "slamBreakdown": {
      "australianOpen": 10,
      "rolandGarros": 3,
      "wimbledon": 7,
      "usOpen": 4
    },
    "prizeMoneyUsd": "$187,500,000",
    "careerWinLoss": {
      "wins": 1132,
      "losses": 225,
      "winPercentage": 83.4
    },
    "surfaceStats": {
      "hard": {
        "wins": 715,
        "losses": 132,
        "winPercentage": 84.4
      },
      "clay": {
        "wins": 286,
        "losses": 70,
        "winPercentage": 80.3
      },
      "grass": {
        "wins": 131,
        "losses": 23,
        "winPercentage": 85.7
      }
    },
    "avatarUrl": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80",
    "bio": "All-time men's record holder with 24 Grand Slam singles titles and Career Golden Slam achiever. Reached his milestone 100th career ATP title with his China Open victory in autumn 2026.",
    "playStyle": "Master strategist and greatest returner in tennis history, combining surgical depth and elastic defensive range.",
    "notableRivalries": [
      "Carlos Alcaraz",
      "Jannik Sinner",
      "Rafael Nadal",
      "Roger Federer"
    ],
    "points": 3480,
    "movement": 3,
    "tournamentsPlayed": 16
  },
  {
    "id": "ben-shelton",
    "name": "Ben Shelton",
    "tour": "ATP",
    "country": "United States",
    "countryCode": "USA",
    "flag": "🇺🇸",
    "age": 24,
    "birthDate": "2002-10-09",
    "birthPlace": "Atlanta, Georgia, USA",
    "heightCm": 193,
    "turnedPro": 2022,
    "plays": "Left-handed (two-handed backhand)",
    "currentRank": 4,
    "careerHighRank": 4,
    "careerTitles": 4,
    "grandSlams": 0,
    "slamFinals": 1,
    "slamBreakdown": {
      "australianOpen": 0,
      "rolandGarros": 0,
      "wimbledon": 0,
      "usOpen": 0
    },
    "prizeMoneyUsd": "$8,900,000",
    "careerWinLoss": {
      "wins": 105,
      "losses": 62,
      "winPercentage": 62.9
    },
    "surfaceStats": {
      "hard": {
        "wins": 76,
        "losses": 39,
        "winPercentage": 66
      },
      "clay": {
        "wins": 18,
        "losses": 14,
        "winPercentage": 56.5
      },
      "grass": {
        "wins": 11,
        "losses": 9,
        "winPercentage": 54
      }
    },
    "avatarUrl": "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=80",
    "bio": "Explosive American left-hander with an artillery 145+ mph serve. Reached the 2026 US Open final on Arthur Ashe Stadium and captured two ATP 500 crowns in Dallas and Munich.",
    "playStyle": "Ultra-athletic southpaw powerhouse with booming kick serves and heavy forehand rotation.",
    "notableRivalries": [
      "Frances Tiafoe",
      "Carlos Alcaraz",
      "Alexander Zverev"
    ],
    "points": 4680,
    "movement": 0,
    "tournamentsPlayed": 22
  },
  {
    "id": "daniil-medvedev",
    "name": "Daniil Medvedev",
    "tour": "ATP",
    "country": "International",
    "countryCode": "INT",
    "flag": "🏳️",
    "age": 30,
    "birthDate": "1996-02-11",
    "birthPlace": "Moscow, Russia",
    "heightCm": 198,
    "turnedPro": 2014,
    "plays": "Right-handed (two-handed backhand)",
    "currentRank": 6,
    "careerHighRank": 1,
    "careerTitles": 21,
    "grandSlams": 1,
    "slamFinals": 6,
    "slamBreakdown": {
      "australianOpen": 0,
      "rolandGarros": 0,
      "wimbledon": 0,
      "usOpen": 1
    },
    "prizeMoneyUsd": "$44,100,000",
    "careerWinLoss": {
      "wins": 395,
      "losses": 160,
      "winPercentage": 71.2
    },
    "surfaceStats": {
      "hard": {
        "wins": 312,
        "losses": 101,
        "winPercentage": 75.5
      },
      "clay": {
        "wins": 44,
        "losses": 36,
        "winPercentage": 55
      },
      "grass": {
        "wins": 39,
        "losses": 23,
        "winPercentage": 65
      }
    },
    "avatarUrl": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=80",
    "bio": "2021 US Open champion and six-time Grand Slam finalist. Celebrated tactical mastermind known as 'The Octopus' for his impenetrable backcourt court coverage and flat baseline strikes.",
    "playStyle": "Unorthodox counterpunching brick wall with deep return positioning and flat impenetrable rallies.",
    "notableRivalries": [
      "Jannik Sinner",
      "Alexander Zverev",
      "Stefanos Tsitsipas"
    ],
    "points": 3860,
    "movement": 0,
    "tournamentsPlayed": 24
  },
  {
    "id": "alex-de-minaur",
    "name": "Alex de Minaur",
    "tour": "ATP",
    "country": "Australia",
    "countryCode": "AUS",
    "flag": "🇦🇺",
    "age": 27,
    "birthDate": "1999-02-17",
    "birthPlace": "Sydney, Australia",
    "heightCm": 183,
    "turnedPro": 2015,
    "plays": "Right-handed (two-handed backhand)",
    "currentRank": 9,
    "careerHighRank": 6,
    "careerTitles": 10,
    "grandSlams": 0,
    "slamFinals": 0,
    "slamBreakdown": {
      "australianOpen": 0,
      "rolandGarros": 0,
      "wimbledon": 0,
      "usOpen": 0
    },
    "prizeMoneyUsd": "$17,500,000",
    "careerWinLoss": {
      "wins": 265,
      "losses": 152,
      "winPercentage": 63.5
    },
    "surfaceStats": {
      "hard": {
        "wins": 185,
        "losses": 98,
        "winPercentage": 65.4
      },
      "clay": {
        "wins": 42,
        "losses": 34,
        "winPercentage": 55.3
      },
      "grass": {
        "wins": 38,
        "losses": 20,
        "winPercentage": 65.5
      }
    },
    "avatarUrl": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=80",
    "bio": "The 'Demon' is widely regarded as the fastest mover in professional tennis, possessing relentless court retrieval and a 2026 Rotterdam 500 championship.",
    "playStyle": "High-octane defensive scrambler with elite counterpunching speed and transition redirection.",
    "notableRivalries": [
      "Taylor Fritz",
      "Stefanos Tsitsipas"
    ],
    "points": 3430,
    "movement": 1,
    "tournamentsPlayed": 24
  },
  {
    "id": "taylor-fritz",
    "name": "Taylor Fritz",
    "tour": "ATP",
    "country": "United States",
    "countryCode": "USA",
    "flag": "🇺🇸",
    "age": 28,
    "birthDate": "1997-10-28",
    "birthPlace": "Rancho Santa Fe, California, USA",
    "heightCm": 196,
    "turnedPro": 2015,
    "plays": "Right-handed (two-handed backhand)",
    "currentRank": 12,
    "careerHighRank": 4,
    "careerTitles": 9,
    "grandSlams": 0,
    "slamFinals": 1,
    "slamBreakdown": {
      "australianOpen": 0,
      "rolandGarros": 0,
      "wimbledon": 0,
      "usOpen": 0
    },
    "prizeMoneyUsd": "$21,400,000",
    "careerWinLoss": {
      "wins": 302,
      "losses": 175,
      "winPercentage": 63.3
    },
    "surfaceStats": {
      "hard": {
        "wins": 218,
        "losses": 115,
        "winPercentage": 65.5
      },
      "clay": {
        "wins": 45,
        "losses": 38,
        "winPercentage": 54.2
      },
      "grass": {
        "wins": 39,
        "losses": 22,
        "winPercentage": 63.9
      }
    },
    "avatarUrl": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=800&auto=format&fit=crop&q=80",
    "bio": "American No. 1 leader and 2024 US Open finalist. Elite server backed by flat, penetrating forehands and a 2026 Washington DC title.",
    "playStyle": "Offensive big-serve baseline aggressor dictating pace through first-strike depth.",
    "notableRivalries": [
      "Ben Shelton",
      "Tommy Paul",
      "Alexander Zverev"
    ],
    "points": 2880,
    "movement": 0,
    "tournamentsPlayed": 22
  },
  {
    "id": "tommy-paul",
    "name": "Tommy Paul",
    "tour": "ATP",
    "country": "United States",
    "countryCode": "USA",
    "flag": "🇺🇸",
    "age": 29,
    "birthDate": "1997-05-17",
    "birthPlace": "Voorhees Township, New Jersey, USA",
    "heightCm": 185,
    "turnedPro": 2015,
    "plays": "Right-handed (two-handed backhand)",
    "currentRank": 18,
    "careerHighRank": 12,
    "careerTitles": 4,
    "grandSlams": 0,
    "slamFinals": 0,
    "slamBreakdown": {
      "australianOpen": 0,
      "rolandGarros": 0,
      "wimbledon": 0,
      "usOpen": 0
    },
    "prizeMoneyUsd": "$13,200,000",
    "careerWinLoss": {
      "wins": 188,
      "losses": 128,
      "winPercentage": 59.5
    },
    "surfaceStats": {
      "hard": {
        "wins": 128,
        "losses": 82,
        "winPercentage": 61
      },
      "clay": {
        "wins": 34,
        "losses": 28,
        "winPercentage": 54.8
      },
      "grass": {
        "wins": 26,
        "losses": 18,
        "winPercentage": 59.1
      }
    },
    "avatarUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80",
    "bio": "Fluid all-court American competitor celebrated for razor-sharp transition net volleys and his 2026 Houston clay crown.",
    "playStyle": "Creative all-court mover with soft hands at net and sudden forehand angle changes.",
    "notableRivalries": [
      "Taylor Fritz",
      "Ben Shelton"
    ],
    "points": 2375,
    "movement": 0,
    "tournamentsPlayed": 22
  },
  {
    "id": "elena-rybakina",
    "name": "Elena Rybakina",
    "tour": "WTA",
    "country": "Kazakhstan",
    "countryCode": "KAZ",
    "flag": "🇰🇿",
    "age": 27,
    "birthDate": "1999-06-17",
    "birthPlace": "Moscow, Russia",
    "heightCm": 184,
    "turnedPro": 2016,
    "plays": "Right-handed (two-handed backhand)",
    "currentRank": 1,
    "careerHighRank": 1,
    "careerTitles": 10,
    "grandSlams": 2,
    "slamFinals": 3,
    "slamBreakdown": {
      "australianOpen": 1,
      "rolandGarros": 0,
      "wimbledon": 1,
      "usOpen": 0
    },
    "prizeMoneyUsd": "$22,800,000",
    "careerWinLoss": {
      "wins": 335,
      "losses": 145,
      "winPercentage": 69.8
    },
    "surfaceStats": {
      "hard": {
        "wins": 218,
        "losses": 93,
        "winPercentage": 70.1
      },
      "clay": {
        "wins": 68,
        "losses": 28,
        "winPercentage": 70.8
      },
      "grass": {
        "wins": 49,
        "losses": 15,
        "winPercentage": 76.6
      }
    },
    "avatarUrl": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80",
    "bio": "Reigning WTA World No. 1 and two-time Grand Slam champion (Wimbledon 2022, Australian Open 2026). The Tour's undisputed ace leader with unreturnable flat deliveries.",
    "playStyle": "Uncompromising power baseline dominator with the highest ace conversion rate on tour.",
    "notableRivalries": [
      "Aryna Sabalenka",
      "Iga Świątek",
      "Coco Gauff"
    ],
    "points": 9696,
    "movement": 0,
    "tournamentsPlayed": 18
  },
  {
    "id": "aryna-sabalenka",
    "name": "Aryna Sabalenka",
    "tour": "WTA",
    "country": "International",
    "countryCode": "INT",
    "flag": "🏳️",
    "age": 28,
    "birthDate": "1998-05-05",
    "birthPlace": "Minsk, Belarus",
    "heightCm": 182,
    "turnedPro": 2015,
    "plays": "Right-handed (two-handed backhand)",
    "currentRank": 2,
    "careerHighRank": 1,
    "careerTitles": 18,
    "grandSlams": 4,
    "slamFinals": 5,
    "slamBreakdown": {
      "australianOpen": 2,
      "rolandGarros": 0,
      "wimbledon": 0,
      "usOpen": 2
    },
    "prizeMoneyUsd": "$34,500,000",
    "careerWinLoss": {
      "wins": 452,
      "losses": 192,
      "winPercentage": 70.2
    },
    "surfaceStats": {
      "hard": {
        "wins": 320,
        "losses": 121,
        "winPercentage": 72.6
      },
      "clay": {
        "wins": 88,
        "losses": 44,
        "winPercentage": 66.7
      },
      "grass": {
        "wins": 44,
        "losses": 27,
        "winPercentage": 62
      }
    },
    "avatarUrl": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80",
    "bio": "Four-time Grand Slam champion (Australian Open 2023, 2024; US Open 2024, 2026). Known as 'The Tiger' for her intense competitive fire and ferocious baseline pace.",
    "playStyle": "Maximum-velocity power hitter with unmatched ball speed off both forehand and backhand wings.",
    "notableRivalries": [
      "Elena Rybakina",
      "Iga Świątek",
      "Coco Gauff",
      "Zheng Qinwen"
    ],
    "points": 7550,
    "movement": 0,
    "tournamentsPlayed": 16
  },
  {
    "id": "mirra-andreeva",
    "name": "Mirra Andreeva",
    "tour": "WTA",
    "country": "International",
    "countryCode": "INT",
    "flag": "🏳️",
    "age": 19,
    "birthDate": "2007-04-29",
    "birthPlace": "Krasnoyarsk, Russia",
    "heightCm": 175,
    "turnedPro": 2022,
    "plays": "Right-handed (two-handed backhand)",
    "currentRank": 3,
    "careerHighRank": 3,
    "careerTitles": 2,
    "grandSlams": 0,
    "slamFinals": 0,
    "slamBreakdown": {
      "australianOpen": 0,
      "rolandGarros": 0,
      "wimbledon": 0,
      "usOpen": 0
    },
    "prizeMoneyUsd": "$5,600,000",
    "careerWinLoss": {
      "wins": 82,
      "losses": 35,
      "winPercentage": 70.1
    },
    "surfaceStats": {
      "hard": {
        "wins": 52,
        "losses": 22,
        "winPercentage": 70.3
      },
      "clay": {
        "wins": 24,
        "losses": 9,
        "winPercentage": 72.7
      },
      "grass": {
        "wins": 6,
        "losses": 4,
        "winPercentage": 60
      }
    },
    "avatarUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80",
    "bio": "Teenage sensation who ascended to World No. 3 in autumn 2026 following her historic final run at the China Open in Beijing. Possesses uncanny court vision and tactical composure well beyond her years.",
    "playStyle": "Precocious counterpunching prodigy with rapid redirection and instinctive defensive court senses.",
    "notableRivalries": [
      "Zheng Qinwen",
      "Coco Gauff",
      "Aryna Sabalenka"
    ],
    "points": 6371,
    "movement": 2,
    "tournamentsPlayed": 18
  },
  {
    "id": "jessica-pegula",
    "name": "Jessica Pegula",
    "tour": "WTA",
    "country": "United States",
    "countryCode": "USA",
    "flag": "🇺🇸",
    "age": 32,
    "birthDate": "1994-02-24",
    "birthPlace": "Buffalo, New York, USA",
    "heightCm": 170,
    "turnedPro": 2009,
    "plays": "Right-handed (two-handed backhand)",
    "currentRank": 4,
    "careerHighRank": 3,
    "careerTitles": 6,
    "grandSlams": 0,
    "slamFinals": 1,
    "slamBreakdown": {
      "australianOpen": 0,
      "rolandGarros": 0,
      "wimbledon": 0,
      "usOpen": 0
    },
    "prizeMoneyUsd": "$18,200,000",
    "careerWinLoss": {
      "wins": 305,
      "losses": 162,
      "winPercentage": 65.3
    },
    "surfaceStats": {
      "hard": {
        "wins": 228,
        "losses": 110,
        "winPercentage": 67.5
      },
      "clay": {
        "wins": 48,
        "losses": 34,
        "winPercentage": 58.5
      },
      "grass": {
        "wins": 29,
        "losses": 18,
        "winPercentage": 61.7
      }
    },
    "avatarUrl": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80",
    "bio": "American leader and 2024 US Open finalist. Renowned for surgical flat groundstrokes that take the ball early on the rise.",
    "playStyle": "Precision flat-ball striker taking balls on the rise with textbook shot depth.",
    "notableRivalries": [
      "Coco Gauff",
      "Iga Świątek",
      "Aryna Sabalenka"
    ],
    "points": 6225,
    "movement": 0,
    "tournamentsPlayed": 18
  },
  {
    "id": "coco-gauff",
    "name": "Coco Gauff",
    "tour": "WTA",
    "country": "United States",
    "countryCode": "USA",
    "flag": "🇺🇸",
    "age": 22,
    "birthDate": "2004-03-13",
    "birthPlace": "Delray Beach, Florida, USA",
    "heightCm": 175,
    "turnedPro": 2018,
    "plays": "Right-handed (two-handed backhand)",
    "currentRank": 5,
    "careerHighRank": 2,
    "careerTitles": 9,
    "grandSlams": 1,
    "slamFinals": 3,
    "slamBreakdown": {
      "australianOpen": 0,
      "rolandGarros": 0,
      "wimbledon": 0,
      "usOpen": 1
    },
    "prizeMoneyUsd": "$21,500,000",
    "careerWinLoss": {
      "wins": 255,
      "losses": 108,
      "winPercentage": 70.2
    },
    "surfaceStats": {
      "hard": {
        "wins": 178,
        "losses": 68,
        "winPercentage": 72.4
      },
      "clay": {
        "wins": 55,
        "losses": 25,
        "winPercentage": 68.8
      },
      "grass": {
        "wins": 22,
        "losses": 15,
        "winPercentage": 59.5
      }
    },
    "avatarUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80",
    "bio": "2023 US Open champion and 2024 WTA Finals victor. Elite speed and defensive reach anchored by one of the premier two-handed backhands in the sport.",
    "playStyle": "Electric baseline athlete with lightning-fast court coverage and relentless defensive counter-striking.",
    "notableRivalries": [
      "Iga Świątek",
      "Aryna Sabalenka",
      "Jessica Pegula"
    ],
    "points": 5974,
    "movement": 0,
    "tournamentsPlayed": 17
  },
  {
    "id": "iga-swiatek",
    "name": "Iga Świątek",
    "tour": "WTA",
    "country": "Poland",
    "countryCode": "POL",
    "flag": "🇵🇱",
    "age": 25,
    "birthDate": "2001-05-31",
    "birthPlace": "Warsaw, Poland",
    "heightCm": 176,
    "turnedPro": 2016,
    "plays": "Right-handed (two-handed backhand)",
    "currentRank": 9,
    "careerHighRank": 1,
    "careerTitles": 23,
    "grandSlams": 5,
    "slamFinals": 5,
    "slamBreakdown": {
      "australianOpen": 0,
      "rolandGarros": 4,
      "wimbledon": 0,
      "usOpen": 1
    },
    "prizeMoneyUsd": "$33,800,000",
    "careerWinLoss": {
      "wins": 388,
      "losses": 82,
      "winPercentage": 82.6
    },
    "surfaceStats": {
      "hard": {
        "wins": 215,
        "losses": 52,
        "winPercentage": 80.5
      },
      "clay": {
        "wins": 142,
        "losses": 18,
        "winPercentage": 88.8
      },
      "grass": {
        "wins": 31,
        "losses": 12,
        "winPercentage": 72.1
      }
    },
    "avatarUrl": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80",
    "bio": "Five-time Grand Slam champion (four French Open crowns and 2022 US Open). Revered as the greatest clay-court master of her generation with unprecedented topspin rotation.",
    "playStyle": "Hyper-aggressive topspin baseline dictator with heavy court angles and explosive sliding recovery.",
    "notableRivalries": [
      "Aryna Sabalenka",
      "Elena Rybakina",
      "Coco Gauff"
    ],
    "points": 3999,
    "movement": 0,
    "tournamentsPlayed": 16
  },
  {
    "id": "zheng-qinwen",
    "name": "Zheng Qinwen",
    "tour": "WTA",
    "country": "China",
    "countryCode": "CHN",
    "flag": "🇨🇳",
    "age": 24,
    "birthDate": "2002-10-08",
    "birthPlace": "Shiyan, Hubei, China",
    "heightCm": 178,
    "turnedPro": 2018,
    "plays": "Right-handed (two-handed backhand)",
    "currentRank": 54,
    "careerHighRank": 7,
    "careerTitles": 5,
    "grandSlams": 0,
    "slamFinals": 1,
    "slamBreakdown": {
      "australianOpen": 0,
      "rolandGarros": 0,
      "wimbledon": 0,
      "usOpen": 0
    },
    "prizeMoneyUsd": "$9,400,000",
    "careerWinLoss": {
      "wins": 175,
      "losses": 80,
      "winPercentage": 68.6
    },
    "surfaceStats": {
      "hard": {
        "wins": 115,
        "losses": 54,
        "winPercentage": 68
      },
      "clay": {
        "wins": 48,
        "losses": 18,
        "winPercentage": 72.7
      },
      "grass": {
        "wins": 12,
        "losses": 8,
        "winPercentage": 60
      }
    },
    "avatarUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80",
    "bio": "Paris 2024 Olympic Gold medalist and 2024 Australian Open finalist. Captured the 2026 China Open title in Beijing in front of an electric home crowd.",
    "playStyle": "Power-serving aggressive baseliner with heavy topspin forehands and clutch point delivery.",
    "notableRivalries": [
      "Aryna Sabalenka",
      "Mirra Andreeva"
    ],
    "points": 885,
    "movement": 0,
    "tournamentsPlayed": 18
  }
];
