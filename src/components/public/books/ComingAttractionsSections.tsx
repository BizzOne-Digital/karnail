import Image from 'next/image';
import Link from 'next/link';
import {
  COMING_ATTRACTIONS_2027,
  COMING_ATTRACTIONS_FISCAL_LABEL,
  PREVIOUS_PUBLICATIONS,
} from '@/lib/coming-attractions';

type AttractionItem = (typeof COMING_ATTRACTIONS_2027)[number] | (typeof PREVIOUS_PUBLICATIONS)[number];

/** Same cover frame for every book on this page */
const COVER_FRAME_CLASS =
  'relative w-full h-[400px] sm:h-[420px] border border-warm-gray/30 bg-gallery-black overflow-hidden shadow-sm hover:border-artist-crimson/50 transition-colors';

function coverInsetPercent(zoom: number) {
  return `${((zoom - 1) / 2) * 100}%`;
}

function AttractionBlock({ item }: { item: AttractionItem }) {
  const href = 'externalUrl' in item && item.externalUrl ? item.externalUrl : item.bookHref;
  const zoom = item.coverZoom ?? 1.1;
  const inset = coverInsetPercent(zoom);

  return (
    <div className="sm:flex sm:gap-6 sm:items-start">
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full max-w-[280px] mx-auto sm:mx-0 shrink-0"
      >
        <div className={COVER_FRAME_CLASS}>
          <div
            className="absolute"
            style={{ top: `-${inset}`, right: `-${inset}`, bottom: `-${inset}`, left: `-${inset}` }}
          >
            <Image
              src={item.coverImage}
              alt={item.coverAlt}
              fill
              sizes="(max-width: 640px) 88vw, 280px"
              className="object-cover object-center"
            />
          </div>
        </div>
      </Link>

      <div className="flex-1 min-w-0 mt-4 sm:mt-0 text-[15px] leading-relaxed text-justify font-semibold">
        {item.category && <p className="text-artist-crimson font-bold mb-1">{item.category}</p>}
        <p className="font-display text-artist-crimson font-bold uppercase leading-snug">{item.title}</p>
        {item.subtitle && <p className="font-display text-artist-crimson font-bold">{item.subtitle}</p>}
        <p className="text-gallery-black/90 mt-1">{item.edition}</p>
        {item.blurb && <p className="mt-3 text-gallery-black">{item.blurb}</p>}
        <p className="mt-3 text-center sm:text-left">
          <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-artist-crimson font-bold underline text-sm"
          >
            View details
          </Link>
        </p>
      </div>
    </div>
  );
}

export function ComingAttractionsSections() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="font-display text-base sm:text-lg text-artist-crimson font-bold text-center mb-1 leading-snug px-1">
          List of Coming Attractions By the Author
        </h2>
        <p className="text-center text-[15px] font-bold text-gallery-black mb-6">{COMING_ATTRACTIONS_FISCAL_LABEL}</p>

        <div className="space-y-8">
          {COMING_ATTRACTIONS_2027.map((item, index) => (
            <div key={item.id}>
              <p className="text-artist-crimson font-bold text-sm mb-3">{index + 1}.</p>
              <AttractionBlock item={item} />
            </div>
          ))}
        </div>
      </section>

      <hr className="border-warm-gray/35" />

      <section>
        <h2 className="font-display text-base sm:text-lg text-artist-crimson font-bold text-center mb-6">
          Previous Publications
        </h2>
        <div className="space-y-8">
          {PREVIOUS_PUBLICATIONS.map((item, index) => (
            <div key={item.id}>
              <p className="text-artist-crimson font-bold text-sm mb-3">{index + 3}.</p>
              <AttractionBlock item={item} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
