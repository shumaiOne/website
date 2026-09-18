import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

function verify() {
  console.log('[SSG Verify] Starting validation of generated static assets...');
  let errors = 0;

  function assert(condition: boolean, description: string) {
    if (!condition) {
      console.error(`[SSG Verify] ❌ FAILED: ${description}`);
      errors++;
    } else {
      console.log(`[SSG Verify] ✓ PASSED: ${description}`);
    }
  }

  // 1. Verify index.html exists
  const indexPath = path.resolve(distDir, 'index.html');
  assert(fs.existsSync(indexPath), 'dist/index.html exists');

  const indexHtml = fs.readFileSync(indexPath, 'utf-8');

  // 2. Verify title and metadata
  assert(
    indexHtml.includes('<title>Shumai — Open-Source Frame.io Alternative</title>'),
    'index.html contains expected SEO title',
  );
  assert(
    indexHtml.includes('name="description"') && indexHtml.includes('Frame.io alternative'),
    'index.html contains meta description with Frame.io alternative',
  );
  assert(
    indexHtml.includes('<link rel="canonical" href="https://shumai.one/" />'),
    'index.html contains canonical URL link',
  );

  // 3. Verify Open Graph and Twitter
  assert(
    indexHtml.includes('property="og:title"') &&
      indexHtml.includes('property="og:description"') &&
      indexHtml.includes('property="og:image"') &&
      indexHtml.includes('https://shumai.one/list-example.webp'),
    'index.html contains complete Open Graph metadata',
  );
  assert(
    indexHtml.includes('name="twitter:card" content="summary_large_image"') &&
      indexHtml.includes('name="twitter:image" content="https://shumai.one/list-example.webp"'),
    'index.html contains complete Twitter card metadata',
  );

  // 4. Verify JSON-LD
  assert(
    indexHtml.includes('"@type":"SoftwareApplication"') ||
      indexHtml.includes('"@type": "SoftwareApplication"'),
    'index.html contains SoftwareApplication JSON-LD schema',
  );
  assert(
    indexHtml.includes('"@type":"Organization"') || indexHtml.includes('"@type": "Organization"'),
    'index.html contains Organization JSON-LD schema',
  );

  // 5. Verify prerendered Hero content
  assert(
    indexHtml.includes('The open-source Frame.io alternative for all your'),
    'dist/index.html contains rendered H1 heading in raw HTML',
  );
  assert(
    indexHtml.includes(
      'Shumai is an open-source, self-hosted Frame.io alternative for creative teams',
    ),
    'dist/index.html contains rendered hero descriptive paragraph in raw HTML',
  );

  // 6. Verify crucial no-hidden-opacity rule on hero
  const h1Match = indexHtml.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (h1Match) {
    const h1Tag = h1Match[0];
    assert(
      !h1Tag.includes('opacity:0') && !h1Tag.includes('opacity: 0'),
      'H1 is NOT hidden with opacity:0',
    );
  } else {
    assert(false, 'H1 tag not found in dist/index.html');
  }

  // 7. Verify Links
  assert(
    indexHtml.includes('https://github.com/shumaiOne/shumai'),
    'dist/index.html contains crawlable link to GitHub',
  );
  assert(
    indexHtml.includes('https://docs.shumai.one'),
    'dist/index.html contains crawlable link to Documentation',
  );
  assert(indexHtml.includes('https://staging.shumai.one'), 'dist/index.html contains link to Demo');

  // 8. Verify Image Alt Text
  assert(
    indexHtml.includes(
      'alt="Shumai creative asset management interface showing project files, media assets, and folders"',
    ),
    'dist/index.html contains descriptive image alt attribute',
  );

  // 9. Verify robots.txt and sitemap.xml
  const robotsPath = path.resolve(distDir, 'robots.txt');
  assert(fs.existsSync(robotsPath), 'dist/robots.txt exists');
  if (fs.existsSync(robotsPath)) {
    const robotsTxt = fs.readFileSync(robotsPath, 'utf-8');
    assert(
      robotsTxt.includes('User-agent: *') &&
        robotsTxt.includes('Sitemap: https://shumai.one/sitemap.xml'),
      'robots.txt has expected directives',
    );
  }

  const sitemapPath = path.resolve(distDir, 'sitemap.xml');
  assert(fs.existsSync(sitemapPath), 'dist/sitemap.xml exists');
  if (fs.existsSync(sitemapPath)) {
    const sitemapXml = fs.readFileSync(sitemapPath, 'utf-8');
    assert(sitemapXml.includes('https://shumai.one/'), 'sitemap.xml contains homepage URL');
  }

  // 10. Verify 404.html
  const notFoundPath = path.resolve(distDir, '404.html');
  assert(fs.existsSync(notFoundPath), 'dist/404.html exists');
  if (fs.existsSync(notFoundPath)) {
    const notFoundHtml = fs.readFileSync(notFoundPath, 'utf-8');
    assert(
      notFoundHtml.includes('Page Not Found') &&
        notFoundHtml.includes('<meta name="robots" content="noindex, nofollow" />'),
      'dist/404.html contains 404 heading and noindex meta tag',
    );
    assert(
      !notFoundHtml.includes('<link rel="canonical"'),
      'dist/404.html does not contain a canonical tag',
    );
  }

  if (errors > 0) {
    console.error(`\n[SSG Verify] ❌ Verification failed with ${errors} error(s).`);
    process.exit(1);
  } else {
    console.log('\n[SSG Verify] ✅ All SSG and SEO assertions passed perfectly!');
  }
}

verify();
