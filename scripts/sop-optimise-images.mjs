// sop-optimise-images.mjs — web copies of the deck imagery for /sop-ai-ops.html (26 Oct 2026).
// Source art is our own, generated on the ATUONA pipeline for the two October 2026 decks
// (Professional Outlook + AI Growth Operator) in the cto-aipa repo. Re-run after a deck art change:
//   node scripts/sop-optimise-images.mjs
import sharp from 'sharp';
import { statSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const PO = 'D:/aideazz/ai-cofounders/cto-aipa/docs/applications/professional-outlook/art/';
const AG = 'D:/aideazz/ai-cofounders/cto-aipa/docs/selling/ai-growth-operator-deck/art/';
const OUT = path.join(here, '..', 'public', 'media', 'sop') + path.sep;
mkdirSync(OUT, { recursive: true });

const jobs = [
  [PO + 'l-hills.jpg',    'hills.jpg',    1920, 76],
  [PO + 'l-terraces.jpg', 'terraces.jpg',  900, 78],
  [PO + 'l-failure.jpg',  'kintsugi.jpg',  900, 78],
  [PO + 'l-close.jpg',    'close.jpg',    1920, 76],
  [PO + 'l-ops.jpg',      'mycelium.jpg', 1200, 76],
  [AG + 'a-loop.jpg',     'loop.jpg',     1920, 74],
  [PO + 'l-water.jpg',    'water.jpg',    1600, 70],
];
for (const [src, name, w, q] of jobs) {
  const meta = await sharp(src).metadata();
  await sharp(src)
    .resize({ width: Math.min(w, meta.width), withoutEnlargement: true })
    .jpeg({ quality: q, mozjpeg: true, progressive: true })
    .toFile(OUT + name);
  const out = await sharp(OUT + name).metadata();
  console.log(name.padEnd(14), `${meta.width}x${meta.height} -> ${out.width}x${out.height}`, Math.round(statSync(OUT + name).size / 1024) + 'KB');
}
