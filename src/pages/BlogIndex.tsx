import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, BookOpen, Loader2 } from "lucide-react";
import { useTranslation, Trans } from "react-i18next";
import { getAllPosts } from "@/lib/blog";
import { getArticleLocaleOverride } from "@/lib/blog-article-locale";
import { fetchHashnodePostList, mergeHashnodeWithLocal } from "@/lib/hashnode-public";
import { mergeDevtoOnlyInto, type MergedPostRow } from "@/lib/devto-public";
import { applyPageSeo, SITE_ORIGIN } from "@/lib/seo";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function BlogIndex() {
  const { t, i18n } = useTranslation();
  const [merged, setMerged] = useState<MergedPostRow[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const lang = i18n.resolvedLanguage ?? i18n.language;

  useEffect(() => {
    applyPageSeo({
      title: t("blog.seo.title"),
      description: t("blog.seo.description"),
      canonicalUrl: `${SITE_ORIGIN}/blog`,
      ogTitle: t("blog.seo.ogTitle"),
      ogDescription: t("blog.seo.ogDescription"),
      twitterTitle: t("blog.seo.twitterTitle"),
      twitterDescription: t("blog.seo.twitterDescription"),
    });
  }, [t, lang]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setFetchError(null);
      try {
        const remote = await fetchHashnodePostList(40);
        if (cancelled) return;
        const local = getAllPosts();
        const base = mergeHashnodeWithLocal(remote, local);
        const withDev = await mergeDevtoOnlyInto(base);
        if (cancelled) return;
        setMerged(withDev);
      } catch (e) {
        if (!cancelled) {
          setFetchError(e instanceof Error ? e.message : "Could not load latest articles");
          const local = getAllPosts();
          try {
            const withDev = await mergeDevtoOnlyInto(mergeHashnodeWithLocal([], local));
            if (!cancelled) setMerged(withDev);
          } catch {
            if (!cancelled) setMerged(mergeHashnodeWithLocal([], local) as MergedPostRow[]);
          }
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const posts = merged ?? [];

  return (
    <div className="min-h-screen bg-slate-950 text-white antialiased">
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-purple-950/60 to-slate-950 -z-10" />
      <main className="relative z-10 max-w-3xl mx-auto px-6 py-16">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-purple-300 hover:text-white text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("blog.backToPortfolio")}
          </Link>
          <LanguageSwitcher />
        </div>
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-purple-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
              {t("blog.pageTitle")}
            </h1>
          </div>
          <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">
            <Trans
              i18nKey="blog.intro"
              components={{ highlight: <span className="text-white font-medium" /> }}
            />
          </p>
          {fetchError ? (
            <p className="text-gray-500 text-sm mt-4 border-l-2 border-amber-500/50 pl-3">
              {t("blog.fetchErrorHint")}
            </p>
          ) : null}
        </header>

        {loading ? (
          <div className="flex items-center gap-3 text-purple-300">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>{t("blog.loading")}</span>
          </div>
        ) : posts.length === 0 ? (
          <p className="text-gray-400">{t("blog.empty")}</p>
        ) : (
          <ul className="space-y-6">
            {posts.map((p) => {
              const o = getArticleLocaleOverride(p.slug, lang);
              const title = o.title || p.title;
              const desc = o.description || p.description;
              return (
                <li key={p.slug}>
                  <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:border-purple-500/30 transition-colors shadow-lg shadow-purple-950/20">
                    <time className="text-xs text-purple-400/90 font-mono" dateTime={p.date}>
                      {p.date}
                    </time>
                    <h2 className="text-xl font-semibold mt-2">
                      <Link to={`/blog/${p.slug}`} className="hover:text-purple-300 transition-colors">
                        {title}
                      </Link>
                    </h2>
                    {desc ? (
                      <p className="text-gray-400 mt-2 text-sm leading-relaxed line-clamp-4">{desc}</p>
                    ) : null}
                    <div className="flex flex-wrap gap-4 mt-5">
                      <Link
                        to={`/blog/${p.slug}`}
                        className="inline-flex items-center rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-purple-900/40"
                      >
                        {t("blog.readArticle")}
                      </Link>
                      {p.hashnodeUrl ? (
                        <a
                          href={p.hashnodeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm text-gray-400 hover:text-gray-200 underline-offset-4 hover:underline"
                        >
                          {t("blog.alsoOnHashnode")}
                        </a>
                      ) : null}
                      {p.devtoUrl ? (
                        <a
                          href={p.devtoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm text-gray-400 hover:text-gray-200 underline-offset-4 hover:underline"
                        >
                          {t("blog.alsoOnDevto")}
                        </a>
                      ) : null}
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </div>
  );
}
