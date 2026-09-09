import type { NextConfig } from 'next';

const target = process.env.SITE_BUILD_TARGET;
const isStaticExport =
  target === 'github-pages' || target === 'cloudflare-pages';
const nextConfig: NextConfig = isStaticExport
  ? // Static route files remain at the artifact root. Native anchors/images use
    // sitePath(); assetPrefix scopes framework chunks/fonts to the repository.
    {
      output: 'export',
      assetPrefix: target === 'github-pages' ? '/Salon-des-cent' : '',
      trailingSlash: false,
    }
  : {};

export default nextConfig;
