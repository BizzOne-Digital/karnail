import Link from 'next/link';
import { SectionHero } from '@/components/public/SectionHero';
import { Button } from '@/components/ui/Button';
import { BOOK_LISTINGS, CONTACT_EMAIL, CONTACT_LINKS } from '@/lib/contact-info';
import { MULTICULTURAL_PUBLICATIONS } from '@/lib/about-content';
import {
  DARK_MYSTERY_SPELLBOUND,
  RETURN_OF_THE_PRINCE,
  MYSTERIES_OF_MY_LIFE,
} from '@/lib/book-content';

function ProseSection({
  tagline,
  title,
  subtitle,
  paragraphs,
  details,
  className = 'bg-gallery-black',
}: {
  tagline?: string;
  title: string;
  subtitle?: string;
  paragraphs: string[];
  details?: string[];
  className?: string;
}) {
  return (
    <section className={`py-16 sm:py-24 ${className}`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {tagline && (
          <p className="font-dramatic text-artist-crimson text-xs sm:text-sm tracking-[0.25em] uppercase mb-3 text-center">
            {tagline}
          </p>
        )}
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-warm-cream mb-2 text-center leading-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-aged-gold text-sm text-center mb-8 tracking-wide">{subtitle}</p>
        )}
        {!subtitle && <div className="mb-8" />}
        <div className="prose-content text-base sm:text-lg space-y-4">
          {paragraphs.map((p) => (
            <p key={p.slice(0, 50)}>{p}</p>
          ))}
        </div>
        {details && details.length > 0 && (
          <ul className="mt-8 flex flex-wrap gap-3 justify-center">
            {details.map((d) => (
              <li
                key={d}
                className="text-[10px] sm:text-xs tracking-[0.15em] uppercase px-3 py-1.5 border border-aged-gold/40 text-aged-gold"
              >
                {d}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default function BooksPageContent() {
  return (
    <>
      <SectionHero
        eyebrow="Publications"
        heading="Buy the Books"
        description="Discover mystical novels, illustrated poetry, and upcoming 2027 editions by Sukh D. H. Khokhar."
      />

      <ProseSection
        tagline={DARK_MYSTERY_SPELLBOUND.tagline}
        title={DARK_MYSTERY_SPELLBOUND.title}
        subtitle={DARK_MYSTERY_SPELLBOUND.edition}
        paragraphs={DARK_MYSTERY_SPELLBOUND.paragraphs}
        details={DARK_MYSTERY_SPELLBOUND.details}
      />

      <div className="text-center pb-12 bg-gallery-black">
        <Link
          href={`/contact?subject=${encodeURIComponent('Dark Mystery 2027 Edition: Spellbound')}`}
          className="inline-flex items-center justify-center bg-deep-oxblood hover:bg-artist-crimson text-warm-cream px-8 py-3.5 text-[11px] tracking-[0.18em] uppercase transition-colors border border-deep-oxblood"
        >
          Enquire About 2027 Edition
        </Link>
      </div>

      <section className="py-16 sm:py-24 bg-soft-black border-y border-warm-gray/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-warm-cream mb-8">
            {RETURN_OF_THE_PRINCE.title}
          </h2>
          <ul className="space-y-4 text-left max-w-2xl mx-auto">
            {RETURN_OF_THE_PRINCE.points.map((point) => (
              <li key={point} className="text-muted-beige leading-relaxed pl-4 border-l-2 border-artist-crimson/50">
                {point}
              </li>
            ))}
          </ul>
          <p className="text-aged-gold text-sm mt-8 tracking-wide">{RETURN_OF_THE_PRINCE.note}</p>
          <div className="flex flex-wrap gap-3 justify-center mt-8">
            <a
              href={CONTACT_LINKS.mysteryOfTheRose}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-deep-oxblood hover:bg-artist-crimson text-warm-cream px-6 py-3 text-[11px] tracking-[0.16em] uppercase transition-colors"
            >
              Visit {CONTACT_LINKS.mysteryOfTheRoseLabel}
            </a>
            <Link
              href="/contact?subject=The%20Mystery%20of%20the%20Rose"
              className="inline-flex items-center justify-center border border-warm-cream/50 text-warm-cream px-6 py-3 text-[11px] tracking-[0.16em] uppercase hover:bg-warm-cream/10 transition-colors"
            >
              Enquire to Buy
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-gallery-black">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-warm-cream mb-8 text-center italic">
            {MYSTERIES_OF_MY_LIFE.title}
          </h2>
          <div className="prose-content text-base sm:text-lg space-y-4">
            {MYSTERIES_OF_MY_LIFE.paragraphs.map((p) => (
              <p key={p.slice(0, 50)}>{p}</p>
            ))}
          </div>
          <div className="mt-10 p-6 sm:p-8 border border-warm-gray/10 bg-soft-black/50 text-center">
            <p className="text-aged-gold text-xs tracking-[0.2em] uppercase mb-3">
              {MYSTERIES_OF_MY_LIFE.urduTranslation.label}
            </p>
            <p className="font-display text-lg sm:text-xl text-warm-cream italic leading-relaxed mb-6">
              {MYSTERIES_OF_MY_LIFE.urduTranslation.text}
            </p>
            <p className="text-muted-beige font-display text-lg">{MYSTERIES_OF_MY_LIFE.signature.name}</p>
            <p className="text-warm-gray text-sm mt-1">{MYSTERIES_OF_MY_LIFE.signature.date}</p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-soft-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl sm:text-3xl text-warm-cream mb-10 text-center">All Publications</h2>
          <div className="space-y-6">
            {BOOK_LISTINGS.map((book) => (
              <article
                key={book.title}
                className="border border-warm-gray/10 bg-gallery-black p-6 sm:p-8"
              >
                <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                  <div>
                    {book.subtitle && (
                      <p className="text-artist-crimson text-[10px] tracking-[0.2em] uppercase mb-1">{book.subtitle}</p>
                    )}
                    <h3 className="font-display text-xl sm:text-2xl text-warm-cream">{book.title}</h3>
                  </div>
                  <span
                    className={`text-[10px] tracking-[0.18em] uppercase px-3 py-1 border ${
                      book.status === 'upcoming'
                        ? 'border-aged-gold/50 text-aged-gold'
                        : 'border-artist-crimson/50 text-artist-crimson'
                    }`}
                  >
                    {book.status === 'upcoming' ? 'Coming 2027' : 'Available'}
                  </span>
                </div>
                <p className="text-muted-beige text-sm leading-relaxed mb-4">{book.description}</p>
                <div className="flex flex-wrap gap-3">
                  {book.buyUrl && (
                    <a
                      href={book.buyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-aged-gold text-xs tracking-widest uppercase hover:text-warm-cream transition-colors"
                    >
                      Visit Website →
                    </a>
                  )}
                  <Link
                    href={`/contact?subject=${encodeURIComponent(book.contactSubject || book.title)}`}
                    className="text-artist-crimson text-xs tracking-widest uppercase hover:text-warm-cream transition-colors"
                  >
                    Enquire →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-gallery-black border-t border-warm-gray/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl sm:text-3xl text-warm-cream mb-10 text-center uppercase tracking-wide">
            {MULTICULTURAL_PUBLICATIONS.title}
          </h2>
          <ul className="space-y-3">
            {MULTICULTURAL_PUBLICATIONS.works.map((work) => (
              <li
                key={work.title}
                className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 py-4 px-5 border border-warm-gray/10 bg-soft-black/40 text-muted-beige"
              >
                <span className="text-warm-cream font-display text-lg">{work.title}</span>
                <span className="text-aged-gold text-sm">({work.year})</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 bg-soft-black text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-display text-2xl sm:text-3xl text-warm-cream mb-4">Where to Buy</h2>
          <p className="text-muted-beige mb-8 leading-relaxed">
            Books are available through Amazon, Chapters-Indigo, Kindle, Kobo, and many retail stores worldwide.
          </p>
          <div className="space-y-3 text-muted-beige mb-10">
            <p>
              <span className="text-aged-gold">Email: </span>
              <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-warm-cream transition-colors">
                {CONTACT_EMAIL}
              </a>
            </p>
            <p>
              <span className="text-aged-gold">Art Gallery: </span>
              <a href={CONTACT_LINKS.artPal} target="_blank" rel="noopener noreferrer" className="hover:text-warm-cream transition-colors">
                {CONTACT_LINKS.artPalLabel}
              </a>
            </p>
            <p>
              <span className="text-aged-gold">Author Website: </span>
              <a href={CONTACT_LINKS.mysteryOfTheRose} target="_blank" rel="noopener noreferrer" className="hover:text-warm-cream transition-colors">
                {CONTACT_LINKS.mysteryOfTheRoseLabel}
              </a>
            </p>
          </div>
          <Button href="/contact" size="lg">
            Contact Us
          </Button>
        </div>
      </section>
    </>
  );
}
