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

// The runbook's OWN art (26 Oct 2026): scripts/sop-art-jobs.json, Seedream on Oracle, sources in cto-aipa docs/sop-ai-ops-art/.
const SOP = 'D:/aideazz/ai-cofounders/cto-aipa/docs/sop-ai-ops-art/';
const jobs = [
  [SOP + 'r-hero--seedream.jpg',     'r-hero.jpg',     1920, 76],
  [SOP + 'r-fleet--seedream.jpg',    'r-fleet.jpg',     900, 78],
  [SOP + 'r-ops--seedream.jpg',      'r-ops.jpg',      1200, 76],
  [SOP + 'r-loop--seedream.jpg',     'r-loop.jpg',     1920, 74],
  [SOP + 'r-kintsugi--seedream.jpg', 'r-kintsugi.jpg',  900, 78],
  [SOP + 'r-close--seedream.jpg',    'r-close.jpg',    1920, 76],
];
// Previous web copies of the deck art (hills, terraces, kintsugi, close, mycelium, loop, water) stay in
// public/media/sop/; to rebuild them, map PO/AG sources to those names here.for (const [src, name, w, q] of jobs) {
  const meta = await sharp(src).metadata();
  await sharp(src)
    .resize({ width: Math.min(w, meta.width), withoutEnlargement: true })
    .jpeg({ quality: q, mozjpeg: true, progressive: true })
    .toFile(OUT + name);
  const out = await sharp(OUT + name).metadata();
  console.log(name.padEnd(14), `${meta.width}x${meta.height} -> ${out.width}x${out.height}`, Math.round(statSync(OUT + name).size / 1024) + 'KB');
}
