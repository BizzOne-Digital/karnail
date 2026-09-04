'use client';

import Link from 'next/link';
import { BOOK_REVIEWS } from '@/lib/about-content';
import { AutoScrollMarquee } from '@/components/animations/ScrollEffects';

export function CelebrityReviewsMarquee() {
  const cards = BOOK_REVIEWS.map((review) => (
    <article
      key={`${review.author}-${review.book}`}
      className="w-[min(85vw,340px)] sm:w-[380px] md:w-[420px] flex-shrink-0 mx-2 sm:mx-3 bg-soft-black/70 border border-warm-gray/10 p-6 sm:p-8 relative"
    >
      {review.book && (
        <span className="text-[10px] tracking-[0.2em] uppercase text-artist-crimson mb-3 block">{review.book}</span>
      )}
      <span className="absolute top-4 left-5 font-display text-5xl text-artist-crimson/25 leading-none">&ldquo;</span>
      <p className="font-display text-base sm:text-lg text-warm-cream italic leading-relaxed mb-5 line-clamp-6 pt-6">
        {review.quote}
      </p>
      <p className="text-muted-beige text-sm font-medium">{review.author}</p>
      <p className="text-warm-gray text-xs mt-1">{review.title}</p>
    </article>
  ));

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-16 md:w-32 bg-gradient-to-r from-gallery-black to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-16 md:w-32 bg-gradient-to-l from-gallery-black to-transparent z-10" />
      <AutoScrollMarquee duration={55} className="py-2">
        {cards}
      </AutoScrollMarquee>
      <div className="text-center mt-10">
        <Link href="/about" className="text-aged-gold text-sm tracking-widest uppercase hover:text-warm-cream transition-colors">
          Read Full Reviews on About →
        </Link>
      </div>
    </div>
  );
}
