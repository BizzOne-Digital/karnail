import type { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { RoseThemeClose } from '@/components/public/RoseThemeClose';
import { BOOK_LISTINGS, CONTACT_EMAIL, CONTACT_LINKS } from '@/lib/contact-info';
import { CROSSWORD_BOOK_AWARD_2013, MULTICULTURAL_RESOURCE_BOOKS } from '@/lib/book-resources';
import {
  BOOK_CATALOG,
  DARK_MYSTERY_SPELLBOUND,
  RETURN_OF_THE_PRINCE,
  MYSTERIES_OF_MY_LIFE,
  type BookCoverAsset,
} from '@/lib/book-content';

function BookCoverImage({
  src,
  alt,
  label,
  priority = false,
  className = '',
}: {
  src: string;
  alt: string;
  label?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure className={`group ${className}`}>
      <div className="relative aspect-[2/3] w-full max-w-[280px] mx-auto overflow-hidden border border-warm-gray/30 bg-warm-cream shadow-[0_16px_40px_rgba(104,25,35,0.12)]">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 640px) 70vw, 280px"
          className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </div>
      {label && (
        <figcaption className="text-center text-gallery-black/60 text-[10px] tracking-[0.18em] uppercase mt-3">
          {label}
        </figcaption>
      )}
    </figure>
  );
}

function CoverGallery({ covers }: { covers: BookCoverAsset[] }) {
  return (
    <div className="mt-10 grid grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {covers.map((cover) => (
        <BookCoverImage key={cover.src} src={cover.src} alt={cover.alt} label={cover.label} />
      ))}
    </div>
  );
}

