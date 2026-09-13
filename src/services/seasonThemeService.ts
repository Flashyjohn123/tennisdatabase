export type SeasonKey = 'hard' | 'clay' | 'grass';
export type SeasonPreference = 'auto' | SeasonKey;

export interface SeasonInfo {
  id: SeasonKey;
  name: string;
  shortName: string;
  surface: 'Hard' | 'Clay' | 'Grass';
  icon: string;
  badgeEmoji: string;
  accentColor: string;
  tagline: string;
  dateRangeText: string;
  activeSlams: string[];
  majorTournaments: string[];
  description: string;
  ambientGlowColors: [string, string];
}

export const SEASONS_DATA: Record<SeasonKey, SeasonInfo> = {
  hard: {
    id: 'hard',
    name: 'Hard Court Season',
    shortName: 'Hard Court',
    surface: 'Hard',
    icon: '🔵',
    badgeEmoji: '⚡',
    accentColor: '#0284c7',
    tagline: 'Australian Open & US Open Blue',
    dateRangeText: 'Jan - Early Apr & Mid Jul - Dec',
    activeSlams: ['Australian Open', 'US Open'],
    majorTournaments: ['Australian Open', 'Indian Wells (BNP Paribas Open)', 'Miami Open', 'Canadian Open', 'Cincinnati Open', 'US Open', 'Shanghai Masters', 'ATP/WTA Finals'],
    description: 'High-speed hard court action spanning Melbourne, Flushing Meadows, and the world tour indoors.',
    ambientGlowColors: ['rgba(2, 132, 199, 0.18)', 'rgba(56, 189, 248, 0.14)'],
  },
  clay: {
    id: 'clay',
    name: 'Clay Court Season',
    shortName: 'Clay Court',
    surface: 'Clay',
    icon: '🟠',
    badgeEmoji: '🧱',
    accentColor: '#ea580c',
    tagline: 'Roland-Garros Terracotta Clay',
    dateRangeText: 'Early Apr - Early Jun',
    activeSlams: ['Roland-Garros (French Open)'],
    majorTournaments: ['Monte-Carlo Masters', 'Barcelona Open', 'Madrid Open', 'Italian Open (Rome)', 'Roland Garros'],
    description: 'The grueling red clay swing demanding supreme stamina, tactical sliding, and heavy topspin.',
    ambientGlowColors: ['rgba(234, 88, 12, 0.22)', 'rgba(249, 115, 22, 0.16)'],
  },
  grass: {
    id: 'grass',
    name: 'Grass Court Season',
    shortName: 'Grass Court',
    surface: 'Grass',
    icon: '🟢',
    badgeEmoji: '👑',
    accentColor: '#16a34a',
    tagline: 'The Championships Wimbledon & Royal Purple',
    dateRangeText: 'Early Jun - Mid Jul',
    activeSlams: ['Wimbledon'],
    majorTournaments: ["Queen's Club (Cinch Championships)", 'Halle Open (Terra Wortmann Open)', 'Stuttgart Open', 'Bad Homburg', 'Eastbourne International', 'The Championships Wimbledon'],
    description: 'The prestigious, lightning-fast lawn tennis swing culminating on the sacred turf of Centre Court.',
    ambientGlowColors: ['rgba(34, 197, 94, 0.18)', 'rgba(124, 58, 237, 0.18)'],
  },
};

const STORAGE_KEY = 'tennisdb_surface_season_preference';

/**
 * Computes the official calendar surface season for a given date.
 * - Clay Season: Approx April 6 (Month 3, Day 6) to June 7 (Month 5, Day 7)
 * - Grass Season: Approx June 8 (Month 5, Day 8) to July 19 (Month 6, Day 19)
 * - Hard Court Season: Remainder of the year (AO & spring hard courts, and post-Wimbledon US Open swing + indoors)
 */
export function getCalendarSeason(date: Date = new Date()): SeasonKey {
  const month = date.getMonth(); // 0 = Jan, 11 = Dec
  const day = date.getDate();

  // Clay season: April 6 through June 7
  if ((month === 3 && day >= 6) || month === 4 || (month === 5 && day <= 7)) {
    return 'clay';
  }

  // Grass season: June 8 through July 19
  if ((month === 5 && day >= 8) || (month === 6 && day <= 19)) {
    return 'grass';
  }

  // Hard court season: Jan 1 - Apr 5 & Jul 20 - Dec 31
  return 'hard';
}

/**
 * Retrieves the user's stored season preference ('auto', 'hard', 'clay', 'grass').
 */
export function getStoredSeasonPreference(): SeasonPreference {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'hard' || saved === 'clay' || saved === 'grass' || saved === 'auto') {
      return saved;
    }
  } catch (e) {
    console.error('Error reading season preference from localStorage', e);
  }
  return 'auto';
}

/**
 * Saves the user's season preference to localStorage.
 */
export function setStoredSeasonPreference(preference: SeasonPreference): void {
  try {
    localStorage.setItem(STORAGE_KEY, preference);
  } catch (e) {
    console.error('Error saving season preference to localStorage', e);
  }
}

/**
 * Resolves the effective active season key based on preference and calendar date.
 */
export function resolveActiveSeason(preference: SeasonPreference, date: Date = new Date()): SeasonKey {
  if (preference === 'auto') {
    return getCalendarSeason(date);
  }
  return preference;
}

/**
 * Sets the `data-surface-season` HTML attribute on document root for dynamic CSS theming.
 */
export function applySeasonThemeToDom(season: SeasonKey): void {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-surface-season', season);
  }
}
