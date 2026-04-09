/**
 * Live sync with Hashnode via public GraphQL (no token).
 * Daily posts from CTO AIPA appear here automatically — no redeploy required.
 */

import type { BlogPost } from "./blog";

const GQL = "https://gql.hashnode.com/";

export const HASHNODE_PUBLICATION_HOST =
  (import.meta.env.VITE_HASHNODE_HOST as string | undefined)?.trim() || "aideazz.hashnode.dev";

/** Slugs to hide from the portfolio (e.g. API smoke tests). */
const EXCLUDED_SLUGS = new Set([
  "cto-aipa-hashnode-api-smoke-test-2026-04-09t0041-utc",
]);

export interface HashnodeListNode {
  id: string;
  title: string;
  slug: string;
  url: string;
  publishedAt: string;
  brief: string | null;
}

async function gql<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(GQL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  const json = (await res.json()) as { data?: T; errors?: { message: string }[] };
  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join("; "));
  }
  if (!json.data) throw new Error("Empty GraphQL response");
  return json.data;
}

export async function fetchHashnodePostList(first = 30): Promise<HashnodeListNode[]> {
  const query = `
    query Posts($host: String!, $first: Int!) {
      publication(host: $host) {
        posts(first: $first) {
          edges {
            node {
              id
              title
              slug
              url
              publishedAt
              brief
            }
          }
        }
      }
    }
  `;
  type R = {
    publication: {
      posts: {
        edges: { node: HashnodeListNode }[];
      } | null;
    } | null;
  };
  const data = await gql<R>(query, { host: HASHNODE_PUBLICATION_HOST, first });
  const edges = data.publication?.posts?.edges ?? [];
  return edges
    .map((e) => e.node)
    .filter((n) => n.slug && !EXCLUDED_SLUGS.has(n.slug));
}

export interface HashnodePostDetail extends HashnodeListNode {
  contentMarkdown: string;
}

export async function fetchHashnodePostBySlug(slug: string): Promise<HashnodePostDetail | null> {
  const query = `
    query One($host: String!, $slug: String!) {
      publication(host: $host) {
        post(slug: $slug) {
          id
          title
          slug
          url
          publishedAt
          brief
          content {
            markdown
          }
        }
      }
    }
  `;
  type R = {
    publication: {
      post: {
        id: string;
        title: string;
        slug: string;
        url: string;
        publishedAt: string;
        brief: string | null;
        content: { markdown: string | null } | null;
      } | null;
    } | null;
  };
  const data = await gql<R>(query, { host: HASHNODE_PUBLICATION_HOST, slug });
  const p = data.publication?.post;
  if (!p?.content?.markdown) return null;
  return {
    id: p.id,
    title: p.title,
    slug: p.slug,
    url: p.url,
    publishedAt: p.publishedAt,
    brief: p.brief,
    contentMarkdown: p.content.markdown,
  };
}

function isoDateOnly(iso: string): string {
  if (!iso) return "";
  return iso.slice(0, 10);
}

/** Merge local markdown posts with live Hashnode list; local body wins when slug matches Hashnode URL path. */
export function mergeHashnodeWithLocal(
  remote: HashnodeListNode[],
  local: BlogPost[]
): Array<{
  slug: string;
  title: string;
  description: string;
  date: string;
  hashnodeUrl: string;
  hasLocalBody: boolean;
}> {
  const localBySlug = new Map(local.map((p) => [p.slug, p]));
  const localHashnodePath = new Map<string, BlogPost>();
  for (const p of local) {
    if (p.hashnodeUrl) {
      try {
        const path = new URL(p.hashnodeUrl).pathname.replace(/^\//, "").replace(/\/$/, "");
        const last = path.split("/").filter(Boolean).pop();
        if (last) localHashnodePath.set(last, p);
      } catch {
        /* ignore */
      }
    }
  }

  const seen = new Set<string>();
  const merged: Array<{
    slug: string;
    title: string;
    description: string;
    date: string;
    hashnodeUrl: string;
    hasLocalBody: boolean;
  }> = [];

  for (const r of remote) {
    if (EXCLUDED_SLUGS.has(r.slug)) continue;
    const fromPath = localHashnodePath.get(r.slug);
    const fromSlug = localBySlug.get(r.slug);
    const loc = fromPath || fromSlug;
    const slug = r.slug;
    seen.add(slug);
    merged.push({
      slug,
      title: loc?.title || r.title,
      description: loc?.description || (r.brief ?? "").replace(/\s*\.\.\.\s*$/, ""),
      date: loc?.date || isoDateOnly(r.publishedAt),
      hashnodeUrl: r.url,
      hasLocalBody: !!(loc?.body && loc.body.trim().length > 0),
    });
  }

  for (const p of local) {
    if (seen.has(p.slug)) continue;
    merged.push({
      slug: p.slug,
      title: p.title,
      description: p.description,
      date: p.date,
      hashnodeUrl: p.hashnodeUrl ?? "",
      hasLocalBody: !!(p.body && p.body.trim().length > 0),
    });
  }

  merged.sort((a, b) => (a.date < b.date ? 1 : -1));
  return merged;
}
