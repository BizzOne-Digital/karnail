export const BANNER_VERSE = [
  'I am going where angels go.',
  'I shall be doing what angels do.',
  'Should you my darling, ever lose your way;',
  'You will find my soul surrounding you.',
];

export const ABOUT_AUTHOR_PARAGRAPHS = [
  'Sukh D. H. Khokhar is a Canadian mystery writer, poet, multimedia mural artist, illustrator, and educator based in Calgary, Alberta.',
  'As Executive Director of the Thompson Citizenship Council Inc. (1985–2008), she pioneered the race relations movement in northern Manitoba in 1990 and promoted it to the national level, raising awareness of minority issues and human rights by delivering successful interactive workshops to schools, businesses, and community groups, and coordinating "Thompson from Many Lands" multicultural radio programs for twenty-four years into the millennium.',
  'A recipient of the Governor General\'s Commemorative Medal, she had the privilege of working with RCMP Commissioner Norman D. Inkster and Phil Murray to diversify the national force, documenting the historical policy initiatives in the book The Changing Face of the RCMP, available at the Solicitor General of Canada\'s Departmental Library in Ottawa.',
  'Winner of numerous awards including The City of Thompson Race Relations Merit Award, Outstanding Community Service Award, Best Portrait and Sketch Artist Award, and author and compiler of a series of multicultural education resource books. The first paperback edition of her critically acclaimed debut novel, The Mystery of the Rose: The Return of the Prince, was longlisted for the 2013 Crossword Book Award. The short version of her mystical adventure in a poetry eBook, Dark Mystery: I am a Demon, I\'m a Ghost, was released in Kindle and Kobo editions in 2013, featuring 30 full-color illustrations. The eBook is available on Amazon.com, at Chapters-Indigo, and at many retail stores in Asia, Europe, and North America.',
];

export const ARTIST_STATEMENT = {
  title: 'Into the Realm of Magical Realism and Mystical Art',
  subtitle:
    'A supernatural mystery writer, poet, multi-media mural artist, illustrator, and educator based in Calgary, Alberta.',
  paragraphs: [
    'SUKH KHOKHAR specializes in writing fiction with historical and mystical perspectives. She draws her characters from real stories and weaves her narratives with poetry, supernatural imagery, and illustrations. She takes her readers into the realm of fantasy—into the mysterious world of angels, demons, and ghosts—and portrays their spiritual journey from the dark side into the light. She enhances her storytelling with mural paintings. Her stories are steeped in magical realism, mystery, and suspense.',
    'Her characters have been described as historical, mystical, lyrical, magical, spiritual, and powerful. She portrays stories of struggle and emancipation, love and passion, retribution and redemption, intrigue, and obsession, exploring the elusive connection between the visible and invisible, the physical and metaphysical, matter and spirit, good and evil, and the creator and creation, leading to the goal of ultimate peace. Her artwork is rooted in spiritual consciousness and permeated by the presence of a Higher Source. It reflects the phenomena of beauty and balance, evolution and change, and metamorphosis and rebirth in the surrounding nature.',
    'She defines the concepts of life and death at a deeper level by going beyond the boundaries of the physical and metaphysical into the surreal world, where these two forces come together and blend to form a new life force that defies the myth of death. She supports the belief that there is no such thing as death, only a new beginning and a continuum—the eternal presence of the Source. Everything comes from the Source and returns to the Source.',
    'She works on her art with a deep sense of awareness that within her lies a sacred pool of creative energy, which comes from a higher source. Her soul is open to receiving and transmitting these gifts projected in her mind\'s eye, allowing her to create the likeness of the Source and become a co-creator with it.',
    'Her diverse training has allowed her to work with several mediums. She scans and incorporates her hand-painted applications into digital art. Her full-color mystical digital artwork can be seen on her online art gallery.',
  ],
  artPalUrl: 'https://www.artpal.com/sukh2',
};

export interface BookReview {
  quote: string;
  author: string;
  title: string;
  book?: string;
}

