import { Metadata } from 'next';
import Image from 'next/image';
import { Suspense } from 'react';
import { SectionPageShell } from '@/components/public/SectionPageShell';
import { CROSSWORD_BOOK_AWARD_2013 } from '@/lib/book-resources';

export const metadata: Metadata = {
  title: 'Crossword Book Awards 2013 — Eligible Titles',
};

export default function CrosswordNomineesPage() {
  return (
    <Suspense fallback={null}>
      <SectionPageShell>
        <header className="text-center mb-4">
          <h1 className="font-display text-lg sm:text-xl text-artist-crimson font-bold uppercase">
            {CROSSWORD_BOOK_AWARD_2013.title}
          </h1>
          <p className="text-sm font-semibold mt-2">
            {CROSSWORD_BOOK_AWARD_2013.source} · {CROSSWORD_BOOK_AWARD_2013.date}
          </p>
        </header>

        <div className="relative aspect-[4/3] max-w-md mx-auto mb-5 border border-warm-gray/25">
          <Image
            src={CROSSWORD_BOOK_AWARD_2013.imageUrl}
            alt={CROSSWORD_BOOK_AWARD_2013.imageAlt}
            fill
            className="object-contain p-1"
            sizes="400px"
          />
        </div>

        <p className="text-center text-[15px] font-semibold mb-4 max-w-xl mx-auto">
          {CROSSWORD_BOOK_AWARD_2013.intro}
        </p>

        <div className="max-w-xl mx-auto text-[14px] sm:text-[15px] leading-relaxed font-medium text-center space-y-0">
          {CROSSWORD_BOOK_AWARD_2013.excerpt.map((entry) => (
            <p key={entry} className="py-0.5">{entry}</p>
          ))}
        </div>

        <p className="text-center mt-6">
          <a
            href={CROSSWORD_BOOK_AWARD_2013.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-artist-crimson font-bold underline text-sm"
          >
            View / Download PDF
          </a>
        </p>
      </SectionPageShell>
    </Suspense>
  );
}
