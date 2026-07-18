import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShieldCheck,
  Braces,
  MessageSquareText,
  Gauge,
  ArrowRight,
  Check,
  X,
  HelpCircle,
  Copy,
  CheckCheck,
  Sparkles,
  Bot,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { applyPageSeo, SITE_ORIGIN } from "@/lib/seo";
import { LAB_API_INQUIRY_LINK } from "@/config/marketing";

/**
 * Base URL of the AEO/GEO/Tech-SEO Visibility API (cto-aipa express service).
 * Local dev talks to the standalone server on :8098; production goes through the
 * webhook backend. Override with VITE_VISIBILITY_API.
 */
const API_BASE = (
  import.meta.env.VITE_VISIBILITY_API ||
  (typeof window !== "undefined" &&
  /^(localhost|127\.0\.0\.1)$/.test(window.location.hostname)
    ? "http://localhost:8098"
    : "https://webhook.aideazz.xyz/cto")
).replace(/\/$/, "");

const DEMO_KEY = "aidz_demo_visibility_2026";

type CheckStatus = "pass" | "warn" | "fail";
interface EngineVisibility {
  engine: string;
  crawler: string;
  crawlable: "yes" | "blocked" | "unknown";
}
interface CategoryScore {
  id: string;
  label: string;
  score: number;
  weight: number;
  passed: number;
  total: number;
}
interface AuditCheck {
  id: string;
  category: string;
  label: string;
  status: CheckStatus;
  impact: "high" | "medium" | "low";
  detail: string;
  fix?: string;
}
interface AuditResult {
  url: string;
  score: number;
  grade: string;
  verdict: string;
  aiEngines: EngineVisibility[];
  categories: CategoryScore[];
  checks: AuditCheck[];
  topFixes: string[];
}

function gradeColor(score: number): string {
  if (score >= 85) return "#34d399"; // emerald
  if (score >= 70) return "#a3e635"; // lime
  if (score >= 55) return "#fbbf24"; // amber
  if (score >= 40) return "#fb923c"; // orange
  return "#f87171"; // red
}

const ScoreRing: React.FC<{ score: number; grade: string; label: string }> = ({
  score,
  grade,
  label,
}) => {
  const r = 54;
  const c = 2 * Math.PI * r;
  const color = gradeColor(score);
  return (
    <div className="relative flex h-40 w-40 shrink-0 items-center justify-center">
      <svg className="h-40 w-40 -rotate-90" viewBox="0 0 128 128">
        <circle cx="64" cy="64" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
        <motion.circle
          cx="64"
          cy="64"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c - (c * score) / 100 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-4xl font-bold text-white">{score}</span>
        <span className="text-sm font-semibold" style={{ color }}>
          {grade}
        </span>
        <span className="mt-0.5 text-[10px] uppercase tracking-wide text-gray-400">{label}</span>
      </div>
    </div>
  );
};

