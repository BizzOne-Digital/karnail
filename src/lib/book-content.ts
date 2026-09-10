/** Extended book descriptions and author narrative */

export interface BookCoverAsset {
  src: string;
  alt: string;
  label?: string;
}

export interface BookCatalogEntry {
  id: string;
  title: string;
  subtitle?: string;
  edition?: string;
  tagline?: string;
  coverImage: string;
  coverAlt: string;
  additionalCovers?: BookCoverAsset[];
  pdfUrl?: string;
  status: 'available' | 'upcoming';
  award?: string;
}

export const BOOK_CATALOG: BookCatalogEntry[] = [
  {
    id: 'spellbound-2027',
    title: 'Dark Mystery: Spellbound — Arose from the Ashes',
    subtitle: 'Illustrated Mystical Adventure',
    edition: '2027 Edition',
    tagline: 'Story of a Ghost Prince Trapped in Time',
    coverImage: '/books/dark-mystery-spellbound-2027.jpg',
    coverAlt: 'Dark Mystery Spellbound 2027 edition book cover',
    status: 'upcoming',
  },
  {
    id: 'mystery-rose-2027',
    title: 'The Mystery of the Rose: Return of the Prince',
    subtitle: 'A Magical Love Story from India under British Rule',
    edition: '2027 Edition',
    coverImage: '/books/mystery-rose-return-prince-2027.jpg',
    coverAlt: 'The Mystery of the Rose Return of the Prince 2027 edition cover',
    additionalCovers: [
      {
        src: '/books/mystery-rose-return-prince-2027-alt.jpg',
        alt: 'The Mystery of the Rose 2027 alternate cover',
        label: 'Alternate Cover',
      },
      {
        src: '/books/mystery-rose-return-prince-2027-wrap.jpg',
        alt: 'The Mystery of the Rose 2027 wraparound cover',
        label: 'Wraparound Cover',
      },
      {
        src: '/books/mystery-rose-double-cover-2027.jpg',
        alt: 'The Mystery of the Rose 2027 double cover spread',
        label: 'Full Cover Spread',
      },
    ],
    award: 'Nominated for the 2013 Crossword Book Award',
    status: 'upcoming',
  },
  {
    id: 'mystery-rose-2013',
    title: 'The Mystery of the Rose: The Return of the Prince',
    subtitle: 'Debut Historical Novel',
    edition: '2013 Edition',
    tagline: 'Witness the Rebirth of India in a Magical Love Story of Princessa',
    coverImage: '/books/mystery-rose-2013-edition.jpg',
    coverAlt: 'The Mystery of the Rose 2013 edition book cover',
    award: 'Nominated for the 2013 Crossword Book Award',
    status: 'available',
  },
  {
    id: 'dark-mystery-demon',
    title: 'Dark Mystery: I am a Demon, I\'m a Ghost',
    subtitle: 'Poetry eBook with Illustrations',
    edition: '2013 Edition',
    tagline: 'I\'m a demon. I\'m a ghost…',
    coverImage: '/books/dark-mystery-i-am-a-demon-2013.jpg',
    coverAlt: 'Dark Mystery I am a Demon I am a Ghost book cover',
    status: 'available',
  },
];

