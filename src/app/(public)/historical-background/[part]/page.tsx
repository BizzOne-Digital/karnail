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
        <div className="max-w-md mx-auto text-center px-1">
          <header className="mb-3">
            <p className="text-[10px] tracking-[0.25em] uppercase text-artist-crimson font-bold mb-2">
              Historical Family Background {part}
            </p>
            <h1 className="font-display text-lg sm:text-xl text-artist-crimson uppercase font-bold">
              {insert.heading}
            </h1>
          </header>

          {insert.portraitStrip && (
            <div className="mb-3 w-full border border-warm-gray/25 overflow-hidden">
              <Image
                src={insert.portraitStrip.image}
                alt={insert.portraitStrip.alt}
                width={960}
                height={540}
                className="w-full h-auto block"
                sizes="(max-width: 448px) 100vw, 448px"
              />
            </div>
          )}

          {insert.intro && (
            <p className="leading-relaxed mb-3 font-semibold text-[15px] px-1">{insert.intro}</p>
          )}

          {insert.portrait && (
            <div className="mb-3 w-full border border-warm-gray/25 overflow-hidden">
              <Image
                src={insert.portrait.image}
                alt={insert.portrait.alt}
                width={600}
                height={800}
                className="w-full h-auto block"
                sizes="(max-width: 448px) 100vw, 448px"
              />
            </div>
          )}

          <div className="space-y-3 font-semibold leading-relaxed text-[15px] text-center px-1">
            {insert.paragraphs.map((p) => (
              <p key={p.slice(0, 48)}>{p}</p>
            ))}
          </div>
        </div>
      </SectionPageShell>
    </Suspense>
  );
}
