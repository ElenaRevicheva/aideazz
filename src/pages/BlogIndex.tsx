import { Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, BookOpen } from "lucide-react";
import { getAllPosts } from "@/lib/blog";

export default function BlogIndex() {
  const posts = getAllPosts();

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
      "Long-form writing on production AI systems, GEO, and multi-agent operations — AIdeazz."
    );
    setMeta("property", "og:title", "Writing — AIdeazz");
    setMeta(
      "property",
      "og:description",
      "Production AI systems, infrastructure, and how we ship — on the domain we control."
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
          <p className="text-gray-400 text-lg max-w-2xl">
            Canonical long-form on <span className="text-white">aideazz.xyz</span> — same substance you may also see
            syndicated on Hashnode for reach; this URL is the home for GEO and structured data.
          </p>
        </header>
        <ul className="space-y-6">
          {posts.map((p) => (
            <li key={p.slug}>
              <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:border-purple-500/30 transition-colors">
                <time className="text-xs text-purple-400 font-mono" dateTime={p.date}>
                  {p.date}
                </time>
                <h2 className="text-xl font-semibold mt-2">
                  <Link to={`/blog/${p.slug}`} className="hover:text-purple-300 transition-colors">
                    {p.title}
                  </Link>
                </h2>
                {p.description ? (
                  <p className="text-gray-400 mt-2 text-sm leading-relaxed">{p.description}</p>
                ) : null}
                <Link
                  to={`/blog/${p.slug}`}
                  className="inline-block mt-4 text-sm text-purple-400 hover:text-purple-300"
                >
                  Read →
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
