import matter from "gray-matter";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  body: string;
  /** Optional: same essay on Hashnode — additive distribution, not a replacement */
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

function parseAll(): BlogPost[] {
  const posts: BlogPost[] = [];
  for (const path of Object.keys(rawModules)) {
    const raw = rawModules[path];
    const { data, content } = matter(raw);
    const d = data as Record<string, unknown>;
    const slug = (typeof d.slug === "string" && d.slug) || fileSlug(path);
    posts.push({
      slug,
      title: String(d.title ?? slug),
      description: typeof d.description === "string" ? d.description : "",
      date: typeof d.date === "string" ? d.date : "",
      body: content.trim(),
      hashnodeUrl: typeof d.hashnodeUrl === "string" ? d.hashnodeUrl : undefined,
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
