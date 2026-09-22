'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  ARTIST_STATEMENT,
  BOOK_REVIEWS,
} from '@/lib/about-content';
import { SectionPageShell } from '@/components/public/SectionPageShell';

function ProseBlock({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="space-y-4 text-gallery-black/90 font-medium leading-relaxed">
      {paragraphs.map((p) => (
        <p key={p.slice(0, 40)}>{p}</p>
      ))}
    </div>
  );
}

function BookReviewCard({ review }: { review: (typeof BOOK_REVIEWS)[number] }) {
  return (
    <article className="bg-warm-cream/60 border border-warm-gray/30 p-5 sm:p-7 relative">
      {review.book && (
        <span className="inline-block text-[10px] tracking-[0.2em] uppercase text-artist-crimson font-semibold mb-3">
          {review.book}
        </span>
      )}
      <p className="font-display text-lg text-deep-oxblood italic leading-relaxed mb-4 font-semibold">
        &ldquo;{review.quote}&rdquo;
      </p>
      <p className="text-artist-crimson font-semibold text-base">{review.author}</p>
      <p className="text-gallery-black/70 text-sm mt-1 font-medium">{review.title}</p>
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
          <header className="text-center mb-8">
            <p className="text-[10px] tracking-[0.25em] uppercase text-artist-crimson font-semibold mb-2">
              Comments from Celebrities
            </p>
            <h1 className="font-display text-2xl sm:text-3xl text-deep-oxblood uppercase font-semibold">Book Reviews</h1>
          </header>
          <div className="space-y-5">
            {BOOK_REVIEWS.map((review) => (
              <BookReviewCard key={`${review.author}-${review.book}`} review={review} />
            ))}
          </div>
        </div>
      ) : (
        <div>
          <header className="text-center mb-8">
            <p className="font-display text-lg tracking-[0.1em] text-artist-crimson uppercase mb-2 font-semibold">
              Sukh D. H. Khokhar
            </p>
            <h1 className="font-display text-2xl sm:text-3xl text-deep-oxblood uppercase font-semibold">
              Artist Statement
            </h1>
            <p className="text-artist-crimson/90 text-sm mt-3 font-medium">{ARTIST_STATEMENT.subtitle}</p>
          </header>
          <h2 className="font-display text-xl text-deep-oxblood mb-5 text-center font-semibold">{ARTIST_STATEMENT.title}</h2>
          <ProseBlock paragraphs={ARTIST_STATEMENT.paragraphs} />
          <p className="mt-5 font-medium">
            View her full-color mystical digital artwork at{' '}
            <a href={ARTIST_STATEMENT.artPalUrl} target="_blank" rel="noopener noreferrer" className="text-artist-crimson underline font-semibold">
              artpal.com/sukh2
            </a>
            .
          </p>
        </div>
      )}

      {tab !== 'statement' && tab !== 'reviews' && (
        <div className="text-center py-8">
          <Link href="/about?tab=statement" className="text-artist-crimson uppercase tracking-widest text-xs underline font-semibold">
            Artist Statement
          </Link>
        </div>
      )}
    </SectionPageShell>
  );
}
