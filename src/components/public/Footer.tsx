'use client';

import { SiteBrandBar } from '@/components/public/SiteBrandBar';

export default function Footer() {
  return (
    <footer className="w-full max-w-full bg-site-backdrop shrink-0">
      <div className="site-page-canvas mx-auto w-full border-t border-aged-gold/20">
        <SiteBrandBar variant="footer" />
      </div>
    </footer>
  );
}
