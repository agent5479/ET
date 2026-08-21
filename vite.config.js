import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Local: base `/`
 * GitHub Pages (project site): base `/ET/` via `npm run build:pages`
 * No robots.txt — test site stays noindex.
 */
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE || '/',
  server: {
    port: 5173,
    strictPort: true,
  },
  build: {
    sourcemap: true,
  },
});
