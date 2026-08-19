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
 * Layers, deliberately separate:
 *   concepts/   the named idea, defined once, in plain words
 *   incidents/  what actually happened, with dates and verified numbers
 *
 * They link BOTH ways. An incident lists the concepts it earned; each concept is
 * rendered with the incidents that taught it. That bidirectional edge is built
 * here at render time from a single declaration in the incident's front-matter,
 * so the two halves can never disagree.
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

const esc = s => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

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

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const fmtDate = d => {
  const [y, m, day] = (d || '').split('-');
  return y ? `${MONTHS[Number(m) - 1]} ${Number(day)}, ${y}` : '';
};
const shortDate = d => {
  const [y, m, day] = (d || '').split('-');
  return y ? `${MONTHS[Number(m) - 1].slice(0, 3).toUpperCase()} ${Number(day)}` : '';
};
const year = d => (d || '').split('-')[0] || '';

const ROWS = [
  ['symptom', 'Symptom', 'What it looked like from outside'],
  ['root_cause', 'Root cause', 'What was actually happening'],
  ['fix', 'Fix applied', 'What changed'],
  ['verified', 'Verified by', 'Proof it worked'],
  ['rule', 'Rule earned', 'What generalises'],
];

const pad = n => String(n).padStart(2, '0');

/** Bento tile for the concept index at the top. */
const conceptTile = (c, i) => `
        <a class="tile reveal" href="#${esc(c.meta.slug)}" style="--i:${i}">
          <span class="tile-num">${pad(i + 1)}</span>
          <span class="tile-title">${esc(c.meta.title)}</span>
          <span class="tile-line">${esc(c.meta.one_liner)}</span>
          <span class="tile-meta">${(taughtBy.get(c.meta.slug) || []).length} incident${(taughtBy.get(c.meta.slug) || []).length === 1 ? '' : 's'}</span>
        </a>`;

const conceptCard = (c, i) => {
  const taught = taughtBy.get(c.meta.slug) || [];
  return `
      <article class="entry reveal" id="${esc(c.meta.slug)}">
        <div class="entry-num" aria-hidden="true">${pad(i + 1)}</div>
        <div class="entry-body">
          <h3>${esc(c.meta.title)}</h3>
          ${c.meta.aka ? `<div class="aka">a.k.a. ${esc(c.meta.aka)}</div>` : ''}
          <p class="one-liner">${esc(c.meta.one_liner)}</p>
          <div class="prose">${md(c.body)}</div>
          ${taught.length ? `<div class="linkrow">
            <span class="linkrow-lbl">Learned the hard way in</span>
            <span class="chips">${taught.map(t => `<a class="chip" href="#${esc(t.meta.slug)}">${esc(shortDate(t.meta.date))} ${esc(year(t.meta.date))} · ${esc(t.meta.title)}</a>`).join('')}</span>
          </div>` : ''}
        </div>
      </article>`;
};

