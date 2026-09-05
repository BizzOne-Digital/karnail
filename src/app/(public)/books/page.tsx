import { Metadata } from 'next';
import BooksPageContent from './BooksPageContent';

export const metadata: Metadata = {
  title: 'Buy the Books | Sukh D. H. Khokhar',
  description:
    'Dark Mystery: Spellbound—Arose from the Ashes (2027 Edition), The Mystery of the Rose, and mystical publications by Sukh D. H. Khokhar.',
};

export default function BooksPage() {
  return <BooksPageContent />;
}
