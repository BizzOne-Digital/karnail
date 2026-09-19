'use client';

import Image from 'next/image';
import { getImageUrl } from '@/lib/utils';
import { ARTIST_PORTRAIT } from '@/lib/brand';
import { ABOUT_AUTHOR_PARAGRAPHS } from '@/lib/about-content';
import { RoseThemeClose } from '@/components/public/RoseThemeClose';
import type { PageSection } from '@/types';

interface HomeAboutAuthorProps {
  meet?: PageSection | null;
}

export function HomeAboutAuthor({ meet }: HomeAboutAuthorProps) {
  const portrait = meet?.mainImage || ARTIST_PORTRAIT;

  return (
    <>
      <section className="bg-light-canvas text-gallery-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <header className="text-center mb-10 sm:mb-12">
            <p className="font-display text-lg sm:text-xl tracking-[0.12em] text-artist-crimson uppercase mb-2">
              Sukh D. H. Khokhar
            </p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl tracking-[0.08em] text-artist-crimson uppercase">
              About the Author
            </h2>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(220px,280px)] gap-10 lg:gap-12 items-start">
            <div className="font-body text-gallery-black/90 text-base sm:text-[17px] leading-[1.75] space-y-5 text-justify">
              {ABOUT_AUTHOR_PARAGRAPHS.map((p) => (
                <p key={p.slice(0, 48)}>{p}</p>
              ))}
              <p>
                Her artwork can be viewed at her Art Gallery:{' '}
                <a
                  href="https://www.artpal.com/sukh2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-artist-crimson underline underline-offset-2"
                >
                  www.artpal.com/sukh2
                </a>{' '}
                and on her website{' '}
                <a
                  href="https://www.mysteryoftherose.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-artist-crimson underline underline-offset-2"
                >
                  www.mysteryoftherose.com
                </a>
                .
              </p>
            </div>

            <div className="relative aspect-[3/4] w-full max-w-[280px] mx-auto lg:mx-0 lg:sticky lg:top-28 border border-warm-gray/30 shadow-md bg-warm-cream overflow-hidden">
              <Image
                src={getImageUrl(portrait)}
                alt="Sukh D. H. Khokhar"
                fill
                sizes="280px"
                className="object-cover object-top"
                priority
              />
            </div>
          </div>
        </div>
      </section>
      <RoseThemeClose />
    </>
  );
}
