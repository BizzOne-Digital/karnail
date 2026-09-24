'use client';

import { HomeSidebar } from '@/components/public/home/HomeSidebar';
import { RoseThemeClose } from '@/components/public/RoseThemeClose';

interface SectionPageShellProps {
  children: React.ReactNode;
  showRose?: boolean;
}

export function SectionPageShell({ children, showRose = true }: SectionPageShellProps) {
  return (
    <div className="bg-page-silver text-gallery-black">
      <div className="site-content-width mx-auto px-1.5 sm:px-2.5 py-2 sm:py-3">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(152px,176px)_1fr] gap-0 lg:gap-3 items-start">
          <div className="order-2 lg:order-1 lg:sticky lg:top-2 self-start">
            <HomeSidebar />
          </div>
          <div className="order-1 lg:order-2 min-w-0 px-2 sm:px-3 py-2 lg:py-1 prose-content-bold">
            {children}
            {showRose && <RoseThemeClose className="mt-2" />}
          </div>
        </div>
      </div>
    </div>
  );
}
