import { RoseThemeClose } from '@/components/public/RoseThemeClose';

const POETRY_CHAPTERS: { chapter: number; stanzas: string[][] }[] = [
  {
    chapter: 1,
    stanzas: [
      ['In the body I sleep; in the soul I rise.', 'A part of me renews; a part of me dies.'],
      [
        'I’m as grateful to my demon as I am to my holy man,',
        'Whose relentless pursuit so intrigued my Master,',
        'That I was redeemed by the Master himself.',
      ],
    ],
  },
  {
    chapter: 2,
    stanzas: [['Gold and glitter, splendor, and renown,', 'I’m an elusive gem in the British Crown.']],
  },
  {
    chapter: 3,
    stanzas: [['Two strangers in disguise strolled in.', 'Two-fold treasures appeared in twins.']],
  },
  {
    chapter: 4,
    stanzas: [
      [
        'This is the story of a woman he ever loved deep;',
        'She was the only one woman, he dreamt in sleep.',
      ],
      ['Indian gems, Indian soil, British glory;', 'Who’s the teller? And who is the story?'],
    ],
  },
  {
    chapter: 5,
    stanzas: [['From a distant world, and a distant land,', 'I have come to take you to the magic land.']],
  },
  {
    chapter: 6,
    stanzas: [
      ['The Ghost of Ashley knocks on the door.', 'The long, dark shadow falls on the floor.'],
      ['In the raging fire, my life was lost.', 'My own shadow became my ghost.'],
    ],
  },
  {
    chapter: 7,
    stanzas: [
      [
        'The Paradise of my two worlds seems to surround me;',
        'I had drifted into a forgotten land until you found me.',
      ],
    ],
  },
  {
    chapter: 8,
    stanzas: [
      [
        'We are playing hide-an-seek;',
        'I feel her presence; I hear her whisper,',
        'I reach out to her and she disappears.',
      ],
    ],
  },
  {
    chapter: 9,
    stanzas: [['I feel disappointed without regrets or pain;', 'And still playing with cool my losing game.']],
  },
  {
    chapter: 10,
    stanzas: [['Shall I jump through the fire to make amends?', 'Or just burn slowly like a candle at both ends']],
  },
  {
    chapter: 11,
    stanzas: [['Heavens have opened their doors for me.', 'I’m surrounded by angels, wherever I see.']],
  },
  {
    chapter: 12,
    stanzas: [
      [
        'A ruby and a pearl, a bright red rose and a face is driving me crazy.',
        'Those are the only real things in my life, everything else seems hazy.',
      ],
    ],
  },
];

export function PoetryExcerpts() {
  return (
    <section id="poetry-excerpts" className="poetry-excerpts scroll-mt-6">
      <h2 className="text-[13px] sm:text-sm text-artist-crimson font-bold uppercase leading-snug text-left">
        Mystery of the Rose: The Return of the Prince
        <span className="block">Poetry Excerpts</span>
      </h2>
      <p className="poetry-red poetry-intro italic text-artist-crimson text-[13px] sm:text-sm text-left">
        The author has woven lyrics into the opening chapters, creating a stunning magical web:
      </p>

      <div className="space-y-5">
        {POETRY_CHAPTERS.map(({ chapter, stanzas }) => (
          <div
            key={chapter}
            className="grid grid-cols-1 sm:grid-cols-[7rem_1fr] gap-x-4 gap-y-1 text-[13px] sm:text-sm leading-snug sm:pl-12"
          >
            <p className="poetry-red poetry-label font-bold text-artist-crimson text-left">Chapter {chapter}:</p>
            <div className="poetry-verse space-y-3 italic">
              {stanzas.map((lines) => (
                <div key={lines[0]}>
                  {lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <RoseThemeClose className="mt-6" />
    </section>
  );
}
