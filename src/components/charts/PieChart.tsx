import React from 'react';

// ============================================================================
// LUXURY TENNIS TELEMETRY SVG PIE & DONUT CHARTS
// Pure React SVG components with zero heavy npm dependencies.
// Designed with horology bezel rings, precise tabular numerals & subtle glows.
// ============================================================================

/**
 * Surface color tokens calibrated for dark luxury tennis telemetry
 */
export const SURFACE_CHART_COLORS = {
  Hard: {
    primary: '#38bdf8', // Laykold Cyan
    secondary: '#0284c7',
    glow: 'rgba(56, 189, 248, 0.35)',
    track: 'rgba(56, 189, 248, 0.12)',
    badgeBg: 'rgba(56, 189, 248, 0.10)',
    badgeBorder: 'rgba(56, 189, 248, 0.25)',
  },
  Clay: {
    primary: '#f97316', // Roland Garros Terracotta / Ochre
    secondary: '#ea580c',
    glow: 'rgba(249, 115, 22, 0.35)',
    track: 'rgba(249, 115, 22, 0.12)',
    badgeBg: 'rgba(249, 115, 22, 0.10)',
    badgeBorder: 'rgba(249, 115, 22, 0.25)',
  },
  Grass: {
    primary: '#10b981', // Wimbledon Racing Pine / Emerald
    secondary: '#059669',
    glow: 'rgba(16, 185, 129, 0.35)',
    track: 'rgba(16, 185, 129, 0.12)',
    badgeBg: 'rgba(16, 185, 129, 0.10)',
    badgeBorder: 'rgba(16, 185, 129, 0.25)',
  },
} as const;

export const GRAND_SLAM_COLORS = {
  australianOpen: {
    name: 'Australian Open',
    short: 'AO',
    primary: '#38bdf8', // Cyan
    glow: 'rgba(56, 189, 248, 0.4)',
  },
  rolandGarros: {
    name: 'Roland Garros',
    short: 'RG',
    primary: '#ea580c', // Terracotta
    glow: 'rgba(234, 88, 12, 0.4)',
  },
  wimbledon: {
    name: 'Wimbledon',
    short: 'WIM',
    primary: '#10b981', // Emerald
    glow: 'rgba(16, 185, 129, 0.4)',
  },
  usOpen: {
    name: 'US Open',
    short: 'USO',
    primary: '#eab308', // DecoTurf Gold/Amber
    glow: 'rgba(234, 179, 8, 0.4)',
  },
} as const;

// ----------------------------------------------------------------------------
// 1. DonutPieChart / WinLossDonut
// Sleek circular donut gauge with Rolex-calibrated bezel ticks & champagne glow
// ----------------------------------------------------------------------------
export interface DonutPieChartProps {
  wins: number;
  losses: number;
  winPercentage?: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  winColor?: string;
  lossColor?: string;
  showCenterText?: boolean;
  centerSubtext?: string;
  centerLabel?: string;
}

