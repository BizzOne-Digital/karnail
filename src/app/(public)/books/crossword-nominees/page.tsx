import { redirect } from 'next/navigation';
import { CROSSWORD_BOOK_AWARD_2013 } from '@/lib/book-resources';

export default function CrosswordNomineesPage() {
  redirect(`/media-coverage#${CROSSWORD_BOOK_AWARD_2013.mediaCoverageAnchor}`);
}
