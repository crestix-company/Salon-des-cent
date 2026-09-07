import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname } from 'node:path';

const root = resolve(process.argv[2] || 'dist/client');
const prefix = process.argv[3] || '';
const port = Number(process.argv[4] || 4193);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.rsc': 'text/x-component',
  '.json': 'application/json',
};
createServer(async (req, res) => {
  try {
    const path = decodeURIComponent(
      new URL(req.url, 'http://localhost').pathname,
    );
    if (!path.startsWith(`${prefix}/`)) throw new Error('Outside site prefix');
    let file = resolve(root, `.${path.slice(prefix.length)}`);
    if (file !== root && !file.startsWith(`${root}/`))
      throw new Error('Outside root');
    if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html');
    const data = await readFile(file);
    res.writeHead(200, {
      'Content-Type': types[extname(file)] || 'application/octet-stream',
      'Cache-Control': 'no-store',
    });
    res.end(data);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('File not found');
  }
}).listen(port, '127.0.0.1', () =>
  console.log(`Static preview: http://127.0.0.1:${port}${prefix}/`),
);
