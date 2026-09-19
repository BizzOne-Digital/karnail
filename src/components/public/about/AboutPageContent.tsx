'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ARTIST_STATEMENT,
  BOOK_REVIEWS,
  FAMILY_BACKGROUND_INSERTS,
  GALLERY_PROMO,
  MULTICULTURAL_PUBLICATIONS,
  UPCOMING_2027_EDITIONS,
} from '@/lib/about-content';
import { DARK_MYSTERY_SPELLBOUND } from '@/lib/book-content';
import { RoseThemeClose } from '@/components/public/RoseThemeClose';

function ProseBlock({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="prose-content text-base sm:text-lg space-y-4 text-gallery-black/90">
      {paragraphs.map((p) => (
        <p key={p.slice(0, 40)}>{p}</p>
      ))}
    </div>
  );
}

function BookReviewCard({ review }: { review: (typeof BOOK_REVIEWS)[number] }) {
  return (
    <article className="bg-warm-cream/60 border border-warm-gray/30 p-6 sm:p-8 relative">
      {review.book && (
        <span className="inline-block text-[10px] sm:text-xs tracking-[0.2em] uppercase text-artist-crimson mb-4">
          {review.book}
        </span>
      )}
      <span className="absolute top-5 right-6 font-display text-5xl text-artist-crimson/15 leading-none">&rdquo;</span>
      <p className="font-display text-lg sm:text-xl text-deep-oxblood italic leading-relaxed mb-5">
        &ldquo;{review.quote}&rdquo;
      </p>
      <p className="text-gallery-black/85 font-medium">{review.author}</p>
      <p className="text-gallery-black/60 text-sm mt-1">{review.title}</p>
    </article>
  );
}

