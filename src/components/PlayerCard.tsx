import React from 'react';
import { Player } from '../types/tennis';
import { Swords, ArrowUpRight } from 'lucide-react';

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

  return (
    <div className="double-bezel-card-outer group">
      {/* Concentric Inner Core */}
      <div className="double-bezel-card-inner p-5 sm:p-6 flex flex-col justify-between h-full relative overflow-hidden bg-gradient-to-b from-[#0c1015] to-[#080a0d]">
        
        {/* Subtle Player Portrait Background Vignette */}
        {player.avatarUrl && (
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full overflow-hidden opacity-10 pointer-events-none filter blur-xl group-hover:opacity-15 transition-opacity duration-500">
            <img src={player.avatarUrl} alt="" className="w-full h-full object-cover" />
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
                    src={player.avatarUrl}
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

            {player.currentRank > 0 && (
              <div className="px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-amber-200/20 shadow-sm">
                <span className="font-mono text-xs text-theme-accent font-semibold tracking-wider">
                  No. {player.currentRank}
                </span>
              </div>
            )}
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

          {/* Tabular Collector's Stats Strip */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/[0.06] my-4 text-center">
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

            <div>
              <div className="font-mono tabular-nums text-base sm:text-lg font-semibold text-theme-accent">
                {player.careerWinLoss.winPercentage}%
              </div>
              <div className="font-mono text-[9px] uppercase tracking-wider text-white/35 mt-0.5">
                Win Rate
              </div>
            </div>
          </div>

          {/* Clean Editorial Surface Telemetry (Zero Mobile-Game Progress Bars) */}
          <div className="flex items-center justify-between text-[10px] font-mono text-white/50 px-1 py-1 mb-5">
            <div>
              <span className="text-white/30 block uppercase tracking-wider text-[9px]">Hard</span>
              <span className="text-white/85 tabular-nums font-medium">{player.surfaceStats.hard.winPercentage}%</span>
            </div>
            <span className="text-white/15">•</span>
            <div>
              <span className="text-white/30 block uppercase tracking-wider text-[9px]">Clay</span>
              <span className="text-white/85 tabular-nums font-medium">{player.surfaceStats.clay.winPercentage}%</span>
            </div>
            <span className="text-white/15">•</span>
            <div>
              <span className="text-white/30 block uppercase tracking-wider text-[9px]">Grass</span>
              <span className="text-white/85 tabular-nums font-medium">{player.surfaceStats.grass.winPercentage}%</span>
            </div>
          </div>
        </div>

        {/* Action Buttons: Button-in-Button Architecture */}
        <div className="flex items-center gap-2 pt-3 border-t border-white/[0.06]">
          <button
            onClick={() => onSelect(player)}
            className="flex-1 flex items-center justify-between pl-3.5 pr-2 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs font-medium border border-white/[0.08] hover:border-white/20 transition-all duration-200 group/btn"
          >
            <span className="tracking-tight">View Dossier</span>
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
