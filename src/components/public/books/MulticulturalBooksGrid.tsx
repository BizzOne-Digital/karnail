import Link from 'next/link';
import { MULTICULTURAL_RESOURCE_BOOKS } from '@/lib/book-resources';
import { BookCoverImage } from '@/components/public/books/BookCoverImage';

export function MulticulturalBooksGrid() {
  const { title, organization, pdfUrl, works } = MULTICULTURAL_RESOURCE_BOOKS;

  return (
    <section className="mt-10 pt-8 border-t border-warm-gray/30">
      <h2 className="font-display text-base sm:text-lg text-artist-crimson font-bold text-center mb-1 leading-snug px-1">
        {title}
      </h2>
      <p className="text-center text-[13px] sm:text-sm font-semibold text-gallery-black/85 mb-5 px-1">
        {organization}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-6 sm:gap-x-6 sm:gap-y-8 items-start">
        {works.map((book) => {
          const href = book.coverImage ?? pdfUrl;

          return (
            <Link
              key={book.id}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-left group flex flex-col h-full"
            >
              {book.coverImage ? (
                <BookCoverImage
                  src={book.coverImage}
                  alt={book.coverAlt}
                  fit="contain"
                  containInset="0.5cm"
                  frameBgClassName="bg-warm-cream"
                  frameClassName="border border-warm-gray/30 shadow-sm group-hover:border-artist-crimson/50 transition-colors"
                />
              ) : (
                <div className="relative aspect-[3/4] border border-warm-gray/30 bg-warm-cream flex items-center justify-center p-2 shadow-sm">
                  <p className="text-[11px] sm:text-xs font-bold text-artist-crimson text-center leading-snug">
                    {book.title}
                    <span className="block mt-1 text-gallery-black/70 font-semibold">({book.year})</span>
                  </p>
                </div>
              )}
              <p className="mt-3 text-[11px] sm:text-xs font-bold text-artist-crimson leading-snug text-center px-1 min-h-[2.75rem] sm:min-h-[3rem]">
                {book.title}
                <span className="block text-gallery-black/75 font-semibold">({book.year})</span>
              </p>
            </Link>
          );
        })}
      </div>

      <p className="text-center mt-6">
        <Link
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-artist-crimson font-bold underline text-sm"
        >
          View multicultural resource books (PDF)
        </Link>
      </p>
    </section>
  );
}
