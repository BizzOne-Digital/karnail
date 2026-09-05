'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { RevealOnScroll } from '@/components/animations/MotionPrimitives';
import { getImageUrl } from '@/lib/utils';
import { BRAND_LOGO, DEFAULT_HEADER_NAV, CONTACT_EMAIL, CONTACT_LINKS } from '@/lib/brand';
import type { SiteSettings } from '@/types';

interface FooterProps {
  settings?: SiteSettings;
}

export default function Footer({ settings }: FooterProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const footer = settings?.footer;
  const general = settings?.general;
  const cmsNav = settings?.header?.navigation?.filter((n) => n.isVisible).sort((a, b) => a.order - b.order) ?? [];
  const nav = cmsNav.length > 0 ? cmsNav : DEFAULT_HEADER_NAV;
  const footerLogo =
    settings?.branding?.footerLogo || settings?.branding?.mainLogo || BRAND_LOGO;

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <footer className="relative w-full max-w-full bg-soft-black border-t border-deep-oxblood/40 overflow-hidden shrink-0">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(158,37,49,0.08)_0%,transparent_60%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-aged-gold/40 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-6 md:pt-20 md:pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <RevealOnScroll>
            <div>
              <Link href="/" className="inline-block mb-6">
                <Image
                  src={getImageUrl(footerLogo)}
                  alt={general?.artistName || 'Sukh D. H. Khokhar'}
                  width={360}
                  height={100}
                  className="w-auto h-20 md:h-24 lg:h-28 object-contain object-left"
                />
              </Link>
              <p className="text-muted-beige text-sm leading-relaxed">
                {footer?.description || general?.shortBio}
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <div>
              <h4 className="font-dramatic text-sm text-aged-gold tracking-[0.2em] uppercase mb-6">Navigation</h4>
              <ul className="space-y-3">
                {nav.map((item) => (
                  <li key={item.url}>
                    <Link href={item.url} className="text-muted-beige text-sm hover:text-warm-cream hover:pl-2 transition-all duration-300 flex items-center gap-2 group">
                      <span className="w-0 group-hover:w-2 h-px bg-artist-crimson transition-all duration-300" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <div>
              <h4 className="font-dramatic text-sm text-aged-gold tracking-[0.2em] uppercase mb-6">Contact</h4>
              <ul className="space-y-3 text-sm text-muted-beige">
                <li>
                  <a href={`mailto:${footer?.contactInfo?.email || general?.email || CONTACT_EMAIL}`} className="hover:text-warm-cream transition-colors">
                    {footer?.contactInfo?.email || general?.email || CONTACT_EMAIL}
                  </a>
                </li>
                <li>
                  <a href={general?.artPalUrl || CONTACT_LINKS.artPal} target="_blank" rel="noopener noreferrer" className="hover:text-warm-cream transition-colors">
                    {CONTACT_LINKS.artPalLabel}
                  </a>
                </li>
                <li>
                  <a href={CONTACT_LINKS.mysteryOfTheRose} target="_blank" rel="noopener noreferrer" className="hover:text-warm-cream transition-colors">
                    {CONTACT_LINKS.mysteryOfTheRoseLabel}
                  </a>
                </li>
                {(footer?.contactInfo?.phone || general?.phone) && (
                  <li>{footer?.contactInfo?.phone || general?.phone}</li>
                )}
              </ul>
              <div className="flex flex-wrap gap-4 mt-6">
                {(footer?.socialLinks || general?.socialLinks || []).map((link) => (
                  <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer" className="text-warm-gray hover:text-aged-gold transition-colors text-xs tracking-wider uppercase">
                    {link.platform}
                  </a>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.3}>
            <div>
              <h4 className="font-dramatic text-sm text-aged-gold tracking-[0.2em] uppercase mb-6">Newsletter</h4>
              <p className="text-muted-beige text-sm mb-4 leading-relaxed">{footer?.newsletterText}</p>
              {submitted ? (
                <p className="text-aged-gold text-sm font-display text-lg">Thank you for subscribing.</p>
              ) : (
                <form onSubmit={handleNewsletter} className="flex flex-col gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="bg-gallery-black border border-warm-gray/20 text-warm-cream px-4 py-3 text-sm focus:outline-none focus:border-aged-gold transition-colors"
                  />
                  <button type="submit" className="bg-artist-crimson text-warm-cream px-4 py-3 text-sm tracking-wider uppercase hover:bg-deep-oxblood transition-colors">
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </RevealOnScroll>
        </div>

        <div className="brushstroke-divider mt-12 md:mt-14" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-warm-gray text-xs pb-0">
          <p>{footer?.copyright || `© ${new Date().getFullYear()} Sukh D. H. Khokhar. All rights reserved.`}</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-warm-cream transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-warm-cream transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
