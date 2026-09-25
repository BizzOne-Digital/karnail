'use client';

import Link from 'next/link';
import Image from 'next/image';
import { getImageUrl } from '@/lib/utils';
import { BRAND_LOGO } from '@/lib/brand';

interface SiteBrandBarProps {
  variant?: 'header' | 'footer';
  /** Home mockup: logo centered above banner */
  logoAlign?: 'left' | 'center';
  logoSize?: 'default' | 'large';
}

export function SiteBrandBar({
  variant = 'header',
  logoAlign = 'left',
  logoSize = 'default',
}: SiteBrandBarProps) {
  const isFooter = variant === 'footer';
  const isCentered = !isFooter && logoAlign === 'center';

  return (
    <div className="bg-[#090807] border-b border-aged-gold/25 px-3 sm:px-4 py-2 sm:py-2.5">
      <div
        className={
          isFooter
            ? 'flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 max-w-full'
            : isCentered
              ? 'flex items-center justify-center max-w-full'
              : 'flex items-center justify-between gap-3 max-w-full'
        }
      >
        <Link
          href="/"
          className={
            isCentered ? 'block max-w-full' : 'block min-w-0 flex-1 max-w-full'
          }
        >
          <Image
            src={getImageUrl(BRAND_LOGO)}
            alt="Sukh D. H. Khokhar — Mystery Writer | Mural Artist"
            width={520}
            height={72}
            priority={!isFooter}
            className={
              logoSize === 'large'
                ? 'h-10 sm:h-14 md:h-[4.25rem] w-auto max-w-[min(100%,480px)] object-contain object-center mx-auto'
                : 'h-8 sm:h-11 md:h-12 w-auto max-w-[min(100%,320px)] sm:max-w-full object-contain mx-auto sm:mx-0 ' +
                  (isCentered ? 'object-center' : 'object-left')
            }
          />
        </Link>
        {isFooter && (
          <Link
            href="/contact"
            className="shrink-0 border border-aged-gold/70 text-warm-cream px-4 sm:px-6 py-2.5 text-[10px] sm:text-xs tracking-[0.2em] uppercase font-bold hover:bg-aged-gold/10 transition-colors text-center min-h-[44px] flex items-center justify-center"
          >
            Contact
          </Link>
        )}
      </div>
    </div>
  );
}
