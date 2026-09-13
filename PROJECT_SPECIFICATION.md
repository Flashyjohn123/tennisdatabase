# Tennis Database - Project Specification

## 1. Project Overview
Tennis Database (`tennisdatabase`) is an AI-enhanced, responsive web application for tracking ATP and WTA professional tennis data, rankings, Grand Slam tournaments, player profiles, head-to-head match histories, and live match feeds.

## 2. Directory Structure
```
tennisdatabase/
├── .vscode/               # VS Code workspace tasks, launch, settings, and extension configs
├── public/                # Static assets (favicon.svg, manifest.json)
├── src/
│   ├── components/        # UI Views & Components
│   │   ├── Navbar.tsx
│   │   ├── OverviewView.tsx
│   │   ├── PlayersView.tsx
│   │   ├── PlayerCard.tsx
│   │   ├── PlayerDetailModal.tsx
│   │   ├── HeadToHeadView.tsx
│   │   ├── TournamentsView.tsx
│   │   ├── RankingsView.tsx
│   │   ├── MatchesView.tsx
│   │   ├── AddPlayerModal.tsx
│   │   └── AddMatchModal.tsx
│   ├── data/              # Curated datasets (players, tournaments, classic matches)
│   ├── services/          # Data fetching, search, and state helpers
│   ├── types/             # TypeScript type definitions (tennis.ts)
│   ├── App.tsx            # Main React component & state hub
│   ├── index.css          # Tailwind base & custom animations
│   └── main.tsx           # Application entry point
├── .gitignore             # Standard Git ignore rules
├── bun.lock               # Dependency lockfile
├── index.html             # HTML root document
├── package.json           # Dependencies and runtime scripts
├── postcss.config.js      # PostCSS configuration
├── README.md              # Project quickstart guide
├── tailwind.config.js     # Tailwind CSS theme extensions
├── tsconfig.json          # TypeScript project configuration
├── tsconfig.node.json     # TypeScript Vite node config
└── vite.config.ts         # Vite bundler configuration
```

## 3. Technology Stack
- **Framework**: React 18 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Lucide React Icons
- **Runtime / Package Manager**: Bun
- **AI Tooling**: OpenCode integration
