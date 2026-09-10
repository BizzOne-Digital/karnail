/** Author resource documents and award recognition */

export const MULTICULTURAL_RESOURCE_BOOKS = {
  title: 'Author of Multicultural Resource Books and Poetry',
  pdfUrl: '/books/pdfs/multicultural-resource-books.pdf',
  works: [
    { title: 'The Changing Face of the RCMP', year: 1996 },
    { title: 'Discovering Faces of Discrimination', year: 2001 },
    { title: 'Integrating Diversity into the Workforce', year: 2003 },
    { title: 'A Study of East Indian and Aboriginal Cultures', year: 2004 },
    { title: 'Removing Barriers to Equal Opportunities', year: 2005 },
    { title: "Newcomers' Guide to Thompson", year: 2008 },
    { title: 'Walking in Dreams — Anthology of Lyrics', year: 1984 },
  ],
} as const;

export const CROSSWORD_BOOK_AWARD_2013 = {
  title: 'Crossword Book Awards 2013 — Eligible Titles',
  source: 'IBNLive.com',
  date: 'June 26, 2013',
  pdfUrl: '/books/pdfs/crossword-book-awards-2013.pdf',
  imageUrl: '/books/crossword-book-award-2013.jpg',
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
