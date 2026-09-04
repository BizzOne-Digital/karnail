'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ABOUT_AUTHOR_PARAGRAPHS,
  ARTIST_STATEMENT,
  BOOK_REVIEWS,
  FAMILY_BACKGROUND_INSERTS,
  GALLERY_PROMO,
  UPCOMING_2027_EDITIONS,
} from '@/lib/about-content';

const TABS = [
  { id: 'author', label: 'About the Author' },
  { id: 'statement', label: 'Artist Statement' },
  { id: 'reviews', label: 'Book Reviews' },
] as const;

type TabId = (typeof TABS)[number]['id'];

function ProseBlock({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="prose-content text-base sm:text-lg space-y-4">
      {paragraphs.map((p) => (
        <p key={p.slice(0, 40)}>{p}</p>
      ))}
    </div>
  );
}

function BookReviewCard({ review }: { review: (typeof BOOK_REVIEWS)[number] }) {
  return (
    <article className="bg-soft-black/70 border border-warm-gray/10 p-6 sm:p-8 relative">
      {review.book && (
        <span className="inline-block text-[10px] sm:text-xs tracking-[0.2em] uppercase text-artist-crimson mb-4">
          {review.book}
        </span>
      )}
      <span className="absolute top-5 right-6 font-display text-5xl text-artist-crimson/20 leading-none">&rdquo;</span>
      <p className="font-display text-lg sm:text-xl text-warm-cream italic leading-relaxed mb-5">
        &ldquo;{review.quote}&rdquo;
      </p>
      <p className="text-muted-beige font-medium">{review.author}</p>
      <p className="text-warm-gray text-sm mt-1">{review.title}</p>
    </article>
  );
}

