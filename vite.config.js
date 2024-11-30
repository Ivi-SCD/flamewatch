import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['react-leaflet', 'papaparse'],
      output: {
        globals: {
          'react-leaflet': 'ReactLeaflet',
          'papaparse': 'Papa'
        }
      }
    }
  },
  optimizeDeps: {
    include: ['react-leaflet', 'papaparse']
  }
})