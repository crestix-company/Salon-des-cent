import assert from 'node:assert/strict';
const origin = process.argv[2];
assert(origin, 'Provide the full site URL, including any repository prefix.');
const base = new URL(origin.endsWith('/') ? origin : origin + '/');
const prefix = base.pathname.replace(/\/$/, '');
const pageUrl = (route) =>
  new URL(prefix + (route === '/' ? '/' : route + '/'), base);
const pages = new Map();
for (const route of ['/', '/concept', '/menu', '/owner']) {
  const r = await fetch(pageUrl(route));
  assert.equal(r.status, 200, `${route}: status`);
  const html = await r.text();
  assert(html.includes('サロンデサン'), `${route}: site identity`);
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1, `${route}: h1`);
  assert(
    !/ローカル確認|npm ci|File not found|Untitled site|Getting started|Loading your site|Invalid hook call|Internal Server Error/.test(
      html,
    ),
    'No starter or runtime error',
  );
  pages.set(route, html);
  const bookingAnchors = [
    ...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g),
  ].filter(([, attrs, body]) =>
    /公式.*(?:予約|サイト)/.test(body.replace(/<[^>]+>/g, '')),
  );
  assert(
    bookingAnchors.length >= 3,
    `${route}: header, page and mobile booking CTAs exist`,
  );
  for (const [, attrs] of bookingAnchors) {
    assert(
      attrs.includes('href="http://salon-de-san.com/pcreserve.php"'),
      `${route}: primary CTA uses direct salon booking`,
    );
    assert(
      attrs.includes('rel="noopener noreferrer"'),
      `${route}: safe external link`,
    );
  }
  const primary = html.match(/<a\b[^>]*class="reservation-main"[^>]*>/)?.[0];
  if (primary)
    assert(
      primary.includes('href="http://salon-de-san.com/pcreserve.php"'),
      `${route}: prominent booking button is salon-first`,
    );
  console.log('PAGE OK', route);
}
const assets = new Set();
for (const [route, html] of pages) {
  for (const [, css] of html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/g)) {
    for (const [, path] of css.matchAll(
      /url\(\s*['"]?([^)'"\s]+)['"]?\s*\)/g,
    )) {
      const font = new URL(path, pageUrl(route));
      if (font.origin === base.origin) assets.add(font.pathname);
    }
  }
  for (const match of html.matchAll(
    /<(?:img|script|link)\b[^>]*?(?:src|href)="([^"#]+)"/g,
  )) {
    if (match[1].startsWith('/')) assets.add(match[1]);
  }
  for (const match of html.matchAll(/src[Ss]et="([^"]+)"/g)) {
    for (const entry of match[1].split(',')) {
      const path = entry.trim().split(/\s+/)[0];
      if (path.startsWith('/')) assets.add(path);
    }
  }
  for (const match of html.matchAll(/<a\b[^>]*href="(\/[^"]*|#[^"]*)"/g)) {
    const target = new URL(match[1], pageUrl(route));
    assert(
      target.pathname.startsWith(prefix + '/'),
      'Navigation escapes site prefix',
    );
    const logicalRoute =
      target.pathname.slice(prefix.length).replace(/\/$/, '') || '/';
    const destination = pages.get(logicalRoute);
    assert(
      destination,
      `Missing route ${target.pathname} linked from ${route}`,
    );
    if (target.hash)
      assert(
        destination.includes(`id="${target.hash.slice(1)}"`),
        `Missing ${target.hash} on ${target.pathname}`,
      );
  }
}
let imageBytes = 0;
for (const asset of assets) {
  assert(asset.startsWith(prefix + '/'), 'Asset escapes site prefix: ' + asset);
  const url = new URL(asset, origin);
  const r = await fetch(url);
  assert.equal(r.status, 200, `Asset ${asset}`);
  const data = await r.arrayBuffer();
  assert(data.byteLength > 0);
  if (asset.endsWith('.css'))
    assert(
      r.headers.get('content-type')?.includes('text/css'),
      'CSS must not be fallback HTML',
    );
  if (asset.endsWith('.js'))
    assert(
      r.headers.get('content-type')?.includes('javascript'),
      'JS must not be fallback HTML',
    );
  if (asset.endsWith('.woff2'))
    assert.equal(
      new TextDecoder().decode(data.slice(0, 4)),
      'wOF2',
      'Font data, not fallback HTML',
    );
  if (asset.startsWith(prefix + '/images/')) {
    assert(
      r.headers.get('content-type')?.startsWith('image/'),
      `Image MIME: ${asset}`,
    );
    imageBytes += data.byteLength;
  }
  if (r.headers.get('content-type')?.includes('text/css')) {
    const css = new TextDecoder().decode(data);
    for (const [, path] of css.matchAll(
      /url\(\s*['"]?([^)'"\s]+)['"]?\s*\)/g,
    )) {
      const font = new URL(path, url);
      if (font.origin === base.origin) assets.add(font.pathname);
    }
  }
  console.log('ASSET OK', asset, data.byteLength);
}
assert.equal(
  [...pages.get('/menu').matchAll(/<dt>/g)].length,
  16,
  'Expected 16 menu items',
);
for (const text of [
  '0258-77-3631',
  '毎週月曜日・第1火曜日',
  '新潟県長岡市西宮内2-4',
  'https://beauty.hotpepper.jp/slnH000240941/',
  'http://salon-de-san.com/pcreserve.php',
])
  assert(pages.get('/').includes(text), text);
assert(pages.get('/owner').includes('栃原 康彦'));
assert(
  pages
    .get('/owner')
    .includes('https://beauty.hotpepper.jp/slnH000240941/stylist/T000183967/'),
);
for (const id of ['gentle', 'color', 'design', 'scalp'])
  assert(pages.get('/concept').includes(`id="${id}"`));
console.log(
  'PASS: four routes, 16 menu items, site facts, internal anchors, assets and booking destinations. All image variants combined:',
  imageBytes,
  'bytes',
);
