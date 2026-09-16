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
    <section
      className={cn(
        'relative w-full max-w-full min-h-[50vh] sm:min-h-[60vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden bg-light-canvas',
        className
      )}
    >
      {backgroundImage ? (
        <ParallaxLayer speed={0.15} className="absolute inset-0 overflow-hidden">
          <Image
            src={getImageUrl(backgroundImage)}
            alt=""
            fill
            className="object-cover brightness-[1.06] contrast-[1.02] saturate-[1.03]"
            priority
            sizes="100vw"
          />
        </ParallaxLayer>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-warm-cream via-light-canvas to-muted-beige/30" />
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-light-canvas/30 via-white/5 to-light-canvas/70 pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 py-28 sm:py-32 md:py-40 text-center">
        {eyebrow && (
          <RevealOnScroll direction="down" delay={0.1}>
            <p className="font-dramatic text-[10px] sm:text-xs md:text-sm text-artist-crimson tracking-[0.2em] sm:tracking-[0.35em] uppercase mb-4 sm:mb-6 flex flex-wrap items-center justify-center gap-2 sm:gap-4">
              <span className="hidden sm:block w-8 h-px bg-aged-gold/50" />
              <span className="break-words">{eyebrow}</span>
              <span className="hidden sm:block w-8 h-px bg-aged-gold/50" />
            </p>
          </RevealOnScroll>
        )}

        <SplitText
          text={heading}
          as="h1"
          className="font-display text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-deep-oxblood leading-[1.02] sm:leading-[0.95] mb-6 sm:mb-8 px-1"
          delay={0.2}
        />

        <PaintStrokeReveal className="max-w-md mx-auto" />

        {description && (
          <RevealOnScroll delay={0.5}>
            <p className="text-gallery-black/80 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light px-1">
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
        <div className="absolute bottom-16 sm:bottom-20 left-0 right-0 z-10 px-4 sm:px-6 pointer-events-none">
          <div className="max-w-2xl mx-auto text-center space-y-1 sm:space-y-1.5">
            {bannerVerse.map((line, index) => (
              <p
                key={line}
                className="hero-verse-line font-display text-sm sm:text-base md:text-lg text-deep-oxblood italic leading-relaxed drop-shadow-[0_1px_1px_rgba(255,248,234,0.9)]"
                style={{ animationDelay: `${index * 0.75}s` }}
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
