import { Suspense } from 'react';
import { Metadata } from 'next';
import BooksPageClient from './BooksPageClient';
import { SectionPageShell } from '@/components/public/SectionPageShell';

export const metadata: Metadata = {
  title: 'Books by the Author | Sukh D. H. Khokhar',
  description:
    'Book excerpts, 2027–28 coming attractions, and publications by Sukh D. H. Khokhar.',
};

export default function BooksPage() {
  return (
    <Suspense fallback={null}>
      <SectionPageShell>
        <BooksPageClient />
      </SectionPageShell>
    </Suspense>
  );
}
