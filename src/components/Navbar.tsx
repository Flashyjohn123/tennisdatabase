import React, { useState } from 'react';
import { Tour } from '../types/tennis';
import { SeasonKey, SeasonPreference } from '../services/seasonThemeService';
import { SeasonSwitcher } from './SeasonSwitcher';
import { IosAppWidgetModal } from './IosAppWidgetModal';
import { 
  Trophy, 
  Users, 
  Swords, 
  Award, 
  ListFilter, 
  Search, 
  Radio, 
  X,
  Compass,
  Menu,
  Activity,
  Smartphone,
  User
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export interface CommandRailProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedTour?: Tour | 'ALL';
  setSelectedTour?: (tour: Tour | 'ALL') => void;
  currentSeason: SeasonKey;
  seasonPreference: SeasonPreference;
  onSelectSeasonPreference: (pref: SeasonPreference) => void;
}

export interface CommandBarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onOpenSearchPalette?: () => void;
  onOpenAuthModal?: () => void;
  isSyncingLive?: boolean;
  lastSyncedLive?: string | null;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedTour: Tour | 'ALL';
  setSelectedTour: (tour: Tour | 'ALL') => void;
  currentSeason: SeasonKey;
  seasonPreference: SeasonPreference;
  onSelectSeasonPreference: (pref: SeasonPreference) => void;
}

// Geometric athletic intelligence emblem
const CircuitProLogo: React.FC = () => (
  <svg viewBox="0 0 28 28" fill="none" className="w-6 h-6 text-theme-accent" stroke="currentColor">
    <rect x="3" y="3" width="22" height="22" rx="6" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.8" />
    <path d="M7 14H21M14 7V21" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.3" strokeDasharray="2 2" />
    <circle cx="14" cy="14" r="5" stroke="currentColor" strokeWidth="1.2" />
    <circle cx="14" cy="14" r="1.5" fill="currentColor" />
  </svg>
);

export const NAV_ITEMS = [
  { id: 'overview', label: 'Center Court', sub: 'Analytics Dashboard', icon: Trophy },
  { id: 'live', label: 'Circuit Wire', sub: 'Live Feed & Intel', icon: Radio, isLive: true },
  { id: 'rankings', label: 'World Rankings', sub: 'ATP & WTA Top 500', icon: ListFilter },
  { id: 'tournaments', label: 'Grand Slam Calendar', sub: 'Tour Schedule', icon: Award },
  { id: 'players', label: 'Player Bios', sub: 'Athlete Database', icon: Users },
  { id: 'h2h', label: 'Head-to-Head Lab', sub: 'Comparative Matrix', icon: Swords },
  { id: 'matches', label: 'Championship Log', sub: 'Historic Finals', icon: Compass },
];

