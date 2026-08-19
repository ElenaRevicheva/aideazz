#!/usr/bin/env node
/**
 * generate-ai-ops-wiki.mjs — render content/ai-ops-wiki/ into public/ai-ops-wiki.html
 *
 * The wiki is a COMPOUNDING artifact in the sense Karpathy's LLM-wiki pattern
 * uses the word: the durable layer is plain Markdown in the repo, portable and
 * inspectable and diffable, and the HTML is a disposable view generated from it.
 * Nothing is hand-edited in the page, so it cannot drift from its source —
 * which is itself the single-source-of-truth rule this wiki documents.
 *
 *   concepts/   the named idea, defined once, in plain words
 *   incidents/  what actually happened, with dates and verified numbers
 *
 * They link BOTH ways, from one declaration in the incident's front-matter, so
 * the halves can never disagree.
 *
 * ── Why it reads like a book, not a dashboard ───────────────────────────────
 * The first two cuts were dark, glassmorphic, violet-to-cyan, Inter — the house
 * style of every AI product page shipped since 2024. On a page whose entire job
 * is to look like earned experience, borrowed styling reads as borrowed
 * substance. So this one is set as a printed technical journal: warm paper,
 * ink, a single vermilion spot colour the way a press run gets one second
 * plate, Fraunces for display and Newsreader for prose. Nothing here is
 * gradient-on-black, and that is the point.
 *
 * The structure follows: cases are CHAPTERS behind a table of contents. You see
 * the run of chapter names first, open the one you want, and only then does it
 * unfold beat by beat — symptom, your guess, cause, fix, proof, rule. Retrieval
 * practice is the pedagogy; committing to an answer before seeing it is what
 * makes the lesson keep.
 *
 * Every word is in the DOM at load and collapsed with CSS, never injected, so
 * crawlers and answer engines read the complete text and the page degrades to a
 * plain document with JavaScript off.
 *
 * Usage:
 *   node scripts/generate-ai-ops-wiki.mjs           build the page
 *   node scripts/generate-ai-ops-wiki.mjs --lint    health-check the corpus
 */

import { readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'content', 'ai-ops-wiki');
const OUT = join(ROOT, 'public', 'ai-ops-wiki.html');
const URL_SELF = 'https://aideazz.xyz/ai-ops-wiki.html';

function parseDoc(raw) {
  const text = raw.replace(/\r\n/g, '\n');
  const m = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) throw new Error('missing front-matter (check the closing --- line)');
  const meta = {};
  let key = null;
  for (const line of m[1].split('\n')) {
    const hit = line.match(/^([a-z_]+):\s?(.*)$/);
    if (hit) { key = hit[1]; meta[key] = hit[2].trim(); }
    else if (key && line.trim()) meta[key] += ' ' + line.trim();
  }
  return { meta, body: m[2].trim() };
}

const escAttr = s => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Escape, then the typographic fixes. The Markdown keeps ASCII -- and straight
 *  quotes so the durable layer survives any editor; prettifying is a render job. */
const esc = s => escAttr(s)
  .replace(/(\s)--(\s)/g, '$1—$2')
  .replace(/(^|[\s(—])&quot;([^&]*?)&quot;/g, '$1“$2”');

function md(src) {
  const inline = s => esc(s)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[\s(])\*(?!\s)([^*\n]+?)\*(?=[\s).,;:!?]|$)/g, '$1<em>$2</em>');
  const out = [];
  let list = null;
  for (const rawLine of src.split('\n')) {
    const line = rawLine.trimEnd();
    const bullet = line.match(/^\s*[-*]\s+(.*)$/);
    const numbered = line.match(/^\s*\d+\.\s+(.*)$/);
    if (bullet || numbered) {
      const want = bullet ? 'ul' : 'ol';
      if (list !== want) { if (list) out.push(`</${list}>`); out.push(`<${want}>`); list = want; }
      out.push(`<li>${inline((bullet || numbered)[1])}</li>`);
      continue;
    }
    if (list) { out.push(`</${list}>`); list = null; }
    if (line.trim()) out.push(`<p>${inline(line)}</p>`);
  }
  if (list) out.push(`</${list}>`);
  return out.join('\n');
}

function loadAll(sub) {
  const dir = join(SRC, sub);
  if (!existsSync(dir)) return [];
  return readdirSync(dir).filter(f => f.endsWith('.md')).map(f => {
    try {
      const doc = parseDoc(readFileSync(join(dir, f), 'utf8'));
      doc.meta.slug ||= f.replace(/\.md$/, '');
      return doc;
    } catch (e) { throw new Error(`${sub}/${f}: ${e.message}`); }
  });
}

const concepts = loadAll('concepts').sort((a, b) => a.meta.title.localeCompare(b.meta.title));
const incidents = loadAll('incidents').sort((a, b) => (b.meta.date || '').localeCompare(a.meta.date || ''));

