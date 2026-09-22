import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Suspense } from 'react';
import { FAMILY_BACKGROUND_INSERTS } from '@/lib/about-content';
import { SectionPageShell } from '@/components/public/SectionPageShell';

const PARTS: Record<string, number> = { '1': 0, '2': 1 };

export default async function HistoricalBackgroundPage({
  params,
}: {
  params: Promise<{ part: string }>;
}) {
  const { part } = await params;
  const index = PARTS[part];
  if (index === undefined) notFound();

  const insert = FAMILY_BACKGROUND_INSERTS[index];

  return (
    <Suspense fallback={null}>
      <SectionPageShell>
        <header className="text-center mb-6 sm:mb-8">
          <p className="text-[10px] tracking-[0.25em] uppercase text-artist-crimson font-semibold mb-2">
            Historical Family Background {part}
          </p>
          <h1 className="font-display text-2xl sm:text-3xl text-deep-oxblood uppercase tracking-wide font-semibold">
            {insert.heading}
          </h1>
        </header>

        {insert.portraitStrip && (
          <div className="mb-6 relative aspect-[16/9] sm:aspect-[2/1] border border-warm-gray/25 bg-warm-cream">
            <Image
              src={insert.portraitStrip.image}
              alt={insert.portraitStrip.alt}
              fill
              className="object-contain object-center p-2"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>
        )}

        {insert.intro && (
          <p className="text-gallery-black/90 leading-relaxed mb-6 font-medium">{insert.intro}</p>
        )}

        {insert.portrait && (
          <div className="mb-6 max-w-sm mx-auto relative aspect-[3/4] border border-warm-gray/25">
            <Image
              src={insert.portrait.image}
              alt={insert.portrait.alt}
              fill
              className="object-contain p-2"
              sizes="400px"
            />
          </div>
        )}

        <div className="space-y-4 text-gallery-black/90 font-medium leading-relaxed">
          {insert.paragraphs.map((p) => (
            <p key={p.slice(0, 48)}>{p}</p>
          ))}
        </div>
      </SectionPageShell>
    </Suspense>
  );
}
