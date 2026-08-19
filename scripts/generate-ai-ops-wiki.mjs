#!/usr/bin/env node
/**
 * generate-ai-ops-wiki.mjs — render content/ai-ops-wiki/ into public/ai-ops-wiki.html
 *
 * The wiki is a COMPOUNDING artifact, in the sense Karpathy's LLM-wiki pattern
 * uses the word: the durable layer is plain Markdown in the repo, portable and
 * inspectable and diffable, and the HTML is a disposable view generated from it.
 * Every qualifying debugging session appends one incident file and, when it
 * earns one, one concept file. Nothing is hand-edited in the HTML, so the page
 * cannot drift away from its source — which is the whole point, and is itself
 * the single-source-of-truth rule this wiki documents.
 *
 * ── Why the page behaves like a session, not a document ─────────────────────
 * An incident printed in full is a report: the reader skims the conclusion and
 * learns nothing, because they never had to hold the problem in their head.
 * The same material released one beat at a time — symptom, then a pause to
 * guess, then cause, then fix, then proof — is a case. Retrieval practice is
 * the difference; committing to an answer before seeing it is what makes the
 * lesson stick, and it is why the reader reaches the rule already convinced.
 *
 * So: cases FIRST and folded shut, vocabulary SECOND and open. Experience
 * earns the name, rather than the name being asserted up front.
 *
 * Every word is present in the DOM at load — the beats are collapsed with CSS,
 * never injected — so answer engines and crawlers read the complete text. The
 * unfolding is presentation only, and the page degrades to a plain readable
 * document with JavaScript off (see the noscript rule).
 *
 * Usage:  node scripts/generate-ai-ops-wiki.mjs
 */

import { readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'content', 'ai-ops-wiki');
const OUT = join(ROOT, 'public', 'ai-ops-wiki.html');
const URL_SELF = 'https://aideazz.xyz/ai-ops-wiki.html';

/**
 * Minimal front-matter reader — no dependency on purpose.
 *
 * Values may run onto following lines (the incident prose fields are long), so
 * a line only starts a new key when it looks like `key: value` at column zero.
 */
function parseDoc(raw) {
  const text = raw.replace(/\r\n/g, '\n');
  const m = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) throw new Error('missing front-matter (check the closing --- line)');
  const meta = {};
  let key = null;
  for (const line of m[1].split('\n')) {
    const hit = line.match(/^([a-z_]+):\s?(.*)$/);
    if (hit) {
      key = hit[1];
      meta[key] = hit[2].trim();
    } else if (key && line.trim()) {
      meta[key] += ' ' + line.trim();
    }
  }
  return { meta, body: m[2].trim() };
}

const escAttr = s => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

/**
 * Escape, then apply the typographic fixes the source files need.
 *
 * The Markdown carries ASCII -- and straight quotes on purpose, so the durable
 * layer survives being edited anywhere without smart-quote mangling.
 * Prettifying belongs at render time, not in the source.
 */
const esc = s => escAttr(s)
  .replace(/(\s)--(\s)/g, '$1—$2')
  .replace(/(^|[\s(—])&quot;([^&]*?)&quot;/g, '$1“$2”');

/** Just enough Markdown for the concept bodies: bold, italic, lists, paragraphs. */
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
      if (list !== want) {
        if (list) out.push(`</${list}>`);
        out.push(`<${want}>`);
        list = want;
      }
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
  return readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .map(f => {
      try {
        const doc = parseDoc(readFileSync(join(dir, f), 'utf8'));
        doc.meta.slug ||= f.replace(/\.md$/, '');
        return doc;
      } catch (e) {
        throw new Error(`${sub}/${f}: ${e.message}`);
      }
    });
}

const concepts = loadAll('concepts').sort((a, b) => a.meta.title.localeCompare(b.meta.title));
const incidents = loadAll('incidents').sort((a, b) => (b.meta.date || '').localeCompare(a.meta.date || ''));

// Build the reverse edge: concept slug -> incidents that earned it.
const taughtBy = new Map();
for (const inc of incidents) {
  for (const slug of (inc.meta.concepts || '').split(',').map(s => s.trim()).filter(Boolean)) {
    if (!taughtBy.has(slug)) taughtBy.set(slug, []);
    taughtBy.get(slug).push(inc);
  }
}
const conceptBySlug = new Map(concepts.map(c => [c.meta.slug, c]));