const taughtBy = new Map();
for (const inc of incidents) {
  for (const slug of (inc.meta.concepts || '').split(',').map(s => s.trim()).filter(Boolean)) {
    if (!taughtBy.has(slug)) taughtBy.set(slug, []);
    taughtBy.get(slug).push(inc);
  }
}
const conceptBySlug = new Map(concepts.map(c => [c.meta.slug, c]));
for (const [slug, incs] of taughtBy) {
  if (!conceptBySlug.has(slug)) {
    throw new Error(`incident "${incs[0].meta.slug}" references unknown concept "${slug}"`);
  }
}

/**
 * LINT — the third operation in Karpathy's pattern, and the one that keeps a
 * compounding artifact from rotting. Ingest and Query grow a wiki; without Lint
 * it fills with orphan pages, dangling references and unproven claims that each
 * look fine alone. The hard part of a knowledge base was never the reading, it
 * is the bookkeeping — so the bookkeeping gets automated.
 */
function lint() {
  const problems = [], warnings = [];
  for (const c of concepts) {
    for (const f of ['title', 'slug', 'one_liner']) if (!c.meta[f]) problems.push(`concept ${c.meta.slug}: missing "${f}"`);
    if (!c.body.trim()) problems.push(`concept ${c.meta.slug}: empty body`);
    if (!(taughtBy.get(c.meta.slug) || []).length) warnings.push(`concept ${c.meta.slug}: ORPHAN — no incident references it`);
  }
  for (const i of incidents) {
    for (const f of ['title', 'slug', 'date', 'symptom', 'root_cause', 'fix', 'rule']) {
      if (!i.meta[f]) problems.push(`incident ${i.meta.slug}: missing "${f}"`);
    }
    if (!i.meta.verified) warnings.push(`incident ${i.meta.slug}: no "verified" field — unproven claim`);
    if (!(i.meta.concepts || '').trim()) warnings.push(`incident ${i.meta.slug}: names no concepts`);
    if (i.meta.date && !/^\d{4}-\d{2}-\d{2}$/.test(i.meta.date)) problems.push(`incident ${i.meta.slug}: date "${i.meta.date}" is not YYYY-MM-DD`);
    if (i.meta.slug && i.meta.date && !i.meta.slug.startsWith(i.meta.date)) warnings.push(`incident ${i.meta.slug}: slug does not start with its date`);
  }
  const seen = new Set();
  for (const d of [...concepts, ...incidents]) {
    if (seen.has(d.meta.slug)) problems.push(`duplicate slug: ${d.meta.slug}`);
    seen.add(d.meta.slug);
  }
  console.log(`\nlint: ${concepts.length} concepts, ${incidents.length} incidents\n`);
  for (const w of warnings) console.log(`  warn   ${w}`);
  for (const p of problems) console.log(`  ERROR  ${p}`);
  console.log(!warnings.length && !problems.length ? '  clean — nothing to fix\n' : '');
  return problems.length;
}
if (process.argv.includes('--lint')) process.exit(lint() ? 1 : 0);

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const fmtDate = d => {
  const [y, m, day] = (d || '').split('-');
  return y ? `${MONTHS[Number(m) - 1]} ${Number(day)}, ${y}` : '';
};
const pad = n => String(n).padStart(2, '0');
/** Chapters get roman numerals. A book convention, and it reads as an ordering
 *  rather than as a count — these are not steps, they are separate cases. */
const ROMAN = ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII','XIII','XIV','XV','XVI','XVII','XVIII','XIX','XX'];
const roman = n => ROMAN[n] || String(n + 1);

const BEATS = [
  { key: 'root_cause', label: 'Root cause', tag: 'What was actually happening',
    prompt: 'You are on call and this lands. Where do you look first?', cta: 'Show me what it really was' },
  { key: 'fix', label: 'The fix', tag: 'What changed',
    prompt: 'You have found it. What do you change — and what do you deliberately leave alone?', cta: 'Show me the fix' },
  { key: 'verified', label: 'Verified by', tag: 'Proof, not hope',
    prompt: 'It looks fixed. How would you prove it, without trusting the config?', cta: 'Show me the proof' },
  { key: 'rule', label: 'The rule this earned', tag: 'What generalises',
    prompt: 'Last one. What is the lesson that outlives this system?', cta: 'Show me the rule' },
];

