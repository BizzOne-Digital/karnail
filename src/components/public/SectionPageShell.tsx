'use client';

import { HomeSidebar } from '@/components/public/home/HomeSidebar';
import { MobileNavStrip } from '@/components/public/MobileNavStrip';
import { RoseThemeClose } from '@/components/public/RoseThemeClose';

interface SectionPageShellProps {
  children: React.ReactNode;
  showRose?: boolean;
}

export function SectionPageShell({ children, showRose = true }: SectionPageShellProps) {
  return (
    <div className="bg-page-silver text-gallery-black">
      <div className="site-content-width mx-auto px-2 sm:px-2.5 py-2 sm:py-3 max-w-full overflow-x-hidden">
        <div className="mobile-sticky-nav sticky top-0 z-30 -mx-1 px-1 py-1.5 bg-page-silver/95 backdrop-blur-sm border-b border-warm-gray/20 lg:hidden">
          <MobileNavStrip />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(148px,176px)_1fr] gap-3 lg:gap-3 items-start">
          <div className="order-2 lg:order-1 lg:sticky lg:top-2 self-start w-full min-w-0 hidden lg:block">
            <HomeSidebar />
          </div>
          <div className="order-1 lg:order-2 min-w-0 w-full px-0 sm:px-1 py-1 lg:py-1 prose-content-bold prose-mobile-readable">
            {children}
            {showRose && <RoseThemeClose className="mt-2" />}
          </div>
        </div>
      </div>
    </div>
  );
}
