import type { Metadata } from 'next';
import { Cormorant_Garamond, Cinzel, Manrope, Caveat } from 'next/font/google';
import { Providers } from '@/components/Providers';
import './globals.css';

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
  title: {
    default: 'Sukh D. H. Khokhar | Captivating Mystery Art',
    template: '%s | Sukh D. H. Khokhar',
  },
  description:
    'Discover captivating mystical paintings, murals, and creative services by Sukh D. H. Khokhar — mystery writer, mural artist, and visual storyteller.',
  keywords: ['mystery art', 'mural artist', 'paintings', 'Sukh Khokhar', 'visual artist'],
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
