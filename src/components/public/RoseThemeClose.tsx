import Image from 'next/image';
import { cn } from '@/lib/utils';

const ROSE_IMAGE = '/images/theme-rose-stem.png';

/** Decorative rose — small centered motif (client mockup SS2) */
export function RoseThemeClose({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'w-full flex justify-center items-center pt-2 pb-1 bg-transparent pointer-events-none',
        className
      )}
      aria-hidden
    >
      <Image
        src={ROSE_IMAGE}
        alt=""
        width={240}
        height={40}
        className="block mx-auto h-auto w-auto max-w-[74px] sm:max-w-[86px] max-h-[23px] sm:max-h-[27px] object-contain object-center"
        unoptimized
      />
    </div>
  );
}
