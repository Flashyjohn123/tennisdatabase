# TennisDatabase 🎾 (Pro Tennis Tracker & Analytics)

A standalone, high-performance web application for tracking ATP and WTA professional tennis statistics, player profiles, head-to-head records, Grand Slam records, and championship match logs.

## 🚀 Getting Started

To run the project locally on your machine:

```bash
# 1. Navigate to the project directory
cd "C:\Users\Shunk\OneDrive\Projects\tennisdatabase"

# 2. Run the development server
bun run dev
```

Then open `http://localhost:5173` in your web browser.

## 🌟 Key Features

1. **Player Directory & Profiles**:
   - Comprehensive player cards for ATP and WTA legends (Alcaraz, Sinner, Djokovic, Swiatek, Sabalenka, Gauff, Federer, Nadal, Serena Williams, and more).
   - Surface breakdown (Clay, Hard, Grass win rates and records).
   - Grand Slam breakdown (Australian Open, Roland Garros, Wimbledon, US Open).
   - Biography, physical details, playing styles (1HBH / 2HBH / Left-handed), and major rivalries.

2. **Head-to-Head (H2H) Comparison Tool**:
   - Compare any two players side-by-side with animated career comparison bars.
   - Surface-by-surface record analysis.
   - List of all past direct encounters and scores.
   - "Random Matchup" generator.

3. **Grand Slams & Tournaments**:
   - Grand Slam hubs (Wimbledon, Roland Garros, Australian Open, US Open).
   - ATP / WTA 1000s and Finals with court speeds, surface characteristics, and all-time tournament winners.

4. **World Rankings Table**:
   - ATP and WTA official standings with point totals, nation filters, and quick profile access.

5. **Match Log & Box Scores**:
   - Historic and recent match scorecards with set scores and tiebreak details.
   - Expandable in-depth match stats (Aces, Double Faults, 1st Serve %, Break Points won/saved, Unforced Errors, Duration).

6. **Interactive Forms & Persistence**:
   - Add new custom players or record new matches on the fly.
   - All custom entries are automatically saved to your browser's local storage.

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide Icons
- **Runtime & Package Manager**: Bun
