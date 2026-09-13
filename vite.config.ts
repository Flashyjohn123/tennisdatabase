import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    host: true,
    port: 5175,
    open: true,
    proxy: {
      '/api/proxy/tennis-com': {
        target: 'https://www.tennis.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/proxy\/tennis-com/, '/rss/news/'),
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
      },
      '/api/proxy/bbc-tennis': {
        target: 'https://feeds.bbci.co.uk',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/proxy\/bbc-tennis/, '/sport/tennis/rss.xml'),
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
      },
      '/api/proxy/espn-tennis': {
        target: 'https://www.espn.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/proxy\/espn-tennis/, '/espn/rss/tennis/news'),
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
      },
      '/api/proxy/google-tennis': {
        target: 'https://news.google.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/proxy\/google-tennis/, '/rss/search?q=tennis+(ATP+OR+WTA+OR+"Grand+Slam")+when:3d&hl=en-US&gl=US&ceid=US:en'),
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
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
