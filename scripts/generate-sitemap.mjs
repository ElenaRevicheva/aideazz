/**
 * Build-time: merge static routes + live Hashnode slugs → public/sitemap.xml + sitemap.txt
 * so aideazz.xyz/blog/* URLs are discoverable (not only Hashnode/Dev.to).
 * On Hashnode failure, writes static URLs only (build still succeeds).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const PUBLIC = path.join(ROOT, "public");

const SITE = "https://aideazz.xyz";
const HASHNODE_HOST = process.env.VITE_HASHNODE_HOST?.trim() || "aideazz.hashnode.dev";
const DEVTO_USERNAME = process.env.VITE_DEVTO_USERNAME?.trim() || "elenarevicheva";

/** Same as src/lib/hashnode-public.ts — smoke tests not in sitemap */
const EXCLUDED_SLUGS = new Set([
  "cto-aipa-hashnode-api-smoke-test-2026-04-09t0041-utc",
]);

const STATIC_PAGES = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.8" },
  { path: "/portfolio", changefreq: "weekly", priority: "0.9" },
  { path: "/blog", changefreq: "weekly", priority: "0.85" },
  { path: "/pitch.html", changefreq: "monthly", priority: "0.7" },
  { path: "/pitch-es.html", changefreq: "monthly", priority: "0.6" },
];

const GQL = `
  query Posts($host: String!, $first: Int!) {
    publication(host: $host) {
      posts(first: $first) {
        edges {
          node {
            slug
            publishedAt
          }
        }
      }
    }
  }
`;

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

async function fetchHashnodeSlugs() {
  try {
    const res = await fetch("https://gql.hashnode.com/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: GQL,
        variables: { host: HASHNODE_HOST, first: 50 },
      }),
    });
    const json = await res.json();
    if (json.errors?.length) {
      console.warn("generate-sitemap: Hashnode GraphQL errors:", json.errors.map((e) => e.message).join("; "));
      return [];
    }
    const edges = json.data?.publication?.posts?.edges ?? [];
    return edges
      .map((e) => e.node)
      .filter((n) => n?.slug && !EXCLUDED_SLUGS.has(n.slug));
  } catch (e) {
    console.warn("generate-sitemap: Hashnode fetch failed:", e?.message || e);
    return [];
  }
}

function dateOnly(iso) {
  if (!iso || typeof iso !== "string") return new Date().toISOString().slice(0, 10);
  return iso.slice(0, 10);
}

/** Slugs on dev.to only (Hashnode 404) — same inference as src/lib/devto-public.ts */
async function fetchDevtoSlugsNotInHashnode(hashnodeSlugs) {
  const have = new Set(hashnodeSlugs);
  try {
    const res = await fetch(
      `https://dev.to/api/articles?username=${encodeURIComponent(DEVTO_USERNAME)}&per_page=100`
    );
    if (!res.ok) return [];
    const arr = await res.json();
    if (!Array.isArray(arr)) return [];
    const out = [];
    for (const a of arr) {
      const path = a.path || "";
      const seg = path.split("/").filter(Boolean).pop() || "";
      const stripped = seg.replace(/-[a-z0-9]{3,6}$/i, "");
      const slug =
        stripped.length > 0 && stripped !== seg && stripped.length >= 24 ? stripped : seg;
      if (!slug || have.has(slug)) continue;
      have.add(slug);
      out.push({ slug, publishedAt: a.published_at || "" });
    }
    return out;
  } catch {
    return [];
  }
}

async function main() {
  const hn = await fetchHashnodeSlugs();
  const extra = await fetchDevtoSlugsNotInHashnode(hn.map((p) => p.slug));
  const posts = [...hn, ...extra];
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

  console.log(
    `generate-sitemap: wrote ${entries.length} URLs (${hn.length} Hashnode + ${extra.length} dev.to-only blog) → public/sitemap.xml, public/sitemap.txt`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
