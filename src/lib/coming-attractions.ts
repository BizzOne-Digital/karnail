/** Client email: Books — Coming Attractions 2027–28 fiscal year / blurbs */

export const COMING_ATTRACTIONS_FISCAL_LABEL = '2027–28 Fiscal Year';

export const COMING_ATTRACTIONS_2027 = [
  {
    id: 'spellbound-2027',
    kind: 'coming' as const,
    category: 'Illustrated Mystical Adventure',
    title: 'DARK MYSTERY: SPELLBOUND',
    subtitle: 'Arose from the Ashes',
    edition: '2027 Edition eBook',
    coverImage: '/books/dark-mystery-spellbound-2027.jpg',
    coverAlt: 'Dark Mystery Spellbound — 2027 Edition cover',
    blurb:
      'Dark Mystery: Spellbound is mystical adventure of an angel (disguised as Prince) who is transformed into a ghost by a jealous demon and trapped in time. His remorse, perseverance and faith help him reconnect with a higher source and empower him with the strength to transcend the barriers of time and space and reunite with true love, Princessa.',
    bookHref: '/books/spellbound-2027',
    /** Zoom past print margins baked into scan */
    coverZoom: 1.2,
  },
  {
    id: 'mystery-rose-2027',
    kind: 'coming' as const,
    category: null,
    title: 'THE MYSTERY OF THE ROSE: THE RETURN OF THE ROSE',
    subtitle: null,
    edition: '2027 Edition Paperback & eBook',
    coverImage: '/books/mystery-rose-return-prince-2027-ebook-cover.jpg',
    coverAlt: 'The Mystery of the Rose — Return of the Prince — 2027 Edition eBook cover',
    blurb:
      'Witness the rebirth of India in an unforgettable love story of Pearly Ruby Princessa, spun around the fascinating background of the Coronation of King Edward VII in 1902; his spectacular State Durbar and the reign of maharajas, nawabs, and aristocrats in the Indian princely states. The 2013 Edition of the paperback was nominated Crossword Book Award.',
    bookHref: '/books/mystery-rose-2027',
    coverFit: 'contain' as const,
    coverZoom: 1,
  },
];

export const PREVIOUS_PUBLICATIONS = [
  {
    id: 'dark-mystery-demon',
    kind: 'previous' as const,
    category: 'Illustrated Mystical Adventure',
    title: "DARK MYSTERY: I'M A DEMON. I'M A GHOST",
    subtitle: null,
    edition: '2013 Edition available on Amazon',
    coverImage: '/books/dark-mystery-i-am-a-demon-2013.png',
    coverAlt: "Dark Mystery: I'm a Demon. I'm a Ghost — 2013 cover",
    blurb: null,
    bookHref: '/books/dark-mystery-demon',
    externalUrl: 'https://www.amazon.com/s?k=Dark+Mystery+Sukh+Khokhar',
    coverZoom: 1.08,
  },
  {
    id: 'mystery-rose-2013',
    kind: 'previous' as const,
    category: null,
    title: 'THE MYSTERY OF ROSE: THE RETURN OF THE PRINCE',
    subtitle: null,
    edition: '2013 Edition (sold out — unavailable pending 2027 Edition)',
    coverImage: '/books/mystery-rose-2013-edition.jpg',
    coverAlt: 'The Mystery of the Rose — 2013 Edition cover',
    blurb: null,
    bookHref: '/books/mystery-rose-2013',
    coverZoom: 1.1,
  },
];