export const BOOK_REVIEWS: BookReview[] = [
  {
    book: 'Dark Mystery',
    quote:
      'Dark Mystery is the work of a brilliant writer and illustrator who redefines the concept of life and death, good and evil, darkness and light, pointing out the elusive grey areas we tend to overlook. The powerful imagery and verses reflect the presence of a Higher Source!',
    author: 'Marcia Carroll',
    title: 'Past Core Reporter to President Lyndon B. Johnson, White House',
  },
  {
    book: 'Dark Mystery',
    quote:
      'Reading the book, Dark Mystery by Sukh Khokhar, is a deeply spiritual experience. The story, the images, and the poetry are truly exceptional.',
    author: 'Madhumati',
    title: 'Bollywood Film Actress/Dancer, Juhu, Mumbai',
  },
  {
    book: 'Dark Mystery',
    quote:
      'Ms. Khokhar is fortunate in that during her formative years, she was exposed not only to Vedic poetry from her native India but also to English poetry from the First Elizabethan Era through to that of the Classical period. All these styles are apparent in her latest anthology, Dark Mystery. The simple rhyme structures used effectively by Ms. Khokhar only enhance the legendary stories made new and fresh again by the author\'s pen. Who could fail to be moved by the descriptions of the fate of the hapless Angel or the transformation of the Demon especially when illustrated by Ms. Khokhar\'s imaginative, ingenious, and colorful artwork, which has become her unique trademark? As a writer of mysteries and as a multimedia artist and illustrator, Ms. Khokhar uses her many faceted talents to produce her latest excursion into the world of poetic mysticism and elusive romance. I urge everyone to step with Ms. Khokhar "into the magic land."',
    author: 'Graham Buckingham',
    title: 'Author — Thompson: A City and its People',
  },
  {
    book: 'Dark Mystery',
    quote:
      'The book, Dark Mystery by the author Sukh D.H. Khokhar, is indeed a masterpiece! The poetry is intriguing, and the mystery is intense. I have the images forever painted in my mind. I also looked at the artwork of Sukh Khokhar on Google with respect to this book, and it is spectacular!',
    author: 'Elizabeth A. Bennett',
    title: 'Manitoba Human Rights Commission',
  },
  {
    book: 'The Mystery of the Rose',
    quote:
      'A mesmerizing tale of romance from India under the British rule, depicted with powerful characters and fascinating backdrop of the rise of the Indian independence movement; the fall of the British Raj, leading up to the rebirth of a nation. A perfect book for adaptation into a feature movie production.',
    author: 'Madhumati',
    title: 'Bollywood Indian Film Actress/Dancer',
  },
  {
    book: 'The Mystery of the Rose',
    quote:
      'Reading the book, The Mystery of the Rose is like watching a film—the story grips you; the characters become alive and the images burn in your memory forever . . .',
    author: 'Marcia Carroll',
    title: 'Past Core Reporter to President Lyndon B. Johnson, White House',
  },
  {
    book: 'The Mystery of the Rose',
    quote:
      'Between the pages of Mystery of the Rose is the love story of Pearly Ruby Boone, woven together with the fate of a nation under British rule. Drawing from historical contexts, the novel paints a perfect picture of India circa 1880 all the way to the 1940s as it explores the life of a British family caught up in the deep political intrigue and turmoil of the era. This, coupled with vibrant illustrations and sprinkled with several beautiful verses of poetry, makes the novel a true marvel of magical realism.',
    author: 'Maricel Alcantara',
    title: 'Author Solutions — A Penguin Company',
  },
];

export interface FamilyBackgroundInsert {
  heading: string;
  intro?: string;
  paragraphs: string[];
  /** Side-by-side portrait strip (e.g. Captain Ram Singh) */
  portraitStrip?: {
    image: string;
    alt: string;
    captions: [string, string];
  };
  /** Single centred portrait (e.g. Sardar Natha Singh) */
  portrait?: {
    image: string;
    alt: string;
  };
}

