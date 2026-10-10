import fs from 'fs';

const p =
  'C:/Users/admin/.cursor/projects/e-2sri-nokri-karnail-main-karnail-main/agent-transcripts/01bcb202-3d52-4d9a-acc5-424df4cd30ef/01bcb202-3d52-4d9a-acc5-424df4cd30ef.jsonl';
const t = fs.readFileSync(p, 'utf8');
const re = /assets\\[^"]+/g;
const m = new Set();
let x;
while ((x = re.exec(t))) m.add(x[0].replace(/\\/g, '/'));
for (const f of m) console.log(f);
console.log('total assets', m.size);
