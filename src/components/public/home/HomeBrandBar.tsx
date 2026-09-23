'use client';

import Link from 'next/link';
import Image from 'next/image';
import { getImageUrl } from '@/lib/utils';
import { BRAND_LOGO } from '@/lib/brand';

export function HomeBrandBar() {
  return (
    <div className="w-full bg-page-silver border-b border-warm-gray/20 py-3 sm:py-3.5">
      <div className="max-w-[1056px] mx-auto px-3 sm:px-4 flex justify-center items-center">
        <Link href="/" className="inline-block text-center" aria-label="Sukh D. H. Khokhar">
          <Image
            src={getImageUrl(BRAND_LOGO)}
            alt="Sukh D. H. Khokhar"
            width={420}
            height={88}
            priority
            className="h-11 sm:h-12 md:h-[3.25rem] w-auto max-w-[min(92vw,28rem)] object-contain object-center mx-auto"
          />
        </Link>
      </div>
    </div>
  );
}
