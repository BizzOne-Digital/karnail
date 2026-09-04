'use client';

import Image from 'next/image';
import { cn, getImageUrl } from '@/lib/utils';
import { SplitText, RevealOnScroll, PaintStrokeReveal } from '@/components/animations/MotionPrimitives';
import { ParallaxLayer } from '@/components/animations/MotionPrimitives';

interface SectionHeroProps {
  eyebrow?: string;
  heading: string;
  description?: string;
  backgroundImage?: string;
  bannerVerse?: string[];
  className?: string;
  children?: React.ReactNode;
  variant?: 'default' | 'dramatic' | 'cinematic';
}

export function SectionHero({
  eyebrow,
  heading,
  description,
  backgroundImage,
  bannerVerse,
  className,
  children,
}: SectionHeroProps) {
  return (
    <section className={cn('relative w-full max-w-full min-h-[60vh] sm:min-h-[70vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden', className)}>
      <div className="absolute inset-0 bg-gallery-black" />
      {backgroundImage ? (
        <ParallaxLayer speed={0.2} className="absolute inset-0 overflow-hidden">
          <Image src={getImageUrl(backgroundImage)} alt="" fill className="object-cover opacity-40 md:scale-110" priority sizes="100vw" />
        </ParallaxLayer>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-soft-black via-gallery-black to-deep-oxblood/30" />
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-gallery-black/70 via-transparent to-gallery-black" />
      <div className="absolute inset-0 spotlight" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#090807_75%)]" />

      <div className="absolute top-1/4 -left-20 w-72 h-72 md:w-96 md:h-96 bg-artist-crimson/10 rounded-full blur-3xl animate-pulse hidden sm:block" />
      <div className="absolute bottom-1/4 -right-20 w-60 h-60 md:w-80 md:h-80 bg-aged-gold/10 rounded-full blur-3xl hidden sm:block" />

      <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-aged-gold/20 to-transparent hidden lg:block" />
      <div className="absolute right-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-aged-gold/20 to-transparent hidden lg:block" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 py-28 sm:py-32 md:py-44 text-center">
        {eyebrow && (
          <RevealOnScroll direction="down" delay={0.1}>
            <p className="font-dramatic text-[10px] sm:text-xs md:text-sm text-aged-gold tracking-[0.2em] sm:tracking-[0.35em] uppercase mb-4 sm:mb-6 flex flex-wrap items-center justify-center gap-2 sm:gap-4">
              <span className="hidden sm:block w-8 h-px bg-aged-gold/50" />
              <span className="break-words">{eyebrow}</span>
              <span className="hidden sm:block w-8 h-px bg-aged-gold/50" />
            </p>
          </RevealOnScroll>
        )}

        <SplitText
          text={heading}
          as="h1"
          className="font-display text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-warm-cream leading-[1.02] sm:leading-[0.95] mb-6 sm:mb-8 px-1"
          delay={0.2}
        />

        <PaintStrokeReveal className="max-w-md mx-auto" />

        {description && (
          <RevealOnScroll delay={0.5}>
            <p className="text-muted-beige text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light px-1">
              {description}
            </p>
          </RevealOnScroll>
        )}

        {children && (
          <RevealOnScroll delay={0.7} className="mt-8 sm:mt-10 flex flex-wrap gap-3 sm:gap-4 justify-center px-1">
            {children}
          </RevealOnScroll>
        )}
      </div>

      {bannerVerse && bannerVerse.length > 0 && (
        <div className="absolute bottom-20 sm:bottom-24 left-0 right-0 z-10 px-4 sm:px-6 pointer-events-none">
          <div className="max-w-2xl mx-auto text-center space-y-1 sm:space-y-1.5">
            {bannerVerse.map((line, index) => (
              <p
                key={line}
                className="hero-verse-line font-display text-sm sm:text-base md:text-lg text-warm-cream/90 italic leading-relaxed"
                style={{ animationDelay: `${index * 0.75}s` }}
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      )}

      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-warm-gray/50 hidden sm:flex">
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-aged-gold/50 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
