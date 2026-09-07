import assert from 'node:assert/strict';
import { readFileSync, statSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(process.argv[2] || 'dist/client');
const prefix = process.argv[3] || '';
const origin = 'https://static-check.invalid';
const checked = new Set();
const pages = new Map();

function checkFile(url, from) {
  const target = new URL(url.replaceAll('&amp;', '&'), from);
  if (target.origin !== origin || target.protocol !== 'https:') return;
  assert(
    target.pathname.startsWith(`${prefix}/`),
    `URL escapes deployment prefix: ${target}`,
  );
  let file = resolve(
    root,
    `.${decodeURIComponent(target.pathname.slice(prefix.length))}`,
  );
  assert(file.startsWith(`${root}/`) || file === root, 'File escapes artifact');
  assert(existsSync(file), `Missing exported file: ${file}`);
  if (statSync(file).isDirectory()) file = resolve(file, 'index.html');
  assert(existsSync(file), `Missing entry page: ${file}`);
  assert(statSync(file).size > 0, `Empty asset: ${file}`);
  if (target.hash && file.endsWith('.html')) {
    assert(
      readFileSync(file, 'utf8').includes(`id="${target.hash.slice(1)}"`),
      `Missing anchor: ${target}`,
    );
  }
  if (checked.has(file)) return;
  checked.add(file);
  if (file.endsWith('.css')) {
    for (const [, asset] of readFileSync(file, 'utf8').matchAll(
      /url\(\s*['"]?([^)'"\s]+)['"]?\s*\)/g,
    ))
      checkFile(asset, target);
  }
  if (file.endsWith('.js')) {
    const js = readFileSync(file, 'utf8');
    for (const [, asset] of js.matchAll(
      /(?:from\s*|import\s*\(?)["']([^"']+\.(?:js|css))["']/g,
    ))
      checkFile(asset, target);
  }
}

for (const route of ['', 'concept/', 'menu/', 'owner/']) {
  const url = `${origin}${prefix}/${route}`;
  const file = resolve(root, route, 'index.html');
  assert(existsSync(file), `No static HTML entry for ${route || '/'}`);
  const html = readFileSync(file, 'utf8');
  assert(html.includes('サロンデサン'), `Missing site identity: ${route}`);
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1, `One h1: ${route}`);
  assert(
    !/ローカル確認|npm ci|File not found|Getting started|Untitled site|Internal Server Error/.test(
      html,
    ),
    `README or error: ${route}`,
  );
  assert(
    html.includes('http://salon-de-san.com/pcreserve.php'),
    'Direct salon reservation is preserved',
  );
  pages.set(route, html);
  checkFile(url, url);
  for (const [, asset] of html.matchAll(
    /<(?:a|img|source|script|link)\b[^>]*?(?:src|href)="([^" ]+)"/g,
  ))
    checkFile(asset, url);
  for (const [, sources] of html.matchAll(
    /(?:srcset|imagesrcset)="([^"]+)"/gi,
  )) {
    for (const source of sources.split(','))
      checkFile(source.trim().split(/\s+/)[0], url);
  }
  for (const [, css] of html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/g)) {
    for (const [, asset] of css.matchAll(/url\(\s*['"]?([^)'"\s]+)['"]?\s*\)/g))
      checkFile(asset, url);
  }
}
assert.equal(
  [...pages.get('menu/').matchAll(/<dt>/g)].length,
  16,
  'All 16 menu items exported',
);
assert(pages.get('owner/').includes('栃原 康彦'), 'Owner page exported');
assert(existsSync(resolve(root, '.nojekyll')), 'No Jekyll/README fallback');
assert(
  !existsSync(resolve(root, 'README.md')),
  'Do not publish source documentation',
);
assert(
  !existsSync(resolve(root, 'server')),
  'Do not upload Worker/server intermediates',
);
console.log(
  `PASS: 4 real HTML pages, ${checked.size} linked files, fonts, image variants, links and ${prefix || '/'} prefix.`,
);
