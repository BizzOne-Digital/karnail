'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

const TABS = [
  { label: 'About the Author', href: '/' },
  { label: 'Artist Statement', href: '/about?tab=statement' },
  { label: 'Book Reviews', href: '/about?tab=reviews' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Books', href: '/books' },
] as const;

export function SiteDesignTabs({ className }: { className?: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href === '/about?tab=statement') {
      return pathname === '/about' && (tab === 'statement' || tab === null);
    }
    if (href === '/about?tab=reviews') {
      return pathname === '/about' && tab === 'reviews';
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <nav
      className={cn(
        'bg-light-canvas/95 backdrop-blur-sm border-b border-warm-gray/25 py-2 sm:py-2.5',
        className
      )}
      aria-label="Site sections"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-wrap gap-2 sm:gap-3 justify-center">
        {TABS.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'px-3 sm:px-5 py-2 text-[9px] sm:text-[10px] tracking-[0.14em] sm:tracking-[0.18em] uppercase font-body transition-colors border',
                active
                  ? 'bg-artist-crimson text-warm-cream border-artist-crimson'
                  : 'text-deep-oxblood/85 border-warm-gray/40 hover:border-artist-crimson/50 hover:text-artist-crimson bg-warm-cream/40'
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
