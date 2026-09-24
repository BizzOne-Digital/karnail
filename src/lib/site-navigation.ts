/** Client navigation pane — order and labels from layout mockup (SS1) */

export type SiteSectionNavItem = {
  label: string;
  href: string;
  match?: (pathname: string, search: string) => boolean;
};

export const SITE_SECTION_NAV: SiteSectionNavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'About the Author',
    href: '/#about-author',
    match: (p) => p === '/',
  },
  {
    label: 'Artist Statement',
    href: '/about?tab=statement',
    match: (p, s) => p === '/about' && !s.includes('tab=reviews'),
  },
  { label: 'Gallery 1', href: '/gallery?g=1' },
  { label: 'Gallery 2', href: '/gallery?g=2' },
  { label: 'Gallery 3', href: '/gallery?g=3' },
  { label: 'Gallery 4', href: '/gallery?g=4' },
  {
    label: 'Book Reviews',
    href: '/about?tab=reviews',
    match: (p, s) => p === '/about' && s.includes('tab=reviews'),
  },
  { label: 'About the Books', href: '/about-the-book' },
  { label: 'Historical Background 1', href: '/historical-background/1' },
  { label: 'Historical Background 2', href: '/historical-background/2' },
  { label: 'Books by the Author', href: '/books' },
  { label: 'Author Blogs', href: '/blog' },
  { label: 'Contact Us', href: '/contact' },
];

export function isNavItemActive(item: SiteSectionNavItem, pathname: string, search: string): boolean {
  if (item.label === 'Home' && pathname === '/') return false;
  if (item.match) return item.match(pathname, search);
  if (item.href === '/') return pathname === '/' && item.label === 'Home';
  if (item.href.startsWith('/gallery?')) {
    const g = item.href.split('g=')[1];
    const current = search.match(/(?:^|&)g=(\d)/)?.[1] || '1';
    return pathname === '/gallery' && current === g;
  }
  const base = item.href.split('?')[0].split('#')[0];
  return pathname === base || pathname.startsWith(`${base}/`);
}
