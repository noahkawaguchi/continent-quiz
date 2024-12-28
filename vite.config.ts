import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/continent-quiz/',
  build: {
    outDir: 'dist', // Ensure output goes to the 'dist' directory
    emptyOutDir: true, // Clean the output directory before building
  },
});
