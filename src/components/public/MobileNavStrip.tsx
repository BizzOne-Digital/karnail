'use client';

import { Suspense } from 'react';
import { SiteSectionNav } from '@/components/public/SiteSectionNav';

/** Homepage — horizontal scrollable section nav (all screen sizes). */
export function MobileNavStrip() {
  return (
    <div className="mobile-nav-strip sidebar-nav-strip w-full px-1 sm:px-2 py-2">
      <p className="sidebar-nav-heading sidebar-nav-heading--mobile mb-1.5 px-0.5 text-center tracking-[0.14em]">
        Navigate Here
      </p>
      <Suspense fallback={null}>
        <SiteSectionNav orientation="horizontal" variant="sidebar" className="mobile-nav-strip__scroll" />
      </Suspense>
    </div>
  );
}
