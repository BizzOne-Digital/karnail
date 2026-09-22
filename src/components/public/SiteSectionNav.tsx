'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { SITE_SECTION_NAV, isNavItemActive } from '@/lib/site-navigation';

interface SiteSectionNavProps {
  className?: string;
  orientation?: 'vertical' | 'horizontal';
}

export function SiteSectionNav({ className, orientation = 'vertical' }: SiteSectionNavProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();

  const isVertical = orientation === 'vertical';

  return (
    <nav
      className={cn(
        isVertical ? 'flex flex-col gap-1' : 'flex flex-wrap gap-1.5 justify-center',
        className
      )}
      aria-label="Site sections"
    >
      {SITE_SECTION_NAV.map((item) => {
        const active = isNavItemActive(item, pathname, search);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'px-2 py-1.5 text-[9px] sm:text-[10px] tracking-[0.1em] uppercase font-semibold transition-colors border text-left leading-tight',
              active
                ? 'bg-artist-crimson text-warm-cream border-artist-crimson'
                : 'text-deep-oxblood border-warm-gray/35 hover:border-artist-crimson/50 hover:text-artist-crimson bg-warm-cream/50'
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
