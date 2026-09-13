import { TournamentDraw } from '../types/tennis';

export const TOURNAMENT_DRAWS: TournamentDraw[] = [
  // =========================================================================
  // 1. US OPEN 2024 - MEN'S SINGLES DRAW (ATP)
  // =========================================================================
  {
    id: 'us-open-2024-atp',
    tournamentId: 'us-open',
    tournamentName: 'US Open',
    edition: '2024 Men\'s Singles Championship Draw',
    year: 2024,
    tour: 'ATP',
    surface: 'Hard',
    surfaceSpeed: 'Fast',
    venue: 'USTA Billie Jean King National Tennis Center, New York',
    quarterfinals: [
      {
        id: 'uso-24-qf-1',
        round: 'Quarterfinal',
        matchNumber: 1,
        court: 'Arthur Ashe Stadium',
        date: 'Sep 4, 2024',
        status: 'Final',
        scoreDisplay: '6-2, 1-6, 6-1, 6-4',
        player1: {
          id: 'jannik-sinner',
          name: 'Jannik Sinner',
          countryCode: 'ITA',
          seed: 1,
          seedLabel: '1',
          avatarUrl: '/images/players/jannik-sinner.jpg',
          sets: [6, 1, 6, 6],
          isWinner: true,
        },
        player2: {
          id: 'daniil-medvedev',
          name: 'Daniil Medvedev',
          countryCode: 'INT',
          seed: 5,
          seedLabel: '5',
          avatarUrl: '/images/players/daniil-medvedev.jpg',
          sets: [2, 6, 1, 4],
          isWinner: false,
        },
      },
      {
        id: 'uso-24-qf-2',
        round: 'Quarterfinal',
        matchNumber: 2,
        court: 'Arthur Ashe Stadium',
        date: 'Sep 4, 2024',
        status: 'Final',
        scoreDisplay: '6-3, 7-6(5), 6-2',
        player1: {
          id: 'jack-draper',
          name: 'Jack Draper',
          countryCode: 'GBR',
          seed: 25,
          seedLabel: '25',
          avatarUrl: '/images/players/jack-draper.jpg',
          sets: [6, 7, 6],
          isWinner: true,
        },
        player2: {
          id: 'alex-de-minaur',
          name: 'Alex de Minaur',
          countryCode: 'AUS',
          seed: 10,
          seedLabel: '10',
          avatarUrl: '/images/players/alex-de-minaur.jpg',
          sets: [3, 6, 2],
          isWinner: false,
        },
      },
      {
        id: 'uso-24-qf-3',
        round: 'Quarterfinal',
        matchNumber: 3,
        court: 'Arthur Ashe Stadium',
        date: 'Sep 3, 2024',
        status: 'Final',
        scoreDisplay: '7-6(2), 3-6, 6-4, 7-6(3)',
        player1: {
          id: 'taylor-fritz',
          name: 'Taylor Fritz',
          countryCode: 'USA',
          seed: 12,
          seedLabel: '12',
          avatarUrl: '/images/players/taylor-fritz.jpg',
          sets: [7, 3, 6, 7],
          isWinner: true,
        },
        player2: {
          id: 'alexander-zverev',
          name: 'Alexander Zverev',
          countryCode: 'GER',
          seed: 4,
          seedLabel: '4',
          avatarUrl: '/images/players/alexander-zverev.jpg',
          sets: [6, 6, 4, 6],
          isWinner: false,
        },
      },
      {
        id: 'uso-24-qf-4',
        round: 'Quarterfinal',
        matchNumber: 4,
        court: 'Arthur Ashe Stadium',
        date: 'Sep 3, 2024',
        status: 'Final',
        scoreDisplay: '6-3, 6-7(5), 6-3, 4-1 ret.',
        player1: {
          id: 'ben-shelton',
          name: 'Ben Shelton',
          countryCode: 'USA',
          seed: 13,
          seedLabel: '13',
          avatarUrl: '/images/players/ben-shelton.jpg',
          sets: [3, 6, 3],
          isWinner: false,
        },
        player2: {
          id: 'tommy-paul',
          name: 'Tommy Paul',
          countryCode: 'USA',
          seed: 14,
          seedLabel: '14',
          avatarUrl: '/images/players/tommy-paul.jpg',
          sets: [6, 7, 6],
          isWinner: true,
        },
      },
    ],
    semifinals: [
      {
        id: 'uso-24-sf-1',
        round: 'Semifinal',
        matchNumber: 1,
        court: 'Arthur Ashe Stadium',
        date: 'Sep 6, 2024',
        status: 'Final',
        scoreDisplay: '7-5, 7-6(3), 6-2',
        player1: {
          id: 'jannik-sinner',
          name: 'Jannik Sinner',
          countryCode: 'ITA',
          seed: 1,
          seedLabel: '1',
          avatarUrl: '/images/players/jannik-sinner.jpg',
          sets: [7, 7, 6],
          isWinner: true,
        },
        player2: {
          id: 'jack-draper',
          name: 'Jack Draper',
          countryCode: 'GBR',
          seed: 25,
          seedLabel: '25',
          avatarUrl: '/images/players/jack-draper.jpg',
          sets: [5, 6, 2],
          isWinner: false,
        },
      },
      {
        id: 'uso-24-sf-2',
        round: 'Semifinal',
        matchNumber: 2,
        court: 'Arthur Ashe Stadium',
        date: 'Sep 6, 2024',
        status: 'Final',
        scoreDisplay: '4-6, 7-5, 4-6, 6-4, 6-1',
        player1: {
          id: 'taylor-fritz',
          name: 'Taylor Fritz',
          countryCode: 'USA',
          seed: 12,
          seedLabel: '12',
          avatarUrl: '/images/players/taylor-fritz.jpg',
          sets: [4, 7, 4, 6, 6],
          isWinner: true,
        },
        player2: {
          id: 'tommy-paul',
          name: 'Tommy Paul',
          countryCode: 'USA',
          seed: 14,
          seedLabel: '14',
          avatarUrl: '/images/players/tommy-paul.jpg',
          sets: [6, 5, 6, 4, 1],
          isWinner: false,
        },
      },
    ],
    final: {
      id: 'uso-24-final',
      round: 'Championship Final',
      matchNumber: 1,
      court: 'Arthur Ashe Stadium',
      date: 'Sep 8, 2024',
      status: 'Final',
      scoreDisplay: '6-3, 6-4, 7-5',
      player1: {
        id: 'jannik-sinner',
        name: 'Jannik Sinner',
        countryCode: 'ITA',
        seed: 1,
        seedLabel: '1',
        avatarUrl: '/images/players/jannik-sinner.jpg',
        sets: [6, 6, 7],
        isWinner: true,
      },
      player2: {
        id: 'taylor-fritz',
        name: 'Taylor Fritz',
        countryCode: 'USA',
        seed: 12,
        seedLabel: '12',
        avatarUrl: '/images/players/taylor-fritz.jpg',
        sets: [3, 4, 5],
        isWinner: false,
      },
    },
  },

  // =========================================================================
  // 2. US OPEN 2024 - WOMEN'S SINGLES DRAW (WTA)
  // =========================================================================
  {
    id: 'us-open-2024-wta',
    tournamentId: 'us-open',
    tournamentName: 'US Open',
    edition: '2024 Women\'s Singles Championship Draw',
    year: 2024,
    tour: 'WTA',
    surface: 'Hard',
    surfaceSpeed: 'Fast',
    venue: 'USTA Billie Jean King National Tennis Center, New York',
    quarterfinals: [
      {
        id: 'uso-24-w-qf-1',
        round: 'Quarterfinal',
        matchNumber: 1,
        court: 'Arthur Ashe Stadium',
        date: 'Sep 3, 2024',
        status: 'Final',
        scoreDisplay: '6-1, 6-2',
        player1: {
          id: 'aryna-sabalenka',
          name: 'Aryna Sabalenka',
          countryCode: 'INT',
          seed: 2,
          seedLabel: '2',
          avatarUrl: '/images/players/aryna-sabalenka.jpg',
          sets: [6, 6],
          isWinner: true,
        },
        player2: {
          id: 'zheng-qinwen',
          name: 'Zheng Qinwen',
          countryCode: 'CHN',
          seed: 7,
          seedLabel: '7',
          avatarUrl: '/images/players/zheng-qinwen.jpg',
          sets: [1, 2],
          isWinner: false,
        },
      },
      {
        id: 'uso-24-w-qf-2',
        round: 'Quarterfinal',
        matchNumber: 2,
        court: 'Arthur Ashe Stadium',
        date: 'Sep 3, 2024',
        status: 'Final',
        scoreDisplay: '6-2, 7-5',
        player1: {
          id: 'emma-navarro',
          name: 'Emma Navarro',
          countryCode: 'USA',
          seed: 13,
          seedLabel: '13',
          avatarUrl: '/images/players/emma-navarro.jpg',
          sets: [6, 7],
          isWinner: true,
        },
        player2: {
          id: 'paula-badosa',
          name: 'Paula Badosa',
          countryCode: 'ESP',
          seed: 26,
          seedLabel: '26',
          avatarUrl: '/images/players/paula-badosa.jpg',
          sets: [2, 5],
          isWinner: false,
        },
      },
      {
        id: 'uso-24-w-qf-3',
        round: 'Quarterfinal',
        matchNumber: 3,
        court: 'Arthur Ashe Stadium',
        date: 'Sep 4, 2024',
        status: 'Final',
        scoreDisplay: '6-2, 6-4',
        player1: {
          id: 'jessica-pegula',
          name: 'Jessica Pegula',
          countryCode: 'USA',
          seed: 6,
          seedLabel: '6',
          avatarUrl: '/images/players/jessica-pegula.jpg',
          sets: [6, 6],
          isWinner: true,
        },
        player2: {
          id: 'iga-swiatek',
          name: 'Iga Świątek',
          countryCode: 'POL',
          seed: 1,
          seedLabel: '1',
          avatarUrl: '/images/players/iga-swiatek.jpg',
          sets: [2, 4],
          isWinner: false,
        },
      },
      {
        id: 'uso-24-w-qf-4',
        round: 'Quarterfinal',
        matchNumber: 4,
        court: 'Arthur Ashe Stadium',
        date: 'Sep 4, 2024',
        status: 'Final',
        scoreDisplay: '6-3, 6-2',
        player1: {
          id: 'karolina-muchova',
          name: 'Karolina Muchova',
          countryCode: 'CZE',
          seedLabel: 'PR',
          sets: [6, 6],
          isWinner: true,
        },
        player2: {
          id: 'danielle-collins',
          name: 'Danielle Collins',
          countryCode: 'USA',
          seed: 9,
          seedLabel: '9',
          avatarUrl: '/images/players/danielle-collins.jpg',
          sets: [3, 2],
          isWinner: false,
        },
      },
    ],
    semifinals: [
      {
        id: 'uso-24-w-sf-1',
        round: 'Semifinal',
        matchNumber: 1,
        court: 'Arthur Ashe Stadium',
        date: 'Sep 5, 2024',
        status: 'Final',
        scoreDisplay: '6-3, 7-6(2)',
        player1: {
          id: 'aryna-sabalenka',
          name: 'Aryna Sabalenka',
          countryCode: 'INT',
          seed: 2,
          seedLabel: '2',
          avatarUrl: '/images/players/aryna-sabalenka.jpg',
          sets: [6, 7],
          isWinner: true,
        },
        player2: {
          id: 'emma-navarro',
          name: 'Emma Navarro',
          countryCode: 'USA',
          seed: 13,
          seedLabel: '13',
          avatarUrl: '/images/players/emma-navarro.jpg',
          sets: [3, 6],
          isWinner: false,
        },
      },
      {
        id: 'uso-24-w-sf-2',
        round: 'Semifinal',
        matchNumber: 2,
        court: 'Arthur Ashe Stadium',
        date: 'Sep 5, 2024',
        status: 'Final',
        scoreDisplay: '1-6, 6-4, 6-2',
        player1: {
          id: 'jessica-pegula',
          name: 'Jessica Pegula',
          countryCode: 'USA',
          seed: 6,
          seedLabel: '6',
          avatarUrl: '/images/players/jessica-pegula.jpg',
          sets: [1, 6, 6],
          isWinner: true,
        },
        player2: {
          id: 'karolina-muchova',
          name: 'Karolina Muchova',
          countryCode: 'CZE',
          seedLabel: 'PR',
          sets: [6, 4, 2],
          isWinner: false,
        },
      },
    ],
    final: {
      id: 'uso-24-w-final',
      round: 'Championship Final',
      matchNumber: 1,
      court: 'Arthur Ashe Stadium',
      date: 'Sep 7, 2024',
      status: 'Final',
      scoreDisplay: '7-5, 7-5',
      player1: {
        id: 'aryna-sabalenka',
        name: 'Aryna Sabalenka',
        countryCode: 'INT',
        seed: 2,
        seedLabel: '2',
        avatarUrl: '/images/players/aryna-sabalenka.jpg',
        sets: [7, 7],
        isWinner: true,
      },
      player2: {
        id: 'jessica-pegula',
        name: 'Jessica Pegula',
        countryCode: 'USA',
        seed: 6,
        seedLabel: '6',
        avatarUrl: '/images/players/jessica-pegula.jpg',
        sets: [5, 5],
        isWinner: false,
      },
    },
  },

  // =========================================================================
  // 3. ROLAND GARROS 2024 - MEN'S SINGLES DRAW (ATP)
  // =========================================================================
  {
    id: 'roland-garros-2024-atp',
    tournamentId: 'roland-garros',
    tournamentName: 'Roland Garros',
    edition: '2024 Men\'s Singles Championship Draw',
    year: 2024,
    tour: 'ATP',
    surface: 'Clay',
    surfaceSpeed: 'Slow',
    venue: 'Stade Roland Garros, Paris',
    quarterfinals: [
      {
        id: 'rg-24-qf-1',
        round: 'Quarterfinal',
        matchNumber: 1,
        court: 'Court Philippe-Chatrier',
        date: 'Jun 4, 2024',
        status: 'Final',
        scoreDisplay: '6-2, 6-4, 7-6(3)',
        player1: {
          id: 'jannik-sinner',
          name: 'Jannik Sinner',
          countryCode: 'ITA',
          seed: 2,
          seedLabel: '2',
          avatarUrl: '/images/players/jannik-sinner.jpg',
          sets: [6, 6, 7],
          isWinner: true,
        },
        player2: {
          id: 'grigor-dimitrov',
          name: 'Grigor Dimitrov',
          countryCode: 'BUL',
          seed: 10,
          seedLabel: '10',
          sets: [2, 4, 6],
          isWinner: false,
        },
      },
      {
        id: 'rg-24-qf-2',
        round: 'Quarterfinal',
        matchNumber: 2,
        court: 'Court Philippe-Chatrier',
        date: 'Jun 4, 2024',
        status: 'Final',
        scoreDisplay: '6-3, 7-6(3), 6-4',
        player1: {
          id: 'carlos-alcaraz',
          name: 'Carlos Alcaraz',
          countryCode: 'ESP',
          seed: 3,
          seedLabel: '3',
          avatarUrl: '/images/players/carlos-alcaraz.jpg',
          sets: [6, 7, 6],
          isWinner: true,
        },
        player2: {
          id: 'stefanos-tsitsipas',
          name: 'Stefanos Tsitsipas',
          countryCode: 'GRE',
          seed: 9,
          seedLabel: '9',
          avatarUrl: '/images/players/stefanos-tsitsipas.jpg',
          sets: [3, 6, 4],
          isWinner: false,
        },
      },
      {
        id: 'rg-24-qf-3',
        round: 'Quarterfinal',
        matchNumber: 3,
        court: 'Court Suzanne-Lenglen',
        date: 'Jun 5, 2024',
        status: 'Final',
        scoreDisplay: '6-4, 7-6(5), 6-4',
        player1: {
          id: 'alexander-zverev',
          name: 'Alexander Zverev',
          countryCode: 'GER',
          seed: 4,
          seedLabel: '4',
          avatarUrl: '/images/players/alexander-zverev.jpg',
          sets: [6, 7, 6],
          isWinner: true,
        },
        player2: {
          id: 'alex-de-minaur',
          name: 'Alex de Minaur',
          countryCode: 'AUS',
          seed: 11,
          seedLabel: '11',
          avatarUrl: '/images/players/alex-de-minaur.jpg',
          sets: [4, 6, 4],
          isWinner: false,
        },
      },
      {
        id: 'rg-24-qf-4',
        round: 'Quarterfinal',
        matchNumber: 4,
        court: 'Court Philippe-Chatrier',
        date: 'Jun 5, 2024',
        status: 'Final',
        scoreDisplay: 'Walkover (Meniscus tear)',
        player1: {
          id: 'casper-ruud',
          name: 'Casper Ruud',
          countryCode: 'NOR',
          seed: 7,
          seedLabel: '7',
          avatarUrl: '/images/players/casper-ruud.jpg',
          sets: ['W/O'],
          isWinner: true,
        },
        player2: {
          id: 'novak-djokovic',
          name: 'Novak Djokovic',
          countryCode: 'SRB',
          seed: 1,
          seedLabel: '1',
          avatarUrl: '/images/players/novak-djokovic.jpg',
          sets: ['W/D'],
          isWinner: false,
        },
      },
    ],
    semifinals: [
      {
        id: 'rg-24-sf-1',
        round: 'Semifinal',
        matchNumber: 1,
        court: 'Court Philippe-Chatrier',
        date: 'Jun 7, 2024',
        status: 'Final',
        scoreDisplay: '2-6, 6-3, 3-6, 6-4, 6-3',
        player1: {
          id: 'carlos-alcaraz',
          name: 'Carlos Alcaraz',
          countryCode: 'ESP',
          seed: 3,
          seedLabel: '3',
          avatarUrl: '/images/players/carlos-alcaraz.jpg',
          sets: [2, 6, 3, 6, 6],
          isWinner: true,
        },
        player2: {
          id: 'jannik-sinner',
          name: 'Jannik Sinner',
          countryCode: 'ITA',
          seed: 2,
          seedLabel: '2',
          avatarUrl: '/images/players/jannik-sinner.jpg',
          sets: [6, 3, 6, 4, 3],
          isWinner: false,
        },
      },
      {
        id: 'rg-24-sf-2',
        round: 'Semifinal',
        matchNumber: 2,
        court: 'Court Philippe-Chatrier',
        date: 'Jun 7, 2024',
        status: 'Final',
        scoreDisplay: '2-6, 6-2, 6-4, 6-2',
        player1: {
          id: 'alexander-zverev',
          name: 'Alexander Zverev',
          countryCode: 'GER',
          seed: 4,
          seedLabel: '4',
          avatarUrl: '/images/players/alexander-zverev.jpg',
          sets: [2, 6, 6, 6],
          isWinner: true,
        },
        player2: {
          id: 'casper-ruud',
          name: 'Casper Ruud',
          countryCode: 'NOR',
          seed: 7,
          seedLabel: '7',
          avatarUrl: '/images/players/casper-ruud.jpg',
          sets: [6, 2, 4, 2],
          isWinner: false,
        },
      },
    ],
    final: {
      id: 'rg-24-final',
      round: 'Championship Final',
      matchNumber: 1,
      court: 'Court Philippe-Chatrier',
      date: 'Jun 9, 2024',
      status: 'Final',
      scoreDisplay: '6-3, 2-6, 5-7, 6-1, 6-2',
      player1: {
        id: 'carlos-alcaraz',
        name: 'Carlos Alcaraz',
        countryCode: 'ESP',
        seed: 3,
        seedLabel: '3',
        avatarUrl: '/images/players/carlos-alcaraz.jpg',
        sets: [6, 2, 5, 6, 6],
        isWinner: true,
      },
      player2: {
        id: 'alexander-zverev',
        name: 'Alexander Zverev',
        countryCode: 'GER',
        seed: 4,
        seedLabel: '4',
        avatarUrl: '/images/players/alexander-zverev.jpg',
        sets: [3, 6, 7, 1, 2],
        isWinner: false,
      },
    },
  },

  // =========================================================================
  // 4. WIMBLEDON 2024 - MEN'S SINGLES DRAW (ATP)
  // =========================================================================
  {
    id: 'wimbledon-2024-atp',
    tournamentId: 'wimbledon',
    tournamentName: 'The Championships, Wimbledon',
    edition: '2024 Gentlemen\'s Singles Championship Draw',
    year: 2024,
    tour: 'ATP',
    surface: 'Grass',
    surfaceSpeed: 'Fast',
    venue: 'All England Lawn Tennis Club, London',
    quarterfinals: [
      {
        id: 'wim-24-qf-1',
        round: 'Quarterfinal',
        matchNumber: 1,
        court: 'Centre Court',
        date: 'Jul 9, 2024',
        status: 'Final',
        scoreDisplay: '6-7(7), 6-4, 7-6(4), 2-6, 6-3',
        player1: {
          id: 'daniil-medvedev',
          name: 'Daniil Medvedev',
          countryCode: 'INT',
          seed: 5,
          seedLabel: '5',
          avatarUrl: '/images/players/daniil-medvedev.jpg',
          sets: [6, 6, 7, 2, 6],
          isWinner: true,
        },
        player2: {
          id: 'jannik-sinner',
          name: 'Jannik Sinner',
          countryCode: 'ITA',
          seed: 1,
          seedLabel: '1',
          avatarUrl: '/images/players/jannik-sinner.jpg',
          sets: [7, 4, 6, 6, 3],
          isWinner: false,
        },
      },
      {
        id: 'wim-24-qf-2',
        round: 'Quarterfinal',
        matchNumber: 2,
        court: 'No. 1 Court',
        date: 'Jul 9, 2024',
        status: 'Final',
        scoreDisplay: '5-7, 6-4, 6-2, 6-2',
        player1: {
          id: 'carlos-alcaraz',
          name: 'Carlos Alcaraz',
          countryCode: 'ESP',
          seed: 3,
          seedLabel: '3',
          avatarUrl: '/images/players/carlos-alcaraz.jpg',
          sets: [5, 6, 6, 6],
          isWinner: true,
        },
        player2: {
          id: 'tommy-paul',
          name: 'Tommy Paul',
          countryCode: 'USA',
          seed: 12,
          seedLabel: '12',
          avatarUrl: '/images/players/tommy-paul.jpg',
          sets: [7, 4, 2, 2],
          isWinner: false,
        },
      },
      {
        id: 'wim-24-qf-3',
        round: 'Quarterfinal',
        matchNumber: 3,
        court: 'Centre Court',
        date: 'Jul 10, 2024',
        status: 'Final',
        scoreDisplay: 'Walkover (Hip injury)',
        player1: {
          id: 'novak-djokovic',
          name: 'Novak Djokovic',
          countryCode: 'SRB',
          seed: 2,
          seedLabel: '2',
          avatarUrl: '/images/players/novak-djokovic.jpg',
          sets: ['W/O'],
          isWinner: true,
        },
        player2: {
          id: 'alex-de-minaur',
          name: 'Alex de Minaur',
          countryCode: 'AUS',
          seed: 9,
          seedLabel: '9',
          avatarUrl: '/images/players/alex-de-minaur.jpg',
          sets: ['W/D'],
          isWinner: false,
        },
      },
      {
        id: 'wim-24-qf-4',
        round: 'Quarterfinal',
        matchNumber: 4,
        court: 'No. 1 Court',
        date: 'Jul 10, 2024',
        status: 'Final',
        scoreDisplay: '6-4, 7-6(4), 4-6, 7-6(3)',
        player1: {
          id: 'lorenzo-musetti',
          name: 'Lorenzo Musetti',
          countryCode: 'ITA',
          seed: 25,
          seedLabel: '25',
          sets: [6, 7, 4, 7],
          isWinner: true,
        },
        player2: {
          id: 'taylor-fritz',
          name: 'Taylor Fritz',
          countryCode: 'USA',
          seed: 13,
          seedLabel: '13',
          avatarUrl: '/images/players/taylor-fritz.jpg',
          sets: [4, 6, 6, 6],
          isWinner: false,
        },
      },
    ],
    semifinals: [
      {
        id: 'wim-24-sf-1',
        round: 'Semifinal',
        matchNumber: 1,
        court: 'Centre Court',
        date: 'Jul 12, 2024',
        status: 'Final',
        scoreDisplay: '6-7(1), 6-3, 6-4, 6-4',
        player1: {
          id: 'carlos-alcaraz',
          name: 'Carlos Alcaraz',
          countryCode: 'ESP',
          seed: 3,
          seedLabel: '3',
          avatarUrl: '/images/players/carlos-alcaraz.jpg',
          sets: [6, 6, 6, 6],
          isWinner: true,
        },
        player2: {
          id: 'daniil-medvedev',
          name: 'Daniil Medvedev',
          countryCode: 'INT',
          seed: 5,
          seedLabel: '5',
          avatarUrl: '/images/players/daniil-medvedev.jpg',
          sets: [7, 3, 4, 4],
          isWinner: false,
        },
      },
      {
        id: 'wim-24-sf-2',
        round: 'Semifinal',
        matchNumber: 2,
        court: 'Centre Court',
        date: 'Jul 12, 2024',
        status: 'Final',
        scoreDisplay: '6-4, 7-6(2), 6-4',
        player1: {
          id: 'novak-djokovic',
          name: 'Novak Djokovic',
          countryCode: 'SRB',
          seed: 2,
          seedLabel: '2',
          avatarUrl: '/images/players/novak-djokovic.jpg',
          sets: [6, 7, 6],
          isWinner: true,
        },
        player2: {
          id: 'lorenzo-musetti',
          name: 'Lorenzo Musetti',
          countryCode: 'ITA',
          seed: 25,
          seedLabel: '25',
          sets: [4, 6, 4],
          isWinner: false,
        },
      },
    ],
    final: {
      id: 'wim-24-final',
      round: 'Championship Final',
      matchNumber: 1,
      court: 'Centre Court',
      date: 'Jul 14, 2024',
      status: 'Final',
      scoreDisplay: '6-2, 6-2, 7-6(4)',
      player1: {
        id: 'carlos-alcaraz',
        name: 'Carlos Alcaraz',
        countryCode: 'ESP',
        seed: 3,
        seedLabel: '3',
        avatarUrl: '/images/players/carlos-alcaraz.jpg',
        sets: [6, 6, 7],
        isWinner: true,
      },
      player2: {
        id: 'novak-djokovic',
        name: 'Novak Djokovic',
        countryCode: 'SRB',
        seed: 2,
        seedLabel: '2',
        avatarUrl: '/images/players/novak-djokovic.jpg',
        sets: [2, 2, 6],
        isWinner: false,
      },
    },
  },

  // =========================================================================
  // 5. AUSTRALIAN OPEN 2024 - MEN'S SINGLES DRAW (ATP)
  // =========================================================================
  {
    id: 'australian-open-2024-atp',
    tournamentId: 'australian-open',
    tournamentName: 'Australian Open',
    edition: '2024 Men\'s Singles Championship Draw',
    year: 2024,
    tour: 'ATP',
    surface: 'Hard',
    surfaceSpeed: 'Fast',
    venue: 'Melbourne Park, Melbourne',
    quarterfinals: [
      {
        id: 'ao-24-qf-1',
        round: 'Quarterfinal',
        matchNumber: 1,
        court: 'Rod Laver Arena',
        date: 'Jan 23, 2024',
        status: 'Final',
        scoreDisplay: '7-6(3), 4-6, 6-2, 6-3',
        player1: {
          id: 'novak-djokovic',
          name: 'Novak Djokovic',
          countryCode: 'SRB',
          seed: 1,
          seedLabel: '1',
          avatarUrl: '/images/players/novak-djokovic.jpg',
          sets: [7, 4, 6, 6],
          isWinner: true,
        },
        player2: {
          id: 'taylor-fritz',
          name: 'Taylor Fritz',
          countryCode: 'USA',
          seed: 12,
          seedLabel: '12',
          avatarUrl: '/images/players/taylor-fritz.jpg',
          sets: [6, 6, 2, 3],
          isWinner: false,
        },
      },
      {
        id: 'ao-24-qf-2',
        round: 'Quarterfinal',
        matchNumber: 2,
        court: 'Rod Laver Arena',
        date: 'Jan 23, 2024',
        status: 'Final',
        scoreDisplay: '6-4, 7-6(5), 6-3',
        player1: {
          id: 'jannik-sinner',
          name: 'Jannik Sinner',
          countryCode: 'ITA',
          seed: 4,
          seedLabel: '4',
          avatarUrl: '/images/players/jannik-sinner.jpg',
          sets: [6, 7, 6],
          isWinner: true,
        },
        player2: {
          id: 'andrey-rublev',
          name: 'Andrey Rublev',
          countryCode: 'INT',
          seed: 5,
          seedLabel: '5',
          avatarUrl: '/images/players/andrey-rublev.jpg',
          sets: [4, 6, 3],
          isWinner: false,
        },
      },
      {
        id: 'ao-24-qf-3',
        round: 'Quarterfinal',
        matchNumber: 3,
        court: 'Rod Laver Arena',
        date: 'Jan 24, 2024',
        status: 'Final',
        scoreDisplay: '7-6(4), 3-6, 6-3, 5-7, 6-4',
        player1: {
          id: 'daniil-medvedev',
          name: 'Daniil Medvedev',
          countryCode: 'INT',
          seed: 3,
          seedLabel: '3',
          avatarUrl: '/images/players/daniil-medvedev.jpg',
          sets: [7, 3, 6, 5, 6],
          isWinner: true,
        },
        player2: {
          id: 'hubert-hurkacz',
          name: 'Hubert Hurkacz',
          countryCode: 'POL',
          seed: 9,
          seedLabel: '9',
          sets: [6, 6, 3, 7, 4],
          isWinner: false,
        },
      },
      {
        id: 'ao-24-qf-4',
        round: 'Quarterfinal',
        matchNumber: 4,
        court: 'Rod Laver Arena',
        date: 'Jan 24, 2024',
        status: 'Final',
        scoreDisplay: '6-1, 6-3, 6-7(2), 6-4',
        player1: {
          id: 'alexander-zverev',
          name: 'Alexander Zverev',
          countryCode: 'GER',
          seed: 6,
          seedLabel: '6',
          avatarUrl: '/images/players/alexander-zverev.jpg',
          sets: [6, 6, 6, 6],
          isWinner: true,
        },
        player2: {
          id: 'carlos-alcaraz',
          name: 'Carlos Alcaraz',
          countryCode: 'ESP',
          seed: 2,
          seedLabel: '2',
          avatarUrl: '/images/players/carlos-alcaraz.jpg',
          sets: [1, 3, 7, 4],
          isWinner: false,
        },
      },
    ],
    semifinals: [
      {
        id: 'ao-24-sf-1',
        round: 'Semifinal',
        matchNumber: 1,
        court: 'Rod Laver Arena',
        date: 'Jan 26, 2024',
        status: 'Final',
        scoreDisplay: '6-1, 6-2, 6-7(6), 6-3',
        player1: {
          id: 'jannik-sinner',
          name: 'Jannik Sinner',
          countryCode: 'ITA',
          seed: 4,
          seedLabel: '4',
          avatarUrl: '/images/players/jannik-sinner.jpg',
          sets: [6, 6, 6, 6],
          isWinner: true,
        },
        player2: {
          id: 'novak-djokovic',
          name: 'Novak Djokovic',
          countryCode: 'SRB',
          seed: 1,
          seedLabel: '1',
          avatarUrl: '/images/players/novak-djokovic.jpg',
          sets: [1, 2, 7, 3],
          isWinner: false,
        },
      },
      {
        id: 'ao-24-sf-2',
        round: 'Semifinal',
        matchNumber: 2,
        court: 'Rod Laver Arena',
        date: 'Jan 26, 2024',
        status: 'Final',
        scoreDisplay: '5-7, 3-6, 7-6(4), 7-6(5), 6-3',
        player1: {
          id: 'daniil-medvedev',
          name: 'Daniil Medvedev',
          countryCode: 'INT',
          seed: 3,
          seedLabel: '3',
          avatarUrl: '/images/players/daniil-medvedev.jpg',
          sets: [5, 3, 7, 7, 6],
          isWinner: true,
        },
        player2: {
          id: 'alexander-zverev',
          name: 'Alexander Zverev',
          countryCode: 'GER',
          seed: 6,
          seedLabel: '6',
          avatarUrl: '/images/players/alexander-zverev.jpg',
          sets: [7, 6, 6, 6, 3],
          isWinner: false,
        },
      },
    ],
    final: {
      id: 'ao-24-final',
      round: 'Championship Final',
      matchNumber: 1,
      court: 'Rod Laver Arena',
      date: 'Jan 28, 2024',
      status: 'Final',
      scoreDisplay: '3-6, 3-6, 6-4, 6-4, 6-3',
      player1: {
        id: 'jannik-sinner',
        name: 'Jannik Sinner',
        countryCode: 'ITA',
        seed: 4,
        seedLabel: '4',
        avatarUrl: '/images/players/jannik-sinner.jpg',
        sets: [3, 3, 6, 6, 6],
        isWinner: true,
      },
      player2: {
        id: 'daniil-medvedev',
        name: 'Daniil Medvedev',
        countryCode: 'INT',
        seed: 3,
        seedLabel: '3',
        avatarUrl: '/images/players/daniil-medvedev.jpg',
        sets: [6, 6, 4, 4, 3],
        isWinner: false,
      },
    },
  },
];


