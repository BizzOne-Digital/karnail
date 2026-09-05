/** Default public contact details */
export const CONTACT_EMAIL = 'khokharsukh@gmail.com';

export const CONTACT_LINKS = {
  email: CONTACT_EMAIL,
  artPal: 'https://www.artpal.com/sukh2',
  artPalLabel: 'www.artpal.com/sukh2',
  mysteryOfTheRose: 'https://www.mysteryoftherose.com',
  mysteryOfTheRoseLabel: 'www.mysteryoftherose.com',
} as const;

export interface BookListing {
  title: string;
  subtitle?: string;
  description: string;
  formats?: string[];
  status: 'available' | 'upcoming';
  buyUrl?: string;
  contactSubject?: string;
}

export const BOOK_LISTINGS: BookListing[] = [
  {
    title: 'The Mystery of the Rose: The Return of the Prince',
    subtitle: 'Debut Historical Novel',
    description:
      'Critically acclaimed debut novel longlisted for the 2013 Crossword Book Award. A mesmerizing tale of romance set in India under British rule — the love story of Pearly Ruby Boone woven with the fate of a nation.',
    formats: ['Paperback', 'Available via enquiry'],
    status: 'available',
    buyUrl: CONTACT_LINKS.mysteryOfTheRose,
    contactSubject: 'The Mystery of the Rose',
  },
  {
    title: 'Dark Mystery: I am a Demon, I\'m a Ghost',
    subtitle: 'Poetry eBook with Illustrations',
    description:
      'A mystical adventure in poetry featuring 30 full-color illustrations. Takes readers into the realm of angels, demons, and ghosts — a deeply spiritual journey from darkness into light.',
    formats: ['Kindle', 'Kobo', 'Amazon', 'Chapters-Indigo'],
    status: 'available',
    contactSubject: 'Dark Mystery eBook',
  },
  {
    title: 'Dark Mystery 2027 Edition: Spellbound — Arose from the Ashes',
    subtitle: 'Illustrated Mystical Adventure eBook',
    description:
      'Featuring 84 full-color paintings. The story of an angel disguised as a prince, transformed into a ghost by a jealous demon — a poetic rendition from The Mystery of the Rose universe.',
    formats: ['2027 Edition — Coming Soon'],
    status: 'upcoming',
    contactSubject: 'Dark Mystery 2027 Edition',
  },
  {
    title: 'The Mystery of the Rose — 2027 Edition',
    subtitle: 'Enhanced Illustrated Edition',
    description:
      'The return of the acclaimed debut novel, reimagined with enhanced illustrations, poetry, and mystical adventure for a new generation of readers.',
    formats: ['2027 Edition — Coming Soon'],
    status: 'upcoming',
    contactSubject: 'Mystery of the Rose 2027 Edition',
  },
];
