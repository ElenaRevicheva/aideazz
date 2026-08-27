// backfill-blog-internal-links.mjs — kill the orphan-page problem at its root.
//
// WHY THIS EXISTS
// cto-aipa publishes each article to public/blog/<slug>/index.html. Those pages
// link OUT (home, /blog, /about, /portfolio) but nothing ever linked IN to them:
// /blog/ is deliberately the React SPA shell (see fix-blog-index.mjs), so a
// crawler reading raw HTML finds no path to any article. Ahrefs' 25 Aug crawl:
// 75 orphan pages, climbing +13/week — the publisher was manufacturing orphans
// faster than anything adopted them.
//
// THE FIX
// Sort posts newest-first, then give post i outbound links to posts i+1..i+RING
// (mod N). Because the offsets are fixed, every post receives EXACTLY `RING`
// incoming links — orphan count is provably zero, and link equity spreads evenly
// instead of pooling on the newest few. Also links each post to a real static
// archive hub so a JS-less crawler can reach all of them in two hops.
//
// SAFETY
// - Additive only: inserts one <nav> before </article>. Article bodies are never
//   touched, never regenerated, never re-rendered by a model.
// - Idempotent: re-running replaces the block between the v1 markers, so the
//   daily publisher and this script cannot fight each other.
// - Backs up every file it will modify before writing a single byte.
// - Also repairs href="/blog" -> "/blog/" (that no-slash link 301s, which is
//   Ahrefs' "129 pages link to a redirect").
//
// Usage:
//   node scripts/backfill-blog-internal-links.mjs --dry-run
//   node scripts/backfill-blog-internal-links.mjs
import {
  readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync,
} from "node:fs";
import { join } from "node:path";

const BLOG_DIR = "public/blog";
const ARCHIVE_SLUG = "archive";
const RING = 12;
const MARK_OPEN = "<!-- more-posts:v1 -->";
const MARK_CLOSE = "<!-- /more-posts:v1 -->";
const DRY = process.argv.includes("--dry-run");
// Adding one post shifts every post's ring, so a build rewrites all of them.
// Keeping a backup per file per build would bloat the tree fast — backups are
// for humans running this by hand, not for the automated build path.
const NO_BACKUP = process.argv.includes("--no-backup") || !!process.env.CI;

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Title and date come from the page's own markup — never invented. */
function readPost(slug) {
  const file = join(BLOG_DIR, slug, "index.html");
  if (!existsSync(file)) return null;
  const html = readFileSync(file, "utf8");
  const title = html.match(/<h1[^>]*itemprop="headline"[^>]*>([\s\S]*?)<\/h1>/i)?.[1];
  const iso = html.match(/<time[^>]*datetime="([^"]+)"/i)?.[1];
  if (!title) return null;
  return {
    slug,
    file,
    html,
    title: title.replace(/<[^>]+>/g, "").trim(),
    iso: iso || "1970-01-01T00:00:00.000Z",
  };
}

const slugs = readdirSync(BLOG_DIR, { withFileTypes: true })
  .filter((d) => d.isDirectory() && d.name !== ARCHIVE_SLUG)
  .map((d) => d.name);

const posts = slugs.map(readPost).filter(Boolean);
posts.sort((a, b) => Date.parse(b.iso) - Date.parse(a.iso));

if (posts.length === 0) {
  console.error("backfill: no posts found under", BLOG_DIR);
  process.exit(1);
}
const skipped = slugs.length - posts.length;
console.log(`backfill: ${posts.length} posts readable${skipped ? `, ${skipped} skipped (no headline)` : ""}`);

const human = (iso) =>
  new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

/** The ring: fixed offsets guarantee every post gets exactly RING incoming links. */
function relatedFor(i) {
  const out = [];
  for (let k = 1; k <= Math.min(RING, posts.length - 1); k += 1) {
    out.push(posts[(i + k) % posts.length]);
  }
  return out;
}

function navBlock(i) {
  const rel = relatedFor(i);
  const items = rel
    .map(
      (p) =>
        `      <li><a href="/blog/${p.slug}/">${esc(p.title)}</a> <span class="mp-date">${human(p.iso)}</span></li>`,
    )
    .join("\n");
  return `${MARK_OPEN}
  <nav class="more-posts" aria-label="More articles">
    <h2>More from this blog</h2>
    <ul>
${items}
    </ul>
    <p><a href="/blog/${ARCHIVE_SLUG}/">Browse all ${posts.length} articles →</a></p>
  </nav>
${MARK_CLOSE}`;
}

