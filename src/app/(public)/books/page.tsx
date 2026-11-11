import { Suspense } from 'react';
import { Metadata } from 'next';
import BooksPageClient from './BooksPageClient';
import { SectionPageShell } from '@/components/public/SectionPageShell';

export const metadata: Metadata = {
  title: { absolute: 'Books by Sukh Khokhar | Calgary Mystery Author' },
  description:
    'Mystery novel The Mystery of the Rose and the Dark Mystery poetry eBook by Calgary author Sukh D. H. Khokhar. Find where to buy.',
  alternates: { canonical: '/books' },
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
