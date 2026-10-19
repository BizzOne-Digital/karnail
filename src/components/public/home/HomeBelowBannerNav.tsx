'use client';

import { Suspense } from 'react';
import { SiteSectionNav } from '@/components/public/SiteSectionNav';

/** Homepage only — horizontal “Navigate Here” below banner (all breakpoints, no side panel). */
export function HomeBelowBannerNav() {
  return (
    <div className="home-below-banner-nav sidebar-nav-strip w-full px-2 sm:px-3 py-2 border-b border-warm-gray/25 bg-page-silver">
      <p className="sidebar-nav-heading sidebar-nav-heading--mobile mb-1.5 text-center tracking-[0.14em]">
        Navigate Here
      </p>
      <Suspense fallback={null}>
        <SiteSectionNav
          orientation="horizontal"
          variant="sidebar"
          className="home-below-banner-nav__links flex flex-wrap justify-center gap-1.5"
        />
      </Suspense>
    </div>
  );
}
