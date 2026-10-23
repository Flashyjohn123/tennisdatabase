import React, { useState } from 'react';
import { FeedCategory, FeedSeverity, Player } from '../types/tennis';
import { useLiveFeed } from '../services/liveFeedEngine';
import { playerService } from '../services/playerService';
import { decodeHtmlEntities } from '../services/rssFeedService';
import {
  Radio,
  RefreshCw,
  Search,
  AlertTriangle,
  Ban,
  Scale,
  Flame,
  Trophy,
  CheckCircle2,
  ExternalLink,
  Play,
  Pause,
  Plus,
  X,
  UserCheck
} from 'lucide-react';

interface LiveNewsroomViewProps {
  onSelectPlayer: (player: Player) => void;
}

export const LiveNewsroomView: React.FC<LiveNewsroomViewProps> = ({ onSelectPlayer }) => {
  const {
    items,
    selectedCategory,
    setSelectedCategory,
    searchFilter,
    setSearchFilter,
    refreshFeed,
    addLiveItem,
    config,
    updateConfig,
    isRefreshing,
  } = useLiveFeed();

  const [selectedSeverity, setSelectedSeverity] = useState<FeedSeverity | 'ALL'>('ALL');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSummary, setNewSummary] = useState('');
  const [newCategory, setNewCategory] = useState<FeedCategory>('breaking');
  const [newSeverity, setNewSeverity] = useState<FeedSeverity>('high');
  const [newPlayerName, setNewPlayerName] = useState('');
  const [newSource, setNewSource] = useState('ATP Tour Official');

  // Simulation speed options
  const simulationSpeeds = [
    { label: 'Fast (30s)', value: 30000 },
    { label: 'Normal (60s)', value: 60000 },
    { label: 'Slow (120s)', value: 120000 },
  ];

  const handleSpeedChange = (intervalMs: number) => {
    updateConfig({ pollIntervalMs: intervalMs, autoRefresh: true });
  };

  const toggleAutoRefresh = () => {
    updateConfig({ autoRefresh: !config.autoRefresh });
  };

  const handleCreateAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addLiveItem({
      title: newTitle.trim(),
      summary: newSummary.trim() || newTitle.trim(),
      category: newCategory,
      severity: newSeverity,
      source: newSource.trim() || 'Editorial Live Desk',
      playerNames: newPlayerName.trim() ? [newPlayerName.trim()] : undefined,
      isLive: true,
      verified: true,
      tags: ['Live Wire', newCategory],
    });

    setNewTitle('');
    setNewSummary('');
    setNewPlayerName('');
    setShowAddModal(false);
  };

  const handlePlayerClick = (playerName: string) => {
    const player = playerService.getPlayerByName(playerName);
    if (player) {
      onSelectPlayer(player);
    }
  };

  // Filter items by severity as well
  const displayedItems = items.filter((item) => {
    if (selectedSeverity === 'ALL') return true;
    return item.severity === selectedSeverity;
  });

  // Relative timestamp formatter
  const formatTimeAgo = (isoString: string) => {
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

  // Category Badge Config
  const getCategoryStyles = (category: FeedCategory) => {
    switch (category) {
      case 'injury':
        return {
          icon: AlertTriangle,
          label: 'Medical Advisory',
          badgeClass: 'bg-white/[0.04] text-amber-200 border-white/[0.08]',
        };
      case 'withdrawal':
        return {
          icon: Ban,
          label: 'Official Withdrawal',
          badgeClass: 'bg-white/[0.04] text-rose-300 border-white/[0.08]',
        };
      case 'controversy':
        return {
          icon: Scale,
          label: 'News Inquiry',
          badgeClass: 'bg-white/[0.04] text-purple-200 border-white/[0.08]',
        };
      case 'match_result':
        return {
          icon: Trophy,
          label: 'Match Result',
          badgeClass: 'bg-white/[0.04] text-emerald-300 border-white/[0.08]',
        };
      case 'tournament_update':
        return {
          icon: Trophy,
          label: 'Tournament Draw',
          badgeClass: 'bg-white/[0.04] text-theme-accent border-white/[0.08]',
        };
      default:
        return {
          icon: Flame,
          label: 'News Dispatch',
          badgeClass: 'bg-white/[0.04] text-white/90 border-white/[0.08]',
        };
    }
  };

  // Severity pill
  const getSeverityBadge = (severity: FeedSeverity) => {
    switch (severity) {
      case 'urgent':
        return (
          <span className="flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            Urgent
          </span>
        );
      case 'high':
        return (
          <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/[0.05] text-amber-200 border border-white/[0.1]">
            Priority
          </span>
        );
      default:
        return (
          <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/[0.03] text-white/50 border border-white/[0.06]">
            Bulletin
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      
      {/* Top Banner & Command Center Header in Double-Bezel Concentric Shell */}
      <div className="double-bezel-card-outer">
        <div className="double-bezel-card-inner p-6 sm:p-8 relative overflow-hidden bg-gradient-to-b from-[#0e1219] to-[#080b0f]">
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-widest text-theme-accent flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-rose-400" />
                  Live News & Updates
                </span>
              </div>

              <h1 className="font-display font-semibold text-2xl sm:text-4xl text-white tracking-tight">
                Tour News & Updates
              </h1>
              <div className="inline-flex items-center gap-1.5 mt-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[11px] font-mono text-emerald-300">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>Verified Official Sources: ESPN • ATP • WTA</span>
              </div>
              <p className="text-xs sm:text-sm text-white/60 mt-1.5 max-w-2xl font-normal">
                Real-time official walkovers, tournament draw bulletins, injury updates, and match results from ESPN, ATP, and WTA communications.
              </p>
            </div>

            {/* Live Action Controls */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Speed Selector */}
              <div className="flex items-center bg-black/40 rounded-full p-1 border border-white/[0.08] text-xs font-mono">
                {simulationSpeeds.map((speed) => (
                  <button
                    key={speed.label}
                    onClick={() => handleSpeedChange(speed.value)}
                    className={`px-3 py-1 rounded-full transition text-[11px] ${
                      config.pollIntervalMs === speed.value && config.autoRefresh
                        ? 'bg-white/[0.12] text-white font-semibold border border-white/20 shadow-sm'
                        : 'text-white/45 hover:text-white'
                    }`}
                  >
                    {speed.label}
                  </button>
                ))}

                <button
                  onClick={toggleAutoRefresh}
                  className={`px-3 py-1 rounded-full transition flex items-center gap-1 text-[11px] ${
                    !config.autoRefresh
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : 'text-white/45 hover:text-white'
                  }`}
                  title={config.autoRefresh ? 'Pause Auto-Simulation' : 'Resume Auto-Simulation'}
                >
                  {!config.autoRefresh ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
                  <span>{!config.autoRefresh ? 'Paused' : 'Active'}</span>
                </button>
              </div>

              {/* Sync Now Button */}
              <button
                onClick={() => refreshFeed()}
                disabled={isRefreshing}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs font-medium border border-white/[0.08] transition shadow-sm disabled:opacity-50"
                title="Fetch fresh RSS news feeds & inject live event"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-theme-accent ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>{isRefreshing ? 'Syncing...' : 'Sync Wire'}</span>
              </button>

              {/* Broadcast Alert Button */}
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-black hover:bg-white/90 font-medium text-xs transition shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Broadcast Alert</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="space-y-3">
        {/* Category Filter Pills in Image-2 Theme */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {[
            { id: 'ALL', label: 'All Dispatches' },
            { id: 'injury', label: 'Medical & Injury' },
            { id: 'withdrawal', label: 'Withdrawals & Walkovers' },
            { id: 'controversy', label: 'Official Inquiries' },
            { id: 'tournament_update', label: 'Tournament Draws' },
          ].map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium whitespace-nowrap transition border ${
                  isSelected
                    ? 'bg-white/[0.1] text-white border-white/20 shadow-sm'
                    : 'bg-white/[0.02] hover:bg-white/[0.05] text-white/50 border-white/[0.06]'
                }`}
              >
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search & Severity Bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/35" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Filter by player (e.g. Alcaraz, Sinner), tournament, or keyword..."
              className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-white/[0.08] focus:border-white/20 rounded-xl pl-9 pr-8 py-2 text-xs text-white placeholder-white/35 focus:outline-none transition font-sans"
            />
            {searchFilter && (
              <button
                onClick={() => setSearchFilter('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/40 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          {/* Severity Filter */}
          <div className="flex items-center gap-1 p-0.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs font-mono">
            {(['ALL', 'urgent', 'high', 'medium', 'low'] as const).map((sev) => (
              <button
                key={sev}
                onClick={() => setSelectedSeverity(sev)}
                className={`px-2.5 py-1 rounded-lg transition uppercase text-[10px] font-medium ${
                  selectedSeverity === sev
                    ? 'bg-white/[0.1] text-white border border-white/20'
                    : 'text-white/40 hover:text-white'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* News Items List: Real Tennis Action Photography + Double-Bezel Concentric Framing */}
      <div className="space-y-4">
        {displayedItems.length === 0 ? (
          <div className="rounded-2xl bg-white/[0.02] border border-white/[0.06] p-12 text-center">
            <p className="text-white/50 text-xs font-mono uppercase tracking-wider">
              No matching alerts found for this filter criteria
            </p>
          </div>
        ) : (
          displayedItems.map((item) => {
            const styles = getCategoryStyles(item.category);
            const Icon = styles.icon;

            return (
              <div key={item.id} className="double-bezel-card-outer group">
                <div className="double-bezel-card-inner p-5 sm:p-6 relative overflow-hidden bg-gradient-to-b from-[#0c1015] to-[#080a0d]">
                  <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

                  <div className="flex flex-col justify-between min-w-0">
                    <div>
                      {/* Badges Bar */}
                      <div className="flex flex-wrap items-center gap-2 mb-2.5">
                        <span className={`inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border ${styles.badgeClass}`}>
                          <Icon className="w-2.5 h-2.5" />
                          <span>{styles.label}</span>
                        </span>

                        {getSeverityBadge(item.severity)}

                        {item.verified && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400/80 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                            <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                            <span>Verified</span>
                          </span>
                        )}

                        <span className="ml-auto text-[10px] font-mono text-white/40 tabular-nums">
                          {formatTimeAgo(item.timestamp)}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-display font-semibold text-base sm:text-lg text-white group-hover:text-theme-accent transition-colors tracking-tight leading-snug mb-2">
                        {decodeHtmlEntities(item.title)}
                      </h3>

                      {/* Summary */}
                      <p className="text-xs text-white/60 leading-relaxed font-normal">
                        {decodeHtmlEntities(item.summary)}
                      </p>
                    </div>

                    {/* Footer: Tagged Players, Tournament, Source Link */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 mt-3 border-t border-white/[0.05] text-xs">
                      {/* Tagged Players */}
                      <div className="flex flex-wrap items-center gap-1.5">
                        {item.playerNames && item.playerNames.length > 0 ? (
                          item.playerNames.map((pName) => (
                            <button
                              key={pName}
                              onClick={() => handlePlayerClick(pName)}
                              className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-white/80 hover:text-white border border-white/[0.07] text-[11px] font-mono transition"
                            >
                              <UserCheck className="w-3 h-3 text-theme-accent/80" />
                              <span>{pName}</span>
                            </button>
                          ))
                        ) : item.tournamentName ? (
                          <span className="px-2.5 py-0.5 rounded-full bg-white/[0.03] text-white/70 border border-white/[0.06] text-[11px] font-mono">
                            {item.tournamentName}
                          </span>
                        ) : null}

                        {item.tags?.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded text-[10px] font-mono text-white/35"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Source Attribution */}
                      <div className="flex items-center gap-2 ml-auto">
                        <span className="text-[10px] font-mono text-white/35">Source:</span>
                        {item.url ? (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-[11px] font-mono text-white/80 hover:text-theme-accent transition"
                          >
                            <span>{item.source}</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        ) : (
                          <span className="text-[11px] font-mono text-white/70">{item.source}</span>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Broadcast Custom Alert Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-lg rounded-2xl bg-[#0c1015] border border-white/[0.12] p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-theme-accent" />
                <h3 className="font-display font-semibold text-lg text-white">
                  Broadcast News Alert
                </h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-white/40 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateAlert} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-white/50 mb-1">
                  Headline Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Sinner advances to semi-finals in straight sets..."
                  className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-white/20 rounded-xl px-3.5 py-2 text-xs text-white placeholder-white/30 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-white/50 mb-1">
                  Summary / Details
                </label>
                <textarea
                  rows={3}
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  placeholder="Detailed breakdown of the match, medical prognosis, or inquiry..."
                  className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-white/20 rounded-xl px-3.5 py-2 text-xs text-white placeholder-white/30 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-white/50 mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as FeedCategory)}
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    <option value="breaking" className="bg-black">Circuit Breaking</option>
                    <option value="injury" className="bg-black">Medical Advisory</option>
                    <option value="withdrawal" className="bg-black">Official Withdrawal</option>
                    <option value="match_result" className="bg-black">Match Result</option>
                    <option value="tournament_update" className="bg-black">Tournament Draw</option>
                    <option value="controversy" className="bg-black">Official Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-white/50 mb-1">
                    Severity
                  </label>
                  <select
                    value={newSeverity}
                    onChange={(e) => setNewSeverity(e.target.value as FeedSeverity)}
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    <option value="urgent" className="bg-black">Urgent</option>
                    <option value="high" className="bg-black">Priority</option>
                    <option value="medium" className="bg-black">Standard</option>
                    <option value="low" className="bg-black">Bulletin</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-white/50 mb-1">
                  Primary Athlete Tag (Optional)
                </label>
                <input
                  type="text"
                  value={newPlayerName}
                  onChange={(e) => setNewPlayerName(e.target.value)}
                  placeholder="e.g. Jannik Sinner, Carlos Alcaraz..."
                  className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-white/20 rounded-xl px-3.5 py-2 text-xs text-white placeholder-white/30 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-white/50 mb-1">
                  Source Attribution (Official Authorized Only)
                </label>
                <select
                  value={newSource}
                  onChange={(e) => setNewSource(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-white/20 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none"
                >
                  <option value="ATP Tour Official" className="bg-black">ATP Tour Official</option>
                  <option value="WTA Tour Official" className="bg-black">WTA Tour Official</option>
                  <option value="ESPN Tennis Desk" className="bg-black">ESPN Tennis Desk</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-mono text-white/50 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-white text-black hover:bg-white/90 text-xs font-medium"
                >
                  Publish to News Outlet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default LiveNewsroomView;
