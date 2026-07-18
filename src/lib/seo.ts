/**
 * Single place for document title + meta description + OG/Twitter + canonical.
 * Matches defaults in index.html for the home route.
 */

export const SITE_ORIGIN = "https://aideazz.xyz";
/** Link-preview image (WhatsApp, LinkedIn, iMessage). 1200×630, under 300KB. */
export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/aideazz-services-og.jpg`;
/** Person/author photo — JSON-LD only; not used for og:image. */
export const PERSON_OG_IMAGE = `${SITE_ORIGIN}/elena-og.jpg`;

/** Same strings as index.html — used when mounting `/` so meta resets after visiting /portfolio etc. */
export const HOME_SEO = {
  title: "AIdeazz — Live AI Products, AI Audits & Fractional CTO",
  description:
    "Hire proven AI: 9 live products, a free AI Visibility Audit API, and AEO/GEO/tech-SEO services. Working portfolio with live demos at aideazz.xyz/portfolio.",
  ogTitle: "AIdeazz — Live AI Products, Visibility Audits & Fractional CTO",
  ogDescription:
    "9 AI products in production, a free AI Visibility Audit API, and AEO/GEO/tech-SEO services — working portfolio with live demos at aideazz.xyz/portfolio.",
  twitterTitle: "AIdeazz — Live AI Products, Visibility Audits & Fractional CTO",
  twitterDescription:
    "9 AI products in production, a free AI Visibility Audit API, and AEO/GEO/tech-SEO services — working portfolio with live demos at aideazz.xyz/portfolio.",
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
  ensureMeta("property", "og:image:width").setAttribute("content", "1200");
  ensureMeta("property", "og:image:height").setAttribute("content", "630");
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
