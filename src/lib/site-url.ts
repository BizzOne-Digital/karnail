/** Live custom domain (WhatsApp / OG must match a host that serves `/public` assets). */
export const CANONICAL_SITE_URL = 'https://www.sukhkhokhar.com';

/** Canonical public site origin (Open Graph, sitemap, absolute asset URLs). */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
  // Stale Vercel preview URLs in env break link previews (og:image 404).
  if (fromEnv && !fromEnv.includes('vercel.app')) return fromEnv;
  if (process.env.NODE_ENV === 'production') return CANONICAL_SITE_URL;
  return fromEnv || 'http://localhost:3000';
}

export function absolutePublicUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return new URL(normalized, getSiteUrl()).toString();
}
