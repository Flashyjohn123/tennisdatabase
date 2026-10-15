import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: process.env.VERCEL ? '/' : './',
  plugins: [react()],
  resolve: {
    dedupe: ['tslib'],
  },
  server: {
    host: true,
    port: 5175,
    allowedHosts: true,
    open: true,
    proxy: {
      '/api/proxy/espn-tennis': {
        target: 'https://www.espn.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/proxy\/espn-tennis/, '/espn/rss/tennis/news'),
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
      },
      '/api/proxy/atp-tour': {
        target: 'https://news.google.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/proxy\/atp-tour/, '/rss/search?q=site:atptour.com/en/news&hl=en-US&gl=US&ceid=US:en'),
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
      },
      '/api/proxy/atp-news': {
        target: 'https://news.google.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/proxy\/atp-news/, '/rss/search?q=site:atptour.com/en/news&hl=en-US&gl=US&ceid=US:en'),
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
      },
      '/api/proxy/atp-rankings': {
        target: 'https://www.atptour.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/proxy\/atp-rankings/, '/en/rankings/singles'),
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
      },
      '/api/proxy/wta-tennis': {
        target: 'https://www.wtatennis.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/proxy\/wta-tennis/, '/rss-news.xml'),
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
      },
      '/api/proxy/espn-scoreboard-atp': {
        target: 'https://site.api.espn.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/proxy\/espn-scoreboard-atp/, '/apis/site/v2/sports/tennis/atp/scoreboard'),
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        },
      },
      '/api/proxy/espn-scoreboard-wta': {
        target: 'https://site.api.espn.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/proxy\/espn-scoreboard-wta/, '/apis/site/v2/sports/tennis/wta/scoreboard'),
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        },
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-icons': ['lucide-react'],
          'data-rankings': ['./src/data/rankingsTop500ATP.ts', './src/data/rankingsTop500WTA.ts'],
          'data-calendar': ['./src/data/fullCalendarData.ts'],
          'data-draws': ['./src/data/tournamentDrawsData.ts'],
          'data-feed': ['./src/data/mockLiveFeedData.ts'],
        },
      },
    },
  },
})
