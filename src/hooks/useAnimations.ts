'use client';

import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function useSmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isMobile = window.innerWidth < 1024;
    if (reducedMotion || isTouch || isMobile) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    const resize = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', resize);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(document.documentElement);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', resize);
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return lenisRef;
}

export function refreshSmoothScroll(lenisRef: React.RefObject<Lenis | null>) {
  if (typeof window === 'undefined') return;
  lenisRef.current?.resize();
  ScrollTrigger.refresh();
}

export function useScrollAnimation(
  ref: React.RefObject<HTMLElement | null>,
  animation: gsap.TweenVars,
  triggerOptions?: ScrollTrigger.Vars
) {
  useEffect(() => {
    if (!ref.current) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        ...animation,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
          ...triggerOptions,
        },
      });
    });

    return () => ctx.revert();
  }, [ref, animation, triggerOptions]);
}
