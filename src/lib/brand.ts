import type { NavItem } from '@/types';

/** Default brand logo shipped with the site */
export const BRAND_LOGO = '/logo.png';

/** Default homepage hero background */
export const HERO_BACKGROUND = '/hero-background.jpg';

/** Fallback header navigation when CMS settings are unavailable */
export const DEFAULT_HEADER_NAV: NavItem[] = [
  { label: 'Home', url: '/', isVisible: true, order: 0 },
  { label: 'About', url: '/about', isVisible: true, order: 1 },
  { label: 'Services', url: '/services', isVisible: true, order: 2 },
  { label: 'Gallery', url: '/gallery', isVisible: true, order: 3 },
  { label: 'Shop', url: '/shop', isVisible: true, order: 4 },
  { label: 'Contact', url: '/contact', isVisible: true, order: 5 },
];
