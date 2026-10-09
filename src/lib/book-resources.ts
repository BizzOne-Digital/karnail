/** Author resource documents and award recognition */

export interface MulticulturalResourceBook {
  id: string;
  title: string;
  year: number;
  coverAlt: string;
  coverImage?: string;
  coverZoom?: number;
  coverFit?: 'cover' | 'contain';
  /** Short author note (e.g. award context) */
  note?: string;
}

export const MULTICULTURAL_RESOURCE_BOOKS = {
  title: 'Author of Multicultural Resource Books and Poetry',
  organization: 'Thompson Citizenship Council Inc. / Multi Culture Centre',
  pdfUrl: '/books/pdfs/multicultural-resource-books.pdf',
  works: [
    {
      id: 'changing-face-rcmp',
      title: 'The Changing Face of the RCMP',
      year: 1996,
      coverImage: '/books/multicultural/changing-face-rcmp.jpg',
      coverAlt: 'The Changing Face of the Royal Canadian Mounted Police — cover scan',
      coverFit: 'contain',
    },
    {
      id: 'discovering-faces-discrimination',
      title: 'Discovering Faces of Discrimination',
      year: 2001,
      coverImage: '/books/multicultural/discovering-faces-discrimination.jpg',
      coverAlt: 'Discovering the Many Faces of Discrimination in Northern Manitoba — cover scan',
    },
    {
      id: 'integrating-diversity-workforce',
      title: 'Integrating Diversity into the Workforce',
      year: 2003,
      coverImage: '/books/multicultural/integrating-diversity-workforce.svg',
      coverAlt: 'Integrating Diversity into the Workforce — TCC resource publication (placeholder until scan provided)',
    },
    {
      id: 'east-indian-aboriginal-cultures',
      title: 'A Study of East Indian and Aboriginal Cultures',
      year: 2004,
      coverImage: '/books/multicultural/discovering-diversity-cultures.png',
      coverAlt: 'Discovering Diversity Within Cultures — cover scan',
      coverZoom: 1.34,
    },
    {
      id: 'removing-barriers',
      title: 'Removing Barriers to Equal Opportunities',
      year: 2005,
      coverImage: '/books/multicultural/removing-barriers.jpg',
      coverAlt: 'Removing Barriers to Equal Opportunities — cover scan',
      coverFit: 'contain',
    },
    {
      id: 'newcomers-guide-thompson',
      title: "Newcomers' Guide to Thompson",
      year: 2008,
      coverImage: '/books/multicultural/newcomers-guide-thompson.png',
      coverAlt: "Newcomers' Guide to Thompson — series cover",
      coverFit: 'contain',
    },
    {
      id: 'newcomers-guide-one-souvenir',
      title: "Newcomers' Guide One — Souvenir Book",
      year: 2008,
      coverImage: '/books/multicultural/newcomers-guide-souvenir-book.jpg',
      coverAlt:
        'TCC commendation for Sukh D. H. Khokhar and Newcomers’ Guide to Thompson — Souvenir Book',
      coverFit: 'contain',
      note:
        'Awarded the Souvenir Book by the President of TCC Inc., Surinder Pal, in the presence of the general membership and the provincial Minister of Culture, Heritage and Recreation, Doris Mae Oulton, who funded the project.',
    },
    {
      id: 'walking-in-dreams',
      title: 'Walking in Dreams — Anthology of Lyrics',
      year: 1984,
      coverImage: '/books/multicultural/walking-in-dreams-1984.jpg',
      coverAlt: 'Walking in Dreams — Anthology of Lyrics — cover scan',
      coverZoom: 1.3,
    },
  ] satisfies MulticulturalResourceBook[],
} as const;

export const CROSSWORD_BOOK_AWARD_2013 = {
  imageUrl: '/media-coverage/crossword-book-awards-2013.jpg',
  imageAlt: 'Crossword Book Awards 2013 — eligible fiction titles (original scan)',
  mediaCoverageAnchor: 'crossword-book-awards-2013',
} as const;