export function AboutPageContent() {
  const [activeTab, setActiveTab] = useState<TabId>('author');

  return (
    <>
      <section className="py-12 sm:py-16 bg-gallery-black border-b border-warm-gray/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-10">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 sm:px-6 py-2.5 text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.18em] uppercase transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-artist-crimson text-warm-cream border border-artist-crimson'
                    : 'text-muted-beige border border-warm-gray/20 hover:border-aged-gold/40 hover:text-warm-cream'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'author' && (
            <div>
              <ProseBlock paragraphs={ABOUT_AUTHOR_PARAGRAPHS} />
              <p className="prose-content text-base sm:text-lg mt-4">
                Her artwork can be viewed at her Art Gallery:{' '}
                <a href="https://www.artpal.com/sukh2" target="_blank" rel="noopener noreferrer">
                  www.artpal.com/sukh2
                </a>{' '}
                and on her website{' '}
                <a href="https://www.mysteryoftherose.com" target="_blank" rel="noopener noreferrer">
                  www.mysteryoftherose.com
                </a>
                .
              </p>
            </div>
          )}

          {activeTab === 'statement' && (
            <div>
              <h2 className="font-display text-2xl sm:text-3xl text-warm-cream mb-3">{ARTIST_STATEMENT.title}</h2>
              <p className="text-artist-crimson text-sm tracking-wide mb-6">{ARTIST_STATEMENT.subtitle}</p>
              <ProseBlock paragraphs={ARTIST_STATEMENT.paragraphs} />
              <p className="prose-content text-base sm:text-lg mt-4">
                View her full-color mystical digital artwork at{' '}
                <a href={ARTIST_STATEMENT.artPalUrl} target="_blank" rel="noopener noreferrer">
                  artpal.com/sukh2
                </a>
                .
              </p>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <p className="font-dramatic text-aged-gold text-xs tracking-[0.3em] uppercase mb-2 text-center">
                Comments from Celebrities
              </p>
              <h2 className="font-display text-2xl sm:text-3xl text-warm-cream mb-8 text-center">Book Reviews</h2>
              <div className="space-y-6">
                {BOOK_REVIEWS.map((review) => (
                  <BookReviewCard key={`${review.author}-${review.book}`} review={review} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-soft-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="font-dramatic text-aged-gold text-xs tracking-[0.3em] uppercase mb-2 text-center">
            Heritage
          </p>
          <h2 className="font-display text-3xl sm:text-4xl text-warm-cream mb-12 text-center">
            Historical Family Background
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
            {FAMILY_BACKGROUND_INSERTS.map((insert, i) => (
              <div
                key={insert.heading}
                className="border border-warm-gray/10 bg-gallery-black p-8 sm:p-10 relative overflow-hidden"
              >
                <span className="absolute top-4 right-6 font-display text-6xl text-artist-crimson/10 leading-none">
                  {i + 1}
                </span>
                <h3 className="font-display text-xl sm:text-2xl text-warm-cream mb-4 pr-12">{insert.heading}</h3>
                <p className="text-muted-beige leading-relaxed">{insert.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-gallery-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <p className="font-dramatic text-aged-gold text-xs tracking-[0.3em] uppercase mb-2 text-center">
            Online Gallery
          </p>
          <h2 className="font-display text-3xl sm:text-4xl text-warm-cream mb-3 text-center">{GALLERY_PROMO.title}</h2>
          <p className="text-artist-crimson text-sm text-center mb-8">{GALLERY_PROMO.subtitle}</p>
          <ProseBlock paragraphs={GALLERY_PROMO.paragraphs} />
          <p className="prose-content text-base sm:text-lg mt-4">
            Dark Mystery: Spellbound—Arose from the Ashes tells the story of an angel, disguised as a prince, who is
            transformed into a ghost by a jealous demon and trapped in time. His remorse, perseverance and faith help him
            reconnect with the higher source and empower him to transcend the barriers of time and space to reunite with
            his true love, Princessa. The book is a poetic rendition of a story from the author&apos;s debut historical
            novel, <em>The Mystery of the Rose—The Return of the Prince</em>, which was nominated for the 2013 Crossword
            Book Award.
          </p>
          <div className="text-center mt-10">
            <Link
              href="/gallery"
              className="inline-flex items-center justify-center bg-deep-oxblood hover:bg-artist-crimson text-warm-cream px-8 py-3.5 text-[11px] tracking-[0.18em] uppercase transition-colors border border-deep-oxblood"
            >
              Explore the Galleries
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-soft-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="font-dramatic text-aged-gold text-xs tracking-[0.3em] uppercase mb-2 text-center">
            Author Blog
          </p>
          <h2 className="font-display text-3xl sm:text-4xl text-warm-cream mb-4 text-center">
            Upcoming Mystical Adventures — 2027 Editions
          </h2>
          <p className="text-muted-beige text-center max-w-2xl mx-auto mb-12">
            Two forthcoming illustrated editions continuing Sukh D. H. Khokhar&apos;s journey into magical realism,
            mystery, and spiritual storytelling.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {UPCOMING_2027_EDITIONS.map((edition) => (
              <Link
                key={edition.slug}
                href={`/blog/${edition.slug}`}
                className="group block bg-gallery-black border border-warm-gray/10 hover:border-artist-crimson/40 p-8 sm:p-10 transition-all duration-300"
              >
                <span className="inline-block text-xs tracking-[0.2em] uppercase text-aged-gold mb-3">
                  {edition.year} Edition
                </span>
                <h3 className="font-display text-xl sm:text-2xl text-warm-cream mb-4 group-hover:text-aged-gold transition-colors">
                  {edition.title}
                </h3>
                <p className="text-muted-beige text-sm leading-relaxed mb-6">{edition.excerpt}</p>
                <span className="text-artist-crimson text-xs tracking-widest uppercase group-hover:translate-x-1 inline-block transition-transform">
                  Read More →
                </span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/blog" className="text-aged-gold text-sm tracking-widest uppercase hover:text-warm-cream transition-colors">
              View All Journal Entries →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
