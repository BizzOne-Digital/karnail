import Image from 'next/image';
import type { MediaCoverageInsert } from '@/lib/media-coverage';

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
          <details className="group">
            <summary
              className="flex min-h-[6.5rem] cursor-pointer list-none items-center justify-center bg-warm-cream px-4 py-5 text-center text-sm font-bold text-artist-crimson hover:bg-warm-cream/80 [&::-webkit-details-marker]:hidden"
            >
              Press clipping (PDF) — click to expand
            </summary>
            <div className="border-t border-warm-gray/25 bg-gallery-black/5">
              <object
                data={`${item.pdf}#view=FitH`}
                type="application/pdf"
                title={item.alt}
                className="block h-[min(70vh,36rem)] w-full"
              >
                <iframe
                  src={`${item.pdf}#view=FitH`}
                  title={item.alt}
                  className="block h-[min(70vh,36rem)] w-full border-0"
                />
              </object>
              <p className="border-t border-warm-gray/20 bg-warm-cream px-3 py-2 text-center">
                <a
                  href={item.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] font-bold text-artist-crimson underline underline-offset-2"
                >
                  Open full-size PDF in new tab
                </a>
              </p>
            </div>
          </details>
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