export const FAMILY_BACKGROUND_INSERTS: FamilyBackgroundInsert[] = [
  {
    heading: 'Captain Ram Singh',
    portraitStrip: {
      image: '/family/captain-ram-singh-portraits.png',
      alt: 'Captain Ram Singh — ADC to Lord Curzon and Maharaja Bhupindra of Patiala',
      captions: [
        'ADC to Lord Curzon, Viceroy of India',
        'ADC to Maharaja Bhupindra of Patiala',
      ],
    },
    paragraphs: [
      'The inspiration and historical background for the novel, The Mystery of the Rose: The Return of the Prince, came from the life and times of my great-grandfather, Captain Ram Singh, who served as the aide-de-camp (ADC) to Lord Curzon, the British Viceroy of India. He led a contingent of 100 Sikh soldiers to England in 1903 to participate in the coronation of Edward VII. He had the distinct honor of being a royal guest for 22 days in London and at the State Durbar in Delhi in 1903; and was awarded the Order of the British India (OBI). The proceedings of the event are recorded at the Victoria and Albert Museum in England.',
      'His contributions to India included bringing fame to the Indian Army by fighting meritoriously in the Sudan Campaigns of 1884–85 and on the North-West Frontier of India in 1897–98 as part of the 15th Sikh Battalion. He was awarded the title of ‘Sardar Bahadur,’ meaning \'Brave Heart,\' for his courage. Following his retirement as ADC to Lord Curzon in 1908, he was appointed aide-de-camp to His Highness, Maharaja Bhupindra of the Patiala State. He later joined the Akali Agitations of the 1920s to fight for India\'s freedom and relinquished his OBI. He was jailed with fellow freedom fighters from 1923 to 1926. He displayed enormous courage in standing up for the cause of recovering the keys to the Golden Temple treasury from the British in 1920, following the 1919 Jallianwala Bagh massacre in Amritsar, Punjab.',
    ],
  },
  {
    heading: 'Sardar Natha Singh',
    intro:
      'My great-great-grandfather, Natha Singh, was an ADC to Prince Nau Nihal Singh, the grandson of Maharaja Ranjit Singh at Shahpur Kandi Fort.',
    portrait: {
      image: '/family/natha-singh.png',
      alt: 'Sardar Natha Singh — digital archival portrait by Sukh D. H. Khokhar',
    },
    paragraphs: [
      'Sardar Natha Singh served as an ADC to Prince Nau Nihal Singh at the Court of Maharaja Ranjit Singh; later, as Killadar of Shahpur Kandi Fort, he fulfilled the tough assignment of safekeeping and ferrying the famous Koh-i-Noor Diamond to Bombay en route to London with his four confidants. According to the family archives, the Koh-i-Noor Diamond was stored in our ancestral mansion in Sunam for one week for safekeeping before its planned departure to London.',
    ],
  },
];

export const MULTICULTURAL_PUBLICATIONS = {
  title: 'Author of Multicultural Resource Books and Poetry',
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

export const GALLERY_PROMO = {
  title: 'Discover the Captivating Art of Sukh D. H. Khokhar',
  subtitle: 'On Her Online Art Gallery: www.ArtPal.com/sukh2',
  paragraphs: [
    'Sukh D. H. Khokhar, a supernatural mystery writer, poet, and illustrator based in Calgary, Alberta, invites you to tour her spellbinding art gallery, which will leave you feeling breathless. She is a talented multimedia mural artist who specializes in creating artwork that blends historical and mystical perspectives. She has launched her stunning online art gallery encompassing more than 200 amazing pieces of art, highlighting her unique style of combining bold, supernatural imagery with lyrical and magical elements.',
    'Her collection of the Fairies and Dark Mystery Series will take you into a realm of angels, demons, and ghosts, tracing their spiritual journey through darkness into light. Her handling of portraits will fill you with a feeling of reverence and awe. Her Dark Mystery artwork consists of 84 full-color paintings originating from her upcoming illustrated mystical adventure eBook, titled Dark Mystery 2027 Edition: Spellbound—Arose from the Ashes.',
  ],
};

export const UPCOMING_2027_EDITIONS = [
  {
    slug: 'dark-mystery-2027-spellbound',
    title: 'Dark Mystery 2027 Edition: Spellbound — Arose from the Ashes',
    excerpt:
      'An illustrated mystical adventure across 67 episodes, 6 poetic chapters, and 181 pages — an angel prince transformed into a ghost, seeking reunion with Princessa through darkness into light.',
    year: '2027',
  },
  {
    slug: 'mystery-of-the-rose-2027-edition',
    title: 'The Mystery of the Rose — 2027 Edition',
    excerpt:
      'A mystical adventure of a British family under the spell of India from 1880–1945 — the magical love story of Pearly Ruby Princessa and the rebirth of a nation.',
    year: '2027',
  },
];

export const SCROLL_GALLERY_SLUGS = [
  'mystical-paintings',
  'original-paintings',
  'murals',
  'commissioned-work',
] as const;
