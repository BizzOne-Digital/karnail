import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import PDFDocument from 'pdfkit';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '..', 'public', 'books', 'pdfs');
fs.mkdirSync(outDir, { recursive: true });

const multiculturalWorks = [
  ['The Changing Face of the RCMP', 1996],
  ['Discovering Faces of Discrimination', 2001],
  ['Integrating Diversity into the Workforce', 2003],
  ['A Study of East Indian and Aboriginal Cultures', 2004],
  ['Removing Barriers to Equal Opportunities', 2005],
  ["Newcomers' Guide to Thompson", 2008],
  ['Walking in Dreams — Anthology of Lyrics', 1984],
];

const crosswordExcerpt = [
  "Here's a list of all the eligible books for the Crossword Book Awards 2013.",
  'Fiction (266)',
  '',
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
  "The Gangster's Muse, by Supriya Parulekar, Leadstart Publishing",
  'Collision of Dimensions, by Ravi Shankar, Leadstart Publishing',
  'In a Heartbeat, by Asbah Shams, Penguin Books India',
  'Above The Rice Fields of Pilarno, by Marianne Furtado de Nazareth, Leadstart Publishing',
];

function writePdf(filename, title, lines) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    const stream = fs.createWriteStream(path.join(outDir, filename));
    doc.pipe(stream);
    doc.fontSize(18).text(title, { align: 'center' });
    doc.moveDown();
    doc.fontSize(11);
    for (const line of lines) {
      if (line === '') {
        doc.moveDown(0.5);
        continue;
      }
      doc.text(line, { lineGap: 4 });
    }
    doc.end();
    stream.on('finish', resolve);
    stream.on('error', reject);
  });
}

const multiculturalLines = [
  'Sukh D. H. Khokhar',
  '',
  ...multiculturalWorks.map(([title, year]) => `▪ ${title} (${year})`),
];

const crosswordLines = [
  'Crossword Book Awards: All the eligible titles',
  'IBNLive.com | Posted on Jun 26, 2013 at 08:12pm IST',
  '',
  ...crosswordExcerpt,
];

await writePdf('multicultural-resource-books.pdf', MULTICULTURAL_RESOURCE_BOOKS_TITLE(), multiculturalLines);
await writePdf('crossword-book-awards-2013.pdf', 'Crossword Book Awards 2013', crosswordLines);

function MULTICULTURAL_RESOURCE_BOOKS_TITLE() {
  return 'Author of Multicultural Resource Books and Poetry';
}

console.log('PDFs written to', outDir);
