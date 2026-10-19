/** Canonical public site origin (Open Graph, sitemap, absolute asset URLs). */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
  if (fromEnv) return fromEnv;
  if (process.env.NODE_ENV === 'production') return 'https://sukhkhokhar.com';
  return 'http://localhost:3000';
}
