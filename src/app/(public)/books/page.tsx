import { Suspense } from 'react';
import { Metadata } from 'next';
import BooksPageContent from './BooksPageContent';
import { SectionPageShell } from '@/components/public/SectionPageShell';

export const metadata: Metadata = {
  title: 'Books by the Author | Sukh D. H. Khokhar',
  description:
    'Dark Mystery: Spellbound, The Mystery of the Rose, and publications by Sukh D. H. Khokhar.',
};

export default function BooksPage() {
  return (
    <Suspense fallback={null}>
      <SectionPageShell showRose={false}>
        <BooksPageContent />
      </SectionPageShell>
    </Suspense>
  );
}
