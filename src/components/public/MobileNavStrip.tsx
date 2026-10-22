'use client';

import { Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SiteSectionNav } from '@/components/public/SiteSectionNav';

/** Homepage — horizontal scrollable section nav (all screen sizes). */
export function MobileNavStrip() {
  const scrollRef = useRef<HTMLElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(maxScroll > 2 && el.scrollLeft < maxScroll - 2);
  }, []);

  useLayoutEffect(() => {
    updateScrollState();
  });

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    const observer = new ResizeObserver(updateScrollState);
    observer.observe(el);
    return () => {
      el.removeEventListener('scroll', updateScrollState);
      observer.disconnect();
    };
  }, [updateScrollState]);

  const scrollTabs = (direction: -1 | 1) => {
    scrollRef.current?.scrollBy({ left: direction * 240, behavior: 'smooth' });
  };

  return (
    <div className="mobile-nav-strip sidebar-nav-strip w-full px-1 sm:px-2 py-2">
      <p className="sidebar-nav-heading sidebar-nav-heading--mobile mb-1.5 px-0.5 text-center tracking-[0.14em]">
        Navigate Here
      </p>
      <div className="nav-strip-scroll-row flex items-center gap-1">
        <button
          type="button"
          className="nav-strip-scroll-arrow hidden lg:flex shrink-0"
          aria-label="Scroll navigation left"
          disabled={!canScrollLeft}
          onClick={() => scrollTabs(-1)}
        >
          <ChevronLeft size={16} strokeWidth={2.75} aria-hidden />
        </button>
        <Suspense fallback={null}>
          <SiteSectionNav
            ref={scrollRef}
            orientation="horizontal"
            variant="sidebar"
            className="mobile-nav-strip__scroll min-w-0 flex-1"
          />
        </Suspense>
        <button
          type="button"
          className="nav-strip-scroll-arrow hidden lg:flex shrink-0"
          aria-label="Scroll navigation right"
          disabled={!canScrollRight}
          onClick={() => scrollTabs(1)}
        >
          <ChevronRight size={16} strokeWidth={2.75} aria-hidden />
        </button>
      </div>
    </div>
  );
}
