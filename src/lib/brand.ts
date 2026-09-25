import type { NavItem } from '@/types';
import { CONTACT_EMAIL, CONTACT_LINKS } from '@/lib/contact-info';

/** Default brand logo shipped with the site */
export const BRAND_LOGO = '/logo.png';

/** Client banner wrapper — two figures on top + expanded verse area (1056×480 design) */
export const HOME_BANNER_WRAPPER = '/banner/home-banner-1920x910.jpg';

/** Wider client banner (1920×910) — margin to margin */
export const HOME_BANNER_ASPECT = 1920 / 910;

export const ARTIST_STATEMENT_PORTRAIT = '/images/artist-statement-portrait.jpg';

/** About the Author / Meet the Artist — client portrait (not legacy screenshot) */
export const ABOUT_AUTHOR_PORTRAIT = ARTIST_STATEMENT_PORTRAIT;

/** @deprecated Old full-bleed hero; use {@link HOME_BANNER_WRAPPER} */
export const HERO_BACKGROUND = HOME_BANNER_WRAPPER;

const DEPRECATED_HERO_IMAGES = new Set(['/hero-background.jpg']);

/** Prefer client banner; ignore outdated CMS hero paths */
export function resolveHomeBannerImage(cmsImage?: string | null): string {
  if (cmsImage && !DEPRECATED_HERO_IMAGES.has(cmsImage) && !cmsImage.includes('home-banner-wrapper')) {
    return cmsImage;
  }
  return HOME_BANNER_WRAPPER;
}

/** @deprecated Use {@link ABOUT_AUTHOR_PORTRAIT}; kept for imports */
export const ARTIST_PORTRAIT = ABOUT_AUTHOR_PORTRAIT;

const DEPRECATED_PORTRAIT_IMAGES = new Set(['/artist-portrait.png', 'artist-portrait.png']);

/** Ignore outdated CMS/screenshot portrait paths */
export function resolveArtistPortrait(cmsImage?: string | null): string {
  if (!cmsImage?.trim()) return ABOUT_AUTHOR_PORTRAIT;
  const path = cmsImage.split('?')[0];
  if (DEPRECATED_PORTRAIT_IMAGES.has(path) || path.endsWith('/artist-portrait.png')) {
    return ABOUT_AUTHOR_PORTRAIT;
  }
  return cmsImage;
}

/** Fallback header navigation when CMS settings are unavailable */
export const DEFAULT_HEADER_NAV: NavItem[] = [
  { label: 'Home', url: '/', isVisible: true, order: 0 },
  { label: 'About', url: '/about', isVisible: true, order: 1 },
  { label: 'Services', url: '/services', isVisible: true, order: 2 },
  { label: 'Gallery', url: '/gallery', isVisible: true, order: 3 },
  { label: 'Buy the Books', url: '/books', isVisible: true, order: 4 },
  { label: 'Shop', url: '/shop', isVisible: true, order: 5 },
  { label: 'Contact', url: '/contact', isVisible: true, order: 6 },
];

export { CONTACT_EMAIL, CONTACT_LINKS };
