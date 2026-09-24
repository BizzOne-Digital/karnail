import type { NavItem } from '@/types';
import { CONTACT_EMAIL, CONTACT_LINKS } from '@/lib/contact-info';

/** Default brand logo shipped with the site */
export const BRAND_LOGO = '/logo.png';

/** Client banner wrapper — two figures on top + expanded verse area (1056×480 design) */
export const HOME_BANNER_WRAPPER = '/banner/home-banner-wrapper.jpg';

/** Match shipped banner pixels so golden borders are not cropped (1290×698) */
export const HOME_BANNER_ASPECT = 1290 / 698;

/** @deprecated Old full-bleed hero; use {@link HOME_BANNER_WRAPPER} */
export const HERO_BACKGROUND = HOME_BANNER_WRAPPER;

const DEPRECATED_HERO_IMAGES = new Set(['/hero-background.jpg']);

/** Prefer client banner; ignore outdated CMS hero paths */
export function resolveHomeBannerImage(cmsImage?: string | null): string {
  if (cmsImage && !DEPRECATED_HERO_IMAGES.has(cmsImage)) {
    return cmsImage;
  }
  return HOME_BANNER_WRAPPER;
}

/** Default artist portrait for Meet the Artist section */
export const ARTIST_PORTRAIT = '/artist-portrait.png';

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
