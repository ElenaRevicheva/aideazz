import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, BookOpen, Loader2 } from "lucide-react";
import { getAllPosts } from "@/lib/blog";
import { fetchHashnodePostList, mergeHashnodeWithLocal } from "@/lib/hashnode-public";

export default function BlogIndex() {
  const [merged, setMerged] = useState<ReturnType<typeof mergeHashnodeWithLocal> | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Writing — AIdeazz | Elena Revicheva";
    const setMeta = (attr: string, key: string, content: string) => {
      let tag = document.querySelector(`meta[${attr}="${key}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attr, key);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };
    setMeta(
      "name",
      "description",
      "Articles on building production AI systems, multi-agent operations, and what it takes to ship."
    );
    setMeta("property", "og:title", "Writing — AIdeazz");
    setMeta(
      "property",
      "og:description",
      "Notes from someone running nine AI agents in production — architecture, trade-offs, and lessons learned."
    );
    setMeta("property", "og:url", "https://aideazz.xyz/blog");
    setMeta("property", "og:type", "website");
    setMeta("property", "og:image", "https://aideazz.xyz/elena-og.jpg");
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", "https://aideazz.xyz/blog");
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setFetchError(null);
      try {
        const remote = await fetchHashnodePostList(40);
        if (cancelled) return;
        const local = getAllPosts();
        setMerged(mergeHashnodeWithLocal(remote, local));
      } catch (e) {
        if (!cancelled) {
          setFetchError(e instanceof Error ? e.message : "Could not load latest articles");
          setMerged(mergeHashnodeWithLocal([], getAllPosts()));
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
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 text-purple-300 hover:text-white text-sm mb-10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Portfolio
        </Link>
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-purple-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
              Writing
            </h1>
          </div>
          <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">
            Practical notes on <span className="text-white font-medium">AI in production</span> — how
            multi-agent systems are wired, what breaks at scale, and how to think about cost and risk. New
            posts appear here regularly; you can read each one in full on this site.
          </p>
          {fetchError ? (
            <p className="text-gray-500 text-sm mt-4 border-l-2 border-amber-500/50 pl-3">
              Showing saved articles. If the list looks incomplete, refresh in a moment.
            </p>
          ) : null}
        </header>

        {loading ? (
          <div className="flex items-center gap-3 text-purple-300">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Loading articles…</span>
          </div>
        ) : posts.length === 0 ? (
          <p className="text-gray-400">No articles yet — check back soon.</p>
        ) : (
          <ul className="space-y-6">
            {posts.map((p) => (
              <li key={p.slug}>
                <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:border-purple-500/30 transition-colors shadow-lg shadow-purple-950/20">
                  <time className="text-xs text-purple-400/90 font-mono" dateTime={p.date}>
                    {p.date}
                  </time>
                  <h2 className="text-xl font-semibold mt-2">
                    <Link to={`/blog/${p.slug}`} className="hover:text-purple-300 transition-colors">
                      {p.title}
                    </Link>
                  </h2>
                  {p.description ? (
                    <p className="text-gray-400 mt-2 text-sm leading-relaxed line-clamp-4">{p.description}</p>
                  ) : null}
                  <div className="flex flex-wrap gap-4 mt-5">
                    <Link
                      to={`/blog/${p.slug}`}
                      className="inline-flex items-center rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-purple-900/40"
                    >
                      Read article
                    </Link>
                    {p.hashnodeUrl ? (
                      <a
                        href={p.hashnodeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-gray-400 hover:text-gray-200 underline-offset-4 hover:underline"
                      >
                        Also on Hashnode
                      </a>
                    ) : null}
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
