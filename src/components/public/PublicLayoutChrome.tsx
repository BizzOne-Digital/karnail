'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/public/Header';

export function PublicLayoutChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <div className="site-page-canvas mx-auto w-full min-h-full shadow-[0_0_0_1px_rgba(0,0,0,0.4)]">
      {!isHome && <Header />}
      {children}
    </div>
  );
}
