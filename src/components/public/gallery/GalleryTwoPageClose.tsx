import Image from 'next/image';
import Link from 'next/link';
import { RoseThemeClose } from '@/components/public/RoseThemeClose';
import { BRAND_LOGO } from '@/lib/brand';

/** Gallery 2 — rose motif + narrow credits strip (client mockup). */
export function GalleryTwoPageClose() {
  return (
    <div className="w-full mt-6 -mx-1 sm:-mx-0">
      <RoseThemeClose className="!pt-0 pb-2" />
      <div
        className="gallery-credits-strip w-full bg-[#090807] border-t border-warm-gray/20 px-3 sm:px-4 py-2.5 sm:py-3 flex flex-row items-center justify-between gap-3 max-w-full"
      >
        <Link
          href="https://bizzonedigital.com"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink min-w-0 pointer-events-auto"
        >
          <Image
            src="/images/bizzone-digital-logo.svg"
            alt="BizzOne digital.com"
            width={200}
            height={48}
            className="h-7 sm:h-9 w-auto max-w-[42vw] object-contain object-left"
            unoptimized
          />
        </Link>
        <Link href="/" className="shrink-0 pointer-events-auto">
          <Image
            src={BRAND_LOGO}
            alt="Sukh D. H. Khokhar — Mystery Writer | Mural Artist"
            width={320}
            height={56}
            className="h-8 sm:h-10 md:h-11 w-auto max-w-[48vw] object-contain object-right"
            unoptimized
          />
        </Link>
      </div>
    </div>
  );
}
