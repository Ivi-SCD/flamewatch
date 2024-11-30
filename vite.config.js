import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      external: ['react-leaflet', 'papaparse'],
      output: {
        globals: {
          'react-leaflet': 'ReactLeaflet',
          'papaparse': 'Papa'
        },
        manualChunks(id) {
          if (id.includes('@google/generative-ai')) {
            return 'google-ai'
          }
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        }
      }
    }
  },
  resolve: {
    alias: {
      '@google/generative-ai': '@google/generative-ai/dist/index.js'
    }
  },
  optimizeDeps: {
    include: ['react-leaflet', 'papaparse', '@google/generative-ai']
  }
})