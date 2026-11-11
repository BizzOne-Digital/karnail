import type { Metadata } from 'next';
import { Cormorant_Garamond, Cinzel, Manrope, Caveat } from 'next/font/google';
import { Providers } from '@/components/Providers';
import { HOME_BANNER_ASPECT, HOME_BANNER_WRAPPER } from '@/lib/brand';
import { SiteJsonLd } from '@/components/public/SiteJsonLd';
import { absolutePublicUrl, CANONICAL_SITE_URL, getSiteUrl } from '@/lib/site-url';
import './globals.css';

const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

const siteTitle = 'Sukh Khokhar | Calgary Mystery Writer, Poet & Mural Artist';
const siteDescription =
  'Calgary mystery writer, poet and mural artist Sukh D. H. Khokhar. Explore The Mystery of the Rose, the Dark Mystery poetry eBook and original paintings.';

const ogImageWidth = 1024;
const ogImageHeight = Math.round(ogImageWidth / HOME_BANNER_ASPECT);
const siteUrl = getSiteUrl();
const ogImageUrl = absolutePublicUrl(HOME_BANNER_WRAPPER);

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
});

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  weight: ['400', '500', '600', '700'],
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  weight: ['300', '400', '500', '600', '700'],
});

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: '%s | Sukh D. H. Khokhar',
  },
  description: siteDescription,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  ...(googleSiteVerification
    ? { verification: { google: googleSiteVerification } }
    : {}),
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: `${CANONICAL_SITE_URL}/`,
    siteName: 'Sukh D. H. Khokhar',
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: ogImageUrl,
        secureUrl: ogImageUrl,
        width: ogImageWidth,
        height: ogImageHeight,
        type: 'image/jpeg',
        alt: 'Dark Mystery: Spellbound — mystical art banner by Sukh D. H. Khokhar',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: [ogImageUrl],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-CA"
      className={`${cormorant.variable} ${cinzel.variable} ${manrope.variable} ${caveat.variable} overflow-x-hidden`}
    >
      <body className="font-body antialiased film-grain">
        <SiteJsonLd />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
