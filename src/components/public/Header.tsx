'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { cn, getImageUrl } from '@/lib/utils';
import { BRAND_LOGO, DEFAULT_HEADER_NAV } from '@/lib/brand';
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
  const logoImage = settings?.branding?.mainLogo || settings?.branding?.darkLogo || BRAND_LOGO;
  const ctaText = settings?.header?.ctaText || 'Explore Art';
  const ctaUrl = settings?.header?.ctaUrl || '/gallery';

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 w-full max-w-full transition-all duration-500',
          scrolled
            ? 'bg-gallery-black/95 backdrop-blur-md border-b border-aged-gold/20 py-3'
            : 'bg-transparent py-5 md:py-6'
        )}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
          {/* Desktop: logo | centered nav | CTA */}
          <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr] items-center gap-4">
            <Link href="/" className="flex items-center justify-self-start group shrink-0" data-cursor aria-label={logoText}>
              <Image
                src={getImageUrl(logoImage)}
                alt={logoText}
                width={280}
                height={72}
                priority
                className={cn(
                  'w-auto object-contain object-left transition-all duration-500',
                  scrolled ? 'h-14' : 'h-16 xl:h-[4.5rem]'
                )}
              />
            </Link>

            <nav className="flex items-center justify-center gap-6 xl:gap-8">
              {nav.map((item) => (
                <Link
                  key={item.url}
                  href={item.url}
                  className="text-[13px] text-warm-cream/90 hover:text-warm-cream transition-colors tracking-wide font-body whitespace-nowrap"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center justify-self-end gap-4">
              <Link href="/cart" className="relative p-1.5 text-warm-cream/80 hover:text-warm-cream transition-colors" data-cursor aria-label="Cart">
                <ShoppingBag size={18} strokeWidth={1.5} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-artist-crimson text-warm-cream text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
              <Link
                href={ctaUrl}
                className="border border-warm-cream/60 text-warm-cream px-5 py-2 text-[11px] tracking-[0.2em] uppercase font-body hover:bg-warm-cream/10 hover:border-warm-cream transition-all duration-300"
                data-cursor
              >
                {ctaText}
              </Link>
            </div>
          </div>

          {/* Mobile */}
          <div className="flex lg:hidden items-center justify-between">
            <Link href="/" className="shrink-0" aria-label={logoText}>
              <Image
                src={getImageUrl(logoImage)}
                alt={logoText}
                width={200}
                height={56}
                priority
                className="h-12 w-auto object-contain"
              />
            </Link>
            <div className="flex items-center gap-3">
              <Link href="/cart" className="relative text-warm-cream p-1">
                <ShoppingBag size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-artist-crimson text-warm-cream text-xs w-4 h-4 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
              <button onClick={() => setMobileOpen(true)} className="text-warm-cream p-1" aria-label="Open menu">
                <Menu size={26} />
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
