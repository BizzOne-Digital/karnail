'use client';

import { useEffect } from 'react';
import Footer from '@/components/public/Footer';
import { PublicLayoutChrome } from '@/components/public/PublicLayoutChrome';
import { publicApi } from '@/services/api';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    publicApi.getSettings().catch(() => {});
  }, []);

  return (
    <div className="site-shell theme-cream flex flex-col min-h-screen bg-site-backdrop overflow-x-clip w-full max-w-full text-gallery-black">
      <main className="site-main flex-1 relative w-full max-w-full overflow-x-clip">
        <PublicLayoutChrome>{children}</PublicLayoutChrome>
      </main>
      <Footer />
    </div>
  );
}