export default function LabApi() {
  const { t } = useTranslation();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  React.useEffect(() => {
    applyPageSeo({
      title: "AIdeazz Lab API — AI Visibility Audit (AEO · GEO · Tech SEO)",
      description:
        "Free API and live tool: audit whether ChatGPT, Perplexity, Claude and Gemini can find, understand and quote your site. AEO, GEO and technical SEO scored in seconds.",
      canonicalUrl: `${SITE_ORIGIN}/api`,
    });
  }, []);

  async function runAudit(e?: React.FormEvent) {
    e?.preventDefault();
    const target = url.trim();
    if (!target || loading) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch(`${API_BASE}/v1/visibility`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-API-Key": DEMO_KEY },
        body: JSON.stringify({ url: target }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.message || t("labApi.errorGeneric"));
      } else {
        setResult(data as AuditResult);
      }
    } catch {
      setError(t("labApi.errorGeneric"));
    } finally {
      setLoading(false);
    }
  }

  const categories = [
    { icon: Bot, title: t("labApi.cat1Title"), desc: t("labApi.cat1Desc") },
    { icon: Braces, title: t("labApi.cat2Title"), desc: t("labApi.cat2Desc") },
    { icon: MessageSquareText, title: t("labApi.cat3Title"), desc: t("labApi.cat3Desc") },
    { icon: ShieldCheck, title: t("labApi.cat4Title"), desc: t("labApi.cat4Desc") },
  ];

  const curlSnippet = useMemo(
    () =>
      `curl -X POST ${API_BASE.replace("http://localhost:8098", "https://webhook.aideazz.xyz/cto")}/v1/visibility \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: ${DEMO_KEY}" \\
  -d '{"url":"https://example.com"}'`,
    [],
  );

  function copyKey() {
    navigator.clipboard?.writeText(DEMO_KEY).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white antialiased relative overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-purple-950/70 to-slate-950" />
      <div
        className="fixed inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(at 15% 15%, rgba(120,40,200,0.35) 0px, transparent 50%),
            radial-gradient(at 85% 10%, rgba(30,64,175,0.3) 0px, transparent 50%),
            radial-gradient(at 50% 80%, rgba(168,85,247,0.2) 0px, transparent 50%)`,
        }}
      />

      <WhatsAppFloat />

      <div className="relative z-10 mx-auto max-w-4xl px-5 py-10 sm:px-8">
        {/* Top bar */}
        <div className="mb-10 flex items-center justify-between">
          <Link to="/portfolio" className="text-sm text-purple-300 hover:text-white transition-colors">
            ← Elena Revicheva
          </Link>
          <LanguageSwitcher syncQueryParam />
        </div>

        {/* Hero */}
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-purple-200">
            <Sparkles className="h-3.5 w-3.5" /> {t("labApi.eyebrow")}
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl bg-gradient-to-br from-white via-purple-100 to-purple-300 bg-clip-text text-4xl font-bold leading-tight text-transparent sm:text-5xl">
            {t("labApi.title")}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-gray-300 sm:text-lg">
            {t("labApi.subtitle")}
          </p>
        </div>

        {/* Try-it widget */}
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-purple-950/40 backdrop-blur sm:p-7">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-purple-200">
            <Gauge className="h-4 w-4" /> {t("labApi.tryTitle")}
          </div>
          <form onSubmit={runAudit} className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={t("labApi.tryPlaceholder")}
                inputMode="url"
                className="w-full rounded-xl border border-white/10 bg-slate-900/70 py-3 pl-10 pr-3 text-white placeholder-gray-500 outline-none transition-colors focus:border-purple-400/60"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !url.trim()}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 font-semibold text-white shadow-lg shadow-purple-900/40 transition-all hover:from-purple-500 hover:to-pink-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? t("labApi.tryLoading") : t("labApi.tryButton")}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>
          <p className="mt-3 text-xs text-gray-400">{t("labApi.tryHint")}</p>
          <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
            <ShieldCheck className="h-3.5 w-3.5" /> {t("labApi.badge")}
          </div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Result */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-6 space-y-6 border-t border-white/10 pt-6"
              >
                <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center">
                  <ScoreRing score={result.score} grade={result.grade} label={t("labApi.scoreLabel")} />
                  <div className="flex-1">
                    <div className="text-lg font-semibold text-white">{result.url}</div>
                    <p className="mt-1 text-sm text-gray-300">{result.verdict}</p>
                  </div>
                </div>

                {/* Engines */}
                <div>
                  <div className="mb-2 text-sm font-semibold text-purple-200">
                    {t("labApi.enginesTitle")}
                  </div>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {result.aiEngines.map((e) => {
                      const ok = e.crawlable === "yes";
                      const blocked = e.crawlable === "blocked";
                      return (
                        <div
                          key={e.crawler}
                          className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs ${
                            blocked
                              ? "border-red-400/40 bg-red-500/10 text-red-200"
                              : ok
                                ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-200"
                                : "border-white/10 bg-white/5 text-gray-300"
                          }`}
                        >
                          {blocked ? (
                            <X className="h-3.5 w-3.5 shrink-0" />
                          ) : ok ? (
                            <Check className="h-3.5 w-3.5 shrink-0" />
                          ) : (
                            <HelpCircle className="h-3.5 w-3.5 shrink-0" />
                          )}
                          <span className="truncate">{e.engine}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Category bars */}
                <div>
                  <div className="mb-2 text-sm font-semibold text-purple-200">
                    {t("labApi.categoriesResultTitle")}
                  </div>
                  <div className="space-y-3">
                    {result.categories.map((c) => (
                      <div key={c.id}>
                        <div className="mb-1 flex justify-between text-xs text-gray-300">
                          <span>{c.label}</span>
                          <span className="font-semibold text-white">{c.score}/100</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-white/10">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${c.score}%` }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="h-full rounded-full"
                            style={{ background: gradeColor(c.score) }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top fixes */}
                {result.topFixes.length > 0 && (
                  <div>
                    <div className="mb-2 text-sm font-semibold text-purple-200">
                      {t("labApi.fixesTitle")}
                    </div>
                    <ol className="space-y-2">
                      {result.topFixes.map((f, i) => (
                        <li key={i} className="flex gap-3 rounded-lg bg-white/[0.04] px-3 py-2 text-sm text-gray-200">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-500/30 text-xs font-bold text-purple-200">
                            {i + 1}
                          </span>
                          {f}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* What it checks */}
        <section className="mt-16">
          <h2 className="text-center text-2xl font-bold text-white sm:text-3xl">
            {t("labApi.whatItChecksTitle")}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-gray-400">
            {t("labApi.whatItChecksSub")}
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {categories.map((c) => (
              <div
                key={c.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-purple-400/30"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/15 text-purple-300">
                  <c.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-white">{c.title}</h3>
                <p className="mt-2 text-sm text-gray-400">{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* API usage */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">{t("labApi.apiTitle")}</h2>
          <p className="mt-3 max-w-2xl text-sm text-gray-400">{t("labApi.apiSub")}</p>

          <div className="mt-5 flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <span className="text-xs uppercase tracking-wide text-gray-400">
              {t("labApi.apiDemoKeyLabel")}
            </span>
            <code className="rounded-md bg-slate-900 px-3 py-1 text-sm text-emerald-300">{DEMO_KEY}</code>
            <button
              onClick={copyKey}
              className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs text-gray-200 transition-colors hover:bg-white/10"
            >
              {copied ? <CheckCheck className="h-3.5 w-3.5 text-emerald-300" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? t("labApi.apiCopied") : t("labApi.apiCopy")}
            </button>
          </div>

          <pre className="mt-4 overflow-x-auto rounded-xl border border-white/10 bg-slate-900/80 p-4 text-xs leading-relaxed text-gray-200 sm:text-sm">
            <code>{curlSnippet}</code>
          </pre>
        </section>

        {/* Why */}
        <section className="mt-16 rounded-2xl border border-purple-400/20 bg-gradient-to-br from-purple-950/40 to-slate-900/40 p-7">
          <h2 className="text-xl font-bold text-white">{t("labApi.whyTitle")}</h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-300">{t("labApi.whyBody")}</p>
        </section>

        {/* CTA */}
        <section className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">{t("labApi.ctaTitle")}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-400">{t("labApi.ctaBody")}</p>
          <Link
            to={LAB_API_INQUIRY_LINK}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-purple-900/40 transition-all hover:from-purple-500 hover:to-pink-500"
          >
            {t("labApi.ctaButton")} <ArrowRight className="h-4 w-4" />
          </Link>
        </section>

        <footer className="mt-16 border-t border-white/10 pt-6 text-center text-xs text-gray-500">
          {t("labApi.footerNote")}
        </footer>
      </div>
    </div>
  );
}
