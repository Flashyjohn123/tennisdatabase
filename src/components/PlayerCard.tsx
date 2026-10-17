import React, { useState, useEffect } from 'react';
import { Player } from '../types/tennis';
import { Swords, ArrowUpRight, Star } from 'lucide-react';
import { MiniStatGauge } from './charts/PieChart';
import { favoritesService } from '../services/favoritesService';
import { getAssetUrl } from '../utils/assetUtils';

interface PlayerCardProps {
  player: Player;
  onSelect: (player: Player) => void;
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
  'Tunisia': 'TUN',
  'Latvia': 'LAT',
  'Romania': 'ROU',
  'Ukraine': 'UKR',
  'Netherlands': 'NED',
  'Belgium': 'BEL',
  'Austria': 'AUT',
};

const getCountryCode = (country: string): string => {
  if (!country) return 'INT';
  if (COUNTRY_ISO_MAP[country]) return COUNTRY_ISO_MAP[country];
  return country.length <= 3 ? country.toUpperCase() : country.slice(0, 3).toUpperCase();
};

const getPlayerInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export const PlayerCard: React.FC<PlayerCardProps> = ({ player, onSelect, onCompare }) => {
  const countryCode = getCountryCode(player.country);
  const initials = getPlayerInitials(player.name);
  const [isFav, setIsFav] = useState(() => favoritesService.isFavorite(player.id));

  useEffect(() => {
    setIsFav(favoritesService.isFavorite(player.id));
    return favoritesService.subscribe(() => {
      setIsFav(favoritesService.isFavorite(player.id));
    });
  }, [player.id]);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    favoritesService.toggleFavorite(player.id);
  };

  return (
    <div className="double-bezel-card-outer group">
      {/* Concentric Inner Core */}
      <div className="double-bezel-card-inner p-5 sm:p-6 flex flex-col justify-between h-full relative overflow-hidden bg-gradient-to-b from-[#0c1015] to-[#080a0d]">
        
        {/* Subtle Player Portrait Background Vignette */}
        {player.avatarUrl && (
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full overflow-hidden opacity-10 pointer-events-none filter blur-xl group-hover:opacity-15 transition-opacity duration-500">
            <img src={getAssetUrl(player.avatarUrl)} alt="" className="w-full h-full object-cover" />
          </div>
        )}

        {/* Top Hairline Sheen */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

        <div>
          {/* Header: Portrait Photo, ISO Country, Tour, Seed/Rank */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {/* High-res player portrait avatar with subtle border and gradient mask */}
              <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-white/[0.1] bg-black/60 shrink-0 group-hover:border-white/20 transition-all shadow-md">
                {player.avatarUrl ? (
                  <img
                    src={getAssetUrl(player.avatarUrl)}
                    alt={player.name}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-mono text-xs text-theme-accent font-semibold">
                    {initials}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-xs font-semibold text-white/90 tracking-wider">
                    {countryCode}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span className="font-mono text-[10px] text-white/40 uppercase">
                    {player.tour}
                  </span>
                </div>
                <span className="block font-mono text-[9px] text-white/35">
                  Age {player.age}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleToggleFavorite}
                aria-label={isFav ? `Remove ${player.name} from watchlist` : `Add ${player.name} to watchlist`}
                title={isFav ? "Remove from watchlist" : "Add to watchlist"}
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 border ${
                  isFav
                    ? 'bg-amber-400/15 border-amber-400/40 text-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.25)] hover:bg-amber-400/25 hover:border-amber-400/60'
                    : 'bg-white/[0.03] border-white/[0.08] text-white/30 hover:text-white/80 hover:bg-white/[0.08] hover:border-white/20'
                }`}
              >
                <Star
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isFav ? 'fill-amber-400 text-amber-400 scale-105' : 'text-current'
                  }`}
                />
              </button>

              {player.currentRank > 0 && (
                <div className="px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-amber-200/20 shadow-sm">
                  <span className="font-mono text-xs text-theme-accent font-semibold tracking-wider">
                    No. {player.currentRank}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Player Name & Style */}
          <div className="mb-4">
            <h3 
              onClick={() => onSelect(player)}
              className="font-display font-semibold text-lg sm:text-xl text-white group-hover:text-theme-accent transition-colors duration-200 cursor-pointer tracking-tight"
            >
              {player.name}
            </h3>
            <p className="text-xs text-white/40 mt-0.5 font-normal tracking-normal truncate">
              {player.plays} • Age {player.age}
            </p>
          </div>

          {/* Tabular Collector's Stats Strip with Mini SVG Donut Gauge */}
          <div className="grid grid-cols-3 gap-2 py-2.5 border-y border-white/[0.06] my-4 text-center items-center">
            <div>
              <div className="font-mono tabular-nums text-base sm:text-lg font-semibold text-white">
                {player.grandSlams}
              </div>
              <div className="font-mono text-[9px] uppercase tracking-wider text-white/35 mt-0.5">
                Grand Slams
              </div>
            </div>

            <div className="border-x border-white/[0.06]">
              <div className="font-mono tabular-nums text-base sm:text-lg font-semibold text-white">
                {player.careerTitles}
              </div>
              <div className="font-mono text-[9px] uppercase tracking-wider text-white/35 mt-0.5">
                Titles
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <MiniStatGauge
                percentage={player.careerWinLoss.winPercentage}
                size={38}
                strokeWidth={3.8}
                strokeColor="#e5c378"
                trackColor="rgba(255, 255, 255, 0.08)"
              />
              <div className="font-mono text-[8px] uppercase tracking-wider text-white/40 mt-1">
                Win Rate
              </div>
            </div>
          </div>

          {/* Clean Editorial Surface Telemetry with Micro Color Indicators */}
          <div className="flex items-center justify-between text-[10px] font-mono text-white/50 px-2 py-1.5 mb-5 rounded-lg bg-white/[0.015] border border-white/[0.04]">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0" />
              <div>
                <span className="text-white/30 block uppercase tracking-wider text-[8px] leading-none">Hard</span>
                <span className="text-white/85 tabular-nums font-medium text-[11px] leading-tight">{player.surfaceStats.hard.winPercentage}%</span>
              </div>
            </div>
            <span className="text-white/10">•</span>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
              <div>
                <span className="text-white/30 block uppercase tracking-wider text-[8px] leading-none">Clay</span>
                <span className="text-white/85 tabular-nums font-medium text-[11px] leading-tight">{player.surfaceStats.clay.winPercentage}%</span>
              </div>
            </div>
            <span className="text-white/10">•</span>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
              <div>
                <span className="text-white/30 block uppercase tracking-wider text-[8px] leading-none">Grass</span>
                <span className="text-white/85 tabular-nums font-medium text-[11px] leading-tight">{player.surfaceStats.grass.winPercentage}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons: Button-in-Button Architecture */}
        <div className="flex items-center gap-2 pt-3 border-t border-white/[0.06]">
          <button
            onClick={() => onSelect(player)}
            className="flex-1 flex items-center justify-between pl-3.5 pr-2 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs font-medium border border-white/[0.08] hover:border-white/20 transition-all duration-200 group/btn"
          >
            <span className="tracking-tight">View Bio</span>
            <div className="w-6 h-6 rounded-full bg-white/10 group-hover/btn:bg-white/20 flex items-center justify-center text-white/80 group-hover/btn:text-white transition-all">
              <ArrowUpRight className="w-3 h-3" />
            </div>
          </button>

          <button
            onClick={() => onCompare(player)}
            className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white/70 hover:text-white text-xs font-medium border border-white/[0.08] hover:border-amber-200/30 transition-all duration-200 group/btn"
            title="Compare Head to Head Record"
          >
            <span className="font-mono text-[10px] tracking-wider uppercase">H2H</span>
            <div className="w-6 h-6 rounded-full bg-white/5 group-hover/btn:bg-theme-accent/20 flex items-center justify-center transition-all">
              <Swords className="w-3 h-3 text-white/60 group-hover/btn:text-theme-accent" />
            </div>
          </button>
        </div>

      </div>
    </div>
  );
};

export default PlayerCard;
