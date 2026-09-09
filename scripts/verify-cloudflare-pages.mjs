import assert from 'node:assert/strict';
import { spawn, execFileSync } from 'node:child_process';

// Check the same static asset routing used by Pages, without authenticating or
// publishing. Port 0 gives this test its own port instead of reusing a preview.
const server = spawn(
  process.execPath,
  [
    'node_modules/wrangler/bin/wrangler.js',
    'pages',
    'dev',
    '--cwd',
    'cloudflare',
    '--ip',
    '127.0.0.1',
    '--port',
    '0',
    '--inspector-port',
    '0',
    '--show-interactive-dev-session=false',
  ],
  { env: { ...process.env, WRANGLER_SEND_METRICS: 'false' } },
);
let logs = '';
let timer;
try {
  const url = await new Promise((resolve, reject) => {
    timer = setTimeout(
      () => reject(new Error('Pages preview did not start: ' + logs)),
      60000,
    );
    const output = (chunk) => {
      logs = (logs + chunk.toString()).slice(-10000);
      const match = logs.match(/Ready on (http:\/\/127\.0\.0\.1:\d+)/);
      if (match) resolve(match[1]);
    };
    server.stdout.on('data', output);
    server.stderr.on('data', output);
    server.once('error', reject);
    server.once('exit', (code) =>
      reject(new Error('Pages preview exited (' + code + '): ' + logs)),
    );
  });
  clearTimeout(timer);
  execFileSync(process.execPath, ['scripts/verify-site.mjs', url], {
    stdio: 'inherit',
  });
  for (const route of ['/concept', '/menu', '/owner']) {
    const response = await fetch(url + route);
    assert.equal(response.status, 200, 'Extensionless route: ' + route);
    assert(
      (await response.text()).includes('サロンデサン'),
      'HTML on ' + route,
    );
  }
  const missing = await fetch(url + '/release-preflight-missing-page');
  assert.equal(
    missing.status,
    404,
    'Missing paths must not silently serve the home page',
  );
  console.log(
    'PASS: Cloudflare Pages runtime, extensionless routes and real 404 behavior. No deployment performed.',
  );
} finally {
  clearTimeout(timer);
  if (server.exitCode === null) {
    const exit = new Promise((resolve) => server.once('exit', resolve));
    server.kill('SIGTERM');
    const forceStop = setTimeout(() => server.kill('SIGKILL'), 5000);
    await exit;
    clearTimeout(forceStop);
  }
}
