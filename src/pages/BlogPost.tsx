import { Link, useParams } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, ExternalLink, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getPostBySlug } from "@/lib/blog";
import { getArticleLocaleOverride } from "@/lib/blog-article-locale";
import { fetchDevtoPostByBlogSlug } from "@/lib/devto-public";
import { applyPageSeo, SITE_ORIGIN } from "@/lib/seo";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { BLOG_ES_API_ORIGIN } from "@/lib/blog-es-origin";

type BlogEsBundleJson = {
  title: string;
  brief: string;
  markdown: string;
};

/** Parse **Q: ...** / A: ... pairs from the FAQ section of article markdown. */
function parseFaqFromMarkdown(markdown: string): { q: string; a: string }[] {
  const faqStart = markdown.search(/^## Frequently Asked Questions/m);
  if (faqStart === -1) return [];
  const faqSection = markdown.slice(faqStart);
  const pairs: { q: string; a: string }[] = [];
  const qRegex = /\*\*Q:\s*(.+?)\*\*\s*\nA:\s*(.+?)(?=\n\*\*Q:|\n##|$)/gs;
  let match: RegExpExecArray | null;
  while ((match = qRegex.exec(faqSection)) !== null) {
    const q = match[1]?.trim();
    const a = match[2]?.replace(/\n/g, " ").trim();
    if (q && a) pairs.push({ q, a });
  }
  return pairs;
}

export default function BlogPost() {
  const { t, i18n } = useTranslation();
  const lang = i18n.resolvedLanguage ?? i18n.language;
  const { slug } = useParams<{ slug: string }>();
  const local = slug ? getPostBySlug(slug) : undefined;
  const hasLocalBody = !!(local?.body && local?.body.trim().length > 0);

  const [remoteLoading, setRemoteLoading] = useState(!hasLocalBody && !!slug);
  const [remoteMd, setRemoteMd] = useState<string | null>(null);
  const [remoteMeta, setRemoteMeta] = useState<{
    title: string;
    brief: string | null;
    url: string;
    publishedAt: string;
  } | null>(null);
  const [fromDevto, setFromDevto] = useState(false);
  const [remoteError, setRemoteError] = useState<string | null>(null);
  const [backendMd, setBackendMd] = useState<string | null>(null);
  const [backendMeta, setBackendMeta] = useState<{ title: string; publishedAt: string; devtoUrl: string | null } | null>(null);
  const [serverEsBundle, setServerEsBundle] = useState<BlogEsBundleJson | null>(null);
  const [serverEsLoading, setServerEsLoading] = useState(false);
  const [serverEsError, setServerEsError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug || hasLocalBody) {
      setRemoteLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      setRemoteLoading(true);
      setRemoteError(null);
      setFromDevto(false);

      // Fetch Dev.to and backend cache in parallel; backend is the reliable fallback
      const backendUrl = `${BLOG_ES_API_ORIGIN}/blog/post/${encodeURIComponent(slug)}`;
      const [devtoResult, backendResult] = await Promise.allSettled([
        fetchDevtoPostByBlogSlug(slug),
        fetch(backendUrl).then(async (r) => {
          if (!r.ok) return null;
          const j = (await r.json()) as { title: string; markdown: string; publishedAt: string; devtoUrl: string | null };
          return j?.markdown?.trim() ? j : null;
        }).catch(() => null),
      ]);

      if (cancelled) return;

      // Prefer Dev.to (canonical, has brief); fall back to Oracle cache
      const devto = devtoResult.status === "fulfilled" ? devtoResult.value : null;
      const backend = backendResult.status === "fulfilled" ? backendResult.value : null;

      if (devto) {
        setRemoteMd(devto.contentMarkdown);
        setRemoteMeta({ title: devto.title, brief: devto.brief, url: devto.url, publishedAt: devto.publishedAt });
        setFromDevto(true);
      } else if (backend) {
        setBackendMd(backend.markdown);
        setBackendMeta({ title: backend.title, publishedAt: backend.publishedAt, devtoUrl: backend.devtoUrl });
        setRemoteMd(null);
        setRemoteMeta(null);
      } else {
        const err = devtoResult.status === "rejected" ? (devtoResult.reason instanceof Error ? devtoResult.reason.message : "Load failed") : null;
        if (err) setRemoteError(err);
        setRemoteMd(null);
        setRemoteMeta(null);
      }

      if (!cancelled) setRemoteLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [slug, hasLocalBody]);

  const post = local;
  const enTitle = post?.title ?? remoteMeta?.title ?? backendMeta?.title ?? "";
  const enDescription = post?.description ?? remoteMeta?.brief ?? "";
  const date =
    post?.date ??
    ((remoteMeta?.publishedAt ? remoteMeta.publishedAt.slice(0, 10) : "") ||
      (backendMeta?.publishedAt ? backendMeta.publishedAt.slice(0, 10) : ""));
  const sourceUrl = post?.hashnodeUrl ?? remoteMeta?.url ?? backendMeta?.devtoUrl ?? undefined;
  const enBody = hasLocalBody ? post!.body : remoteMd ?? backendMd ?? "";

  const loc = useMemo(() => {
    if (!slug) return {};
    return getArticleLocaleOverride(slug, lang);
  }, [slug, lang]);

  const hasBundledEsBody = !!(loc.body && loc.body.trim().length > 0);

  useEffect(() => {
    if (!slug) return;
    if (!lang.toLowerCase().startsWith("es")) {
      setServerEsBundle(null);
      setServerEsLoading(false);
      setServerEsError(null);
      return;
    }
    if (hasBundledEsBody) {
      setServerEsBundle(null);
      setServerEsLoading(false);
      setServerEsError(null);
      return;
    }
    let cancelled = false;
    setServerEsLoading(true);
    setServerEsError(null);
    const url = `${BLOG_ES_API_ORIGIN}/blog/es-bundle/${encodeURIComponent(slug)}`;

    // On a cache miss the backend returns 202 {generating} and translates in the
    // background (caches in ~30s); a slow/dropped connection rejects with "Failed to
    // fetch". Both are transient — poll a few times (staying in the "Traduciendo…"
    // state), then quietly fall back to the English original instead of a hard error.
    const MAX_ATTEMPTS = 8;
    const RETRY_MS = 6000;
    let attempt = 0;

    const poll = async () => {
      attempt += 1;
      try {
        const r = await fetch(url);
        if (r.status === 202) {
          if (!cancelled && attempt < MAX_ATTEMPTS) window.setTimeout(poll, RETRY_MS);
          else if (!cancelled) setServerEsLoading(false); // give up quietly → English shows
          return;
        }
        if (!r.ok) {
          let msg = `HTTP ${r.status}`;
          try {
            const j = (await r.json()) as { error?: string };
            if (j?.error) msg = j.error.slice(0, 420);
          } catch {
            /* ignore */
          }
          if (!cancelled) {
            setServerEsBundle(null);
            // 404 = no translatable source for this slug; don't nag, just show English.
            setServerEsError(r.status === 404 ? null : msg);
            setServerEsLoading(false);
          }
          return;
        }
        const j = (await r.json()) as BlogEsBundleJson;
        if (!cancelled) {
          if (j?.markdown?.trim()) {
            setServerEsBundle(j);
            setServerEsError(null);
          } else {
            setServerEsBundle(null);
          }
          setServerEsLoading(false);
        }
      } catch {
        // Network-level reject ("Failed to fetch") — treat as still-generating, retry.
        if (!cancelled && attempt < MAX_ATTEMPTS) {
          window.setTimeout(poll, RETRY_MS);
        } else if (!cancelled) {
          setServerEsBundle(null);
          setServerEsError(null); // quiet fallback to English, never a red banner
          setServerEsLoading(false);
        }
      }
    };
    void poll();
    return () => {
      cancelled = true;
    };
  }, [slug, lang, hasBundledEsBody]);

  const displayTitle = serverEsBundle?.title || loc.title || enTitle;
  const displayDescription =
    (serverEsBundle?.brief && serverEsBundle.brief.trim()) || loc.description || enDescription;
  const displayBody =
    (loc.body && loc.body.trim().length > 0 ? loc.body : "") ||
    (serverEsBundle?.markdown?.trim() ?? "") ||
    enBody;

  const hasEsBody =
    !!(loc.body && loc.body.trim().length > 0) ||
    !!(serverEsBundle?.markdown && serverEsBundle.markdown.trim().length > 0);

  const showEnNotice =
    lang.toLowerCase().startsWith("es") &&
    !!(enBody && enBody.length > 0) &&
    !hasEsBody;

  const showEsTranslating =
    lang.toLowerCase().startsWith("es") &&
    !hasBundledEsBody &&
    serverEsLoading &&
    !serverEsBundle?.markdown;

  /** Browsers / assistive tech: mark prose language (ES translation vs EN original). */
  const proseLang = hasEsBody ? "es" : "en";

  const showContent =
    hasLocalBody ||
    (typeof remoteMd === "string" && remoteMd.length > 0) ||
    (typeof backendMd === "string" && backendMd.length > 0) ||
    (typeof loc.body === "string" && loc.body.trim().length > 0);

  useEffect(() => {
    if (!slug || !displayTitle) return;
    const url = `${SITE_ORIGIN}/blog/${slug}`;
    const desc = (displayDescription || displayTitle).slice(0, 320);
    applyPageSeo({
      title: `${displayTitle} | AIdeazz`,
      description: desc,
      canonicalUrl: url,
      ogType: "article",
      ogTitle: displayTitle,
      ogDescription: desc,
      twitterTitle: displayTitle,
      twitterDescription: desc,
    });

    const existing = document.querySelector("script[data-blog-article-ld]");
    if (existing) existing.remove();
    const ld = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: displayTitle,
      description: displayDescription || displayTitle,
      datePublished: date,
      dateModified: date,
      author: {
        "@type": "Person",
        name: "Elena Revicheva",
        url: `${SITE_ORIGIN}/about`,
      },
      publisher: {
        "@type": "Organization",
        name: "AIdeazz",
        url: SITE_ORIGIN,
      },
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      ...(sourceUrl ? { sameAs: sourceUrl } : {}),
    };
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.setAttribute("data-blog-article-ld", "true");
    s.textContent = JSON.stringify(ld);
    document.head.appendChild(s);

    // Inject FAQPage JSON-LD if the article body contains a FAQ section
    const existingFaq = document.querySelector("script[data-blog-faq-ld]");
    if (existingFaq) existingFaq.remove();
    const faqPairs = parseFaqFromMarkdown(displayBody);
    if (faqPairs.length >= 2) {
      const faqLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqPairs.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      };
      const faqScript = document.createElement("script");
      faqScript.type = "application/ld+json";
      faqScript.setAttribute("data-blog-faq-ld", "true");
      faqScript.textContent = JSON.stringify(faqLd);
      document.head.appendChild(faqScript);
    }

    return () => {
      s.remove();
      document.querySelector("script[data-blog-faq-ld]")?.remove();
    };
  }, [slug, displayTitle, displayDescription, date, sourceUrl, lang, serverEsBundle?.title, displayBody]);

  if (!slug) {
    return null;
  }

  if (remoteLoading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
        <div className="flex items-center gap-3 text-purple-300">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>{t("blog.post.loading")}</span>
        </div>
      </div>
    );
  }

  if (!hasLocalBody && !showContent && !remoteError) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-gray-400 mb-6">{t("blog.post.notFound")}</p>
          <Link to="/blog" className="text-purple-400 hover:text-purple-300">
            {t("blog.post.backToBlog")}
          </Link>
        </div>
      </div>
    );
  }

  if (remoteError && !hasLocalBody && !showContent) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 gap-4">
        <p className="text-amber-400 text-center max-w-md">{remoteError}</p>
        {sourceUrl ? (
          <a href={sourceUrl} className="text-purple-400 hover:text-purple-300">
            {t("blog.post.readOnHashnode")}
          </a>
        ) : null}
        <Link to="/blog" className="text-gray-400 hover:text-gray-300">
          {t("blog.post.backToBlog")}
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white antialiased">
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-purple-950/60 to-slate-950 -z-10" />
      <main className="relative z-10 max-w-3xl mx-auto px-6 py-16">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-purple-300 hover:text-white text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("blog.post.allPosts")}
          </Link>
          <LanguageSwitcher />
        </div>
        <article>
          <header className="mb-10">
            <time className="text-sm text-purple-400 font-mono" dateTime={date}>
              {date}
            </time>
            <h1 className="text-3xl md:text-4xl font-bold mt-3 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              {displayTitle}
            </h1>
            {displayDescription ? (
              <p className="text-gray-400 mt-4 text-lg">{displayDescription}</p>
            ) : null}
          </header>
          {serverEsError && lang.toLowerCase().startsWith("es") ? (
            <p className="mb-8 text-sm text-amber-400 border-l-2 border-amber-500/60 pl-3">
              {t("blog.post.translationFailed")}
              {serverEsError ? `: ${serverEsError}` : ""}
            </p>
          ) : null}
          {showEnNotice ? (
            <p className="mb-8 text-sm text-gray-500 border-l-2 border-amber-500/50 pl-3">
              {t("blog.contentEnglishNotice")}
            </p>
          ) : null}
          <div
            lang={proseLang}
            className="prose prose-invert prose-purple max-w-none prose-headings:text-white prose-a:text-purple-400 prose-strong:text-white"
          >
            {showEsTranslating ? (
              <div className="flex items-center gap-3 text-purple-300 py-12 not-prose">
                <Loader2 className="w-6 h-6 animate-spin shrink-0" />
                <span>{t("blog.post.translatingEs")}</span>
              </div>
            ) : (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  img: ({ alt, ...props }) => (
                    <img
                      {...props}
                      alt={alt?.trim() ? alt : t("blog.post.imageAlt")}
                      loading="lazy"
                      decoding="async"
                    />
                  ),
                }}
              >
                {displayBody}
              </ReactMarkdown>
            )}
          </div>
          {sourceUrl ? (
            <footer className="mt-12 pt-8 border-t border-white/10 text-sm text-gray-400">
              <p>
                {fromDevto && !post?.hashnodeUrl && !hasLocalBody ? (
                  <>
                    {t("blog.post.footerSource")}{" "}
                    <a
                      href={sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 inline-flex items-center gap-1"
                    >
                      {t("blog.post.footerDevto")} <ExternalLink className="w-3 h-3 inline" />
                    </a>
                    {" — "}
                    {t("blog.post.footerSynced")}
                  </>
                ) : (
                  <>
                    {t("blog.post.footerAlso")}{" "}
                    <a
                      href={sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 inline-flex items-center gap-1"
                    >
                      {t("blog.post.footerViewThere")} <ExternalLink className="w-3 h-3 inline" />
                    </a>
                  </>
                )}
              </p>
            </footer>
          ) : null}
        </article>
      </main>
    </div>
  );
}
