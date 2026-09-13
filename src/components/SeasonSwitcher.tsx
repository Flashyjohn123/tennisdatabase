import React, { useState, useRef, useEffect } from 'react';
import {
  SeasonKey,
  SeasonPreference,
  SEASONS_DATA,
  getCalendarSeason,
} from '../services/seasonThemeService';
import { Check, ChevronDown, Calendar, Trophy, Sparkles } from 'lucide-react';

interface SeasonSwitcherProps {
  currentSeason: SeasonKey;
  seasonPreference: SeasonPreference;
  onSelectPreference: (pref: SeasonPreference) => void;
  dropUp?: boolean;
  align?: 'left' | 'right';
}

export const SeasonSwitcher: React.FC<SeasonSwitcherProps> = ({
  currentSeason,
  seasonPreference,
  onSelectPreference,
  dropUp = true,
  align = 'left',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeSeasonData = SEASONS_DATA[currentSeason];
  const calendarSeasonKey = getCalendarSeason();
  const calendarSeasonData = SEASONS_DATA[calendarSeasonKey];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (pref: SeasonPreference) => {
    onSelectPreference(pref);
    setIsOpen(false);
  };

  const getSurfaceAbbr = (key: SeasonKey): string => {
    if (key === 'grass') return 'GRS';
    if (key === 'clay') return 'CLY';
    return 'HRD';
  };

  return (
    <div className="relative" ref={containerRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-white/20 transition-all text-xs font-mono text-white/90 group"
        title="Surface Season Palette"
        aria-label="Surface Season Theme Selector"
        aria-expanded={isOpen}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-theme-accent" />
        <span className="font-medium text-white/90 hidden sm:inline">
          {activeSeasonData.shortName}
        </span>
        <span className="sm:hidden font-medium">
          {getSurfaceAbbr(currentSeason)}
        </span>
        {seasonPreference === 'auto' && (
          <span className="text-[8px] font-mono uppercase px-1 py-0.2 rounded bg-white/[0.06] text-white/50 border border-white/[0.08] hidden md:inline">
            Auto
          </span>
        )}
        <ChevronDown
          className={`w-3 h-3 text-white/40 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-white' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute ${align === 'left' ? 'left-0' : 'right-0'} ${
            dropUp ? 'bottom-full mb-2' : 'top-full mt-2'
          } w-80 sm:w-88 max-w-[calc(100vw-2rem)] max-h-[min(520px,80vh)] overflow-y-auto rounded-2xl bg-[#0c1015] border border-white/[0.1] shadow-2xl z-50 p-3 animate-fadeIn backdrop-blur-2xl`}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/[0.07] px-1.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/50">
              Surface Season Engine
            </span>
            <span className="text-[9px] font-mono text-white/40">
              Live Calendar Sync
            </span>
          </div>

          {/* Auto Mode Option */}
          <div className="mb-2">
            <button
              onClick={() => handleSelect('auto')}
              className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                seasonPreference === 'auto'
                  ? 'bg-white/[0.08] border-white/20'
                  : 'bg-white/[0.02] border-white/[0.05] hover:border-white/[0.12] hover:bg-white/[0.04]'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-xs font-mono text-theme-accent flex-shrink-0">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-white">Auto (Real Calendar Window)</span>
                    <span className="text-[8px] font-mono uppercase px-1.5 py-0.2 rounded bg-white/[0.06] text-white/60 border border-white/[0.08]">
                      Active
                    </span>
                  </div>
                  <p className="text-[10px] text-white/50 mt-0.5">
                    Currently: <strong className="text-white/80 font-normal">{calendarSeasonData.name}</strong> ({calendarSeasonData.tagline})
                  </p>
                </div>
              </div>

              {seasonPreference === 'auto' && (
                <div className="w-4 h-4 rounded-full bg-white/20 text-white flex items-center justify-center text-xs flex-shrink-0">
                  <Check className="w-2.5 h-2.5" />
                </div>
              )}
            </button>
          </div>

          {/* Section Divider */}
          <div className="px-1.5 py-1 text-[9px] uppercase font-mono tracking-wider text-white/35">
            Manual Season Selection
          </div>

          {/* 3 Manual Surface Season Options */}
          <div className="space-y-1.5 mt-1">
            {(['hard', 'clay', 'grass'] as SeasonKey[]).map((key) => {
              const season = SEASONS_DATA[key];
              const isSelected = seasonPreference === key;
              const isCalendarActive = calendarSeasonKey === key;
              const cleanDate = season.dateRangeText.replace(/[\u2013\u2014]/g, '-');

              return (
                <button
                  key={key}
                  onClick={() => handleSelect(key)}
                  className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                    isSelected
                      ? 'bg-white/[0.08] border-white/20 shadow-sm'
                      : 'bg-white/[0.015] border-white/[0.05] hover:border-white/[0.1] hover:bg-white/[0.03]'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-xs font-mono font-medium text-theme-accent flex-shrink-0">
                      {getSurfaceAbbr(key)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-white">{season.name}</span>
                        {isCalendarActive && (
                          <span className="text-[8px] font-mono uppercase px-1 rounded bg-white/[0.05] text-white/50 border border-white/[0.08]">
                            Calendar
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-white/45 mt-0.5 font-normal">
                        {season.tagline}
                      </p>

                      <div className="flex flex-wrap items-center gap-2.5 mt-1 text-[9px] text-white/40 font-mono">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-2.5 h-2.5 text-white/30" />
                          {cleanDate}
                        </span>
                        <span className="flex items-center gap-1">
                          <Trophy className="w-2.5 h-2.5 text-theme-accent/60" />
                          {season.activeSlams.join(', ')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="w-4 h-4 rounded-full bg-white/20 text-white flex items-center justify-center text-xs flex-shrink-0">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Footer note */}
          <div className="mt-2.5 pt-2 border-t border-white/[0.06] px-1.5 flex items-center justify-between text-[9px] font-mono text-white/35">
            <span>Themes adapt surfaces & borders</span>
            <span>ATP & WTA 2026</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeasonSwitcher;
