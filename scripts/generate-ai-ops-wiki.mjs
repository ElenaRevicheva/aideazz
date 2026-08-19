#!/usr/bin/env node
/**
 * generate-ai-ops-wiki.mjs — render content/ai-ops-wiki/ into public/ai-ops-wiki.html
 *
 * The wiki is a COMPOUNDING artifact, in the sense Karpathy's LLM-wiki pattern
 * uses the word: the durable layer is plain Markdown in the repo, portable and
 * inspectable and diffable, and the HTML is a disposable view generated from it.
 * Every debugging session appends one incident file and, when it earns one, one
 * concept file. Nothing is ever hand-edited in the HTML, so the page cannot
 * drift away from its source — which is the whole point, and is itself the
 * single-source-of-truth rule this wiki documents.
 *
 * Layers, deliberately separate:
 *   concepts/   the named idea, defined once, in plain words
 *   incidents/  what actually happened, with dates and verified numbers
 *
 * They link BOTH ways. An incident lists the concepts it earned; each concept
 * page is rendered with the incidents that taught it. That bidirectional edge is
 * built here at render time from a single declaration in the incident's
 * front-matter, so the two halves can never disagree.
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
  if (!m) throw new Error('missing front-matter');
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

const fmtDate = d => {
  const [y, m, day] = (d || '').split('-');
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  return y ? `${months[Number(m) - 1]} ${Number(day)}, ${y}` : '';
};

const ROWS = [
  ['symptom', 'Symptom'],
  ['root_cause', 'Root cause'],
  ['fix', 'Fix applied'],
  ['verified', 'Verified by'],
  ['rule', 'Rule earned'],
];

const conceptCard = c => {
  const taught = taughtBy.get(c.meta.slug) || [];
  return `
      <article class="entry" id="${esc(c.meta.slug)}">
        <div class="entry-head">
          <h3>${esc(c.meta.title)}</h3>
          ${c.meta.aka ? `<div class="aka">also called: ${esc(c.meta.aka)}</div>` : ''}
        </div>
        <p class="one-liner">${esc(c.meta.one_liner)}</p>
        <div class="prose">${md(c.body)}</div>
        ${taught.length ? `<div class="taught-by">
          <span class="taught-lbl">Learned the hard way in</span>
          ${taught.map(i => `<a class="chip" href="#${esc(i.meta.slug)}">${esc(fmtDate(i.meta.date))} — ${esc(i.meta.title)}</a>`).join('')}
        </div>` : ''}
      </article>`;
};

const incidentCard = i => {
  const linked = (i.meta.concepts || '').split(',').map(s => s.trim()).filter(Boolean);
  return `
      <article class="entry incident" id="${esc(i.meta.slug)}">
        <div class="entry-head">
          <h3>${esc(i.meta.title)}</h3>
          <div class="aka">${esc(fmtDate(i.meta.date))} — ${esc(i.meta.subtitle || '')}</div>
        </div>
        ${ROWS.filter(([k]) => i.meta[k]).map(([k, label]) => `
        <div class="pm-row">
          <div class="pm-lbl">${label}</div>
          <div class="pm-val">${esc(i.meta[k])}</div>
        </div>`).join('')}
        ${linked.length ? `<div class="taught-by">
          <span class="taught-lbl">Concepts</span>
          ${linked.map(s => `<a class="chip" href="#${esc(s)}">${esc(conceptBySlug.get(s).meta.title)}</a>`).join('')}
        </div>` : ''}
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

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="A working engineer's wiki: named reliability concepts — single point of failure, silent failure, idempotency — each defined in plain language and linked to the real production incident that taught it." />
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
  <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700&family=JetBrains+Mono:wght@450;500;600&family=Plus+Jakarta+Sans:ital,wght@0,500;0,600;0,700;0,800&display=swap" rel="stylesheet" />

  <script type="application/ld+json">${JSON.stringify(authorLd)}</script>
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>

  <style>
    :root{
      --bg:#05060a; --surface:rgba(14,16,28,.82); --border:rgba(255,255,255,.065);
      --border-strong:rgba(255,255,255,.11); --violet:#9d8cff; --cyan:#2ee6d6;
      --text:#e8eaf2; --muted:#9aa0b5; --dim:#6e7488;
    }
    *{box-sizing:border-box;}
    body{margin:0;background:var(--bg);color:var(--text);
      font-family:Inter,system-ui,-apple-system,"Segoe UI",sans-serif;
      line-height:1.65;-webkit-font-smoothing:antialiased;}
    .wrap{max-width:900px;margin:0 auto;padding:56px 22px 100px;}
    a{color:var(--cyan);text-decoration:none;}
    a:hover{text-decoration:underline;}
    .eyebrow{font-family:"JetBrains Mono",monospace;font-size:11.5px;letter-spacing:.16em;
      text-transform:uppercase;color:var(--violet);margin-bottom:14px;}
    h1{font-family:"Plus Jakarta Sans",Inter,sans-serif;font-size:clamp(30px,5vw,46px);
      line-height:1.14;margin:0 0 16px;letter-spacing:-.02em;font-weight:800;}
    .lede{font-size:17.5px;color:var(--muted);max-width:66ch;margin:0 0 10px;}
    .divider{height:1px;background:linear-gradient(90deg,var(--border-strong),transparent);margin:38px 0;}
    h2{font-family:"Plus Jakarta Sans",Inter,sans-serif;font-size:24px;margin:0 0 6px;
      letter-spacing:-.01em;font-weight:700;}
    .sec-note{color:var(--dim);font-size:14.5px;margin:0 0 26px;max-width:64ch;}
    .entry{background:var(--surface);border:1px solid var(--border);border-radius:14px;
      padding:24px 24px 20px;margin-bottom:18px;scroll-margin-top:24px;}
    .entry-head h3{font-family:"Plus Jakarta Sans",Inter,sans-serif;font-size:19.5px;
      margin:0 0 4px;font-weight:700;letter-spacing:-.01em;}
    .aka{font-family:"JetBrains Mono",monospace;font-size:12px;color:var(--dim);margin-bottom:12px;}
    .one-liner{font-size:16.5px;color:var(--violet);font-weight:500;margin:0 0 14px;
      padding-left:14px;border-left:2px solid var(--violet);}
    .prose p{margin:0 0 13px;color:#cdd2e2;font-size:15.5px;}
    .prose ul,.prose ol{margin:0 0 13px;padding-left:20px;color:#cdd2e2;font-size:15.5px;}
    .prose li{margin-bottom:7px;}
    .prose strong{color:var(--text);}
    .pm-row{display:grid;grid-template-columns:132px 1fr;gap:16px;padding:11px 0;
      border-top:1px solid var(--border);}
    .pm-lbl{font-family:"JetBrains Mono",monospace;font-size:11.5px;letter-spacing:.08em;
      text-transform:uppercase;color:var(--dim);padding-top:3px;}
    .pm-val{color:#cdd2e2;font-size:15px;}
    .taught-by{margin-top:16px;padding-top:14px;border-top:1px solid var(--border);
      display:flex;flex-wrap:wrap;gap:8px;align-items:center;}
    .taught-lbl{font-family:"JetBrains Mono",monospace;font-size:11px;letter-spacing:.08em;
      text-transform:uppercase;color:var(--dim);margin-right:2px;}
    .chip{display:inline-block;padding:5px 11px;border-radius:999px;font-size:12.5px;
      background:rgba(157,140,255,.1);border:1px solid rgba(157,140,255,.22);
      color:#c3b8ff;text-decoration:none;}
    .chip:hover{background:rgba(157,140,255,.18);text-decoration:none;}
    .incident .one-liner{border-left-color:var(--cyan);color:var(--cyan);}
    .toc{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 8px;}
    .callout{background:rgba(46,230,214,.06);border:1px solid rgba(46,230,214,.2);
      border-radius:12px;padding:16px 18px;color:#bfe9e4;font-size:15px;margin-top:34px;}
    footer{margin-top:46px;padding-top:22px;border-top:1px solid var(--border);
      color:var(--dim);font-size:14px;}
    @media(max-width:620px){.pm-row{grid-template-columns:1fr;gap:4px;}}
  </style>
</head>
<body>
  <div class="wrap">
    <div class="eyebrow">AIdeazz AI Lab · Field notes</div>
    <h1>AI Ops Wiki</h1>
    <p class="lede">Concepts earned in production, not read in a textbook. Every entry below cost an outage on a system that was live at the time — a lead pipeline, a publishing bot, a CRM automation. Each names the idea in plain language, then links to the incident that taught it.</p>
    <p class="lede">It grows one debugging session at a time. The durable copy is Markdown in the repository; this page is generated from it, so the two can never drift apart.</p>

    <div class="divider"></div>

    <h2>Concepts</h2>
    <p class="sec-note">The vocabulary. Each one is a failure mode with a name, and a name is what makes it possible to spot the same shape somewhere new.</p>
    <div class="toc">${concepts.map(c => `<a class="chip" href="#${esc(c.meta.slug)}">${esc(c.meta.title)}</a>`).join('')}</div>
    <div class="divider" style="margin:22px 0;"></div>
${concepts.map(conceptCard).join('\n')}

    <div class="divider"></div>

    <h2>Incidents</h2>
    <p class="sec-note">What actually happened, with the dates and the numbers that were verified from production logs rather than from configuration. No customer data, credentials, hostnames or internal identifiers appear here.</p>
${incidents.map(incidentCard).join('\n')}

    <div class="callout">
      <strong>How this is maintained:</strong> a debugging session that produces a transferable lesson earns one incident file, and a new failure mode earns one concept file. Nothing is hand-written in HTML — <code>node scripts/generate-ai-ops-wiki.mjs</code> rebuilds this page from the Markdown, and a reference to a concept that does not exist fails the build rather than shipping a dead link.
    </div>

    <footer>
      Maintained by <a href="https://aideazz.xyz/portfolio">Elena Revicheva</a> · part of the
      <a href="/sop-ai-ops.html">AI Ops Runbook</a> ·
      last updated ${new Date().toISOString().slice(0, 10)}
    </footer>
  </div>
</body>
</html>
`;

writeFileSync(OUT, html, 'utf8');
console.log(`ai-ops-wiki: ${concepts.length} concepts, ${incidents.length} incidents, ${taughtBy.size} linked → public/ai-ops-wiki.html`);