// Fail loudly on a broken cross-reference rather than rendering a dead link.
for (const [slug, incs] of taughtBy) {
  if (!conceptBySlug.has(slug)) {
    throw new Error(`incident "${incs[0].meta.slug}" references unknown concept "${slug}"`);
  }
}

/**
 * LINT — the third operation in Karpathy's LLM-wiki pattern, and the one that
 * keeps a compounding artifact from quietly rotting.
 *
 * Ingest and Query grow the wiki; without Lint it accumulates orphan pages,
 * dangling references and half-filled entries that nobody notices because each
 * one looks fine on its own. His framing is the point: the hard part of a
 * knowledge base was never the reading or the thinking, it is the bookkeeping —
 * so the bookkeeping is what gets automated.
 *
 * Run: node scripts/generate-ai-ops-wiki.mjs --lint
 * Exits non-zero on a real defect, so it can gate a build or a commit hook.
 */
function lint() {
  const problems = [];
  const warnings = [];

  for (const c of concepts) {
    for (const f of ['title', 'slug', 'one_liner']) {
      if (!c.meta[f]) problems.push(`concept ${c.meta.slug}: missing "${f}"`);
    }
    if (!c.body.trim()) problems.push(`concept ${c.meta.slug}: empty body`);
    // An orphan concept is a definition nothing in this wiki actually earned.
    if (!(taughtBy.get(c.meta.slug) || []).length) {
      warnings.push(`concept ${c.meta.slug}: ORPHAN — no incident references it`);
    }
  }

  for (const i of incidents) {
    for (const f of ['title', 'slug', 'date', 'symptom', 'root_cause', 'fix', 'rule']) {
      if (!i.meta[f]) problems.push(`incident ${i.meta.slug}: missing "${f}"`);
    }
    if (!i.meta.verified) warnings.push(`incident ${i.meta.slug}: no "verified" field — unproven claim`);
    if (!(i.meta.concepts || '').trim()) warnings.push(`incident ${i.meta.slug}: names no concepts`);
    if (i.meta.date && !/^\d{4}-\d{2}-\d{2}$/.test(i.meta.date)) {
      problems.push(`incident ${i.meta.slug}: date "${i.meta.date}" is not YYYY-MM-DD`);
    }
    if (i.meta.slug && i.meta.date && !i.meta.slug.startsWith(i.meta.date)) {
      warnings.push(`incident ${i.meta.slug}: slug does not start with its date`);
    }
  }

  const seen = new Set();
  for (const d of [...concepts, ...incidents]) {
    if (seen.has(d.meta.slug)) problems.push(`duplicate slug: ${d.meta.slug}`);
    seen.add(d.meta.slug);
  }

  console.log(`\nlint: ${concepts.length} concepts, ${incidents.length} incidents\n`);
  for (const w of warnings) console.log(`  warn   ${w}`);
  for (const p of problems) console.log(`  ERROR  ${p}`);
  if (!warnings.length && !problems.length) console.log('  clean — nothing to fix\n');
  else console.log('');
  return problems.length;
}

if (process.argv.includes('--lint')) {
  process.exit(lint() ? 1 : 0);
}

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const fmtDate = d => {
  const [y, m, day] = (d || '').split('-');
  return y ? `${MONTHS[Number(m) - 1]} ${Number(day)}, ${y}` : '';
};
const pad = n => String(n).padStart(2, '0');

/**
 * The beats of a case, in the order a person actually debugs.
 *
 * `prompt` is the question the reader is asked to answer BEFORE the beat opens.
 * It is the whole pedagogical device: a guess made out loud is what turns
 * reading into learning, so every reveal button asks something specific rather
 * than saying "read more".
 */
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

