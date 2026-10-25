import path from 'node:path';
import { cloudflare } from '@cloudflare/vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';
import { routeKeyFromPath } from './src/content/routes';

/**
 * Dedicated pages only exist as prerendered `.html` files after `bun run build`. In dev, serve
 * the app shell for every known route so `main.tsx` can pick the page from the URL. The
 * Cloudflare asset handler resolves `req.originalUrl`, so both fields are rewritten.
 */
function devRoutes(): Plugin {
  return {
    name: 'shumai-dev-routes',
    apply: 'serve',
    enforce: 'pre',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        if (req.method !== 'GET' || !req.url) return next();
        const { pathname, search } = new URL(req.url, 'http://localhost');
        if (pathname !== '/' && routeKeyFromPath(pathname)) {
          const shell = `/${search}`;
          req.url = shell;
          (req as typeof req & { originalUrl?: string }).originalUrl = shell;
        }
        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [devRoutes(), react(), tailwindcss(), cloudflare()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
