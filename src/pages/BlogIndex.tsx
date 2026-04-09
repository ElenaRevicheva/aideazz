import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, BookOpen, Loader2, Radio } from "lucide-react";
import { getAllPosts } from "@/lib/blog";
import {
  fetchHashnodePostList,
  mergeHashnodeWithLocal,
  HASHNODE_PUBLICATION_HOST,
} from "@/lib/hashnode-public";

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
      "Long-form writing on production AI, GEO, and agents — synced with Hashnode daily."
    );
    setMeta("property", "og:title", "Writing — AIdeazz");
    setMeta(
      "property",
      "og:description",
      "Production AI systems, infrastructure, and how we ship — on the domain you control."
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
          setFetchError(e instanceof Error ? e.message : "Could not load Hashnode feed");
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
            Essays on <span className="text-white font-medium">shipping AI in production</span>, multi-agent
            ops, and GEO — published on{" "}
            <span className="text-purple-300">aideazz.xyz</span> and mirrored from{" "}
            <span className="text-fuchsia-300">{HASHNODE_PUBLICATION_HOST}</span> so{" "}
            <span className="text-white">new Hashnode posts show up here the same day</span>, no redeploy.
          </p>
          {fetchError ? (
            <p className="text-amber-400/90 text-sm mt-3">
              Live sync unavailable ({fetchError}). Showing bundled posts only — refresh later.
            </p>
          ) : null}
        </header>

        {loading ? (
          <div className="flex items-center gap-3 text-purple-300">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Syncing latest posts from Hashnode…</span>
          </div>
        ) : (
          <ul className="space-y-6">
            {posts.map((p) => (
              <li key={p.slug}>
                <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:border-purple-500/30 transition-colors">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-purple-400/90 font-mono mb-1">
                    <time dateTime={p.date}>{p.date}</time>
                    <span className="text-white/20">·</span>
                    <span className="inline-flex items-center gap-1 text-emerald-400/90">
                      <Radio className="w-3 h-3" />
                      Live feed
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold mt-1">
                    <Link to={`/blog/${p.slug}`} className="hover:text-purple-300 transition-colors">
                      {p.title}
                    </Link>
                  </h2>
                  {p.description ? (
                    <p className="text-gray-400 mt-2 text-sm leading-relaxed line-clamp-4">{p.description}</p>
                  ) : null}
                  <div className="flex flex-wrap gap-4 mt-4">
                    <Link
                      to={`/blog/${p.slug}`}
                      className="inline-flex text-sm font-medium text-purple-400 hover:text-purple-300"
                    >
                      Read on AIdeazz →
                    </Link>
                    {p.hashnodeUrl ? (
                      <a
                        href={p.hashnodeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex text-sm text-gray-500 hover:text-gray-300"
                      >
                        Open on Hashnode
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
