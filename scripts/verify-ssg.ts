import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { FEATURE_PAGES } from '../src/content/features';
import { HOME_FAQS, HOME_SECTIONS } from '../src/content/home';
import { ROUTES } from '../src/content/routes';
import { SCREENS } from '../src/content/screens';
import { DEMO_URL, DOCS_URL, GITHUB_URL } from '../src/content/site';
import type { RouteMeta } from '../src/types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '..', 'dist');
const SITE_URL = 'https://shumai.one';

let errors = 0;

function assert(condition: boolean, description: string): void {
  if (condition) {
    console.log(`[SSG Verify] ✓ PASSED: ${description}`);
  } else {
    console.error(`[SSG Verify] ❌ FAILED: ${description}`);
    errors++;
  }
}

const read = (file: string): string | null => {
  const full = path.resolve(distDir, file);
  return fs.existsSync(full) ? fs.readFileSync(full, 'utf-8') : null;
};

/** Escape a value the same way attribute content is escaped in the generated head. */
const escapeAttr = (value: string): string =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Decode the entities React emits so rendered text can be compared with source strings. */
const decode = (html: string): string =>
  html
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ');

/** Plain text of an HTML fragment with collapsed whitespace. */
const textOf = (html: string): string =>
  decode(html.replace(/<!--[\s\S]*?-->/g, '').replace(/<[^>]+>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();

const bodyText = (html: string): string => {
  const start = html.indexOf('<body');
  return textOf(start >= 0 ? html.slice(start) : html);
};

const absoluteUrl = (p: string): string => (p === '/' ? `${SITE_URL}/` : `${SITE_URL}${p}`);

/** JSON-LD @types present in the page's structured data. */
function jsonLdTypes(html: string): string[] {
  const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (!match) return [];
  try {
    const data = JSON.parse(match[1]) as { '@graph'?: { '@type': string }[] };
    return (data['@graph'] ?? []).map((node) => node['@type']);
  } catch {
    return ['<invalid json>'];
  }
}

/** Headings, sections, and FAQs each route must ship in its static HTML. */
function expectedContent(route: RouteMeta): { h1: string; headings: string[]; faqs: string[] } {
  if (route.key === 'home') {
    return {
      h1: 'The open-source Frame.io alternative for all your creative work.',
      headings: HOME_SECTIONS.map((s) => s.title),
      faqs: HOME_FAQS.map((f) => f.question),
    };
  }
  const page = FEATURE_PAGES[route.key];
  return {
    h1: page.h1,
    headings: page.details.map((d) => d.title),
    faqs: page.faqs.map((f) => f.question),
  };
}

function verifyRoute(route: RouteMeta): void {
  const label = route.outFile;
  const html = read(route.outFile);
  assert(html !== null, `${label} exists`);
  if (html === null) return;

  const url = absoluteUrl(route.path);
  const ogImage = `${SITE_URL}${route.ogImage}`;

  // Head metadata
  assert(html.includes(`<title>${escapeAttr(route.title)}</title>`), `${label} has its SEO title`);
  assert(
    html.includes(`<meta name="description" content="${escapeAttr(route.description)}" />`),
    `${label} has its meta description`,
  );
  assert(html.includes(`<link rel="canonical" href="${url}" />`), `${label} has canonical ${url}`);
  assert(
    (html.match(/<link rel="canonical"/g) ?? []).length === 1,
    `${label} has exactly one canonical`,
  );
  assert(
    html.includes(`<meta property="og:url" content="${url}" />`) &&
      html.includes(`<meta property="og:title" content="${escapeAttr(route.title)}" />`) &&
      html.includes(`<meta property="og:image" content="${ogImage}" />`),
    `${label} has Open Graph url, title, and image`,
  );
  assert(
    html.includes('<meta name="twitter:card" content="summary_large_image" />') &&
      html.includes(`<meta name="twitter:image" content="${ogImage}" />`),
    `${label} has a Twitter large image card`,
  );
  assert(
    fs.existsSync(path.join(distDir, route.ogImage)),
    `${label} OG image ${route.ogImage} is shipped`,
  );

  // Structured data
  const types = jsonLdTypes(html);
  const requiredTypes =
    route.key === 'home'
      ? ['Organization', 'WebSite', 'SoftwareApplication', 'FAQPage']
      : ['Organization', 'WebPage', 'BreadcrumbList', 'FAQPage'];
  assert(
    requiredTypes.every((t) => types.includes(t)),
    `${label} JSON-LD includes ${requiredTypes.join(', ')}`,
  );

  // Prerendered content
  const { h1, headings, faqs } = expectedContent(route);
  const h1Tags = html.match(/<h1[^>]*>[\s\S]*?<\/h1>/g) ?? [];
  assert(h1Tags.length === 1, `${label} has exactly one H1`);
  if (h1Tags[0]) {
    assert(textOf(h1Tags[0]) === h1, `${label} H1 reads "${h1}"`);
    assert(!/opacity:\s*0/.test(h1Tags[0]), `${label} H1 is not hidden with opacity:0`);
  }
  const text = bodyText(html);
  const missingHeadings = headings.filter((h) => !text.includes(h));
  assert(missingHeadings.length === 0, `${label} renders all ${headings.length} section headings`);
  const missingFaqs = faqs.filter((q) => !text.includes(q));
  assert(missingFaqs.length === 0, `${label} renders all ${faqs.length} FAQ questions`);
  for (const missing of [...missingHeadings, ...missingFaqs])
    console.error(`    missing: ${missing}`);

  // Crawlable links
  assert(html.includes(GITHUB_URL) && html.includes(DOCS_URL), `${label} links to GitHub and docs`);
  const internal = ROUTES.filter((r) => r.key !== route.key).filter((r) =>
    html.includes(`href="${r.path}"`),
  );
  assert(
    internal.length >= 3,
    `${label} links to at least 3 other site pages (${internal.length})`,
  );
}

function verify(): void {
  console.log('[SSG Verify] Validating generated static pages...');

  for (const route of ROUTES) verifyRoute(route);

  // Home-specific checks
  const index = read('index.html') ?? '';
  assert(index.includes(DEMO_URL), 'index.html links to the live demo');
  assert(
    index.includes(`alt="${escapeAttr(SCREENS.review.alt)}"`),
    'index.html has descriptive screenshot alt text',
  );
  const allLinked = ROUTES.filter((r) => r.key !== 'home').every((r) =>
    index.includes(`href="${r.path}"`),
  );
  assert(allLinked, 'index.html links to every dedicated page');

  // Screenshots referenced by the content exist
  const missingScreens = Object.keys(SCREENS).filter(
    (name) => !fs.existsSync(path.join(distDir, 'screens', `${name}-1600.webp`)),
  );
  assert(missingScreens.length === 0, `all screenshots are shipped ${missingScreens.join(', ')}`);

  // robots.txt and sitemap.xml
  const robots = read('robots.txt');
  assert(
    robots?.includes('User-agent: *') === true &&
      robots.includes(`Sitemap: ${SITE_URL}/sitemap.xml`),
    'robots.txt allows crawling and points to the sitemap',
  );
  const sitemap = read('sitemap.xml') ?? '';
  const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  assert(
    ROUTES.every((r) => sitemapUrls.includes(absoluteUrl(r.path))) &&
      sitemapUrls.length === ROUTES.length,
    `sitemap.xml lists exactly the ${ROUTES.length} public pages`,
  );

  // 404 page
  const notFound = read('404.html');
  assert(notFound !== null, '404.html exists');
  if (notFound !== null) {
    assert(
      notFound.includes('Page Not Found') &&
        notFound.includes('<meta name="robots" content="noindex, nofollow" />'),
      '404.html has its heading and a noindex robots tag',
    );
    assert(!notFound.includes('<link rel="canonical"'), '404.html has no canonical tag');
    assert(!notFound.includes('property="og:url"'), '404.html has no og:url');
    assert(!notFound.includes('application/ld+json'), '404.html has no JSON-LD');
    assert(
      notFound.includes('id="root" data-page="404"'),
      '404.html has the data-page="404" hydration marker',
    );
  }

  if (errors > 0) {
    console.error(`\n[SSG Verify] ❌ Verification failed with ${errors} error(s).`);
    process.exit(1);
  }
  console.log('\n[SSG Verify] ✅ All SSG and SEO assertions passed.');
}

verify();
