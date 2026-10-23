import React, { useState, useEffect } from 'react';
import { Player } from '../types/tennis';
import { Trophy, Award, DollarSign, Calendar, MapPin, Ruler, X, Swords, Activity, ShieldCheck, Star } from 'lucide-react';
import { DonutPieChart, SurfaceGaugePie, GrandSlamDonutChart } from './charts/PieChart';
import { favoritesService } from '../services/favoritesService';
import { getAssetUrl } from '../utils/assetUtils';

interface PlayerDetailModalProps {
  player: Player | null;
  onClose: () => void;
  onCompare: (player: Player) => void;
}

const COUNTRY_ISO_MAP: Record<string, string> = {
  'Italy': 'ITA',
  'Spain': 'ESP',
  'Germany': 'GER',
  'United States': 'USA',
  'USA': 'USA',
  'Serbia': 'SRB',
  'Poland': 'POL',
  'Belarus': 'BLR',
  'Greece': 'GRE',
  'Russia': 'AIN',
  'Norway': 'NOR',
  'Kazakhstan': 'KAZ',
  'Czech Republic': 'CZE',
  'Czechia': 'CZE',
  'France': 'FRA',
  'Switzerland': 'SUI',
  'United Kingdom': 'GBR',
  'Great Britain': 'GBR',
  'Canada': 'CAN',
  'Australia': 'AUS',
  'Argentina': 'ARG',
  'Brazil': 'BRA',
  'Denmark': 'DEN',
  'Bulgaria': 'BUL',
  'Croatia': 'CRO',
  'Japan': 'JPN',
  'China': 'CHN',
};

const getCountryCode = (country?: string): string => {
  if (!country) return 'INT';
  if (COUNTRY_ISO_MAP[country]) return COUNTRY_ISO_MAP[country];
  return country.length <= 3 ? country.toUpperCase() : country.slice(0, 3).toUpperCase();
};

