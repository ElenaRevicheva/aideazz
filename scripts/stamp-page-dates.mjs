#!/usr/bin/env node
/**
 * stamp-page-dates.mjs — keep "Updated" on the hand-written pages honest.
 *
 * The ops runbook said "July 22, 2026" for a month after it had been edited,
 * and its JSON-LD dateModified disagreed with the visible line by a fortnight.
 * A stale date on a page whose whole argument is "this is live and maintained"
 * undermines the argument, and answer engines read dateModified when deciding
 * whether a source is current.
 *
 * ── Why git, and not today's date ───────────────────────────────────────────
 * The obvious fix — stamp today on every build — would be a lie: the site
 * rebuilds whenever any blog post is published, and claiming the runbook was
 * updated on a day nobody touched it is exactly the kind of unearned claim this
 * project refuses to make elsewhere. So the date comes from the last commit
 * that actually changed the file. It moves when the content moves, and not
 * otherwise.
 *
 * ── Why it writes dist/ and never public/ ───────────────────────────────────
 * Stamping the source would change the file, which would change its git date,
 * which would restamp it — the page would report the date of its own stamping
 * forever. Writing only the build output breaks that loop: the source stays
 * the thing a human edits, and the published copy carries the derived truth.
 *
 * Falls back to leaving the existing date alone if git history is unavailable
 * (a shallow clone on a build host), because a wrong date is worse than an old
 * one that a person chose.
 *
 * Runs from `npm run build`, after vite has copied public/ into dist/.
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

/** Pages whose visible "Updated" line and JSON-LD should track their own history. */
const PAGES = [
  { file: 'sop-ai-ops.html', locale: 'en' },
  { file: 'sop-ai-ops-es.html', locale: 'es' },
];

const MONTHS_EN = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const MONTHS_ES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];

const human = (iso, locale) => {
  const [y, m, d] = iso.split('-').map(Number);
  return locale === 'es'
    ? `${d} de ${MONTHS_ES[m - 1]} de ${y}`
    : `${MONTHS_EN[m - 1]} ${d}, ${y}`;
};

/** Last commit date (YYYY-MM-DD) that touched this path, or null. */
function lastChanged(relPath) {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cs', '--', relPath],
      { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(out) ? out : null;
  } catch {
    return null;
  }
}

let stamped = 0, skipped = 0;

for (const { file, locale } of PAGES) {
  const src = join(ROOT, 'public', file);
  const out = join(ROOT, 'dist', file);
  if (!existsSync(out)) { skipped++; continue; }

  // Date the SOURCE, not the build output — dist is regenerated every time.
  const iso = lastChanged(`public/${file}`);
  if (!iso) {
    console.log(`stamp-page-dates: no git history for ${file} — left as authored`);
    skipped++;
    continue;
  }

  let html = readFileSync(out, 'utf8');
  const before = html;

  // 1. The visible line, whatever date currently sits in it.
  const label = locale === 'es' ? 'Actualizado' : 'Updated';
  html = html.replace(
    new RegExp(`(<div class="meta-label">${label}</div>\\s*<div class="meta-val">)[^<]*(</div>)`),
    `$1${human(iso, locale)}$2`,
  );

  // 2. JSON-LD dateModified, which is what answer engines actually read.
  html = html.replace(/"dateModified":"\d{4}-\d{2}-\d{2}"/g, `"dateModified":"${iso}"`);

  if (html !== before) {
    writeFileSync(out, html, 'utf8');
    console.log(`stamp-page-dates: ${file} → ${human(iso, locale)} (${iso})`);
    stamped++;
  } else {
    console.log(`stamp-page-dates: ${file} already current (${iso})`);
  }
}

console.log(`stamp-page-dates: ${stamped} stamped, ${skipped} skipped`);
