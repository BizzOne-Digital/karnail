import {
  BOOK_CATALOG,
  DARK_MYSTERY_SPELLBOUND,
  RETURN_OF_THE_PRINCE,
  MYSTERY_ROSE_ACKNOWLEDGEMENTS,
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
        '2013 Edition (sold out — unavailable pending 2027 Edition). Nominated for the 2013 Crossword Book Award.',
      ];
    } else if (book.id === 'dark-mystery-demon') {
      paragraphs = [
        '2013 Edition available on Amazon. Illustrated mystical adventure in poetry with full-color illustrations.',
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

export type BookExcerptSection = {
  id: string;
  heading: string;
  subheading?: string;
  openingVerse?: readonly string[];
  paragraphs: readonly string[];
  urduTranslation?: { label: string; text: string };
  closingQuote?: readonly string[];
  signature?: { name: string; date?: string; preface?: string };
};

export const BOOK_EXCERPT_SECTIONS: BookExcerptSection[] = [
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
    id: 'mystery-rose-acknowledgements',
    heading: MYSTERY_ROSE_ACKNOWLEDGEMENTS.title,
    subheading: MYSTERY_ROSE_ACKNOWLEDGEMENTS.subheading,
    paragraphs: MYSTERY_ROSE_ACKNOWLEDGEMENTS.paragraphs,
    closingQuote: MYSTERY_ROSE_ACKNOWLEDGEMENTS.closingQuote,
    signature: MYSTERY_ROSE_ACKNOWLEDGEMENTS.signature,
  },
  {
    id: 'mysteries-life',
    heading: MYSTERIES_OF_MY_LIFE.title,
    openingVerse: MYSTERIES_OF_MY_LIFE.openingVerse,
    paragraphs: MYSTERIES_OF_MY_LIFE.paragraphs,
    urduTranslation: MYSTERIES_OF_MY_LIFE.urduTranslation,
    signature: MYSTERIES_OF_MY_LIFE.signature,
  },
];
