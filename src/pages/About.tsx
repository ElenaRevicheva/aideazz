import { useEffect } from "react";
import { applyPageSeo, SITE_ORIGIN } from "@/lib/seo";

export default function About() {
  useEffect(() => {
    applyPageSeo({
      title: "Elena Revicheva — Executive-Turned-AI-Builder | AIdeazz",
      description:
        "Elena Revicheva: 7 years as Deputy CEO in digital infrastructure, now building production AI systems. 10-agent ecosystem (9 in production) running on Oracle Cloud at $0/month.",
      canonicalUrl: `${SITE_ORIGIN}/about`,
      ogType: "profile",
      ogTitle: "Elena Revicheva — Executive-Turned-AI-Builder | AIdeazz",
      ogDescription:
        "7 years board-level executive. 10-agent ecosystem (9 in production). LangGraph + pgvector RAG live. $0/month on Oracle Cloud.",
      twitterTitle: "Elena Revicheva — Executive-Turned-AI-Builder",
      twitterDescription:
        "7 years Deputy CEO. 10-agent ecosystem (9 live). LangGraph stateful pipelines. pgvector RAG. $0/month infra.",
    });

    // JSON-LD Person schema for GEO
    const existingLd = document.querySelector('script[data-about-ld]');
    if (existingLd) existingLd.remove();
    const ldScript = document.createElement("script");
    ldScript.type = "application/ld+json";
    ldScript.setAttribute("data-about-ld", "true");
    ldScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Elena Revicheva",
      url: "https://aideazz.xyz/about",
      image: "https://aideazz.xyz/elena-og.jpg",
      jobTitle: "AI Systems Builder & Former Deputy CEO",
      description:
        "Executive-turned-AI-builder. 7 years Deputy CEO/CLO in digital infrastructure. Ships production AI systems: 10-agent ecosystem (9 in production, AILA in design), LangGraph stateful pipelines, pgvector RAG, multi-model LLM routing, voice pipelines. $0/month on Oracle Cloud.",
      knowsAbout: [
        "AI Agents", "Multi-model LLM Routing", "LangGraph", "pgvector RAG",
        "Claude API", "GPT API", "Voice Pipelines", "Oracle Cloud",
        "Python", "TypeScript", "AI Automation", "Multi-agent Orchestration",
      ],
      sameAs: [
        "https://linkedin.com/in/elenarevicheva",
        "https://github.com/ElenaRevicheva",
        "https://x.com/reviceva",
      ],
      worksFor: { "@type": "Organization", name: "AIdeazz", url: "https://aideazz.xyz" },
      address: { "@type": "PostalAddress", addressLocality: "Panama City", addressCountry: "PA" },
      knowsLanguage: ["en", "ru", "es"],
    });
    document.head.appendChild(ldScript);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white antialiased">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-purple-950/60 to-slate-950 -z-10" />

      <main className="relative z-10 max-w-3xl mx-auto px-6 py-16">
        <article>
          {/* Header */}
          <header className="mb-12">
            <div className="flex items-start gap-6 mb-6">
              <img
                src="/elena-photo.jpg"
                alt="Elena Revicheva"
                className="w-28 h-28 rounded-2xl object-cover ring-2 ring-purple-500/30 shadow-lg shadow-purple-500/30"
              />
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
                  Elena Revicheva
                </h1>
                <p className="text-purple-300 mt-1 text-lg">
                  Executive-Turned-AI-Builder &middot; Founder @ AIdeazz
                </p>
              </div>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              I spent seven years as a Deputy CEO running digital infrastructure programs at the board level. In 2025, I started building AI systems myself. I now run a <strong className="text-white">10-agent ecosystem</strong> (9 in production, AILA in design) on a single Oracle Cloud server at <strong className="text-white">$0/month</strong> infrastructure cost.
            </p>
          </header>

          {/* Phase 1 */}
          <section className="mb-12 backdrop-blur-xl bg-white/[0.03] rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold mb-4 text-purple-300">Phase 1: Executive Leadership (2011–2018)</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Deputy CEO and Chief Legal Officer for Russian public digital infrastructure programs. I led board-level governance, enterprise digital transformation, and cross-functional technical programs in highly regulated environments for over seven years.
            </p>
            <p className="text-gray-300 leading-relaxed">
              This is where I learned to translate complex technical systems into language that boards, regulators, and non-technical stakeholders can act on. Most engineers cannot do this. Most executives cannot ship working software. <strong className="text-white">I do both.</strong>
            </p>
          </section>

          {/* Phase 2 */}
          <section className="mb-12 backdrop-blur-xl bg-white/[0.03] rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold mb-4 text-purple-300">Phase 2: Applied AI Builder (2025–Present)</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              Self-taught using AI-assisted development tools (Cursor, Claude Code). I designed, built, and deployed 9 production AI systems (plus AILA in design) — all running simultaneously on Oracle Cloud at zero monthly cost:
            </p>

            <ol className="space-y-3 text-gray-300 mb-8 list-decimal list-inside">
              <li><strong className="text-white">EspaLuz WhatsApp</strong> — AI Spanish tutor with users across 19 countries</li>
              <li><strong className="text-white">EspaLuz Telegram</strong> — Same tutor, different channel</li>
              <li><strong className="text-white">EspaLuz Influencer</strong> — Content and brand growth bot</li>
              <li><strong className="text-white">Algom Alpha</strong> — Automated crypto and market analysis on X</li>
              <li><strong className="text-white">VibeJobHunter</strong> — Autonomous job hunting engine (3,000+ jobs/hour)</li>
              <li><strong className="text-white">AI Marketing Co-Founder (CMO)</strong> — LinkedIn/Instagram content automation</li>
              <li><strong className="text-white">OpenClaw Vibejob Shortlist</strong> — Voice + text job shortlist bot</li>
              <li><strong className="text-white">Tech Co-Founder (CTO AIPA)</strong> — AI technical co-founder with voice, Telegram, GitHub integration</li>
              <li><strong className="text-white">Creative Co-Founder Atuona</strong> — Creative AI: image, video, text generation + NFT minting</li>
            </ol>

            <h3 className="text-xl font-semibold mb-4 text-white">The Numbers</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                ["9 live", "agents in production 24/7 (10 total ecosystem)"],
                ["$0/month", "Oracle Cloud Always Free"],
                ["76% / 24%", "Groq (speed) / Claude (reasoning)"],
                ["131 tests", "eval framework · LangGraph pipeline live"],
              ].map(([stat, label]) => (
                <div key={stat} className="bg-white/5 rounded-xl p-4 border border-white/5">
                  <div className="text-2xl font-bold text-purple-300">{stat}</div>
                  <div className="text-sm text-gray-400">{label}</div>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-semibold mb-3 text-white">Tech Stack</h3>
            <p className="text-gray-300">
              Python, TypeScript, Node.js, Claude API, GPT API, Groq, LangChain, LangGraph, pgvector (RAG), Oracle Autonomous DB 26ai (mTLS), systemd, PM2, Playwright, Telegram Bot API, WhatsApp Cloud API.
            </p>
          </section>

          {/* What I Can Build */}
          <section className="mb-12 backdrop-blur-xl bg-white/[0.03] rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold mb-4 text-purple-300">What I Can Build For You</h2>
            <p className="text-gray-300 mb-6">If you are a founder who needs AI systems that actually run in production — not demos:</p>
            <ul className="space-y-4 text-gray-300">
              <li>
                <strong className="text-white">AI agent systems</strong> — autonomous bots that monitor, decide, and act without you pressing a button. WhatsApp, Telegram, Slack, email, or any channel your customers use.
              </li>
              <li>
                <strong className="text-white">Intelligent automation pipelines</strong> — connect your data sources to AI-driven decisions. Lead triage, content generation, outreach, document processing. The system runs while you sleep.
              </li>
              <li>
                <strong className="text-white">Multi-model AI architecture</strong> — route cheap fast AI for standard tasks and expensive precise AI only when the stakes are high. Cut your LLM costs without cutting quality.
              </li>
              <li>
                <strong className="text-white">AI marketing engines</strong> — automated content publishing, attribution tracking, and lead scoring. Know exactly which channel sends you paying customers.
              </li>
            </ul>
          </section>

          {/* Contact CTA */}
          <section className="backdrop-blur-xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-8 border border-purple-500/20">
            <h2 className="text-2xl font-bold mb-4 text-white">Let's Talk</h2>
            <p className="text-gray-300 mb-6">
              I work as a fractional AI builder for founders and small teams. If you have a problem that should be solved by an AI system — not a dashboard, not a spreadsheet, an actual autonomous system — reach out.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="mailto:aipa@aideazz.xyz"
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 font-semibold shadow-lg transition-all">
                Email Me
              </a>
              <a href="https://linkedin.com/in/elenarevicheva" target="_blank" rel="noreferrer"
                className="px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 transition-all">
                LinkedIn
              </a>
              <a href="https://github.com/ElenaRevicheva" target="_blank" rel="noreferrer"
                className="px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 transition-all">
                GitHub
              </a>
            </div>
            <p className="text-gray-400 text-sm mt-4">
              Based in Panama City, Panama (UTC-5). Available for remote engagements across the Americas and globally. Bilingual EN/ES.
            </p>
          </section>

          {/* Back link */}
          <div className="mt-8 text-center">
            <a href="/portfolio" className="text-purple-400 hover:text-purple-300 transition-colors">
              &larr; View Full Portfolio
            </a>
          </div>
        </article>
      </main>
    </div>
  );
}
