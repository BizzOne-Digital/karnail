'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  mode?: 'words' | 'chars';
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export function SplitText({ text, className, delay = 0, mode = 'words', as: Tag = 'h2' }: SplitTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const parts = mode === 'words' ? text.split(' ') : text.split('');

  return (
    <Tag ref={ref} className={cn('overflow-hidden break-words [overflow-wrap:anywhere]', className)} aria-label={text}>
      <span className="sr-only">{text}</span>
      {parts.map((part, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0, rotateX: 40 }}
            animate={isInView ? { y: 0, opacity: 1, rotateX: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: delay + i * (mode === 'words' ? 0.06 : 0.03),
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {part}
            {mode === 'words' && i < parts.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
}

export function RevealOnScroll({
  children,
  className,
  direction = 'up',
  delay = 0,
  duration = 0.8,
}: RevealOnScrollProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const offsets = {
    up: { y: 24, x: 0 },
    down: { y: -24, x: 0 },
    left: { y: 0, x: 24 },
    right: { y: 0, x: -24 },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...offsets[direction] }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerChildren({
  children,
  className,
  stagger = 0.1,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function ParallaxLayer({
  children,
  speed = 0.3,
  className,
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || !ref.current) return;

    const el = ref.current;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      el.style.transform = `translateY(${center * speed * -0.1}px)`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function PaintStrokeReveal({ className }: { className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className={cn('relative h-1 my-8', className)}>
      <motion.div
        className="absolute inset-y-0 left-0 bg-gradient-to-r from-transparent via-artist-crimson to-transparent h-full"
        initial={{ width: 0, opacity: 0 }}
        animate={isInView ? { width: '100%', opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

export function FloatingElement({
  children,
  className,
  amplitude = 12,
  duration = 4,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      className={className}
      style={style}
      animate={{ y: [-amplitude / 2, amplitude / 2, -amplitude / 2] }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}
