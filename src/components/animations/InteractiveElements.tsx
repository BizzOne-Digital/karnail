'use client';

import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export function Magnetic({ children, className, strength = 0.3 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      data-cursor
    >
      {children}
    </motion.div>
  );
}

interface TiltFrameProps {
  children: React.ReactNode;
  className?: string;
}

export function TiltFrame({ children, className }: TiltFrameProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg)');
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(window.matchMedia('(min-width: 1024px) and (pointer: fine)').matches);
  }, []);

  const handleMove = (e: React.MouseEvent) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform(`perspective(1000px) rotateX(${-y * 12}deg) rotateY(${x * 12}deg) scale3d(1.02,1.02,1.02)`);
  };

  const handleLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)');
  };

  return (
    <div
      ref={ref}
      className={cn('transition-transform duration-300 ease-out overflow-hidden', className)}
      style={enabled ? { transform } : undefined}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      data-cursor
    >
      {children}
    </div>
  );
}

export function GlowButton({
  children,
  className,
  onClick,
  href,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}) {
  const content = (
    <motion.span
      className={cn(
        'relative inline-flex items-center justify-center px-8 py-4 bg-artist-crimson text-warm-cream font-body tracking-widest text-sm uppercase overflow-hidden group',
        className
      )}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      data-cursor
    >
      <span className="absolute inset-0 bg-gradient-to-r from-deep-oxblood via-artist-crimson to-aged-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <span className="relative z-10">{children}</span>
      <motion.span
        className="absolute inset-0 border border-warm-cream/20"
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.span>
  );

  if (href) {
    const isExternal = href.startsWith('http');
    if (isExternal) {
      return <a href={href} target="_blank" rel="noopener noreferrer">{content}</a>;
    }
    return <Link href={href}>{content}</Link>;
  }
  return <button onClick={onClick} type="button">{content}</button>;
}
