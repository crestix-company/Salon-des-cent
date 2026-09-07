import type { NextConfig } from 'next';

const isStaticExport = process.env.SITE_BUILD_TARGET === 'github-pages';
const nextConfig: NextConfig = isStaticExport
  ? // Static route files remain at the artifact root. Native anchors/images use
    // sitePath(); assetPrefix scopes framework chunks/fonts to the repository.
    { output: 'export', assetPrefix: '/Salon-des-cent', trailingSlash: false }
  : {};

export default nextConfig;
