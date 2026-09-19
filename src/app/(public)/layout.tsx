'use client';

import { Suspense, useState, useEffect } from 'react';
import { SiteDesignTabs } from '@/components/public/SiteDesignTabs';
import { usePathname } from 'next/navigation';
import CinematicIntro from '@/components/animations/CinematicIntro';
import CustomCursor from '@/components/animations/CustomCursor';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';
import { useSmoothScroll, refreshSmoothScroll } from '@/hooks/useAnimations';
import { publicApi } from '@/services/api';
import type { SiteSettings } from '@/types';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const [showIntro, setShowIntro] = useState(false);
  const [introChecked, setIntroChecked] = useState(false);
  const [settings, setSettings] = useState<SiteSettings | undefined>();
  const pathname = usePathname();
  const lenisRef = useSmoothScroll();

  useEffect(() => {
    const seen = sessionStorage.getItem('intro-seen');
    if (!seen) setShowIntro(true);
    setIntroChecked(true);
    publicApi.getSettings().then(setSettings).catch(() => {});
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => refreshSmoothScroll(lenisRef), 150);
    return () => window.clearTimeout(timer);
  }, [pathname, lenisRef, children]);

  const handleIntroComplete = () => {
    sessionStorage.setItem('intro-seen', 'true');
    setShowIntro(false);
  };

  if (!introChecked) {
    return (
      <div className="min-h-screen bg-light-canvas flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-artist-crimson border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="site-shell theme-cream flex flex-col min-h-screen bg-light-canvas overflow-x-clip w-full max-w-full text-gallery-black">
      <CustomCursor />
      {showIntro && <CinematicIntro onComplete={handleIntroComplete} />}
      <Header settings={settings} />
      {/* Offset for fixed header so tabs + hero are not covered */}
      <div className="h-[4.25rem] sm:h-[4.5rem] shrink-0" aria-hidden />
      <Suspense fallback={null}>
        <SiteDesignTabs className="sticky top-[4.25rem] sm:top-[4.5rem] z-40 shadow-sm" />
      </Suspense>
      <main className="site-main flex-1 relative w-full max-w-full overflow-x-clip">{children}</main>
      <Footer settings={settings} />
    </div>
  );
}
