import { Metadata } from 'next';
import { MediaCoverageFigure } from '@/components/public/MediaCoverageFigure';
import { SectionPageShell } from '@/components/public/SectionPageShell';
import { MEDIA_COVERAGE_INSERTS } from '@/lib/media-coverage';

export const metadata: Metadata = {
  title: 'Media Coverage',
  description: 'Press and media coverage featuring Sukh D. H. Khokhar.',
};

export default function MediaCoveragePage() {
  const inserts = MEDIA_COVERAGE_INSERTS;

  return (
    <SectionPageShell>
      <header className="text-center mb-6">
        <p className="text-[10px] tracking-[0.25em] uppercase text-artist-crimson font-bold mb-2">
          In the Press
        </p>
        <h1 className="font-display text-xl sm:text-2xl text-artist-crimson uppercase font-bold">
          Media Coverage
        </h1>
      </header>

      {inserts.length === 0 ? (
        <p className="text-center text-[15px] font-semibold text-gallery-black/75 max-w-md mx-auto">
          Media coverage features will appear here shortly.
        </p>
      ) : (
        <div className="space-y-6 max-w-2xl mx-auto">
          {inserts.map((item) => (
            <MediaCoverageFigure key={item.id} item={item} />
          ))}
        </div>
      )}
    </SectionPageShell>
  );
}
