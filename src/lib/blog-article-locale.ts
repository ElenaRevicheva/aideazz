import esArticleOverrides from "@/i18n/blog-article-overrides.es.json";
import aiAgentEsMd from "@/content/blog-translations/es/what-is-an-ai-agent-a-production-definition-from-the-field.md?raw";

export type ArticleLocaleOverride = {
  title?: string;
  description?: string;
  /** Full markdown; when set, shown for Spanish instead of English body */
  body?: string;
};

type OverridesFile = Record<string, ArticleLocaleOverride>;

const ES = esArticleOverrides as OverridesFile;

/** Full Spanish markdown bodies (when present, replace remote English markdown). */
const ES_BODY_BY_SLUG: Record<string, string> = {
  "what-is-an-ai-agent-a-production-definition-from-the-field": aiAgentEsMd.trim(),
};

export function getArticleLocaleOverride(
  slug: string,
  resolvedLanguage: string | undefined
): ArticleLocaleOverride {
  if (!resolvedLanguage?.toLowerCase().startsWith("es")) return {};
  const fromJson = ES[slug] ?? {};
  const body = ES_BODY_BY_SLUG[slug] ?? fromJson.body;
  return {
    ...fromJson,
    ...(body ? { body } : {}),
  };
}