export const CommandRail: React.FC<CommandRailProps> = ({
  activeTab,
  setActiveTab,
  selectedTour = 'ALL',
  setSelectedTour,
  currentSeason,
  seasonPreference,
  onSelectSeasonPreference,
}) => {
  return (
    <aside className="w-64 xl:w-72 hidden lg:flex flex-col h-screen sticky top-0 bg-[#07080b] border-r border-white/[0.07] shrink-0 select-none z-30 justify-between">
      
      {/* Top Header & Navigation Links */}
      <div className="flex flex-col flex-1 min-h-0 overflow-y-auto no-scrollbar">
        
        {/* Brand Header */}
        <div className="h-16 px-5 border-b border-white/[0.07] flex items-center justify-between shrink-0">
          <div 
            onClick={() => setActiveTab('overview')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center group-hover:border-amber-200/30 transition-all">
              <CircuitProLogo />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold text-sm tracking-[0.12em] text-white">
                  CIRCUIT PRO
                </span>
                <span className="font-mono text-[9px] text-theme-accent font-semibold tracking-wider">
                  // 2026
                </span>
              </div>
              <p className="font-mono text-[9px] uppercase tracking-widest text-white/35 mt-0.5">
                Sports Intelligence Hub
              </p>
            </div>
          </div>
        </div>

        {/* Tour Filter (ATP / WTA / ALL) */}
        {setSelectedTour && (
          <div className="px-4 pt-3 pb-1">
            <div className="grid grid-cols-3 gap-1 p-0.5 rounded-lg bg-white/[0.02] border border-white/[0.06]">
              {(['ALL', 'ATP', 'WTA'] as const).map((tour) => {
                const isSelected = selectedTour === tour;
                return (
                  <button
                    key={tour}
                    onClick={() => setSelectedTour(tour)}
                    className={`py-1 rounded text-[11px] font-mono font-medium tracking-wider transition-all ${
                      isSelected
                        ? 'bg-white/[0.1] text-white border border-white/20 shadow-sm'
                        : 'text-white/40 hover:text-white/80 hover:bg-white/[0.02]'
                    }`}
                  >
                    {tour}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Main Navigation Sections */}
        <div className="px-3 py-3 flex-1">
          <div className="text-[9px] font-mono uppercase tracking-widest text-white/35 px-2 mb-2">
            Command Modules
          </div>
          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-all duration-200 group ${
                    isActive
                      ? 'bg-white/[0.07] border border-white/[0.12] text-white shadow-sm'
                      : 'text-white/55 hover:text-white hover:bg-white/[0.03] border border-transparent'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                    isActive
                      ? 'bg-white/[0.08] text-theme-accent border border-white/[0.08]'
                      : 'bg-white/[0.02] text-white/40 group-hover:text-white/80'
                  }`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-tech text-xs font-semibold tracking-wide truncate">
                        {item.label}
                      </span>
                      {item.isLive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                      )}
                    </div>
                    <span className="block font-mono text-[9px] text-white/35 truncate">
                      {item.sub}
                    </span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

      </div>

      {/* Rail Footer: Active Surface & System Health */}
      <div className="p-4 border-t border-white/[0.07] bg-[#050608] space-y-3">
        <div>
          <div className="text-[9px] font-mono uppercase tracking-widest text-white/35 mb-2 flex items-center justify-between">
            <span>Surface Dynamics</span>
            <Activity className="w-2.5 h-2.5 text-white/30" />
          </div>
          <SeasonSwitcher
            currentSeason={currentSeason}
            seasonPreference={seasonPreference}
            onSelectPreference={onSelectSeasonPreference}
          />
        </div>

        <div className="pt-2 border-t border-white/[0.05] flex items-center justify-between text-[10px] font-mono text-white/40">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Opta Feed Connected</span>
          </div>
          <span>v2026.4</span>
        </div>
      </div>

    </aside>
  );
};

export const CommandBar: React.FC<CommandBarProps> = ({
  searchQuery,
  setSearchQuery,
  onOpenSearchPalette,
  onOpenAuthModal,
  isSyncingLive,
  lastSyncedLive,
  activeTab,
  setActiveTab,
  selectedTour,
  setSelectedTour,
  currentSeason,
  seasonPreference,
  onSelectSeasonPreference,
}) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [showIosModal, setShowIosModal] = useState(false);
  const { user } = useAuth();

  return (
    <>
      <header className="h-16 sticky top-0 z-20 bg-[#07080b]/90 backdrop-blur-xl border-b border-white/[0.07] px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 shrink-0">
        
        {/* Mobile Left Drawer Toggle & Mobile Brand */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={() => setIsMobileOpen(true)}
            className="p-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-white/70 hover:text-white"
            aria-label="Toggle Command Rail"
          >
            <Menu className="w-4 h-4" />
          </button>

          <div 
            onClick={() => setActiveTab('overview')}
            className="flex items-center gap-2 cursor-pointer"
          >
            <CircuitProLogo />
            <span className="font-display font-bold text-xs tracking-wider text-white">
              CIRCUIT PRO
            </span>
          </div>
        </div>

        {/* Global Command Search Input */}
        <div className="flex-1 max-w-md hidden sm:block">
          <div 
            onClick={onOpenSearchPalette}
            className="relative group cursor-pointer"
          >
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="w-3.5 h-3.5 text-white/35 group-hover:text-theme-accent transition-colors" />
            </div>
            <input
              type="text"
              readOnly
              value={searchQuery}
              onClick={onOpenSearchPalette}
              placeholder="Search players, Grand Slams, tournaments... (Press / or Ctrl+K)"
              className="w-full cursor-pointer bg-white/[0.03] hover:bg-white/[0.05] focus:bg-white/[0.06] border border-white/[0.08] hover:border-theme-accent/40 rounded-full pl-9 pr-9 py-1.5 text-xs text-white/90 placeholder-white/35 focus:outline-none transition-all font-sans"
            />
            {searchQuery ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSearchQuery('');
                }}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/40 hover:text-white transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-[9px] font-mono text-white/30 px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.06]">
                  /
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Top Command Bar Actions: Telemetry Radar & Live Sync & User Auth */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Search Button */}
          <button
            onClick={onOpenSearchPalette}
            className="sm:hidden p-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-white/70"
            title="Search database"
          >
            <Search className="w-4 h-4 text-white/70" />
          </button>

          {/* User Account Button */}
          <button
            onClick={onOpenAuthModal}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-mono transition-all ${
              user
                ? 'bg-amber-400/10 border-amber-400/30 text-amber-300 hover:bg-amber-400/20'
                : 'bg-white/[0.03] border-white/[0.08] text-white/70 hover:text-white hover:bg-white/[0.06]'
            }`}
            title={user ? `Signed in as ${user.email}` : 'Sign in or sync account'}
          >
            <User className={`w-3 h-3 ${user ? 'text-amber-400' : 'text-white/50'}`} />
            <span className="hidden sm:inline text-[10px] font-medium tracking-wide">
              {user ? user.email.split('@')[0] : 'Sign In'}
            </span>
          </button>

          {/* iOS App & Widget Modal Trigger */}
          <button
            onClick={() => setShowIosModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-[11px] font-mono text-white/70 hover:text-white transition-all"
            title="Install on iPhone, iPad & Home Screen Widget"
          >
            <Smartphone className="w-3 h-3 text-sky-400" />
            <span className="hidden sm:inline text-[10px] font-medium tracking-wide">
              iOS App
            </span>
          </button>

          {/* Automatic Live Status Indicator */}
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-[11px] font-mono text-white/70"
            title={lastSyncedLive ? `Auto-synced ${new Date(lastSyncedLive).toLocaleTimeString()}` : 'Live auto-sync active'}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isSyncingLive ? 'bg-amber-400 animate-ping' : 'bg-emerald-400 animate-pulse'}`} />
            <span className="hidden md:inline text-[10px] font-medium tracking-wide">
              {isSyncingLive ? 'Syncing...' : 'Live Synced'}
            </span>
          </div>
        </div>

      </header>

      {/* Mobile Drawer Backdrop & Sidebar */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsMobileOpen(false)}
          />

          <div className="relative w-72 max-w-[85vw] bg-[#07080b] h-full flex flex-col z-10 border-r border-white/[0.1] p-4">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.07] mb-4">
              <div className="flex items-center gap-2.5">
                <CircuitProLogo />
                <div>
                  <span className="font-display font-bold text-xs tracking-wider text-white">
                    CIRCUIT PRO
                  </span>
                  <span className="block font-mono text-[9px] text-theme-accent">
                    2026 Edition
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-1 rounded-lg text-white/50 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Tour Switcher */}
            <div className="mb-4">
              <div className="text-[9px] font-mono uppercase tracking-widest text-white/35 mb-1.5">
                Tour Filter
              </div>
              <div className="grid grid-cols-3 gap-1 p-0.5 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                {(['ALL', 'ATP', 'WTA'] as const).map((tour) => (
                  <button
                    key={tour}
                    onClick={() => {
                      setSelectedTour(tour);
                      setIsMobileOpen(false);
                    }}
                    className={`py-1 rounded text-[11px] font-mono font-medium tracking-wider ${
                      selectedTour === tour
                        ? 'bg-white/[0.1] text-white border border-white/20'
                        : 'text-white/40'
                    }`}
                  >
                    {tour}
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation List */}
            <nav className="space-y-1 flex-1 overflow-y-auto">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-all ${
                      isActive
                        ? 'bg-white/[0.08] text-white border border-white/15'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-theme-accent" />
                    <div>
                      <span className="font-tech text-xs font-semibold block">
                        {item.label}
                      </span>
                      <span className="text-[9px] font-mono text-white/35 block">
                        {item.sub}
                      </span>
                    </div>
                  </button>
                );
              })}
            </nav>

            <div className="pt-3 border-t border-white/[0.07] mt-3 space-y-2">
              <button
                onClick={() => {
                  setIsMobileOpen(false);
                  setShowIosModal(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-white/80 hover:text-white hover:bg-white/[0.08] transition-all"
              >
                <Smartphone className="w-3.5 h-3.5 text-sky-400" />
                <span>Install on iPhone / iPad</span>
              </button>

              <SeasonSwitcher
                currentSeason={currentSeason}
                seasonPreference={seasonPreference}
                onSelectPreference={onSelectSeasonPreference}
              />
            </div>
          </div>
        </div>
      )}

      {/* iOS App & Widget Instructions Modal */}
      <IosAppWidgetModal
        isOpen={showIosModal}
        onClose={() => setShowIosModal(false)}
      />
    </>
  );
};

export const Navbar: React.FC<CommandRailProps & CommandBarProps> = (props) => {
  return (
    <>
      <CommandRail {...props} />
      <CommandBar {...props} />
    </>
  );
};

export default Navbar;
