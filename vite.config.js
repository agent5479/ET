import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * React rebuild owns site routes.
 * 1:1 scrape remains as static files under /mirror/* (public/mirror).
 * Intentionally NO robots.txt in public/ — test site must not invite indexing competition.
 */
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
  },
  build: {
    // Static hosting (GitHub Pages) friendly; prerender pass can be added next
    sourcemap: true,
  },
});
