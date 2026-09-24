'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import {
  ARTIST_STATEMENT,
  BOOK_REVIEWS,
} from '@/lib/about-content';
import { SectionPageShell } from '@/components/public/SectionPageShell';

function ProseBlock({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="space-y-3 text-[15px] sm:text-[16px] leading-relaxed">
      {paragraphs.map((p) => (
        <p key={p.slice(0, 40)}>{p}</p>
      ))}
    </div>
  );
}

function BookReviewCard({ review }: { review: (typeof BOOK_REVIEWS)[number] }) {
  return (
    <article className="bg-warm-cream/60 border border-warm-gray/30 p-5 sm:p-6">
      {review.book && (
        <span className="inline-block text-[10px] tracking-[0.2em] uppercase text-artist-crimson font-bold mb-3">
          {review.book}
        </span>
      )}
      <p className="font-display text-base sm:text-lg text-gallery-black italic leading-relaxed mb-4 font-semibold">
        &ldquo;{review.quote}&rdquo;
      </p>
      <p className="text-artist-crimson font-bold text-base sm:text-[17px] font-display">
        —{review.author}, {review.title}
      </p>
    </article>
  );
}

export function AboutPageContent() {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab') || 'statement';

  return (
    <SectionPageShell>
      {tab === 'reviews' ? (
        <div>
          <header className="text-center mb-6">
            <p className="text-[10px] tracking-[0.25em] uppercase text-artist-crimson font-bold mb-2">
              Comments from Celebrities
            </p>
            <h1 className="font-display text-xl sm:text-2xl text-artist-crimson uppercase font-bold">Book Reviews</h1>
          </header>
          <div className="space-y-4">
            {BOOK_REVIEWS.map((review) => (
              <BookReviewCard key={`${review.author}-${review.book}`} review={review} />
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

          <div className="grid grid-cols-1 md:grid-cols-[1fr_minmax(140px,200px)] gap-4 items-start mb-4">
            <div>
              <h2 className="font-display text-lg text-artist-crimson mb-3 font-bold">{ARTIST_STATEMENT.title}</h2>
              <ProseBlock paragraphs={ARTIST_STATEMENT.paragraphs} />
            </div>
            <div className="relative w-full max-w-[200px] mx-auto md:mx-0">
              <Image
                src="/images/theme-rose-stem.jpg"
                alt=""
                width={400}
                height={80}
                className="w-full h-auto object-contain"
                unoptimized
              />
            </div>
          </div>

          <p className="font-semibold text-[15px]">
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
