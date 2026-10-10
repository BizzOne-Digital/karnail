'use client';

import Image from 'next/image';
import Link from 'next/link';
import { BRAND_LOGO } from '@/lib/brand';

/** Narrow brown strip: author logo + site built by BizzOne Digital */
export function SidebarBrandCredits() {
  return (
    <div className="brand-logo-bar w-full border-b border-warm-cream/10 bg-[#090807] px-2 py-2.5">
      <Link href="/" className="flex justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={BRAND_LOGO}
          alt="Sukh D. H. Khokhar — Mystery Writer | Mural Artist"
          decoding="async"
          className="home-brand-mark__img--sidebar home-brand-mark__img--sidebar-wide"
        />
      </Link>
      <p className="mt-2 text-center text-[8px] sm:text-[9px] uppercase tracking-[0.14em] text-warm-cream/65 font-semibold">
        Site built by
      </p>
      <Link
        href="https://bizzonedigital.com"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1 flex justify-center pb-0.5"
      >
        <Image
          src="/images/bizzone-digital-logo.png"
          alt="BizzOne Digital"
          width={36}
          height={36}
          className="sidebar-bizzone-logo"
          unoptimized
        />
      </Link>
    </div>
  );
}
