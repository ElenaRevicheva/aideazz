/**
 * Build-time: static routes + every prerendered blog post → public/sitemap.xml + sitemap.txt
 *
 * Blog URLs come from the pages that actually ship in public/blog/<slug>/index.html,
 * not from a publishing API. Asking dev.to what the blog contains produced a sitemap
 * that was wrong in both directions: it listed dev.to slugs with no page on this
 * domain (aideazz.xyz/blog/ai-language-learning-5cd4 → 404) while omitting posts that
 * exist here with 1,500+ words of prerendered content. The filesystem is the only
 * source that agrees with what a crawler will actually fetch.
 *
 * Hashnode is gone — that publication was retired months ago, so the old GraphQL
 * fetch could only ever fail. No network calls here now, which also makes the
 * sitemap reproducible instead of dependent on a third party being up at build time.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const PUBLIC = path.join(ROOT, "public");
const BLOG_DIR = path.join(PUBLIC, "blog");

const SITE = "https://aideazz.xyz";

/** Smoke tests and stubs that should never reach a crawler. */
const EXCLUDED_SLUGS = new Set([
  "cto-aipa-hashnode-api-smoke-test-2026-04-09t0041-utc",
]);

const STATIC_PAGES = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.8" },
  // The money page — keep at parity with the homepage so engines treat it as primary.
  { path: "/portfolio", changefreq: "weekly", priority: "1.0" },
  { path: "/blog", changefreq: "weekly", priority: "0.85" },
  { path: "/pitch.html", changefreq: "monthly", priority: "0.7" },
  { path: "/pitch-es.html", changefreq: "monthly", priority: "0.6" },
  { path: "/sop-ai-ops.html", changefreq: "weekly", priority: "0.72" },
  { path: "/sop-ai-ops-es.html", changefreq: "weekly", priority: "0.72" },
  /* GEO — explicit in sitemap so crawlers discover machine-readable surfaces */
  { path: "/llms.txt", changefreq: "monthly", priority: "0.55" },
  { path: "/.well-known/llms.txt", changefreq: "monthly", priority: "0.55" },
  { path: "/geo-manifest.json", changefreq: "monthly", priority: "0.55" },
  { path: "/humans.txt", changefreq: "yearly", priority: "0.35" },
  { path: "/CITATION.cff", changefreq: "yearly", priority: "0.35" },
  { path: "/robots.txt", changefreq: "yearly", priority: "0.3" },
];

function escapeXml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function locUrl(pathname) {
  if (pathname === "/") return `${SITE}/`;
  return `${SITE}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}

function dateOnly(iso) {
  if (!iso || typeof iso !== "string") return new Date().toISOString().slice(0, 10);
  return iso.slice(0, 10);
}

/**
 * Prefer the post's own declared publish date over file mtime, because a repo
 * checkout or a reformat rewrites mtime and would otherwise tell Google every
 * post changed today.
 */
function publishDateFor(html) {
  const jsonLd = html.match(/"datePublished"\s*:\s*"([^"]+)"/);
  if (jsonLd) return dateOnly(jsonLd[1]);
  const meta = html.match(
    /<meta[^>]+property=["']article:published_time["'][^>]+content=["']([^"']+)["']/i
  );
  if (meta) return dateOnly(meta[1]);
  return null;
}

/** Every blog post that actually ships as a prerendered page on this domain. */
function readPublishedPosts() {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const out = [];
  for (const entry of fs.readdirSync(BLOG_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const slug = entry.name;
    if (EXCLUDED_SLUGS.has(slug)) continue;
    const file = path.join(BLOG_DIR, slug, "index.html");
    if (!fs.existsSync(file)) continue;
    const html = fs.readFileSync(file, "utf8");
    out.push({
      slug,
      publishedAt: publishDateFor(html) || dateOnly(fs.statSync(file).mtime.toISOString()),
    });
  }
  out.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  return out;
}

async function main() {
  const posts = readPublishedPosts();
  const fallbackDate = new Date().toISOString().slice(0, 10);

  const entries = [];

  for (const p of STATIC_PAGES) {
    entries.push({
      loc: locUrl(p.path),
      lastmod: fallbackDate,
      changefreq: p.changefreq,
      priority: p.priority,
    });
  }

  for (const post of posts) {
    entries.push({
      loc: locUrl(`/blog/${post.slug}`),
      lastmod: dateOnly(post.publishedAt),
      changefreq: "monthly",
      priority: "0.75",
    });
  }

  const urlElements = entries
    .map(
      (e) => `  <url>
    <loc>${escapeXml(e.loc)}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>
`;

  const txt = entries.map((e) => e.loc).join("\n") + "\n";

  fs.mkdirSync(PUBLIC, { recursive: true });
  fs.writeFileSync(path.join(PUBLIC, "sitemap.xml"), xml, "utf8");
  fs.writeFileSync(path.join(PUBLIC, "sitemap.txt"), txt, "utf8");

  // GSC URL-prefix property needs /portfolio/sitemap.* via _redirects → FLAT files.
  // NEVER write public/portfolio/ (IPFS DirIndex breaks /portfolio/ → portfolio.html).
  const portfolioLastmod = new Date().toISOString().slice(0, 10);
  const portfolioXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://aideazz.xyz/portfolio</loc>
    <lastmod>${portfolioLastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;
  fs.writeFileSync(path.join(PUBLIC, "portfolio-sitemap.xml"), portfolioXml, "utf8");
  fs.writeFileSync(path.join(PUBLIC, "portfolio-sitemap.txt"), "https://aideazz.xyz/portfolio\n", "utf8");

  console.log(
    `generate-sitemap: wrote ${entries.length} URLs (${STATIC_PAGES.length} static + ${posts.length} prerendered blog posts) → public/sitemap.xml, public/sitemap.txt`
  );
  console.log("generate-sitemap: wrote public/portfolio-sitemap.xml + .txt (rewritten from /portfolio/sitemap.*)");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
