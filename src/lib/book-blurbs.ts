import {
  BOOK_CATALOG,
  DARK_MYSTERY_SPELLBOUND,
  RETURN_OF_THE_PRINCE,
  MYSTERIES_OF_MY_LIFE,
} from '@/lib/book-content';

export type BookBlurbEntry = {
  id: string;
  title: string;
  subtitle?: string;
  coverImage: string;
  coverAlt: string;
  paragraphs: string[];
  pdfUrl?: string;
};

export function getBookBlurbs(): BookBlurbEntry[] {
  const catalog = BOOK_CATALOG;

  return catalog.map((book) => {
    let paragraphs: string[] = [];

    if (book.id === 'spellbound-2027') {
      paragraphs = DARK_MYSTERY_SPELLBOUND.paragraphs.slice(0, 3);
    } else if (book.id === 'mystery-rose-2027') {
      paragraphs = [...RETURN_OF_THE_PRINCE.points, RETURN_OF_THE_PRINCE.note];
    } else if (book.id === 'mystery-rose-2013') {
      paragraphs = [
        'Critically acclaimed debut novel longlisted for the 2013 Crossword Book Award. A mesmerizing tale of romance set in India under British rule—the love story of Pearly Ruby Princessa woven with the fate of a nation.',
      ];
    } else if (book.id === 'dark-mystery-demon') {
      paragraphs = [
        'A mystical adventure in poetry featuring full-color illustrations. Takes readers into the realm of angels, demons, and ghosts—a deeply spiritual journey from darkness into light.',
      ];
    }

    return {
      id: book.id,
      title: book.title,
      subtitle: book.subtitle,
      coverImage: book.coverImage,
      coverAlt: book.coverAlt,
      paragraphs,
      pdfUrl: book.pdfUrl,
    };
  });
}

export const BOOK_EXCERPT_SECTIONS = [
  {
    id: 'spellbound-preface',
    heading: DARK_MYSTERY_SPELLBOUND.title,
    subheading: DARK_MYSTERY_SPELLBOUND.edition,
    paragraphs: DARK_MYSTERY_SPELLBOUND.paragraphs,
  },
  {
    id: 'return-prince',
    heading: RETURN_OF_THE_PRINCE.title,
    paragraphs: [...RETURN_OF_THE_PRINCE.points, RETURN_OF_THE_PRINCE.note],
  },
  {
    id: 'mysteries-life',
    heading: MYSTERIES_OF_MY_LIFE.title,
    paragraphs: MYSTERIES_OF_MY_LIFE.paragraphs.slice(0, 4),
  },
] as const;
