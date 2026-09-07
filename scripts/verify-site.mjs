import assert from 'node:assert/strict';
const origin=process.argv[2];
assert(origin, 'Provide the running site origin.');
const pages=new Map();
for(const route of ['/','/concept','/menu','/owner']){
 const r=await fetch(new URL(route,origin));
 assert.equal(r.status,200,`${route}: status`);
 const html=await r.text();
 assert(html.includes('サロンデサン'), `${route}: site identity`);
 assert.equal([...html.matchAll(/<h1\b/g)].length,1,`${route}: h1`);
 assert(!/Untitled site|Getting started|Loading your site|Invalid hook call|Internal Server Error/.test(html), 'No starter or runtime error');
 pages.set(route,html);
 const bookingAnchors=[...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)].filter(([,attrs,body])=>/公式.*(?:予約|サイト)/.test(body.replace(/<[^>]+>/g,'')));
 assert(bookingAnchors.length>=3,`${route}: header, page and mobile booking CTAs exist`);
 for(const [,attrs] of bookingAnchors){
  assert(attrs.includes('href="http://salon-de-san.com/pcreserve.php"'),`${route}: primary CTA uses direct salon booking`);
  assert(attrs.includes('rel="noopener noreferrer"'),`${route}: safe external link`);
 }
 const primary=html.match(/<a\b[^>]*class="reservation-main"[^>]*>/)?.[0];
 if(primary)assert(primary.includes('href="http://salon-de-san.com/pcreserve.php"'),`${route}: prominent booking button is salon-first`);
 console.log('PAGE OK',route);
}
const assets=new Set();
for(const [route,html] of pages){
 for(const match of html.matchAll(/<(?:img|script|link)\b[^>]*?(?:src|href)="([^"#]+)"/g)){
  if(match[1].startsWith('/'))assets.add(match[1]);
 }
 for(const match of html.matchAll(/src[Ss]et="([^"]+)"/g)){
  for(const entry of match[1].split(',')){
   const path=entry.trim().split(/\s+/)[0];
   if(path.startsWith('/'))assets.add(path);
  }
 }
 for(const match of html.matchAll(/<a\b[^>]*href="(\/[^"]*|#[^"]*)"/g)){
  const target=new URL(match[1],new URL(route,origin));
  const destination=pages.get(target.pathname);
  assert(destination,`Missing route ${target.pathname} linked from ${route}`);
  if(target.hash)assert(destination.includes(`id="${target.hash.slice(1)}"`),`Missing ${target.hash} on ${target.pathname}`);
 }
}
let imageBytes=0;
for(const asset of assets){
 const r=await fetch(new URL(asset,origin));
 assert.equal(r.status,200,`Asset ${asset}`);
 const data=await r.arrayBuffer();assert(data.byteLength>0);
 if(asset.startsWith('/images/')){assert(r.headers.get('content-type')?.startsWith('image/'),`Image MIME: ${asset}`);imageBytes+=data.byteLength;}
 console.log('ASSET OK',asset,data.byteLength);
}
assert.equal([...pages.get('/menu').matchAll(/<dt>/g)].length,16,'Expected 16 menu items');
for(const text of ['0258-77-3631','毎週月曜日・第1火曜日','新潟県長岡市西宮内2-4','https://beauty.hotpepper.jp/slnH000240941/','http://salon-de-san.com/pcreserve.php'])assert(pages.get('/').includes(text),text);
assert(pages.get('/owner').includes('栃原 康彦'));
assert(pages.get('/owner').includes('https://beauty.hotpepper.jp/slnH000240941/stylist/T000183967/'));
for(const id of ['gentle','color','design','scalp'])assert(pages.get('/concept').includes(`id="${id}"`));
console.log('PASS: four routes, 16 menu items, site facts, internal anchors, assets and booking destinations. All image variants combined:',imageBytes,'bytes');
