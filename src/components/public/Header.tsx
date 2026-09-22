'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DEFAULT_HEADER_NAV } from '@/lib/brand';
import { useCart } from '@/hooks/useCart';
import type { SiteSettings } from '@/types';

interface HeaderProps {
  settings?: SiteSettings;
}

export default function Header({ settings }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cmsNav = settings?.header?.navigation?.filter((n) => n.isVisible).sort((a, b) => a.order - b.order) ?? [];
  const nav = cmsNav.length > 0 ? cmsNav : DEFAULT_HEADER_NAV;
  const logoText = settings?.header?.logoText || 'Sukh D. H. Khokhar';
  const ctaText = settings?.header?.ctaText || 'Explore Art';
  const ctaUrl = settings?.header?.ctaUrl || '/gallery';

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 w-full max-w-full transition-all duration-500 pt-[env(safe-area-inset-top,0px)]',
          'bg-page-silver/95 backdrop-blur-md border-b border-warm-gray/25 py-2 shadow-sm',
          scrolled && 'shadow-md'
        )}
      >
        <div className="max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-8">
          {/* Desktop: logo | centered nav | CTA */}
          <div className="hidden lg:grid lg:grid-cols-[1fr_auto] items-center gap-3 xl:gap-5 min-h-[2.75rem]">
            <nav className="flex items-center justify-center gap-3 xl:gap-5 flex-wrap">
              {nav.map((item) => (
                <Link
                  key={item.url}
                  href={item.url}
                  className="text-[12px] text-deep-oxblood/85 hover:text-artist-crimson transition-colors tracking-wide font-body whitespace-nowrap"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center justify-self-end gap-2 xl:gap-3 shrink-0">
              <Link href="/cart" className="relative p-1.5 text-deep-oxblood/80 hover:text-artist-crimson transition-colors" data-cursor aria-label="Cart">
                <ShoppingBag size={18} strokeWidth={1.5} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-artist-crimson text-warm-cream text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
              <Link
                href={ctaUrl}
                className="border border-deep-oxblood/50 text-deep-oxblood px-3 xl:px-4 py-1.5 text-[10px] tracking-[0.16em] uppercase font-body hover:bg-deep-oxblood/5 hover:border-artist-crimson transition-all duration-300"
                data-cursor
              >
                {ctaText}
              </Link>
            </div>
          </div>

          {/* Mobile — crop wide banner logo to icon + name only */}
          <div className="flex lg:hidden items-center justify-between gap-2 min-h-[2.75rem]">
            <Link href="/" className="font-display text-sm text-deep-oxblood font-semibold tracking-wide shrink-0" aria-label={logoText}>
              Home
            </Link>
            <div className="flex items-center shrink-0 gap-1.5 sm:gap-2">
              <Link href="/cart" className="relative text-deep-oxblood p-2 -mr-0.5" aria-label="Cart">
                <ShoppingBag size={20} strokeWidth={1.5} />
                {totalItems > 0 && (
                  <span className="absolute top-0.5 right-0.5 bg-artist-crimson text-warm-cream text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="text-deep-oxblood p-2 -mr-1"
                aria-label="Open menu"
              >
                <Menu size={24} strokeWidth={1.75} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[60] bg-gallery-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-deep-oxblood/30 via-gallery-black to-soft-black" />
            <button onClick={() => setMobileOpen(false)} className="absolute top-6 right-6 text-warm-cream z-10" aria-label="Close menu">
              <X size={28} />
            </button>
            <nav className="relative z-10 flex flex-col items-center justify-center min-h-screen gap-4">
              {nav.map((item, i) => (
                <motion.div key={item.url} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                  <Link href={item.url} onClick={() => setMobileOpen(false)} className="font-display text-3xl text-warm-cream hover:text-aged-gold transition-colors py-2">
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <Link href={ctaUrl} onClick={() => setMobileOpen(false)} className="mt-8 border border-warm-cream/60 text-warm-cream px-8 py-3 text-xs tracking-[0.2em] uppercase">
                {ctaText}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
