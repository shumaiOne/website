import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../src/App.tsx';
import { NotFound } from '../src/components/NotFound.tsx';
import { ROUTES } from '../src/content/routes.ts';
import { absoluteUrl, buildHeadTags, buildStructuredData } from '../src/content/seo.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const templatePath = path.resolve(distDir, 'index.html');

const SEO_BLOCK = /<!-- SEO:START[\s\S]*?<!-- SEO:END -->/;

interface PageJob {
  label: string;
  outFile: string;
  rootAttrs: string;
  head: string;
  component: React.ReactElement;
}

function render(template: string, job: PageJob): string {
  if (!SEO_BLOCK.test(template)) {
    throw new Error('SEO block markers not found in dist/index.html');
  }
  const markup = renderToString(job.component);
  return template
    .replace(SEO_BLOCK, job.head)
    .replace('<div id="root"></div>', `<div id="root"${job.rootAttrs}>${markup}</div>`);
}

function writeSitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const urls = ROUTES.map(
    (r) =>
      `  <url>\n    <loc>${absoluteUrl(r.path)}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${r.key === 'home' ? 'weekly' : 'monthly'}</changefreq>\n    <priority>${r.key === 'home' ? '1.0' : '0.8'}</priority>\n  </url>`,
  ).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  fs.writeFileSync(path.resolve(distDir, 'sitemap.xml'), xml, 'utf-8');
  console.log(`[SSG]   ✓ Wrote sitemap.xml with ${ROUTES.length} URLs`);
}

async function prerender() {
  if (!fs.existsSync(templatePath)) {
    console.error(`Error: Template not found at ${templatePath}. Run vite build first.`);
    process.exit(1);
  }

  const template = fs.readFileSync(templatePath, 'utf-8');

  const jobs: PageJob[] = ROUTES.map((route) => ({
    label: route.path,
    outFile: route.outFile,
    rootAttrs: ` data-page="${route.key}"`,
    head: `${buildHeadTags(route)}\n    ${buildStructuredData(route)}`,
    component: <App route={route.key} />,
  }));

  jobs.push({
    label: '/404',
    outFile: '404.html',
    rootAttrs: ' data-page="404"',
    head: [
      '<title>404 — Page Not Found | Shumai</title>',
      '<meta name="description" content="The page you requested could not be found." />',
      '<meta name="robots" content="noindex, nofollow" />',
      '<meta property="og:title" content="404 — Page Not Found | Shumai" />',
      '<meta property="og:description" content="The page you requested could not be found." />',
    ].join('\n    '),
    component: <NotFound />,
  });

  console.log(`[SSG] Starting prerendering for ${jobs.length} pages...`);

  for (const job of jobs) {
    const start = performance.now();
    const html = render(template, job);
    const outPath = path.resolve(distDir, job.outFile);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, html, 'utf-8');
    const duration = (performance.now() - start).toFixed(1);
    const sizeKb = (Buffer.byteLength(html, 'utf-8') / 1024).toFixed(2);
    console.log(
      `[SSG]   ✓ Rendered ${job.label} -> dist/${job.outFile} (${sizeKb} kB, ${duration}ms)`,
    );
  }

  writeSitemap();
  console.log('[SSG] Prerendering complete successfully.');
}

prerender().catch((err) => {
  console.error('[SSG] Prerender failed:', err);
  process.exit(1);
});
