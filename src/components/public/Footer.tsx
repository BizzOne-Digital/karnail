'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getImageUrl } from '@/lib/utils';
import { BRAND_LOGO } from '@/lib/brand';
import type { SiteSettings } from '@/types';

interface FooterProps {
  settings?: SiteSettings;
}

export default function Footer({ settings }: FooterProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const footer = settings?.footer;
  const footerLogo =
    settings?.branding?.footerLogo || settings?.branding?.mainLogo || BRAND_LOGO;

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <footer className="w-full max-w-full bg-site-backdrop shrink-0 text-gallery-black pb-4 sm:pb-6">
      <div className="site-page-canvas mx-auto w-full bg-page-silver border-t border-warm-gray/25 px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 max-w-2xl mx-auto">
          <Link href="/" className="inline-block shrink-0">
            <Image
              src={getImageUrl(footerLogo)}
              alt="Sukh D. H. Khokhar"
              width={240}
              height={60}
              className="w-auto h-10 sm:h-11 object-contain object-left"
            />
          </Link>

          <div className="flex-1 min-w-0 max-w-xs sm:max-w-sm">
            {submitted ? (
              <p className="text-gallery-black font-semibold text-sm">Thank you for subscribing.</p>
            ) : (
              <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email for updates"
                  required
                  className="flex-1 bg-white border border-warm-gray/40 text-gallery-black px-3 py-2 text-sm font-semibold focus:outline-none focus:border-artist-crimson"
                />
                <button
                  type="submit"
                  className="bg-artist-crimson text-warm-cream px-5 py-2 text-sm font-bold tracking-wide uppercase hover:bg-deep-oxblood transition-colors shrink-0"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        <p className="text-center text-[10px] text-gallery-black/60 mt-4 font-medium">
          {footer?.copyright || `© ${new Date().getFullYear()} Sukh D. H. Khokhar`}
        </p>
      </div>
    </footer>
  );
}
