import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  renameSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export function buildStatic(target) {
  assert(
    ['github-pages', 'cloudflare-pages'].includes(target),
    'Choose a supported static deployment target',
  );
  const github = target === 'github-pages';
  const prefix = github ? '/Salon-des-cent' : '';
  const output = github ? 'dist/github-pages' : 'out';
  if (!github) {
    const config = JSON.parse(
      readFileSync('cloudflare/wrangler.json', 'utf8'),
    );
    assert.equal(
      resolve('cloudflare', config.pages_build_output_dir),
      resolve(output),
      'Cloudflare output configuration must match the build',
    );
    assert(
      !config.main && !config.assets,
      'Use a Pages configuration, not a Worker configuration',
    );
  }
  execFileSync(process.execPath, ['node_modules/vinext/dist/cli.js', 'build'], {
    stdio: 'inherit',
    env: {
      ...process.env,
      SITE_BUILD_TARGET: target,
      NEXT_PUBLIC_BASE_PATH: prefix,
    },
  });
  // A previous Worker build leaves a CLI redirect into dist/server, which a
  // static build replaces. Remove only that known generated Worker redirect.
  const redirectPath = '.wrangler/deploy/config.json';
  if (existsSync(redirectPath)) {
    const redirect = JSON.parse(readFileSync(redirectPath, 'utf8'));
    assert.equal(
      resolve('.wrangler/deploy', redirect.configPath),
      resolve('dist/server/wrangler.json'),
      'Unexpected Wrangler redirect; inspect before replacing',
    );
    rmSync(redirectPath);
  }
  // Only clean these explicitly-owned generated output directories, after a
  // successful export. Never mix stale GitHub-prefixed files into Pages output.
  rmSync(output, { recursive: true, force: true });
  cpSync('dist/client', output, { recursive: true });
  if (github) renameSync(output + '/Salon-des-cent/_next', output + '/_next');
  for (const route of ['concept', 'menu', 'owner']) {
    mkdirSync(output + '/' + route, { recursive: true });
    renameSync(
      output + '/' + route + '.html',
      output + '/' + route + '/index.html',
    );
  }
  writeFileSync(output + '/.nojekyll', '');
  execFileSync(
    process.execPath,
    ['scripts/verify-static.mjs', output, prefix],
    { stdio: 'inherit' },
  );
  console.log('Ready: ' + target + ' → ' + output + '/index.html');
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  buildStatic(process.argv[2]);
}
