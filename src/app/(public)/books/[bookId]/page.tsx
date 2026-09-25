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

  return (
    <div className="min-h-screen bg-warm-cream text-gallery-black p-4 sm:p-8 max-w-lg mx-auto overflow-x-hidden prose-mobile-readable">
      <p className="text-right mb-2">
        <Link href="/books?tab=by-author" className="text-artist-crimson font-bold text-sm underline">
          ← Books by the Author
        </Link>
      </p>

      <div className="relative aspect-[2/3] w-[160px] mx-auto mb-4 border border-warm-gray/30">
        <Image src={catalog.coverImage} alt={catalog.coverAlt} fill className="object-cover" sizes="160px" />
      </div>

      <h1 className="font-display text-lg text-artist-crimson font-bold text-center mb-1">{blurb.title}</h1>
      {blurb.subtitle && <p className="text-center text-sm font-semibold mb-4">{blurb.subtitle}</p>}

      <div className="space-y-3 text-[15px] leading-relaxed prose-content-bold">
        {blurb.paragraphs.map((p) => (
          <p key={p.slice(0, 40)}>{p}</p>
        ))}
      </div>

      {blurb.pdfUrl && (
        <p className="mt-5 text-center">
          <a href={blurb.pdfUrl} target="_blank" rel="noopener noreferrer" className="text-artist-crimson font-bold underline">
            Read / Download PDF
          </a>
        </p>
      )}
    </div>
  );
}
