import React, { useState, useMemo } from 'react';
import { TournamentScheduleItem, Surface, Player } from '../types/tennis';
import { SeasonKey, SEASONS_DATA } from '../services/seasonThemeService';
import { FULL_CALENDAR_SCHEDULE } from '../data/fullCalendarData';
import { TournamentDrawsView } from './TournamentDrawsView';
import {
  Trophy,
  MapPin,
  Calendar,
  Users,
  Search
} from 'lucide-react';

interface TournamentsViewProps {
  tournaments?: any[];
  currentSeason?: SeasonKey;
  onSelectPlayer?: (player: Player) => void;
}

type TierFilter =
  | 'ALL'
  | 'Grand Slam'
  | 'ATP Masters 1000'
  | 'WTA 1000'
  | '500 Series'
  | 'Year-End Finals';

type TourFilter = 'ALL' | 'ATP' | 'WTA' | 'COMBINED';

const TOURNAMENT_PHOTOS: Record<string, string> = {
  'australian-open': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
  'roland-garros': 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=600&auto=format&fit=crop&q=80',
  'wimbledon': 'https://images.unsplash.com/photo-1560012057-4372e14c5085?w=600&auto=format&fit=crop&q=80',
  'us-open': 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=600&auto=format&fit=crop&q=80',
};

const DEFAULT_SURFACE_PHOTOS: Record<Surface, string> = {
  'Hard': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
  'Clay': 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=600&auto=format&fit=crop&q=80',
  'Grass': 'https://images.unsplash.com/photo-1560012057-4372e14c5085?w=600&auto=format&fit=crop&q=80',
};

const COUNTRY_ISO_MAP: Record<string, string> = {
  'Australia': 'AUS',
  'France': 'FRA',
  'United Kingdom': 'GBR',
  'United States': 'USA',
  'USA': 'USA',
  'Italy': 'ITA',
  'Spain': 'ESP',
  'Germany': 'GER',
  'Canada': 'CAN',
  'China': 'CHN',
  'Japan': 'JPN',
  'Monaco': 'MON',
  'Switzerland': 'SUI',
  'Austria': 'AUT',
  'Netherlands': 'NED',
  'United Arab Emirates': 'UAE',
  'Qatar': 'QAT',
  'Saudi Arabia': 'KSA',
};

const getCountryCode = (country: string): string => {
  if (!country) return 'INT';
  if (COUNTRY_ISO_MAP[country]) return COUNTRY_ISO_MAP[country];
  return country.length <= 3 ? country.toUpperCase() : country.slice(0, 3).toUpperCase();
};

