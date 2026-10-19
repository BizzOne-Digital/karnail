import type { Metadata } from 'next';
import { Cormorant_Garamond, Cinzel, Manrope, Caveat } from 'next/font/google';
import { Providers } from '@/components/Providers';
import { HOME_BANNER_ASPECT, HOME_BANNER_WRAPPER } from '@/lib/brand';
import { absolutePublicUrl, getSiteUrl } from '@/lib/site-url';
import './globals.css';

const siteDescription =
  'Discover captivating mystical paintings, murals, and creative services by Sukh D. H. Khokhar — mystery writer, mural artist, and visual storyteller.';

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
  alternates: { canonical: '/' },
  title: {
    default: 'Sukh D. H. Khokhar | Captivating Mystery Art',
    template: '%s | Sukh D. H. Khokhar',
  },
  description: siteDescription,
  keywords: ['mystery art', 'mural artist', 'paintings', 'Sukh Khokhar', 'visual artist'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Sukh D. H. Khokhar',
    title: 'Sukh D. H. Khokhar | Captivating Mystery Art',
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
    title: 'Sukh D. H. Khokhar | Captivating Mystery Art',
    description: siteDescription,
    images: [ogImageUrl],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${cinzel.variable} ${manrope.variable} ${caveat.variable} overflow-x-hidden`}
    >
      <body className="font-body antialiased film-grain">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
