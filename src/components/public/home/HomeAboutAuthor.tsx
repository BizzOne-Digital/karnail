'use client';

import Image from 'next/image';
import { getImageUrl } from '@/lib/utils';
import { HOME_BANNER_ASPECT, resolveArtistPortrait, resolveHomeBannerImage } from '@/lib/brand';
import { ABOUT_AUTHOR_PARAGRAPHS } from '@/lib/about-content';
import { RoseThemeClose } from '@/components/public/RoseThemeClose';
import { SiteBrandBar } from '@/components/public/SiteBrandBar';
import { HomeSidebar } from '@/components/public/home/HomeSidebar';
import { MobileNavStrip } from '@/components/public/MobileNavStrip';
import type { PageSection } from '@/types';

interface HomeAboutAuthorProps {
  meet?: PageSection | null;
  hero?: PageSection | null;
}

export function HomeAboutAuthor({ meet, hero }: HomeAboutAuthorProps) {
  const portrait = resolveArtistPortrait(meet?.mainImage);
  const bannerImage = hero ? resolveHomeBannerImage(hero.backgroundImage) : null;

  return (
    <div className="w-full scroll-mt-2">
      <div className="site-page-canvas bg-[#090807]">
        <SiteBrandBar variant="header" logoAlign="center" logoSize="large" />
      </div>

      {bannerImage && (
        <div
          className="home-banner-fullbleed relative bg-[#0a0a0a]"
          style={{ aspectRatio: String(HOME_BANNER_ASPECT) }}
        >
          <Image
            src={getImageUrl(bannerImage)}
            alt="Dark Mystery: Spellbound — illustrated mystical adventure banner"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
      )}

      <section
        id="about-author"
        className="bg-page-silver text-gallery-black site-page-canvas min-h-full shadow-[0_0_0_1px_rgba(0,0,0,0.4)] overflow-x-hidden"
      >
        <div className="w-full mx-auto px-0 max-w-full">
        <div className="mobile-sticky-nav sticky top-0 z-30 px-2 py-1.5 bg-page-silver/95 backdrop-blur-sm border-b border-warm-gray/20 lg:hidden">
          <MobileNavStrip />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(148px,176px)_1fr] gap-3 lg:gap-2 items-start px-0 sm:px-0">
          <div className="order-2 lg:order-1 lg:sticky lg:top-2 self-start w-full min-w-0">
            <HomeSidebar />
          </div>

          <div className="order-1 lg:order-2 min-w-0 w-full px-3 sm:px-3 pt-2 pb-3">
            <header className="text-center mb-3">
              <p className="font-display text-base tracking-[0.1em] text-artist-crimson uppercase mb-0.5 font-bold">
                Sukh D. H. Khokhar
              </p>
              <h1 className="font-display text-lg sm:text-xl text-artist-crimson uppercase font-bold">
                About the Author
              </h1>
            </header>

            <div className="flex flex-col md:grid md:grid-cols-[minmax(0,1fr)_minmax(180px,280px)] gap-4 items-start">
              <div className="font-body text-[15px] leading-[1.58] space-y-2.5 prose-content-bold prose-mobile-readable order-2 md:order-1">
                {ABOUT_AUTHOR_PARAGRAPHS.map((p) => (
                  <p key={p.slice(0, 48)}>{p}</p>
                ))}
                <p className="!mt-2">
                  Her artwork can be viewed at her Art Gallery:{' '}
                  <a
                    href="https://www.artpal.com/sukh2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-artist-crimson underline underline-offset-2 font-bold break-all sm:break-normal"
                  >
                    www.artpal.com/sukh2
                  </a>{' '}
                  and on her website{' '}
                  <a
                    href="https://www.mysteryoftherose.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-artist-crimson underline underline-offset-2 font-bold break-all sm:break-normal"
                  >
                    www.mysteryoftherose.com
                  </a>
                  .
                </p>
                <RoseThemeClose className="!pt-0 !pb-0 !mt-1" />
              </div>

              <div className="relative aspect-[3/4] w-full max-w-[min(100%,280px)] mx-auto md:mx-0 border border-warm-gray/25 shadow-sm bg-warm-cream overflow-hidden order-1 md:order-2">
                <Image
                  src={getImageUrl(portrait)}
                  alt="Sukh D. H. Khokhar"
                  fill
                  sizes="(max-width: 768px) 85vw, 280px"
                  className="object-cover object-top"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>
    </div>
  );
}
