/**
 * Single place for document title + meta description + OG/Twitter + canonical.
 * Matches defaults in index.html for the home route.
 */

export const SITE_ORIGIN = "https://aideazz.xyz";
export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/elena-og.jpg`;

/** Same strings as index.html — used when mounting `/` so meta resets after visiting /portfolio etc. */
export const HOME_SEO = {
  title: "AIdeazz - AI Personal Assistants That Evolve With You",
  description:
    "AIdeazz builds production AI systems: 9 autonomous agents, multi-model LLM routing, voice pipelines, and AI automation — all running at $0/month on Oracle Cloud. Founded by Elena Revicheva.",
  ogTitle: "AIdeazz — Production AI Systems by Elena Revicheva",
  ogDescription:
    "9 production AI agents. Multi-model LLM routing. Voice pipelines. $0/month infrastructure. Built by an executive-turned-AI-builder.",
  twitterTitle: "AIdeazz — Production AI Systems by Elena Revicheva",
  twitterDescription:
    "9 production AI agents. Multi-model routing (76% Groq / 24% Claude). Voice pipelines. All at $0/month.",
  canonicalUrl: `${SITE_ORIGIN}/`,
  ogType: "website" as const,
};

function ensureMeta(attr: "name" | "property", key: string): HTMLMetaElement {
  const selector = attr === "name" ? `meta[name="${key}"]` : `meta[property="${key}"]`;
  let tag = document.querySelector(selector) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  return tag;
}

function setCanonical(href: string): void {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}

export type ApplyPageSeoOptions = {
  title: string;
  description: string;
  canonicalUrl: string;
  ogType?: "website" | "article" | "profile";
  /** Defaults to `title` */
  ogTitle?: string;
  /** Defaults to `description` */
  ogDescription?: string;
  imageUrl?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterCard?: "summary_large_image" | "summary";
  /** Set e.g. `noindex, follow` for 404 */
  robots?: string;
  /** Default true — homepage uses false in index.html pattern */
  includeTwitterCreator?: boolean;
};

/**
 * Updates head tags for the current SPA route. Safe to call on every navigation.
 */
export function applyPageSeo(opts: ApplyPageSeoOptions): void {
  const img = opts.imageUrl ?? DEFAULT_OG_IMAGE;
  const ogTitle = opts.ogTitle ?? opts.title;
  const ogDesc = opts.ogDescription ?? opts.description;
  const twTitle = opts.twitterTitle ?? ogTitle;
  const twDesc = opts.twitterDescription ?? ogDesc;

  document.title = opts.title;

  ensureMeta("name", "description").setAttribute("content", opts.description);
  ensureMeta("property", "og:type").setAttribute("content", opts.ogType ?? "website");
  ensureMeta("property", "og:url").setAttribute("content", opts.canonicalUrl);
  ensureMeta("property", "og:title").setAttribute("content", ogTitle);
  ensureMeta("property", "og:description").setAttribute("content", ogDesc);
  ensureMeta("property", "og:image").setAttribute("content", img);
  ensureMeta("property", "og:site_name").setAttribute("content", "AIdeazz");

  ensureMeta("name", "twitter:card").setAttribute("content", opts.twitterCard ?? "summary_large_image");
  ensureMeta("name", "twitter:title").setAttribute("content", twTitle);
  ensureMeta("name", "twitter:description").setAttribute("content", twDesc);
  ensureMeta("name", "twitter:image").setAttribute("content", img);

  if (opts.includeTwitterCreator !== false) {
    ensureMeta("name", "twitter:creator").setAttribute("content", "@reviceva");
  }

  if (opts.robots !== undefined) {
    ensureMeta("name", "robots").setAttribute("content", opts.robots);
  } else {
    ensureMeta("name", "robots").setAttribute("content", "index, follow");
  }

  setCanonical(opts.canonicalUrl);
}

/** Restore index.html-equivalent SEO when visiting `/`. */
export function applyHomePageSeo(): void {
  applyPageSeo({
    title: HOME_SEO.title,
    description: HOME_SEO.description,
    canonicalUrl: HOME_SEO.canonicalUrl,
    ogType: HOME_SEO.ogType,
    ogTitle: HOME_SEO.ogTitle,
    ogDescription: HOME_SEO.ogDescription,
    twitterTitle: HOME_SEO.twitterTitle,
    twitterDescription: HOME_SEO.twitterDescription,
    includeTwitterCreator: true,
  });
}