export const DARK_MYSTERY_SPELLBOUND = {
  tagline: 'Into the Realm of Darkness and Light…',
  title: 'Dark Mystery: Spellbound—Arose from the Ashes',
  edition: '2027 Edition',
  paragraphs: [
    'Dark Mystery: Spellbound—Arose from the Ashes (2027 Edition) is an illustrated mystical adventure of an angel (disguised as a prince) who is transformed into a ghost by a jealous demon and trapped in time. His remorse, perseverance, and faith help him reconnect with a higher source and empower him with the strength to transcend the barriers of time and space and reunite with his true love, Princessa.',
    'The book offers a captivating journey through the eyes of a trapped ghost, revealing profound insights and experiences across 67 dramatic episodes, bound in 6 poetic chapters and 181 pages. The book takes readers into a realm of fantasy—a magical world of angels, demons, and ghosts (all disguised as humans and desperately seeking redemption)—and traces their spiritual journey through the dark side into the light. The verses define the concepts of darkness and light with subtle and profound messages.',
    'The book is a sequel to her debut historical novel, The Mystery of the Rose—The Return of the Prince, nominated for the 2013 Crossword Book Award. This book unlocks the hidden story of the demon—how he tries to seek redemption by using unscrupulous means. It examines the relentless pursuit of the prince and his Princessa, and shows how he, the demon, despite his sinister and sinful character, is able to land himself in paradise.',
    'Blended with vivid imagery and poetic narrative, Dark Mystery: Spellbound is a powerful compilation of tales of mystery, intrigue, passion and obsession, exploring the magical connection between the boundaries of physical and metaphysical, matter and spirit; good and evil, demon and divine and ultimately, the undeniably compelling connection between the power of forgiveness and the gift of deliverance—the deliverance from the cycle of life and death, leading to the state of NIRVANA… The Ultimate Peace.',
    'The book\'s compelling appeal lies in its relevance to today\'s world. In an era filled with uncertainty and a constant search for meaning, the book taps into universal themes of existence, self-discovery, and the afterlife. The ghost\'s perspective offers a unique lens through which readers can reflect on their own lives.',
    'The narrative not only entertains but also provides a contemplative space for readers to explore questions about spirituality, karma, judgment, and the afterlife. Readers, whether intrigued by the mysticism or seeking a thought-provoking adventure, will be captivated by the unique, full-color visual storytelling.',
    'Parents, individuals, and educators exploring themes of spirituality and self-discovery will appreciate the thrilling blend of poetry and supernatural narrative, which makes the book a relevant contribution to a literary landscape that transcends conventional genres.',
  ],
  details: ['67 dramatic episodes', '6 poetic chapters', '181 pages', 'Full-color illustrated storytelling'],
};

export const RETURN_OF_THE_PRINCE = {
  title: 'The Mystery of the Rose: The Return of the Prince',
  points: [
    'A mystical adventure of a British family under the spell of India from 1880–1945; their struggle and joy in the rebirth of India.',
    'A magical love story of Pearly Ruby Princessa.',
    'A tale of two nations entering an era of new beginnings, coinciding with the love story of Princessa.',
  ],
  note: 'Nominated for the 2013 Crossword Book Award.',
};

export const MYSTERIES_OF_MY_LIFE = {
  title: 'About the Mysteries of My Life…',
  paragraphs: [
    'My life\'s going to last as long as lasts my book, its pages. A part of me will die forever; a part of me will live for ages. Like petals, the book unfolds my story, steeped in mystery. Everything meaningful in my life has always begun and ended in mystery. Early in my life, I became aware of the sixth sense I had about people, places, and things. An invisible third eye made me visualize images beyond sight and guided me.',
    'I grew up with a recurring dream, that haunted my days and nights. Someone whispered in my dream prophesying that my life\'s path would be filled with demons, because I was born of a powerful union between a soft-hearted angel and a cold-hearted demon. No wonder I tiptoed through every walk of life followed by a demon—running straight into the arms of an angel, waiting to rescue me at the end of every road.',
    'All my life I was mystified deeply by a strange pattern of curses woven into every blessing of my life. It was hard to differentiate when a blessing revolved into a curse or when a curse evolved into a blessing. I always found myself at the center of a fierce battle between the two powerful forces surrounding me and fighting to take control of me.',
    'Looking back, I realize that no one could have prepared me for the events of my life, which culminated in a saga of a million nightmares. I could not comprehend the strength of a higher power, until one day, right before my eyes, the entire physical phenomenon turned metaphysical; matter became spirit and my deadly demon turned divine. The very demon that had relentlessly pursued me since my conception had turned divine—melting all my regrets into thin air.',
    'I no longer look at my nightmares as curses, but as magnificent adventures that brought me closer to the higher power. My pursuit to discover the true essence of my life led me to search through the very depths of my soul, until I found myself face to face with my demon and my angel divine, experiencing the depth of the mystical spell that befell me years ago.',
    'This book traces the journey of my life through the enchanted land of India, where I was born, died and was reborn. I was destined to discover and break the power of a spell that liberated my family from a century-old curse and, in the process, liberated my demon—my Tormentor!',
    'I\'m eternally grateful to my angel—my holy man who ushered me in this magnificent heaven, raising me from my ashes again.',
    'My stunning journey of self-discovery made me realize that Shangri-La lies within our reach. We can achieve it by connecting our hearts and minds to our soul. May this book help you find your own Shangri-La!',
  ],
  urduTranslation: {
    label: 'Urdu Translation',
    text: 'Ma Sodaii Hu; Mamnoon Hu Us Bandaparvar ka, Jis Mohsan Ne, Is Muflis Ko Yeh Jannat Atta Kar Dee.',
  },
  signature: {
    name: 'Pearly Ruby Princessa',
    date: '08/08/1950',
  },
};
