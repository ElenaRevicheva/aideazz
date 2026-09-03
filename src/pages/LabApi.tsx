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
  Bot,
  AlertTriangle,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import HeroBackdrop from "@/components/HeroBackdrop";
import { applyPageSeo, SITE_ORIGIN } from "@/lib/seo";
import { LAB_API_INQUIRY_LINK, captureInboundUtms, inquiryLinkFromInbound } from "@/config/marketing";
import { track } from "@/lib/analytics";

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

/**
 * The AIdeazz mark: white name, purple tail. TWO tones, one break.
 *
 * The previous version ran a violet gradient across "AI", left "deazz" white and
 * gradient-filled the tail again — three colour events inside a single word. It
 * read as a mess, and it was: a wordmark's job is to be recognised instantly, and
 * every extra colour boundary is one more thing the eye has to resolve before it
 * can do that. Gradient text also renders differently across browsers, so the one
 * element that must look identical everywhere was the one least able to.
 *
 * Flat fills, one seam, no drop-shadow. Boring on purpose.
 */
/**
 * The AIdeazz A/Z monogram: an A whose crossbar carries on into a Z.
 *
 * Inline SVG rather than a PNG on purpose — it is crisp at every size and on every
 * display, it costs no request, and the gradient is defined in the same place as
 * the rest of the palette instead of baked into pixels somebody has to re-export
 * to change. `id` is scoped per instance so two marks on one page cannot collide.
 */
const AZMark: React.FC<{ className?: string; id?: string }> = ({ className, id = "az" }) => (
  <svg viewBox="0 0 72 72" className={className} fill="none" aria-hidden="true">
    <defs>
      <linearGradient id={`${id}-g`} x1="6" y1="68" x2="66" y2="6" gradientUnits="userSpaceOnUse" spreadMethod="repeat">
        {/* spreadMethod="repeat" plus a ONE-WAY sweep, so the mark travels the
            same direction as the wordmark instead of oscillating. A gradient that
            runs out and comes back reads as a pulse; one that keeps going reads as
            flow, which is the whole difference the podcast gets right. */}
        <animate attributeName="x1" values="6;-54" dur="5s" repeatCount="indefinite" />
        <animate attributeName="x2" values="66;6" dur="5s" repeatCount="indefinite" />
        <stop offset="0" stopColor="#7c3aed" />
        <stop offset="0.42" stopColor="#a855f7" />
        <stop offset="1" stopColor="#facc15" />
      </linearGradient>
    </defs>
    {/* Mitred joins and flat caps, not round: the reference is cut, not drawn with
        a felt tip, and rounded terminals were most of why the first attempt read
        soft where the original reads sharp. The A's left leg runs the full height
        so it dominates, and the Z nests against its right flank rather than
        sitting beside it. */}
    <path
      d="M5 67 35 5l11 23"
      stroke={`url(#${id}-g)`}
      strokeWidth="9"
      strokeLinecap="butt"
      strokeLinejoin="miter"
    />
    <path
      d="M28 36h32L30 62h32"
      stroke={`url(#${id}-g)`}
      strokeWidth="9"
      strokeLinecap="butt"
      strokeLinejoin="miter"
    />
  </svg>
);

const BRAND_FLOW_CSS = `
@keyframes az-flow { 100% { background-position: 220% center; } }
.az-flow {
  background-image: linear-gradient(115deg,#7c3aed,#a855f7 42%,#facc15);
  background-size: 220%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: az-flow 5s linear infinite;
}
@media (prefers-reduced-motion: reduce) {
  .az-flow { animation: none; background-position: 40% center; }
}
`;

