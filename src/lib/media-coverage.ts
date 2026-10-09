/** Client media coverage scans — displayed full width, as provided. */
export type MediaCoverageInsert = {
  id: string;
  alt: string;
  caption?: string;
  image?: string;
  pdf?: string;
  /** Render at native pixel width (up to column), not stretched to full column width */
  nativeWidth?: boolean;
  imageWidth?: number;
  imageHeight?: number;
};

/**
 * Display order (client request):
 * 1. Crossword Award nominees list — original scan
 * 2. Medal clipping
 * 3. Picture clippings, then PDF clippings
 */
export const MEDIA_COVERAGE_INSERTS: MediaCoverageInsert[] = [
  {
    id: 'crossword-book-awards-2013',
    image: '/media-coverage/crossword-book-awards-2013.jpg',
    alt: 'Crossword Book Awards 2013 — eligible fiction titles (original scan)',
    nativeWidth: true,
    imageWidth: 1024,
    imageHeight: 685,
  },
  {
    id: 'rcmp-commemorative-medal-1993',
    image: '/media-coverage/rcmp-commemorative-medal-1993.jpg',
    alt: 'Manitoba newspaper — Sukh Khokhar awarded the Canada 125 commemorative medal by RCMP Commissioner Norman Inkster, November 1993',
    caption:
      'Award presentation in Toronto for service on the RCMP Commissioner’s Advisory Committee on Visible Minorities.',
  },
  {
    id: 'retirement-art-exhibit-northroots-2008',
    image: '/media-coverage/retirement-art-exhibit-northroots-2008.jpg',
    alt: 'northroots — Art exhibit is community leader’s parting gift; Head of Multi Culture Centre retires, October/November 2008',
    caption:
      'On retiring as executive director of the Thompson Citizenship Council (Multi Culture Centre), Sukh Khokhar’s artwork was exhibited at the Precambrian Art Centre—prints from her novel and pencil portraits of former students. By Lars Miranda, northroots magazine.',
    imageWidth: 754,
    imageHeight: 980,
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
    id: 'citizen-of-the-world-2008',
    image: '/media-coverage/citizen-of-the-world-2008.jpg',
    alt: 'Thompson Citizen — “Sukh Khokhar has been a citizen of the world,” October 2008',
    caption:
      'Profile of community leadership, multiculturalism, and the Multi Culture Centre in Thompson.',
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
