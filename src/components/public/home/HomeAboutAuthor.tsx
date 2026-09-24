'use client';

import Image from 'next/image';
import { getImageUrl } from '@/lib/utils';
import { ARTIST_PORTRAIT } from '@/lib/brand';
import { ABOUT_AUTHOR_PARAGRAPHS } from '@/lib/about-content';
import { RoseThemeClose } from '@/components/public/RoseThemeClose';
import { HomeSidebar } from '@/components/public/home/HomeSidebar';
import type { PageSection } from '@/types';

interface HomeAboutAuthorProps {
  meet?: PageSection | null;
}

export function HomeAboutAuthor({ meet }: HomeAboutAuthorProps) {
  const portrait = meet?.mainImage || ARTIST_PORTRAIT;

  return (
    <>
      <section
        id="about-author"
        className="bg-page-silver text-gallery-black border-t border-warm-gray/15 scroll-mt-20"
      >
        <div className="max-w-[1180px] mx-auto px-1.5 sm:px-2.5 py-3 sm:py-4">
          <header className="text-center mb-4 lg:hidden">
            <p className="font-display text-base tracking-[0.12em] text-artist-crimson uppercase mb-1 font-semibold">
              Sukh D. H. Khokhar
            </p>
            <h2 className="font-display text-xl sm:text-2xl tracking-[0.08em] text-artist-crimson uppercase font-semibold">
              About the Author
            </h2>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(168px,192px)_1fr] gap-0 lg:gap-4 items-stretch">
            <div className="order-2 lg:order-1 lg:sticky lg:top-[4.25rem] self-start">
              <HomeSidebar />
            </div>

            <div className="order-1 lg:order-2 min-w-0 bg-warm-cream/35 lg:bg-transparent px-3 sm:px-4 py-4 lg:py-2">
              <header className="text-center mb-4 hidden lg:block">
                <p className="font-display text-base tracking-[0.12em] text-artist-crimson uppercase mb-0.5 font-semibold">
                  Sukh D. H. Khokhar
                </p>
                <h2 className="font-display text-xl tracking-[0.08em] text-artist-crimson uppercase font-semibold">
                  About the Author
                </h2>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(160px,200px)] gap-4 md:gap-5 items-start max-w-[42rem] md:max-w-none">
                <div className="font-body text-[14px] sm:text-[15px] leading-[1.62] space-y-2.5 text-justify prose-content-bold">
                  {ABOUT_AUTHOR_PARAGRAPHS.map((p) => (
                    <p key={p.slice(0, 48)}>{p}</p>
                  ))}
                  <p>
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
                </div>

                <div className="relative aspect-[3/4] w-full max-w-[200px] mx-auto md:mx-0 border border-warm-gray/25 shadow-sm bg-warm-cream overflow-hidden">
                  <Image
                    src={getImageUrl(portrait)}
                    alt="Sukh D. H. Khokhar"
                    fill
                    sizes="220px"
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <RoseThemeClose className="py-5 sm:py-6 bg-page-silver" />
    </>
  );
}
