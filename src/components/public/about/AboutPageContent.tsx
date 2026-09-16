'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ABOUT_AUTHOR_PARAGRAPHS,
  ARTIST_STATEMENT,
  BOOK_REVIEWS,
  FAMILY_BACKGROUND_INSERTS,
  GALLERY_PROMO,
  MULTICULTURAL_PUBLICATIONS,
  UPCOMING_2027_EDITIONS,
} from '@/lib/about-content';
import { DARK_MYSTERY_SPELLBOUND } from '@/lib/book-content';

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
      <section className="py-12 sm:py-16 bg-light-canvas border-b border-warm-gray/20 text-gallery-black">
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
                    : 'text-deep-oxblood/80 border border-warm-gray/40 hover:border-aged-gold/60 hover:text-deep-oxblood bg-warm-cream/40'
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
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <p className="font-dramatic text-aged-gold text-xs tracking-[0.3em] uppercase mb-2 text-center">
            Heritage
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-warm-cream mb-14 sm:mb-16 text-center uppercase tracking-wide">
            Historical Family Background
          </h2>

          <div className="space-y-20 sm:space-y-28">
            {FAMILY_BACKGROUND_INSERTS.map((insert) => (
              <article key={insert.heading} className="border border-warm-gray/10 bg-gallery-black p-6 sm:p-10 md:p-12">
                <h3 className="font-display text-xl sm:text-2xl text-warm-cream mb-6 sm:mb-8 uppercase tracking-wide text-center">
                  {insert.heading}
                </h3>

                {insert.portraitStrip && (
                  <div className="mb-8 sm:mb-10">
                    <div className="gallery-frame max-w-4xl mx-auto">
                      <div className="gallery-frame-inner relative aspect-[16/9] sm:aspect-[2/1] bg-soft-black">
                        <Image
                          src={insert.portraitStrip.image}
                          alt={insert.portraitStrip.alt}
                          fill
                          className="object-contain object-center p-2 sm:p-4"
                          sizes="(max-width: 896px) 100vw, 896px"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 max-w-4xl mx-auto text-center">
                      {insert.portraitStrip.captions.map((caption) => (
                        <p key={caption} className="text-artist-crimson text-sm sm:text-base font-medium">
                          {caption}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {insert.intro && (
                  <p className="text-muted-beige leading-relaxed text-base sm:text-lg mb-8 text-center max-w-3xl mx-auto">
                    {insert.intro}
                  </p>
                )}

                {insert.portrait && (
                  <div className="mb-8 sm:mb-10 max-w-md mx-auto">
                    <div className="gallery-frame">
                      <div className="gallery-frame-inner relative aspect-[3/4] bg-soft-black">
                        <Image
                          src={insert.portrait.image}
                          alt={insert.portrait.alt}
                          fill
                          className="object-contain object-center p-2"
                          sizes="(max-width: 448px) 100vw, 448px"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="prose-content text-base sm:text-lg space-y-4 max-w-3xl mx-auto">
                  {insert.paragraphs.map((p) => (
                    <p key={p.slice(0, 48)}>
                      {insert.heading === 'Sardar Natha Singh'
                        ? p.split('Koh-i-Noor Diamond').map((part, idx, arr) => (
                            <span key={idx}>
                              {part}
                              {idx < arr.length - 1 && <strong>Koh-i-Noor Diamond</strong>}
                            </span>
                          ))
                        : p}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-gallery-black">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="font-dramatic text-aged-gold text-xs tracking-[0.3em] uppercase mb-2 text-center">
            Publications
          </p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-warm-cream mb-10 text-center uppercase tracking-wide">
            {MULTICULTURAL_PUBLICATIONS.title}
          </h2>
          <ul className="space-y-4 border border-warm-gray/10 bg-soft-black/40 p-6 sm:p-10">
            {MULTICULTURAL_PUBLICATIONS.works.map((work) => (
              <li
                key={work.title}
                className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-6 py-3 border-b border-warm-gray/10 last:border-0 text-muted-beige"
              >
                <span className="text-warm-cream font-display text-lg sm:text-xl">{work.title}</span>
                <span className="text-aged-gold text-sm tracking-wider shrink-0">({work.year})</span>
              </li>
            ))}
          </ul>
          <p className="text-muted-beige text-sm text-center mt-8 leading-relaxed">
            Author and compiler of a series of multicultural education resource books, alongside poetry and lyrical
            anthologies spanning decades of community leadership and creative work.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-soft-black">
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
                href="/books"
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
            <Link href="/books" className="text-aged-gold text-sm tracking-widest uppercase hover:text-warm-cream transition-colors">
              Read Full Book Descriptions →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-soft-black border-y border-warm-gray/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="font-dramatic text-artist-crimson text-xs sm:text-sm tracking-[0.25em] uppercase mb-3 text-center">
            {DARK_MYSTERY_SPELLBOUND.tagline}
          </p>
          <h2 className="font-display text-2xl sm:text-3xl text-warm-cream mb-6 text-center">
            {DARK_MYSTERY_SPELLBOUND.title}
          </h2>
          <p className="prose-content text-base sm:text-lg text-center">{DARK_MYSTERY_SPELLBOUND.paragraphs[0]}</p>
          <div className="text-center mt-8">
            <Link
              href="/books"
              className="inline-flex items-center justify-center border border-warm-cream/50 text-warm-cream px-6 py-3 text-[11px] tracking-[0.16em] uppercase hover:bg-warm-cream/10 transition-colors"
            >
              Buy the Books
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
