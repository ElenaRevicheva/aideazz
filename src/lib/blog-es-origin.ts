/**
 * CTO AIPA serves cached Spanish bundles: GET …/blog/es-bundle/:slug (nginx strips /cto).
 */
export const BLOG_ES_API_ORIGIN = (
  (import.meta.env.VITE_BLOG_ES_API_ORIGIN as string | undefined)?.replace(/\/$/, "") ||
  "https://webhook.aideazz.xyz/cto"
);