const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export const PlayerDetailModal: React.FC<PlayerDetailModalProps> = ({
  player,
  onClose,
  onCompare,
}) => {
  const [isFav, setIsFav] = useState(() => (player ? favoritesService.isFavorite(player.id) : false));

  useEffect(() => {
    if (!player) return;
    setIsFav(favoritesService.isFavorite(player.id));
    return favoritesService.subscribe(() => {
      setIsFav(favoritesService.isFavorite(player.id));
    });
  }, [player?.id]);

  if (!player) return null;

  const isATP = player.tour === 'ATP';
  const countryCode = getCountryCode(player.country);
  const initials = getInitials(player.name);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl double-bezel-card-outer max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="double-bezel-card-inner flex flex-col overflow-hidden bg-gradient-to-b from-[#0e1219] via-[#0c1015] to-[#080a0d]">
          
          {/* Top Specular Sheen */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

          {/* Subtle Ambient Player Backdrop Vignette */}
          {player.avatarUrl && (
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full overflow-hidden opacity-10 pointer-events-none filter blur-2xl">
              <img src={getAssetUrl(player.avatarUrl)} alt="" className="w-full h-full object-cover" />
            </div>
          )}

          {/* Header Banner */}
          <div className="relative p-6 sm:p-8 border-b border-white/[0.06] z-10">
            <div className="absolute top-5 right-5 flex items-center gap-2">
              <button
                type="button"
                onClick={() => favoritesService.toggleFavorite(player.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all border ${
                  isFav
                    ? 'bg-amber-400/15 border-amber-400/40 text-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.25)] hover:bg-amber-400/25 hover:border-amber-400/60'
                    : 'bg-white/[0.04] border-white/[0.08] text-white/60 hover:text-white hover:bg-white/[0.08] hover:border-white/20'
                }`}
                title={isFav ? "Remove from Watchlist" : "Add to Watchlist"}
                aria-label={isFav ? "Remove from Watchlist" : "Add to Watchlist"}
              >
                <Star className={`w-3.5 h-3.5 ${isFav ? 'fill-amber-400 text-amber-400' : 'text-current'}`} />
                <span className="font-semibold tracking-wider text-[11px] uppercase">
                  {isFav ? 'Watchlisted' : 'Watchlist'}
                </span>
              </button>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-white/50 hover:text-white flex items-center justify-center transition border border-white/[0.08]"
                aria-label="Close bio"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              {/* Real High-Resolution Athlete Portrait Photography */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border border-white/[0.12] bg-black/60 shrink-0 shadow-2xl">
                {player.avatarUrl ? (
                  <img
                    src={getAssetUrl(player.avatarUrl)}
                    alt={player.name}
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-mono text-xl text-theme-accent font-semibold">
                    {initials}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="font-mono text-xs font-semibold text-white/90 px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08]">
                    {countryCode}
                  </span>

                  <span className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full border ${
                    isATP
                      ? 'bg-white/[0.04] text-white/80 border-white/[0.08]'
                      : 'bg-white/[0.04] text-white/80 border-white/[0.08]'
                  }`}>
                    {player.tour} Tour
                  </span>

                  {player.currentRank > 0 && (
                    <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-white/[0.04] text-theme-accent border border-theme-accent/25 font-semibold">
                      No. {player.currentRank} {player.tour}
                    </span>
                  )}

                  {player.points && player.points > 0 && (
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-emerald-400/10 text-emerald-300 border border-emerald-400/25 font-semibold">
                      {player.points.toLocaleString()} PTS
                    </span>
                  )}

                  {player.movement !== undefined && player.movement !== 0 && (
                    <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border font-semibold ${
                      player.movement > 0 
                        ? 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20' 
                        : 'bg-rose-400/10 text-rose-400 border-rose-400/20'
                    }`}>
                      {player.movement > 0 ? `▲ +${player.movement}` : `▼ ${player.movement}`}
                    </span>
                  )}

                  <span className="text-xs text-white/40 font-mono">
                    Career High: <strong className="text-white/80 font-medium">#{player.careerHighRank}</strong>
                  </span>
                </div>

                <h2 className="font-display font-semibold text-2xl sm:text-3xl text-white tracking-tight">
                  {player.name}
                </h2>
                <p className="text-xs text-white/50 mt-1 font-normal">
                  {player.plays} • Age {player.age}
                </p>
              </div>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="p-6 sm:p-8 space-y-6 overflow-y-auto custom-scrollbar flex-1 relative z-10">
            
            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-black/40 border border-white/[0.06] rounded-xl p-3.5 text-center">
                <div className="flex items-center justify-center gap-1.5 text-theme-accent font-mono font-semibold text-xl mb-1">
                  <Trophy className="w-4 h-4" />
                  <span className="tabular-nums">{player.grandSlams}</span>
                </div>
                <div className="text-[9px] uppercase font-mono tracking-wider text-white/40">Grand Slams</div>
              </div>

              <div className="bg-black/40 border border-white/[0.06] rounded-xl p-3.5 text-center">
                <div className="flex items-center justify-center gap-1.5 text-white font-mono font-semibold text-xl mb-1">
                  <Award className="w-4 h-4 text-white/40" />
                  <span className="tabular-nums">{player.careerTitles}</span>
                </div>
                <div className="text-[9px] uppercase font-mono tracking-wider text-white/40">Career Titles</div>
              </div>

              <div className="bg-black/40 border border-white/[0.06] rounded-xl p-3.5 flex flex-col items-center justify-between text-center">
                <div className="flex items-center justify-center my-0.5">
                  <DonutPieChart
                    wins={player.careerWinLoss.wins}
                    losses={player.careerWinLoss.losses}
                    winPercentage={player.careerWinLoss.winPercentage}
                    size={48}
                    strokeWidth={4.5}
                    showCenterText={true}
                    winColor="#e5c378"
                  />
                </div>
                <div className="mt-1">
                  <div className="text-[9px] uppercase font-mono tracking-wider text-white/40">
                    Career Win Rate
                  </div>
                  <div className="text-[10px] font-mono text-theme-accent/90 tabular-nums font-semibold mt-0.5">
                    {player.careerWinLoss.wins}W - {player.careerWinLoss.losses}L
                  </div>
                </div>
              </div>

              <div className="bg-black/40 border border-white/[0.06] rounded-xl p-3.5 text-center flex flex-col justify-between">
                <div className="flex items-center justify-center gap-1 text-white/90 font-mono font-semibold text-base sm:text-lg mb-1 mt-auto">
                  <DollarSign className="w-3.5 h-3.5 text-white/40" />
                  <span className="tabular-nums">{player.prizeMoneyUsd}</span>
                </div>
                <div className="text-[9px] uppercase font-mono tracking-wider text-white/40 mb-auto">Prize Purse</div>
              </div>
            </div>

            {/* Grand Slam Breakdown */}
            <div className="bg-black/40 border border-white/[0.06] rounded-xl p-5">
              <div className="flex items-center justify-between gap-2 mb-4 pb-2 border-b border-white/[0.06]">
                <h4 className="text-[11px] uppercase font-mono tracking-widest text-white/50 flex items-center gap-2">
                  <Trophy className="w-3.5 h-3.5 text-theme-accent" />
                  Grand Slam Honors Breakdown
                </h4>
                <div className="flex items-center gap-2">
                  {Boolean(player.slamFinals && player.slamFinals > 0) && (
                    <span className="font-mono text-[10px] uppercase tracking-wider text-amber-300/90 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30">
                      {player.slamFinals} Grand Slam Finals Reached
                    </span>
                  )}
                  <span className="font-mono text-[10px] uppercase tracking-wider text-theme-accent/90 px-2 py-0.5 rounded bg-white/[0.03] border border-theme-accent/20">
                    {player.grandSlams} {player.grandSlams === 1 ? 'Title' : 'Titles'}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                {/* Visual SVG Donut Distribution Gauge */}
                <div className="shrink-0 flex flex-col items-center justify-center p-3 rounded-xl bg-white/[0.015] border border-white/[0.04]">
                  <GrandSlamDonutChart
                    breakdown={player.slamBreakdown}
                    totalSlams={player.grandSlams}
                    size={112}
                    strokeWidth={9}
                  />
                  <span className="text-[9px] font-mono uppercase tracking-widest text-white/40 mt-2">
                    Title Distribution
                  </span>
                </div>

                {/* Individual Slam Tiles */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 flex-1 w-full">
                  <div className="bg-white/[0.02] rounded-xl p-3 border border-white/[0.05] text-center relative overflow-hidden group">
                    <div className="absolute top-0 inset-x-0 h-0.5 bg-sky-400/60" />
                    <span className="font-mono text-[10px] font-bold text-sky-300/80 mb-1 block">AO</span>
                    <div className="text-xs font-medium text-white/80">Australian Open</div>
                    <div className="text-xl font-mono tabular-nums font-semibold text-sky-400 mt-1">
                      {player.slamBreakdown.australianOpen}
                    </div>
                  </div>

                  <div className="bg-white/[0.02] rounded-xl p-3 border border-white/[0.05] text-center relative overflow-hidden group">
                    <div className="absolute top-0 inset-x-0 h-0.5 bg-orange-500/60" />
                    <span className="font-mono text-[10px] font-bold text-orange-300/80 mb-1 block">RG</span>
                    <div className="text-xs font-medium text-white/80">Roland Garros</div>
                    <div className="text-xl font-mono tabular-nums font-semibold text-orange-400 mt-1">
                      {player.slamBreakdown.rolandGarros}
                    </div>
                  </div>

                  <div className="bg-white/[0.02] rounded-xl p-3 border border-white/[0.05] text-center relative overflow-hidden group">
                    <div className="absolute top-0 inset-x-0 h-0.5 bg-emerald-500/60" />
                    <span className="font-mono text-[10px] font-bold text-emerald-300/80 mb-1 block">WIM</span>
                    <div className="text-xs font-medium text-white/80">Wimbledon</div>
                    <div className="text-xl font-mono tabular-nums font-semibold text-emerald-400 mt-1">
                      {player.slamBreakdown.wimbledon}
                    </div>
                  </div>

                  <div className="bg-white/[0.02] rounded-xl p-3 border border-white/[0.05] text-center relative overflow-hidden group">
                    <div className="absolute top-0 inset-x-0 h-0.5 bg-amber-400/60" />
                    <span className="font-mono text-[10px] font-bold text-amber-300/80 mb-1 block">USO</span>
                    <div className="text-xs font-medium text-white/80">US Open</div>
                    <div className="text-xl font-mono tabular-nums font-semibold text-amber-400 mt-1">
                      {player.slamBreakdown.usOpen}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Surface Mastery Breakdown (Incorporating Authentic Court Donut Gauges) */}
            <div className="bg-black/40 border border-white/[0.06] rounded-xl p-5">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/[0.06]">
                <h4 className="text-[11px] uppercase font-mono tracking-widest text-white/50">
                  Surface Performance Breakdown
                </h4>
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">
                  Win Rates
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Hard */}
                <div className="bg-white/[0.02] rounded-xl p-4 border border-white/[0.05] flex items-center gap-4">
                  <SurfaceGaugePie
                    surface="Hard"
                    winPercentage={player.surfaceStats.hard.winPercentage}
                    wins={player.surfaceStats.hard.wins}
                    losses={player.surfaceStats.hard.losses}
                    size={58}
                    strokeWidth={5}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold text-sky-400">Hard Court</span>
                      <span className="text-[10px] font-mono text-sky-400/50 uppercase">Laykold</span>
                    </div>
                    <div className="text-xl font-mono tabular-nums font-semibold text-white/95 mt-0.5">
                      {player.surfaceStats.hard.winPercentage}%
                    </div>
                    <div className="text-[10px] font-mono text-white/40 tabular-nums">
                      {player.surfaceStats.hard.wins}W - {player.surfaceStats.hard.losses}L
                    </div>
                  </div>
                </div>

                {/* Clay */}
                <div className="bg-white/[0.02] rounded-xl p-4 border border-white/[0.05] flex items-center gap-4">
                  <SurfaceGaugePie
                    surface="Clay"
                    winPercentage={player.surfaceStats.clay.winPercentage}
                    wins={player.surfaceStats.clay.wins}
                    losses={player.surfaceStats.clay.losses}
                    size={58}
                    strokeWidth={5}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold text-orange-400">Clay Court</span>
                      <span className="text-[10px] font-mono text-orange-400/50 uppercase">Terre</span>
                    </div>
                    <div className="text-xl font-mono tabular-nums font-semibold text-white/95 mt-0.5">
                      {player.surfaceStats.clay.winPercentage}%
                    </div>
                    <div className="text-[10px] font-mono text-white/40 tabular-nums">
                      {player.surfaceStats.clay.wins}W - {player.surfaceStats.clay.losses}L
                    </div>
                  </div>
                </div>

                {/* Grass */}
                <div className="bg-white/[0.02] rounded-xl p-4 border border-white/[0.05] flex items-center gap-4">
                  <SurfaceGaugePie
                    surface="Grass"
                    winPercentage={player.surfaceStats.grass.winPercentage}
                    wins={player.surfaceStats.grass.wins}
                    losses={player.surfaceStats.grass.losses}
                    size={58}
                    strokeWidth={5}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold text-emerald-400">Grass Court</span>
                      <span className="text-[10px] font-mono text-emerald-400/50 uppercase">Lawn</span>
                    </div>
                    <div className="text-xl font-mono tabular-nums font-semibold text-white/95 mt-0.5">
                      {player.surfaceStats.grass.winPercentage}%
                    </div>
                    <div className="text-[10px] font-mono text-white/40 tabular-nums">
                      {player.surfaceStats.grass.wins}W - {player.surfaceStats.grass.losses}L
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Career Medical History & Injury Ledger */}
            <div className="bg-black/40 border border-white/[0.06] rounded-xl p-5">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-theme-accent" />
                  <h4 className="text-[11px] uppercase font-mono tracking-widest text-white/50">
                    Career Medical History & Injury Ledger
                  </h4>
                </div>

                {player.injuryHistory && player.injuryHistory.length > 0 && (
                  <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/[0.04] text-white/60 border border-white/[0.08]">
                    {player.injuryHistory.length} Documented {player.injuryHistory.length === 1 ? 'Record' : 'Records'}
                  </span>
                )}
              </div>

              {!player.injuryHistory || player.injuryHistory.length === 0 ? (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.015] border border-white/[0.05] text-white/50">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <p className="text-xs font-mono">
                    No major career-threatening injuries or surgical procedures on official tour record.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {player.injuryHistory.map((rec, idx) => {
                    const severityClass =
                      rec.severity === 'severe'
                        ? 'text-amber-200/90 bg-amber-500/10 border-amber-400/25'
                        : rec.severity === 'moderate'
                        ? 'text-white/80 bg-white/[0.05] border-white/10'
                        : 'text-white/60 bg-white/[0.03] border-white/[0.06]';

                    const status = rec.status || 'Resolved';
                    const statusDotClass =
                      status === 'Active Monitoring'
                        ? 'bg-amber-400 animate-pulse'
                        : 'bg-emerald-400';

                    return (
                      <div
                        key={`${rec.year}-${idx}`}
                        className="bg-white/[0.02] hover:bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 relative overflow-hidden transition"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-semibold text-white/90 px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08]">
                              {rec.year}
                            </span>
                            {rec.severity && (
                              <span className={`font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border ${severityClass}`}>
                                {rec.severity}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-1.5 font-mono text-[11px] text-white/60">
                            <span className={`w-1.5 h-1.5 rounded-full ${statusDotClass}`} />
                            <span>{status}</span>
                          </div>
                        </div>

                        <div className="mb-1">
                          <h5 className="font-display font-medium text-sm text-white/95">
                            {rec.injury}
                          </h5>
                          {rec.durationOrTournament && (
                            <span className="font-mono text-[11px] text-white/50 block mt-0.5">
                              {rec.durationOrTournament}
                            </span>
                          )}
                        </div>

                        {rec.details && (
                          <p className="text-xs text-white/70 leading-relaxed mt-1.5 font-normal">
                            {rec.details}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Bio & Playstyle */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-black/40 border border-white/[0.06] rounded-xl p-5">
                <h4 className="text-[11px] uppercase font-mono tracking-widest text-white/50 mb-2">Biography</h4>
                <p className="text-xs text-white/70 leading-relaxed font-normal">{player.bio}</p>
              </div>

              <div className="bg-black/40 border border-white/[0.06] rounded-xl p-5">
                <h4 className="text-[11px] uppercase font-mono tracking-widest text-white/50 mb-2">Tactical Profile & Style</h4>
                <p className="text-xs text-white/70 leading-relaxed mb-4 font-normal">{player.playStyle}</p>

                {player.notableRivalries.length > 0 && (
                  <div>
                    <h5 className="text-[10px] uppercase font-mono text-white/40 mb-2">Key Rivalries</h5>
                    <div className="flex flex-wrap gap-1.5">
                      {player.notableRivalries.map((rival) => (
                        <span key={rival} className="text-xs font-mono bg-white/[0.03] text-white/80 px-2.5 py-1 rounded-full border border-white/[0.07]">
                          vs {rival}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Player Physical Details */}
            <div className="bg-black/40 border border-white/[0.06] rounded-xl p-4 flex flex-wrap items-center justify-around gap-4 text-xs font-mono text-white/60">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-white/40" />
                <span>Age {player.age} ({player.birthDate})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-white/40" />
                <span>Born in {player.birthPlace}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Ruler className="w-3.5 h-3.5 text-white/40" />
                <span>{player.heightCm} cm</span>
              </div>
              <div>
                <span>Pro Since {player.turnedPro}</span>
              </div>
            </div>

          </div>

          {/* Footer Actions */}
          <div className="p-4 sm:p-5 bg-black/60 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3 relative z-10">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => {
                  onClose();
                  onCompare(player);
                }}
                className="inline-flex items-center gap-2 bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs font-mono font-medium px-4 py-2 rounded-xl border border-white/[0.08] transition"
              >
                <Swords className="w-3.5 h-3.5 text-theme-accent" />
                <span>Compare in Head-to-Head</span>
              </button>

              <button
                type="button"
                onClick={() => favoritesService.toggleFavorite(player.id)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono transition-all border ${
                  isFav
                    ? 'bg-amber-400/15 border-amber-400/40 text-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.25)]'
                    : 'bg-white/[0.04] border-white/[0.08] text-white/70 hover:text-white hover:bg-white/[0.08]'
                }`}
                title={isFav ? "Remove from Watchlist" : "Add to Watchlist"}
              >
                <Star className={`w-3.5 h-3.5 ${isFav ? 'fill-amber-400 text-amber-400' : 'text-current'}`} />
                <span>{isFav ? 'Starred in Watchlist' : 'Add to Watchlist'}</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="bg-white/[0.1] hover:bg-white/[0.15] text-white border border-white/20 px-6 py-2 rounded-xl text-xs font-semibold transition"
            >
              Close Bio
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PlayerDetailModal;
