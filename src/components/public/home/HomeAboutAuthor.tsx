'use client';

import Image from 'next/image';
import { getImageUrl } from '@/lib/utils';
import {
  ABOUT_AUTHOR_PORTRAIT,
  HOME_BANNER_ASPECT,
  resolveHomeBannerImage,
} from '@/lib/brand';
import { ABOUT_AUTHOR_PARAGRAPHS, BANNER_VERSE } from '@/lib/about-content';
import { RoseThemeClose } from '@/components/public/RoseThemeClose';
import { HomeSidebar } from '@/components/public/home/HomeSidebar';
import { MobileNavStrip } from '@/components/public/MobileNavStrip';
import type { PageSection } from '@/types';

interface HomeAboutAuthorProps {
  meet?: PageSection | null;
  hero?: PageSection | null;
}

export function HomeAboutAuthor({ hero }: HomeAboutAuthorProps) {
  const bannerImage = hero ? resolveHomeBannerImage(hero.backgroundImage) : null;

  return (
    <div
      className="site-page-canvas w-full min-h-full shadow-[0_0_0_1px_rgba(0,0,0,0.4)] overflow-x-hidden scroll-mt-2"
    >
      {bannerImage && (
        <div className="home-banner-band relative w-full">
          <div
            className="home-banner-frame relative w-full mx-auto overflow-hidden"
            style={{ aspectRatio: String(HOME_BANNER_ASPECT) }}
          >
            <Image
              src={getImageUrl(bannerImage)}
              alt="Dark Mystery: Spellbound — illustrated mystical adventure banner"
              fill
              priority
              className="home-banner-image object-cover object-center"
              sizes="(max-width: 68rem) 100vw, 68rem"
            />

            <div
              className="home-banner-verse absolute left-[5%] sm:left-[7%] top-[15%] sm:top-[17%] w-[min(46%,15rem)] sm:w-[min(40%,17rem)] pointer-events-none z-10 text-left"
              aria-label="Banner verse"
            >
              {BANNER_VERSE.map((line, index) => (
                <p
                  key={line}
                  className="hero-verse-line font-display text-[8px] sm:text-[10px] md:text-xs italic leading-snug sm:leading-relaxed font-semibold drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]"
                  style={{ animationDelay: `${index * 0.75}s` }}
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}

      <section id="about-author" className="bg-page-silver text-gallery-black">
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
              <p className="home-about-author__name font-display text-[calc(1rem*1.113)] tracking-[0.1em] text-artist-crimson uppercase mb-0.5">
                Sukh D. H. Khokhar
              </p>
              <h1 className="home-about-author__section-title font-display text-[calc(1.125rem*1.113)] sm:text-[calc(1.25rem*1.113)] text-artist-crimson uppercase">
                About the Author
              </h1>
            </header>

            <div className="clearfix">
              <div className="float-none md:float-right md:ml-4 md:mb-2 w-full max-w-[220px] md:max-w-[260px] mx-auto md:mx-0 shrink-0 border border-warm-gray/25 shadow-sm bg-warm-cream overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element -- client portrait; native img for reliable CDN loading */}
                <img
                  src={ABOUT_AUTHOR_PORTRAIT}
                  alt="Sukh D. H. Khokhar"
                  width={520}
                  height={693}
                  decoding="async"
                  className="w-full h-auto object-cover object-top"
                />
              </div>
              <div className="font-body text-[15px] leading-[1.58] space-y-2.5 text-justify prose-content-bold prose-mobile-readable">
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
              </div>
              <div className="clear-both pt-1">
                <RoseThemeClose className="!pt-0 !pb-0 !mt-1" />
              </div>
            </div>
          </div>
        </div>

        </div>
      </section>
    </div>
  );
}
