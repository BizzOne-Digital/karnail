'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { BRAND_LOGO } from '@/lib/brand';

type SiteBrandMarkProps = {
  /** `sidebar` — full width of nav pane (lengthwise); default — compact centered footer mark */
  variant?: 'footer' | 'sidebar';
};

export function SiteBrandMark({ variant = 'footer' }: SiteBrandMarkProps) {
  const isSidebar = variant === 'sidebar';

  return (
    <Link
      href="/"
      className={cn(
        'block max-w-full',
        isSidebar ? 'home-brand-mark home-brand-mark--sidebar w-full brand-logo-bar' : 'home-brand-mark mx-auto w-fit'
      )}
    >
      <div
        className={cn(
          'bg-[#090807] border-black/30',
          isSidebar
            ? 'w-full px-2 py-2.5 border-b border-warm-cream/10 flex justify-center items-center'
            : 'home-brand-mark__frame px-2.5 py-1.5 border border-black/30'
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- static logo; native img loads reliably on Vercel */}
        <img
          src={BRAND_LOGO}
          alt="Sukh D. H. Khokhar — Mystery Writer | Mural Artist"
          decoding="async"
          className={cn(isSidebar ? 'home-brand-mark__img--sidebar' : 'home-brand-mark__img')}
        />
      </div>
    </Link>
  );
}
