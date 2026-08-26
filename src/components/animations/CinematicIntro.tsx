'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CinematicIntroProps {
  onComplete: () => void;
}

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const [phase, setPhase] = useState(0);
  const [skipped, setSkipped] = useState(false);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.body.style.overflow = 'hidden';

    if (reducedMotion.current) {
      const timer = setTimeout(onComplete, 500);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
      };
    }

    const phases = [600, 800, 1000, 1200, 1000, 800, 600];
    let currentPhase = 0;
    let elapsed = 0;

    const interval = setInterval(() => {
      elapsed += 100;
      if (elapsed >= phases[currentPhase]) {
        currentPhase++;
        setPhase(currentPhase);
        elapsed = 0;
        if (currentPhase >= phases.length) {
          clearInterval(interval);
          document.body.style.overflow = '';
          onComplete();
        }
      }
    }, 100);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  const handleSkip = () => {
    setSkipped(true);
    document.body.style.overflow = '';
    onComplete();
  };

  if (skipped) return null;

  if (reducedMotion.current) {
    return (
      <div className="fixed inset-0 z-[10000] bg-gallery-black flex items-center justify-center">
        <p className="font-display text-2xl text-warm-cream">Sukh D. H. Khokhar</p>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[10000] bg-gallery-black flex flex-col items-center justify-center overflow-hidden"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Brushstroke */}
        <motion.div
          className="absolute top-1/2 left-0 h-[2px] bg-artist-crimson"
          initial={{ width: 0 }}
          animate={{ width: phase >= 1 ? '100%' : '0%' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        />

        {/* Ink spread */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 2 ? 0.15 : 0 }}
          transition={{ duration: 0.8 }}
          style={{
            background: 'radial-gradient(ellipse at center, #9E2531 0%, #681923 30%, transparent 70%)',
          }}
        />

        {/* Spotlight */}
        <motion.div
          className="absolute inset-0 spotlight"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 3 ? 1 : 0 }}
          transition={{ duration: 1 }}
        />

        {/* Artist name */}
        <motion.h1
          className="font-display text-4xl md:text-6xl lg:text-7xl text-warm-cream text-center z-10 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: phase >= 3 ? 1 : 0, y: phase >= 3 ? 0 : 20 }}
          transition={{ duration: 0.8 }}
        >
          Sukh D. H. Khokhar
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="font-dramatic text-sm md:text-base text-muted-beige tracking-[0.3em] uppercase mt-4 z-10 text-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 4 ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Mystery Writer &bull; Mural Artist &bull; Visual Storyteller
        </motion.p>

        {/* Headline */}
        <motion.p
          className="font-display text-lg md:text-2xl text-aged-gold mt-6 z-10 text-center px-4 max-w-2xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: phase >= 5 ? 1 : 0, y: phase >= 5 ? 0 : 10 }}
          transition={{ duration: 0.6 }}
        >
          Captivating Art of Sukh D. H. Khokhar
        </motion.p>

        {/* Signature */}
        <motion.div
          className="font-accent text-3xl text-artist-crimson mt-8 z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: phase >= 6 ? 1 : 0, scale: phase >= 6 ? 1 : 0.8 }}
          transition={{ duration: 0.5 }}
        >
          Sukh Khokhar
        </motion.div>

        {/* Curtain reveal */}
        <motion.div
          className="absolute inset-0 bg-gallery-black z-20"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: phase >= 7 ? 0 : 1 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          style={{ transformOrigin: 'top' }}
        />

        {/* Skip button */}
        <button
          onClick={handleSkip}
          className="absolute bottom-8 right-8 z-30 text-warm-gray text-sm hover:text-warm-cream transition-colors border border-warm-gray/30 px-4 py-2 rounded"
        >
          Skip Intro
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
