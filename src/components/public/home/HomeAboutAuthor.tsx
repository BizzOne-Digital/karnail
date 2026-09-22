'use client';

import Image from 'next/image';
import { Suspense } from 'react';
import { getImageUrl } from '@/lib/utils';
import { ARTIST_PORTRAIT } from '@/lib/brand';
import { ABOUT_AUTHOR_PARAGRAPHS } from '@/lib/about-content';
import { RoseThemeClose } from '@/components/public/RoseThemeClose';
import { SiteSectionNav } from '@/components/public/SiteSectionNav';
import type { PageSection } from '@/types';

interface HomeAboutAuthorProps {
  meet?: PageSection | null;
}

export function HomeAboutAuthor({ meet }: HomeAboutAuthorProps) {
  const portrait = meet?.mainImage || ARTIST_PORTRAIT;

  return (
    <>
      <section className="bg-page-silver text-gallery-black border-t border-warm-gray/15">
        <div className="max-w-[1056px] mx-auto px-4 sm:px-5 py-6 sm:py-8">
          <header className="text-center mb-6 sm:mb-8 lg:hidden">
            <p className="font-display text-base tracking-[0.12em] text-artist-crimson uppercase mb-1 font-semibold">
              Sukh D. H. Khokhar
            </p>
            <h2 className="font-display text-xl sm:text-2xl tracking-[0.08em] text-artist-crimson uppercase font-semibold">
              About the Author
            </h2>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(168px,200px)_1fr] gap-6 lg:gap-8 items-start">
            <aside className="lg:sticky lg:top-24 order-2 lg:order-1">
              <p className="text-[10px] tracking-[0.2em] uppercase text-artist-crimson font-semibold mb-3 hidden lg:block">
                Navigation
              </p>
              <Suspense fallback={null}>
                <SiteSectionNav orientation="vertical" />
              </Suspense>
            </aside>

            <div className="order-1 lg:order-2 min-w-0">
              <header className="text-center mb-6 hidden lg:block">
                <p className="font-display text-lg tracking-[0.12em] text-artist-crimson uppercase mb-1 font-semibold">
                  Sukh D. H. Khokhar
                </p>
                <h2 className="font-display text-2xl tracking-[0.08em] text-artist-crimson uppercase font-semibold">
                  About the Author
                </h2>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-[1fr_minmax(180px,220px)] gap-6 md:gap-8 items-start max-w-3xl md:max-w-none">
                <div className="font-body text-gallery-black/90 text-[15px] sm:text-base leading-[1.7] space-y-3.5 font-medium text-justify prose-content-bold">
                  {ABOUT_AUTHOR_PARAGRAPHS.map((p) => (
                    <p key={p.slice(0, 48)}>{p}</p>
                  ))}
                  <p>
                    Her artwork can be viewed at her Art Gallery:{' '}
                    <a
                      href="https://www.artpal.com/sukh2"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-artist-crimson underline underline-offset-2 font-semibold"
                    >
                      www.artpal.com/sukh2
                    </a>{' '}
                    and on her website{' '}
                    <a
                      href="https://www.mysteryoftherose.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-artist-crimson underline underline-offset-2 font-semibold"
                    >
                      www.mysteryoftherose.com
                    </a>
                    .
                  </p>
                </div>

                <div className="relative aspect-[3/4] w-full max-w-[220px] mx-auto md:mx-0 border border-warm-gray/25 shadow-sm bg-warm-cream overflow-hidden">
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
      <RoseThemeClose />
    </>
  );
}
