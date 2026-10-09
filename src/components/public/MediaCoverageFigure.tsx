import Image from 'next/image';
import type { MediaCoverageInsert } from '@/lib/media-coverage';

/** Slight zoom on embedded PDFs to hide scanner/page margins in the viewer. */
const PDF_VIEWER_CROP_SCALE = 1.08;

export function MediaCoverageFigure({ item }: { item: MediaCoverageInsert }) {
  const imgW = item.imageWidth ?? 1200;
  const imgH = item.imageHeight ?? 1600;
  const imgClass = item.nativeWidth
    ? 'w-auto max-w-full h-auto block mx-auto'
    : 'w-full h-auto block';

  return (
    <figure id={item.id} className="w-full scroll-mt-4">
      <div className="border border-warm-gray/30 bg-white overflow-hidden shadow-sm">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.alt}
            width={imgW}
            height={imgH}
            className={imgClass}
            unoptimized
          />
        ) : item.pdf ? (
          <div className="bg-white overflow-hidden min-h-[min(72vh,42rem)]">
            <object
              data={item.pdf}
              type="application/pdf"
              className="block min-h-[min(72vh,42rem)] origin-top-left"
              style={{
                width: `${PDF_VIEWER_CROP_SCALE * 100}%`,
                height: `${PDF_VIEWER_CROP_SCALE * 100}%`,
                marginLeft: `${-((PDF_VIEWER_CROP_SCALE - 1) / 2) * 100}%`,
                marginTop: `${-((PDF_VIEWER_CROP_SCALE - 1) / 2) * 100}%`,
              }}
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
