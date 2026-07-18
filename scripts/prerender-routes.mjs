#!/usr/bin/env node
/**
 * prerender-routes.mjs — standalone static identity for SPA money pages.
 *
 * Problem this solves (verified July 18 2026): 4everland serves the same
 * index.html for /, /portfolio and /api, and its canonical points to the
 * homepage — so non-JS AI crawlers (GPTBot, ClaudeBot, PerplexityBot) saw
 * /portfolio as a homepage duplicate and could only ever cite aideazz.xyz/.
 *
 * Fix: after vite build, generate dist/portfolio.html and dist/api.html from the
 * built template, swapping ONLY head identity (title/canonical/og/hreflang),
 * the homepage WebPage JSON-LD block, and the <noscript> crawler article.
 * The React bundle stays identical, so human visitors get the exact same SPA.
 * dist/index.html (homepage) is never written — the homepage that Cursor's
 * portfolio-first rewrite shipped stays byte-identical.
 *
 * Same host mechanism as the static blog pages (public/blog/<slug>/index.html),
 * which are proven to be served per-path on 4everland.
 *
 * Every replacement is anchored and counted — if the template drifts and an
 * anchor stops matching, the build FAILS instead of silently shipping
 * homepage identity on the money pages.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, '..', 'dist');
const TEMPLATE = path.join(DIST, 'index.html');

const TODAY = new Date().toISOString().slice(0, 10);
const TODAY_HUMAN = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

// ---------------------------------------------------------------------------
// Route definitions
// ---------------------------------------------------------------------------

const CONTACT_LINKS = `
          <p><strong>Contact & hire:</strong>
            <a href="mailto:aipa@aideazz.xyz">aipa@aideazz.xyz</a> ·
            <a href="https://wa.me/50761666716">WhatsApp +507 6166 6716</a> ·
            <a href="https://calendly.com/elena_revicheva/coffee-chat">Book a call (Calendly)</a> ·
            <a href="https://linkedin.com/in/elenarevicheva">LinkedIn</a> ·
            <a href="https://github.com/ElenaRevicheva">GitHub</a> ·
            <a href="https://x.com/reviceva">X</a> ·
            <a href="https://aideazz.xyz/Elena_Revicheva_Resume.pdf">Resume (PDF)</a>
          </p>`;

const PORTFOLIO_ARTICLE = `
      <main>
      <article>
        <header>
          <h1>Elena Revicheva — AI Products Portfolio: Live Agents, AI Audits &amp; Fractional CTO</h1>
          <p>Working portfolio with live demos. Applied AI engineer and AI systems builder in Panama (UTC-5, remote, bilingual EN/ES): production WhatsApp/Telegram agents, end-to-end AI automation, GEO/AEO/tech-SEO for AI search, AI video pipelines, and AI reliability engineering. 10-agent ecosystem, 9 live 24/7, at $0/month infrastructure.</p>
          ${CONTACT_LINKS}
        </header>

        <nav aria-label="Portfolio quick links">
          <ul>
            <li><a href="https://aideazz.xyz/api">Free AI Visibility Audit — score any site 0–100 in seconds (live API + widget)</a></li>
            <li><a href="https://aideazz.xyz/portfolio">This portfolio (canonical URL)</a></li>
            <li><a href="https://aideazz.xyz/blog">Engineering blog</a> · <a href="https://dev.to/elenarevicheva">Dev.to</a></li>
            <li><a href="https://calendly.com/elena_revicheva/coffee-chat">Book an intro call</a></li>
          </ul>
        </nav>

        <section>
          <h2>What can Elena build for you? Six services at AIdeazz AI Lab</h2>

          <h3>1. WhatsApp &amp; Telegram AI agents</h3>
          <p>Answer FAQs, qualify leads, and book appointments 24/7 — bilingual EN/ES, wired into your CRM. Proven in production: EspaLuz has had paying subscribers for 15+ months.</p>

          <h3>2. End-to-end AI automation</h3>
          <p>Make, n8n, or custom code. One workflow, end to end: trigger → AI → action in your tools — documented so you own it.</p>

          <h3>3. AI search visibility — GEO · AEO · tech SEO</h3>
          <p>When someone asks ChatGPT or Perplexity for what you sell, your business is the answer. Optimized for AI crawlers, answer engines, and LLM retrieval. Start with the <a href="https://aideazz.xyz/api">free AI Visibility Audit</a> — 34 checks, instant score, prioritized fixes. This site scores A+ 100/100 on its own engine.</p>

          <h3>4. AI video generation</h3>
          <p>End-to-end automated pipelines for product videos, marketing creatives, and social content. See the <a href="https://atuona.xyz">Atuona creative AI</a> and its <a href="https://atuona.xyz/aifilmstudio">AI Film Studio</a> (6 published films).</p>

          <h3>5. AI reliability &amp; rescue</h3>
          <p>Already have AI that gives wrong answers, or breaks when a provider retires a model? Elena tests it against your real cases, adds fallbacks so one outage can't take it down, and hands you the tests — so a bad update is caught by you, not your customers.</p>

          <h3>6. Companion-grade personal AI</h3>
          <p>Long-term memory and emotional intelligence — from bilingual WhatsApp tutors that remember your journey, to autonomous job-search agents, to AI coaches built for specialized domains.</p>

          <p><strong>How to start a project:</strong> email <a href="mailto:aipa@aideazz.xyz">aipa@aideazz.xyz</a>, message <a href="https://wa.me/50761666716">WhatsApp</a>, or <a href="https://calendly.com/elena_revicheva/coffee-chat">book a call</a>. Typical engagement: $3,500–$5,000/month fractional, or $40–$70/hour consulting.</p>
        </section>

        <section>
          <h2>Which AI products are live right now?</h2>
          <ul>
            <li><a href="https://t.me/EspaLuzFamily_bot">EspaLuz on Telegram</a> and <a href="https://wa.me/50766623757">EspaLuz on WhatsApp</a> — bilingual AI Spanish tutor with 2-layer persistent memory (LangChain + pgvector RAG); paying subscribers 15+ months.</li>
            <li><a href="https://t.me/Influencer_EspaLuz_bot">EspaLuz Influencer</a> — autonomous content agent for the EspaLuz brand.</li>
            <li><a href="https://aideazz.xyz/api">AI Visibility Audit API</a> — free public AEO/GEO/tech-SEO scoring endpoint with weekly self-audit CI.</li>
            <li><a href="https://x.com/reviceva">ALGOM Alpha</a> — crypto education and transparent paper-trading bot on X.</li>
            <li><a href="https://atuona.xyz">Atuona</a> — AI creative co-founder: poetry → images → films → NFTs (<a href="https://atuona.xyz/aifilmstudio">AI Film Studio</a>).</li>
            <li><a href="https://webhook.aideazz.xyz/whitespace/atlas.html">WHITESPACE / Atlas</a> — agentic creative-angle intelligence for media buying.</li>
            <li><a href="https://github.com/ElenaRevicheva/VibeJobHunterAIPA_AIMCF">VibeJobHunter</a> — autonomous job-search agent: LangGraph 7-node pipeline, 131-test eval harness.</li>
            <li><a href="https://github.com/ElenaRevicheva/AIPA_AITCF">CTO AIPA</a> — AI technical co-founder: code review, webhooks, Oracle-backed memory.</li>
            <li><a href="https://github.com/ElenaRevicheva/aideazz">This site</a> — bilingual React/Vite with automated daily blog and stacked GEO surfaces.</li>
          </ul>
        </section>

        <section>
          <h2>Why hire Elena Revicheva?</h2>
          <ul>
            <li>10 production AI systems running 24/7 — built solo, AI-augmented (Claude Code + Cursor).</li>
            <li>7 years Deputy CEO/CLO before engineering: she ships systems AND explains them to boards.</li>
            <li>Bilingual EN/ES, based in Panama (UTC-5), remote-friendly.</li>
            <li>She ships in days what agencies quote in months.</li>
          </ul>
        </section>

        <section lang="es">
          <h2>¿Qué construye Elena? (Español)</h2>
          <p>Ingeniera de IA aplicada en Panamá: agentes de IA para WhatsApp y Telegram (bilingües EN/ES), automatización de extremo a extremo, visibilidad en búsqueda con IA (GEO · AEO · SEO técnico), generación de video con IA y fiabilidad de sistemas de IA. Empieza con la <a href="https://aideazz.xyz/api">auditoría gratuita de visibilidad IA</a> o escribe por <a href="https://wa.me/50761666716">WhatsApp</a>.</p>
        </section>

        <footer>
          ${CONTACT_LINKS}
          <p>Last updated <time datetime="${TODAY}">${TODAY_HUMAN}</time>. Canonical URL: <a href="https://aideazz.xyz/portfolio">https://aideazz.xyz/portfolio</a></p>
        </footer>
      </article>
      </main>`;

const API_ARTICLE = `
      <main>
      <article>
        <header>
          <h1>AI Visibility Audit — free API: is your site quotable by ChatGPT, Perplexity, Claude and Gemini?</h1>
          <p>Free instant audit by <a href="https://aideazz.xyz/portfolio">Elena Revicheva (AIdeazz AI Lab)</a>: 34 evidence-backed checks that tell you whether AI search engines can find, understand, and quote your website — with a 0–100 score, per-engine access verdicts, and a prioritized fix list. No signup. Bot-blocked or JavaScript-only sites get a scored diagnosis instead of an error.</p>
        </header>

        <section>
          <h2>What does the audit check?</h2>
          <ul>
            <li><strong>AI Crawler Access</strong> — can GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended and CCBot reach your pages? robots.txt, llms.txt, sitemap, indexability.</li>
            <li><strong>Structured Data (GEO)</strong> — JSON-LD schema, Organization/Person identity, Open Graph, canonical, metadata.</li>
            <li><strong>Answer-Readiness (AEO)</strong> — titles, headings, question-style content, depth, extractable facts.</li>
            <li><strong>Technical Foundation</strong> — HTTPS, speed, mobile viewport, and content present in raw HTML (JS-only SPAs are invisible to most AI crawlers).</li>
          </ul>
        </section>

        <section>
          <h2>How do I use the API?</h2>
          <p>Try it in the browser at <a href="https://aideazz.xyz/api">aideazz.xyz/api</a>, or call it directly:</p>
          <p><code>POST https://webhook.aideazz.xyz/cto/v1/visibility</code> with header <code>X-API-Key: aidz_demo_visibility_2026</code> (public demo key) and JSON body <code>{"url":"https://example.com"}</code>. A plain GET on the endpoint serves full documentation.</p>
          <p>The engine audits its own properties weekly in CI and fails below grade B — this site scores A+ 100/100 on it.</p>
        </section>

        <section>
          <h2>Who built this?</h2>
          <p><a href="https://aideazz.xyz/portfolio">Elena Revicheva</a> — applied AI engineer (Panama, bilingual EN/ES): production AI agents, automation, and GEO/AEO/tech-SEO services. Want your score fixed, or AI visibility wired into your product? <a href="mailto:aipa@aideazz.xyz">aipa@aideazz.xyz</a> · <a href="https://wa.me/50761666716">WhatsApp</a> · <a href="https://calendly.com/elena_revicheva/coffee-chat">book a call</a>.</p>
        </section>

        <footer>
          <p>Last updated <time datetime="${TODAY}">${TODAY_HUMAN}</time>. Canonical URL: <a href="https://aideazz.xyz/api">https://aideazz.xyz/api</a> · Portfolio: <a href="https://aideazz.xyz/portfolio">aideazz.xyz/portfolio</a></p>
        </footer>
      </article>
      </main>`;

const ROUTES = [
  {
    dir: 'portfolio',
    url: 'https://aideazz.xyz/portfolio',
    title: 'Elena Revicheva — AI Portfolio | Live Agents, Audits & Fractional CTO',
    description:
      'Hire Elena Revicheva: 9 live AI products, WhatsApp/Telegram agents, AI automation, GEO/AEO/tech SEO, AI video and reliability engineering. Live demos inside.',
    ogType: 'website',
    article: PORTFOLIO_ARTICLE,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      '@id': 'https://aideazz.xyz/portfolio#profilepage',
      url: 'https://aideazz.xyz/portfolio',
      name: 'Elena Revicheva — AI Products Portfolio',
      dateModified: TODAY,
      inLanguage: ['en', 'es'],
      isPartOf: { '@type': 'WebSite', name: 'AIdeazz', url: 'https://aideazz.xyz/' },
      mainEntity: { '@type': 'Person', name: 'Elena Revicheva', url: 'https://aideazz.xyz/portfolio' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'AIdeazz', item: 'https://aideazz.xyz/' },
          { '@type': 'ListItem', position: 2, name: 'Portfolio', item: 'https://aideazz.xyz/portfolio' },
        ],
      },
      mainEntityOfPage: {
        '@type': 'OfferCatalog',
        name: 'AIdeazz AI Lab services',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'WhatsApp & Telegram AI agents', description: 'Answer FAQs, qualify leads, and book appointments 24/7 — bilingual EN/ES, wired into your CRM.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'End-to-end AI automation', description: 'Make, n8n, or custom code. One workflow, end to end: trigger → AI → action in your tools.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI search visibility — GEO · AEO · tech SEO', description: 'Optimized for AI crawlers, answer engines, and LLM retrieval. Free instant audit at aideazz.xyz/api.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI video generation', description: 'End-to-end automated pipelines for product videos, marketing creatives, and social content.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI reliability & rescue', description: 'Testing against real cases, provider-outage fallbacks, and regression tests handed to you.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Companion-grade personal AI', description: 'Long-term memory and emotional intelligence — tutors, job-search agents, domain AI coaches.' } },
        ],
      },
    },
  },
  {
    dir: 'api',
    url: 'https://aideazz.xyz/api',
    title: 'AI Visibility Audit — free API & instant score | AIdeazz Lab',
    description:
      'Free AEO/GEO/tech-SEO audit: 34 checks that tell you if ChatGPT, Perplexity, Claude and Gemini can find, understand and quote your site. Instant 0-100 score.',
    ogType: 'website',
    article: API_ARTICLE,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': 'https://aideazz.xyz/api#webpage',
      url: 'https://aideazz.xyz/api',
      name: 'AI Visibility Audit — free API (AEO · GEO · Tech SEO)',
      dateModified: TODAY,
      inLanguage: ['en', 'es'],
      isPartOf: { '@type': 'WebSite', name: 'AIdeazz', url: 'https://aideazz.xyz/' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'AIdeazz', item: 'https://aideazz.xyz/' },
          { '@type': 'ListItem', position: 2, name: 'AI Visibility Audit API', item: 'https://aideazz.xyz/api' },
        ],
      },
      mainEntity: {
        '@type': 'SoftwareApplication',
        name: 'AIdeazz AI Visibility Audit API',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Web',
        url: 'https://aideazz.xyz/api',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        author: { '@type': 'Person', name: 'Elena Revicheva', url: 'https://aideazz.xyz/portfolio' },
      },
    },
  },
];

// ---------------------------------------------------------------------------
// Anchored replacement helpers — every miss is a build failure.
// ---------------------------------------------------------------------------

let failures = 0;

function replaceExactlyOnce(html, pattern, replacement, label, route) {
  const matches = html.match(pattern);
  const count = matches ? matches.length : 0;
  if (count !== 1) {
    console.error(`prerender FAIL [${route}]: anchor "${label}" matched ${count} times (expected 1). Template drifted — fix scripts/prerender-routes.mjs.`);
    failures += 1;
    return html;
  }
  return html.replace(pattern, replacement);
}

function buildRoute(template, route) {
  let html = template;

  html = replaceExactlyOnce(html, /<title>[^<]*<\/title>/, `<title>${route.title}</title>`, 'title', route.dir);
  html = replaceExactlyOnce(
    html,
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${route.description}" />`,
    'meta description',
    route.dir,
  );
  html = replaceExactlyOnce(
    html,
    /<link rel="canonical" href="https:\/\/aideazz\.xyz\/" \/>/,
    `<link rel="canonical" href="${route.url}" />`,
    'canonical',
    route.dir,
  );
  html = replaceExactlyOnce(
    html,
    /<meta property="og:url" content="https:\/\/aideazz\.xyz\/" \/>/,
    `<meta property="og:url" content="${route.url}" />`,
    'og:url',
    route.dir,
  );
  html = replaceExactlyOnce(
    html,
    /<meta property="og:type" content="website" \/>/,
    `<meta property="og:type" content="${route.ogType}" />`,
    'og:type',
    route.dir,
  );
  html = replaceExactlyOnce(
    html,
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${route.title}" />`,
    'og:title',
    route.dir,
  );
  html = replaceExactlyOnce(
    html,
    /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${route.description}" />`,
    'og:description',
    route.dir,
  );
  html = replaceExactlyOnce(
    html,
    /<meta name="twitter:title" content="[^"]*" \/>/,
    `<meta name="twitter:title" content="${route.title}" />`,
    'twitter:title',
    route.dir,
  );
  html = replaceExactlyOnce(
    html,
    /<meta name="twitter:description" content="[^"]*" \/>/,
    `<meta name="twitter:description" content="${route.description}" />`,
    'twitter:description',
    route.dir,
  );

  // hreflang alternates → this route's URL (must match exactly 3: en, es, x-default)
  const hreflang = html.match(/<link rel="alternate" hreflang="[^"]+" href="https:\/\/aideazz\.xyz\/" \/>/g);
  if (!hreflang || hreflang.length !== 3) {
    console.error(`prerender FAIL [${route.dir}]: expected 3 hreflang anchors, found ${hreflang ? hreflang.length : 0}.`);
    failures += 1;
  } else {
    html = html.replace(
      /(<link rel="alternate" hreflang="[^"]+" href=")https:\/\/aideazz\.xyz\/(" \/>)/g,
      `$1${route.url}$2`,
    );
  }

  // Homepage WebPage JSON-LD block → route-specific block (anchored on #home-webpage id)
  html = replaceExactlyOnce(
    html,
    /<script type="application\/ld\+json">\s*\{[^<]*"@id": "https:\/\/aideazz\.xyz\/#home-webpage"[\s\S]*?<\/script>/,
    `<script type="application/ld+json">\n    ${JSON.stringify(route.jsonLd, null, 2).replace(/\n/g, '\n    ')}\n    </script>`,
    'home-webpage JSON-LD',
    route.dir,
  );

  // Swap the whole crawler article (noscript block)
  html = replaceExactlyOnce(
    html,
    /<noscript>[\s\S]*<\/noscript>/,
    `<noscript>${route.article}\n    </noscript>`,
    'noscript article',
    route.dir,
  );

  return html;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

if (!fs.existsSync(TEMPLATE)) {
  console.error('prerender FAIL: dist/index.html not found — run vite build first.');
  process.exit(1);
}
const template = fs.readFileSync(TEMPLATE, 'utf8');
const templateBefore = template;

for (const route of ROUTES) {
  const out = buildRoute(template, route);
  if (failures > 0) break;
  // Flat .html at dist root — IPFS treats /portfolio as a directory when portfolio/index.html
  // exists, returning 301 before _redirects runs. Crawlers (WhatsApp) need 200 on first fetch.
  const flat = path.join(DIST, `${route.dir}.html`);
  fs.writeFileSync(flat, out);
  console.log(`prerender: wrote dist/${route.dir}.html (${(out.length / 1024).toFixed(1)} KB) — canonical ${route.url}`);
}

// Paranoia: the homepage template must never be modified by this script.
if (fs.readFileSync(TEMPLATE, 'utf8') !== templateBefore) {
  console.error('prerender FAIL: dist/index.html changed — this script must never touch the homepage.');
  process.exit(1);
}

if (failures > 0) {
  console.error(`prerender: ${failures} anchor failure(s) — build aborted.`);
  process.exit(1);
}
console.log('prerender: OK — money pages have standalone identity; homepage untouched.');
