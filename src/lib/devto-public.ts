/**
 * Public dev.to API (no key) for articles published there when Hashnode has no public copy
 * (e.g. Hashnode 404 or sync issues). Canonical English source may still be dev.to.
 */

export const DEVTO_USERNAME =
  (import.meta.env.VITE_DEVTO_USERNAME as string | undefined)?.trim() || "elenarevicheva";

export interface DevtoListItem {
  id: number;
  title: string;
  path: string;
  description: string | null;
  published_at: string;
  url: string;
}

/** Aligns with mergeHashnodeWithLocal rows + optional dev.to link */
export type MergedPostRow = {
  slug: string;
  title: string;
  description: string;
  date: string;
  hashnodeUrl: string;
  hasLocalBody: boolean;
  devtoUrl?: string;
};

/** e.g. path /u/foo-bar-baz-59k9 -> last segment */
function lastPathSegment(path: string): string {
  return path.split("/").filter(Boolean).pop() ?? "";
}

/**
 * Aideazz blog URLs use the same slug as Hashnode. Dev.to often appends a short disambiguator
 * (-59k9). Match either exact slug or "slug-*" (dev.to suffix only).
 */
export function devtoPathMatchesBlogSlug(path: string, blogSlug: string): boolean {
  const seg = lastPathSegment(path);
  if (seg === blogSlug) return true;
  if (seg.startsWith(`${blogSlug}-`)) return true;
  return false;
}

/**
 * Heuristic: derive aideazz/Hashnode-style slug from dev.to's path when building the blog index.
 * Strips a trailing -XXXX token (3–6 alphanum) when present so Hashnode and dev.to line up.
 */
function inferAideazzSlugFromDevtoSegment(seg: string): string {
  if (!seg) return seg;
  const stripped = seg.replace(/-[a-z0-9]{3,6}$/i, "");
  /** Long slugs: Dev.to disambiguates with -59k9 style suffix; short titles left as-is. */
  if (stripped.length > 0 && stripped !== seg && stripped.length >= 24) return stripped;
  return seg;
}

export async function fetchDevtoUserArticles(
  perPage = 100
): Promise<DevtoListItem[]> {
  try {
    const res = await fetch(
      `https://dev.to/api/articles?username=${encodeURIComponent(DEVTO_USERNAME)}&per_page=${perPage}`
    );
    if (!res.ok) return [];
    const j = (await res.json()) as DevtoListItem[];
    return Array.isArray(j) ? j : [];
  } catch {
    return [];
  }
}

/**
 * Add dev.to-only posts (not already in the Hashnode+local merge) so /blog/{slug} can resolve
 * and the index lists them.
 */
export async function mergeDevtoOnlyInto(base: import("@/lib/hashnode-public").BlogMergeRow[]): Promise<MergedPostRow[]> {
  const slugs = new Set(base.map((p) => p.slug));
  const list = await fetchDevtoUserArticles(100);
  const extra: MergedPostRow[] = [];

  for (const a of list) {
    const seg = lastPathSegment(a.path);
    const blogSlug = inferAideazzSlugFromDevtoSegment(seg);
    if (!blogSlug || slugs.has(blogSlug)) continue;

    slugs.add(blogSlug);
    const desc = (a.description || "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 480);

    extra.push({
      slug: blogSlug,
      title: a.title,
      description: desc,
      date: (a.published_at || "").slice(0, 10),
      hashnodeUrl: "",
      hasLocalBody: false,
      devtoUrl: a.url || `https://dev.to${a.path}`,
    });
  }

  return [...base, ...extra].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export interface DevtoPostDetail {
  title: string;
  slug: string;
  contentMarkdown: string;
  url: string;
  publishedAt: string;
  brief: string | null;
}

export async function fetchDevtoPostByBlogSlug(
  blogSlug: string
): Promise<DevtoPostDetail | null> {
  const list = await fetchDevtoUserArticles(100);
  const hit = list.find((a) => devtoPathMatchesBlogSlug(a.path, blogSlug));
  if (!hit) return null;

  try {
    const res = await fetch(`https://dev.to/api/articles/${hit.id}`);
    if (!res.ok) return null;
    const j = (await res.json()) as {
      title: string;
      path: string;
      body_markdown?: string;
      url: string;
      published_at: string;
      description?: string;
    };
    const md = j.body_markdown || "";
    if (!md.trim()) return null;
    return {
      title: j.title,
      slug: blogSlug,
      contentMarkdown: md,
      url: j.url || `https://dev.to${j.path || hit.path}`,
      publishedAt: j.published_at || hit.published_at,
      brief: (j.description && j.description.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()) || null,
    };
  } catch {
    return null;
  }
}
