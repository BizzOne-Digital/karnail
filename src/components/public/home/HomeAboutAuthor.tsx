'use client';

import Image from 'next/image';
import { getImageUrl } from '@/lib/utils';
import { ARTIST_PORTRAIT, HOME_BANNER_ASPECT, resolveHomeBannerImage } from '@/lib/brand';
import { ABOUT_AUTHOR_PARAGRAPHS } from '@/lib/about-content';
import { RoseThemeClose } from '@/components/public/RoseThemeClose';
import { HomeSidebar } from '@/components/public/home/HomeSidebar';
import type { PageSection } from '@/types';

interface HomeAboutAuthorProps {
  meet?: PageSection | null;
  hero?: PageSection | null;
}

export function HomeAboutAuthor({ meet, hero }: HomeAboutAuthorProps) {
  const portrait = meet?.mainImage || ARTIST_PORTRAIT;
  const bannerImage = hero ? resolveHomeBannerImage(hero.backgroundImage) : null;

  return (
    <section id="about-author" className="bg-page-silver text-gallery-black scroll-mt-2">
      <div className="w-full mx-auto px-0">
        {bannerImage && (
          <div
            className="relative w-full bg-[#0a0a0a]"
            style={{ aspectRatio: String(HOME_BANNER_ASPECT) }}
          >
            <Image
              src={getImageUrl(bannerImage)}
              alt="Dark Mystery: Spellbound — illustrated mystical adventure banner"
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 1088px) 100vw, 1088px"
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(152px,176px)_1fr] gap-0 lg:gap-2 items-start">
          <div className="order-2 lg:order-1 lg:sticky lg:top-2 self-start -mt-px">
            <HomeSidebar />
          </div>

          <div className="order-1 lg:order-2 min-w-0 px-2 sm:px-3 pt-1 pb-2">
            <header className="text-center mb-2">
              <p className="font-display text-base tracking-[0.1em] text-artist-crimson uppercase mb-0.5 font-bold">
                Sukh D. H. Khokhar
              </p>
              <h1 className="font-display text-lg sm:text-xl text-artist-crimson uppercase font-bold">
                About the Author
              </h1>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(200px,280px)] gap-3 md:gap-4 items-start">
              <div className="font-body text-[15px] leading-[1.58] space-y-2 text-justify prose-content-bold">
                {ABOUT_AUTHOR_PARAGRAPHS.map((p) => (
                  <p key={p.slice(0, 48)}>{p}</p>
                ))}
                <p className="!mt-2">
                  Her artwork can be viewed at her Art Gallery:{' '}
                  <a
                    href="https://www.artpal.com/sukh2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-artist-crimson underline underline-offset-2 font-bold"
                  >
                    www.artpal.com/sukh2
                  </a>{' '}
                  and on her website{' '}
                  <a
                    href="https://www.mysteryoftherose.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-artist-crimson underline underline-offset-2 font-bold"
                  >
                    www.mysteryoftherose.com
                  </a>
                  .
                </p>
                <RoseThemeClose className="!pt-0 !pb-0 !mt-1" />
              </div>

              <div className="relative aspect-[3/4] w-full max-w-[280px] mx-auto md:mx-0 border border-warm-gray/25 shadow-sm bg-warm-cream overflow-hidden">
                <Image
                  src={getImageUrl(portrait)}
                  alt="Sukh D. H. Khokhar"
                  fill
                  sizes="280px"
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