const chapter = (inc, idx) => {
  const m = inc.meta;
  const linked = (m.concepts || '').split(',').map(s => s.trim()).filter(Boolean);
  const beats = BEATS.filter(b => m[b.key]);
  return `
      <article class="ch" id="${escAttr(m.slug)}" style="--d:${idx}">
        <h3 class="ch-h">
          <button class="ch-btn" type="button" aria-expanded="false" aria-controls="${escAttr(m.slug)}-body">
            <span class="ch-num">${roman(idx)}</span>
            <span class="ch-txt">
              <span class="ch-title">${esc(m.title)}</span>
              <span class="ch-sub">${esc(m.subtitle || '')}</span>
            </span>
            <span class="ch-side">
              <span class="ch-date">${esc(fmtDate(m.date))}</span>
              <span class="ch-leader" aria-hidden="true"></span>
              <span class="ch-open">Read<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg></span>
            </span>
          </button>
        </h3>

        <div class="ch-body" id="${escAttr(m.slug)}-body">
          <div class="ch-in">
            <div class="beat beat-open">
              <div class="beat-lbl"><span class="beat-n">i</span> Symptom <em>What it looked like from outside</em></div>
              <div class="beat-txt">${esc(m.symptom)}</div>
            </div>

${beats.map((b, bi) => `            <div class="gate" data-gate="${bi}">
              <p class="gate-q">${b.prompt}</p>
              <button class="gate-btn" type="button" aria-expanded="false" aria-controls="${escAttr(m.slug)}-b${bi}">
                <span>${b.cta}</span>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
              </button>
            </div>
            <div class="beat beat-shut${b.key === 'rule' ? ' beat-rule' : ''}" id="${escAttr(m.slug)}-b${bi}">
              <div class="beat-in">
                <div class="beat-lbl"><span class="beat-n">${'ii iii iv v vi'.split(' ')[bi] || bi + 2}</span> ${b.label} <em>${b.tag}</em></div>
                <div class="beat-txt">${esc(m[b.key])}</div>
              </div>
            </div>`).join('\n')}

            ${linked.length ? `<div class="linkrow">
              <span class="linkrow-lbl">Vocabulary earned</span>
              <span class="chips">${linked.map(s => `<a class="chip" href="#${escAttr(s)}">${esc(conceptBySlug.get(s).meta.title)}</a>`).join('')}</span>
            </div>` : ''}
          </div>
        </div>
      </article>`;
};

const conceptCard = (c, i) => {
  const taught = taughtBy.get(c.meta.slug) || [];
  return `
      <article class="term" id="${escAttr(c.meta.slug)}">
        <div class="term-num" aria-hidden="true">${pad(i + 1)}</div>
        <div class="term-body">
          <h3>${esc(c.meta.title)}</h3>
          ${c.meta.aka ? `<div class="aka">a.k.a. ${esc(c.meta.aka)}</div>` : ''}
          <p class="one-liner">${esc(c.meta.one_liner)}</p>
          <div class="prose">${md(c.body)}</div>
          ${taught.length ? `<div class="linkrow">
            <span class="linkrow-lbl">Learned the hard way in</span>
            <span class="chips">${taught.map(t => `<a class="chip" href="#${escAttr(t.meta.slug)}">${esc(fmtDate(t.meta.date))} · ${esc(t.meta.title)}</a>`).join('')}</span>
          </div>` : ''}
        </div>
      </article>`;
};

