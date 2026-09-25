'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { BOOK_CATALOG } from '@/lib/book-content';
import { BOOK_EXCERPT_SECTIONS } from '@/lib/book-blurbs';
import { UPCOMING_2027_EDITIONS } from '@/lib/about-content';

const TABS = [
  { id: 'excerpts', label: 'Excerpts from the Books' },
  { id: 'by-author', label: 'Books by the Author' },
] as const;

type TabId = (typeof TABS)[number]['id'];

const UPCOMING_LABEL = 'In Process — Upcoming Attractions · 2027–28 Fiscal Year';

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
          <section>
            <h2 className="font-display text-base sm:text-lg text-artist-crimson font-bold text-center mb-3 leading-snug px-1">
              {UPCOMING_LABEL}
            </h2>
            <ul className="space-y-3">
              {UPCOMING_2027_EDITIONS.map((book) => (
                <li key={book.slug} className="text-[15px] leading-relaxed">
                  <Link href={`/blog/${book.slug}`} className="text-artist-crimson font-bold underline">
                    {book.title}
                  </Link>
                  <p className="mt-1">{book.excerpt}</p>
                </li>
              ))}
            </ul>
          </section>

          {BOOK_EXCERPT_SECTIONS.map((section) => (
            <section key={section.id}>
              <h2 className="font-display text-lg text-artist-crimson font-bold text-center mb-1">
                {section.heading}
              </h2>
              {'subheading' in section && section.subheading && (
                <p className="text-center text-[15px] font-semibold mb-3">{section.subheading}</p>
              )}
              <div className="space-y-3 text-[15px] leading-relaxed text-justify">
                {section.paragraphs.map((p) => (
                  <p key={p.slice(0, 48)}>{p}</p>
                ))}
              </div>
            </section>
          ))}

          <p className="text-center pt-2">
            <Link
              href="/books/crossword-nominees"
              target="_blank"
              rel="noopener noreferrer"
              className="text-artist-crimson font-bold underline text-sm uppercase tracking-wide"
            >
              Crossword Book Award 2013 — Nominees List
            </Link>
          </p>
        </div>
      ) : (
        <div>
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
                <div className="relative aspect-[2/3] border border-warm-gray/30 bg-warm-cream overflow-hidden shadow-sm group-hover:border-artist-crimson/50 transition-colors">
                  <Image
                    src={book.coverImage}
                    alt={book.coverAlt}
                    fill
                    sizes="(max-width: 640px) 40vw, 200px"
                    className="object-cover"
                  />
                </div>
                <p className="mt-2 text-[11px] sm:text-xs font-bold text-artist-crimson leading-snug text-center px-1">
                  {book.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
