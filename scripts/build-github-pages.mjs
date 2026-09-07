import { execFileSync } from 'node:child_process';
import { cpSync, mkdirSync, renameSync, writeFileSync } from 'node:fs';

execFileSync(process.execPath, ['node_modules/vinext/dist/cli.js', 'build'], {
  stdio: 'inherit',
  env: {
    ...process.env,
    SITE_BUILD_TARGET: 'github-pages',
    NEXT_PUBLIC_BASE_PATH: '/Salon-des-cent',
  },
});
// Vinext emits flat HTML plus a path-prefixed framework asset directory.
// GitHub mounts the artifact itself at /Salon-des-cent/, so normalize the
// exported files (not the HTML content) to that host's directory structure.
const output = 'dist/github-pages';
cpSync('dist/client', output, { recursive: true });
renameSync(`${output}/Salon-des-cent/_next`, `${output}/_next`);
for (const route of ['concept', 'menu', 'owner']) {
  mkdirSync(`${output}/${route}`, { recursive: true });
  renameSync(`${output}/${route}.html`, `${output}/${route}/index.html`);
}
writeFileSync(`${output}/.nojekyll`, '');
execFileSync(
  process.execPath,
  ['scripts/verify-static.mjs', output, '/Salon-des-cent'],
  { stdio: 'inherit' },
);
