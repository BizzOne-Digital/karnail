import { cn } from '@/lib/utils';

/** Decorative rose closing motif — end of each client-facing page */
export function RoseThemeClose({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-10 sm:py-14 bg-light-canvas', className)} aria-hidden>
      <svg viewBox="0 0 64 96" className="w-11 h-16 sm:w-14 sm:h-20 text-artist-crimson" fill="currentColor">
        <ellipse cx="32" cy="28" rx="14" ry="16" opacity="0.95" />
        <ellipse cx="22" cy="32" rx="10" ry="12" opacity="0.85" transform="rotate(-25 22 32)" />
        <ellipse cx="42" cy="32" rx="10" ry="12" opacity="0.85" transform="rotate(25 42 32)" />
        <ellipse cx="32" cy="38" rx="8" ry="10" opacity="0.9" />
        <path d="M32 44 Q28 58 32 72 Q36 58 32 44Z" fill="#2d6b2d" />
        <path d="M32 52 L18 68 L32 58 L46 68 Z" fill="#3d7a3d" />
        <path d="M32 58 L12 78 L32 66 L52 78 Z" fill="#2d6b2d" opacity="0.9" />
      </svg>
    </div>
  );
}
