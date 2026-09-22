import { Suspense } from 'react';
import Link from 'next/link';
import { UPCOMING_2027_EDITIONS } from '@/lib/about-content';
import { DARK_MYSTERY_SPELLBOUND } from '@/lib/book-content';
import { SectionPageShell } from '@/components/public/SectionPageShell';

export default function AboutTheBookPage() {
  return (
    <Suspense fallback={null}>
      <SectionPageShell>
        <header className="text-center mb-8">
          <h1 className="font-display text-2xl sm:text-3xl text-deep-oxblood uppercase tracking-wide font-semibold">
            About the Book
          </h1>
          <p className="text-gallery-black/80 mt-3 max-w-xl mx-auto font-medium">
            Upcoming mystical adventures and featured editions — separate from the author&apos;s full book shop.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 max-w-3xl mx-auto">
          {UPCOMING_2027_EDITIONS.map((book) => (
            <article key={book.slug} className="border border-warm-gray/30 p-5 sm:p-6 bg-warm-cream/50">
              <h2 className="font-display text-lg text-deep-oxblood font-semibold mb-2">{book.title}</h2>
              <p className="text-sm text-gallery-black/85 mb-2 font-medium">{book.excerpt}</p>
              <p className="text-artist-crimson text-xs uppercase tracking-widest font-semibold">{book.year}</p>
              {book.slug && (
                <Link href={`/blog/${book.slug}`} className="inline-block mt-4 text-artist-crimson text-xs uppercase tracking-widest underline">
                  Read more
                </Link>
              )}
            </article>
          ))}
        </div>

        <p className="text-center mt-10 text-gallery-black/85 font-medium">{DARK_MYSTERY_SPELLBOUND.tagline}</p>
        <p className="text-center mt-4">
          <Link href="/books" className="text-artist-crimson text-xs uppercase tracking-widest underline font-semibold">
            Books by the Author
          </Link>
        </p>
      </SectionPageShell>
    </Suspense>
  );
}
