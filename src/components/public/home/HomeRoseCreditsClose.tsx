'use client';

import Image from 'next/image';
import Link from 'next/link';
import { RoseThemeClose } from '@/components/public/RoseThemeClose';
import { BRAND_LOGO } from '@/lib/brand';

/** Rose + compact credits strip (homepage footer). */
export function HomeRoseCreditsClose() {
  return (
    <div className="w-full mt-1">
      <RoseThemeClose className="!pt-0 !pb-0 !mt-0" />
      <div className="home-credits-skinny-strip w-full bg-[#090807] border-t border-warm-cream/10">
        <Link href="/" className="flex justify-center py-0.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={BRAND_LOGO}
            alt="Sukh D. H. Khokhar — Mystery Writer | Mural Artist"
            decoding="async"
            className="home-credits-skinny-strip__sukh"
          />
        </Link>
        <p className="text-center text-[7px] sm:text-[8px] uppercase tracking-[0.12em] text-warm-cream/60 font-semibold leading-none py-0.5">
          Site built by
        </p>
        <Link
          href="https://bizzonedigital.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center pb-1"
        >
          <Image
            src="/images/bizzone-digital-logo.png"
            alt="BizzOne Digital"
            width={36}
            height={36}
            className="sidebar-bizzone-logo home-credits-skinny-strip__bizzone"
            unoptimized
          />
        </Link>
      </div>
    </div>
  );
}