const Brand: React.FC<{ tail: string; className?: string }> = ({ tail, className }) => (
  <span className={`inline-flex flex-col leading-none ${className ?? ""}`}>
    <style>{BRAND_FLOW_CSS}</style>
    {/* The reference's own split: AI coloured, deazz white. Running the flow across
        all seven letters was my fix for "two letters cannot show a sweep" -- but it
        changed her logo to solve my problem. The real fix is background-size: at
        200% the whole violet-to-yellow ramp fits across "AI", so the pair shows a
        gradient AND the animation visibly moves it. At 400% only a slice landed on
        them, which is why it read as flat colour changing rather than as flow. */}
    <span className="text-[26px] font-semibold tracking-[-0.02em] sm:text-[30px]">
      <span className="az-flow">AI</span>
      <span className="text-white">deazz</span>
    </span>
    <span className="mt-2 flex items-center gap-2.5">
      <span className="h-px w-6 shrink-0 bg-violet-500" />
      <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/85 sm:text-[11px]">
        {tail}
      </span>
      <span className="h-px w-6 shrink-0 bg-yellow-400" />
    </span>
  </span>
);

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
    captureInboundUtms();
  }, []);

  const autoRan = React.useRef(false);

  async function runAudit(e?: React.FormEvent | string) {
    if (typeof e !== "string") e?.preventDefault();
    const target = (typeof e === "string" ? e : url).trim();
    if (!target || loading) return;
    setUrl(target);
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const inbound = captureInboundUtms();
      const res = await fetch(`${API_BASE}/v1/visibility`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-API-Key": DEMO_KEY },
        body: JSON.stringify({ url: target, ...inbound }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.message || t("labApi.errorGeneric"));
      } else {
        setResult(data as AuditResult);
        // Proves the /api page works as a lead magnet, not just that it loaded.
        track("api_demo_run", { score: (data as AuditResult)?.score });
        // Shareable money-page link — same contract as the webhook docs page.
        if (typeof window !== "undefined") {
          const next = new URL(window.location.href);
          next.searchParams.set("url", target);
          window.history.replaceState(null, "", `${next.pathname}${next.search}`);
        }
      }
    } catch {
      setError(t("labApi.errorGeneric"));
    } finally {
      setLoading(false);
    }
  }

  // /api?url=https://their-site.com auto-runs once on load (outreach share links).
  React.useEffect(() => {
    if (autoRan.current) return;
    if (typeof window === "undefined") return;
    const preset = new URLSearchParams(window.location.search).get("url");
    if (!preset?.trim()) return;
    autoRan.current = true;
    void runAudit(preset.trim());
    // runAudit is recreated each render; the ref is the once-guard.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <HeroBackdrop />

      <WhatsAppFloat />

      <div className="relative z-10 mx-auto max-w-4xl px-5 py-10 sm:px-8">
        {/* Top bar */}
        <div className="mb-10 flex items-center justify-between">
          {/* Was "← Elena Revicheva". A personal name at the top of a product
              page frames everything under it as one person's side project; the
              same page under a lab wordmark reads as a company with an API. The
              destination is unchanged — only what a stranger concludes in the
              first second. */}
          {/* Fallback was /portfolio. "Portfolio" is a freelancer's word and it was
              the one thing a visitor saw on hover; a lab wordmark goes home. The
              UTM branch above it is untouched, so inbound campaign traffic still
              routes to the attributed inquiry form. */}
          {/* Plain "/" — aideazz.xyz, the mission site. Deliberately NOT wrapped in
              inquiryLinkFromInbound: that helper redirects to the attributed inquiry
              form whenever UTMs are present, so campaign traffic clicking the LOGO
              would have landed on a contact form. Same trap as the About link. The
              CTA buttons keep the helper, because converting is their job. */}
          <Link to="/" className="transition-opacity hover:opacity-85">
            <span className="inline-flex items-center gap-3">
              <AZMark id="hdr" className="h-12 w-12 shrink-0 sm:h-14 sm:w-14" />
              <Brand tail="AI Lab" />
            </span>
          </Link>
          <LanguageSwitcher syncQueryParam />
        </div>

        {/* Hero */}
        <div className="text-center">
          {/* A status pill, not a badge. The sparkle icon read as decoration and
              said nothing; a live dot says the thing is running right now, and the
              two facts beside it are the offer — what you get, what it costs. Type
              matches the footer exactly (mono, 11px, 0.18em) so the page opens and
              closes in the same voice. */}
          <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-black/50 px-5 py-2.5 backdrop-blur-md">
            <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-400" />
            </span>
            {/* Single amber, all of it. The pill is one quiet line of status text,
                not a second place to perform the brand — that was what made the
                header noisy: two elements competing to be the logo. */}
            <span className="font-mono text-[13px] uppercase tracking-[0.16em] text-amber-200/85">
              AIdeazz Lab API
              <span className="mx-2 text-amber-200/35">·</span>
              {t("labApi.eyebrowMeta")}
            </span>
          </span>
          {/* Google is the first half, literally and visually. The films run
              natural fruit → cut open → technical object; the headline runs the
              same shape — the settled world in small mono type, then the open
              question in serif. The last two words carry the amber because they
              are the only ones a visitor is actually worried about. */}
          <p
            className="mx-auto mt-7 max-w-3xl font-mono text-[13px] uppercase leading-[1.8] tracking-[0.11em] text-white/60 sm:text-[15px]"
            style={{ textWrap: "balance" } as React.CSSProperties}
          >
            {t("labApi.kicker")}
          </p>
          <h1
            className="mx-auto mt-3 max-w-3xl text-5xl font-normal leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl"
            style={{ fontFamily: "'Instrument Serif', Georgia, serif", textShadow: "0 2px 60px rgba(8,5,14,.75)" }}
          >
            {t("labApi.titleA")}{" "}
            <span className="italic" style={{ color: "#edb867" }}>
              {t("labApi.titleB")}
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-gray-200 sm:text-lg" style={{ textShadow: "0 1px 24px rgba(8,5,14,.9)" }}>
            {t("labApi.subtitle")}
          </p>
        </div>

        {/* Try-it widget */}
        <div className="mt-10 rounded-2xl border border-white/15 bg-black/40 p-5 shadow-2xl shadow-black/60 backdrop-blur-xl sm:p-7">
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
              className="group flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3 font-semibold tracking-tight text-slate-950 ring-1 ring-white/60 transition-all hover:shadow-[0_10px_34px_-10px_rgba(245,200,120,.55)] hover:ring-amber-200 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:shadow-none"
            >
              {loading ? t("labApi.tryLoading") : t("labApi.tryButton")}
              {!loading && (
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              )}
            </button>
          </form>
          <p className="mt-3 text-xs text-gray-400">{t("labApi.tryHint")}</p>
          <p className="mt-2 text-sm font-medium text-purple-200">{t("labApi.tryReceipts")}</p>
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
                    <ol className="space-y-1">
                      {result.topFixes.map((f, i) => (
                        // Zero-padded mono index against a rule, not a bold digit in a
                        // filled purple circle. A circled numeral is the visual language
                        // of a child's worksheet; 01 / 02 / 03 set in monospace is the
                        // language of a terminal, a diff, a line number -- which is what
                        // this list actually is. Padding also keeps the column aligned
                        // once a site scores badly enough to return ten of these.
                        <li
                          key={i}
                          className="flex items-baseline gap-4 border-l border-white/10 py-2 pl-4 text-sm text-gray-200 transition-colors hover:border-amber-300/50"
                        >
                          <span className="shrink-0 font-mono text-[11px] tabular-nums tracking-[0.14em] text-amber-200/70">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="leading-relaxed">{f}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {/* Receipts: every check the engine already returned. Hidden until now. */}
                {result.checks && result.checks.length > 0 && (
                  <div>
                    <div className="mb-3 text-sm font-semibold text-purple-200">
                      {t("labApi.checksTitle", {
                        count: result.checks.length,
                        passed: result.checks.filter((c) => c.status === "pass").length,
                      })}
                    </div>
                    <div className="space-y-5">
                      {result.categories.map((cat) => {
                        const items = result.checks.filter((c) => c.category === cat.id);
                        if (items.length === 0) return null;
                        return (
                          <div key={cat.id}>
                            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                              {cat.label}
                            </div>
                            <ul className="space-y-2">
                              {items.map((c) => {
                                const tone =
                                  c.status === "pass"
                                    ? "border-emerald-400/25 bg-emerald-500/[0.06]"
                                    : c.status === "warn"
                                      ? "border-amber-400/30 bg-amber-500/[0.06]"
                                      : "border-red-400/30 bg-red-500/[0.06]";
                                const icon =
                                  c.status === "pass" ? (
                                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-300" />
                                  ) : c.status === "warn" ? (
                                    <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-300" />
                                  ) : (
                                    <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-300" />
                                  );
                                return (
                                  <li
                                    key={c.id}
                                    className={`rounded-lg border px-3 py-2 text-sm ${tone}`}
                                  >
                                    <div className="flex gap-2 font-medium text-white">
                                      {icon}
                                      <span>{c.label}</span>
                                    </div>
                                    <p className="mt-1 pl-6 text-xs text-gray-300">{c.detail}</p>
                                    {/* `why` is on every check, passing or not. A fix only
                                        helps someone already failing; the 30 checks a good
                                        site passes are where the report either teaches
                                        something or reads as a pass/fail list. */}
                                    {c.why ? (
                                      <p className="mt-1 pl-6 text-xs leading-relaxed text-gray-400">
                                        <span className="text-gray-500">{t("labApi.checkWhyPrefix")}</span>{" "}
                                        {c.why}
                                      </p>
                                    ) : null}
                                    {c.fix ? (
                                      <p className="mt-1 pl-6 text-xs leading-relaxed text-amber-200/90">
                                        <span className="text-amber-200/60">{t("labApi.checkFixPrefix")}</span>{" "}
                                        {c.fix}
                                      </p>
                                    ) : null}
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <p className="text-xs text-gray-400">
                  {t("labApi.shareLabel")}{" "}
                  <a
                    href={`${typeof window !== "undefined" ? window.location.pathname : "/api"}?url=${encodeURIComponent(result.url)}`}
                    className="break-all text-purple-300 hover:text-white"
                  >
                    {`https://aideazz.xyz/api?url=${encodeURIComponent(result.url)}`}
                  </a>
                </p>
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

        {/* CTA — no card. It sits directly on the film, the way hud closes on its
            landscape: the footage is the surface, the type is the only object. */}
        <section className="mt-24 py-16 text-center sm:py-24">
          <h2
            className="mx-auto max-w-3xl text-4xl font-normal leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "'Instrument Serif', Georgia, serif", textShadow: "0 2px 60px rgba(8,5,14,.85)" }}
          >
            {t("labApi.ctaTitleA")}{" "}
            <span className="italic" style={{ color: "#edb867" }}>
              {t("labApi.ctaTitleB")}
            </span>
          </h2>
          <p
            className="mx-auto mt-5 max-w-2xl text-base text-gray-200"
            style={{ textShadow: "0 1px 26px rgba(8,5,14,.95)" }}
          >
            {t("labApi.ctaBody")}
          </p>
          <Link
            to={inquiryLinkFromInbound(LAB_API_INQUIRY_LINK)}
            className="group mt-9 inline-flex items-center gap-2.5 rounded-full bg-white px-9 py-4 text-[17px] font-semibold tracking-tight text-slate-950 ring-1 ring-white/60 shadow-2xl shadow-black/50 transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_50px_-12px_rgba(245,200,120,.55)] hover:ring-amber-200"
          >
            {t("labApi.ctaButton")}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </section>

        {/* Ending — hud's structure exactly: small wordmark and tagline top-left,
            social row beneath, link columns to the right, and then the copyright
            set ENORMOUS in the display serif across the bottom. The oversized
            copyright is the signature move; the brand mark stays quiet. */}
        <footer className="mt-10 border-t border-white/10 pt-16 pb-6">
          {/* The footer wordmark is gone. The copyright below is set ENORMOUS in
              the display serif and already says AIdeazz AI Lab -- a second, smaller
              mark eight lines above it was the brand introducing itself twice on
              its way out. Grid was 4 columns for what is now 2 link lists, so it
              is a flex row: no empty cells to leave behind. */}
          {/* justify-between, not a fixed gap. With the identity block gone the two
              lists were huddling in the left corner of a full-width footer with
              half the row empty beside them. Pushed apart they span the measure and
              the whitespace reads as layout instead of as something missing. */}
          {/* Two columns on a phone as well, not a stack. flex-col left both lists
              hugging the left edge with the right half of the screen empty -- the
              same "everything in the left corner" the desktop had before
              justify-between. A grid fills the width at every size; the flex row
              only takes over at sm, where justify-between can spread them. */}
          <div className="grid grid-cols-2 gap-8 sm:flex sm:justify-between sm:gap-12">
            {/* Trimmed from three columns to two. What went, and why -- none of
                these were broken links, they were links that did not belong here:
                  - "Visibility Audit"  href="#"  a dead anchor, on the page it
                    pointed at. It did nothing at all.
                  - "Portfolio"         the freelancer word already dropped from
                    the header; it undercut the same page twice.
                  - "Dev.to"            already in the social icons two columns
                    left. The same link twice is not two links.
                  - "hello@"            two addresses side by side make a reader
                    choose, and the docs above already name aipa@ as the one that
                    answers about production keys.
                A footer is a place to leave, and every extra exit costs the ones
                that matter. */}
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-gray-500">Resources</div>
              <nav className="mt-5 flex flex-col gap-3 text-[15px]">
                <a href="https://aideazz.xyz/ai-ops-wiki.html" className="text-gray-300 transition-colors hover:text-white">AI Ops Wiki</a>
                <Link to={inquiryLinkFromInbound("/blog")} className="text-gray-300 transition-colors hover:text-white">Blog</Link>
              </nav>
            </div>

            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-gray-500">Company</div>
              <nav className="mt-5 flex flex-col gap-3 text-[15px]">
                {/* NOT wrapped in inquiryLinkFromInbound. That helper swaps its target for the
                    attributed inquiry form whenever UTMs are present, which is right for a
                    CTA and wrong for a nav link -- "About" was dropping people onto
                    #portfolio-inquiry-form instead of the page about her. "Start a project"
                    below keeps the helper, because that one IS the CTA. */}
                <Link to="/portfolio" className="text-gray-300 transition-colors hover:text-white">About</Link>
                <a href="mailto:aipa@aideazz.xyz" className="text-gray-300 transition-colors hover:text-white">aipa@aideazz.xyz</a>
                <Link to={inquiryLinkFromInbound(LAB_API_INQUIRY_LINK)} className="text-white transition-colors hover:text-purple-200">
                  {t("labApi.ctaButton")}
                </Link>
                {/* Same class as every other link in this column. It was an amber
                    bordered pill, which made the legal page the loudest thing in the
                    footer -- louder than "Start a project", which is the one link
                    here that earns money. A policy link should be findable, not
                    persuasive. Plain <a>: policies.html is a static file, so the SPA
                    router would answer it with index.html. */}
                <a href="https://aideazz.xyz/policies.html" className="text-gray-300 transition-colors hover:text-white">
                  {t("labApi.policies")}
                </a>
              </nav>
            </div>
          </div>

          {/* the oversized close */}
          <div className="mt-20 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div
                className="whitespace-nowrap text-[clamp(1.5rem,4.2vw,3.25rem)] leading-[1.05] tracking-tight text-white"
                style={{ fontFamily: "'Instrument Serif', Georgia, serif", textShadow: "0 2px 60px rgba(8,5,14,.9)" }}
              >
                © {new Date().getFullYear()} AIdeazz AI Lab
              </div>
              <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-gray-500">
                Panama · All rights reserved
              </div>

            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
