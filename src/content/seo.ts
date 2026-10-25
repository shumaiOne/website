import type { FaqItem, RouteMeta } from '../types';
import { FEATURE_PAGES } from './features';
import { HOME_FAQS } from './home';
import { ROUTE_BY_KEY } from './routes';
import { GITHUB_URL, SITE_URL } from './site';

const ORG_ID = `${SITE_URL}/#organization`;
const SOFTWARE_ID = `${SITE_URL}/#software`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export const absoluteUrl = (path: string): string =>
  path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`;

const escapeAttr = (value: string): string =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Head tags (title, description, canonical, social cards) for a route. */
export function buildHeadTags(route: RouteMeta): string {
  const url = absoluteUrl(route.path);
  const image = `${SITE_URL}${route.ogImage}`;
  const t = escapeAttr(route.title);
  const d = escapeAttr(route.description);
  const alt = escapeAttr(route.ogImageAlt);
  return [
    `<title>${t}</title>`,
    `<meta name="description" content="${d}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Shumai" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${t}" />`,
    `<meta property="og:description" content="${d}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:type" content="image/jpeg" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${alt}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:url" content="${url}" />`,
    `<meta name="twitter:title" content="${t}" />`,
    `<meta name="twitter:description" content="${d}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<meta name="twitter:image:alt" content="${alt}" />`,
  ].join('\n    ');
}

const faqPage = (url: string, items: FaqItem[]) => ({
  '@type': 'FAQPage',
  '@id': `${url}#faq`,
  mainEntity: items.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
});

const organization = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'Shumai',
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/favicon-512x512.png`,
  sameAs: [GITHUB_URL, 'https://hub.docker.com/r/shumaione/shumai'],
};

const website = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: 'Shumai',
  inLanguage: 'en',
  publisher: { '@id': ORG_ID },
};

const software = {
  '@type': 'SoftwareApplication',
  '@id': SOFTWARE_ID,
  name: 'Shumai',
  url: `${SITE_URL}/`,
  description: ROUTE_BY_KEY.home.description,
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Video review and media asset management',
  operatingSystem: 'Linux, macOS, Windows (Docker)',
  isAccessibleForFree: true,
  license: 'https://opensource.org/licenses/MIT',
  codeRepository: GITHUB_URL,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Self-hosted with Docker Compose, NPM, or Kubernetes',
    'Local or S3-compatible storage',
    'Frame-accurate video comments and annotations',
    'Version stacks and side-by-side compare',
    'NLE comment export for Premiere Pro, DaVinci Resolve, Final Cut Pro, and Avid',
    '3D model turntable review for GLB, FBX, OBJ, STL, USD, and DAE',
    'PSD, camera RAW, PDF, and Office document previews',
    'Custom metadata fields and smart collections',
    'Multimodal semantic search',
    'Password-protected, expiring, watermarked share links',
    'Kanban task management',
    'AI agent for video, image, and 3D review',
  ],
  screenshot: [
    `${SITE_URL}/screens/review-1600.webp`,
    `${SITE_URL}/screens/model-1600.webp`,
    `${SITE_URL}/screens/kanban-1600.webp`,
  ],
  publisher: { '@id': ORG_ID },
};

/** JSON-LD graph for a route. */
export function buildStructuredData(route: RouteMeta): string {
  const url = absoluteUrl(route.path);
  const graph: Record<string, unknown>[] = [organization, website];

  if (route.key === 'home') {
    graph.push(software, faqPage(url, HOME_FAQS));
  } else {
    const page = FEATURE_PAGES[route.key];
    const crumbs = [{ name: 'Home', item: `${SITE_URL}/` }];
    if (route.path.startsWith('/features/')) {
      crumbs.push({ name: 'Features', item: `${SITE_URL}/#features` });
    }
    crumbs.push({ name: route.label, item: url });

    graph.push(
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: route.title,
        description: route.description,
        inLanguage: 'en',
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': SOFTWARE_ID },
        primaryImageOfPage: `${SITE_URL}${route.ogImage}`,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: crumbs.map((c, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: c.name,
          item: c.item,
        })),
      },
      faqPage(url, page.faqs),
    );
  }

  const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
  // Prevent "</script>" sequences from terminating the tag early.
  return `<script type="application/ld+json">${json.replace(/</g, '\\u003c')}</script>`;
}
