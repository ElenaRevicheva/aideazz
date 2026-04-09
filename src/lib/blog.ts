/**
 * Browser-safe markdown frontmatter (no gray-matter / Buffer — fixes "Buffer is not defined" in Vite).
 */
export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  body: string;
  hashnodeUrl?: string;
}

const rawModules = import.meta.glob<string>("../content/blog/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

function fileSlug(path: string): string {
  const base = path.split("/").pop() ?? "";
  return base.replace(/\.md$/, "");
}

/** Parse leading --- ... --- YAML-ish block (quoted values only). */
function parseFrontmatter(raw: string): { data: Record<string, string>; content: string } {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) return { data: {}, content: raw };
  const fm = m[1];
  const content = m[2];
  const data: Record<string, string> = {};
  for (const line of fm.split(/\r?\n/)) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1).replace(/\\"/g, '"');
    }
    data[key] = val;
  }
  return { data, content };
}

function parseAll(): BlogPost[] {
  const posts: BlogPost[] = [];
  for (const path of Object.keys(rawModules)) {
    const raw = rawModules[path];
    const { data: d, content } = parseFrontmatter(raw);
    const slug = (d.slug && d.slug.trim()) || fileSlug(path);
    posts.push({
      slug,
      title: d.title || slug,
      description: d.description || "",
      date: d.date || "",
      body: content.trim(),
      hashnodeUrl: d.hashnodeUrl || undefined,
    });
  }
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

let cache: BlogPost[] | null = null;

export function getAllPosts(): BlogPost[] {
  if (!cache) cache = parseAll();
  return cache;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}
