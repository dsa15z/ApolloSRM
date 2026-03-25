const { chromium } = require('/opt/node22/lib/node_modules/playwright');

const DIR = '/home/user/ApolloSRM/screenshots';
const BASE = 'https://demo.apollosrm.com';
const EMAIL = 'derek@apollosrm.com';
const PASS = 'Chuy2025!';
const PROXY = process.env.https_proxy;

async function shot(page, name) {
  // Use CSS to skip font loading issues
  await page.addStyleTag({ content: '* { font-display: swap !important; }' }).catch(() => {});
  const path = `${DIR}/${name}.png`;
  await page.screenshot({ path, fullPage: false, timeout: 10000 }).catch(async () => {
    // Fallback: viewport only
    await page.screenshot({ path, fullPage: false, clip: { x: 0, y: 0, width: 1440, height: 900 }, timeout: 5000 }).catch(() => {
      console.log(`  [WARN] Screenshot failed: ${name}`);
    });
  });
  console.log(`[SHOT] ${name} | ${page.url()}`);
}

(async () => {
  const browser = await chromium.launch({
    headless: true,
    proxy: { server: PROXY },
    args: ['--no-sandbox', '--ignore-certificate-errors', '--disable-web-fonts'],
  });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    ignoreHTTPSErrors: true,
  });
  page.setDefaultTimeout(30000);

  // Block font requests to avoid timeout
  await page.route('**/*.woff2', route => route.abort());
  await page.route('**/*.woff', route => route.abort());
  await page.route('**/fonts.gstatic.com/**', route => route.abort());
  await page.route('**/fonts.googleapis.com/**', route => route.abort());

  // 1. Navigate
  console.log('=== Navigating to app ===');
  await page.goto(`${BASE}/app/`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(5000);
  await shot(page, '01-initial');

  // 2. Login
  console.log('\n=== Logging in ===');
  const emailInput = await page.$('input[type="email"], input[name="email"], input[name="username"], input[placeholder*="email" i], input[placeholder*="user" i], input[id*="email" i], input[formcontrolname*="email" i], input[formcontrolname*="user" i]');
  const passInput = await page.$('input[type="password"]');

  if (emailInput && passInput) {
    await emailInput.fill(EMAIL);
    await passInput.fill(PASS);
    await shot(page, '02-login-filled');

    const btn = await page.$('button[type="submit"], button:has-text("Sign"), button:has-text("Log"), button:has-text("Submit"), button:has-text("Enter")');
    if (btn) {
      await btn.click();
      await page.waitForTimeout(8000);
    }
    await shot(page, '03-after-login');
    console.log('URL after login:', page.url());
  } else {
    console.log('No login form found on this page');
    // Maybe we're already redirected
    const bodyText = await page.textContent('body').catch(() => '');
    console.log('Page content (200 chars):', bodyText?.substring(0, 200));
  }

  // 3. Collect nav links
  console.log('\n=== Discovering navigation ===');
  const links = await page.evaluate(() => {
    const els = document.querySelectorAll('a[href]');
    return [...els]
      .map(a => ({ text: a.textContent.trim().substring(0, 60), href: a.href }))
      .filter(l => l.href.includes('/app/') && l.text && !l.href.includes('#'));
  });

  const visited = new Set();
  visited.add(new URL(page.url()).pathname);
  const queue = [];
  for (const l of links) {
    try {
      const p = new URL(l.href).pathname;
      if (!visited.has(p)) { visited.add(p); queue.push(l); }
    } catch {}
  }
  console.log(`Found ${queue.length} unique pages`);
  queue.forEach(l => console.log(`  ${l.text} -> ${new URL(l.href).pathname}`));

  // 4. Visit each page
  console.log('\n=== Crawling pages ===');
  let num = 4;
  for (const link of queue) {
    try {
      await page.goto(link.href, { waitUntil: 'domcontentloaded', timeout: 20000 });
      await page.waitForTimeout(3000);

      const slug = new URL(link.href).pathname.replace(/\//g, '-').replace(/^-+|-+$/g, '') || 'page';
      await shot(page, `${String(num).padStart(2, '0')}-${slug.substring(0, 60)}`);

      // Discover more links from this page
      const moreLinks = await page.evaluate(() => {
        return [...document.querySelectorAll('a[href]')]
          .map(a => ({ text: a.textContent.trim().substring(0, 60), href: a.href }))
          .filter(l => l.href.includes('/app/') && l.text && !l.href.includes('#'));
      });
      for (const ml of moreLinks) {
        try {
          const p = new URL(ml.href).pathname;
          if (!visited.has(p)) { visited.add(p); queue.push(ml); }
        } catch {}
      }

      num++;
    } catch (e) {
      console.log(`  Failed: ${link.text}: ${e.message.substring(0, 100)}`);
    }
  }

  console.log(`\n=== Done: ${num - 1} screenshots ===`);
  console.log('Visited paths:', [...visited].sort());
  await browser.close();
})().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
