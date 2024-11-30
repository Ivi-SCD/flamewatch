import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['react-leaflet', 'papaparse', '@google/generative-ai'],
      output: {
        globals: {
          'react-leaflet': 'ReactLeaflet',
          'papaparse': 'Papa',
          '@google/generative-ai': 'GoogleGenerativeAI'
        }
      }
    }
  },
  optimizeDeps: {
    include: ['react-leaflet', 'papaparse', '@google/generative-ai']
  }
})