export const DonutPieChart: React.FC<DonutPieChartProps> = ({
  wins,
  losses,
  winPercentage,
  size = 76,
  strokeWidth = 6.5,
  className = '',
  winColor = '#e5c378', // Champagne gold
  lossColor = 'rgba(255, 255, 255, 0.09)',
  showCenterText = true,
  centerSubtext = 'WIN RATE',
  centerLabel,
}) => {
  const total = wins + losses;
  const pct = winPercentage !== undefined
    ? Math.max(0, Math.min(100, winPercentage))
    : total > 0
    ? Math.round((wins / total) * 1000) / 10
    : 0;

  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const winStrokeLength = (pct / 100) * circumference;

  // Calibrated outer bezel tick radius
  const bezelRadius = radius + strokeWidth / 2 + 3;

  const filterId = `champagne-glow-${size}-${Math.round(pct)}`;

  return (
    <div className={`relative inline-flex flex-col items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90 drop-shadow-sm select-none"
      >
        <defs>
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor={winColor} floodOpacity="0.35" />
          </filter>
        </defs>

        {/* Outer Horology Calibrated Tick Ring (Ultra-fine bezel telemetry) */}
        {size >= 50 && (
          <circle
            cx={center}
            cy={center}
            r={bezelRadius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.12)"
            strokeWidth="0.75"
            strokeDasharray="1.5 3.5"
            opacity="0.8"
          />
        )}

        {/* Inner track border */}
        <circle
          cx={center}
          cy={center}
          r={radius - strokeWidth / 2 - 2}
          fill="none"
          stroke="rgba(255, 255, 255, 0.05)"
          strokeWidth="0.5"
        />

        {/* Loss Track Circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={lossColor}
          strokeWidth={strokeWidth}
        />

        {/* Win Arc (Active telemetry percentage) */}
        {pct > 0 && (
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={winColor}
            strokeWidth={strokeWidth}
            strokeDasharray={`${winStrokeLength} ${circumference}`}
            strokeLinecap="round"
            filter={`url(#${filterId})`}
            className="transition-all duration-700 ease-out"
          />
        )}
      </svg>

      {/* Center Digital Telemetry Display */}
      {showCenterText && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-1">
          <span className="font-mono font-bold text-white tabular-nums tracking-tight leading-none text-xs sm:text-sm">
            {centerLabel || `${pct}%`}
          </span>
          {centerSubtext && size >= 64 && (
            <span className="font-mono text-[7px] text-white/40 uppercase tracking-widest mt-0.5 leading-none">
              {centerSubtext}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

// ----------------------------------------------------------------------------
// 2. SurfaceGaugePie
// Surface-specific donut gauge with surface authentic accents & volume telemetry
// ----------------------------------------------------------------------------
export interface SurfaceGaugePieProps {
  surface: 'Hard' | 'Clay' | 'Grass' | string;
  winPercentage: number;
  wins?: number;
  losses?: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  showCenterText?: boolean;
}

export const SurfaceGaugePie: React.FC<SurfaceGaugePieProps> = ({
  surface,
  winPercentage,
  wins,
  losses,
  size = 54,
  strokeWidth = 5,
  className = '',
  showCenterText = true,
}) => {
  const normSurface = (surface.charAt(0).toUpperCase() + surface.slice(1).toLowerCase()) as
    | 'Hard'
    | 'Clay'
    | 'Grass';
  const palette = SURFACE_CHART_COLORS[normSurface] || SURFACE_CHART_COLORS.Hard;

  const pct = Math.max(0, Math.min(100, winPercentage));
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const winStrokeLength = (pct / 100) * circumference;

  const filterId = `surface-glow-${normSurface}-${size}`;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90 select-none"
      >
        <defs>
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor={palette.primary} floodOpacity="0.45" />
          </filter>
        </defs>

        {/* Outer decorative bezel ring */}
        <circle
          cx={center}
          cy={center}
          r={radius + strokeWidth / 2 + 2}
          fill="none"
          stroke={palette.track}
          strokeWidth="0.75"
          strokeDasharray="1 2.5"
        />

        {/* Base Track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth={strokeWidth}
        />

        {/* Active Surface Percentage Arc */}
        {pct > 0 && (
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={palette.primary}
            strokeWidth={strokeWidth}
            strokeDasharray={`${winStrokeLength} ${circumference}`}
            strokeLinecap="round"
            filter={`url(#${filterId})`}
            className="transition-all duration-700 ease-out"
          />
        )}
      </svg>

      {/* Central percentage */}
      {showCenterText && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          <span className="font-mono font-semibold text-white/95 tabular-nums text-[11px] sm:text-xs leading-none">
            {pct}%
          </span>
          {wins !== undefined && losses !== undefined && size >= 60 && (
            <span className="font-mono text-[7px] text-white/40 mt-0.5 tracking-tighter leading-none">
              {wins}W
            </span>
          )}
        </div>
      )}
    </div>
  );
};

// ----------------------------------------------------------------------------
// 3. GrandSlamDonutChart
// Multi-segment distribution donut illustrating AO, RG, WIM, USO honors
// ----------------------------------------------------------------------------
export interface SlamBreakdownData {
  australianOpen: number;
  rolandGarros: number;
  wimbledon: number;
  usOpen: number;
}

export interface GrandSlamDonutChartProps {
  breakdown: SlamBreakdownData;
  totalSlams: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export const GrandSlamDonutChart: React.FC<GrandSlamDonutChartProps> = ({
  breakdown,
  totalSlams,
  size = 110,
  strokeWidth = 9,
  className = '',
}) => {
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Prepare segments
  const segments = [
    { key: 'australianOpen', count: breakdown.australianOpen, ...GRAND_SLAM_COLORS.australianOpen },
    { key: 'rolandGarros', count: breakdown.rolandGarros, ...GRAND_SLAM_COLORS.rolandGarros },
    { key: 'wimbledon', count: breakdown.wimbledon, ...GRAND_SLAM_COLORS.wimbledon },
    { key: 'usOpen', count: breakdown.usOpen, ...GRAND_SLAM_COLORS.usOpen },
  ];

  // If 0 Grand Slams won
  if (totalSlams === 0) {
    return (
      <div className={`relative inline-flex items-center justify-center ${className}`}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="transform -rotate-90 select-none"
        >
          {/* Subtle calibrated tick dial */}
          <circle
            cx={center}
            cy={center}
            r={radius + strokeWidth / 2 + 2}
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="0.75"
            strokeDasharray="2 3"
          />
          {/* Track */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.07)"
            strokeWidth={strokeWidth}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          <span className="font-mono font-bold text-white/30 text-lg tabular-nums">0</span>
          <span className="font-mono text-[7px] text-white/30 uppercase tracking-widest mt-0.5">
            NO SLAMS
          </span>
        </div>
      </div>
    );
  }

  // Calculate slice offsets with calibrated non-overlapping gaps
  const activeSegments = segments.filter((seg) => seg.count > 0);
  // When multiple segments exist, account for round cap extensions (strokeWidth/2 each side)
  const gap = activeSegments.length > 1 ? strokeWidth + 4 : 0;
  let accumulatedOffset = 0;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90 select-none drop-shadow-md"
      >
        <defs>
          <filter id="slam-dial-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#e5c378" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Outer Horology Telemetry Ring */}
        <circle
          cx={center}
          cy={center}
          r={radius + strokeWidth / 2 + 3}
          fill="none"
          stroke="rgba(255, 255, 255, 0.12)"
          strokeWidth="0.75"
          strokeDasharray="1.5 3"
        />

        {/* Background track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.05)"
          strokeWidth={strokeWidth}
        />

        {/* Slices */}
        {segments.map((seg) => {
          if (seg.count === 0) return null;
          const ratio = seg.count / totalSlams;
          const rawLength = ratio * circumference;
          const sliceLength = Math.max(0.1, rawLength - gap);
          const currentOffset = accumulatedOffset + (gap > 0 ? gap / 2 : 0);
          accumulatedOffset += rawLength;

          return (
            <circle
              key={seg.key}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={seg.primary}
              strokeWidth={strokeWidth}
              strokeDasharray={`${sliceLength} ${circumference}`}
              strokeDashoffset={-currentOffset}
              strokeLinecap="round"
              className="transition-all duration-500 ease-out"
            />
          );
        })}
      </svg>

      {/* Central Total Trophy Display */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
        <div className="font-mono font-bold text-theme-accent text-xl tabular-nums leading-none drop-shadow-sm">
          {totalSlams}
        </div>
        <span className="font-mono text-[8px] text-white/50 uppercase tracking-widest mt-1 leading-none">
          {totalSlams === 1 ? 'SLAM' : 'SLAMS'}
        </span>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------------
// 4. DuelPieChart
// Head-to-Head rivalry showdown donut comparing Player 1 wins vs Player 2 wins
// ----------------------------------------------------------------------------
export interface DuelPieChartProps {
  p1Wins: number;
  p2Wins: number;
  p1Name: string;
  p2Name: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
  p1Color?: string;
  p2Color?: string;
}

export const DuelPieChart: React.FC<DuelPieChartProps> = ({
  p1Wins,
  p2Wins,
  p1Name,
  p2Name,
  size = 104,
  strokeWidth = 8,
  className = '',
  p1Color = '#e5c378', // Champagne Gold
  p2Color = '#38bdf8', // Laykold Cyan
}) => {
  const total = p1Wins + p2Wins;
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  if (total === 0) {
    return (
      <div 
        className={`relative inline-flex items-center justify-center ${className}`}
        title={`${p1Name} vs ${p2Name}: No direct matches recorded`}
        aria-label={`${p1Name} vs ${p2Name} duel chart: 0 to 0`}
      >
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="transform -rotate-90 select-none"
        >
          <circle
            cx={center}
            cy={center}
            r={radius + strokeWidth / 2 + 2}
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="0.75"
            strokeDasharray="2 3"
          />
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.07)"
            strokeWidth={strokeWidth}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          <span className="font-mono text-xs text-white/40 tabular-nums font-semibold">0 - 0</span>
          <span className="font-mono text-[7px] text-white/30 uppercase tracking-widest mt-0.5">
            NO CLASHES
          </span>
        </div>
      </div>
    );
  }

  const p1Ratio = p1Wins / total;
  const p2Ratio = p2Wins / total;
  const isBoth = p1Wins > 0 && p2Wins > 0;
  const gap = isBoth ? strokeWidth + 4 : 0;

  const p1Raw = p1Ratio * circumference;
  const p2Raw = p2Ratio * circumference;
  const p1Length = Math.max(0.1, p1Raw - gap);
  const p2Length = Math.max(0.1, p2Raw - gap);
  const p1Offset = isBoth ? gap / 2 : 0;
  const p2Offset = p1Raw + (isBoth ? gap / 2 : 0);

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90 select-none drop-shadow-md"
      >
        {/* Outer Horology Telemetry Ring */}
        <circle
          cx={center}
          cy={center}
          r={radius + strokeWidth / 2 + 2.5}
          fill="none"
          stroke="rgba(255, 255, 255, 0.12)"
          strokeWidth="0.75"
          strokeDasharray="1.5 3"
        />

        {/* Base Track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.05)"
          strokeWidth={strokeWidth}
        />

        {/* Player 1 Slice */}
        {p1Wins > 0 && (
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={p1Color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${p1Length} ${circumference}`}
            strokeDashoffset={-p1Offset}
            strokeLinecap="round"
            className="transition-all duration-500 ease-out"
          />
        )}

        {/* Player 2 Slice */}
        {p2Wins > 0 && (
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={p2Color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${p2Length} ${circumference}`}
            strokeDashoffset={-p2Offset}
            strokeLinecap="round"
            className="transition-all duration-500 ease-out"
          />
        )}
      </svg>

      {/* Central Head-to-Head Clash Score */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
        <div className="flex items-center gap-1 font-mono text-base sm:text-lg font-bold tabular-nums leading-none">
          <span style={{ color: p1Color }}>{p1Wins}</span>
          <span className="text-white/20 text-xs font-light">:</span>
          <span style={{ color: p2Color }}>{p2Wins}</span>
        </div>
        <span className="font-mono text-[7px] text-white/40 uppercase tracking-widest mt-1 leading-none">
          H2H LEDGER
        </span>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------------
// 5. MiniDualShareMeter
// Ultra-compact 24px-30px dual donut meter for match stats box score & telemetry
// ----------------------------------------------------------------------------
export interface MiniDualShareMeterProps {
  val1: number;
  val2: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  color1?: string;
  color2?: string;
}

export const MiniDualShareMeter: React.FC<MiniDualShareMeterProps> = ({
  val1,
  val2,
  size = 28,
  strokeWidth = 3.5,
  className = '',
  color1 = '#e5c378', // Champagne gold
  color2 = '#38bdf8', // Laykold cyan
}) => {
  const total = val1 + val2;
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  if (total === 0) {
    return (
      <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth={strokeWidth}
          />
        </svg>
      </div>
    );
  }

  const ratio1 = val1 / total;
  const gap = val1 > 0 && val2 > 0 ? 1.5 : 0;
  const len1 = Math.max(0.5, ratio1 * circumference - gap);
  const len2 = Math.max(0.5, (1 - ratio1) * circumference - gap);
  const offset2 = ratio1 * circumference;

  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90 select-none">
        {/* Track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.06)"
          strokeWidth={strokeWidth}
        />
        {/* P1 Slice */}
        {val1 > 0 && (
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={color1}
            strokeWidth={strokeWidth}
            strokeDasharray={`${len1} ${circumference}`}
            strokeLinecap="round"
          />
        )}
        {/* P2 Slice */}
        {val2 > 0 && (
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={color2}
            strokeWidth={strokeWidth}
            strokeDasharray={`${len2} ${circumference}`}
            strokeDashoffset={-offset2}
            strokeLinecap="round"
          />
        )}
      </svg>
    </div>
  );
};

// ----------------------------------------------------------------------------
// 6. MiniStatGauge
// Refined mini circular donut gauge (e.g. 34-40px) for PlayerCard & compact views
// ----------------------------------------------------------------------------
export interface MiniStatGaugeProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  strokeColor?: string;
  trackColor?: string;
  className?: string;
  showText?: boolean;
}

export const MiniStatGauge: React.FC<MiniStatGaugeProps> = ({
  percentage,
  size = 36,
  strokeWidth = 3.5,
  strokeColor = '#e5c378',
  trackColor = 'rgba(255, 255, 255, 0.08)',
  className = '',
  showText = true,
}) => {
  const pct = Math.max(0, Math.min(100, percentage));
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeLength = (pct / 100) * circumference;

  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90 select-none"
      >
        {/* Track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        {/* Value Arc */}
        {pct > 0 && (
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={`${strokeLength} ${circumference}`}
            strokeLinecap="round"
          />
        )}
      </svg>
      {showText && (
        <span className="absolute inset-0 flex items-center justify-center font-mono text-[9px] font-semibold text-white/90 tabular-nums pointer-events-none">
          {Math.round(pct)}%
        </span>
      )}
    </div>
  );
};
