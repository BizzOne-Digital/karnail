/** Client media coverage scans — displayed full width, as provided. */
export type MediaCoverageInsert = {
  id: string;
  alt: string;
  caption?: string;
  image?: string;
  pdf?: string;
};

/** Curated from client folder `public/media-coverage/fwdsukhmediacoverage` (+ prior email inserts). */
export const MEDIA_COVERAGE_INSERTS: MediaCoverageInsert[] = [
  {
    id: 'newcomers-guide-souvenir',
    image: '/media-coverage/newcomers-guide-souvenir-book.jpg',
    alt: 'Commendation to Sukh D. H. Khokhar and Newcomers’ Guide to Thompson — TCC Inc. Souvenir Book',
    caption:
      'The Newcomers’ Guide means a great deal to me. I was awarded the Souvenir Book by the President of Thompson Citizenship Council Inc., Surinder Pal, in the presence of the general membership and the provincial Minister of Culture, Heritage and Recreation, Doris Mae Oulton, who funded the project.',
  },
  {
    id: 'rcmp-commissioner-visit-1992',
    image: '/media-coverage/rcmp-commissioner-visit-1992.jpg',
    alt: 'Newspaper feature — RCMP Commissioner Murray visits Multi-Culture Centre, May 1992',
    caption:
      'Press coverage of Commissioner Phil Murray’s visit to Thompson’s Multi-Culture Centre, with Sukh Khokhar as executive director.',
  },
  {
    id: 'thompson-award-of-merit-1993',
    image: '/media-coverage/thompson-award-of-merit-1993.jpg',
    alt: 'City of Thompson Award of Merit for promotion of racial harmony — letter from the Office of the Mayor, March 1993',
  },
  {
    id: 'rcmp-commemorative-medal-1993',
    image: '/media-coverage/rcmp-commemorative-medal-1993.jpg',
    alt: 'Manitoba newspaper — Sukh Khokhar awarded the Canada 125 commemorative medal by RCMP Commissioner Norman Inkster, November 1993',
    caption:
      'Award presentation in Toronto for service on the RCMP Commissioner’s Advisory Committee on Visible Minorities.',
  },
  {
    id: 'citizen-of-the-world-2008',
    image: '/media-coverage/citizen-of-the-world-2008.jpg',
    alt: 'Thompson Citizen — “Sukh Khokhar has been a citizen of the world,” October 2008',
    caption:
      'Profile of community leadership, multiculturalism, and the Multi Culture Centre in Thompson.',
  },
  {
    id: 'mystery-rose-2027-edition',
    image: '/media-coverage/mystery-of-the-rose-2027-edition.jpg',
    alt: 'The Mystery of the Rose — 2027 Edition (nominated for the 2013 Crossword Book Award)',
    caption: 'The 2027 eBook edition of The Mystery of the Rose: The Return of the Prince.',
  },
  {
    id: 'press-clipping-05',
    pdf: '/media-coverage/pdfs/press-clipping-05.pdf',
    alt: 'Press clipping scan (PDF)',
  },
  {
    id: 'press-clipping-06',
    pdf: '/media-coverage/pdfs/press-clipping-06.pdf',
    alt: 'Press clipping scan (PDF)',
  },
  {
    id: 'press-clipping-07',
    pdf: '/media-coverage/pdfs/press-clipping-07.pdf',
    alt: 'Press clipping scan (PDF)',
  },
  {
    id: 'press-clipping-08',
    pdf: '/media-coverage/pdfs/press-clipping-08.pdf',
    alt: 'Press clipping scan (PDF)',
  },
  {
    id: 'press-clipping-09',
    pdf: '/media-coverage/pdfs/press-clipping-09.pdf',
    alt: 'Press clipping scan (PDF)',
  },
  {
    id: 'press-clipping-10',
    pdf: '/media-coverage/pdfs/press-clipping-10.pdf',
    alt: 'Press clipping scan (PDF)',
  },
  {
    id: 'press-clipping-11',
    pdf: '/media-coverage/pdfs/press-clipping-11.pdf',
    alt: 'Press clipping scan (PDF)',
  },
];
