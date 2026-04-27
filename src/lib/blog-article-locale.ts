import esArticleOverrides from "@/i18n/blog-article-overrides.es.json";

export type ArticleLocaleOverride = {
  title?: string;
  description?: string;
  /** Full markdown; when set, shown for Spanish instead of English body */
  body?: string;
};

type OverridesFile = Record<string, ArticleLocaleOverride>;

const ES = esArticleOverrides as OverridesFile;

export function getArticleLocaleOverride(
  slug: string,
  resolvedLanguage: string | undefined
): ArticleLocaleOverride {
  if (!resolvedLanguage?.toLowerCase().startsWith("es")) return {};
  return ES[slug] ?? {};
}
