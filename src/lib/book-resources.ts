/** Author resource documents and award recognition */

export interface MulticulturalResourceBook {
  id: string;
  title: string;
  year: number;
  coverAlt: string;
  coverImage?: string;
  coverZoom?: number;
  coverFit?: 'cover' | 'contain';
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
      coverAlt: "Newcomers' Guide to Thompson — cover scan",
      coverFit: 'contain',
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
  title: 'Crossword Book Awards 2013 — Eligible Titles',
  source: 'IBNLive.com',
  date: 'June 26, 2013',
  pdfUrl: '/books/pdfs/crossword-book-awards-2013.pdf',
  imageUrl: '/books/crossword-book-award-2013.png',
  imageAlt: 'Books display — Crossword Book Awards 2013 feature',
  intro:
    "Here's a list of all the eligible books for the Crossword Book Awards 2013. Fiction (266 titles).",
  highlight: {
    title: 'The Mystery of the Rose: The Return of the Prince',
    author: 'Sukh Khokhar',
    publisher: 'Leadstart Publishing',
    category: 'Fiction',
  },
  excerpt: [
    'A Life That You Knew, by Saptarshi Basu, Srishti Publishers',
    'Cracked Pots, by Suresh Kumar, Power Publishers',
    'Em and The Big Hoom, by Jerry Pinto, Aleph',
    'The Taliban Cricket Club, by Timeri N Murari, Aleph',
    'Chronicle of a Corpse Bearer, by Cyrus Mistry, Aleph',
    'Mr J Has left Us, by Sanjiv Bhatia, Crabwise Press',
    'The Revolt of the Fish Eaters, by Lopa Ghosh, Harper Collins India',
    'Inside The Boundary Lines, by Atul Kumar, Leadstart Publishing',
    'The Mystery of the Rose The Return of the Prince, by Sukh Khokhar, Leadstart Publishing',
    'A Maverick Heart Between love and life, by Ravindra Shukla, Leadstart Publishing',
    'Maut: The Birth of Death, by Behram Ardeshir, Leadstart Publishing',
    'The Morning After, by Kamini Patel, Penguin Books India',
    'The Gangster\'s Muse, by Supriya Parulekar, Leadstart Publishing',
    'Collision of Dimensions, by Ravi Shankar, Leadstart Publishing',
    'In a Heartbeat, by Asbah Shams, Penguin Books India',
    'Above The Rice Fields of Pilarno, by Marianne Furtado de Nazareth, Leadstart Publishing',
  ],
} as const;