import { FullTournamentBracket } from "../types/tennis";

export const FULL_TOURNAMENT_BRACKETS: FullTournamentBracket[] = [
  // =========================================================================
  // AUSTRALIAN OPEN - OFFICIAL 128-DRAW CHAMPIONSHIP TREE (from screenshot)
  // =========================================================================
  {
    id: "australian-open-full-tree",
    name: "Australian Open",
    year: 2026,
    tour: "ATP",
    surface: "Hard",
    venue: "Melbourne Park, Melbourne",
    champion: {
      name: "A. Zverev",
      seedLabel: "[1]",
      countryCode: "GER",
      prizeMoney: "$5,500,000",
    },
    rounds: [
      { title: "ROUND 1", prizeMoney: "$140,000" },
      { title: "ROUND 2", prizeMoney: "$190,000" },
      { title: "ROUND 3", prizeMoney: "$290,000" },
      { title: "ROUND 4", prizeMoney: "$480,000" },
      { title: "QUARTER-FINALS", prizeMoney: "$780,000" },
      { title: "SEMI-FINALS", prizeMoney: "$1,450,000" },
      { title: "FINAL", prizeMoney: "RUNNER-UP: $2,800,000" }
    ],
    matchesByRound: [
      // ROUND 1 (10 sampled section matches from official draw)
      [
        {
          id: "ao-r1-1",
          roundIndex: 0,
          winner: "player1",
          player1: {
            id: "alexander-zverev",
            name: "Alexander Zverev",
            shortName: "A. Zverev",
            countryCode: "GER",
            seed: 1,
            seedLabel: "[1]",
            avatarUrl: "/images/players/alexander-zverev.jpg",
            isWinner: true,
            scores: [
              { games: 6 },
              { games: 3 },
              { games: 6, tiebreak: 7 },
              { games: 7 },
              { games: 6 }
            ]
          },
          player2: {
            name: "Lorenzo Sonego",
            shortName: "L. Sonego",
            countryCode: "ITA",
            avatarUrl: "/images/players/jannik-sinner.jpg",
            isWinner: false,
            scores: [
              { games: 4 },
              { games: 6 },
              { games: 7, tiebreak: 9 },
              { games: 5 },
              { games: 4 }
            ]
          }
        },
        {
          id: "ao-r1-2",
          roundIndex: 0,
          winner: "player1",
          player1: {
            name: "Quentin Halys",
            shortName: "Q. Halys",
            countryCode: "FRA",
            isWinner: true,
            scores: [
              { games: 6 },
              { games: 7 },
              { games: 6, tiebreak: 7 },
              { games: 6 }
            ]
          },
          player2: {
            name: "Facundo Diaz Acosta",
            shortName: "F. Diaz Acosta",
            countryCode: "ARG",
            isWinner: false,
            scores: [
              { games: 4 },
              { games: 5 },
              { games: 7, tiebreak: 9 },
              { games: 1 }
            ]
          }
        },
        {
          id: "ao-r1-3",
          roundIndex: 0,
          winner: "player2",
          player1: {
            name: "Grigor Dimitrov",
            shortName: "G. Dimitrov",
            countryCode: "BUL",
            isWinner: false,
            scores: [
              { games: 6 },
              { games: 3 },
              { games: 2 },
              { games: 4 }
            ]
          },
          player2: {
            name: "Alexei Popyrin",
            shortName: "A. Popyrin",
            countryCode: "AUS",
            isWinner: true,
            scores: [
              { games: 3 },
              { games: 6 },
              { games: 6 },
              { games: 6 }
            ]
          }
        },
        {
          id: "ao-r1-4",
          roundIndex: 0,
          winner: "player2",
          player1: {
            name: "Yannick Hanfmann",
            shortName: "Y. Hanfmann",
            countryCode: "GER",
            isWinner: false,
            scores: [
              { games: 3 },
              { games: 2 },
              { games: 7, tiebreak: 9 },
              { games: 3 }
            ]
          },
          player2: {
            name: "Alejandro Tabilo",
            shortName: "A. Tabilo",
            countryCode: "CHI",
            seed: 25,
            seedLabel: "[25]",
            isWinner: true,
            scores: [
              { games: 6 },
              { games: 6 },
              { games: 6, tiebreak: 7 },
              { games: 6 }
            ]
          }
        },
        {
          id: "ao-r1-5",
          roundIndex: 0,
          winner: "player1",
          player1: {
            name: "Luciano Darderi",
            shortName: "L. Darderi",
            countryCode: "ITA",
            seed: 21,
            seedLabel: "[21]",
            isWinner: true,
            scores: [
              { games: 6 },
              { games: 3 },
              { games: 6 },
              { games: 7 }
            ]
          },
          player2: {
            name: "Harry Wendelken",
            shortName: "H. Wendelken",
            countryCode: "GBR",
            isWinner: false,
            scores: [
              { games: 2 },
              { games: 6 },
              { games: 2 },
              { games: 5 }
            ]
          }
        },
        {
          id: "ao-r1-6",
          roundIndex: 0,
          winner: "player1",
          player1: {
            name: "Dalibor Svrcina",
            shortName: "D. Svrčina",
            countryCode: "CZE",
            isWinner: true,
            scores: [
              { games: 6 },
              { games: 6 },
              { games: 5 },
              { games: 5 },
              { games: 6 }
            ]
          },
          player2: {
            name: "Valentin Royer",
            shortName: "V. Royer",
            countryCode: "FRA",
            isWinner: false,
            scores: [
              { games: 4 },
              { games: 3 },
              { games: 7 },
              { games: 7 },
              { games: 2 }
            ]
          }
        },
        {
          id: "ao-r1-7",
          roundIndex: 0,
          winner: "player1",
          player1: {
            name: "Dane Sweeny",
            shortName: "D. Sweeny",
            countryCode: "AUS",
            isWinner: true,
            scores: [
              { games: 7, tiebreak: 7 },
              { games: 6 },
              { games: 3 }
            ]
          },
          player2: {
            name: "Corentin Moutet",
            shortName: "C. Moutet",
            countryCode: "FRA",
            isWinner: false,
            scores: [
              { games: 6, tiebreak: 4 },
              { games: 4 },
              { games: 0 }
            ]
          }
        },
        {
          id: "ao-r1-8",
          roundIndex: 0,
          winner: "player2",
          player1: {
            name: "Arthur Fery",
            shortName: "A. Fery",
            countryCode: "GBR",
            isWinner: false,
            scores: [
              { games: 3 },
              { games: 3 },
              { games: 5 }
            ]
          },
          player2: {
            name: "Lorenzo Musetti",
            shortName: "L. Musetti",
            countryCode: "ITA",
            seed: 13,
            seedLabel: "[13]",
            isWinner: true,
            scores: [
              { games: 6 },
              { games: 6 },
              { games: 7 }
            ]
          }
        },
        {
          id: "ao-r1-9",
          roundIndex: 0,
          winner: "player2",
          player1: {
            name: "Rafael Jodar",
            shortName: "R. Jodar",
            countryCode: "ESP",
            seed: 12,
            seedLabel: "[12]",
            isWinner: false,
            scores: [
              { games: 2 },
              { games: 1 },
              { games: 1 }
            ]
          },
          player2: {
            name: "Yunchaokete Bu",
            shortName: "Y. Bu",
            countryCode: "CHN",
            isWinner: true,
            scores: [
              { games: 6 },
              { games: 6 },
              { games: 6 }
            ]
          }
        },
        {
          id: "ao-r1-10",
          roundIndex: 0,
          winner: "player2",
          player1: {
            name: "Fabian Marozsan",
            shortName: "F. Marozsan",
            countryCode: "HUN",
            isWinner: false,
            scores: [
              { games: 4 },
              { games: 4 },
              { games: 2 }
            ]
          },
          player2: {
            name: "Michael Zheng",
            shortName: "M. Zheng",
            countryCode: "USA",
            isWinner: true,
            scores: [
              { games: 6 },
              { games: 6 },
              { games: 6 }
            ]
          }
        }
      ],

      // ROUND 2
      [
        {
          id: "ao-r2-1",
          roundIndex: 1,
          winner: "player1",
          player1: {
            id: "alexander-zverev",
            name: "Alexander Zverev",
            shortName: "A. Zverev",
            countryCode: "GER",
            seed: 1,
            seedLabel: "[1]",
            avatarUrl: "/images/players/alexander-zverev.jpg",
            isWinner: true,
            scores: [
              { games: 6 },
              { games: 4 },
              { games: 7, tiebreak: 7 },
              { games: 6, tiebreak: 3 },
              { games: 6 }
            ]
          },
          player2: {
            name: "Quentin Halys",
            shortName: "Q. Halys",
            countryCode: "FRA",
            isWinner: false,
            scores: [
              { games: 4 },
              { games: 6 },
              { games: 6, tiebreak: 3 },
              { games: 7, tiebreak: 7 },
              { games: 3 }
            ]
          }
        },
        {
          id: "ao-r2-2",
          roundIndex: 1,
          winner: "player2",
          player1: {
            name: "Alexei Popyrin",
            shortName: "A. Popyrin",
            countryCode: "AUS",
            isWinner: false,
            scores: [
              { games: 6 },
              { games: 6, tiebreak: 4 },
              { games: 6, tiebreak: 3 },
              { games: 2 }
            ]
          },
          player2: {
            name: "Alejandro Tabilo",
            shortName: "A. Tabilo",
            countryCode: "CHI",
            seed: 25,
            seedLabel: "[25]",
            isWinner: true,
            scores: [
              { games: 2 },
              { games: 7, tiebreak: 7 },
              { games: 7, tiebreak: 7 },
              { games: 6 }
            ]
          }
        },
        {
          id: "ao-r2-3",
          roundIndex: 1,
          winner: "player1",
          player1: {
            name: "Luciano Darderi",
            shortName: "L. Darderi",
            countryCode: "ITA",
            seed: 21,
            seedLabel: "[21]",
            isWinner: true,
            scores: [
              { games: 6 },
              { games: 6, tiebreak: 5 },
              { games: 6 },
              { games: 6 }
            ]
          },
          player2: {
            name: "Dalibor Svrcina",
            shortName: "D. Svrčina",
            countryCode: "CZE",
            isWinner: false,
            scores: [
              { games: 3 },
              { games: 7, tiebreak: 7 },
              { games: 4 },
              { games: 4 }
            ]
          }
        },
        {
          id: "ao-r2-4",
          roundIndex: 1,
          winner: "player1",
          player1: {
            name: "Dane Sweeny",
            shortName: "D. Sweeny",
            countryCode: "AUS",
            isWinner: true,
            scores: [
              { games: 3 },
              { games: 6 },
              { games: 6 },
              { games: 6 }
            ]
          },
          player2: {
            name: "Lorenzo Musetti",
            shortName: "L. Musetti",
            countryCode: "ITA",
            seed: 13,
            seedLabel: "[13]",
            isWinner: false,
            scores: [
              { games: 6 },
              { games: 1 },
              { games: 2 },
              { games: 2 }
            ]
          }
        },
        {
          id: "ao-r2-5",
          roundIndex: 1,
          winner: "player2",
          player1: {
            name: "Yunchaokete Bu",
            shortName: "Y. Bu",
            countryCode: "CHN",
            isWinner: false,
            scores: [
              { games: 3 },
              { games: 6 },
              { games: 2 },
              { games: 3 }
            ]
          },
          player2: {
            name: "Michael Zheng",
            shortName: "M. Zheng",
            countryCode: "USA",
            isWinner: true,
            scores: [
              { games: 6 },
              { games: 2 },
              { games: 6 },
              { games: 6 }
            ]
          }
        }
      ],

      // ROUND 3
      [
        {
          id: "ao-r3-1",
          roundIndex: 2,
          winner: "player1",
          player1: {
            id: "alexander-zverev",
            name: "Alexander Zverev",
            shortName: "A. Zverev",
            countryCode: "GER",
            seed: 1,
            seedLabel: "[1]",
            avatarUrl: "/images/players/alexander-zverev.jpg",
            isWinner: true,
            scores: [
              { games: 6 },
              { games: 7, tiebreak: 7 },
              { games: 6 }
            ]
          },
          player2: {
            name: "Alejandro Tabilo",
            shortName: "A. Tabilo",
            countryCode: "CHI",
            seed: 25,
            seedLabel: "[25]",
            isWinner: false,
            scores: [
              { games: 2 },
              { games: 6, tiebreak: 2 },
              { games: 2 }
            ]
          }
        },
        {
          id: "ao-r3-2",
          roundIndex: 2,
          winner: "player1",
          player1: {
            name: "Luciano Darderi",
            shortName: "L. Darderi",
            countryCode: "ITA",
            seed: 21,
            seedLabel: "[21]",
            isWinner: true,
            scores: [
              { games: 6 },
              { games: 6 },
              { games: 6 }
            ]
          },
          player2: {
            name: "Dane Sweeny",
            shortName: "D. Sweeny",
            countryCode: "AUS",
            isWinner: false,
            scores: [
              { games: 4 },
              { games: 3 },
              { games: 3 }
            ]
          }
        },
        {
          id: "ao-r3-3",
          roundIndex: 2,
          winner: "player1",
          player1: {
            name: "Botic van de Zandschulp",
            shortName: "B. van de Za...",
            countryCode: "NED",
            isWinner: true,
            scores: [
              { games: 6 },
              { games: 6 },
              { games: 6 }
            ]
          },
          player2: {
            name: "Michael Zheng",
            shortName: "M. Zheng",
            countryCode: "USA",
            isWinner: false,
            scores: [
              { games: 6, tiebreak: 7 },
              { games: 6 },
              { games: 6 },
              { games: 3 },
              { games: 2 }
            ]
          }
        }
      ],

      // ROUND 4
      [
        {
          id: "ao-r4-1",
          roundIndex: 3,
          winner: "player1",
          player1: {
            id: "alexander-zverev",
            name: "Alexander Zverev",
            shortName: "A. Zverev",
            countryCode: "GER",
            seed: 1,
            seedLabel: "[1]",
            avatarUrl: "/images/players/alexander-zverev.jpg",
            isWinner: true,
            scores: [
              { games: 6 },
              { games: 6 },
              { games: 7, tiebreak: 7 }
            ]
          },
          player2: {
            name: "Luciano Darderi",
            shortName: "L. Darderi",
            countryCode: "ITA",
            seed: 21,
            seedLabel: "[21]",
            isWinner: false,
            scores: [
              { games: 2 },
              { games: 2 },
              { games: 6, tiebreak: 3 }
            ]
          }
        }
      ],

      // QUARTER-FINALS
      [
        {
          id: "ao-qf-1",
          roundIndex: 4,
          winner: "player1",
          player1: {
            id: "alexander-zverev",
            name: "Alexander Zverev",
            shortName: "A. Zverev",
            countryCode: "GER",
            seed: 1,
            seedLabel: "[1]",
            avatarUrl: "/images/players/alexander-zverev.jpg",
            isWinner: true,
            scores: [
              { games: 6 },
              { games: 7 },
              { games: 6 }
            ]
          },
          player2: {
            name: "Botic van de Zandschulp",
            shortName: "B. van de Za...",
            countryCode: "NED",
            isWinner: false,
            scores: [
              { games: 2 },
              { games: 5 },
              { games: 1 }
            ]
          }
        }
      ],

      // SEMI-FINALS
      [
        {
          id: "ao-sf-1",
          roundIndex: 5,
          winner: "player1",
          player1: {
            id: "alexander-zverev",
            name: "Alexander Zverev",
            shortName: "A. Zverev",
            countryCode: "GER",
            seed: 1,
            seedLabel: "[1]",
            avatarUrl: "/images/players/alexander-zverev.jpg",
            isWinner: true,
            scores: [
              { games: 6 },
              { games: 7, tiebreak: 9 },
              { games: 7, tiebreak: 8 }
            ]
          },
          player2: {
            name: "Karen Khachanov",
            shortName: "K. Khachanov",
            countryCode: "INT",
            isWinner: false,
            scores: [
              { games: 3 },
              { games: 6, tiebreak: 7 },
              { games: 6, tiebreak: 6 }
            ]
          }
        },
        {
          id: "ao-sf-2",
          roundIndex: 5,
          winner: "player2",
          player1: {
            name: "Frances Tiafoe",
            shortName: "F. Tiafoe",
            countryCode: "USA",
            seed: 11,
            seedLabel: "[11]",
            isWinner: false,
            scores: [
              { games: 6 },
              { games: 3 },
              { games: 3 },
              { games: 5 }
            ]
          },
          player2: {
            id: "ben-shelton",
            name: "Ben Shelton",
            shortName: "B. Shelton",
            countryCode: "USA",
            seed: 8,
            seedLabel: "[8]",
            avatarUrl: "/images/players/ben-shelton.jpg",
            isWinner: true,
            scores: [
              { games: 4 },
              { games: 6 },
              { games: 6 },
              { games: 7 }
            ]
          }
        }
      ],

      // FINAL
      [
        {
          id: "ao-final-1",
          roundIndex: 6,
          player1: {
            id: "alexander-zverev",
            name: "Alexander Zverev",
            shortName: "A. Zverev",
            countryCode: "GER",
            seed: 1,
            seedLabel: "[1]",
            avatarUrl: "/images/players/alexander-zverev.jpg",
            isWinner: false,
            scores: []
          },
          player2: {
            id: "ben-shelton",
            name: "Ben Shelton",
            shortName: "B. Shelton",
            countryCode: "USA",
            seed: 8,
            seedLabel: "[8]",
            avatarUrl: "/images/players/ben-shelton.jpg",
            isWinner: false,
            scores: []
          }
        }
      ]
    ]
  }
];