export const TournamentsView: React.FC<TournamentsViewProps> = ({ 
  tournaments: customTournaments,
  currentSeason = 'hard',
  onSelectPlayer,
}) => {
  const [viewMode, setViewMode] = useState<'calendar' | 'draws'>('calendar');
  const [selectedTier, setSelectedTier] = useState<TierFilter>('ALL');
  const [selectedSurface, setSelectedSurface] = useState<Surface | 'ALL'>('ALL');
  const [selectedTour, setSelectedTour] = useState<TourFilter>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const activeSeasonData = SEASONS_DATA[currentSeason];

  // Use full 2026 calendar dataset as default
  const scheduleData: TournamentScheduleItem[] = useMemo(() => {
    if (customTournaments && customTournaments.length > 0 && 'startDate' in customTournaments[0]) {
      return customTournaments as TournamentScheduleItem[];
    }
    return FULL_CALENDAR_SCHEDULE;
  }, [customTournaments]);

  // Filtered tournament schedule
  const filteredSchedule = useMemo(() => {
    return scheduleData
      .filter((t) => {
        const q = searchQuery.toLowerCase().trim();
        const matchesQuery =
          !q ||
          t.name.toLowerCase().includes(q) ||
          t.city.toLowerCase().includes(q) ||
          t.country.toLowerCase().includes(q) ||
          t.venue.toLowerCase().includes(q) ||
          (t.defendingChampions?.singlesMen && t.defendingChampions.singlesMen.toLowerCase().includes(q)) ||
          (t.defendingChampions?.singlesWomen && t.defendingChampions.singlesWomen.toLowerCase().includes(q)) ||
          (t.defendingChampions?.singles && t.defendingChampions.singles.toLowerCase().includes(q));

        let matchesTier = true;
        if (selectedTier === 'Grand Slam') {
          matchesTier = t.tier === 'Grand Slam';
        } else if (selectedTier === 'ATP Masters 1000') {
          matchesTier = t.tier === 'ATP Masters 1000';
        } else if (selectedTier === 'WTA 1000') {
          matchesTier = t.tier === 'WTA 1000';
        } else if (selectedTier === '500 Series') {
          matchesTier = t.tier === 'ATP 500' || t.tier === 'WTA 500';
        } else if (selectedTier === 'Year-End Finals') {
          matchesTier = t.tier === 'ATP Finals' || t.tier === 'WTA Finals';
        }

        const matchesSurface = selectedSurface === 'ALL' || t.surface === selectedSurface;

        let matchesTour = true;
        if (selectedTour === 'ATP') {
          matchesTour = t.tour === 'ATP' || t.tour === 'COMBINED' || t.tour === 'ATP & WTA';
        } else if (selectedTour === 'WTA') {
          matchesTour = t.tour === 'WTA' || t.tour === 'COMBINED' || t.tour === 'ATP & WTA';
        } else if (selectedTour === 'COMBINED') {
          matchesTour = t.tour === 'COMBINED' || t.tour === 'ATP & WTA';
        }

        return matchesQuery && matchesTier && matchesSurface && matchesTour;
      })
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  }, [scheduleData, searchQuery, selectedTier, selectedSurface, selectedTour]);

  const getVenuePhoto = (t: TournamentScheduleItem) => {
    if (TOURNAMENT_PHOTOS[t.id]) return TOURNAMENT_PHOTOS[t.id];
    return DEFAULT_SURFACE_PHOTOS[t.surface] || DEFAULT_SURFACE_PHOTOS['Hard'];
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      
      {/* View Mode Segmented Switch: Calendar vs Draws & Brackets */}
      <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-black/40 border border-white/[0.08] w-fit">
        <button
          onClick={() => setViewMode('calendar')}
          className={`px-4 py-2 rounded-xl text-xs font-mono transition ${
            viewMode === 'calendar'
              ? 'bg-white/[0.12] text-white border border-white/20 shadow-sm font-semibold'
              : 'text-white/45 hover:text-white'
          }`}
        >
          Tour Calendar Schedule
        </button>
        <button
          onClick={() => setViewMode('draws')}
          className={`px-4 py-2 rounded-xl text-xs font-mono transition ${
            viewMode === 'draws'
              ? 'bg-white/[0.12] text-white border border-white/20 shadow-sm font-semibold'
              : 'text-white/45 hover:text-white'
          }`}
        >
          Official Draws & Brackets
        </button>
      </div>

      {viewMode === 'draws' ? (
        <TournamentDrawsView onSelectPlayer={onSelectPlayer} />
      ) : (
        <>
          {/* Header & Controls Banner in Double-Bezel Concentric Shell */}
          <div className="double-bezel-card-outer">
            <div className="double-bezel-card-inner p-6 sm:p-8 relative overflow-hidden bg-gradient-to-b from-[#0e1219] to-[#080b0f]">
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-theme-accent" />
                    <span className="font-mono text-xs uppercase tracking-widest text-theme-accent font-semibold">
                      Official 2026 Circuit Schedule
                    </span>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-white/[0.04] text-white/60 border border-white/[0.08]">
                      {activeSeasonData.name} Active
                    </span>
                  </div>
                  <h1 className="font-display font-semibold text-2xl sm:text-4xl text-white tracking-tight">
                    Grand Slam & World Tour Calendar
                  </h1>
                  <p className="text-xs sm:text-sm text-white/60 mt-1 max-w-2xl font-normal">
                    Comprehensive schedule of all 4 Grand Slams, 9 ATP Masters 1000, 10 WTA 1000s, 500 Series, and Year-End Championship Finals.
                  </p>
                </div>

                {/* Quick Scheduled Stats */}
                <div className="flex items-center gap-3 self-start md:self-auto">
                  <div className="bg-black/40 border border-white/[0.08] rounded-xl px-4 py-2.5 text-center">
                    <div className="font-mono tabular-nums text-xl font-semibold text-white">{filteredSchedule.length}</div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-white/40">Tournaments</div>
                  </div>
                </div>
              </div>

              {/* Filter Controls Bar */}
              <div className="mt-6 pt-6 border-t border-white/[0.06] space-y-4">
                
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/35" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search tournaments by name, host city, venue, or defending champion..."
                    className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-white/[0.08] focus:border-white/20 rounded-xl pl-9 pr-8 py-2 text-xs text-white placeholder-white/35 focus:outline-none transition font-sans"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-white/40 hover:text-white"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Tier & Surface Filters */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                  
                  {/* Tier Filters */}
                  <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                    {[
                      { id: 'ALL', label: 'All Tiers' },
                      { id: 'Grand Slam', label: 'Grand Slams (4)' },
                      { id: 'ATP Masters 1000', label: 'ATP Masters 1000' },
                      { id: 'WTA 1000', label: 'WTA 1000' },
                      { id: '500 Series', label: '500 Series' },
                      { id: 'Year-End Finals', label: 'Year-End Finals' },
                    ].map((tier) => {
                      const isSelected = selectedTier === tier.id;
                      return (
                        <button
                          key={tier.id}
                          onClick={() => setSelectedTier(tier.id as TierFilter)}
                          className={`px-3 py-1.5 rounded-full text-xs font-mono font-medium whitespace-nowrap transition border ${
                            isSelected
                              ? 'bg-white/[0.1] text-white border-white/20 shadow-sm'
                              : 'bg-white/[0.02] hover:bg-white/[0.05] text-white/50 border-white/[0.06]'
                          }`}
                        >
                          {tier.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Surface & Tour Selectors */}
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex bg-white/[0.02] rounded-xl p-0.5 border border-white/[0.06] text-xs font-mono">
                      {(['ALL', 'Hard', 'Clay', 'Grass'] as const).map((surf) => (
                        <button
                          key={surf}
                          onClick={() => setSelectedSurface(surf)}
                          className={`px-2.5 py-1 rounded-lg transition ${
                            selectedSurface === surf
                              ? 'bg-white/[0.1] text-white border border-white/20 shadow-sm'
                              : 'text-white/40 hover:text-white'
                          }`}
                        >
                          {surf}
                        </button>
                      ))}
                    </div>

                    <div className="flex bg-white/[0.02] rounded-xl p-0.5 border border-white/[0.06] text-xs font-mono">
                      {(['ALL', 'COMBINED', 'ATP', 'WTA'] as const).map((tour) => (
                        <button
                          key={tour}
                          onClick={() => setSelectedTour(tour)}
                          className={`px-2.5 py-1 rounded-lg transition ${
                            selectedTour === tour
                              ? 'bg-white/[0.1] text-white border border-white/20 shadow-sm'
                              : 'text-white/40 hover:text-white'
                          }`}
                        >
                          {tour}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chronological Tournament Cards Grid: Concentric Double-Bezel + Real Tennis Court Photography */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredSchedule.length === 0 ? (
              <div className="col-span-full rounded-2xl bg-white/[0.02] border border-white/[0.06] p-12 text-center">
                <h3 className="text-base font-semibold text-white mb-2">No tournaments match the selected filters</h3>
                <p className="text-xs text-white/50 max-w-md mx-auto mb-4 font-mono">
                  Try choosing "All Tiers", "All Surfaces", or resetting your search term.
                </p>
                <button
                  onClick={() => {
                    setSelectedTier('ALL');
                    setSelectedSurface('ALL');
                    setSelectedTour('ALL');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 rounded-full bg-white text-black hover:bg-white/90 font-medium text-xs transition"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              filteredSchedule.map((t) => {
                const cleanDates = t.dates.replace(/[\u2013\u2014]/g, '-');
                const countryCode = getCountryCode(t.country);
                const venuePhoto = getVenuePhoto(t);

                return (
                  <div key={t.id} className="double-bezel-card-outer group">
                    <div className="double-bezel-card-inner p-5 sm:p-6 relative overflow-hidden bg-gradient-to-b from-[#0c1015] to-[#080a0d] flex flex-col justify-between h-full">
                      
                      {/* Subtle Tennis Court Venue Backdrop Vignette */}
                      <div className="absolute top-0 right-0 w-48 h-36 overflow-hidden opacity-10 pointer-events-none filter blur-lg group-hover:opacity-15 transition-opacity">
                        <img src={venuePhoto} alt="" className="w-full h-full object-cover" />
                      </div>

                      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

                      <div className="relative z-10">
                        {/* Top Row: Date, Tier & Surface Badges */}
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                          <span className="flex items-center gap-1.5 text-xs text-theme-accent font-mono font-medium bg-black/40 px-2.5 py-1 rounded-full border border-white/[0.08]">
                            <Calendar className="w-3 h-3 text-theme-accent" />
                            <span>{cleanDates}</span>
                          </span>

                          <div className="flex items-center gap-1.5 text-[10px] font-mono">
                            <span className="px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/80">
                              {t.surface} Court
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-white/60">
                              {t.tier}
                            </span>
                          </div>
                        </div>

                        {/* Tournament Title & Venue with ISO Country Code */}
                        <div className="flex items-start gap-3.5 mb-3">
                          {/* Venue Photo Thumbnail */}
                          <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/[0.1] bg-black/50 shrink-0 shadow-sm">
                            <img 
                              src={venuePhoto} 
                              alt={t.name} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h2 className="font-display font-semibold text-lg sm:text-xl text-white group-hover:text-theme-accent transition-colors tracking-tight truncate">
                                {t.name}
                              </h2>
                              <span className="font-mono text-[10px] text-white/50 px-1.5 py-0.2 rounded border border-white/[0.08]">
                                {countryCode}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-white/50 mt-0.5 font-normal truncate">
                              <MapPin className="w-3 h-3 text-white/40 shrink-0" />
                              <span>{t.venue} ({t.city}, {t.country})</span>
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        {t.description && (
                          <p className="text-xs text-white/60 leading-relaxed mb-4 font-normal">
                            {t.description}
                          </p>
                        )}

                        {/* Specs Matrix */}
                        <div className="grid grid-cols-3 gap-2 bg-black/40 rounded-xl p-3 border border-white/[0.06] text-center mb-4">
                          <div>
                            <span className="text-[9px] uppercase tracking-wider text-white/35 font-mono block mb-0.5">
                              Prize Purse
                            </span>
                            <span className="text-xs font-mono font-semibold text-white/90">
                              {t.prizeMoney}
                            </span>
                          </div>

                          <div className="border-x border-white/[0.06]">
                            <span className="text-[9px] uppercase tracking-wider text-white/35 font-mono block mb-0.5">
                              Winner Pts
                            </span>
                            <span className="text-xs font-mono font-semibold text-theme-accent">
                              +{t.winnerPoints.toLocaleString()}
                            </span>
                          </div>

                          <div>
                            <span className="text-[9px] uppercase tracking-wider text-white/35 font-mono block mb-0.5">
                              Draw Size
                            </span>
                            <span className="text-xs font-mono font-medium text-white/80 flex items-center justify-center gap-1">
                              <Users className="w-3 h-3 text-white/40" />
                              <span>{t.drawSize}</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Defending Champions Banner */}
                      <div className="bg-white/[0.02] rounded-xl p-3 border border-white/[0.06] text-xs relative z-10">
                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-white/50 uppercase tracking-widest mb-1.5">
                          <Trophy className="w-3 h-3 text-theme-accent" />
                          <span>Defending Champions</span>
                        </div>

                        {t.defendingChampions && (
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                            {t.defendingChampions.singlesMen && (
                              <div className="flex items-center gap-1.5">
                                <span className="font-mono text-[10px] text-white/40 uppercase">Men:</span>
                                <span className="font-medium text-white/90">{t.defendingChampions.singlesMen}</span>
                              </div>
                            )}
                            {t.defendingChampions.singlesWomen && (
                              <div className="flex items-center gap-1.5">
                                <span className="font-mono text-[10px] text-white/40 uppercase">Women:</span>
                                <span className="font-medium text-white/90">{t.defendingChampions.singlesWomen}</span>
                              </div>
                            )}
                            {t.defendingChampions.singles && (
                              <div className="flex items-center gap-1.5">
                                <span className="font-mono text-[10px] text-white/40 uppercase">Singles:</span>
                                <span className="font-medium text-white/90">{t.defendingChampions.singles}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                    </div>
                  </div>
                );
              })
            )}
          </div>
        </>
      )}

    </div>
  );
};

export default TournamentsView;
