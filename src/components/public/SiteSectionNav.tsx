'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { SITE_SECTION_NAV, isNavItemActive } from '@/lib/site-navigation';

interface SiteSectionNavProps {
  className?: string;
  orientation?: 'vertical' | 'horizontal';
  variant?: 'default' | 'sidebar';
}

export function SiteSectionNav({
  className,
  orientation = 'vertical',
  variant = 'default',
}: SiteSectionNavProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();
  const isSidebar = variant === 'sidebar';
  const isVertical = orientation === 'vertical';

  return (
    <nav
      className={cn(
        isVertical ? 'flex flex-col gap-0.5' : 'flex flex-wrap gap-1.5 justify-center',
        className
      )}
      aria-label="Site sections"
    >
      {SITE_SECTION_NAV.map((item) => {
        const active = isNavItemActive(item, pathname, search);
        return (
          <Link
            key={item.href + item.label}
            href={item.href}
            className={cn(
              'px-2 py-1.5 text-[9px] sm:text-[10px] tracking-[0.08em] uppercase font-semibold transition-colors text-left leading-snug font-display',
              isSidebar
                ? active
                  ? 'sidebar-nav-link sidebar-nav-link--active'
                  : 'sidebar-nav-link'
                : active
                  ? 'bg-artist-crimson text-warm-cream border border-artist-crimson'
                  : 'text-deep-oxblood border border-warm-gray/35 hover:border-artist-crimson/50 bg-warm-cream/50'
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
