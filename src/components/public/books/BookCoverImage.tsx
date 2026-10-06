import Image from 'next/image';
import { cn } from '@/lib/utils';

function coverInsetPercent(zoom: number) {
  return `${((zoom - 1) / 2) * 100}%`;
}

interface BookCoverImageProps {
  src: string;
  alt: string;
  zoom?: number;
  /** cover = crop to fill; contain = full cover visible in frame */
  fit?: 'cover' | 'contain';
  /** Equal inset on all sides when fit is contain (e.g. "8%"). */
  containInset?: string;
  sizes?: string;
  frameClassName?: string;
  /** Frame fill behind letterboxing (default black). */
  frameBgClassName?: string;
}

export function BookCoverImage({
  src,
  alt,
  zoom = 1.15,
  fit = 'cover',
  containInset,
  sizes = '(max-width: 640px) 40vw, 200px',
  frameClassName,
  frameBgClassName = 'bg-gallery-black',
}: BookCoverImageProps) {
  const inset = coverInsetPercent(zoom);

  return (
    <div
      className={cn(
        'relative w-full aspect-[2/3] overflow-hidden',
        frameBgClassName,
        frameClassName
      )}
    >
      {fit === 'contain' ? (
        containInset ? (
          <div
            className="absolute"
            style={{
              top: containInset,
              right: containInset,
              bottom: containInset,
              left: containInset,
            }}
          >
            <Image src={src} alt={alt} fill sizes={sizes} className="object-contain object-center" />
          </div>
        ) : (
          <Image src={src} alt={alt} fill sizes={sizes} className="object-contain object-center" />
        )
      ) : (
        <div
          className="absolute"
          style={{ top: `-${inset}`, right: `-${inset}`, bottom: `-${inset}`, left: `-${inset}` }}
        >
          <Image src={src} alt={alt} fill sizes={sizes} className="object-cover object-center" />
        </div>
      )}
    </div>
  );
}
