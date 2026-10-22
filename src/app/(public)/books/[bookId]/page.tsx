import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { BOOK_CATALOG } from '@/lib/book-content';
import { getBookBlurbs } from '@/lib/book-blurbs';

export default async function BookDetailWindowPage({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  const { bookId } = await params;
  const catalog = BOOK_CATALOG.find((b) => b.id === bookId);
  const blurb = getBookBlurbs().find((b) => b.id === bookId);
  if (!catalog || !blurb) notFound();

  const hasSpread = (catalog.additionalCovers?.length ?? 0) > 0;
  const pageWidth = hasSpread ? 'max-w-3xl' : 'max-w-lg';

  return (
    <div className="min-h-screen bg-page-silver text-gallery-black overflow-x-hidden prose-mobile-readable">
      <div className="site-content-width mx-auto px-3 sm:px-4 pt-2 pb-1">
        <Link href="/books?tab=excerpts" className="text-artist-crimson font-bold text-sm underline">
          ← Excerpts from the Books
        </Link>
      </div>

      <div className={`${pageWidth} mx-auto px-4 sm:px-8 pb-8`}>
      <div
        className={
          catalog.coverFit === 'contain'
            ? 'relative w-full max-w-[min(100%,20rem)] aspect-[4/3] mx-auto mb-4 border border-warm-gray/30 bg-gallery-black'
            : 'relative aspect-[2/3] w-[160px] mx-auto mb-4 border border-warm-gray/30'
        }
      >
        <Image
          src={catalog.coverImage}
          alt={catalog.coverAlt}
          fill
          className={catalog.coverFit === 'contain' ? 'object-contain object-center' : 'object-cover'}
          sizes="320px"
        />
      </div>

      <h1 className="font-display text-lg text-artist-crimson font-bold text-center mb-1">{blurb.title}</h1>
      {blurb.subtitle && <p className="text-center text-sm font-semibold mb-1">{blurb.subtitle}</p>}
      {catalog.edition && (
        <p className="text-center text-sm font-semibold text-gallery-black/85 mb-4">{catalog.edition}</p>
      )}

      <div className="space-y-3 text-[15px] leading-relaxed text-justify prose-content-bold">
        {blurb.paragraphs.map((p) => (
          <p key={p.slice(0, 40)}>{p}</p>
        ))}
      </div>

      {catalog.additionalCovers?.map((cover) => (
        <figure key={cover.src} className="mt-8 border-t border-warm-gray/30 pt-6">
          {cover.label && (
            <figcaption className="text-center text-sm font-bold text-artist-crimson mb-3">{cover.label}</figcaption>
          )}
          <div className="border border-warm-gray/30 bg-warm-cream overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element -- wide cover spread; native width */}
            <img src={cover.src} alt={cover.alt} className="block w-full h-auto" decoding="async" />
          </div>
        </figure>
      ))}

      {blurb.pdfUrl && (
        <p className="mt-5 text-center">
          <a href={blurb.pdfUrl} target="_blank" rel="noopener noreferrer" className="text-artist-crimson font-bold underline">
            Read / Download PDF
          </a>
        </p>
      )}
      </div>
    </div>
  );
}
