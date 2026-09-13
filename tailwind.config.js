/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Syne"', 'sans-serif'],
        tech: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        court: {
          950: 'var(--theme-bg-base)', // Deepest session surface
          900: 'var(--theme-bg-surface)', // Primary surface / background
          850: 'var(--theme-bg-card)', // Elevated card container
          800: 'var(--theme-bg-card-alt)', // Card surface
          750: 'var(--theme-bg-card-hover)', // Card hover surface
          700: 'var(--theme-border)', // Borders / structural lines
          600: 'var(--theme-border-highlight)',
          500: 'var(--theme-border-alt)',
          chalk: 'rgba(255, 255, 255, 0.14)',
          line: 'var(--theme-border-highlight)',
        },
        theme: {
          accent: 'var(--theme-accent-primary)',
          'accent-hover': 'var(--theme-accent-hover)',
          'accent-glow': 'var(--theme-accent-glow)',
          'accent-secondary': 'var(--theme-accent-secondary)',
          'accent-tag': 'var(--theme-accent-tag)',
          'pill-bg': 'var(--theme-pill-bg)',
          'pill-text': 'var(--theme-pill-text)',
          'pill-border': 'var(--theme-pill-border)',
        },
        volt: {
          300: '#f0ff70',
          400: '#dcf836',
          500: '#ccff00', // Iconic optic tennis ball neon yellow
          600: '#b3e600',
          DEFAULT: '#ccff00',
        },
        clay: {
          400: '#f97316',
          500: '#ea580c',
          600: '#c2410c', // Roland Garros terracotta
          700: '#9a3412',
          800: '#7c2d12',
          DEFAULT: '#c2410c',
        },
        grass: {
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a', // Wimbledon lawn grass green
          700: '#15803d',
          800: '#166534',
          DEFAULT: '#15803d',
        },
        hard: {
          400: '#38bdf8',
          500: '#0284c7', // US Open / Australian Open hard court blue
          600: '#0369a1',
          700: '#1d4ed8',
          800: '#1e3a8a',
          DEFAULT: '#0284c7',
        },
        wimbledon: {
          purple: '#582386', // Wimbledon Royal Purple
          'purple-light': '#7c3aed',
          'purple-dark': '#3b1259',
          green: '#15803d',
        },
        atp: {
          DEFAULT: '#0284c7',
          blue: '#0284c7',
          light: '#38bdf8',
          dark: '#034b75',
        },
        wta: {
          DEFAULT: '#9333ea',
          purple: '#9333ea',
          orchid: '#a855f7',
          light: '#c084fc',
          dark: '#581c87',
        },
        slam: {
          gold: '#f59e0b',
          amber: '#fbbf24',
          light: '#fef08a',
          DEFAULT: '#f59e0b',
        }
      },
      boxShadow: {
        'volt-sm': '0 0 10px rgba(204, 255, 0, 0.25)',
        'volt': '0 0 20px rgba(204, 255, 0, 0.3)',
        'volt-lg': '0 0 35px rgba(204, 255, 0, 0.45)',
        'theme-glow': '0 0 25px var(--theme-accent-glow)',
        'court-card': '0 10px 30px -10px rgba(3, 12, 8, 0.7)',
        'court-glow': '0 0 30px rgba(34, 197, 94, 0.12)',
        'clay-glow': '0 0 25px rgba(234, 88, 12, 0.25)',
        'hard-glow': '0 0 25px rgba(2, 132, 199, 0.25)',
        'wimbledon-glow': '0 0 25px rgba(88, 35, 134, 0.35)',
      }
    },
  },
  plugins: [],
}