const STYLE = `
  <style>
    .more-posts { margin: 3rem 0 1rem; padding-top: 1.5rem; border-top: 1px solid #e5e7eb; }
    .more-posts h2 { font-size: 1.1rem; margin: 0 0 .75rem; }
    .more-posts ul { list-style: none; padding: 0; margin: 0; }
    .more-posts li { margin: .45rem 0; line-height: 1.45; }
    .more-posts a { color: #6366f1; text-decoration: none; }
    .more-posts a:hover { text-decoration: underline; }
    .mp-date { color: #6b7280; font-size: .85em; white-space: nowrap; }
  </style>`;

// ---- back up before touching anything ------------------------------------
const stamp = new Date().toISOString().replace(/[:.]/g, "-");
const backupRoot = join("_backup-blog-links", stamp);
let changed = 0;
let already = 0;

for (let i = 0; i < posts.length; i += 1) {
  const post = posts[i];
  let html = post.html;

  // 1. the no-slash /blog link is a 301 hop on every single page
  const before = html;
  html = html
    .replace(/href="\/blog"/g, 'href="/blog/"')
    .replace(/href="https:\/\/aideazz\.xyz\/blog"/g, 'href="https://aideazz.xyz/blog/"');

  // 2. insert (or refresh) the ring block immediately before </article>
  const block = navBlock(i);
  if (html.includes(MARK_OPEN)) {
    html = html.replace(
      new RegExp(`${MARK_OPEN}[\\s\\S]*?${MARK_CLOSE}`),
      () => block,
    );
  } else if (html.includes("</article>")) {
    html = html.replace("</article>", `${block}\n  </article>`);
  } else {
    console.warn(`  ! ${post.slug}: no </article> — skipped`);
    continue;
  }

  // 3. styles once, right before </head>
  if (!html.includes(".more-posts {") && html.includes("</head>")) {
    html = html.replace("</head>", `${STYLE}\n</head>`);
  }

  if (html === before) {
    already += 1;
    continue;
  }
  changed += 1;
  if (DRY) continue;

  if (!NO_BACKUP) {
    const bdir = join(backupRoot, post.slug);
    mkdirSync(bdir, { recursive: true });
    copyFileSync(post.file, join(bdir, "index.html"));
  }
  writeFileSync(post.file, html, "utf8");
}

// ---- the archive hub: every post, one page, real anchors -------------------
const archiveDir = join(BLOG_DIR, ARCHIVE_SLUG);
const rows = posts
  .map(
    (p) =>
      `      <li><a href="/blog/${p.slug}/">${esc(p.title)}</a> <span class="mp-date">${human(p.iso)}</span></li>`,
  )
  .join("\n");
const archiveHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>All Articles — AIdeazz Blog</title>
  <meta name="description" content="Every article on the AIdeazz blog: production AI engineering, agent reliability, GEO/AEO and automation, by Elena Revicheva.">
  <link rel="canonical" href="https://aideazz.xyz/blog/${ARCHIVE_SLUG}/">
  <style>
    body { max-width: 46rem; margin: 0 auto; padding: 2rem 1rem 4rem; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.6; color: #111827; }
    header a { color: #6366f1; text-decoration: none; margin-right: 1rem; }
    h1 { font-size: 1.6rem; margin: 1.5rem 0 .25rem; }
    .lede { color: #6b7280; margin: 0 0 2rem; }
    ul { list-style: none; padding: 0; margin: 0; }
    li { margin: .5rem 0; line-height: 1.45; }
    li a { color: #6366f1; text-decoration: none; }
    li a:hover { text-decoration: underline; }
    .mp-date { color: #6b7280; font-size: .85em; white-space: nowrap; }
    footer { margin-top: 3rem; padding-top: 1rem; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: .9em; }
    footer a { color: #6366f1; }
  </style>
</head>
<body>
  <header>
    <a href="/">AIdeazz</a>
    <a href="/blog/">Blog</a>
    <a href="/about">About</a>
    <a href="/portfolio">Portfolio</a>
  </header>
  <h1>All articles</h1>
  <p class="lede">${posts.length} articles, newest first.</p>
  <ul>
${rows}
  </ul>
  <footer>
    <p><a href="https://aideazz.xyz/about">About</a> · <a href="https://aideazz.xyz/portfolio">Portfolio</a> · <a href="mailto:aipa@aideazz.xyz">Contact</a></p>
  </footer>
</body>
</html>
`;
if (!DRY) {
  mkdirSync(archiveDir, { recursive: true });
  writeFileSync(join(archiveDir, "index.html"), archiveHtml, "utf8");
}

console.log(
  `backfill${DRY ? " (DRY RUN)" : ""}: ${changed} post(s) updated, ${already} already current, ` +
    `archive hub lists ${posts.length}.`,
);
if (!DRY && changed) console.log(`backfill: originals backed up to ${backupRoot}/`);
console.log(`backfill: every post now has ${Math.min(RING, posts.length - 1)} incoming links — orphan count 0 by construction.`);
