'use client';

import { useSearchParams } from 'next/navigation';
import {
  ARTIST_STATEMENT,
  BOOK_REVIEWS,
  BOOK_REVIEWS_FOOTER,
} from '@/lib/about-content';
import { ABOUT_AUTHOR_PORTRAIT } from '@/lib/brand';
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

          <div className="book-reviews-body px-1 sm:px-2">
            {BOOK_REVIEWS.map((review, index) => (
              <div key={`${review.author}-${review.book}-${index}`} className="mb-5 last:mb-0">
                <p className="book-review-quote m-0">&ldquo;{review.quote}&rdquo;</p>
                <p className="book-review-attribution m-0 mt-2">
                  --{review.author}, {review.title}
                </p>
              </div>
            ))}

            <footer className="mt-8 text-center">
              <p className="book-review-footer-line m-0 mb-2">{BOOK_REVIEWS_FOOTER.line}</p>
              <a
                href={BOOK_REVIEWS_FOOTER.href}
                target="_blank"
                rel="noopener noreferrer"
                className="book-review-footer-link font-semibold break-all"
              >
                {BOOK_REVIEWS_FOOTER.label}
              </a>
            </footer>
          </div>
        </div>
      ) : (
        <div>
          <header className="text-center mb-4">
            <p className="artist-statement-heading__name font-display text-[calc(1rem*1.08)] tracking-[0.1em] text-artist-crimson uppercase mb-1">
              Sukh D. H. Khokhar
            </p>
            <h1 className="artist-statement-heading__title font-display text-[calc(1.25rem*1.06)] sm:text-[calc(1.5rem*1.06)] text-artist-crimson uppercase">
              Artist Statement
            </h1>
            <p className="text-gallery-black text-sm mt-2 font-semibold">{ARTIST_STATEMENT.subtitle}</p>
          </header>

          <h2 className="artist-statement-heading__lead font-display text-[calc(1.125rem*1.03*1.03)] text-artist-crimson mb-3 text-center md:text-left">
            {ARTIST_STATEMENT.title}
          </h2>

          <div className="clearfix">
            <div className="float-none md:float-right md:ml-4 md:mb-2 w-full max-w-[200px] md:max-w-[240px] mx-auto md:mx-0 md:mr-0 shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element -- client portrait; native img for reliable CDN loading */}
              <img
                src={ABOUT_AUTHOR_PORTRAIT}
                alt="Sukh D. H. Khokhar"
                width={520}
                height={693}
                decoding="async"
                className="w-full h-auto object-cover object-top border border-warm-gray/25"
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
