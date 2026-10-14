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
    "careerTitles": 20,
    "grandSlams": 4,
    "slamFinals": 5,
    "slamBreakdown": {
      "australianOpen": 2,
      "rolandGarros": 0,
      "wimbledon": 1,
      "usOpen": 1
    },
    "prizeMoneyUsd": "$42,000,000",
    "careerWinLoss": {
      "wins": 312,
      "losses": 76,
      "winPercentage": 80.4
    },
    "surfaceStats": {
      "hard": {
        "wins": 222,
        "losses": 48,
        "winPercentage": 82.2
      },
      "clay": {
        "wins": 60,
        "losses": 19,
        "winPercentage": 75.9
      },
      "grass": {
        "wins": 30,
        "losses": 9,
        "winPercentage": 76.9
      }
    },
    "avatarUrl": "/images/players/jannik-sinner.jpg",
    "bio": "As of September 20, 2026, World No. 1 Jannik Sinner holds 4 Grand Slam singles titles (Australian Open 2024, US Open 2024, Australian Open 2025, Wimbledon 2026) and 20 career titles. He successfully mounted a heroic run at Wimbledon 2026 to defeat Alexander Zverev in four sets for the Gentlemen's Singles trophy, before a right knee injury forced his withdrawal from the 2026 US Open.",
    "playStyle": "Heavy baseline power-striker with immense groundstroke velocity, deep penetrating flat ball flight, and laser precision on both wings.",
    "notableRivalries": [
      "Carlos Alcaraz",
      "Daniil Medvedev",
      "Alexander Zverev",
      "Taylor Fritz"
    ],
    "injuryHistory": [
      {
        "year": 2024,
        "injury": "Right Hip Inflammation",
        "durationOrTournament": "Mutua Madrid Open & Rome Masters",
        "details": "Withdrew prior to Madrid quarterfinal and skipped Rome to undergo targeted physiotherapy before Roland Garros.",
        "severity": "moderate",
        "status": "Resolved"
      },
      {
        "year": 2022,
        "injury": "Right Ankle Sprain",
        "durationOrTournament": "Sofia Open Semifinal",
        "details": "Sustained severe grade 2 ankle inversion against Rune, ending indoor campaign.",
        "severity": "moderate",
        "status": "Resolved"
      },
      {
        "year": 2022,
        "injury": "Left Knee Tendonitis",
        "durationOrTournament": "Roland Garros Fourth Round",
        "details": "Forced mid-match retirement against Andrey Rublev due to knee tracking pain.",
        "severity": "mild",
        "status": "Resolved"
      }
    ],
    "status": "active"
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
    "careerTitles": 19,
    "grandSlams": 5,
    "slamFinals": 5,
    "slamBreakdown": {
      "australianOpen": 1,
      "rolandGarros": 1,
      "wimbledon": 2,
      "usOpen": 1
    },
    "prizeMoneyUsd": "$41,500,000",
    "careerWinLoss": {
      "wins": 372,
      "losses": 88,
      "winPercentage": 80.9
    },
    "surfaceStats": {
      "hard": {
        "wins": 215,
        "losses": 50,
        "winPercentage": 81.1
      },
      "clay": {
        "wins": 118,
        "losses": 25,
        "winPercentage": 82.5
      },
      "grass": {
        "wins": 39,
        "losses": 13,
        "winPercentage": 75
      }
    },
    "avatarUrl": "/images/players/carlos-alcaraz.jpg",
    "bio": "As of September 20, 2026, Carlos Alcaraz is World No. 2 with 5 Grand Slam singles crowns (US Open 2022; Wimbledon 2023, 2024; Roland Garros 2024; Australian Open 2026) and 19 career titles. By defeating Novak Djokovic in four sets to capture the 2026 Australian Open, he became the youngest player in tennis history to complete the Career Grand Slam at age 22. A persistent wrist injury forced him out of Roland Garros and Wimbledon, before he reached the 2026 US Open quarterfinals in a legendary 3:33 AM five-set duel against Ben Shelton.",
    "playStyle": "Electrifying all-court aggressive game featuring blistering drop shots, supersonic foot speed, and an explosive inside-out forehand.",
    "notableRivalries": [
      "Jannik Sinner",
      "Novak Djokovic",
      "Daniil Medvedev",
      "Alexander Zverev"
    ],
    "injuryHistory": [
      {
        "year": 2024,
        "injury": "Right Forearm Pronator Strain",
        "durationOrTournament": "Monte-Carlo & Barcelona",
        "details": "Muscular edema in hitting forearm forced withdrawals from Monte-Carlo, Barcelona, and Rome.",
        "severity": "moderate",
        "status": "Resolved"
      },
      {
        "year": 2023,
        "injury": "Right Hamstring Muscle Tear",
        "durationOrTournament": "Australian Open Warmup",
        "details": "Sustained 4cm leg tear during pre-season practice match; forced withdrawal from Australian Open.",
        "severity": "severe",
        "status": "Resolved"
      },
      {
        "year": 2022,
        "injury": "Internal Oblique Abdominal Tear",
        "durationOrTournament": "Paris Masters Quarterfinal",
        "details": "Sustained abdominal wall tear serving against Rune; forced withdrawal from ATP Finals and Davis Cup.",
        "severity": "severe",
        "status": "Resolved"
      }
    ],
    "status": "active"
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
    "careerHighRank": 2,
    "careerTitles": 26,
    "grandSlams": 2,
    "slamFinals": 4,
    "slamBreakdown": {
      "australianOpen": 0,
      "rolandGarros": 1,
      "wimbledon": 0,
      "usOpen": 1
    },
    "prizeMoneyUsd": "$53,500,000",
    "careerWinLoss": {
      "wins": 464,
      "losses": 192,
      "winPercentage": 70.7
    },
    "surfaceStats": {
      "hard": {
        "wins": 277,
        "losses": 120,
        "winPercentage": 69.8
      },
      "clay": {
        "wins": 152,
        "losses": 50,
        "winPercentage": 75.2
      },
      "grass": {
        "wins": 35,
        "losses": 22,
        "winPercentage": 61.4
      }
    },
    "avatarUrl": "/images/players/alexander-zverev.jpg",
    "bio": "As of September 20, 2026, World No. 3 Alexander Zverev has achieved a historic Grand Slam double in 2026, capturing both the French Open (Roland Garros) and the US Open. He outlasted Italian star Flavio Cobolli in a dramatic five-set Court Philippe-Chatrier final to win his maiden major, then conquered Ben Shelton under the Arthur Ashe Stadium lights in four sets to secure his second Grand Slam crown. He now holds 26 career titles, the Tokyo Olympic Singles Gold Medal, and two ATP Finals trophies.",
    "playStyle": "Power baseliner with a devastating backhand down-the-line, imposing 140mph first serve, and elite court coverage.",
    "notableRivalries": [
      "Daniil Medvedev",
      "Carlos Alcaraz",
      "Stefanos Tsitsipas",
      "Casper Ruud"
    ],
    "injuryHistory": [
      {
        "year": 2022,
        "injury": "Multi-Ligament Ankle Tear",
        "durationOrTournament": "Roland Garros Semifinal",
        "details": "Suffered severe lateral ankle ligament rupture sliding on Court Philippe-Chatrier vs Nadal; required surgery and 7-month layoff.",
        "severity": "severe",
        "status": "Rehabilitated"
      },
      {
        "year": 2023,
        "injury": "Bone Edema",
        "durationOrTournament": "Australian Open & Spring Circuit",
        "details": "Persistent bone edema in right foot following ligament reconstructive surgery.",
        "severity": "moderate",
        "status": "Resolved"
      },
      {
        "year": 2024,
        "injury": "Knee Bone Bruise & Capsule Strain",
        "durationOrTournament": "Wimbledon Fourth Round",
        "details": "Hyper-extended knee following awkward slip against Norrie; played with heavy strapping.",
        "severity": "moderate",
        "status": "Resolved"
      }
    ],
    "status": "active"
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
    "currentRank": 11,
    "careerHighRank": 1,
    "careerTitles": 99,
    "grandSlams": 24,
    "slamBreakdown": {
      "australianOpen": 10,
      "rolandGarros": 3,
      "wimbledon": 7,
      "usOpen": 4
    },
    "prizeMoneyUsd": "$185,000,000",
    "careerWinLoss": {
      "wins": 1124,
      "losses": 222,
      "winPercentage": 83.5
    },
    "surfaceStats": {
      "hard": {
        "wins": 722,
        "losses": 133,
        "winPercentage": 84.4
      },
      "clay": {
        "wins": 282,
        "losses": 69,
        "winPercentage": 80.3
      },
      "grass": {
        "wins": 120,
        "losses": 20,
        "winPercentage": 85.7
      }
    },
    "avatarUrl": "/images/players/novak-djokovic.jpg",
    "bio": "As of September 20, 2026, 39-year-old Novak Djokovic is World No. 5 with an all-time record 24 Grand Slam titles, 99 career tour-level trophies, and the Olympic Gold Medal completing his Career Golden Slam. Reached his 13th Australian Open semifinal in 2026, proving his legendary competitive spirit endures.",
    "playStyle": "Impenetrable baseline counter-aggression, legendary return of serve, acrobatic flexibility, and unmatched clutch performance in pressure moments.",
    "notableRivalries": [
      "Carlos Alcaraz",
      "Jannik Sinner",
      "Daniil Medvedev",
      "Alexander Zverev"
    ],
    "injuryHistory": [
      {
        "year": 2024,
        "injury": "Right Medial Meniscus Tear",
        "durationOrTournament": "Roland Garros Fourth Round",
        "details": "Tore medial meniscus during 5-set duel vs Cerundolo; withdrew before QF, underwent Paris arthroscopy, and reached Wimbledon final 4 weeks later.",
        "severity": "severe",
        "status": "Cleared"
      },
      {
        "year": 2023,
        "injury": "Left Hamstring Tear (3cm)",
        "durationOrTournament": "Adelaide & Australian Open",
        "details": "Carried a 3cm hamstring tear throughout the tournament with daily hyperbaric and physio treatment to capture title.",
        "severity": "severe",
        "status": "Resolved"
      },
      {
        "year": 2021,
        "injury": "Abdominal Muscle Tear",
        "durationOrTournament": "Australian Open Third Round",
        "details": "Suffered oblique abdominal muscle tear vs Fritz; managed with medical taping to win 9th Australian Open title.",
        "severity": "moderate",
        "status": "Resolved"
      },
      {
        "year": 2017,
        "injury": "Chronic Right Elbow Tendonitis",
        "durationOrTournament": "Wimbledon Quarterfinal",
        "details": "Required 6-month hiatus and subsequent minor surgical cleanup in Switzerland in early 2018.",
        "severity": "severe",
        "status": "Rehabilitated"
      }
    ],
    "status": "active",
    "slamFinals": 37
  },
  {
    "id": "ben-shelton",
    "name": "Ben Shelton",
    "tour": "ATP",
    "country": "United States",
    "countryCode": "USA",
    "flag": "🇺🇸",
    "age": 23,
    "birthDate": "2002-10-09",
    "birthPlace": "Atlanta, Georgia, USA",
    "heightCm": 193,
    "turnedPro": 2022,
    "plays": "Left-handed (two-handed backhand)",
    "currentRank": 4,
    "careerHighRank": 4,
    "careerTitles": 2,
    "grandSlams": 0,
    "slamFinals": 1,
    "slamBreakdown": {
      "australianOpen": 0,
      "rolandGarros": 0,
      "wimbledon": 0,
      "usOpen": 0
    },
    "prizeMoneyUsd": "$7,800,000",
    "careerWinLoss": {
      "wins": 87,
      "losses": 53,
      "winPercentage": 62.1
    },
    "surfaceStats": {
      "hard": {
        "wins": 67,
        "losses": 36,
        "winPercentage": 65.0
      },
      "clay": {
        "wins": 12,
        "losses": 10,
        "winPercentage": 54.5
      },
      "grass": {
        "wins": 8,
        "losses": 7,
        "winPercentage": 53.3
      }
    },
    "avatarUrl": "/images/players/ben-shelton.jpg",
    "bio": "As of September 20, 2026, 23-year-old Ben Shelton holds 2 ATP titles and World No. 6 ranking. He staged an unforgettable run to the 2026 US Open final, outlasting Carlos Alcaraz in a historic 3:33 AM five-set quarterfinal thriller and defeating Frances Tiafoe in the semifinals, before finishing runner-up to Alexander Zverev under the Arthur Ashe Stadium lights.",
    "playStyle": "Ultra-explosive left-handed power serve with sharp swinging kick angles, destructive forehand winners, and fearless net approaches.",
    "notableRivalries": [
      "Novak Djokovic",
      "Frances Tiafoe",
      "Taylor Fritz",
      "Jannik Sinner"
    ],
    "injuryHistory": [
      {
        "year": 2023,
        "injury": "Left Hamstring Tightness",
        "durationOrTournament": "Wimbledon Second Round",
        "details": "Retained precautionary protection after slipping on outer grass courts against Djere.",
        "severity": "mild",
        "status": "Resolved"
      },
      {
        "year": 2024,
        "injury": "Right Shoulder Muscular Fatigue",
        "durationOrTournament": "European Clay Swing",
        "details": "High service load triggered rotator cuff soreness requiring load management.",
        "severity": "mild",
        "status": "Resolved"
      }
    ],
    "status": "active"
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
    "currentRank": 5,
    "careerHighRank": 1,
    "careerTitles": 20,
    "grandSlams": 1,
    "slamBreakdown": {
      "australianOpen": 0,
      "rolandGarros": 0,
      "wimbledon": 0,
      "usOpen": 1
    },
    "prizeMoneyUsd": "$44,500,000",
    "careerWinLoss": {
      "wins": 382,
      "losses": 154,
      "winPercentage": 71.3
    },
    "surfaceStats": {
      "hard": {
        "wins": 300,
        "losses": 98,
        "winPercentage": 75.4
      },
      "clay": {
        "wins": 38,
        "losses": 32,
        "winPercentage": 54.3
      },
      "grass": {
        "wins": 44,
        "losses": 24,
        "winPercentage": 64.7
      }
    },
    "avatarUrl": "/images/players/daniil-medvedev.jpg",
    "bio": "As of September 20, 2026, Daniil Medvedev is World No. 7 with 20 career titles, the 2021 US Open championship, and 6 Grand Slam final appearances. His deep court positioning, flat precision, and relentless defensive counterpunching remain hallmarks of the tour.",
    "playStyle": "Unorthodox tactical mastermind with low-skidding flat groundstrokes, extreme return depth, and extraordinary endurance.",
    "notableRivalries": [
      "Jannik Sinner",
      "Alexander Zverev",
      "Carlos Alcaraz",
      "Stefanos Tsitsipas"
    ],
    "injuryHistory": [
      {
        "year": 2024,
        "injury": "Right Adductor Muscle Pull",
        "durationOrTournament": "Mutua Madrid Open Quarterfinal",
        "details": "Felt sharp groin pull during opening set against Lehecka; retired to protect French Open campaign.",
        "severity": "moderate",
        "status": "Resolved"
      },
      {
        "year": 2022,
        "injury": "Inguinal Small Hernia",
        "durationOrTournament": "Miami Open",
        "details": "Underwent minor laparoscopic hernia repair; missed first two months of European clay swing.",
        "severity": "moderate",
        "status": "Rehabilitated"
      }
    ],
    "status": "active",
    "slamFinals": 6
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
    "currentRank": 8,
    "careerHighRank": 6,
    "careerTitles": 9,
    "grandSlams": 0,
    "slamBreakdown": {
      "australianOpen": 0,
      "rolandGarros": 0,
      "wimbledon": 0,
      "usOpen": 0
    },
    "prizeMoneyUsd": "$17,200,000",
    "careerWinLoss": {
      "wins": 250,
      "losses": 145,
      "winPercentage": 63.3
    },
    "surfaceStats": {
      "hard": {
        "wins": 175,
        "losses": 95,
        "winPercentage": 64.8
      },
      "clay": {
        "wins": 38,
        "losses": 30,
        "winPercentage": 55.9
      },
      "grass": {
        "wins": 37,
        "losses": 20,
        "winPercentage": 64.9
      }
    },
    "avatarUrl": "/images/players/alex-de-minaur.jpg",
    "bio": "As of September 20, 2026, Alex de Minaur sits at World No. 8 with 9 career titles. Nicknamed 'Demon' for his unmatched speed and defensive tenacity, the Australian reached major quarterfinals at Roland Garros and Wimbledon in 2026.",
    "playStyle": "Super-human foot speed, counter-punching recovery, and razor-sharp flat passing shots from anywhere on court.",
    "notableRivalries": [
      "Taylor Fritz",
      "Andrey Rublev",
      "Stefanos Tsitsipas",
      "Novak Djokovic"
    ],
    "injuryHistory": [
      {
        "year": 2024,
        "injury": "Hip Cartilage Avulsion Tear",
        "durationOrTournament": "Wimbledon Fourth Round",
        "details": "Suffered rare hip adductor fiber avulsion on match point against Fils; forced withdrawal from QF clash with Djokovic.",
        "severity": "severe",
        "status": "Rehabilitated"
      },
      {
        "year": 2020,
        "injury": "Abdominal Wall Tear",
        "durationOrTournament": "ATP Cup / Australian Open",
        "details": "Severe abdominal tear suffered during physical ATP Cup battles; missed home Grand Slam in Melbourne.",
        "severity": "severe",
        "status": "Resolved"
      }
    ],
    "status": "active"
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
    "currentRank": 9,
    "careerHighRank": 4,
    "careerTitles": 8,
    "grandSlams": 0,
    "slamBreakdown": {
      "australianOpen": 0,
      "rolandGarros": 0,
      "wimbledon": 0,
      "usOpen": 0
    },
    "prizeMoneyUsd": "$22,800,000",
    "careerWinLoss": {
      "wins": 288,
      "losses": 167,
      "winPercentage": 63.3
    },
    "surfaceStats": {
      "hard": {
        "wins": 195,
        "losses": 110,
        "winPercentage": 63.9
      },
      "clay": {
        "wins": 45,
        "losses": 35,
        "winPercentage": 56.3
      },
      "grass": {
        "wins": 48,
        "losses": 22,
        "winPercentage": 68.6
      }
    },
    "avatarUrl": "/images/players/taylor-fritz.jpg",
    "bio": "As of September 20, 2026, Taylor Fritz is World No. 9 with 8 career titles, the Indian Wells Masters crown, and a 2024 US Open final appearance. Fritz pushed Novak Djokovic in a four-hour Wimbledon quarterfinal in 2026.",
    "playStyle": "Big-serving aggressive hardcourt specialist with a booming first delivery and punishing flat forehand drives.",
    "notableRivalries": [
      "Alexander Zverev",
      "Novak Djokovic",
      "Ben Shelton",
      "Tommy Paul"
    ],
    "injuryHistory": [
      {
        "year": 2021,
        "injury": "Right Knee Meniscus Tear",
        "durationOrTournament": "Roland Garros Second Round",
        "details": "Left court in wheelchair after hearing knee pop; underwent arthroscopy and returned for Wimbledon in 22 days.",
        "severity": "severe",
        "status": "Rehabilitated"
      },
      {
        "year": 2022,
        "injury": "Severe Ankle Sprain & Plantar Fasciitis",
        "durationOrTournament": "Indian Wells Final",
        "details": "Managed pain with extensive numbing and taping to capture maiden Masters 1000 crown over Rafael Nadal.",
        "severity": "moderate",
        "status": "Resolved"
      },
      {
        "year": 2023,
        "injury": "Abdominal Oblique Strain",
        "durationOrTournament": "Paris Masters Second Round",
        "details": "Withdrew prior to second-round match with acute oblique inflammation.",
        "severity": "mild",
        "status": "Resolved"
      }
    ],
    "status": "active",
    "slamFinals": 1
  },
  {
    "id": "casper-ruud",
    "name": "Casper Ruud",
    "tour": "ATP",
    "country": "Norway",
    "countryCode": "NOR",
    "flag": "🇳🇴",
    "age": 27,
    "birthDate": "1998-12-22",
    "birthPlace": "Oslo, Norway",
    "heightCm": 183,
    "turnedPro": 2015,
    "plays": "Right-handed (two-handed backhand)",
    "currentRank": 10,
    "careerHighRank": 2,
    "careerTitles": 12,
    "grandSlams": 0,
    "slamBreakdown": {
      "australianOpen": 0,
      "rolandGarros": 0,
      "wimbledon": 0,
      "usOpen": 0
    },
    "prizeMoneyUsd": "$21,500,000",
    "careerWinLoss": {
      "wins": 265,
      "losses": 130,
      "winPercentage": 67.1
    },
    "surfaceStats": {
      "hard": {
        "wins": 95,
        "losses": 65,
        "winPercentage": 59.4
      },
      "clay": {
        "wins": 155,
        "losses": 50,
        "winPercentage": 75.6
      },
      "grass": {
        "wins": 15,
        "losses": 15,
        "winPercentage": 50
      }
    },
    "avatarUrl": "/images/players/casper-ruud.jpg",
    "bio": "As of September 20, 2026, Casper Ruud is World No. 10 with 12 career titles and three Grand Slam finals (Roland Garros 2022, 2023; US Open 2022). Renowned as one of clay tennis's most destructive heavy topspin forehands.",
    "playStyle": "Heavy topspin clay-court technician with extraordinary forehand RPM, supreme physical conditioning, and calculated tactical discipline.",
    "notableRivalries": [
      "Alexander Zverev",
      "Carlos Alcaraz",
      "Stefanos Tsitsipas",
      "Holger Rune"
    ],
    "injuryHistory": [
      {
        "year": 2022,
        "injury": "Right Ankle Ligament Sprain",
        "durationOrTournament": "Australian Open Eve",
        "details": "Rolled ankle during practice in Melbourne two days before first-round match; forced withdrawal.",
        "severity": "moderate",
        "status": "Resolved"
      },
      {
        "year": 2024,
        "injury": "Acute Gastrointestinal Infection",
        "durationOrTournament": "Roland Garros Semifinal",
        "details": "Severe stomach virus and dehydration restricted energy levels in 4-set loss to Zverev.",
        "severity": "moderate",
        "status": "Resolved"
      }
    ],
    "status": "active",
    "slamFinals": 3
  },
  {
    "id": "andrey-rublev",
    "name": "Andrey Rublev",
    "tour": "ATP",
    "country": "International",
    "countryCode": "INT",
    "flag": "🏳️",
    "age": 28,
    "birthDate": "1997-10-20",
    "birthPlace": "Moscow, Russia",
    "heightCm": 188,
    "turnedPro": 2014,
    "plays": "Right-handed (two-handed backhand)",
    "currentRank": 11,
    "careerHighRank": 5,
    "careerTitles": 16,
    "grandSlams": 0,
    "slamBreakdown": {
      "australianOpen": 0,
      "rolandGarros": 0,
      "wimbledon": 0,
      "usOpen": 0
    },
    "prizeMoneyUsd": "$26,900,000",
    "careerWinLoss": {
      "wins": 330,
      "losses": 175,
      "winPercentage": 65.3
    },
    "surfaceStats": {
      "hard": {
        "wins": 210,
        "losses": 110,
        "winPercentage": 65.6
      },
      "clay": {
        "wins": 95,
        "losses": 45,
        "winPercentage": 67.9
      },
      "grass": {
        "wins": 25,
        "losses": 20,
        "winPercentage": 55.6
      }
    },
    "avatarUrl": "/images/players/andrey-rublev.jpg",
    "bio": "As of September 20, 2026, Andrey Rublev is World No. 11 with 16 career ATP titles, including Masters 1000 crowns in Monte-Carlo and Madrid. Known for blistering baseline power and raw emotional intensity on court.",
    "playStyle": "High-octane first-strike baseline aggressor who attacks every ball with blistering velocity on both forehand and serve.",
    "notableRivalries": [
      "Daniil Medvedev",
      "Alexander Zverev",
      "Casper Ruud",
      "Alex de Minaur"
    ],
    "injuryHistory": [
      {
        "year": 2024,
        "injury": "Peritonsillar Throat Abscess",
        "durationOrTournament": "Mutua Madrid Open Final",
        "details": "Hospitalized for two nights with severe throat abscess and internal fever; played final on anesthetics to win title.",
        "severity": "severe",
        "status": "Resolved"
      },
      {
        "year": 2018,
        "injury": "Lumbar Spine Stress Fracture",
        "durationOrTournament": "European Clay Swing",
        "details": "Lower back stress fracture sidelined him for three months, missing Roland Garros and Wimbledon.",
        "severity": "severe",
        "status": "Rehabilitated"
      }
    ],
    "status": "active"
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
    "birthPlace": "Voorhees, New Jersey, USA",
    "heightCm": 185,
    "turnedPro": 2015,
    "plays": "Right-handed (two-handed backhand)",
    "currentRank": 12,
    "careerHighRank": 12,
    "careerTitles": 3,
    "grandSlams": 0,
    "slamBreakdown": {
      "australianOpen": 0,
      "rolandGarros": 0,
      "wimbledon": 0,
      "usOpen": 0
    },
    "prizeMoneyUsd": "$10,900,000",
    "careerWinLoss": {
      "wins": 175,
      "losses": 120,
      "winPercentage": 59.3
    },
    "surfaceStats": {
      "hard": {
        "wins": 115,
        "losses": 78,
        "winPercentage": 59.6
      },
      "clay": {
        "wins": 32,
        "losses": 26,
        "winPercentage": 55.2
      },
      "grass": {
        "wins": 28,
        "losses": 16,
        "winPercentage": 63.6
      }
    },
    "avatarUrl": "/images/players/tommy-paul.jpg",
    "bio": "As of September 20, 2026, Tommy Paul is World No. 12 with 3 career titles, Queen's Club grass trophy, and an Olympic doubles medal. His athletic transition game and all-court craft make him a perpetual threat.",
    "playStyle": "Dynamic all-court athlete with rapid footwork, crafty drop shots, sharp volley technique, and strong baseline defense.",
    "notableRivalries": [
      "Taylor Fritz",
      "Carlos Alcaraz",
      "Ben Shelton",
      "Alexander Zverev"
    ],
    "injuryHistory": [
      {
        "year": 2024,
        "injury": "Ankle Inversion Ligament Sprain",
        "durationOrTournament": "Miami Open Second Round",
        "details": "Suffered severe lateral ankle roll against Damm; sidelined for 4 weeks.",
        "severity": "moderate",
        "status": "Resolved"
      },
      {
        "year": 2023,
        "injury": "Abdominal Muscle Strain",
        "durationOrTournament": "US Hard Court Swing",
        "details": "Oblique wall strain limited service velocity during late summer Masters events.",
        "severity": "mild",
        "status": "Resolved"
      }
    ],
    "status": "active"
  },
  {
    "id": "stefanos-tsitsipas",
    "name": "Stefanos Tsitsipas",
    "tour": "ATP",
    "country": "Greece",
    "countryCode": "GRE",
    "flag": "🇬🇷",
    "age": 28,
    "birthDate": "1998-08-12",
    "birthPlace": "Athens, Greece",
    "heightCm": 193,
    "turnedPro": 2016,
    "plays": "Right-handed (one-handed backhand)",
    "currentRank": 13,
    "careerHighRank": 3,
    "careerTitles": 11,
    "grandSlams": 0,
    "slamBreakdown": {
      "australianOpen": 0,
      "rolandGarros": 0,
      "wimbledon": 0,
      "usOpen": 0
    },
    "prizeMoneyUsd": "$32,500,000",
    "careerWinLoss": {
      "wins": 335,
      "losses": 160,
      "winPercentage": 67.7
    },
    "surfaceStats": {
      "hard": {
        "wins": 190,
        "losses": 105,
        "winPercentage": 64.4
      },
      "clay": {
        "wins": 118,
        "losses": 35,
        "winPercentage": 77.1
      },
      "grass": {
        "wins": 27,
        "losses": 20,
        "winPercentage": 57.4
      }
    },
    "avatarUrl": "/images/players/stefanos-tsitsipas.jpg",
    "bio": "As of September 20, 2026, Stefanos Tsitsipas is World No. 13 with 11 career titles, three Monte-Carlo Masters titles, and two Grand Slam finals (Roland Garros, Australian Open). A signature classical all-court stylist with an attacking one-handed backhand.",
    "playStyle": "Offensive all-court game with a lethal inside-out forehand, sweeping one-handed backhand topspin, and agile net transitions.",
    "notableRivalries": [
      "Alexander Zverev",
      "Daniil Medvedev",
      "Carlos Alcaraz",
      "Casper Ruud"
    ],
    "injuryHistory": [
      {
        "year": 2023,
        "injury": "Lumbar Spine Disk Irritation",
        "durationOrTournament": "Nitto ATP Finals",
        "details": "Chronic lower back stress forced retirement after three games against Rune in Turin group stage.",
        "severity": "moderate",
        "status": "Active Monitoring"
      },
      {
        "year": 2021,
        "injury": "Right Elbow Arthroscopy",
        "durationOrTournament": "Post-Season 2021",
        "details": "Underwent surgical procedure in Switzerland to address chronic tendon degeneration in hitting elbow.",
        "severity": "moderate",
        "status": "Rehabilitated"
      }
    ],
    "status": "active",
    "slamFinals": 2
  },
  {
    "id": "holger-rune",
    "name": "Holger Rune",
    "tour": "ATP",
    "country": "Denmark",
    "countryCode": "DEN",
    "flag": "🇩🇰",
    "age": 23,
    "birthDate": "2003-04-29",
    "birthPlace": "Gentofte, Denmark",
    "heightCm": 188,
    "turnedPro": 2020,
    "plays": "Right-handed (two-handed backhand)",
    "currentRank": 14,
    "careerHighRank": 4,
    "careerTitles": 4,
    "grandSlams": 0,
    "slamBreakdown": {
      "australianOpen": 0,
      "rolandGarros": 0,
      "wimbledon": 0,
      "usOpen": 0
    },
    "prizeMoneyUsd": "$11,200,000",
    "careerWinLoss": {
      "wins": 145,
      "losses": 85,
      "winPercentage": 63
    },
    "surfaceStats": {
      "hard": {
        "wins": 82,
        "losses": 48,
        "winPercentage": 63.1
      },
      "clay": {
        "wins": 50,
        "losses": 25,
        "winPercentage": 66.7
      },
      "grass": {
        "wins": 13,
        "losses": 12,
        "winPercentage": 52
      }
    },
    "avatarUrl": "/images/players/holger-rune.jpg",
    "bio": "As of September 20, 2026, 23-year-old Holger Rune is World No. 14 with 4 career titles and the Paris Masters shield. Known for his fiery competitive spirit, explosive court movement, and lethal down-the-line backhand.",
    "playStyle": "Aggressive baseline warrior with explosive redirect speed, heavy inside-in forehands, and intense fighting spirit.",
    "notableRivalries": [
      "Casper Ruud",
      "Carlos Alcaraz",
      "Jannik Sinner",
      "Novak Djokovic"
    ],
    "injuryHistory": [
      {
        "year": 2023,
        "injury": "Lumbar Spine Nerve Impingement",
        "durationOrTournament": "US Open Hard Court Swing",
        "details": "Herniated L5 disc caused shooting leg pain and serve velocity loss through autumn.",
        "severity": "moderate",
        "status": "Resolved"
      },
      {
        "year": 2024,
        "injury": "Right Wrist Ligament Inflammation",
        "durationOrTournament": "Hamburg Open & Paris Olympics",
        "details": "Withdrew from Olympic singles tournament due to persistent wrist joint swelling.",
        "severity": "moderate",
        "status": "Resolved"
      }
    ],
    "status": "active"
  },
  {
    "id": "jack-draper",
    "name": "Jack Draper",
    "tour": "ATP",
    "country": "Great Britain",
    "countryCode": "GBR",
    "flag": "🇬🇧",
    "age": 24,
    "birthDate": "2001-12-22",
    "birthPlace": "Sutton, London, England",
    "heightCm": 193,
    "turnedPro": 2018,
    "plays": "Left-handed (two-handed backhand)",
    "currentRank": 15,
    "careerHighRank": 15,
    "careerTitles": 2,
    "grandSlams": 0,
    "slamBreakdown": {
      "australianOpen": 0,
      "rolandGarros": 0,
      "wimbledon": 0,
      "usOpen": 0
    },
    "prizeMoneyUsd": "$5,400,000",
    "careerWinLoss": {
      "wins": 88,
      "losses": 48,
      "winPercentage": 64.7
    },
    "surfaceStats": {
      "hard": {
        "wins": 58,
        "losses": 30,
        "winPercentage": 65.9
      },
      "clay": {
        "wins": 14,
        "losses": 10,
        "winPercentage": 58.3
      },
      "grass": {
        "wins": 16,
        "losses": 8,
        "winPercentage": 66.7
      }
    },
    "avatarUrl": "/images/players/jack-draper.jpg",
    "bio": "As of September 20, 2026, 24-year-old Jack Draper is World No. 15 with 2 ATP titles (Vienna, Stuttgart) and a US Open semifinal run. The powerful British southpaw features one of the most lethal lefty deliveries on tour.",
    "playStyle": "Towering left-handed power baseline game with heavy crosscourt slice, thunderous flat groundstrokes, and elite athletic transitions.",
    "notableRivalries": [
      "Jannik Sinner",
      "Carlos Alcaraz",
      "Alex de Minaur",
      "Holger Rune"
    ],
    "injuryHistory": [
      {
        "year": 2023,
        "injury": "Left Shoulder Tendon Tear",
        "durationOrTournament": "Roland Garros First Round",
        "details": "Suffered partial tendon tear in hitting shoulder; missed entire grass season including Wimbledon.",
        "severity": "severe",
        "status": "Rehabilitated"
      },
      {
        "year": 2024,
        "injury": "Intercostal Abdominal Strain",
        "durationOrTournament": "cinch Championships Queens Club",
        "details": "Mild muscular pull experienced during service motion follow-through.",
        "severity": "mild",
        "status": "Resolved"
      }
    ],
    "status": "active"
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
    "careerTitles": 20,
    "grandSlams": 5,
    "slamBreakdown": {
      "australianOpen": 2,
      "rolandGarros": 0,
      "wimbledon": 1,
      "usOpen": 2
    },
    "prizeMoneyUsd": "$36,000,000",
    "careerWinLoss": {
      "wins": 438,
      "losses": 186,
      "winPercentage": 70.2
    },
    "surfaceStats": {
      "hard": {
        "wins": 309,
        "losses": 119,
        "winPercentage": 72.2
      },
      "clay": {
        "wins": 86,
        "losses": 47,
        "winPercentage": 64.7
      },
      "grass": {
        "wins": 43,
        "losses": 20,
        "winPercentage": 68.3
      }
    },
    "avatarUrl": "/images/players/aryna-sabalenka.jpg",
    "bio": "As of September 20, 2026, Aryna Sabalenka is WTA World No. 1 with 5 Grand Slam titles (Australian Open 2023, 2024; Wimbledon 2026; US Open 2024, 2026), 20 career titles, and the 2026 Sunshine Double. Her thunderous baseline firepower was on full display capturing both Wimbledon and the US Open in 2026.",
    "playStyle": "Ultra-aggressive power hitter with one of the most powerful forehands and serves on the women tour.",
    "notableRivalries": [
      "Iga Swiatek",
      "Coco Gauff",
      "Elena Rybakina",
      "Zheng Qinwen",
      "Jessica Pegula"
    ],
    "injuryHistory": [
      {
        "year": 2024,
        "injury": "Teres Major Shoulder Muscle Tear",
        "durationOrTournament": "Berlin & Wimbledon",
        "details": "Rare micro-tear in upper shoulder rotator muscle forced withdrawal from Wimbledon; returned to win Cincinnati and US Open.",
        "severity": "severe",
        "status": "Rehabilitated"
      },
      {
        "year": 2023,
        "injury": "Left Adductor Groin Tightness",
        "durationOrTournament": "WTA Finals Cancun",
        "details": "Managed inner thigh muscular strain in humid court conditions.",
        "severity": "mild",
        "status": "Resolved"
      }
    ],
    "status": "active",
    "slamFinals": 7
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
    "careerTitles": 8,
    "grandSlams": 1,
    "slamBreakdown": {
      "australianOpen": 0,
      "rolandGarros": 0,
      "wimbledon": 1,
      "usOpen": 0
    },
    "prizeMoneyUsd": "$15,600,000",
    "careerWinLoss": {
      "wins": 320,
      "losses": 140,
      "winPercentage": 69.6
    },
    "surfaceStats": {
      "hard": {
        "wins": 209,
        "losses": 98,
        "winPercentage": 68.1
      },
      "clay": {
        "wins": 78,
        "losses": 32,
        "winPercentage": 70.9
      },
      "grass": {
        "wins": 33,
        "losses": 10,
        "winPercentage": 76.7
      }
    },
    "avatarUrl": "/images/players/elena-rybakina.jpg",
    "bio": "As of September 20, 2026, Elena Rybakina is World No. 4 with 8 career titles, the 2022 Wimbledon crown, and 2 Grand Slam finals. Her clinical, laser-accurate first delivery leads the WTA in aces and unreturned serve rate.",
    "playStyle": "Tall, composed power player with effortless ball striking and devastating ace-serving delivery.",
    "notableRivalries": [
      "Aryna Sabalenka",
      "Iga Swiatek",
      "Jasmine Paolini"
    ],
    "injuryHistory": [
      {
        "year": 2024,
        "injury": "Acute Gastrointestinal Viral Infection & Lower Back Strain",
        "durationOrTournament": "US Open & Olympic Games",
        "details": "Severe respiratory and back issues forced withdrawals from Olympics and US Open second round.",
        "severity": "severe",
        "status": "Rehabilitated"
      },
      {
        "year": 2023,
        "injury": "Upper Respiratory Viral Flare-up",
        "durationOrTournament": "Roland Garros Third Round",
        "details": "Fever and breathing difficulty forced withdrawal hours before third-round match.",
        "severity": "moderate",
        "status": "Resolved"
      }
    ],
    "status": "active",
    "slamFinals": 2
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
    "currentRank": 3,
    "careerHighRank": 3,
    "careerTitles": 6,
    "grandSlams": 0,
    "slamBreakdown": {
      "australianOpen": 0,
      "rolandGarros": 0,
      "wimbledon": 0,
      "usOpen": 0
    },
    "prizeMoneyUsd": "$15,800,000",
    "careerWinLoss": {
      "wins": 295,
      "losses": 155,
      "winPercentage": 65.6
    },
    "surfaceStats": {
      "hard": {
        "wins": 205,
        "losses": 95,
        "winPercentage": 68.3
      },
      "clay": {
        "wins": 55,
        "losses": 38,
        "winPercentage": 59.1
      },
      "grass": {
        "wins": 35,
        "losses": 22,
        "winPercentage": 61.4
      }
    },
    "avatarUrl": "/images/players/jessica-pegula.jpg",
    "bio": "As of September 20, 2026, Jessica Pegula is World No. 5 with 6 career titles, two Canadian Open trophies, and the 2024 US Open final. A consummate competitor renowned for flat ball striking, sharp angles, and consistency.",
    "playStyle": "Clean, flat baseline ball striker taking balls early on the rise with textbook shot depth and pinpoint return placement.",
    "notableRivalries": [
      "Aryna Sabalenka",
      "Coco Gauff",
      "Iga Swiatek",
      "Emma Navarro"
    ],
    "injuryHistory": [
      {
        "year": 2024,
        "injury": "Severe Neck & Rib Joint Strain",
        "durationOrTournament": "European Clay Season",
        "details": "Forced withdrawal from entire clay swing including Roland Garros; rebounded to reach US Open Final.",
        "severity": "severe",
        "status": "Rehabilitated"
      },
      {
        "year": 2017,
        "injury": "Hip Labral Tear Reconstruction Surgery",
        "durationOrTournament": "Early Career Hiatus",
        "details": "Major hip reconstructive surgery required an 18-month competitive rehabilitation.",
        "severity": "severe",
        "status": "Rehabilitated"
      }
    ],
    "status": "active",
    "slamFinals": 1
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
    "currentRank": 4,
    "careerHighRank": 2,
    "careerTitles": 9,
    "grandSlams": 1,
    "slamBreakdown": {
      "australianOpen": 0,
      "rolandGarros": 0,
      "wimbledon": 0,
      "usOpen": 1
    },
    "prizeMoneyUsd": "$22,800,000",
    "careerWinLoss": {
      "wins": 242,
      "losses": 102,
      "winPercentage": 70.3
    },
    "surfaceStats": {
      "hard": {
        "wins": 156,
        "losses": 62,
        "winPercentage": 71.6
      },
      "clay": {
        "wins": 60,
        "losses": 26,
        "winPercentage": 69.8
      },
      "grass": {
        "wins": 26,
        "losses": 14,
        "winPercentage": 65
      }
    },
    "avatarUrl": "/images/players/coco-gauff.jpg",
    "bio": "As of September 20, 2026, 22-year-old Coco Gauff is World No. 3 with 9 career titles, the 2023 US Open title, and 3 Grand Slam finals. She captured the 2026 Madrid Open and battled into the 2026 US Open final against Aryna Sabalenka.",
    "playStyle": "World-class athletic defender with superhuman recovery range, lightning first serve, and sharp backhand drives down the line.",
    "notableRivalries": [
      "Iga Swiatek",
      "Aryna Sabalenka",
      "Jessica Pegula",
      "Zheng Qinwen"
    ],
    "injuryHistory": [
      {
        "year": 2023,
        "injury": "Left Ankle Inversion Sprain",
        "durationOrTournament": "WTA 1000 Doha",
        "details": "Sustained mild ankle roll during baseline defense; recovered in 10 days.",
        "severity": "mild",
        "status": "Resolved"
      },
      {
        "year": 2022,
        "injury": "Right Ankle Ligament Sprain",
        "durationOrTournament": "San Diego Open Quarterfinal",
        "details": "Retired in second set against Swiatek after rolling ankle sliding on hard court.",
        "severity": "moderate",
        "status": "Resolved"
      }
    ],
    "status": "active",
    "slamFinals": 3
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
    "currentRank": 5,
    "careerHighRank": 5,
    "careerTitles": 1,
    "grandSlams": 0,
    "slamBreakdown": {
      "australianOpen": 0,
      "rolandGarros": 0,
      "wimbledon": 0,
      "usOpen": 0
    },
    "prizeMoneyUsd": "$3,200,000",
    "careerWinLoss": {
      "wins": 72,
      "losses": 30,
      "winPercentage": 70.6
    },
    "surfaceStats": {
      "hard": {
        "wins": 38,
        "losses": 18,
        "winPercentage": 67.9
      },
      "clay": {
        "wins": 26,
        "losses": 8,
        "winPercentage": 76.5
      },
      "grass": {
        "wins": 8,
        "losses": 4,
        "winPercentage": 66.7
      }
    },
    "avatarUrl": "/images/players/mirra-andreeva.jpg",
    "bio": "As of September 20, 2026, 19-year-old Mirra Andreeva is World No. 11 with 1 WTA title, an Olympic doubles silver medal, and a Roland Garros semifinal. Possesses extraordinary tennis IQ, court anticipation, and touch.",
    "playStyle": "Prodigious court vision, effortless direction change on both wings, sharp anticipation, and mature baseline poise.",
    "notableRivalries": [
      "Aryna Sabalenka",
      "Jasmine Paolini",
      "Coco Gauff",
      "Iga Swiatek"
    ],
    "injuryHistory": [
      {
        "year": 2024,
        "injury": "Right Wrist Extensor Tendonitis",
        "durationOrTournament": "Clay Court Transition",
        "details": "Managed wrist inflammation caused by high-RPM topspin baseline game.",
        "severity": "mild",
        "status": "Resolved"
      },
      {
        "year": 2023,
        "injury": "Forearm Muscle Fatigue",
        "durationOrTournament": "Post-Wimbledon Swing",
        "details": "Sidelined for two weeks following intense junior and senior Grand Slam transition.",
        "severity": "mild",
        "status": "Resolved"
      }
    ],
    "status": "active"
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
    "careerTitles": 24,
    "grandSlams": 6,
    "slamBreakdown": {
      "australianOpen": 0,
      "rolandGarros": 5,
      "wimbledon": 0,
      "usOpen": 1
    },
    "prizeMoneyUsd": "$37,200,000",
    "careerWinLoss": {
      "wins": 376,
      "losses": 79,
      "winPercentage": 82.6
    },
    "surfaceStats": {
      "hard": {
        "wins": 198,
        "losses": 51,
        "winPercentage": 79.5
      },
      "clay": {
        "wins": 155,
        "losses": 19,
        "winPercentage": 89.1
      },
      "grass": {
        "wins": 23,
        "losses": 9,
        "winPercentage": 71.9
      }
    },
    "avatarUrl": "/images/players/iga-swiatek.jpg",
    "bio": "As of September 20, 2026, Iga Świątek is World No. 2 with 6 Grand Slam singles titles (Roland Garros 2020, 2022, 2023, 2024, 2026; US Open 2022) and 24 career titles. Dominant on European clay, her heavy topspin forehand averages over 3,250 RPM.",
    "playStyle": "High-intensity baseline game with exceptional clay sliding, violent topspin forehand angles, and suffocating court position.",
    "notableRivalries": [
      "Aryna Sabalenka",
      "Coco Gauff",
      "Elena Rybakina",
      "Jasmine Paolini"
    ],
    "injuryHistory": [
      {
        "year": 2023,
        "injury": "Right Thigh Adductor Muscle Strain",
        "durationOrTournament": "Rome Masters Quarterfinal",
        "details": "Felt sharp thigh pain in third-set tiebreak vs Rybakina; retired to ensure fitness for Roland Garros victory.",
        "severity": "moderate",
        "status": "Resolved"
      },
      {
        "year": 2023,
        "injury": "Rib Cartilage Stress Injury",
        "durationOrTournament": "Indian Wells & Miami Open",
        "details": "Bone and cartilage bruising in ribcage forced withdrawal from Miami Open title defense.",
        "severity": "moderate",
        "status": "Resolved"
      },
      {
        "year": 2019,
        "injury": "Severe Right Ankle Surgery",
        "durationOrTournament": "WTA Tour Debut Season",
        "details": "Underwent complex ankle surgery as a teenager, missing seven months of competition.",
        "severity": "severe",
        "status": "Rehabilitated"
      }
    ],
    "status": "active",
    "slamFinals": 6
  },
  {
    "id": "amanda-anisimova",
    "name": "Amanda Anisimova",
    "tour": "WTA",
    "country": "United States",
    "countryCode": "USA",
    "flag": "🇺🇸",
    "age": 25,
    "birthDate": "2001-08-31",
    "birthPlace": "Freehold Township, New Jersey, USA",
    "heightCm": 180,
    "turnedPro": 2016,
    "plays": "Right-handed (two-handed backhand)",
    "currentRank": 11,
    "careerHighRank": 8,
    "careerTitles": 2,
    "grandSlams": 0,
    "slamBreakdown": {
      "australianOpen": 0,
      "rolandGarros": 0,
      "wimbledon": 0,
      "usOpen": 0
    },
    "prizeMoneyUsd": "$6,150,000",
    "careerWinLoss": {
      "wins": 178,
      "losses": 95,
      "winPercentage": 65.2
    },
    "surfaceStats": {
      "hard": {
        "wins": 114,
        "losses": 60,
        "winPercentage": 65.5
      },
      "clay": {
        "wins": 44,
        "losses": 22,
        "winPercentage": 66.7
      },
      "grass": {
        "wins": 20,
        "losses": 13,
        "winPercentage": 60.6
      }
    },
    "avatarUrl": "/images/players/amanda-anisimova.jpg",
    "bio": "As of September 20, 2026, Amanda Anisimova is World No. 12 with 2 career titles and a Grand Slam final at the 2025 US Open. Known for her clean, explosive groundstrokes from both wings, she completed an inspiring surge into the world elite.",
    "playStyle": "Ultra-clean, early-take baseline ball striker with extraordinary timing, flat groundstroke penetration on both wings, and aggressive return positioning.",
    "notableRivalries": [
      "Aryna Sabalenka",
      "Jessica Pegula",
      "Coco Gauff",
      "Iga Świątek"
    ],
    "injuryHistory": [
      {
        "year": 2022,
        "injury": "Broken Right Big Toe",
        "durationOrTournament": "Western & Southern Open Cincinnati",
        "details": "Suffered fractured toe in practice, limiting mobility at US Open.",
        "severity": "moderate",
        "status": "Resolved"
      },
      {
        "year": 2023,
        "injury": "Mental Health & Physical Fatigue Hiatus",
        "durationOrTournament": "Full WTA Sabbatical",
        "details": "Took 8-month competitive sabbatical to rehabilitate physical injuries and burnout before 2024 resurgence.",
        "severity": "severe",
        "status": "Rehabilitated"
      }
    ],
    "status": "active",
    "slamFinals": 1
  },
  {
    "id": "jasmine-paolini",
    "name": "Jasmine Paolini",
    "tour": "WTA",
    "country": "Italy",
    "countryCode": "ITA",
    "flag": "🇮🇹",
    "age": 30,
    "birthDate": "1996-01-04",
    "birthPlace": "Castelnuovo di Garfagnana, Italy",
    "heightCm": 163,
    "turnedPro": 2011,
    "plays": "Right-handed (two-handed backhand)",
    "currentRank": 20,
    "careerHighRank": 4,
    "careerTitles": 2,
    "grandSlams": 0,
    "slamBreakdown": {
      "australianOpen": 0,
      "rolandGarros": 0,
      "wimbledon": 0,
      "usOpen": 0
    },
    "prizeMoneyUsd": "$9,800,000",
    "careerWinLoss": {
      "wins": 210,
      "losses": 140,
      "winPercentage": 60
    },
    "surfaceStats": {
      "hard": {
        "wins": 120,
        "losses": 85,
        "winPercentage": 58.5
      },
      "clay": {
        "wins": 72,
        "losses": 42,
        "winPercentage": 63.2
      },
      "grass": {
        "wins": 18,
        "losses": 13,
        "winPercentage": 58.1
      }
    },
    "avatarUrl": "/images/players/jasmine-paolini.jpg",
    "bio": "As of September 20, 2026, 30-year-old Jasmine Paolini is World No. 6 with 2 WTA titles, the Dubai 1000 trophy, two Grand Slam finals (Roland Garros 2024, Wimbledon 2024), and Olympic Gold in doubles.",
    "playStyle": "Relentless offensive baseline tempo with rapid footwork, explosive forehand whip, and exceptional net agility.",
    "notableRivalries": [
      "Iga Swiatek",
      "Aryna Sabalenka",
      "Elena Rybakina",
      "Mirra Andreeva"
    ],
    "injuryHistory": [
      {
        "year": 2023,
        "injury": "Right Wrist Tendonitis",
        "durationOrTournament": "European Summer Swing",
        "details": "Sidelined for three weeks with wrist extensor inflammation.",
        "severity": "mild",
        "status": "Resolved"
      },
      {
        "year": 2024,
        "injury": "Lower Back Muscular Spasm",
        "durationOrTournament": "Late Season Asian Swing",
        "details": "Physical fatigue following historic French Open and Wimbledon final runs.",
        "severity": "mild",
        "status": "Resolved"
      }
    ],
    "status": "active",
    "slamFinals": 2
  },
  {
    "id": "emma-navarro",
    "name": "Emma Navarro",
    "tour": "WTA",
    "country": "United States",
    "countryCode": "USA",
    "flag": "🇺🇸",
    "age": 25,
    "birthDate": "2001-05-18",
    "birthPlace": "New York City, New York, USA",
    "heightCm": 170,
    "turnedPro": 2022,
    "plays": "Right-handed (two-handed backhand)",
    "currentRank": 24,
    "careerHighRank": 8,
    "careerTitles": 1,
    "grandSlams": 0,
    "slamBreakdown": {
      "australianOpen": 0,
      "rolandGarros": 0,
      "wimbledon": 0,
      "usOpen": 0
    },
    "prizeMoneyUsd": "$4,800,000",
    "careerWinLoss": {
      "wins": 110,
      "losses": 55,
      "winPercentage": 66.7
    },
    "surfaceStats": {
      "hard": {
        "wins": 68,
        "losses": 32,
        "winPercentage": 68
      },
      "clay": {
        "wins": 28,
        "losses": 15,
        "winPercentage": 65.1
      },
      "grass": {
        "wins": 14,
        "losses": 8,
        "winPercentage": 63.6
      }
    },
    "avatarUrl": "/images/players/emma-navarro.jpg",
    "bio": "As of September 20, 2026, Emma Navarro is World No. 8 with 1 WTA title and back-to-back Grand Slam semifinal appearances. Known for tactical clarity, precise counter-punching, and remarkable court coverage.",
    "playStyle": "Masterful court craftsman with calm temperament, crisp counter-punching depth, deceptive slice changes, and pinpoint accuracy.",
    "notableRivalries": [
      "Coco Gauff",
      "Zheng Qinwen",
      "Jessica Pegula",
      "Aryna Sabalenka"
    ],
    "injuryHistory": [
      {
        "year": 2024,
        "injury": "Patellar Knee Tendon Soreness",
        "durationOrTournament": "Late Season Autumn Swing",
        "details": "Managed knee inflammation following marathon 75-match breakthrough season.",
        "severity": "mild",
        "status": "Resolved"
      },
      {
        "year": 2023,
        "injury": "Lateral Ankle Sprain",
        "durationOrTournament": "US Open Warmup",
        "details": "Rolled ankle during baseline practice; taped throughout tournament.",
        "severity": "mild",
        "status": "Resolved"
      }
    ],
    "status": "active"
  },
  {
    "id": "barbora-krejcikova",
    "name": "Barbora Krejcikova",
    "tour": "WTA",
    "country": "Czech Republic",
    "countryCode": "CZE",
    "flag": "🇨🇿",
    "age": 30,
    "birthDate": "1995-12-18",
    "birthPlace": "Brno, Czech Republic",
    "heightCm": 178,
    "turnedPro": 2014,
    "plays": "Right-handed (two-handed backhand)",
    "currentRank": 43,
    "careerHighRank": 2,
    "careerTitles": 8,
    "grandSlams": 2,
    "slamBreakdown": {
      "australianOpen": 0,
      "rolandGarros": 1,
      "wimbledon": 1,
      "usOpen": 0
    },
    "prizeMoneyUsd": "$16,500,000",
    "careerWinLoss": {
      "wins": 255,
      "losses": 125,
      "winPercentage": 67.1
    },
    "surfaceStats": {
      "hard": {
        "wins": 135,
        "losses": 70,
        "winPercentage": 65.9
      },
      "clay": {
        "wins": 75,
        "losses": 35,
        "winPercentage": 68.2
      },
      "grass": {
        "wins": 45,
        "losses": 20,
        "winPercentage": 69.2
      }
    },
    "avatarUrl": "/images/players/barbora-krejcikova.jpg",
    "bio": "As of September 20, 2026, Barbora Krejcikova is World No. 10 with 8 career titles, two Grand Slam singles crowns (Roland Garros 2021, Wimbledon 2024), and a Career Golden Slam in doubles. Renowned for supreme tactical artistry.",
    "playStyle": "All-court tactical maestro with exceptional touch, crafty changes of pace, fluid net approaches, and punishing precision backhands.",
    "notableRivalries": [
      "Iga Swiatek",
      "Aryna Sabalenka",
      "Elena Rybakina",
      "Jasmine Paolini"
    ],
    "injuryHistory": [
      {
        "year": 2024,
        "injury": "Back Muscle Strain",
        "durationOrTournament": "Middle East WTA 1000 Swing",
        "details": "Withdrew from Doha and Dubai to rehabilitate spinal muscular inflammation ahead of Wimbledon championship run.",
        "severity": "moderate",
        "status": "Resolved"
      }
    ],
    "status": "active",
    "slamFinals": 2
  },
  {
    "id": "zheng-qinwen",
    "name": "Zheng Qinwen",
    "tour": "WTA",
    "country": "China",
    "countryCode": "CHN",
    "flag": "🇨🇳",
    "age": 23,
    "birthDate": "2002-10-08",
    "birthPlace": "Shiyan, Hubei, China",
    "heightCm": 178,
    "turnedPro": 2018,
    "plays": "Right-handed (two-handed backhand)",
    "currentRank": 54,
    "careerHighRank": 5,
    "careerTitles": 4,
    "grandSlams": 0,
    "slamBreakdown": {
      "australianOpen": 0,
      "rolandGarros": 0,
      "wimbledon": 0,
      "usOpen": 0
    },
    "prizeMoneyUsd": "$8,900,000",
    "careerWinLoss": {
      "wins": 165,
      "losses": 75,
      "winPercentage": 68.8
    },
    "surfaceStats": {
      "hard": {
        "wins": 105,
        "losses": 50,
        "winPercentage": 67.7
      },
      "clay": {
        "wins": 45,
        "losses": 18,
        "winPercentage": 71.4
      },
      "grass": {
        "wins": 15,
        "losses": 7,
        "winPercentage": 68.2
      }
    },
    "avatarUrl": "/images/players/zheng-qinwen.jpg",
    "bio": "As of September 20, 2026, Zheng Qinwen is World No. 7 with 4 career titles, the Paris Olympic Gold Medal, and the 2024 Australian Open final. Celebrated for elite serving metrics and heavy groundstroke depth.",
    "playStyle": "Power baseline game built around a massive first serve, heavy topspin forehand strikes, and aggressive return positioning.",
    "notableRivalries": [
      "Aryna Sabalenka",
      "Iga Swiatek",
      "Coco Gauff",
      "Emma Navarro"
    ],
    "injuryHistory": [
      {
        "year": 2023,
        "injury": "Right Wrist Tendon Inflammation",
        "durationOrTournament": "Grass Court Season",
        "details": "Wrist pain forced early withdrawal from WTA 500 events in Germany.",
        "severity": "mild",
        "status": "Resolved"
      },
      {
        "year": 2024,
        "injury": "Right Elbow Joint Soreness",
        "durationOrTournament": "US Open Series",
        "details": "Managed minor joint fluid accumulation following grueling Olympic Gold Medal run.",
        "severity": "mild",
        "status": "Resolved"
      }
    ],
    "status": "active",
    "slamFinals": 1
  },
  {
    "id": "danielle-collins",
    "name": "Danielle Collins",
    "tour": "WTA",
    "country": "United States",
    "countryCode": "USA",
    "flag": "🇺🇸",
    "age": 32,
    "birthDate": "1993-12-13",
    "birthPlace": "St. Petersburg, Florida, USA",
    "heightCm": 178,
    "turnedPro": 2016,
    "plays": "Right-handed (two-handed backhand)",
    "currentRank": 9,
    "careerHighRank": 7,
    "careerTitles": 4,
    "grandSlams": 0,
    "slamBreakdown": {
      "australianOpen": 0,
      "rolandGarros": 0,
      "wimbledon": 0,
      "usOpen": 0
    },
    "prizeMoneyUsd": "$9,200,000",
    "careerWinLoss": {
      "wins": 235,
      "losses": 145,
      "winPercentage": 61.8
    },
    "surfaceStats": {
      "hard": {
        "wins": 155,
        "losses": 95,
        "winPercentage": 62
      },
      "clay": {
        "wins": 58,
        "losses": 32,
        "winPercentage": 64.4
      },
      "grass": {
        "wins": 22,
        "losses": 18,
        "winPercentage": 55
      }
    },
    "avatarUrl": "/images/players/danielle-collins.jpg",
    "bio": "As of September 20, 2026, Danielle Collins is World No. 9 with 4 career titles, the 2024 Miami Open 1000 crown, and the 2022 Australian Open final. 'Danimal' plays with explosive aggression and fearless shotmaking.",
    "playStyle": "Fearless first-strike power baseline hitter who attacks second serves and hammers punishing two-handed backhands down the line.",
    "notableRivalries": [
      "Iga Swiatek",
      "Elena Rybakina",
      "Aryna Sabalenka",
      "Ons Jabeur"
    ],
    "injuryHistory": [
      {
        "year": 2024,
        "injury": "Rectus Abdominis Muscle Tear",
        "durationOrTournament": "Paris Olympic Games Quarterfinal",
        "details": "Suffered abdominal tear in heat vs Swiatek; played through pain in final professional season.",
        "severity": "severe",
        "status": "Resolved"
      },
      {
        "year": 2021,
        "injury": "Endometriosis Laparoscopic Surgery",
        "durationOrTournament": "Spring WTA Circuit",
        "details": "Underwent emergency surgical procedure to treat severe pelvic condition; returned 7 weeks later to win back-to-back titles.",
        "severity": "severe",
        "status": "Rehabilitated"
      }
    ],
    "status": "active",
    "slamFinals": 1
  },
  {
    "id": "paula-badosa",
    "name": "Paula Badosa",
    "tour": "WTA",
    "country": "Spain",
    "countryCode": "ESP",
    "flag": "🇪🇸",
    "age": 28,
    "birthDate": "1997-11-15",
    "birthPlace": "New York City, New York, USA",
    "heightCm": 180,
    "turnedPro": 2015,
    "plays": "Right-handed (two-handed backhand)",
    "currentRank": 59,
    "careerHighRank": 2,
    "careerTitles": 4,
    "grandSlams": 0,
    "slamBreakdown": {
      "australianOpen": 0,
      "rolandGarros": 0,
      "wimbledon": 0,
      "usOpen": 0
    },
    "prizeMoneyUsd": "$8,400,000",
    "careerWinLoss": {
      "wins": 195,
      "losses": 120,
      "winPercentage": 61.9
    },
    "surfaceStats": {
      "hard": {
        "wins": 120,
        "losses": 75,
        "winPercentage": 61.5
      },
      "clay": {
        "wins": 55,
        "losses": 30,
        "winPercentage": 64.7
      },
      "grass": {
        "wins": 20,
        "losses": 15,
        "winPercentage": 57.1
      }
    },
    "avatarUrl": "/images/players/paula-badosa.jpg",
    "bio": "As of September 20, 2026, Paula Badosa is World No. 13 with 4 career titles and the Indian Wells 1000 shield. The Spaniard engineered a heroic resurgence into the WTA Top 15 following her spine rehabilitation.",
    "playStyle": "Power baseline game with strong kick-serve placement, heavy forehand groundstrokes, and aggressive baseline court position.",
    "notableRivalries": [
      "Aryna Sabalenka",
      "Coco Gauff",
      "Elena Rybakina",
      "Emma Navarro"
    ],
    "injuryHistory": [
      {
        "year": 2023,
        "injury": "Lumbar L4/L5 Vertebral Stress Fracture",
        "durationOrTournament": "Roland Garros & Wimbledon",
        "details": "Chronic spinal stress fracture forced multiple retirements, missing 7 months of competition.",
        "severity": "severe",
        "status": "Rehabilitated"
      },
      {
        "year": 2024,
        "injury": "Adductor Thigh Muscular Strain",
        "durationOrTournament": "Australian Open Warmup",
        "details": "Minor groin strain during Adelaide campaign.",
        "severity": "moderate",
        "status": "Resolved"
      }
    ],
    "status": "active"
  }
];

export default INITIAL_PLAYERS;
