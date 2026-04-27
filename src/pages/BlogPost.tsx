import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, ExternalLink, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getPostBySlug } from "@/lib/blog";
import { fetchHashnodePostBySlug } from "@/lib/hashnode-public";
import { applyPageSeo, SITE_ORIGIN } from "@/lib/seo";

export default function BlogPost() {
  const { t } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const local = slug ? getPostBySlug(slug) : undefined;
  const hasLocalBody = !!(local?.body && local.body.trim().length > 0);

  const [remoteLoading, setRemoteLoading] = useState(!hasLocalBody && !!slug);
  const [remoteMd, setRemoteMd] = useState<string | null>(null);
  const [remoteMeta, setRemoteMeta] = useState<{
    title: string;
    brief: string | null;
    url: string;
    publishedAt: string;
  } | null>(null);
  const [remoteError, setRemoteError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug || hasLocalBody) {
      setRemoteLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      setRemoteLoading(true);
      setRemoteError(null);
      try {
        const r = await fetchHashnodePostBySlug(slug);
        if (cancelled) return;
        if (r) {
          setRemoteMd(r.contentMarkdown);
          setRemoteMeta({
            title: r.title,
            brief: r.brief,
            url: r.url,
            publishedAt: r.publishedAt,
          });
        } else {
          setRemoteMd(null);
          setRemoteMeta(null);
        }
      } catch (e) {
        if (!cancelled) setRemoteError(e instanceof Error ? e.message : "Load failed");
      } finally {
        if (!cancelled) setRemoteLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug, hasLocalBody]);

  const post = local;
  const title = post?.title ?? remoteMeta?.title ?? "";
  const description = post?.description ?? remoteMeta?.brief ?? "";
  const date = post?.date ?? (remoteMeta?.publishedAt ? remoteMeta.publishedAt.slice(0, 10) : "");
  const hashnodeUrl = post?.hashnodeUrl ?? remoteMeta?.url;
  const bodyMd = hasLocalBody ? post!.body : remoteMd ?? "";
  const showContent = hasLocalBody || (remoteMd && remoteMd.length > 0);

  useEffect(() => {
    if (!slug || !title) return;
    const url = `${SITE_ORIGIN}/blog/${slug}`;
    const desc = (description || title).slice(0, 320);
    applyPageSeo({
      title: `${title} | AIdeazz`,
      description: desc,
      canonicalUrl: url,
      ogType: "article",
      ogTitle: title,
      ogDescription: desc,
      twitterTitle: title,
      twitterDescription: desc,
    });

    const existing = document.querySelector("script[data-blog-article-ld]");
    if (existing) existing.remove();
    const ld = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      description: description || title,
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
      ...(hashnodeUrl ? { sameAs: hashnodeUrl } : {}),
    };
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.setAttribute("data-blog-article-ld", "true");
    s.textContent = JSON.stringify(ld);
    document.head.appendChild(s);
    return () => {
      s.remove();
    };
  }, [slug, title, description, date, hashnodeUrl]);

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
        {hashnodeUrl ? (
          <a href={hashnodeUrl} className="text-purple-400 hover:text-purple-300">
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
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-purple-300 hover:text-white text-sm mb-10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("blog.post.allPosts")}
        </Link>
        <article>
          <header className="mb-10">
            <time className="text-sm text-purple-400 font-mono" dateTime={date}>
              {date}
            </time>
            <h1 className="text-3xl md:text-4xl font-bold mt-3 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              {title}
            </h1>
            {description ? <p className="text-gray-400 mt-4 text-lg">{description}</p> : null}
          </header>
          <div className="prose prose-invert prose-purple max-w-none prose-headings:text-white prose-a:text-purple-400 prose-strong:text-white">
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
              {bodyMd}
            </ReactMarkdown>
          </div>
          {hashnodeUrl ? (
            <footer className="mt-12 pt-8 border-t border-white/10 text-sm text-gray-400">
              <p>
                {hasLocalBody ? (
                  <>
                    {t("blog.post.footerAlso")}{" "}
                    <a
                      href={hashnodeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 inline-flex items-center gap-1"
                    >
                      {t("blog.post.footerViewThere")} <ExternalLink className="w-3 h-3 inline" />
                    </a>
                  </>
                ) : (
                  <>
                    {t("blog.post.footerSource")}{" "}
                    <a
                      href={hashnodeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 inline-flex items-center gap-1"
                    >
                      {t("blog.post.footerHashnode")} <ExternalLink className="w-3 h-3 inline" />
                    </a>
                    {t("blog.post.footerSynced")}
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
