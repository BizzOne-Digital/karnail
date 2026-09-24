import Image from 'next/image';
import { cn } from '@/lib/utils';

const ROSE_IMAGE = '/images/theme-rose-stem.jpg';

/** Decorative rose — placed directly under page content */
export function RoseThemeClose({ className }: { className?: string }) {
  return (
    <div
      className={cn('w-full flex justify-center pt-1 pb-0 bg-transparent', className)}
      aria-hidden
    >
      <Image
        src={ROSE_IMAGE}
        alt=""
        width={720}
        height={120}
        className="w-full max-w-[min(100%,520px)] h-auto object-contain"
        unoptimized
      />
    </div>
  );
}
