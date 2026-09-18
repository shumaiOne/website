import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../src/App.tsx';
import { NotFound } from '../src/components/NotFound.tsx';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const templatePath = path.resolve(distDir, 'index.html');

interface RouteConfig {
  path: string;
  outFile: string;
  title?: string;
  description?: string;
  noindex?: boolean;
  component: React.ReactElement;
}

const routes: RouteConfig[] = [
  {
    path: '/',
    outFile: path.resolve(distDir, 'index.html'),
    component: <App />,
  },
  {
    path: '/404',
    outFile: path.resolve(distDir, '404.html'),
    title: '404 — Page Not Found | Shumai',
    description: 'The page you requested could not be found.',
    noindex: true,
    component: <NotFound />,
  },
];

async function prerender() {
  if (!fs.existsSync(templatePath)) {
    console.error(`Error: Template not found at ${templatePath}. Run vite build first.`);
    process.exit(1);
  }

  const template = fs.readFileSync(templatePath, 'utf-8');

  console.log(`[SSG] Starting prerendering for ${routes.length} routes...`);

  for (const route of routes) {
    const start = performance.now();
    let html = template;

    // Render component to string
    const renderedMarkup = renderToString(route.component);

    // Inject prerendered content into #root
    html = html.replace('<div id="root"></div>', `<div id="root">${renderedMarkup}</div>`);

    // Customize title if specified
    if (route.title) {
      html = html.replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`);
    }

    // Customize description if specified
    if (route.description) {
      html = html.replace(
        /<meta\s+name="description"\s+content=".*?"\s*\/?>/i,
        `<meta name="description" content="${route.description}" />`,
      );
    }

    // Add noindex for 404 and remove canonical
    if (route.noindex) {
      html = html.replace(/<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i, '');
      html = html.replace(
        '</head>',
        '    <meta name="robots" content="noindex, nofollow" />\n  </head>',
      );
    }

    // Ensure target directory exists
    const outDir = path.dirname(route.outFile);
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }

    fs.writeFileSync(route.outFile, html, 'utf-8');
    const duration = (performance.now() - start).toFixed(1);
    const sizeKb = (Buffer.byteLength(html, 'utf-8') / 1024).toFixed(2);
    console.log(
      `[SSG]   ✓ Rendered ${route.path} -> ${path.relative(rootDir, route.outFile)} (${sizeKb} kB, ${duration}ms)`,
    );
  }

  console.log('[SSG] Prerendering complete successfully.');
}

prerender().catch((err) => {
  console.error('[SSG] Prerender failed:', err);
  process.exit(1);
});
