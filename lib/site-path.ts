// Build-time prefix shared by server output and hydrated client components.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function sitePath(path: string): string {
  if (!path.startsWith('/') || path.startsWith('//')) return path;
  const [pathname, hash] = path.split('#');
  const directory =
    basePath &&
    !pathname.endsWith('/') &&
    !pathname.split('/').pop()?.includes('.')
      ? `${pathname}/`
      : pathname;
  return `${basePath}${directory}${hash === undefined ? '' : `#${hash}`}`;
}

export function imageSources(sources: string): string {
  return sources
    .split(',')
    .map((source) => {
      const [path, descriptor] = source.trim().split(/\s+/);
      return `${sitePath(path)} ${descriptor}`;
    })
    .join(', ');
}
