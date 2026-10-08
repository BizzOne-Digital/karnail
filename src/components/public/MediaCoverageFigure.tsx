import Image from 'next/image';
import type { MediaCoverageInsert } from '@/lib/media-coverage';

export function MediaCoverageFigure({ item }: { item: MediaCoverageInsert }) {
  return (
    <figure className="w-full">
      <div className="border border-warm-gray/25 bg-warm-cream overflow-hidden shadow-sm">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.alt}
            width={1200}
            height={1600}
            className="w-full h-auto block"
            unoptimized
          />
        ) : item.pdf ? (
          <div className="bg-gallery-black/5">
            <object
              data={item.pdf}
              type="application/pdf"
              className="w-full block min-h-[min(72vh,42rem)]"
              aria-label={item.alt}
            >
              <p className="p-4 text-[15px] font-semibold text-gallery-black/80">
                <a
                  href={item.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-artist-crimson underline underline-offset-2"
                >
                  Open this press clipping (PDF)
                </a>
              </p>
            </object>
            <p className="px-3 py-2 text-center border-t border-warm-gray/20 bg-warm-cream">
              <a
                href={item.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] font-bold text-artist-crimson underline underline-offset-2"
              >
                Open full-size PDF
              </a>
            </p>
          </div>
        ) : null}
      </div>
      {item.caption && (
        <figcaption className="mt-3 text-[15px] leading-relaxed text-justify font-semibold text-gallery-black/90 px-0.5">
          {item.caption}
        </figcaption>
      )}
    </figure>
  );
}
