'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getImageUrl } from '@/lib/utils';
import { resolveArtistPortrait } from '@/lib/brand';
import { ABOUT_AUTHOR_PARAGRAPHS } from '@/lib/about-content';
import type { PageSection } from '@/types';

const TABS = [
  { id: 'welcome', label: 'Welcome' },
  { id: 'artist', label: 'Meet the Artist' },
  { id: 'explore', label: 'Explore' },
] as const;

type TabId = (typeof TABS)[number]['id'];

interface HomeWelcomeTabsProps {
  hero: PageSection;
  meet?: PageSection | null;
}

export function HomeWelcomeTabs({ hero, meet }: HomeWelcomeTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>('welcome');
  const portrait = resolveArtistPortrait(meet?.mainImage);
  const shortBio =
    meet?.description ||
    'Sukh D. H. Khokhar is a mystery writer, mural artist, and visual storyteller whose work weaves together narrative intrigue and bold artistic expression.';
  const welcomeIntro = ABOUT_AUTHOR_PARAGRAPHS[0];

  return (
    <section className="bg-light-canvas text-gallery-black border-b border-warm-gray/20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-10">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 sm:px-6 py-2.5 text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.18em] uppercase transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-artist-crimson text-warm-cream border border-artist-crimson'
                  : 'text-deep-oxblood/80 border border-warm-gray/40 hover:border-aged-gold/60 hover:text-deep-oxblood bg-warm-cream/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'welcome' && (
          <div className="max-w-3xl mx-auto text-center sm:text-left">
            {hero.eyebrow && (
              <p className="font-body text-[10px] sm:text-xs text-artist-crimson tracking-[0.2em] uppercase mb-4">
                {hero.eyebrow}
              </p>
            )}
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-deep-oxblood mb-6 leading-tight">
              {hero.heading}
            </h2>
            <p className="text-gallery-black/85 text-base sm:text-lg leading-relaxed mb-4">{hero.description}</p>
            <p className="text-gallery-black/75 text-base sm:text-lg leading-relaxed">{welcomeIntro}</p>
            <div className="flex flex-wrap gap-3 justify-center sm:justify-start mt-8">
              <Link
                href={hero.buttonUrl || '/gallery'}
                className="inline-flex items-center justify-center bg-deep-oxblood hover:bg-artist-crimson text-warm-cream px-6 py-3 text-[11px] tracking-[0.16em] uppercase transition-colors"
              >
                {hero.buttonText || 'Explore the Collection'}
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center border border-deep-oxblood/40 text-deep-oxblood px-6 py-3 text-[11px] tracking-[0.16em] uppercase hover:bg-deep-oxblood/5 transition-colors"
              >
                About the Author
              </Link>
            </div>
          </div>
        )}

        {activeTab === 'artist' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-4xl mx-auto">
            <div className="relative aspect-[4/5] max-w-sm mx-auto w-full overflow-hidden border border-warm-gray/30 shadow-lg bg-warm-cream">
              <Image
                src={getImageUrl(portrait)}
                alt="Sukh D. H. Khokhar"
                fill
                sizes="(max-width: 768px) 80vw, 384px"
                className="object-cover object-top"
              />
            </div>
            <div>
              <p className="font-dramatic text-aged-gold text-xs tracking-[0.25em] uppercase mb-3">The Artist</p>
              <h2 className="font-display text-3xl sm:text-4xl text-deep-oxblood mb-5">
                {meet?.heading || 'Meet the Artist'}
              </h2>
              <p className="text-gallery-black/80 text-base sm:text-lg leading-relaxed mb-6">{shortBio}</p>
              <Link
                href={meet?.buttonUrl || '/about'}
                className="inline-flex items-center justify-center bg-deep-oxblood hover:bg-artist-crimson text-warm-cream px-6 py-3 text-[11px] tracking-[0.16em] uppercase transition-colors"
              >
                {meet?.buttonText || 'Discover the Artist'}
              </Link>
            </div>
          </div>
        )}

        {activeTab === 'explore' && (
          <div className="max-w-2xl mx-auto grid gap-4 sm:grid-cols-3 text-center">
            {[
              { href: '/gallery', label: 'Gallery', desc: 'View the art collection' },
              { href: '/books', label: 'Books', desc: 'Novels & poetry' },
              { href: '/contact', label: 'Contact', desc: 'Enquiries & commissions' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block p-6 border border-warm-gray/30 bg-warm-cream/60 hover:border-artist-crimson/40 hover:shadow-md transition-all"
              >
                <span className="font-display text-xl text-deep-oxblood block mb-2">{item.label}</span>
                <span className="text-sm text-gallery-black/70">{item.desc}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
