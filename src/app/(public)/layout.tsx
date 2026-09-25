'use client';

import { useEffect } from 'react';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';
import { publicApi } from '@/services/api';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    publicApi.getSettings().catch(() => {});
  }, []);

  return (
    <div className="site-shell theme-cream flex flex-col min-h-screen bg-site-backdrop overflow-x-clip w-full max-w-full text-gallery-black">
      <main className="site-main flex-1 relative w-full max-w-full overflow-x-clip">
        <div className="site-page-canvas mx-auto w-full min-h-full shadow-[0_0_0_1px_rgba(0,0,0,0.4)]">
          <Header />
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
