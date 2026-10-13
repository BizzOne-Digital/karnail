import { cn } from '@/lib/utils';

/** Extra side margin while keeping copy centred (Artist Statement, Reviews, Excerpts, Blogs). */
export function CenteredTabContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'centered-tab-content mx-auto w-full max-w-[40rem] sm:max-w-[42rem] px-5 sm:px-7 md:px-9 lg:px-10',
        className
      )}
    >
      {children}
    </div>
  );
}