function ProseSection({
  tagline,
  title,
  subtitle,
  paragraphs,
  details,
  coverImage,
  coverAlt,
  additionalCovers,
  pdfUrl,
  actions,
  className = 'bg-light-canvas',
}: {
  tagline?: string;
  title: string;
  subtitle?: string;
  paragraphs?: string[];
  details?: string[];
  coverImage?: string;
  coverAlt?: string;
  additionalCovers?: BookCoverAsset[];
  pdfUrl?: string;
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <section className={`py-16 sm:py-24 ${className}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className={`grid gap-10 lg:gap-14 items-start ${coverImage ? 'lg:grid-cols-[minmax(0,280px)_1fr]' : ''}`}>
          {coverImage && (
            <BookCoverImage src={coverImage} alt={coverAlt || title} priority className="lg:sticky lg:top-28" />
          )}

          <div className={coverImage ? '' : 'max-w-3xl mx-auto'}>
            {tagline && (
              <p className="font-dramatic text-artist-crimson text-xs sm:text-sm tracking-[0.25em] uppercase mb-3">
                {tagline}
              </p>
            )}
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-deep-oxblood mb-2 leading-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-aged-gold text-sm mb-8 tracking-wide">{subtitle}</p>
            )}
            {!subtitle && <div className="mb-8" />}

            {paragraphs && paragraphs.length > 0 && (
              <div className="prose-content text-base sm:text-lg space-y-4">
                {paragraphs.map((p) => (
                  <p key={p.slice(0, 50)}>{p}</p>
                ))}
              </div>
            )}

            {details && details.length > 0 && (
              <ul className="mt-8 flex flex-wrap gap-3">
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

            {(actions || pdfUrl) && (
              <div className="mt-8 flex flex-wrap gap-3">
                {pdfUrl && (
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-deep-oxblood hover:bg-artist-crimson text-warm-cream px-6 py-3 text-[11px] tracking-[0.16em] uppercase transition-colors border border-deep-oxblood"
                  >
                    Read / Download PDF
                  </a>
                )}
                {actions}
              </div>
            )}
          </div>
        </div>

        {additionalCovers && additionalCovers.length > 0 && (
          <CoverGallery covers={additionalCovers} />
        )}
      </div>
    </section>
  );
}

export default function BooksPageContent() {
  const spellbound = BOOK_CATALOG.find((b) => b.id === 'spellbound-2027');
  const mysteryRose2027 = BOOK_CATALOG.find((b) => b.id === 'mystery-rose-2027');
  const mysteryRose2013 = BOOK_CATALOG.find((b) => b.id === 'mystery-rose-2013');
  const darkMysteryDemon = BOOK_CATALOG.find((b) => b.id === 'dark-mystery-demon');

  return (
    <>
      <section className="bg-light-canvas pt-28 sm:pt-32 pb-6 text-center px-4">
        <p className="font-dramatic text-artist-crimson text-xs tracking-[0.3em] uppercase mb-3">Publications</p>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-deep-oxblood">Buy the Books</h1>
        <p className="text-gallery-black/75 mt-4 max-w-2xl mx-auto text-sm sm:text-base">
          Mystical novels, illustrated poetry, and 2027 editions — covers displayed as in the author&apos;s layout.
        </p>
      </section>

      <section className="py-10 sm:py-14 bg-light-canvas border-b border-warm-gray/20 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 items-end">
            {BOOK_CATALOG.map((book, index) => (
              <Link
                key={book.id}
                href={`#${book.id}`}
                className={`group block ${index % 2 === 1 ? 'md:translate-y-6' : ''} ${index === 2 ? 'md:-translate-y-2' : ''}`}
              >
                <BookCoverImage
                  src={book.coverImage}
                  alt={book.coverAlt}
                  priority={index < 2}
                  label={book.edition}
                  className="md:max-w-[240px]"
                />
                <p className="mt-4 text-center text-deep-oxblood text-sm font-display leading-snug group-hover:text-artist-crimson transition-colors px-1">
                  {book.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div id={spellbound?.id}>
        <ProseSection
          tagline={DARK_MYSTERY_SPELLBOUND.tagline}
          title={DARK_MYSTERY_SPELLBOUND.title}
          subtitle={DARK_MYSTERY_SPELLBOUND.edition}
          paragraphs={DARK_MYSTERY_SPELLBOUND.paragraphs}
          details={DARK_MYSTERY_SPELLBOUND.details}
          coverImage={spellbound?.coverImage}
          coverAlt={spellbound?.coverAlt}
          pdfUrl={spellbound?.pdfUrl}
          actions={
            <Link
              href={`/contact?subject=${encodeURIComponent('Dark Mystery 2027 Edition: Spellbound')}`}
              className="inline-flex items-center justify-center border border-warm-cream/50 text-deep-oxblood px-6 py-3 text-[11px] tracking-[0.16em] uppercase hover:bg-warm-cream/10 transition-colors"
            >
              Enquire About 2027 Edition
            </Link>
          }
        />
      </div>

      <div id={mysteryRose2027?.id}>
        <ProseSection
          title={RETURN_OF_THE_PRINCE.title}
          subtitle={`${mysteryRose2027?.edition} · ${mysteryRose2027?.subtitle}`}
          paragraphs={[
            ...RETURN_OF_THE_PRINCE.points,
            RETURN_OF_THE_PRINCE.note,
          ]}
          coverImage={mysteryRose2027?.coverImage}
          coverAlt={mysteryRose2027?.coverAlt}
          additionalCovers={mysteryRose2027?.additionalCovers}
          pdfUrl={mysteryRose2027?.pdfUrl}
          className="bg-warm-cream/50 border-y border-warm-gray/10"
          actions={
            <>
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
                className="inline-flex items-center justify-center border border-warm-cream/50 text-deep-oxblood px-6 py-3 text-[11px] tracking-[0.16em] uppercase hover:bg-warm-cream/10 transition-colors"
              >
                Enquire to Buy
              </Link>
            </>
          }
        />
      </div>

      <div id={mysteryRose2013?.id}>
        <ProseSection
          title={mysteryRose2013?.title || 'The Mystery of the Rose'}
          subtitle={`${mysteryRose2013?.edition} · ${mysteryRose2013?.tagline}`}
          paragraphs={[
            'Critically acclaimed debut novel longlisted for the 2013 Crossword Book Award. A mesmerizing tale of romance set in India under British rule — the love story of Pearly Ruby Princessa woven with the fate of a nation.',
          ]}
          coverImage={mysteryRose2013?.coverImage}
          coverAlt={mysteryRose2013?.coverAlt}
          pdfUrl={mysteryRose2013?.pdfUrl}
          actions={
            <Link
              href="/contact?subject=The%20Mystery%20of%20the%20Rose%202013%20Edition"
              className="inline-flex items-center justify-center border border-warm-cream/50 text-deep-oxblood px-6 py-3 text-[11px] tracking-[0.16em] uppercase hover:bg-warm-cream/10 transition-colors"
            >
              Enquire to Buy
            </Link>
          }
        />
      </div>

      <div id={darkMysteryDemon?.id}>
        <ProseSection
          tagline={darkMysteryDemon?.tagline}
          title={darkMysteryDemon?.title || 'Dark Mystery'}
          subtitle={darkMysteryDemon?.edition}
          paragraphs={[
            'A mystical adventure in poetry featuring full-color illustrations. Takes readers into the realm of angels, demons, and ghosts — a deeply spiritual journey from darkness into light.',
            'My ship sank near the deep, dark coast. I arose from the sea in the form of ghost. Ever since that moment I haunt this place. The haunting brings me immense solace.',
          ]}
          coverImage={darkMysteryDemon?.coverImage}
          coverAlt={darkMysteryDemon?.coverAlt}
          pdfUrl={darkMysteryDemon?.pdfUrl}
          className="bg-warm-cream/50 border-y border-warm-gray/10"
          actions={
            <Link
              href="/contact?subject=Dark%20Mystery%20eBook"
              className="inline-flex items-center justify-center border border-warm-cream/50 text-deep-oxblood px-6 py-3 text-[11px] tracking-[0.16em] uppercase hover:bg-warm-cream/10 transition-colors"
            >
              Enquire to Buy
            </Link>
          }
        />
      </div>

      <section className="py-16 sm:py-24 bg-light-canvas">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-deep-oxblood mb-8 text-center italic">
            {MYSTERIES_OF_MY_LIFE.title}
          </h2>
          <div className="prose-content text-base sm:text-lg space-y-4">
            {MYSTERIES_OF_MY_LIFE.paragraphs.map((p) => (
              <p key={p.slice(0, 50)}>{p}</p>
            ))}
          </div>
          <div className="mt-10 p-6 sm:p-8 border border-warm-gray/10 bg-warm-cream/50/50 text-center">
            <p className="text-aged-gold text-xs tracking-[0.2em] uppercase mb-3">
              {MYSTERIES_OF_MY_LIFE.urduTranslation.label}
            </p>
            <p className="font-display text-lg sm:text-xl text-deep-oxblood italic leading-relaxed mb-6">
              {MYSTERIES_OF_MY_LIFE.urduTranslation.text}
            </p>
            <p className="text-gallery-black/75 font-display text-lg">{MYSTERIES_OF_MY_LIFE.signature.name}</p>
            <p className="text-warm-gray text-sm mt-1">{MYSTERIES_OF_MY_LIFE.signature.date}</p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-warm-cream/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl sm:text-3xl text-deep-oxblood mb-10 text-center">All Publications</h2>
          <div className="space-y-6">
            {BOOK_LISTINGS.map((book) => {
              const catalogMatch = BOOK_CATALOG.find(
                (entry) =>
                  entry.title.includes(book.title.split(':')[0]) ||
                  book.title.includes(entry.title.split(':')[0])
              );

              return (
                <article
                  key={book.title}
                  className="border border-warm-gray/10 bg-light-canvas p-6 sm:p-8"
                >
                  <div className="grid gap-6 sm:grid-cols-[140px_1fr] items-start">
                    {catalogMatch && (
                      <div className="relative aspect-[2/3] w-[140px] overflow-hidden border border-warm-gray/20 bg-warm-cream/50">
                        <Image
                          src={catalogMatch.coverImage}
                          alt={catalogMatch.coverAlt}
                          fill
                          sizes="140px"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                        <div>
                          {book.subtitle && (
                            <p className="text-artist-crimson text-[10px] tracking-[0.2em] uppercase mb-1">{book.subtitle}</p>
                          )}
                          <h3 className="font-display text-xl sm:text-2xl text-deep-oxblood">{book.title}</h3>
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
                      <p className="text-gallery-black/75 text-sm leading-relaxed mb-4">{book.description}</p>
                      <div className="flex flex-wrap gap-3">
                        {book.buyUrl && (
                          <a
                            href={book.buyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-aged-gold text-xs tracking-widest uppercase hover:text-deep-oxblood transition-colors"
                          >
                            Visit Website →
                          </a>
                        )}
                        <Link
                          href={`/contact?subject=${encodeURIComponent(book.contactSubject || book.title)}`}
                          className="text-artist-crimson text-xs tracking-widest uppercase hover:text-deep-oxblood transition-colors"
                        >
                          Enquire →
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="multicultural-resource-books" className="py-16 sm:py-24 bg-light-canvas border-t border-warm-gray/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl sm:text-3xl text-deep-oxblood mb-4 text-center uppercase tracking-wide">
            {MULTICULTURAL_RESOURCE_BOOKS.title}
          </h2>
          <p className="text-gallery-black/75 text-center mb-8 text-sm">
            A series of multicultural education resource books and poetry by Sukh D. H. Khokhar.
          </p>
          <ul className="space-y-3 mb-8">
            {MULTICULTURAL_RESOURCE_BOOKS.works.map((work) => (
              <li
                key={work.title}
                className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 py-4 px-5 border border-warm-gray/10 bg-warm-cream/50/40 text-gallery-black/75"
              >
                <span className="text-deep-oxblood font-display text-lg">{work.title}</span>
                <span className="text-aged-gold text-sm">({work.year})</span>
              </li>
            ))}
          </ul>
          <div className="text-center">
            <a
              href={MULTICULTURAL_RESOURCE_BOOKS.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-deep-oxblood hover:bg-artist-crimson text-warm-cream px-6 py-3 text-[11px] tracking-[0.16em] uppercase transition-colors border border-deep-oxblood"
            >
              View / Download PDF
            </a>
          </div>
        </div>
      </section>

      <section id="crossword-book-award" className="py-16 sm:py-24 bg-warm-cream/50 border-t border-warm-gray/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl sm:text-3xl text-deep-oxblood mb-3 text-center">
            {CROSSWORD_BOOK_AWARD_2013.title}
          </h2>
          <p className="text-center text-warm-gray text-sm mb-10">
            {CROSSWORD_BOOK_AWARD_2013.source} · {CROSSWORD_BOOK_AWARD_2013.date}
          </p>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,320px)_1fr] items-start">
            <div className="relative aspect-[4/3] w-full max-w-sm mx-auto lg:mx-0 overflow-hidden border border-warm-gray/20">
              <Image
                src={CROSSWORD_BOOK_AWARD_2013.imageUrl}
                alt={CROSSWORD_BOOK_AWARD_2013.imageAlt}
                fill
                sizes="(max-width: 1024px) 80vw, 320px"
                className="object-cover"
              />
            </div>

            <div>
              <p className="text-gallery-black/75 leading-relaxed mb-6">{CROSSWORD_BOOK_AWARD_2013.intro}</p>

              <div className="p-5 sm:p-6 border border-artist-crimson/40 bg-light-canvas mb-6">
                <p className="text-artist-crimson text-[10px] tracking-[0.2em] uppercase mb-2">
                  {CROSSWORD_BOOK_AWARD_2013.highlight.category} · Featured Title
                </p>
                <h3 className="font-display text-xl sm:text-2xl text-deep-oxblood mb-2">
                  {CROSSWORD_BOOK_AWARD_2013.highlight.title}
                </h3>
                <p className="text-gallery-black/75 text-sm">
                  by {CROSSWORD_BOOK_AWARD_2013.highlight.author}, {CROSSWORD_BOOK_AWARD_2013.highlight.publisher}
                </p>
              </div>

              <ul className="space-y-2 text-sm text-gallery-black/75 mb-8 max-h-64 overflow-y-auto pr-2">
                {CROSSWORD_BOOK_AWARD_2013.excerpt.map((entry) => {
                  const isHighlight = entry.includes('Sukh Khokhar');
                  return (
                    <li
                      key={entry}
                      className={`py-2 px-3 border-l-2 ${
                        isHighlight
                          ? 'border-artist-crimson bg-artist-crimson/10 text-deep-oxblood'
                          : 'border-warm-gray/20'
                      }`}
                    >
                      {entry}
                    </li>
                  );
                })}
              </ul>

              <a
                href={CROSSWORD_BOOK_AWARD_2013.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-deep-oxblood hover:bg-artist-crimson text-warm-cream px-6 py-3 text-[11px] tracking-[0.16em] uppercase transition-colors border border-deep-oxblood"
              >
                View / Download PDF
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-light-canvas text-center border-t border-warm-gray/20">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-display text-2xl sm:text-3xl text-deep-oxblood mb-4">Where to Buy</h2>
          <p className="text-gallery-black/75 mb-8 leading-relaxed">
            Books are available through Amazon, Chapters-Indigo, Kindle, Kobo, and many retail stores worldwide.
          </p>
          <div className="space-y-3 text-gallery-black/80 mb-10">
            <p>
              <span className="text-aged-gold">Email: </span>
              <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-deep-oxblood transition-colors">
                {CONTACT_EMAIL}
              </a>
            </p>
            <p>
              <span className="text-aged-gold">Art Gallery: </span>
              <a href={CONTACT_LINKS.artPal} target="_blank" rel="noopener noreferrer" className="hover:text-deep-oxblood transition-colors">
                {CONTACT_LINKS.artPalLabel}
              </a>
            </p>
            <p>
              <span className="text-aged-gold">Author Website: </span>
              <a href={CONTACT_LINKS.mysteryOfTheRose} target="_blank" rel="noopener noreferrer" className="hover:text-deep-oxblood transition-colors">
                {CONTACT_LINKS.mysteryOfTheRoseLabel}
              </a>
            </p>
          </div>
          <Button href="/contact" size="lg">
            Contact Us
          </Button>
        </div>
      </section>

      <RoseThemeClose />
    </>
  );
}
