'use client';

import { useRef, useEffect, Children, isValidElement, cloneElement } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface HorizontalScrollProps {
  children: React.ReactNode;
  className?: string;
}

export function HorizontalScrollSection({ children, className }: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || window.innerWidth < 768) return;

    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const ctx = gsap.context(() => {
      const scrollWidth = track.scrollWidth - container.offsetWidth;
      if (scrollWidth <= 0) return;

      gsap.to(track, {
        x: -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${scrollWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={cn('w-full max-w-full overflow-x-auto overflow-y-hidden scrollbar-hide md:overflow-hidden snap-x snap-mandatory', className)}>
      <div ref={trackRef} className="flex gap-4 sm:gap-6 md:gap-8 w-max px-4 pb-1">
        {children}
      </div>
    </div>
  );
}

export function AutoScrollMarquee({
  children,
  className,
  duration = 45,
}: {
  children: React.ReactNode;
  className?: string;
  duration?: number;
}) {
  return (
    <div className={cn('marquee-shell', className)}>
      <div
        className="marquee-track flex w-max"
        style={{ '--marquee-duration': `${duration}s` } as React.CSSProperties}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden>
          {Children.map(children, (child, index) =>
            isValidElement(child) ? cloneElement(child, { key: `${String(child.key)}-dup` }) : child
          )}
        </div>
      </div>
    </div>
  );
}

export function PinnedReveal({
  children,
  className,
  pinHeight = '200vh',
}: {
  children: React.ReactNode;
  className?: string;
  pinHeight?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from(el.querySelector('.pinned-content'), {
        scale: 0.85,
        opacity: 0.3,
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={className} style={{ minHeight: pinHeight }}>
      <div className="sticky top-0 h-screen flex items-center justify-center pinned-content">
        {children}
      </div>
    </div>
  );
}

export function ImageMaskReveal({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const ref = useRef(null);

  return (
    <motion.div
      ref={ref}
      className={cn('relative overflow-hidden', className)}
      initial={{ clipPath: 'inset(100% 0 0 0)' }}
      whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        initial={{ scale: 1.3 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  );
}

export function BrushstrokeUnderline({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn('relative inline-block', className)}>
      {children}
      <motion.span
        className="absolute -bottom-1 left-0 h-[3px] bg-artist-crimson origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{ width: '100%' }}
      />
    </span>
  );
}
