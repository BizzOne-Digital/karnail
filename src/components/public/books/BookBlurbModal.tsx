'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { X } from 'lucide-react';
import type { BookBlurbEntry } from '@/lib/book-blurbs';

interface BookBlurbModalProps {
  book: BookBlurbEntry | null;
  onClose: () => void;
}

export function BookBlurbModal({ book, onClose }: BookBlurbModalProps) {
  useEffect(() => {
    if (!book) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [book, onClose]);

  if (!book) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/70"
      role="dialog"
      aria-modal="true"
      aria-labelledby="book-blurb-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-warm-cream border border-warm-gray/40 shadow-2xl p-5 sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 p-1 text-gallery-black/70 hover:text-artist-crimson"
          aria-label="Close"
        >
          <X size={22} />
        </button>

        <div className="relative aspect-[2/3] w-[140px] mx-auto mb-4 border border-warm-gray/30">
          <Image src={book.coverImage} alt={book.coverAlt} fill className="object-cover" sizes="140px" />
        </div>

        <h2 id="book-blurb-title" className="font-display text-lg text-artist-crimson font-bold text-center mb-1">
          {book.title}
        </h2>
        {book.subtitle && (
          <p className="text-center text-sm font-semibold text-gallery-black/80 mb-4">{book.subtitle}</p>
        )}

        <div className="space-y-3 text-[15px] leading-relaxed prose-content-bold">
          {book.paragraphs.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </div>

        {book.pdfUrl && (
          <a
            href={book.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-5 text-artist-crimson font-bold text-sm underline"
          >
            Read / Download PDF
          </a>
        )}
      </div>
    </div>
  );
}
