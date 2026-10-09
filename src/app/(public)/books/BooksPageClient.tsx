'use client';

import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { BOOK_CATALOG } from '@/lib/book-content';
import { BOOK_EXCERPT_SECTIONS } from '@/lib/book-blurbs';
import { MulticulturalBooksGrid } from '@/components/public/books/MulticulturalBooksGrid';
import { BookCoverImage } from '@/components/public/books/BookCoverImage';
import { ComingAttractionsSections } from '@/components/public/books/ComingAttractionsSections';

const TABS = [
  { id: 'excerpts', label: 'Excerpts from the Books' },
  { id: 'by-author', label: 'Books by the Author' },
] as const;

type TabId = (typeof TABS)[number]['id'];

export default function BooksPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tab = (searchParams.get('tab') as TabId) || 'excerpts';

  const setTab = (id: TabId) => {
    router.push(`/books?tab=${id}`, { scroll: false });
  };

  return (
    <>
      <header className="text-center mb-4">
        <h1 className="font-display text-xl sm:text-2xl text-artist-crimson uppercase font-bold">Books</h1>
      </header>

      <div className="flex flex-col sm:flex-row flex-wrap gap-2 mb-5 border-b border-warm-gray/30 pb-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={cn(
              'w-full sm:w-auto px-3 py-2.5 sm:py-1.5 text-[10px] sm:text-[10px] uppercase tracking-wide font-bold text-left min-h-[44px] sm:min-h-0 flex items-center',
              tab === t.id
                ? 'bg-artist-crimson text-warm-cream'
                : 'text-artist-crimson border border-warm-gray/35 hover:border-artist-crimson/50'
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'excerpts' ? (
        <div className="space-y-6">
          <ComingAttractionsSections />

          <hr className="border-warm-gray/35" />

          <h2 className="font-display text-base sm:text-lg text-artist-crimson font-bold text-center mb-4">
            Extended excerpts &amp; author narrative
          </h2>

          {BOOK_EXCERPT_SECTIONS.map((section) => (
            <section key={section.id}>
              <h2 className="font-display text-lg text-artist-crimson font-bold text-center mb-1">
                {section.heading}
              </h2>
              {'subheading' in section && section.subheading && (
                <p className="text-center text-[15px] font-semibold mb-3">{section.subheading}</p>
              )}
              <div className="space-y-3 text-[15px] leading-relaxed text-justify">
                {section.openingVerse && section.openingVerse.length > 0 && (
                  <div className="mb-4 max-w-xl mx-auto text-center space-y-1.5 sm:space-y-2">
                    {section.openingVerse.map((line) => (
                      <p
                        key={line}
                        className="font-display italic text-artist-crimson text-[15px] sm:text-base leading-relaxed"
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                )}
                {section.paragraphs.map((p) => (
                  <p key={p.slice(0, 48)}>{p}</p>
                ))}
                {section.urduTranslation && (
                  <div className="pt-2 text-center">
                    <p className="font-bold text-artist-crimson text-sm mb-1">
                      {section.urduTranslation.label}
                    </p>
                    <p className="font-display italic text-[15px] leading-relaxed">
                      {section.urduTranslation.text}
                    </p>
                  </div>
                )}
                {section.closingQuote && section.closingQuote.length > 0 && (
                  <div className="pt-3 max-w-xl mx-auto text-center space-y-0.5">
                    {section.closingQuote.map((line) => (
                      <p
                        key={line}
                        className="font-display italic text-artist-crimson text-[15px] sm:text-base leading-relaxed"
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                )}
                {section.signature && (
                  <p className="pt-4 text-center font-display text-artist-crimson">
                    {section.signature.preface && (
                      <span className="block italic text-[15px] mb-1">{section.signature.preface}</span>
                    )}
                    <span className="block font-semibold text-[15px] not-italic">{section.signature.name}</span>
                    {section.signature.date && (
                      <span className="block text-gallery-black font-semibold text-[15px] mt-1">
                        {section.signature.date}
                      </span>
                    )}
                  </p>
                )}
              </div>
            </section>
          ))}

          <p className="text-center pt-2">
            <Link
              href="/media-coverage#crossword-book-awards-2013"
              className="text-artist-crimson font-bold underline text-sm uppercase tracking-wide"
            >
              Crossword Book Award 2013 — Nominees List (Media Coverage)
            </Link>
          </p>
        </div>
      ) : (
        <div>
          <h2 className="font-display text-base sm:text-lg text-artist-crimson font-bold text-center mb-3">
            Illustrated Mystical Adventures &amp; Fiction
          </h2>
          <p className="text-center text-[15px] font-semibold mb-4">
            Select a cover to open the book description in a new window.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
            {BOOK_CATALOG.map((book) => (
              <Link
                key={book.id}
                href={`/books/${book.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-left group"
              >
                <BookCoverImage
                  src={book.coverImage}
                  alt={book.coverAlt}
                  zoom={book.coverZoom}
                  fit={book.coverFit}
                  frameClassName="border border-warm-gray/30 shadow-sm group-hover:border-artist-crimson/50 transition-colors"
                />
                <p className="mt-2 text-[11px] sm:text-xs font-bold text-artist-crimson leading-snug text-center px-1">
                  {book.title}
                </p>
              </Link>
            ))}
          </div>

          <MulticulturalBooksGrid />
        </div>
      )}
    </>
  );
}
