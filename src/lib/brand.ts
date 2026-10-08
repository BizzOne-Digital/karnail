import type { NavItem } from '@/types';
import { CONTACT_EMAIL, CONTACT_LINKS } from '@/lib/contact-info';

/** Default brand logo shipped with the site */
/** Client burgundy logo (home footer) */
export const BRAND_LOGO = '/logo-burgundy.png';

/** @deprecated Gold-on-black header asset */
export const BRAND_LOGO_LEGACY = '/logo.png';

/** Home banner — Spellbound scene with gold frame (client SS, verse overlaid in UI) */
export const HOME_BANNER_WRAPPER = '/banner/home-banner-spellbound.jpg';

/** Native asset 1024×476 */
export const HOME_BANNER_ASPECT = 1024 / 476;

export const ARTIST_STATEMENT_PORTRAIT = '/images/artist-statement-portrait.jpg';

/** About the Author — client photo (blue top, mockup SS2) */
export const ABOUT_AUTHOR_PORTRAIT = '/images/about-author-portrait.png';

/** @deprecated Old full-bleed hero; use {@link HOME_BANNER_WRAPPER} */
export const HERO_BACKGROUND = HOME_BANNER_WRAPPER;

/** Home always uses the client banner asset (verse is rendered separately). */
export function resolveHomeBannerImage(_cmsImage?: string | null): string {
  void _cmsImage;
  return HOME_BANNER_WRAPPER;
}

/** @deprecated Use {@link ABOUT_AUTHOR_PORTRAIT}; kept for imports */
export const ARTIST_PORTRAIT = ABOUT_AUTHOR_PORTRAIT;

/** Home About the Author always uses the client photo from mockup */
export function resolveArtistPortrait(_cmsImage?: string | null): string {
  void _cmsImage;
  return ABOUT_AUTHOR_PORTRAIT;
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
