import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Local: base `/`
 * GitHub Pages (project site): base `/ET/` via `npm run build:pages`
 * robots.txt Disallow: / + noindex meta — test site must not compete with www.et.nz.
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