const jsonLd = {
  '@context': 'https://schema.org', '@type': 'DefinedTermSet',
  name: 'AI Ops Wiki — production engineering concepts', url: URL_SELF,
  description: 'Named reliability and AI-operations concepts, each defined in plain language and linked to the production incident that taught it.',
  hasDefinedTerm: concepts.map(c => ({
    '@type': 'DefinedTerm', name: c.meta.title, description: c.meta.one_liner, url: `${URL_SELF}#${c.meta.slug}`,
  })),
};
const authorLd = {
  '@context': 'https://schema.org', '@type': 'TechArticle',
  headline: 'AI Ops Wiki — concepts earned in production',
  author: {
    '@type': 'Person', name: 'Elena Revicheva', url: 'https://aideazz.xyz/portfolio',
    jobTitle: 'AI Engineer & Fractional CTO',
    sameAs: ['https://linkedin.com/in/elenarevicheva', 'https://github.com/ElenaRevicheva', 'https://x.com/reviceva', 'https://dev.to/elenarevicheva'],
  },
  dateModified: new Date().toISOString().slice(0, 10),
  publisher: { '@type': 'Organization', name: 'AIdeazz', url: 'https://aideazz.xyz' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': URL_SELF },
};

const totalBeats = incidents.reduce((n, i) => n + BEATS.filter(b => i.meta[b.key]).length, 0);

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="A field journal of real production outages, set as chapters: open one and work it a beat at a time — symptom, your guess, root cause, fix, proof. Then keep the vocabulary: single point of failure, silent failure, idempotency." />
  <meta name="color-scheme" content="light" />
  <title>AI Ops Wiki — a field journal of production failures | AIdeazz</title>
  <link rel="icon" href="/favicon.ico?v=3" sizes="any" />
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png?v=3" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=3" />
  <link rel="canonical" href="${URL_SELF}" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="AIdeazz" />
  <meta property="og:url" content="${URL_SELF}" />
  <meta property="og:title" content="AI Ops Wiki — a field journal of production failures" />
  <meta property="og:description" content="Real outages as chapters. Open one and work it a beat at a time — guess before you look." />
  <meta property="og:image" content="https://aideazz.xyz/og-image.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="AI Ops Wiki — a field journal of production failures" />
  <meta name="twitter:description" content="Real outages as chapters. Open one and work it a beat at a time — guess before you look." />
  <meta name="twitter:image" content="https://aideazz.xyz/og-image.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;0,9..144,900;1,9..144,600&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet" />

  <script type="application/ld+json">${JSON.stringify(authorLd)}</script>
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>

  <style>
    /* ── A press run with two plates: ink, and one spot colour ──────────
       Deliberately not the dark/violet-to-cyan/Inter palette every AI page
       ships with. Warm paper, true ink, vermilion for the one thing that
       matters on each spread, petrol for structure. */
    :root{
      --paper:#f3f0e7;
      --paper-2:#eae5d8;
      --paper-3:#e2dccb;
      --ink:#17160f;
      --ink-2:#403d33;
      --ink-3:#7d7969;
      --rule:rgba(23,22,15,.16);
      --rule-2:rgba(23,22,15,.09);
      --spot:#b3341a;          /* vermilion — the correction mark */
      --spot-soft:rgba(179,52,26,.09);
      --petrol:#1f4a58;
      --wash:rgba(214,190,120,.3);
      --mono:"IBM Plex Mono",ui-monospace,SFMono-Regular,Menlo,monospace;
      --disp:"Fraunces","Iowan Old Style",Georgia,serif;
      --body:"Newsreader",Georgia,"Times New Roman",serif;
    }
    *{box-sizing:border-box;}
    html{scroll-behavior:smooth;}
    body{margin:0;background:var(--paper);color:var(--ink);font-family:var(--body);
      font-size:18px;line-height:1.62;-webkit-font-smoothing:antialiased;overflow-x:hidden;
      background-image:
        radial-gradient(ellipse at 12% 4%, rgba(179,52,26,.045), transparent 42%),
        radial-gradient(ellipse at 88% 22%, rgba(31,74,88,.05), transparent 46%);
      background-attachment:fixed;}
    /* Laid-paper tooth: a faint fibre so the ground reads as stock, not as #fff. */
    body::before{content:"";position:fixed;inset:0;z-index:0;pointer-events:none;opacity:.5;
      background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='f'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23f)' opacity='.055'/%3E%3C/svg%3E");}
    a{color:var(--petrol);text-underline-offset:3px;text-decoration-thickness:1px;}
    a:hover{color:var(--spot);}

    .bar{position:sticky;top:0;z-index:50;background:rgba(243,240,231,.9);
      backdrop-filter:blur(10px);border-bottom:1px solid var(--rule);}
    .bar-in{max-width:940px;margin:0 auto;padding:9px 26px;display:flex;align-items:center;gap:14px;}
    .bar-lbl{font-family:var(--mono);font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--ink-3);white-space:nowrap;}
    .bar-track{flex:1;height:3px;background:var(--rule-2);overflow:hidden;}
    .bar-fill{display:block;height:100%;width:0%;background:var(--spot);transition:width .5s cubic-bezier(.2,.8,.2,1);}
    .bar-count{font-family:var(--mono);font-size:11.5px;color:var(--spot);white-space:nowrap;}

    .wrap{position:relative;z-index:1;max-width:940px;margin:0 auto;padding:0 26px 120px;}

    /* ── Masthead ─────────────────────────────────────────────────── */
    .mast{padding:74px 0 0;text-align:center;}
    .mast-kick{font-family:var(--mono);font-size:10.5px;letter-spacing:.34em;text-transform:uppercase;
      color:var(--ink-3);margin-bottom:26px;}
    h1.name{margin:0;font-family:var(--disp);font-weight:900;line-height:.82;
      font-variation-settings:"SOFT" 0,"WONK" 1;}
    .name-sm{display:block;font-size:clamp(19px,3.4vw,30px);font-weight:700;letter-spacing:.16em;
      text-transform:uppercase;color:var(--ink-2);margin-bottom:6px;}
    .name-lg{display:block;font-size:clamp(76px,19vw,196px);letter-spacing:-.015em;color:var(--ink);}
    .rules{margin:22px auto 14px;max-width:560px;}
    .rules span{display:block;background:var(--ink);height:2.5px;}
    .rules span+span{height:1px;margin-top:3px;background:var(--rule);}
    .mast-meta{font-family:var(--mono);font-size:10.5px;letter-spacing:.15em;text-transform:uppercase;
      color:var(--ink-3);margin-bottom:38px;}
    .mast-meta b{color:var(--spot);font-weight:500;}
    .tagline{font-family:var(--disp);font-weight:600;font-style:italic;
      font-size:clamp(26px,4.6vw,44px);line-height:1.08;letter-spacing:-.018em;
      margin:0 auto 22px;max-width:19ch;text-wrap:balance;}
    .lede{font-size:19px;color:var(--ink-2);max-width:56ch;margin:0 auto 15px;text-wrap:pretty;}
    .lede strong{font-weight:600;color:var(--ink);}
    /* Drop cap — the clearest "this is set type, not a dashboard" signal. */
    .lede.first::first-letter{font-family:var(--disp);font-weight:900;font-size:3.05em;
      float:left;line-height:.82;padding:5px 10px 0 0;color:var(--spot);}

    /* ── Plate: the pipeline, drawn as a schematic ─────────────────── */
    .plate{margin:46px 0 10px;border:1px solid var(--rule);background:rgba(255,255,255,.42);padding:22px 20px 14px;}
    .plate-cap{font-family:var(--mono);font-size:9.5px;letter-spacing:.2em;text-transform:uppercase;
      color:var(--ink-3);text-align:center;margin-bottom:18px;}
    .pipe-row{display:flex;align-items:center;}
    .node{flex:0 0 auto;display:flex;flex-direction:column;align-items:center;gap:8px;}
    .node-box{width:40px;height:40px;border:1.5px solid var(--ink);background:var(--paper);
      display:grid;place-items:center;color:var(--ink);}
    .node-lbl{font-family:var(--mono);font-size:8.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--ink-3);}
    .wire{flex:1;height:1.5px;background:var(--ink);position:relative;margin:0 5px 24px;overflow:hidden;}
    .wire::after{content:"";position:absolute;top:-2.5px;left:-16px;width:16px;height:6.5px;
      background:var(--petrol);animation:flow 2.6s linear infinite;}
    .wire.w2::after{animation-delay:.44s;}
    @keyframes flow{0%{transform:translateX(0);}55%,100%{transform:translateX(calc(100% + 32px));}}
    .node.dead .node-box{border-color:var(--spot);border-width:2px;color:var(--spot);
      animation:alarm 2.6s ease-out infinite;}
    .node.dead .node-lbl{color:var(--spot);}
    @keyframes alarm{0%{box-shadow:0 0 0 0 rgba(179,52,26,.35);}70%{box-shadow:0 0 0 11px rgba(179,52,26,0);}100%{box-shadow:0 0 0 0 rgba(179,52,26,0);}}
    .wire.dark{background:repeating-linear-gradient(90deg,var(--rule) 0 5px,transparent 5px 10px);}
    .wire.dark::after{display:none;}
    .plate-note{margin:14px 0 0;font-size:15px;color:var(--ink-3);text-align:center;font-style:italic;}
    .plate-note b{color:var(--spot);font-style:normal;font-weight:600;}

    /* ── Section heads ────────────────────────────────────────────── */
    .sec{margin-top:82px;}
    .sec-tag{font-family:var(--mono);font-size:10px;letter-spacing:.24em;text-transform:uppercase;
      color:var(--spot);margin-bottom:10px;}
    h2{font-family:var(--disp);font-weight:700;font-size:clamp(30px,5vw,46px);line-height:1.04;
      letter-spacing:-.022em;margin:0 0 10px;text-wrap:balance;}
    .sec-note{color:var(--ink-3);max-width:60ch;margin:0 0 8px;font-size:17px;text-wrap:pretty;}
    .sec-hr{height:2.5px;background:var(--ink);margin:20px 0 4px;}

    /* ── Table of contents: chapters ──────────────────────────────── */
    .ch{border-bottom:1px solid var(--rule);}
    .ch-h{margin:0;font-weight:400;}
    .ch-btn{width:100%;display:flex;align-items:baseline;gap:18px;text-align:left;cursor:pointer;
      background:none;border:0;padding:22px 6px;color:inherit;font:inherit;
      transition:background .3s,padding-left .3s;}
    .ch-btn:hover{background:var(--spot-soft);padding-left:14px;}
    .ch-btn:focus-visible{outline:2px solid var(--spot);outline-offset:-2px;}
    .ch-num{flex:0 0 auto;width:44px;font-family:var(--disp);font-weight:700;font-size:22px;
      color:var(--spot);letter-spacing:.02em;}
    .ch-txt{flex:1;min-width:0;}
    .ch-title{display:block;font-family:var(--disp);font-weight:700;font-size:clamp(21px,2.9vw,28px);
      line-height:1.16;letter-spacing:-.016em;text-wrap:balance;}
    .ch-sub{display:block;margin-top:5px;color:var(--ink-3);font-size:16px;text-wrap:pretty;}
    .ch-side{flex:0 0 auto;display:flex;align-items:center;gap:12px;}
    .ch-date{font-family:var(--mono);font-size:10.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-3);white-space:nowrap;}
    .ch-leader{width:34px;border-bottom:1.5px dotted var(--rule);}
    .ch-open{display:inline-flex;align-items:center;gap:5px;font-family:var(--mono);font-size:10.5px;
      letter-spacing:.14em;text-transform:uppercase;color:var(--spot);white-space:nowrap;}
    .ch-open svg{transition:transform .35s cubic-bezier(.2,.8,.2,1);}
    .ch.open .ch-open svg{transform:rotate(90deg);}
    .ch.open .ch-btn{background:var(--spot-soft);}
    .ch.open .ch-num{font-size:26px;}
    .ch.read .ch-num::after{content:"✓";font-family:var(--mono);font-size:11px;margin-left:5px;color:var(--petrol);}

    /* Chapter body — collapsed with CSS, text always in the DOM. */
    .ch-body{display:grid;grid-template-rows:0fr;
      transition:grid-template-rows .6s cubic-bezier(.2,.8,.2,1);}
    .ch-body>.ch-in{overflow:hidden;min-height:0;}
    .ch.open>.ch-body{grid-template-rows:1fr;}
    .ch-in>*:first-child{padding-top:8px;}
    .ch-in{padding-left:62px;padding-bottom:30px;}

    .beat-lbl{font-family:var(--mono);font-size:10px;letter-spacing:.18em;text-transform:uppercase;
      color:var(--petrol);margin-bottom:8px;display:flex;align-items:baseline;gap:9px;flex-wrap:wrap;}
    .beat-n{color:var(--spot);}
    .beat-lbl em{font-style:italic;text-transform:none;letter-spacing:0;font-size:13px;
      color:var(--ink-3);font-family:var(--body);}
    .beat-txt{color:var(--ink-2);font-size:17.5px;text-wrap:pretty;}
    .beat-open{padding-bottom:4px;}
    .beat-shut{display:grid;grid-template-rows:0fr;opacity:0;
      transition:grid-template-rows .55s cubic-bezier(.2,.8,.2,1),opacity .4s ease .06s;}
    .beat-shut>.beat-in{overflow:hidden;min-height:0;}
    .beat-shut.open{grid-template-rows:1fr;opacity:1;}
    .beat-rule.open .beat-txt{font-family:var(--disp);font-style:italic;font-weight:600;
      font-size:clamp(19px,2.4vw,23px);line-height:1.34;color:var(--ink);
      border-left:3px solid var(--spot);padding-left:20px;
      background:linear-gradient(var(--wash),var(--wash)) 0 88%/100% 34% no-repeat;}

    .gate{margin:20px 0 6px;padding:16px 18px;border-left:3px solid var(--spot);
      background:rgba(255,255,255,.5);}
    .gate.done{display:none;}
    .gate-q{margin:0 0 12px;font-style:italic;color:var(--ink-2);font-size:16.5px;text-wrap:pretty;}
    .gate-btn{display:inline-flex;align-items:center;gap:8px;cursor:pointer;font-family:var(--mono);
      font-size:11.5px;letter-spacing:.12em;text-transform:uppercase;font-weight:500;
      color:var(--paper);background:var(--ink);border:0;padding:11px 17px;
      transition:background .25s,transform .25s;}
    .gate-btn:hover{background:var(--spot);transform:translateY(-1px);}
    .gate-btn:focus-visible{outline:2px solid var(--spot);outline-offset:3px;}

    /* ── Appendix: vocabulary ─────────────────────────────────────── */
    .term{display:grid;grid-template-columns:64px 1fr;gap:10px;padding:34px 0;
      border-top:1px solid var(--rule);scroll-margin-top:72px;}
    .term-num{font-family:var(--mono);font-size:13px;color:var(--spot);padding-top:12px;letter-spacing:.1em;}
    .term h3{font-family:var(--disp);font-weight:700;font-size:clamp(23px,3vw,30px);
      letter-spacing:-.02em;margin:0 0 5px;line-height:1.14;text-wrap:balance;}
    .aka{font-family:var(--mono);font-size:11px;color:var(--ink-3);margin-bottom:15px;letter-spacing:.04em;}
    .one-liner{font-family:var(--disp);font-style:italic;font-weight:600;
      font-size:clamp(18px,2.3vw,22px);line-height:1.36;margin:0 0 18px;color:var(--ink);
      border-left:3px solid var(--spot);padding-left:18px;text-wrap:pretty;}
    .prose p{margin:0 0 13px;color:var(--ink-2);text-wrap:pretty;}
    .prose ul,.prose ol{margin:0 0 13px;padding-left:22px;color:var(--ink-2);}
    .prose li{margin-bottom:8px;}
    .prose strong{font-weight:600;color:var(--ink);}
    .prose em{font-style:italic;}

    .linkrow{margin-top:20px;padding-top:15px;border-top:1px solid var(--rule-2);
      display:flex;flex-wrap:wrap;gap:10px;align-items:baseline;}
    .linkrow-lbl{font-family:var(--mono);font-size:9.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--ink-3);}
    .chips{display:flex;flex-wrap:wrap;gap:7px;}
    .chip{display:inline-block;padding:5px 12px;font-family:var(--mono);font-size:11px;
      letter-spacing:.04em;background:var(--paper-2);border:1px solid var(--rule);
      color:var(--ink-2);text-decoration:none;transition:background .22s,border-color .22s,color .22s;}
    .chip:hover{background:var(--ink);color:var(--paper);border-color:var(--ink);}

    .colophon{margin-top:80px;border:1px solid var(--rule);border-top:3px solid var(--ink);
      padding:28px 30px;background:rgba(255,255,255,.42);}
    .colophon h3{font-family:var(--disp);font-weight:700;font-size:21px;margin:0 0 12px;}
    .colophon p{color:var(--ink-2);margin:0 0 11px;font-size:16.5px;text-wrap:pretty;}
    .colophon code{font-family:var(--mono);font-size:12.5px;background:var(--paper-3);padding:2px 6px;}
    footer{margin-top:44px;padding-top:22px;border-top:1px solid var(--rule);
      color:var(--ink-3);font-size:15px;display:flex;flex-wrap:wrap;gap:8px 20px;font-family:var(--mono);}
    footer{font-size:11px;letter-spacing:.08em;text-transform:uppercase;}

    /* No JS: every chapter and beat simply stands open. */
    .nojs .ch-body,.nojs .beat-shut{grid-template-rows:1fr;opacity:1;}
    .nojs .gate,.nojs .ch-open{display:none;}

    @media (prefers-reduced-motion: reduce){
      .wire::after,.node.dead .node-box{animation:none;}
      .ch-body,.beat-shut,.ch-btn{transition:none;} html{scroll-behavior:auto;}
    }
    @media (max-width:760px){
      body{font-size:17px;}
      .ch-btn{flex-wrap:wrap;gap:10px;padding:18px 4px;}
      .ch-num{width:32px;font-size:19px;}
      .ch-side{width:100%;padding-left:42px;} .ch-leader{flex:1;}
      .ch-in{padding-left:0;}
      .term{grid-template-columns:1fr;gap:0;} .term-num{padding-top:0;margin-bottom:6px;}
      .node-box{width:32px;height:32px;} .plate{padding:16px 10px 10px;}
      .bar-lbl{display:none;}
    }
    @media print{
      .bar,.gate,.plate{display:none;}
      .ch-body,.beat-shut{grid-template-rows:1fr;opacity:1;}
      body{background:#fff;font-size:11pt;}
    }
  </style>
</head>
<body class="nojs">
  <div class="bar">
    <div class="bar-in">
      <span class="bar-lbl">Reading progress</span>
      <span class="bar-track"><span class="bar-fill" id="barFill"></span></span>
      <span class="bar-count" id="barCount">0 / ${totalBeats}</span>
    </div>
  </div>

  <div class="wrap">
    <header class="mast">
      <div class="mast-kick">AIdeazz AI Lab · Panama · Field Journal</div>
      <h1 class="name"><span class="name-sm">AI Ops</span><span class="name-lg">WIKI</span></h1>
      <div class="rules"><span></span><span></span></div>
      <div class="mast-meta">Rev ${incidents.length + concepts.length} &nbsp;·&nbsp; ${incidents.length} chapters &nbsp;·&nbsp; ${concepts.length} entries &nbsp;·&nbsp; <b>${taughtBy.size} cross-references</b> &nbsp;·&nbsp; ${new Date().toISOString().slice(0, 10)}</div>
      <p class="tagline">Debug it with me.</p>
      <p class="lede first">Real outages on live production systems, set as chapters. Open one and it unfolds a beat at a time — the symptom, then your guess, then what was actually happening.</p>
      <p class="lede">Commit to an answer before you turn the page. That is the whole difference between reading a postmortem and keeping one.</p>

      <div class="plate" role="img" aria-label="Schematic: traffic flows through a pipeline until one node dies, after which everything downstream goes silent.">
        <div class="plate-cap">Plate I — a pipeline, mid-outage</div>
        <div class="pipe-row">
          <div class="node"><div class="node-box"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 6h16M4 12h16M4 18h10"/></svg></div><span class="node-lbl">Form</span></div>
          <div class="wire"></div>
          <div class="node"><div class="node-box"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="7"/><rect x="3" y="13" width="18" height="7"/></svg></div><span class="node-lbl">Server</span></div>
          <div class="wire w2"></div>
          <div class="node dead"><div class="node-box"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M15 9l-6 6M9 9l6 6"/></svg></div><span class="node-lbl">Vendor</span></div>
          <div class="wire dark"></div>
          <div class="node"><div class="node-box"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 5h16v14H4z"/><path d="M4 8h16"/></svg></div><span class="node-lbl">Draft</span></div>
          <div class="wire dark"></div>
          <div class="node"><div class="node-box"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 4L3 11l6 2 2 6z"/></svg></div><span class="node-lbl">You</span></div>
        </div>
        <p class="plate-note">Everything upstream still reports success. <b>Nothing downstream ever fires.</b></p>
      </div>
    </header>

    <section class="sec">
      <div class="sec-tag">Part One</div>
      <h2>Contents</h2>
      <p class="sec-note">Each chapter is one outage on a system that was live at the time, carrying real leads and real customers. Open the one you want. Numbers are verified from production logs, never from configuration — and no customer data, credentials, hostnames or internal identifiers appear anywhere in this journal.</p>
      <div class="sec-hr"></div>
${incidents.map(chapter).join('\n')}
    </section>

    <section class="sec">
      <div class="sec-tag">Part Two · Appendix</div>
      <h2>The vocabulary</h2>
      <p class="sec-note">Each entry is a failure mode with a name. The name is what lets you recognise the same shape somewhere new — a different stack, a different company — before it costs you a weekend.</p>
      <div class="sec-hr"></div>
${concepts.map(conceptCard).join('\n')}
    </section>

    <div class="colophon">
      <h3>Colophon</h3>
      <p>The durable copy of this journal is Markdown in the repository — one file per entry, one per chapter. The page you are reading is <em>generated</em> from those files by <code>node scripts/generate-ai-ops-wiki.mjs</code> and never hand-edited, so it cannot drift from its source. That is the single-source-of-truth rule in Part Two, applied to the journal itself.</p>
      <p>A chapter declares the entries it earned; the reverse reference is built at render time from that one declaration, so the two can never disagree. <code>--lint</code> checks the whole corpus for orphan entries, unproven claims and dangling references, and a reference to an entry that does not exist fails the build rather than shipping a dead link.</p>
      <p>Set in Fraunces, Newsreader and IBM Plex Mono.</p>
    </div>

    <footer>
      <span>Kept by <a href="https://aideazz.xyz/portfolio">Elena Revicheva</a></span>
      <span><a href="/sop-ai-ops.html">AI Ops Runbook</a></span>
      <span>Updated ${new Date().toISOString().slice(0, 10)}</span>
    </footer>
  </div>

  <script>
  (function(){
    document.body.classList.remove('nojs');
    var total = ${totalBeats}, opened = 0;
    var fill = document.getElementById('barFill'), count = document.getElementById('barCount');
    function tick(){ opened++; count.textContent = opened + ' / ' + total; fill.style.width = (opened/total*100) + '%'; }

    document.querySelectorAll('.ch').forEach(function(ch){
      var head  = ch.querySelector('.ch-btn');
      var gates = ch.querySelectorAll('.gate');
      var done  = 0;

      head.addEventListener('click', function(){
        var willOpen = !ch.classList.contains('open');
        ch.classList.toggle('open', willOpen);
        head.setAttribute('aria-expanded', String(willOpen));
        /* Closing a chapter you scrolled into can leave the viewport somewhere
           arbitrary further down the page. Pull the heading back to the top. */
        if (!willOpen) ch.scrollIntoView({block:'start', behavior:'smooth'});
      });

      gates.forEach(function(gate, i){
        var btn = gate.querySelector('.gate-btn');
        var panel = document.getElementById(btn.getAttribute('aria-controls'));
        btn.addEventListener('click', function(){
          panel.classList.add('open');
          btn.setAttribute('aria-expanded','true');
          gate.classList.add('done');
          done++; tick();
          if (done === gates.length) ch.classList.add('read');
        });
      });
    });

    /* A deep link or a cross-reference must never land on a folded chapter —
       the anchor would point at text the visitor cannot see. */
    function reveal(id){
      var el = document.getElementById(id);
      if (!el) return;
      var ch = el.closest ? el.closest('.ch') : null;
      if (ch && !ch.classList.contains('open')) ch.querySelector('.ch-btn').click();
      if (el.classList && el.classList.contains('ch')) {
        el.querySelectorAll('.gate:not(.done) .gate-btn').forEach(function(b){ b.click(); });
      }
    }
    window.addEventListener('hashchange', function(){ reveal(location.hash.slice(1)); });
    if (location.hash) reveal(location.hash.slice(1));
  })();
  </script>
</body>
</html>
`;

writeFileSync(OUT, html, 'utf8');
console.log(`ai-ops-wiki: ${incidents.length} chapters (${totalBeats} beats), ${concepts.length} entries, ${taughtBy.size} cross-referenced → public/ai-ops-wiki.html`);