export function AboutPageContent() {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab') || 'statement';

  return (
    <>
      <section className="py-10 sm:py-14 bg-light-canvas text-gallery-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {tab === 'statement' && (
            <div>
              <header className="text-center mb-10">
                <p className="font-display text-lg tracking-[0.1em] text-artist-crimson uppercase mb-2">
                  Sukh D. H. Khokhar
                </p>
                <h1 className="font-display text-2xl sm:text-3xl md:text-4xl text-artist-crimson uppercase tracking-wide">
                  Artist Statement
                </h1>
                <p className="text-artist-crimson/90 text-sm mt-4 max-w-2xl mx-auto">{ARTIST_STATEMENT.subtitle}</p>
              </header>
              <h2 className="font-display text-xl sm:text-2xl text-deep-oxblood mb-6 text-center">{ARTIST_STATEMENT.title}</h2>
              <ProseBlock paragraphs={ARTIST_STATEMENT.paragraphs} />
              <p className="text-base sm:text-lg mt-6 text-gallery-black/85">
                View her full-color mystical digital artwork at{' '}
                <a href={ARTIST_STATEMENT.artPalUrl} target="_blank" rel="noopener noreferrer" className="text-artist-crimson underline">
                  artpal.com/sukh2
                </a>
                .
              </p>
            </div>
          )}

          {tab === 'reviews' && (
            <div>
              <header className="text-center mb-10">
                <p className="font-dramatic text-artist-crimson text-xs tracking-[0.3em] uppercase mb-2">
                  Comments from Celebrities
                </p>
                <h1 className="font-display text-2xl sm:text-3xl md:text-4xl text-artist-crimson uppercase">Book Reviews</h1>
              </header>
              <div className="space-y-6">
                {BOOK_REVIEWS.map((review) => (
                  <BookReviewCard key={`${review.author}-${review.book}`} review={review} />
                ))}
              </div>
            </div>
          )}

          {tab !== 'statement' && tab !== 'reviews' && (
            <div className="text-center py-12">
              <p className="text-gallery-black/80 mb-6">The full author biography is on the home page, with banner and portrait together.</p>
              <Link href="/" className="text-artist-crimson uppercase tracking-widest text-xs underline">
                Go to Home — About the Author
              </Link>
            </div>
          )}
        </div>
      </section>

      <RoseThemeClose />

      <section className="py-16 sm:py-24 bg-light-canvas border-t border-warm-gray/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <p className="font-dramatic text-artist-crimson text-xs tracking-[0.3em] uppercase mb-2 text-center">Heritage</p>
          <h2 className="font-display text-3xl sm:text-4xl text-deep-oxblood mb-14 text-center uppercase tracking-wide">
            Historical Family Background
          </h2>

          <div className="space-y-16">
            {FAMILY_BACKGROUND_INSERTS.map((insert) => (
              <article key={insert.heading} className="border border-warm-gray/25 bg-warm-cream/40 p-6 sm:p-10">
                <h3 className="font-display text-xl sm:text-2xl text-deep-oxblood mb-6 uppercase tracking-wide text-center">
                  {insert.heading}
                </h3>

                {insert.portraitStrip && (
                  <div className="mb-8">
                    <div className="relative aspect-[16/9] sm:aspect-[2/1] max-w-4xl mx-auto border border-warm-gray/20 bg-warm-cream">
                      <Image
                        src={insert.portraitStrip.image}
                        alt={insert.portraitStrip.alt}
                        fill
                        className="object-contain object-center p-2 sm:p-4"
                        sizes="(max-width: 896px) 100vw, 896px"
                      />
                    </div>
                  </div>
                )}

                {insert.intro && (
                  <p className="text-gallery-black/85 leading-relaxed text-base sm:text-lg mb-8 text-center max-w-3xl mx-auto">
                    {insert.intro}
                  </p>
                )}

                {insert.portrait && (
                  <div className="mb-8 max-w-md mx-auto relative aspect-[3/4] border border-warm-gray/20">
                    <Image
                      src={insert.portrait.image}
                      alt={insert.portrait.alt}
                      fill
                      className="object-contain object-center p-2"
                      sizes="448px"
                    />
                  </div>
                )}

                <div className="text-base sm:text-lg space-y-4 max-w-3xl mx-auto text-gallery-black/90">
                  {insert.paragraphs.map((p) => (
                    <p key={p.slice(0, 48)}>{p}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-light-canvas">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl text-deep-oxblood mb-8 text-center uppercase">{MULTICULTURAL_PUBLICATIONS.title}</h2>
          <ul className="space-y-3 border border-warm-gray/25 bg-warm-cream/50 p-6">
            {MULTICULTURAL_PUBLICATIONS.works.map((work) => (
              <li key={work.title} className="flex justify-between gap-4 py-2 border-b border-warm-gray/20 last:border-0 text-gallery-black/85">
                <span className="font-display">{work.title}</span>
                <span className="text-artist-crimson text-sm">({work.year})</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 bg-light-canvas border-t border-warm-gray/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl text-deep-oxblood mb-4">{GALLERY_PROMO.title}</h2>
          <p className="text-gallery-black/80 mb-6">{GALLERY_PROMO.subtitle}</p>
          {GALLERY_PROMO.paragraphs.map((p) => (
            <p key={p.slice(0, 40)} className="text-gallery-black/85 mb-4 leading-relaxed">{p}</p>
          ))}
          <Link
            href="https://www.artpal.com/sukh2"
            className="inline-block mt-6 bg-deep-oxblood text-warm-cream px-8 py-3 text-xs tracking-widest uppercase"
          >
            Visit Art Gallery
          </Link>
        </div>
      </section>

      <section className="py-16 bg-light-canvas">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-display text-2xl text-deep-oxblood text-center mb-10">2027 Editions</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {UPCOMING_2027_EDITIONS.map((book) => (
              <article key={book.slug} className="border border-warm-gray/25 p-6 bg-warm-cream/40">
                <h3 className="font-display text-lg text-deep-oxblood mb-2">{book.title}</h3>
                <p className="text-sm text-gallery-black/75 mb-2">{book.excerpt}</p>
                <p className="text-artist-crimson text-xs uppercase tracking-widest">{book.year}</p>
              </article>
            ))}
          </div>
          <p className="text-center mt-8 text-gallery-black/80">{DARK_MYSTERY_SPELLBOUND.tagline}</p>
        </div>
      </section>

      <RoseThemeClose />
    </>
  );
}
