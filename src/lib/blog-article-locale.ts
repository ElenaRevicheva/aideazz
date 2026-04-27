import esArticleOverrides from "@/i18n/blog-article-overrides.es.json";

export type ArticleLocaleOverride = {
  title?: string;
  description?: string;
  /** Full markdown; when set, shown for Spanish instead of English body */
  body?: string;
};

type OverridesFile = Record<string, ArticleLocaleOverride>;

const ES = esArticleOverrides as OverridesFile;

/** Any `src/content/blog-translations/es/<slug>.md` overrides English Hashnode body when locale is Spanish. */
const esBodyModules = import.meta.glob<string>("../content/blog-translations/es/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

function slugFromEsMdPath(filePath: string): string {
  const base = filePath.split("/").pop() ?? "";
  return base.replace(/\.md$/i, "");
}

const ES_BODY_BY_SLUG: Record<string, string> = {};
for (const [path, raw] of Object.entries(esBodyModules)) {
  const slug = slugFromEsMdPath(path);
  const body = typeof raw === "string" ? raw.trim() : "";
  if (slug && body) ES_BODY_BY_SLUG[slug] = body;
}

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
