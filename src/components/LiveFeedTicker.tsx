import React, { useState, useEffect } from 'react';
import { LiveFeedItem, Player } from '../types/tennis';
import { useLiveFeed } from '../services/liveFeedEngine';
import { playerService } from '../services/playerService';
import { decodeHtmlEntities } from '../services/rssFeedService';
import { 
  ChevronRight, 
  ChevronLeft, 
  Pause, 
  Play, 
  ArrowUpRight,
  Clock
} from 'lucide-react';

interface LiveFeedTickerProps {
  onOpenLiveNewsroom: () => void;
  onSelectPlayer?: (player: Player) => void;
}

export const LiveFeedTicker: React.FC<LiveFeedTickerProps> = ({
  onOpenLiveNewsroom,
  onSelectPlayer,
}) => {
  const { allItems } = useLiveFeed();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-cycle every 7 seconds if not paused
  useEffect(() => {
    if (isPaused || allItems.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % allItems.length);
    }, 7000);

    return () => clearInterval(timer);
  }, [isPaused, allItems.length]);

  const currentItem: LiveFeedItem | undefined = allItems[currentIndex];

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (allItems.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % allItems.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (allItems.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + allItems.length) % allItems.length);
    }
  };

  const handleItemClick = () => {
    if (!currentItem) return;

    if (onSelectPlayer && currentItem.playerNames && currentItem.playerNames.length > 0) {
      const player = playerService.getPlayerByName(currentItem.playerNames[0]);
      if (player) {
        onSelectPlayer(player);
        return;
      }
    }

    onOpenLiveNewsroom();
  };

  const handlePlayerTagClick = (e: React.MouseEvent, playerName: string) => {
    e.stopPropagation();
    if (onSelectPlayer) {
      const player = playerService.getPlayerByName(playerName);
      if (player) {
        onSelectPlayer(player);
        return;
      }
    }
    onOpenLiveNewsroom();
  };

  if (!currentItem) return null;

  // Format relative time (e.g. 5m ago, 2h ago)
  const getRelativeTime = (isoString: string) => {
    try {
      const diffMs = Date.now() - new Date(isoString).getTime();
      const diffMins = Math.max(1, Math.floor(diffMs / (1000 * 60)));
      if (diffMins < 60) return `${diffMins}m ago`;
      const diffHours = Math.floor(diffMins / 60);
      if (diffHours < 24) return `${diffHours}h ago`;
      const diffDays = Math.floor(diffHours / 24);
      return `${diffDays}d ago`;
    } catch {
      return 'Just now';
    }
  };

  // Understated category dispatch labels
  const getCategoryLabel = (category: string): string => {
    switch (category) {
      case 'injury':
        return 'Medical Advisory';
      case 'withdrawal':
        return 'Official Withdrawal';
      case 'controversy':
        return 'Circuit Inquiry';
      case 'tournament_update':
        return 'Tournament Intel';
      case 'match_result':
        return 'Match Score';
      default:
        return 'Circuit Dispatch';
    }
  };

  return (
    <div 
      className="bg-[#07090c]/90 backdrop-blur-md border-b border-white/[0.05] relative z-30 transition-all"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 sm:py-2">
        <div className="flex items-center justify-between gap-3 text-xs">
          
          {/* Understated Broadcast Indicator */}
          <button
            onClick={onOpenLiveNewsroom}
            className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-white font-mono text-[10px] tracking-wider uppercase transition-all flex-shrink-0 group"
            title="Open Live Newsroom Wire"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-theme-accent" />
            <span className="font-semibold text-white/80 group-hover:text-white transition-colors">
              Circuit Wire
            </span>
          </button>

          {/* Cycling Ticker Content */}
          <div 
            onClick={handleItemClick}
            className="flex-1 flex items-center gap-3 min-w-0 cursor-pointer overflow-hidden group py-0.5"
          >
            {/* Minimal Category Dispatch Tag */}
            <span className="hidden md:inline-block px-2 py-0.5 rounded border border-white/[0.08] bg-white/[0.02] text-[9px] font-mono uppercase tracking-widest text-white/45 flex-shrink-0">
              {getCategoryLabel(currentItem.category)}
            </span>

            {/* Headline Title */}
            <div className="truncate text-white/80 group-hover:text-theme-accent transition-colors text-xs font-normal flex items-center gap-2">
              <span className="truncate">{decodeHtmlEntities(currentItem.title)}</span>
            </div>

            {/* Tagged Players Pills (No Cartoon Emojis) */}
            {currentItem.playerNames && currentItem.playerNames.length > 0 && (
              <div className="hidden lg:flex items-center gap-1.5 flex-shrink-0">
                {currentItem.playerNames.slice(0, 2).map((pName) => (
                  <button
                    key={pName}
                    onClick={(e) => handlePlayerTagClick(e, pName)}
                    className="px-2 py-0.5 rounded-full bg-white/[0.03] hover:bg-white/[0.07] text-white/70 hover:text-white border border-white/[0.06] text-[10px] font-mono tracking-normal transition-all"
                  >
                    {pName}
                  </button>
                ))}
              </div>
            )}

            {/* Tabular Relative Timestamp */}
            <div className="hidden sm:flex items-center gap-1 text-white/35 text-[10px] font-mono tabular-nums flex-shrink-0">
              <Clock className="w-3 h-3 text-white/30" />
              <span>{getRelativeTime(currentItem.timestamp)}</span>
            </div>
          </div>

          {/* Controls & Understated Button-in-Button Wire Link */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {/* Prev / Pause / Next Controls */}
            <div className="flex items-center gap-0.5 p-0.5 rounded-full bg-white/[0.02] border border-white/[0.07]">
              <button
                onClick={handlePrev}
                className="p-1 rounded-full hover:bg-white/[0.08] text-white/50 hover:text-white transition-colors"
                title="Previous Dispatch"
              >
                <ChevronLeft className="w-3 h-3" />
              </button>

              <button
                onClick={() => setIsPaused(!isPaused)}
                className="p-1 rounded-full hover:bg-white/[0.08] text-white/50 hover:text-white transition-colors"
                title={isPaused ? 'Resume Dispatch' : 'Pause Dispatch'}
              >
                {isPaused ? <Play className="w-3 h-3 text-theme-accent" /> : <Pause className="w-3 h-3" />}
              </button>

              <button
                onClick={handleNext}
                className="p-1 rounded-full hover:bg-white/[0.08] text-white/50 hover:text-white transition-colors"
                title="Next Dispatch"
              >
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            {/* Newsroom Trigger */}
            <button
              onClick={onOpenLiveNewsroom}
              className="hidden md:inline-flex items-center gap-1.5 pl-3 pr-2 py-1 rounded-full bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] text-white/80 hover:text-white text-[11px] font-medium transition-all group"
            >
              <span>Newsroom</span>
              <div className="w-4 h-4 rounded-full bg-white/10 group-hover:bg-theme-accent group-hover:text-black flex items-center justify-center transition-all">
                <ArrowUpRight className="w-2.5 h-2.5" />
              </div>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LiveFeedTicker;