const incidentCard = i => {
  const linked = (i.meta.concepts || '').split(',').map(s => s.trim()).filter(Boolean);
  return `
      <article class="incident reveal" id="${esc(i.meta.slug)}">
        <div class="inc-spine" aria-hidden="true"><span class="inc-dot"></span></div>
        <div class="inc-body">
          <div class="inc-date">${esc(fmtDate(i.meta.date))}</div>
          <h3>${esc(i.meta.title)}</h3>
          <p class="inc-sub">${esc(i.meta.subtitle || '')}</p>
          <dl class="inc-rows">
            ${ROWS.filter(([k]) => i.meta[k]).map(([k, label, hint]) => `
            <div class="inc-row">
              <dt><span class="row-lbl">${label}</span><span class="row-hint">${hint}</span></dt>
              <dd>${esc(i.meta[k])}</dd>
            </div>`).join('')}
          </dl>
          ${linked.length ? `<div class="linkrow">
            <span class="linkrow-lbl">Concepts</span>
            <span class="chips">${linked.map(s => `<a class="chip" href="#${esc(s)}">${esc(conceptBySlug.get(s).meta.title)}</a>`).join('')}</span>
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
    '@type': 'DefinedTerm',
    name: c.meta.title,
    description: c.meta.one_liner,
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

const lastUpdated = incidents[0]?.meta.date || new Date().toISOString().slice(0, 10);

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="A working engineer's field notes: named reliability concepts — single point of failure, silent failure, idempotency — each defined in plain language and linked to the real production incident that taught it." />
  <meta name="color-scheme" content="dark" />
  <title>AI Ops Wiki — concepts earned in production | AIdeazz</title>
  <link rel="icon" href="/favicon.ico?v=3" sizes="any" />
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png?v=3" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=3" />
  <link rel="canonical" href="${URL_SELF}" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="AIdeazz" />
  <meta property="og:url" content="${URL_SELF}" />
  <meta property="og:title" content="AI Ops Wiki — concepts earned in production" />
  <meta property="og:description" content="Every entry here cost an outage. Named reliability concepts, defined in plain language, linked to the incident that taught them." />
  <meta property="og:image" content="https://aideazz.xyz/og-image.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="AI Ops Wiki — concepts earned in production" />
  <meta name="twitter:description" content="Named reliability concepts, defined in plain language, linked to the real incident that taught them." />
  <meta name="twitter:image" content="https://aideazz.xyz/og-image.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,400;0,14..32,500;0,14..32,600&family=JetBrains+Mono:wght@450;500;600&family=Plus+Jakarta+Sans:ital,wght@0,600;0,700;0,800;1,700&display=swap" rel="stylesheet" />

  <script type="application/ld+json">${JSON.stringify(authorLd)}</script>
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>

  <style>
    @property --angle { syntax: '<angle>'; initial-value: 0deg; inherits: false; }

    :root{
      --bg:#050609;
      --ink:#eef0f7;
      --muted:#a6adc2;
      --dim:#6b7285;
      --line:rgba(255,255,255,.07);
      --line-2:rgba(255,255,255,.13);
      --violet:#a48cff;
      --cyan:#2ee6d6;
      --amber:#ffb765;
      --card:rgba(255,255,255,.028);
      --mono:"JetBrains Mono",ui-monospace,SFMono-Regular,Menlo,monospace;
      --display:"Plus Jakarta Sans",Inter,system-ui,sans-serif;
    }
    *{box-sizing:border-box;}
    html{scroll-behavior:smooth;}
    body{
      margin:0;background:var(--bg);color:var(--ink);
      font-family:Inter,system-ui,-apple-system,"Segoe UI",sans-serif;
      font-size:16.5px;line-height:1.68;-webkit-font-smoothing:antialiased;
      overflow-x:hidden;
    }

    /* ── Aurora field ─────────────────────────────────────────────
       Three oversized blurred radials. Fixed, so the page scrolls
       over a light source rather than dragging a texture with it. */
    .aurora{position:fixed;inset:-30vh -10vw;z-index:0;pointer-events:none;filter:blur(90px);opacity:.55;}
    .aurora i{position:absolute;display:block;border-radius:50%;}
    .aurora i:nth-child(1){width:52vw;height:52vw;left:-8vw;top:-6vh;
      background:radial-gradient(circle,rgba(164,140,255,.55),transparent 62%);}
    .aurora i:nth-child(2){width:44vw;height:44vw;right:-6vw;top:14vh;
      background:radial-gradient(circle,rgba(46,230,214,.34),transparent 62%);}
    .aurora i:nth-child(3){width:60vw;height:60vw;left:14vw;top:52vh;
      background:radial-gradient(circle,rgba(255,120,180,.20),transparent 64%);}
    /* Fine grain over the gradients so they read as film, not as banding. */
    .grain{position:fixed;inset:0;z-index:1;pointer-events:none;opacity:.16;mix-blend-mode:overlay;
      background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E");}

    /* Scroll progress — CSS scroll-driven, no JS. */
    .progress{position:fixed;top:0;left:0;height:2px;z-index:60;width:100%;transform-origin:0 50%;
      background:linear-gradient(90deg,var(--violet),var(--cyan));transform:scaleX(0);}
    @supports (animation-timeline: scroll()){
      .progress{animation:grow linear both;animation-timeline:scroll(root block);}
      @keyframes grow{to{transform:scaleX(1);}}
    }

    .wrap{position:relative;z-index:2;max-width:1080px;margin:0 auto;padding:0 24px 120px;}

    /* ── Hero ─────────────────────────────────────────────────── */
    .hero{padding:92px 0 54px;}
    .kicker{display:inline-flex;align-items:center;gap:9px;font-family:var(--mono);font-size:11px;
      letter-spacing:.2em;text-transform:uppercase;color:var(--violet);
      border:1px solid rgba(164,140,255,.3);background:rgba(164,140,255,.07);
      padding:7px 14px;border-radius:999px;margin-bottom:26px;}
    .kicker b{width:6px;height:6px;border-radius:50%;background:var(--cyan);
      box-shadow:0 0 12px var(--cyan);animation:pulse 2.6s ease-in-out infinite;}
    @keyframes pulse{0%,100%{opacity:1;}50%{opacity:.35;}}
    h1{font-family:var(--display);font-weight:800;letter-spacing:-.035em;
      font-size:clamp(44px,8.5vw,86px);line-height:.96;margin:0 0 24px;text-wrap:balance;
      background:linear-gradient(150deg,#fff 18%,#c9bcff 52%,#67e8dd 92%);
      -webkit-background-clip:text;background-clip:text;color:transparent;}
    .lede{font-size:clamp(17px,2.1vw,21px);color:var(--muted);max-width:60ch;margin:0 0 18px;
      text-wrap:pretty;}
    .lede strong{color:var(--ink);font-weight:600;}

    .stats{display:flex;flex-wrap:wrap;gap:10px;margin-top:34px;}
    .stat{border:1px solid var(--line);background:var(--card);border-radius:14px;
      padding:14px 20px;backdrop-filter:blur(8px);}
    .stat b{display:block;font-family:var(--display);font-size:27px;font-weight:800;
      letter-spacing:-.02em;line-height:1.1;
      background:linear-gradient(140deg,#fff,#a48cff);-webkit-background-clip:text;background-clip:text;color:transparent;}
    .stat span{font-family:var(--mono);font-size:10.5px;letter-spacing:.14em;
      text-transform:uppercase;color:var(--dim);}

    /* ── Section headers ──────────────────────────────────────── */
    .sec{margin-top:104px;}
    .sec-tag{font-family:var(--mono);font-size:11px;letter-spacing:.2em;text-transform:uppercase;
      color:var(--cyan);margin-bottom:14px;display:flex;align-items:center;gap:12px;}
    .sec-tag::after{content:"";flex:1;height:1px;
      background:linear-gradient(90deg,rgba(46,230,214,.35),transparent);}
    h2{font-family:var(--display);font-weight:800;letter-spacing:-.028em;
      font-size:clamp(28px,4.6vw,44px);line-height:1.06;margin:0 0 14px;text-wrap:balance;}
    .sec-note{color:var(--muted);max-width:62ch;margin:0 0 40px;font-size:16.5px;text-wrap:pretty;}

    /* ── Bento index ──────────────────────────────────────────── */
    .bento{display:grid;grid-template-columns:repeat(auto-fill,minmax(238px,1fr));gap:14px;margin-bottom:26px;}
    .tile{position:relative;display:flex;flex-direction:column;gap:7px;overflow:hidden;
      border:1px solid var(--line);border-radius:18px;padding:20px 20px 17px;
      background:var(--card);text-decoration:none;color:inherit;backdrop-filter:blur(8px);
      transition:transform .32s cubic-bezier(.2,.8,.2,1),border-color .32s,background .32s;}
    .tile:hover{transform:translateY(-5px);border-color:rgba(164,140,255,.42);
      background:rgba(164,140,255,.07);}
    .tile-num{font-family:var(--mono);font-size:10.5px;letter-spacing:.16em;color:var(--violet);}
    .tile-title{font-family:var(--display);font-weight:700;font-size:17.5px;letter-spacing:-.012em;
      line-height:1.22;}
    .tile-line{color:var(--muted);font-size:13.8px;line-height:1.5;}
    .tile-meta{margin-top:auto;padding-top:9px;font-family:var(--mono);font-size:10px;
      letter-spacing:.13em;text-transform:uppercase;color:var(--dim);}

    /* ── Concept entries ──────────────────────────────────────── */
    .entry{display:grid;grid-template-columns:74px 1fr;gap:8px;padding:36px 0;
      border-top:1px solid var(--line);scroll-margin-top:32px;}
    .entry-num{font-family:var(--display);font-weight:800;font-size:38px;letter-spacing:-.03em;
      color:transparent;-webkit-text-stroke:1px rgba(164,140,255,.42);line-height:1;padding-top:3px;}
    .entry h3{font-family:var(--display);font-weight:800;font-size:clamp(23px,3.2vw,31px);
      letter-spacing:-.024em;margin:0 0 6px;line-height:1.12;text-wrap:balance;}
    .aka{font-family:var(--mono);font-size:11.5px;color:var(--dim);margin-bottom:18px;}
    .one-liner{font-family:var(--display);font-size:clamp(17px,2.2vw,20.5px);font-weight:600;
      font-style:italic;color:#d7cdff;margin:0 0 20px;padding-left:18px;
      border-left:2px solid var(--violet);line-height:1.44;text-wrap:pretty;}
    .prose p{margin:0 0 14px;color:#c6ccdc;text-wrap:pretty;}
    .prose ul,.prose ol{margin:0 0 14px;padding-left:22px;color:#c6ccdc;}
    .prose li{margin-bottom:9px;}
    .prose strong{color:var(--ink);font-weight:600;}
    .prose em{color:#d7cdff;}

    /* ── Incident timeline ────────────────────────────────────── */
    .incident{display:grid;grid-template-columns:34px 1fr;gap:18px;scroll-margin-top:32px;}
    .inc-spine{position:relative;}
    .inc-spine::before{content:"";position:absolute;left:15px;top:0;bottom:-34px;width:1px;
      background:linear-gradient(180deg,rgba(46,230,214,.42),rgba(46,230,214,.05));}
    .incident:last-child .inc-spine::before{bottom:auto;height:38px;}
    .inc-dot{position:absolute;left:9px;top:30px;width:13px;height:13px;border-radius:50%;
      background:var(--bg);border:2px solid var(--cyan);box-shadow:0 0 16px rgba(46,230,214,.55);}
    .inc-body{border:1px solid var(--line);border-radius:20px;padding:26px 26px 22px;
      margin-bottom:22px;background:var(--card);backdrop-filter:blur(8px);
      transition:border-color .3s;}
    .inc-body:hover{border-color:var(--line-2);}
    .inc-date{font-family:var(--mono);font-size:11px;letter-spacing:.16em;text-transform:uppercase;
      color:var(--cyan);margin-bottom:9px;}
    .incident h3{font-family:var(--display);font-weight:800;font-size:clamp(21px,2.9vw,28px);
      letter-spacing:-.022em;margin:0 0 8px;line-height:1.14;text-wrap:balance;}
    .inc-sub{color:var(--muted);margin:0 0 22px;font-size:16px;text-wrap:pretty;}
    .inc-rows{margin:0;}
    .inc-row{display:grid;grid-template-columns:168px 1fr;gap:20px;padding:15px 0;
      border-top:1px solid var(--line);}
    .inc-row dt{padding-top:2px;}
    .row-lbl{display:block;font-family:var(--mono);font-size:11px;letter-spacing:.13em;
      text-transform:uppercase;color:var(--amber);}
    .row-hint{display:block;font-size:11.5px;color:var(--dim);margin-top:3px;line-height:1.4;}
    .inc-row dd{margin:0;color:#c6ccdc;font-size:15.6px;text-wrap:pretty;}

    /* ── Cross-links ──────────────────────────────────────────── */
    .linkrow{margin-top:22px;padding-top:17px;border-top:1px solid var(--line);
      display:flex;flex-wrap:wrap;gap:11px;align-items:baseline;}
    .linkrow-lbl{font-family:var(--mono);font-size:10.5px;letter-spacing:.14em;
      text-transform:uppercase;color:var(--dim);}
    .chips{display:flex;flex-wrap:wrap;gap:8px;}
    .chip{display:inline-block;padding:6px 13px;border-radius:999px;font-size:12.6px;
      background:rgba(164,140,255,.09);border:1px solid rgba(164,140,255,.24);
      color:#cabfff;text-decoration:none;transition:background .24s,border-color .24s,transform .24s;}
    .chip:hover{background:rgba(164,140,255,.2);border-color:rgba(164,140,255,.5);transform:translateY(-1px);}

    /* ── Method + footer ──────────────────────────────────────── */
    .method{position:relative;margin-top:96px;border-radius:22px;padding:1px;overflow:hidden;
      background:conic-gradient(from var(--angle),rgba(164,140,255,.5),rgba(46,230,214,.5),rgba(255,183,101,.4),rgba(164,140,255,.5));
      animation:spin 14s linear infinite;}
    @keyframes spin{to{--angle:360deg;}}
    .method-in{border-radius:21px;background:#0a0b12;padding:30px 32px;}
    .method h3{font-family:var(--display);font-weight:700;font-size:20px;margin:0 0 12px;letter-spacing:-.015em;}
    .method p{color:var(--muted);margin:0 0 11px;font-size:15.6px;text-wrap:pretty;}
    .method code{font-family:var(--mono);font-size:13px;background:rgba(255,255,255,.06);
      padding:2px 7px;border-radius:6px;color:#cabfff;}
    footer{margin-top:64px;padding-top:26px;border-top:1px solid var(--line);
      color:var(--dim);font-size:14.5px;display:flex;flex-wrap:wrap;gap:8px 18px;}
    a{color:var(--cyan);text-decoration:none;}
    a:hover{text-decoration:underline;}

    /* ── Scroll-driven reveal, progressively enhanced ──────────────
       TRANSFORM ONLY — deliberately never opacity.

       The first cut faded these in from opacity:0 along a ViewTimeline and
       the tiles rendered BLANK in production: the animation sat at 9% of its
       range while getComputedStyle reported opacity "1", so the text painted
       at ~0.09 while DOM inspection insisted everything was fine. A
       decoration had silently eaten the content, which is the exact failure
       this wiki is about.

       So legibility is not allowed to depend on an animation resolving
       correctly. If the timeline misbehaves now, the worst case is an element
       resting a few pixels low — never an invisible one. */
    @supports (animation-timeline: view()){
      @media (prefers-reduced-motion: no-preference){
        .reveal{animation:rise linear both;animation-timeline:view();
          animation-range:entry 0% cover 26%;}
        @keyframes rise{from{transform:translateY(22px);}to{transform:none;}}
      }
    }
    @media (prefers-reduced-motion: reduce){
      .aurora i,.kicker b,.method{animation:none;}
      html{scroll-behavior:auto;}
    }

    @media (max-width:760px){
      .entry{grid-template-columns:1fr;gap:0;}
      .entry-num{font-size:30px;margin-bottom:8px;}
      .inc-row{grid-template-columns:1fr;gap:5px;}
      .row-hint{display:none;}
      .incident{grid-template-columns:20px 1fr;gap:12px;}
      .inc-spine::before{left:8px;} .inc-dot{left:2px;}
      .inc-body{padding:22px 18px 18px;}
      .hero{padding:64px 0 40px;}
    }
  </style>
</head>
<body>
  <div class="progress" aria-hidden="true"></div>
  <div class="aurora" aria-hidden="true"><i></i><i></i><i></i></div>
  <div class="grain" aria-hidden="true"></div>

  <div class="wrap">
    <header class="hero">
      <div class="kicker"><b></b> AIdeazz AI Lab · Field notes</div>
      <h1>Every entry here cost an outage.</h1>
      <p class="lede">Reliability concepts named in plain language, each linked to the <strong>real production incident</strong> that taught it — on systems that were live at the time, carrying real leads and real customers.</p>
      <p class="lede">No textbook examples. Dates, numbers and log lines, verified from production rather than from configuration.</p>
      <div class="stats">
        <div class="stat"><b>${concepts.length}</b><span>Concepts</span></div>
        <div class="stat"><b>${incidents.length}</b><span>Incidents</span></div>
        <div class="stat"><b>${taughtBy.size}</b><span>Cross-linked</span></div>
        <div class="stat"><b>${lastUpdated}</b><span>Last entry</span></div>
      </div>
    </header>

    <section class="sec">
      <div class="sec-tag">01 — The vocabulary</div>
      <h2>Concepts</h2>
      <p class="sec-note">Each one is a failure mode with a name. The name is what makes it possible to recognise the same shape somewhere new, before it costs you a weekend.</p>
      <div class="bento">${concepts.map(conceptTile).join('')}
      </div>
${concepts.map(conceptCard).join('\n')}
    </section>

    <section class="sec">
      <div class="sec-tag">02 — The receipts</div>
      <h2>Incidents</h2>
      <p class="sec-note">What actually happened, with the numbers verified from production logs. No customer data, credentials, hostnames or internal record identifiers appear anywhere on this page.</p>
${incidents.map(incidentCard).join('\n')}
    </section>

    <div class="method">
      <div class="method-in">
        <h3>How this page is maintained</h3>
        <p>The durable copy is Markdown in the repository — one file per concept, one per incident. This page is <em>generated</em> from those files by <code>node scripts/generate-ai-ops-wiki.mjs</code>, and nothing here is hand-edited, so the page cannot drift away from its source. That is the single-source-of-truth rule below, applied to the wiki itself.</p>
        <p>An incident declares the concepts it earned; the reverse link is built at render time from that one declaration, so the two halves can never disagree. A reference to a concept that does not exist fails the build instead of shipping a dead link.</p>
      </div>
    </div>

    <footer>
      <span>Maintained by <a href="https://aideazz.xyz/portfolio">Elena Revicheva</a></span>
      <span>Part of the <a href="/sop-ai-ops.html">AI Ops Runbook</a></span>
      <span>Updated ${new Date().toISOString().slice(0, 10)}</span>
    </footer>
  </div>
</body>
</html>
`;

writeFileSync(OUT, html, 'utf8');
console.log(`ai-ops-wiki: ${concepts.length} concepts, ${incidents.length} incidents, ${taughtBy.size} cross-linked → public/ai-ops-wiki.html`);