const caseCard = (inc, idx) => {
  const m = inc.meta;
  const linked = (m.concepts || '').split(',').map(s => s.trim()).filter(Boolean);
  const beats = BEATS.filter(b => m[b.key]);
  return `
      <article class="case" id="${escAttr(m.slug)}" data-case="${idx}">
        <header class="case-head">
          <div class="case-meta">
            <span class="case-no">Case ${pad(idx + 1)}</span>
            <span class="case-date">${esc(fmtDate(m.date))}</span>
            <span class="case-dots" aria-hidden="true">${beats.map(() => '<i></i>').join('')}</span>
          </div>
          <h3>${esc(m.title)}</h3>
          <p class="case-sub">${esc(m.subtitle || '')}</p>
        </header>

        <div class="beat beat-open">
          <div class="beat-lbl"><span class="beat-n">01</span> Symptom <em>What it looked like from outside</em></div>
          <div class="beat-txt">${esc(m.symptom)}</div>
        </div>

${beats.map((b, bi) => `        <div class="gate" data-gate="${bi}">
          <p class="gate-q">${b.prompt}</p>
          <button class="gate-btn" type="button" aria-expanded="false" aria-controls="${escAttr(m.slug)}-b${bi}">
            <span>${b.cta}</span>
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
          </button>
        </div>
        <div class="beat beat-shut${b.key === 'rule' ? ' beat-rule' : ''}" id="${escAttr(m.slug)}-b${bi}">
          <div class="beat-in">
            <div class="beat-lbl"><span class="beat-n">${pad(bi + 2)}</span> ${b.label} <em>${b.tag}</em></div>
            <div class="beat-txt">${esc(m[b.key])}</div>
          </div>
        </div>`).join('\n')}

        ${linked.length ? `<div class="linkrow">
          <span class="linkrow-lbl">Vocabulary earned</span>
          <span class="chips">${linked.map(s => `<a class="chip" href="#${escAttr(s)}">${esc(conceptBySlug.get(s).meta.title)}</a>`).join('')}</span>
        </div>` : ''}
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

// DefinedTermSet is the schema answer engines read for a glossary; each concept
// is a DefinedTerm with its own anchor, so a definition can be cited directly.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTermSet',
  name: 'AI Ops Wiki — production engineering concepts',
  url: URL_SELF,
  description: 'Named reliability and AI-operations concepts, each defined in plain language and linked to the production incident that taught it.',
  hasDefinedTerm: concepts.map(c => ({
    '@type': 'DefinedTerm', name: c.meta.title, description: c.meta.one_liner,
    url: `${URL_SELF}#${c.meta.slug}`,
  })),
};
const authorLd = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
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
  <meta name="description" content="Work through real production outages one beat at a time: symptom, your guess, root cause, fix, proof. Then keep the vocabulary — single point of failure, silent failure, idempotency — named and defined." />
  <meta name="color-scheme" content="dark" />
  <title>AI Ops Wiki — debug it with me | AIdeazz</title>
  <link rel="icon" href="/favicon.ico?v=3" sizes="any" />
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png?v=3" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=3" />
  <link rel="canonical" href="${URL_SELF}" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="AIdeazz" />
  <meta property="og:url" content="${URL_SELF}" />
  <meta property="og:title" content="AI Ops Wiki — debug it with me" />
  <meta property="og:description" content="Real production outages, unfolded one beat at a time. Guess before you look." />
  <meta property="og:image" content="https://aideazz.xyz/og-image.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="AI Ops Wiki — debug it with me" />
  <meta name="twitter:description" content="Real production outages, unfolded one beat at a time. Guess before you look." />
  <meta name="twitter:image" content="https://aideazz.xyz/og-image.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,400;0,14..32,500;0,14..32,600&family=JetBrains+Mono:wght@450;500;600&family=Plus+Jakarta+Sans:ital,wght@0,600;0,700;0,800;1,700&display=swap" rel="stylesheet" />

  <script type="application/ld+json">${JSON.stringify(authorLd)}</script>
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>

  <style>
    @property --angle { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
    :root{
      --bg:#04050a; --ink:#eef0f7; --muted:#a6adc2; --dim:#6b7285;
      --line:rgba(255,255,255,.07); --line2:rgba(255,255,255,.14);
      --violet:#a48cff; --cyan:#2ee6d6; --amber:#ffb765; --red:#ff6b8a;
      --card:rgba(255,255,255,.03);
      --mono:"JetBrains Mono",ui-monospace,SFMono-Regular,Menlo,monospace;
      --display:"Plus Jakarta Sans",Inter,system-ui,sans-serif;
    }
    *{box-sizing:border-box;}
    html{scroll-behavior:smooth;}
    body{margin:0;background:var(--bg);color:var(--ink);
      font-family:Inter,system-ui,-apple-system,"Segoe UI",sans-serif;
      font-size:16.5px;line-height:1.68;-webkit-font-smoothing:antialiased;overflow-x:hidden;}
    a{color:var(--cyan);text-decoration:none;} a:hover{text-decoration:underline;}

    /* ── Ambience ──────────────────────────────────────────────── */
    .aurora{position:fixed;inset:-30vh -10vw;z-index:0;pointer-events:none;filter:blur(90px);opacity:.5;}
    .aurora i{position:absolute;display:block;border-radius:50%;}
    .aurora i:nth-child(1){width:52vw;height:52vw;left:-8vw;top:-6vh;background:radial-gradient(circle,rgba(164,140,255,.5),transparent 62%);}
    .aurora i:nth-child(2){width:44vw;height:44vw;right:-6vw;top:18vh;background:radial-gradient(circle,rgba(46,230,214,.3),transparent 62%);}
    .aurora i:nth-child(3){width:60vw;height:60vw;left:16vw;top:58vh;background:radial-gradient(circle,rgba(255,107,138,.16),transparent 64%);}
    .grain{position:fixed;inset:0;z-index:1;pointer-events:none;opacity:.15;mix-blend-mode:overlay;
      background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E");}

    /* ── Sticky session bar ────────────────────────────────────── */
    .bar{position:sticky;top:0;z-index:50;backdrop-filter:blur(14px);
      background:rgba(4,5,10,.72);border-bottom:1px solid var(--line);}
    .bar-in{max-width:1000px;margin:0 auto;padding:11px 24px;display:flex;align-items:center;gap:14px;}
    .bar-lbl{font-family:var(--mono);font-size:10.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--dim);white-space:nowrap;}
    .bar-track{flex:1;height:4px;border-radius:99px;background:rgba(255,255,255,.08);overflow:hidden;}
    .bar-fill{height:100%;width:0%;border-radius:99px;
      background:linear-gradient(90deg,var(--violet),var(--cyan));transition:width .5s cubic-bezier(.2,.8,.2,1);}
    .bar-count{font-family:var(--mono);font-size:12px;color:var(--cyan);white-space:nowrap;}

    .wrap{position:relative;z-index:2;max-width:1000px;margin:0 auto;padding:0 24px 120px;}

    /* ── Hero + live pipeline ──────────────────────────────────── */
    .hero{padding:76px 0 40px;}
    .kicker{display:inline-flex;align-items:center;gap:9px;font-family:var(--mono);font-size:11px;
      letter-spacing:.2em;text-transform:uppercase;color:var(--violet);
      border:1px solid rgba(164,140,255,.3);background:rgba(164,140,255,.07);
      padding:7px 14px;border-radius:999px;margin-bottom:24px;}
    .kicker b{width:6px;height:6px;border-radius:50%;background:var(--cyan);
      box-shadow:0 0 12px var(--cyan);animation:blip 2.6s ease-in-out infinite;}
    @keyframes blip{0%,100%{opacity:1;}50%{opacity:.3;}}
    /* ── Masthead ──────────────────────────────────────────────────
       A wiki should say its own name, the way a masthead does: the word
       carried large enough to be the identity of the page, with the running
       revision line underneath. That line is generated from the corpus, so it
       is never a decoration that can go stale — it counts what is actually
       in the repository. */
    h1.mast{margin:0;display:flex;align-items:baseline;gap:clamp(10px,2vw,20px);flex-wrap:wrap;}
    .mast-sm{font-family:var(--display);font-weight:700;letter-spacing:-.02em;
      font-size:clamp(24px,4.4vw,44px);color:var(--muted);}
    .mast-lg{font-family:var(--display);font-weight:800;
      font-size:clamp(52px,13vw,132px);line-height:.86;letter-spacing:.02em;
      background:linear-gradient(150deg,#fff 12%,#c9bcff 48%,#67e8dd 92%);
      -webkit-background-clip:text;background-clip:text;color:transparent;}
    .mast-rule{height:1px;margin:16px 0 12px;
      background:linear-gradient(90deg,rgba(164,140,255,.6),rgba(46,230,214,.35),transparent);}
    .mast-meta{font-family:var(--mono);font-size:11.5px;letter-spacing:.1em;
      text-transform:uppercase;color:var(--dim);margin-bottom:26px;}
    .tagline{font-family:var(--display);font-weight:700;font-style:italic;
      font-size:clamp(24px,4vw,38px);letter-spacing:-.022em;line-height:1.1;
      margin:0 0 20px;color:var(--ink);text-wrap:balance;}
    .lede{font-size:clamp(17px,2.1vw,20px);color:var(--muted);max-width:58ch;margin:0 0 16px;text-wrap:pretty;}
    .lede strong{color:var(--ink);font-weight:600;}

    /* The pipeline animation states the thesis before a word is read:
       traffic flows, one node dies, everything behind it silently stops. */
    .pipe{margin:34px 0 8px;border:1px solid var(--line);border-radius:16px;
      background:var(--card);padding:20px 18px 14px;backdrop-filter:blur(8px);}
    .pipe-cap{font-family:var(--mono);font-size:10px;letter-spacing:.15em;text-transform:uppercase;
      color:var(--dim);margin-bottom:14px;}
    .pipe-row{display:flex;align-items:center;gap:0;}
    .node{flex:0 0 auto;display:flex;flex-direction:column;align-items:center;gap:7px;}
    .node-box{width:38px;height:38px;border-radius:11px;border:1.5px solid var(--line2);
      background:rgba(255,255,255,.04);display:grid;place-items:center;color:var(--muted);}
    .node-lbl{font-family:var(--mono);font-size:9px;letter-spacing:.08em;text-transform:uppercase;color:var(--dim);}
    .wire{flex:1;height:1.5px;background:var(--line2);position:relative;margin:0 4px;margin-bottom:22px;overflow:hidden;}
    .wire::after{content:"";position:absolute;top:-2.5px;left:-14px;width:14px;height:6.5px;border-radius:99px;
      background:linear-gradient(90deg,transparent,var(--cyan));animation:flow 2.6s linear infinite;}
    .wire.w2::after{animation-delay:.42s;} .wire.w3::after{animation-delay:.84s;} .wire.w4::after{animation-delay:1.26s;}
    @keyframes flow{0%{transform:translateX(0);}55%{transform:translateX(calc(100% + 28px));}100%{transform:translateX(calc(100% + 28px));}}
    /* The dead node — and every wire downstream of it goes dark. */
    .node.dead .node-box{border-color:var(--red);color:var(--red);
      box-shadow:0 0 0 0 rgba(255,107,138,.5);animation:alarm 2.6s ease-out infinite;}
    .node.dead .node-lbl{color:var(--red);}
    @keyframes alarm{0%{box-shadow:0 0 0 0 rgba(255,107,138,.45);}70%{box-shadow:0 0 0 12px rgba(255,107,138,0);}100%{box-shadow:0 0 0 0 rgba(255,107,138,0);}}
    .wire.dark::after{background:linear-gradient(90deg,transparent,rgba(255,107,138,.35));animation:none;opacity:0;}
    .pipe-note{margin-top:12px;font-size:13.5px;color:var(--dim);text-align:center;}
    .pipe-note b{color:var(--red);font-weight:600;}

    .cta{display:inline-flex;align-items:center;gap:10px;margin-top:26px;padding:13px 22px;
      border-radius:999px;font-family:var(--display);font-weight:700;font-size:15.5px;
      color:#0b0713;background:linear-gradient(120deg,#c9bcff,#67e8dd);
      transition:transform .25s,box-shadow .25s;}
    .cta:hover{transform:translateY(-2px);text-decoration:none;box-shadow:0 12px 34px rgba(103,232,221,.22);}

    /* ── Section heads ─────────────────────────────────────────── */
    .sec{margin-top:88px;}
    .sec-tag{font-family:var(--mono);font-size:11px;letter-spacing:.2em;text-transform:uppercase;
      color:var(--cyan);margin-bottom:14px;display:flex;align-items:center;gap:12px;}
    .sec-tag::after{content:"";flex:1;height:1px;background:linear-gradient(90deg,rgba(46,230,214,.35),transparent);}
    h2{font-family:var(--display);font-weight:800;letter-spacing:-.028em;
      font-size:clamp(27px,4.4vw,40px);line-height:1.07;margin:0 0 14px;text-wrap:balance;}
    .sec-note{color:var(--muted);max-width:62ch;margin:0 0 42px;text-wrap:pretty;}

    /* ── A case ────────────────────────────────────────────────── */
    .case{border:1px solid var(--line);border-radius:22px;padding:30px 30px 24px;margin-bottom:26px;
      background:var(--card);backdrop-filter:blur(8px);scroll-margin-top:78px;
      transition:border-color .4s,box-shadow .4s;}
    .case.solved{border-color:rgba(46,230,214,.34);box-shadow:0 0 44px rgba(46,230,214,.07);}
    .case-meta{display:flex;align-items:center;gap:14px;margin-bottom:12px;flex-wrap:wrap;}
    .case-no{font-family:var(--mono);font-size:10.5px;letter-spacing:.18em;text-transform:uppercase;
      color:#0b0713;background:linear-gradient(120deg,#c9bcff,#67e8dd);padding:4px 10px;border-radius:99px;font-weight:600;}
    .case-date{font-family:var(--mono);font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--dim);}
    .case-dots{display:flex;gap:5px;margin-left:auto;}
    .case-dots i{width:7px;height:7px;border-radius:50%;background:rgba(255,255,255,.14);
      transition:background .4s,box-shadow .4s;}
    .case-dots i.lit{background:var(--cyan);box-shadow:0 0 9px rgba(46,230,214,.75);}
    .case h3{font-family:var(--display);font-weight:800;font-size:clamp(22px,3.1vw,30px);
      letter-spacing:-.024em;margin:0 0 8px;line-height:1.12;text-wrap:balance;}
    .case-sub{color:var(--muted);margin:0 0 24px;text-wrap:pretty;}

    .beat-lbl{font-family:var(--mono);font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;
      color:var(--amber);margin-bottom:9px;display:flex;align-items:baseline;gap:9px;flex-wrap:wrap;}
    .beat-n{color:var(--dim);}
    .beat-lbl em{font-style:normal;text-transform:none;letter-spacing:0;font-size:11.5px;color:var(--dim);font-family:Inter,sans-serif;}
    .beat-txt{color:#c9cfdf;font-size:15.8px;text-wrap:pretty;}
    .beat-open{padding-bottom:4px;}

    /* Collapsed beats keep their text in the DOM — 0fr→1fr animates height
       without measuring, and crawlers still read every word. */
    .beat-shut{display:grid;grid-template-rows:0fr;opacity:0;
      transition:grid-template-rows .55s cubic-bezier(.2,.8,.2,1),opacity .45s ease .06s;}
    .beat-shut>.beat-in{overflow:hidden;min-height:0;}
    .beat-shut.open{grid-template-rows:1fr;opacity:1;}
    .beat-shut .beat-in>*{padding-top:2px;}
    .beat-rule.open .beat-txt{font-family:var(--display);font-size:clamp(17px,2.2vw,20px);font-weight:600;
      font-style:italic;color:#d7cdff;padding-left:18px;border-left:2px solid var(--violet);line-height:1.45;}

    /* The gate — the question you answer before the beat opens. */
    .gate{margin:20px 0 4px;padding:17px 19px;border-radius:15px;
      border:1px dashed rgba(164,140,255,.3);background:rgba(164,140,255,.045);}
    .gate.done{display:none;}
    .gate-q{margin:0 0 13px;color:#cfc4ff;font-size:15px;font-style:italic;text-wrap:pretty;}
    .gate-btn{display:inline-flex;align-items:center;gap:9px;cursor:pointer;
      font-family:var(--display);font-weight:700;font-size:14.5px;color:#0b0713;
      background:linear-gradient(120deg,#c9bcff,#67e8dd);border:0;padding:10px 18px;border-radius:99px;
      transition:transform .22s,box-shadow .22s;}
    .gate-btn:hover{transform:translateY(-2px);box-shadow:0 10px 26px rgba(103,232,221,.2);}
    .gate-btn:focus-visible{outline:2px solid var(--cyan);outline-offset:3px;}
    .gate-btn svg{transition:transform .22s;}
    .gate-btn:hover svg{transform:translateY(2px);}

    /* ── Vocabulary ────────────────────────────────────────────── */
    .term{display:grid;grid-template-columns:70px 1fr;gap:8px;padding:34px 0;
      border-top:1px solid var(--line);scroll-margin-top:78px;}
    .term-num{font-family:var(--display);font-weight:800;font-size:36px;letter-spacing:-.03em;
      color:transparent;-webkit-text-stroke:1px rgba(164,140,255,.4);line-height:1;padding-top:4px;}
    .term h3{font-family:var(--display);font-weight:800;font-size:clamp(22px,3vw,29px);
      letter-spacing:-.024em;margin:0 0 6px;line-height:1.12;text-wrap:balance;}
    .aka{font-family:var(--mono);font-size:11.5px;color:var(--dim);margin-bottom:16px;}
    .one-liner{font-family:var(--display);font-size:clamp(16.5px,2.1vw,19.5px);font-weight:600;font-style:italic;
      color:#d7cdff;margin:0 0 18px;padding-left:17px;border-left:2px solid var(--violet);line-height:1.44;text-wrap:pretty;}
    .prose p{margin:0 0 13px;color:#c9cfdf;text-wrap:pretty;}
    .prose ul,.prose ol{margin:0 0 13px;padding-left:22px;color:#c9cfdf;}
    .prose li{margin-bottom:8px;}
    .prose strong{color:var(--ink);font-weight:600;} .prose em{color:#d7cdff;}

    .linkrow{margin-top:20px;padding-top:16px;border-top:1px solid var(--line);
      display:flex;flex-wrap:wrap;gap:10px;align-items:baseline;}
    .linkrow-lbl{font-family:var(--mono);font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--dim);}
    .chips{display:flex;flex-wrap:wrap;gap:8px;}
    .chip{display:inline-block;padding:6px 13px;border-radius:999px;font-size:12.6px;
      background:rgba(164,140,255,.09);border:1px solid rgba(164,140,255,.24);color:#cabfff;
      transition:background .24s,border-color .24s,transform .24s;}
    .chip:hover{background:rgba(164,140,255,.2);border-color:rgba(164,140,255,.5);transform:translateY(-1px);text-decoration:none;}

    .method{position:relative;margin-top:88px;border-radius:22px;padding:1px;overflow:hidden;
      background:conic-gradient(from var(--angle),rgba(164,140,255,.5),rgba(46,230,214,.5),rgba(255,183,101,.4),rgba(164,140,255,.5));
      animation:spin 14s linear infinite;}
    @keyframes spin{to{--angle:360deg;}}
    .method-in{border-radius:21px;background:#090a11;padding:28px 30px;}
    .method h3{font-family:var(--display);font-weight:700;font-size:19px;margin:0 0 11px;}
    .method p{color:var(--muted);margin:0 0 10px;font-size:15.4px;text-wrap:pretty;}
    .method code{font-family:var(--mono);font-size:12.8px;background:rgba(255,255,255,.06);padding:2px 7px;border-radius:6px;color:#cabfff;}
    footer{margin-top:56px;padding-top:24px;border-top:1px solid var(--line);
      color:var(--dim);font-size:14.5px;display:flex;flex-wrap:wrap;gap:8px 18px;}

    /* Without JS every beat is simply open — the page stays a full document. */
    .nojs .beat-shut{grid-template-rows:1fr;opacity:1;}
    .nojs .gate{display:none;}

    @media (prefers-reduced-motion: reduce){
      .aurora i,.kicker b,.method,.wire::after,.node.dead .node-box{animation:none;}
      .beat-shut{transition:none;} html{scroll-behavior:auto;}
    }
    @media (max-width:760px){
      .case{padding:24px 18px 20px;} .term{grid-template-columns:1fr;gap:0;}
      .term-num{font-size:28px;margin-bottom:8px;} .hero{padding:52px 0 30px;}
      .node-box{width:32px;height:32px;} .node-lbl{font-size:8px;} .pipe{padding:16px 12px 12px;}
      .bar-lbl{display:none;}
    }
  </style>
</head>
<body class="nojs">
  <div class="aurora" aria-hidden="true"><i></i><i></i><i></i></div>
  <div class="grain" aria-hidden="true"></div>

  <div class="bar">
    <div class="bar-in">
      <span class="bar-lbl">Session progress</span>
      <span class="bar-track"><span class="bar-fill" id="barFill"></span></span>
      <span class="bar-count" id="barCount">0 / ${totalBeats}</span>
    </div>
  </div>

  <div class="wrap">
    <header class="hero">
      <div class="kicker"><b></b> AIdeazz AI Lab · Field notes</div>
      <h1 class="mast">
        <span class="mast-sm">AI&nbsp;Ops</span>
        <span class="mast-lg">WIKI</span>
      </h1>
      <div class="mast-rule" aria-hidden="true"></div>
      <div class="mast-meta">Rev ${incidents.length + concepts.length} · ${incidents.length} cases · ${concepts.length} concepts · ${taughtBy.size} cross-links · updated ${new Date().toISOString().slice(0, 10)}</div>
      <p class="tagline">Debug it with me.</p>
      <p class="lede">Real outages on live production systems, unfolded <strong>one beat at a time</strong> — symptom first, then your guess, then what was actually happening.</p>
      <p class="lede">Commit to an answer before you open the next panel. That is the difference between reading a postmortem and keeping it.</p>

      <div class="pipe" role="img" aria-label="Diagram: traffic flows through a pipeline until one node dies, after which everything downstream goes silent.">
        <div class="pipe-cap">A pipeline, mid-outage</div>
        <div class="pipe-row">
          <div class="node"><div class="node-box"><svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 6h16M4 12h16M4 18h10"/></svg></div><span class="node-lbl">Form</span></div>
          <div class="wire"></div>
          <div class="node"><div class="node-box"><svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="4" width="18" height="7" rx="2"/><rect x="3" y="13" width="18" height="7" rx="2"/></svg></div><span class="node-lbl">Server</span></div>
          <div class="wire w2"></div>
          <div class="node dead"><div class="node-box"><svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M15 9l-6 6M9 9l6 6"/></svg></div><span class="node-lbl">Vendor</span></div>
          <div class="wire w3 dark"></div>
          <div class="node"><div class="node-box"><svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 5h16v14H4z"/><path d="M4 8h16"/></svg></div><span class="node-lbl">Draft</span></div>
          <div class="wire w4 dark"></div>
          <div class="node"><div class="node-box"><svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M21 4L3 11l6 2 2 6z"/></svg></div><span class="node-lbl">You</span></div>
        </div>
        <p class="pipe-note">Everything upstream still reports success. <b>Nothing downstream ever fires.</b></p>
      </div>

      <a class="cta" href="#${escAttr(incidents[0]?.meta.slug || '')}">Start with Case 01
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
    </header>

    <section class="sec">
      <div class="sec-tag">01 — The cases</div>
      <h2>Work them with me</h2>
      <p class="sec-note">Every one of these was live at the time, carrying real leads and real customers. Numbers are verified from production logs, never from configuration. No customer data, credentials, hostnames or internal identifiers appear anywhere on this page.</p>
${incidents.map(caseCard).join('\n')}
    </section>

    <section class="sec">
      <div class="sec-tag">02 — The vocabulary you just earned</div>
      <h2>Concepts</h2>
      <p class="sec-note">Each one is a failure mode with a name. The name is what lets you recognise the same shape somewhere new — in a different stack, a different company — before it costs you a weekend.</p>
${concepts.map(conceptCard).join('\n')}
    </section>

    <div class="method">
      <div class="method-in">
        <h3>How this page is maintained</h3>
        <p>The durable copy is Markdown in the repository — one file per concept, one per case. This page is <em>generated</em> from those files by <code>node scripts/generate-ai-ops-wiki.mjs</code>, and nothing here is hand-edited, so it cannot drift away from its source. That is the single-source-of-truth rule above, applied to the wiki itself.</p>
        <p>A case declares the concepts it earned; the reverse link is built at render time from that one declaration, so the two halves can never disagree. A reference to a concept that does not exist fails the build instead of shipping a dead link.</p>
      </div>
    </div>

    <footer>
      <span>Maintained by <a href="https://aideazz.xyz/portfolio">Elena Revicheva</a></span>
      <span>Part of the <a href="/sop-ai-ops.html">AI Ops Runbook</a></span>
      <span>Updated ${new Date().toISOString().slice(0, 10)}</span>
    </footer>
  </div>

  <script>
  (function(){
    document.body.classList.remove('nojs');
    var total = ${totalBeats}, opened = 0;
    var fill = document.getElementById('barFill'), count = document.getElementById('barCount');

    function tick(){
      opened++;
      count.textContent = opened + ' / ' + total;
      fill.style.width = (opened / total * 100) + '%';
    }

    document.querySelectorAll('.case').forEach(function(box){
      var gates = box.querySelectorAll('.gate');
      var dots  = box.querySelectorAll('.case-dots i');
      var done  = 0;
      gates.forEach(function(gate, i){
        var btn = gate.querySelector('.gate-btn');
        var panel = document.getElementById(btn.getAttribute('aria-controls'));
        btn.addEventListener('click', function(){
          panel.classList.add('open');
          btn.setAttribute('aria-expanded','true');
          gate.classList.add('done');
          if (dots[i]) dots[i].classList.add('lit');
          done++; tick();
          if (done === gates.length) box.classList.add('solved');
        });
      });
    });

    /* Deep links and in-page chips must not land on a folded case — open it
       fully, otherwise the anchor points at text the visitor cannot see. */
    function openAll(box){
      if(!box || !box.classList.contains('case')) return;
      box.querySelectorAll('.gate:not(.done) .gate-btn').forEach(function(b){ b.click(); });
    }
    window.addEventListener('hashchange', function(){ openAll(document.getElementById(location.hash.slice(1))); });
    if (location.hash) openAll(document.getElementById(location.hash.slice(1)));
  })();
  </script>
</body>
</html>
`;

writeFileSync(OUT, html, 'utf8');
console.log(`ai-ops-wiki: ${incidents.length} cases (${totalBeats} beats), ${concepts.length} concepts, ${taughtBy.size} cross-linked → public/ai-ops-wiki.html`);
