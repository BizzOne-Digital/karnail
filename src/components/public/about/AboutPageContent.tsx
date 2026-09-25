'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import {
  ARTIST_STATEMENT,
  BOOK_REVIEWS,
} from '@/lib/about-content';
import { ARTIST_STATEMENT_PORTRAIT } from '@/lib/brand';
import { SectionPageShell } from '@/components/public/SectionPageShell';

function ProseBlock({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="space-y-3 text-[15px] sm:text-[16px] leading-relaxed text-justify">
      {paragraphs.map((p) => (
        <p key={p.slice(0, 40)}>{p}</p>
      ))}
    </div>
  );
}

export function AboutPageContent() {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab') || 'statement';

  return (
    <SectionPageShell>
      {tab === 'reviews' ? (
        <div>
          <header className="text-center mb-4">
            <p className="text-[10px] tracking-[0.25em] uppercase text-artist-crimson font-bold mb-2">
              Comments from Celebrities
            </p>
            <h1 className="font-display text-xl sm:text-2xl text-artist-crimson uppercase font-bold">Book Reviews</h1>
          </header>

          <div className="bg-warm-cream/80 border border-warm-gray/35 px-4 sm:px-6 py-5 sm:py-6 shadow-sm">
            {BOOK_REVIEWS.map((review, index) => (
              <div key={`${review.author}-${review.book}-${index}`}>
                <p className="font-display text-[15px] sm:text-base text-gallery-black italic leading-snug font-semibold m-0">
                  &ldquo;{review.quote}&rdquo;
                </p>
                <p className="text-artist-crimson font-bold text-[15px] sm:text-base font-display underline m-0 leading-snug">
                  —{review.author}, {review.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <header className="text-center mb-4">
            <p className="font-display text-base tracking-[0.1em] text-artist-crimson uppercase mb-1 font-bold">
              Sukh D. H. Khokhar
            </p>
            <h1 className="font-display text-xl sm:text-2xl text-artist-crimson uppercase font-bold">
              Artist Statement
            </h1>
            <p className="text-gallery-black text-sm mt-2 font-semibold">{ARTIST_STATEMENT.subtitle}</p>
          </header>

          <h2 className="font-display text-lg text-artist-crimson mb-3 font-bold text-center md:text-left">
            {ARTIST_STATEMENT.title}
          </h2>

          <div className="clearfix">
            <div className="float-none md:float-right md:ml-4 md:mb-2 w-full max-w-[200px] md:max-w-[240px] mx-auto md:mx-0 md:mr-0 shrink-0">
              <Image
                src={ARTIST_STATEMENT_PORTRAIT}
                alt="Sukh D. H. Khokhar"
                width={480}
                height={640}
                className="w-full h-auto object-cover border border-warm-gray/25"
                unoptimized
              />
            </div>
            <ProseBlock paragraphs={ARTIST_STATEMENT.paragraphs} />
          </div>

          <p className="font-semibold text-[15px] mt-4 clear-both">
            View her full-color mystical digital artwork at{' '}
            <a href={ARTIST_STATEMENT.artPalUrl} target="_blank" rel="noopener noreferrer" className="text-artist-crimson underline font-bold">
              artpal.com/sukh2
            </a>
            .
          </p>
        </div>
      )}
    </SectionPageShell>
  );
}
