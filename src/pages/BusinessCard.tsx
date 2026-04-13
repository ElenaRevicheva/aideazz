import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import InquiryForm from "@/components/InquiryForm";
import { Globe, Twitter, Linkedin, Mail, ExternalLink, Languages, Github, Cpu, TrendingUp, MessageCircle, Activity, LucideIcon, Zap, Briefcase, Rocket, Gem, Flame, Lightbulb, MessageSquare, MapPin, FileText, Compass, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

function useCountUp(end: number, duration: number = 1500, shouldStart: boolean = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!shouldStart) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, shouldStart]);
  return count;
}

interface AgentLink {
  action: string;
  link: string;
  className?: string;
}

interface Agent {
  icon: LucideIcon;
  iconColor: string;
  iconBgFrom: string;
  iconBgTo: string;
  iconGlow: string;
  title: string;
  subtitle: string;
  desc: string;
  traction: string;
  tech: string;
  action: string;
  link: string;
  badge: string;
  extraLinks?: AgentLink[];
}

interface Particle {
  x: number;
  y: number;
  radius: number;
  dx: number;
  dy: number;
  opacity: number;
}

export default function BusinessCard() {
  const { t, i18n } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const isSpanish = (i18n.resolvedLanguage ?? i18n.language).toLowerCase().startsWith('es');
  const resumeHref = isSpanish ? '/Elena_Revicheva_Resume_ES.pdf' : '/Elena_Revicheva_Resume.pdf';
  const statsRef = useRef<HTMLDivElement>(null);
  const agentCount = useCountUp(10, 1200, isFlipped);
  const monthCount = useCountUp(12, 1200, isFlipped);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
  };

  const handleCardFlip = () => {
    setIsFlipped((prev) => !prev);

    // Keep flip UX anchored at the beginning of the card with an instant jump.
    window.requestAnimationFrame(() => {
      const cardTop = cardRef.current?.getBoundingClientRect().top;
      if (cardTop === undefined) return;

      const targetTop = Math.max(window.scrollY + cardTop, 0);
      const root = document.documentElement;
      const previousBehavior = root.style.scrollBehavior;

      root.style.scrollBehavior = 'auto';
      window.scrollTo(0, targetTop);
      root.style.scrollBehavior = previousBehavior;
    });
  };

  useEffect(() => {
    const pageTitle = isSpanish
      ? "Elena Revicheva | Portafolio de Productos de IA"
      : "Elena Revicheva | AI Products Portfolio";
    const pageDescription = isSpanish
      ? "Portafolio de Elena Revicheva: productos de IA en produccion, agentes autonomos y sistemas reales desplegados."
      : "Portfolio of Elena Revicheva: production AI products, autonomous agents, and real systems deployed.";

    document.title = pageTitle;

    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) {
      descriptionTag.setAttribute("content", pageDescription);
    }

    // OG tags for portfolio page (social sharing)
    const setMetaProperty = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };
    const setMetaName = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setMetaProperty('og:type', 'profile');
    setMetaProperty('og:url', 'https://aideazz.xyz/portfolio');
    setMetaProperty('og:title', pageTitle);
    setMetaProperty('og:description', pageDescription);
    setMetaProperty('og:image', 'https://aideazz.xyz/elena-og.jpg');
    setMetaName('twitter:card', 'summary_large_image');
    setMetaName('twitter:title', pageTitle);
    setMetaName('twitter:description', pageDescription);
    setMetaName('twitter:image', 'https://aideazz.xyz/elena-og.jpg');
    setMetaName('twitter:creator', '@reviceva');

    // JSON-LD: Portfolio structured data for GEO
    const existingLd = document.querySelector('script[data-portfolio-ld]');
    if (existingLd) existingLd.remove();
    const ldScript = document.createElement('script');
    ldScript.type = 'application/ld+json';
    ldScript.setAttribute('data-portfolio-ld', 'true');
    ldScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "mainEntity": {
        "@type": "Person",
        "name": "Elena Revicheva",
        "url": "https://aideazz.xyz/portfolio",
        "image": "https://aideazz.xyz/elena-og.jpg",
        "jobTitle": "AI Systems Builder & Former Deputy CEO",
        "description": "Executive-turned-AI-builder. 7 years Deputy CEO/CLO in digital infrastructure. Ships production AI systems: 9 autonomous agents, multi-model LLM routing (76% Groq / 24% Claude), voice pipelines. $0/month infrastructure on Oracle Cloud.",
        "knowsAbout": ["AI Agents", "Multi-model LLM Routing", "Claude API", "GPT API", "Whisper Voice Pipeline", "Oracle Cloud", "Python", "TypeScript", "AI Automation", "Multi-agent Orchestration", "Telegram Bot Development", "WhatsApp API"],
        "sameAs": [
          "https://linkedin.com/in/elenarevicheva",
          "https://github.com/ElenaRevicheva",
          "https://x.com/reviceva"
        ],
        "makesOffer": {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI Integration & Automation",
            "description": "Production AI systems for startups: LLM API wiring, multi-agent orchestration, voice pipelines, data automation. From an executive who builds and communicates AI systems."
          }
        }
      }
    });
    document.head.appendChild(ldScript);

    // Canonical for portfolio
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://aideazz.xyz/portfolio');
  }, [isSpanish]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    const particleCount = 150;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        dx: (Math.random() - 0.5) * 1.5,
        dy: (Math.random() - 0.5) * 1.5,
        opacity: Math.random() * 0.8 + 0.3
      });
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.radius * 2
        );
        gradient.addColorStop(0, `rgba(138, 43, 226, ${particle.opacity})`);
        gradient.addColorStop(0.5, `rgba(0, 191, 255, ${particle.opacity * 0.5})`);
        gradient.addColorStop(1, 'rgba(138, 43, 226, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fill();

        particle.x += particle.dx;
        particle.y += particle.dy;

        if (particle.x < 0 || particle.x > canvas.width) particle.dx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.dy *= -1;
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const aiCoFounders: Agent[] = [
    {
      icon: Cpu,
      iconColor: "text-blue-300",
      iconBgFrom: "from-blue-500/20",
      iconBgTo: "to-indigo-500/20",
      iconGlow: "bg-blue-500/20",
      title: t('section1.cto.title'),
      subtitle: t('section1.cto.subtitle'),
      desc: t('section1.cto.desc'),
      traction: t('section1.cto.traction'),
      tech: t('section1.cto.tech'),
      action: t('section1.cto.action'),
      link: "https://github.com/ElenaRevicheva/AIPA_AITCF",
      badge: t('section1.cto.badge')
    },
    {
      icon: TrendingUp,
      iconColor: "text-emerald-300",
      iconBgFrom: "from-emerald-500/20",
      iconBgTo: "to-teal-500/20",
      iconGlow: "bg-emerald-500/20",
      title: t('section1.cmo.title'),
      subtitle: t('section1.cmo.subtitle'),
      desc: t('section1.cmo.desc'),
      traction: t('section1.cmo.traction'),
      tech: t('section1.cmo.tech'),
      action: t('section1.cmo.action'),
      link: "https://github.com/ElenaRevicheva/VibeJobHunterAIPA_AIMCF",
      badge: t('section1.cmo.badge')
    }
  ];

  const agents: Agent[] = [
    {
      icon: MessageCircle,
      iconColor: "text-purple-300",
      iconBgFrom: "from-purple-500/20",
      iconBgTo: "to-pink-500/20",
      iconGlow: "bg-purple-500/20",
      title: t('section1.espaluz.title'),
      subtitle: t('section1.espaluz.subtitle'),
      desc: t('section1.espaluz.desc'),
      traction: t('section1.espaluz.traction'),
      tech: t('section1.espaluz.tech'),
      action: t('section1.espaluz.action'),
      link: "https://wa.me/50766623757",
      badge: t('section1.espaluz.badge'),
      extraLinks: [
        { action: t('section1.espaluz.action2'), link: "https://t.me/EspaLuzFamily_bot", className: "bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-400 hover:to-blue-400" },
        { action: t('section1.espaluz.action3'), link: "https://t.me/Influencer_EspaLuz_bot", className: "bg-white/10 hover:bg-white/20 border border-white/10" }
      ]
    },
    {
      icon: Activity,
      iconColor: "text-cyan-300",
      iconBgFrom: "from-cyan-500/20",
      iconBgTo: "to-blue-500/20",
      iconGlow: "bg-cyan-500/20",
      title: t('section1.algom.title'),
      subtitle: t('section1.algom.subtitle'),
      desc: t('section1.algom.desc'),
      traction: t('section1.algom.traction'),
      tech: t('section1.algom.tech'),
      action: t('section1.algom.action'),
      link: "https://x.com/reviceva",
      badge: t('section1.algom.badge')
    }
  ];

  const techStackByCategory = {
    "Backend": ["Python", "Node.js", "TypeScript", "Flask", "FastAPI", "Express.js", "Gunicorn"],
    "Frontend": ["React", "Vite", "Tailwind CSS", "shadcn/ui", "Framer Motion", "i18next"],
    "AI / LLM": ["Claude Opus 4", "Claude Sonnet 4", "Groq (Llama 3.3 70B)", "OpenAI GPT", "Whisper", "Flux Pro", "Luma Dream Machine", "edge-tts", "LangChain", "MCP", "Eliza OS"],
    "Database & Infra": ["Oracle Autonomous DB 26ai (mTLS)", "PostgreSQL", "SQLite", "Oracle Cloud (OCI)", "systemd", "PM2", "Docker"],
    "Integrations": ["GitHub API", "Telegram Bot API", "WhatsApp Cloud API", "Twitter API v2", "PayPal IPN", "Buffer", "Make.com", "CCXT (5 exchanges)", "Playwright"],
    "Web3": ["Polygon", "Thirdweb SDK", "IPFS", "4everland", "MetaMask"]
  };

  const coreStrengths: string[] = [
    t('section2.coreVibes.strength1'),
    t('section2.coreVibes.strength2'),
    t('section2.coreVibes.strength3'),
    t('section2.coreVibes.strength4'),
    t('section2.coreVibes.strength5'),
    t('section2.coreVibes.strength6'),
    t('section2.coreVibes.strength7'),
    t('section2.coreVibes.strength8'),
    t('section2.coreVibes.strength9')
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white antialiased relative overflow-hidden scroll-smooth">
      {/* Premium mesh gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-purple-950/80 to-slate-950" />
      <div className="fixed inset-0 opacity-30" style={{
        backgroundImage: `
          radial-gradient(at 20% 20%, rgba(120, 40, 200, 0.4) 0px, transparent 50%),
          radial-gradient(at 80% 10%, rgba(30, 64, 175, 0.3) 0px, transparent 50%),
          radial-gradient(at 50% 60%, rgba(168, 85, 247, 0.2) 0px, transparent 50%),
          radial-gradient(at 90% 80%, rgba(59, 130, 246, 0.25) 0px, transparent 50%),
          radial-gradient(at 10% 90%, rgba(139, 92, 246, 0.2) 0px, transparent 50%)
        `
      }} />
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none opacity-25" />

      {/* Language Toggle Button */}
      <motion.button
        onClick={toggleLanguage}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed top-6 right-6 z-50 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all font-semibold shadow-lg backdrop-blur-sm border border-white/10 flex items-center gap-2"
      >
        <Languages className="w-4 h-4" />
        <span className="text-sm">{i18n.language === 'en' ? 'ES' : 'EN'}</span>
      </motion.button>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <div 
          ref={cardRef}
          className="relative w-full max-w-5xl cursor-pointer"
          style={{ perspective: '2000px' }}
          onClick={handleCardFlip}
        >
          <motion.div
            className="relative w-full"
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* FRONT SIDE */}
            <div 
              className="w-full"
              style={{ 
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden'
              }}
            >
              <div className="py-12">
                {/* Header */}
                <motion.header 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-12 backdrop-blur-xl bg-white/[0.03] rounded-2xl p-6 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3),0_2px_8px_rgba(139,92,246,0.1)]"
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shadow-lg shadow-purple-500/50 ring-2 ring-purple-500/30 flex-shrink-0"
                      >
                        <img
                          src="/elena-photo.jpg"
                          alt="Elena Revicheva"
                          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                        />
                      </motion.div>
                      <div>
                        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
                          {t('header.name')}
                        </h1>
                        <p className="text-sm text-purple-300 mt-1">
                          {t('header.title')}
                        </p>
                        <p className="text-xs text-gray-300 mt-2 max-w-xl">
                          {t('header.stats')}
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-purple-400" /> 
                            {t('header.location')}
                          </span>
                          <span className="flex items-center gap-1">
                            <Languages className="w-3 h-3 text-blue-400" /> 
                            {t('header.bilingual')}
                          </span>
                          <span className="flex items-center gap-1">
                            <Zap className="w-3 h-3 text-amber-400" /> 
                            {t('header.builder')}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <a href="https://aideazz.xyz" target="_blank" rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all text-sm backdrop-blur-sm border border-white/10">
                        <Globe className="w-4 h-4" />
                        {t('header.websiteButton')}
                      </a>
                      <a href={resumeHref} target="_blank" rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all text-sm backdrop-blur-sm border border-white/10">
                        <FileText className="w-4 h-4" />
                        {t('header.resumeButton')}
                      </a>
                      <a href="mailto:aipa@aideazz.xyz"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all font-semibold shadow-lg shadow-purple-500/50">
                        <Mail className="w-4 h-4"/> {t('header.contactButton')}
                      </a>
                    </div>
                  </div>
                </motion.header>

                <motion.section
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 }}
                  className="mb-10"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-950/50 via-slate-900/70 to-slate-950/80 p-6 sm:p-7 flex flex-col lg:flex-row lg:items-center gap-6 shadow-[0_12px_40px_rgba(88,28,135,0.15)]">
                    <div className="flex gap-4 flex-1 min-w-0">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600/40 to-pink-600/30 border border-white/10">
                        <FileText className="w-6 h-6 text-purple-200" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs uppercase tracking-[0.2em] text-purple-300/90 font-semibold mb-2">
                          {t("writing.badge")}
                        </p>
                        <p className="text-lg sm:text-xl font-semibold text-white leading-snug">
                          {t("writing.title")}
                        </p>
                        <p className="text-sm text-gray-300 mt-2 max-w-2xl leading-relaxed">
                          {t("writing.desc")}
                        </p>
                      </div>
                    </div>
                    <Link
                      to="/blog"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-sm font-semibold text-white whitespace-nowrap shadow-lg shadow-purple-900/40 transition-all shrink-0"
                    >
                      {t("writing.cta")}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.section>

                {/* AI CO-FOUNDERS SECTION */}
                <motion.section 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-12"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <Cpu className="w-6 h-6 text-purple-400" />
                    <h2 className="text-2xl font-bold">{t('section1.cofounderTitle')}</h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {aiCoFounders.map((agent, idx) => (
                      <motion.div
                        key={agent.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + idx * 0.1 }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        className="backdrop-blur-xl bg-white/[0.03] rounded-2xl p-6 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3),0_2px_8px_rgba(139,92,246,0.1)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.4),0_4px_16px_rgba(139,92,246,0.2)] transition-all duration-300 relative overflow-hidden group"
                      >
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-0 group-hover:opacity-20 transition-opacity blur-xl" />
                        
                        <div className="relative z-10">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3 mb-2">
                              {/* Glassmorphic icon badge */}
                              <div className="relative flex-shrink-0">
                                <div className={`absolute inset-0 ${agent.iconGlow} blur-xl rounded-xl`}></div>
                                <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${agent.iconBgFrom} ${agent.iconBgTo} backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-lg`}>
                                  <agent.icon className={`w-6 h-6 ${agent.iconColor}`} strokeWidth={1.5} />
                                </div>
                              </div>
                              <div>
                                <h3 className="text-xl font-bold">{agent.title}</h3>
                                <p className="text-xs text-purple-300">{agent.subtitle}</p>
                              </div>
                            </div>
                            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-xs font-semibold text-green-400">
                              <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                              </span>
                              {agent.badge}
                            </span>
                          </div>

                          <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                            {agent.desc}
                          </p>

                          <div className="space-y-3 mb-4 text-xs">
                            <div>
                              <span className="text-blue-400 font-semibold">Traction:</span>
                              <span className="text-gray-400 ml-2">{agent.traction}</span>
                            </div>
                            <div>
                              <span className="text-purple-400 font-semibold">Tech:</span>
                              <span className="text-gray-400 ml-2">{agent.tech}</span>
                            </div>
                          </div>

                          <a 
                            href={agent.link}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all font-semibold text-sm shadow-lg"
                          >
                            {agent.action} <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>

                {/* AILA ORCHESTRATION DIAGRAM */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="mb-12"
                >
                  <div className="backdrop-blur-xl bg-white/[0.02] rounded-2xl p-6 sm:p-8 border border-white/10">
                    {/* Title */}
                    <div className="text-center mb-6">
                      <p className="text-xs sm:text-sm font-semibold text-purple-300 tracking-wide uppercase mb-1">Orchestration Architecture</p>
                      <p className="text-[10px] sm:text-xs text-gray-500">AILA — Adaptive Intelligent Life Assistant (in development)</p>
                    </div>

                    {/* Hub-Spoke Layout */}
                    <div className="relative flex flex-col items-center gap-4">
                      {/* Top row of agents */}
                      <div className="grid grid-cols-3 gap-3 sm:gap-6 w-full max-w-lg">
                        <div className="text-center">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mb-1.5">
                            <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                          </div>
                          <p className="text-[10px] sm:text-xs font-semibold text-blue-300">CTO AIPA</p>
                          <p className="text-[8px] sm:text-[10px] text-gray-500">Code Review</p>
                        </div>
                        <div className="text-center">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-1.5">
                            <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
                          </div>
                          <p className="text-[10px] sm:text-xs font-semibold text-emerald-300">CMO AIPA</p>
                          <p className="text-[8px] sm:text-[10px] text-gray-500">Job Hunting</p>
                        </div>
                        <div className="text-center">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-1.5">
                            <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
                          </div>
                          <p className="text-[10px] sm:text-xs font-semibold text-cyan-300">VibeJob</p>
                          <p className="text-[8px] sm:text-[10px] text-gray-500">Applications</p>
                        </div>
                      </div>

                      {/* Connection lines to hub */}
                      <div className="flex items-center justify-center w-full max-w-lg">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-purple-500/50" />
                        <div className="flex-1 h-px bg-gradient-to-r from-purple-500/30 via-purple-500/40 to-purple-500/30" />
                        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-purple-500/30 to-purple-500/50" />
                      </div>

                      {/* Central Hub — AILA */}
                      <div className="relative">
                        <div className="absolute inset-0 bg-purple-500/20 blur-2xl rounded-full" />
                        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-purple-600/30 to-pink-600/30 border-2 border-purple-400/40 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                          <p className="text-sm sm:text-base font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">AILA</p>
                          <p className="text-[7px] sm:text-[8px] text-gray-400 text-center leading-tight px-1">Orchestrator</p>
                        </div>
                      </div>

                      {/* Connection lines to bottom */}
                      <div className="flex items-center justify-center w-full max-w-lg">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-purple-500/50" />
                        <div className="flex-1 h-px bg-gradient-to-r from-purple-500/30 via-purple-500/40 to-purple-500/30" />
                        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-purple-500/30 to-purple-500/50" />
                      </div>

                      {/* Bottom row of agents */}
                      <div className="grid grid-cols-3 gap-3 sm:gap-6 w-full max-w-lg">
                        <div className="text-center">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center mb-1.5">
                            <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                          </div>
                          <p className="text-[10px] sm:text-xs font-semibold text-purple-300">EspaLuz</p>
                          <p className="text-[8px] sm:text-[10px] text-gray-500">Life Assistant</p>
                        </div>
                        <div className="text-center">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-1.5">
                            <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
                          </div>
                          <p className="text-[10px] sm:text-xs font-semibold text-amber-300">ALGOM</p>
                          <p className="text-[8px] sm:text-[10px] text-gray-500">Web3 Coach</p>
                        </div>
                        <div className="text-center">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center mb-1.5">
                            <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-pink-400" />
                          </div>
                          <p className="text-[10px] sm:text-xs font-semibold text-pink-300">Creative</p>
                          <p className="text-[8px] sm:text-[10px] text-gray-500">Art & NFTs</p>
                        </div>
                      </div>
                    </div>

                    {/* Mission statement */}
                    <p className="text-center text-[10px] sm:text-xs text-gray-400 mt-6 max-w-md mx-auto leading-relaxed">
                      An AI ecosystem that helps people navigate relocation, professional transformation, and personal growth — evolving alongside them.
                    </p>
                  </div>
                </motion.div>

                {/* LIVE AI PRODUCTS */}
                <motion.section 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mb-12"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <Activity className="w-6 h-6 text-purple-400" />
                    <h2 className="text-2xl font-bold">{t('section1.title')}</h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {agents.map((agent, idx) => (
                      <motion.div
                        key={agent.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + idx * 0.1 }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        className="backdrop-blur-xl bg-white/[0.03] rounded-2xl p-6 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3),0_2px_8px_rgba(139,92,246,0.1)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.4),0_4px_16px_rgba(139,92,246,0.2)] transition-all duration-300 relative overflow-hidden group"
                      >
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-0 group-hover:opacity-20 transition-opacity blur-xl" />
                        
                        <div className="relative z-10">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3 mb-2">
                              {/* Glassmorphic icon badge */}
                              <div className="relative flex-shrink-0">
                                <div className={`absolute inset-0 ${agent.iconGlow} blur-xl rounded-xl`}></div>
                                <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${agent.iconBgFrom} ${agent.iconBgTo} backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-lg`}>
                                  <agent.icon className={`w-6 h-6 ${agent.iconColor}`} strokeWidth={1.5} />
                                </div>
                              </div>
                              <div>
                                <h3 className="text-xl font-bold">{agent.title}</h3>
                                <p className="text-xs text-purple-300">{agent.subtitle}</p>
                              </div>
                            </div>
                            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-xs font-semibold text-green-400">
                              <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                              </span>
                              {agent.badge}
                            </span>
                          </div>

                          <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                            {agent.desc}
                          </p>

                          <div className="space-y-3 mb-4 text-xs">
                            <div>
                              <span className="text-blue-400 font-semibold">Traction:</span>
                              <span className="text-gray-400 ml-2">{agent.traction}</span>
                            </div>
                            <div>
                              <span className="text-purple-400 font-semibold">Tech:</span>
                              <span className="text-gray-400 ml-2">{agent.tech}</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <a
                              href={agent.link}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-semibold text-sm shadow-lg ${agent.extraLinks ? 'bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-400' : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500'}`}
                            >
                              {agent.action} <ExternalLink className="w-4 h-4" />
                            </a>
                            {agent.extraLinks?.map((extra, i) => (
                              <a
                                key={i}
                                href={extra.link}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-semibold text-sm shadow-lg ${extra.className || 'bg-white/10 hover:bg-white/20 border border-white/10'}`}
                              >
                                {extra.action} <ExternalLink className="w-4 h-4" />
                              </a>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>

                {/* OTHER PRODUCTS */}
                <motion.section 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mb-12"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <Briefcase className="w-6 h-6 text-purple-400" />
                    <h2 className="text-2xl font-bold">{t('otherProducts.title')}</h2>
                  </div>

                  <div className="backdrop-blur-xl bg-white/[0.03] rounded-2xl p-6 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3),0_2px_8px_rgba(139,92,246,0.08)]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Product 1 */}
                      <motion.a
                        href={t('otherProducts.product1.link')}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        whileHover={{ scale: 1.02 }}
                        className="p-4 rounded-lg bg-purple-600/10 border border-purple-500/30 hover:border-purple-400/60 transition-all group"
                      >
                        <h3 className="text-sm font-bold text-purple-300 mb-1 group-hover:text-purple-200 transition-colors">
                          {t('otherProducts.product1.name')}
                        </h3>
                        <p className="text-xs text-gray-400 leading-relaxed">
                          {t('otherProducts.product1.desc')}
                        </p>
                      </motion.a>

                      {/* Product 2 - Atuona */}
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="p-4 rounded-lg bg-purple-600/10 border border-purple-500/30 hover:border-purple-400/60 transition-all"
                      >
                        <h3 className="text-sm font-bold text-purple-300 mb-1">
                          {t('otherProducts.product2.name')}
                        </h3>
                        <p className="text-xs text-gray-400 leading-relaxed mb-3">
                          {t('otherProducts.product2.desc')}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <a href={t('otherProducts.product2.link')} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-purple-600/20 hover:bg-purple-600/40 transition-all text-xs font-semibold text-purple-300">
                            atuona.xyz <ExternalLink className="w-3 h-3" />
                          </a>
                          <a href="https://github.com/ElenaRevicheva/atuona" target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-white/5 hover:bg-white/15 transition-all text-xs font-semibold text-gray-400">
                            <Github className="w-3 h-3" /> Gallery
                          </a>
                          <a href="https://github.com/ElenaRevicheva/AIPA_AITCF" target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-white/5 hover:bg-white/15 transition-all text-xs font-semibold text-gray-400">
                            <Github className="w-3 h-3" /> AI Engine
                          </a>
                        </div>
                      </motion.div>

                    </div>
                  </div>
                </motion.section>

                {/* TALENT & TECH STACK */}
                <motion.section 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mb-12"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <Zap className="w-6 h-6 text-blue-400" />
                    <h2 className="text-2xl font-bold">{t('section2.title')}</h2>
                  </div>

                  <div className="mb-6 backdrop-blur-xl bg-blue-600/10 rounded-xl p-4 border border-blue-500/20">
                    <p className="text-sm text-blue-200 mb-2 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-blue-300" />
                      <strong>{t('section2.background.title')}</strong>
                    </p>
                    <p className="text-xs text-gray-300">
                      {t('section2.background.text')}
                    </p>
                  </div>

                  <div className="mb-6 backdrop-blur-xl bg-purple-600/10 rounded-xl p-4 border border-purple-500/20">
                    <p className="text-sm text-purple-200 mb-2 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-purple-300" />
                      <strong>{t('section2.timeline.title')}</strong> <span className="mx-2">—</span> {t('section2.timeline.subtitle')}
                    </p>
                    <p className="text-xs text-white font-semibold mb-1">{t('section2.timeline.keyStats')}</p>
                    <ul className="space-y-1 text-xs text-gray-300">
                      <li>• {t('section2.timeline.stat1')}</li>
                      <li>• {t('section2.timeline.stat2')}</li>
                    </ul>
                  </div>

                  <div className="mt-6 backdrop-blur-xl bg-purple-600/10 rounded-xl p-4 border border-purple-500/20">
                    <p className="text-sm text-purple-200 mb-2 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-400" />
                      <strong>{t('section2.vibeAdvantage.title')}</strong>
                    </p>
                    <p className="text-xs text-gray-300 mb-3">
                      {t('section2.vibeAdvantage.desc')}
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-3 text-xs">
                      <div>
                        <p className="text-gray-400">{t('section2.vibeAdvantage.traditional')}</p>
                        <p className="text-white">{t('section2.vibeAdvantage.traditionalCost')}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">{t('section2.vibeAdvantage.vibeCoding')}</p>
                        <p className="text-green-400">{t('section2.vibeAdvantage.vibeCost')}</p>
                      </div>
                    </div>
                    <p className="text-xs text-purple-300 mt-2">
                      {t('section2.vibeAdvantage.result')}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                      className="backdrop-blur-xl bg-white/[0.03] rounded-2xl p-6 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3),0_2px_8px_rgba(139,92,246,0.08)]"
                    >
                      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <Cpu className="w-5 h-5 text-purple-400" /> {t('section2.techStack.title')}
                      </h3>
                      <div className="space-y-4">
                        {Object.entries(techStackByCategory).map(([category, techs]) => (
                          <div key={category}>
                            <p className="text-xs font-semibold text-purple-300 mb-2">{category}</p>
                            <div className="flex flex-wrap gap-2">
                              {techs.map((tech) => (
                                <span
                                  key={tech}
                                  className="px-2 py-1 rounded-lg bg-purple-600/20 border border-purple-500/30 text-xs font-medium hover:bg-purple-600/40 hover:border-purple-400/50 hover:shadow-[0_0_12px_rgba(168,85,247,0.3)] transition-all duration-200 cursor-default"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                      className="backdrop-blur-xl bg-white/[0.03] rounded-2xl p-6 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3),0_2px_8px_rgba(139,92,246,0.08)]"
                    >
                      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-blue-400" /> {t('section2.coreVibes.title')}
                      </h3>
                      <ul className="space-y-2">
                        {coreStrengths.map((strength, idx) => (
                          <motion.li
                            key={strength}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7 + idx * 0.05 }}
                            className="text-sm text-gray-300 flex items-start gap-2"
                          >
                            <span className="text-purple-400 mt-1">✦</span>
                            <span>{strength}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mt-6 backdrop-blur-xl bg-gradient-to-br from-green-600/30 via-emerald-600/20 to-teal-600/30 rounded-2xl p-8 border-2 border-green-400/60 shadow-[0_8px_32px_rgba(0,0,0,0.3),0_4px_16px_rgba(34,197,94,0.15)]"
                  >
                    <div className="text-center mb-6">
                      <p className="text-2xl font-black mb-1 flex items-center justify-center gap-2">
                        <Briefcase className="w-6 h-6 text-emerald-400" />
                        <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                          {t('section2.openTo.title')}
                        </span>
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div className="backdrop-blur-sm bg-blue-600/10 rounded-xl p-4 border border-blue-500/30">
                        <p className="text-sm font-bold text-purple-300 mb-3">{t('section2.openTo.aiRoles')}</p>
                        <div className="flex flex-wrap gap-2">
                          <span className="text-sm px-3 py-2 bg-blue-600/30 border border-blue-400/50 rounded-lg font-medium hover:bg-blue-600/40 transition-all">{t('section2.openTo.role1')}</span>
                          <span className="text-sm px-3 py-2 bg-blue-600/30 border border-blue-400/50 rounded-lg font-medium hover:bg-blue-600/40 transition-all">{t('section2.openTo.role2')}</span>
                          <span className="text-sm px-3 py-2 bg-blue-600/30 border border-blue-400/50 rounded-lg font-medium hover:bg-blue-600/40 transition-all">{t('section2.openTo.role3')}</span>
                          <span className="text-sm px-3 py-2 bg-blue-600/30 border border-blue-400/50 rounded-lg font-medium hover:bg-blue-600/40 transition-all">{t('section2.openTo.role4')}</span>
                          <span className="text-sm px-3 py-2 bg-blue-600/30 border border-blue-400/50 rounded-lg font-medium hover:bg-blue-600/40 transition-all">{t('section2.openTo.role5')}</span>
                          <span className="text-sm px-3 py-2 bg-blue-600/30 border border-blue-400/50 rounded-lg font-medium hover:bg-blue-600/40 transition-all">{t('section2.openTo.role6')}</span>
                        </div>
                      </div>

                      <div className="backdrop-blur-sm bg-gradient-to-br from-green-600/20 to-emerald-600/20 rounded-xl p-5 border-2 border-green-400/50">
                        <p className="text-base font-bold text-green-300 mb-4 flex items-center gap-2">
                          <Gem className="w-5 h-5 text-emerald-400" />
                          {t('section2.openTo.hybrid.title')}
                        </p>
                        <ul className="text-sm text-gray-200 space-y-3">
                          <li className="flex items-start gap-2">
                            <span className="text-green-400 text-sm leading-5">✦</span>
                            <a 
                              href="https://aideazz.xyz/" 
                              target="_blank" 
                              rel="noreferrer"
                              className="relative group/link"
                            >
                              <span className="relative">
                                {t('section2.openTo.hybrid.item1')}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-blue-400 group-hover/link:w-full transition-all duration-300" />
                              </span>
                              <span className="inline-flex items-center gap-1 ml-2 px-2 py-0.5 bg-gradient-to-r from-green-600 to-blue-600 rounded text-xs font-bold text-white opacity-0 group-hover/link:opacity-100 transition-opacity">
                                {t('section2.openTo.hybrid.item1Button')} <span className="group-hover/link:translate-x-0.5 transition-transform">→</span>
                              </span>
                            </a>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-400 text-sm leading-5">✦</span>
                            <span>{t('section2.openTo.hybrid.item2')}</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-400 text-sm leading-5">✦</span>
                            <span>{t('section2.openTo.hybrid.item3')}</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="mt-8 text-center">
                      <p className="text-xl font-black">
                        <span className="bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent">
                          {t('section2.openTo.closing')}
                        </span>
                      </p>
                    </div>
                  </motion.div>
                </motion.section>

                {/* Contact */}
                <motion.section 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="backdrop-blur-xl bg-white/[0.03] rounded-2xl p-8 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3),0_2px_8px_rgba(139,92,246,0.08)] text-center"
                >
                  <h2 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
                    <Flame className="w-6 h-6 text-orange-400" />
                    {t('contact.title')}
                  </h2>
                  <p className="text-gray-300 mb-3">
                    <strong>{t('contact.forTeams')}</strong> {t('contact.forTeamsDesc')}
                  </p>
                  <p className="text-gray-300 mb-3">
                    <strong>{t('contact.forInvestors')}</strong> {t('contact.forInvestorsDescPre')}<a href="https://www.aideazz.xyz" target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="text-purple-400 hover:text-purple-300 transition-colors font-medium underline underline-offset-2">{t('contact.forInvestorsLink')}</a>{t('contact.forInvestorsDescPost')}{' '}
                    <a href="https://www.aideazz.xyz/pitch.html" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-purple-400 hover:text-purple-300 transition-colors text-sm font-medium">
                      {t('section2.openTo.investment.button')} <span className="text-xs">→</span>
                    </a>
                  </p>
                  <p className="text-gray-300 mb-6">
                    {t('contact.location')}
                  </p>

                  {/* Phase 3: same inquiry + reCAPTCHA as homepage → Oracle business_leads (see CTO AIPA inquiry-proxy) */}
                  <div
                    className="mb-10 max-w-xl mx-auto text-left"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <InquiryForm
                      id="portfolio-inquiry-form"
                      className="max-w-xl mx-auto text-left relative z-20 pointer-events-auto rounded-2xl border border-purple-500/25 bg-white/[0.04] p-6 sm:p-8 scroll-mt-24"
                    />
                  </div>
                  
                  <div className="flex flex-wrap justify-center gap-4">
                    <motion.a 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href="https://x.com/reviceva" 
                      target="_blank" 
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all border border-white/20"
                    >
                      <Twitter className="w-4 h-4" /> {t('contact.twitter')}
                    </motion.a>
                    <motion.a 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href="https://github.com/ElenaRevicheva" 
                      target="_blank" 
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all border border-white/20"
                    >
                      <Github className="w-4 h-4" /> {t('contact.github')}
                    </motion.a>
                    <motion.a 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href="https://www.linkedin.com/in/elenarevicheva/" 
                      target="_blank" 
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all border border-white/20"
                    >
                      <Linkedin className="w-4 h-4" /> {t('contact.linkedin')}
                    </motion.a>
                    <motion.a 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href="mailto:aipa@aideazz.xyz"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all font-semibold shadow-lg"
                    >
                      <Mail className="w-4 h-4" /> {t('contact.email')}
                    </motion.a>
                    <motion.a 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href="https://wa.me/50761666716" 
                      target="_blank" 
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-green-600 hover:bg-green-500 transition-all border border-green-400 shadow-lg shadow-green-500/50 font-semibold"
                    >
                      {t('contact.whatsapp')}
                    </motion.a>
                  </div>

                  <p className="mt-6 text-sm text-purple-300 italic">
                    {t('contact.quote')}
                  </p>
                </motion.section>

                <footer className="mt-12 text-center text-sm text-gray-500">
                  {t('footer.copyright')}
                </footer>

                <div className="mt-6 text-center">
                  <motion.p 
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                    className="text-sm text-purple-400 flex items-center justify-center gap-2"
                  >
                    <ArrowRight className="w-3.5 h-3.5" /> {t('footer.flipPrompt')}
                  </motion.p>
                </div>
              </div>
            </div>

            {/* BACK SIDE */}
            <div 
              className="absolute top-0 left-0 w-full"
              style={{ 
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)'
              }}
            >
              <div className="py-12">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isFlipped ? 1 : 0 }}
                  transition={{ delay: 0.4 }}
                  className="backdrop-blur-xl bg-white/[0.03] rounded-2xl p-12 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3),0_2px_8px_rgba(139,92,246,0.08)] max-w-3xl mx-auto"
                >
                  <div className="text-center mb-8">
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      className="w-24 h-24 mx-auto rounded-2xl overflow-hidden shadow-lg shadow-purple-500/50 ring-2 ring-purple-500/30 mb-4"
                    >
                      <img 
                        src="/elena-photo-back.jpg" 
                        alt="Elena Revicheva"
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <h1 className="text-4xl font-bold mb-2">{t('cardBack.name')}</h1>
                    <p className="text-purple-300 text-lg mb-3">{t('cardBack.founder')}</p>
                    <p className="text-gray-400 text-sm">
                      {t('cardBack.subtitle')}
                    </p>
                    <div className="flex items-center justify-center gap-4 mt-3 text-sm text-gray-400">
                      <span>🇵🇦 {t('cardBack.location')}</span>
                      <span>🧠 {t('cardBack.languages')}</span>
                    </div>
                  </div>

                  <div ref={statsRef} className="grid grid-cols-3 gap-3 sm:gap-6 mb-8">
                    <div className="text-center p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 shadow-lg shadow-purple-500/5">
                      <div className="text-2xl sm:text-3xl font-bold text-purple-400 mb-1">{agentCount}</div>
                      <div className="text-[10px] sm:text-xs text-gray-400 leading-tight">{t('cardBack.stat1')}</div>
                    </div>
                    <div className="text-center p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 shadow-lg shadow-blue-500/5">
                      <div className="text-2xl sm:text-3xl font-bold text-blue-400 mb-1">{monthCount}</div>
                      <div className="text-[10px] sm:text-xs text-gray-400 leading-tight">{t('cardBack.stat2')}</div>
                    </div>
                    <div className="text-center p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 shadow-lg shadow-pink-500/5">
                      <div className="text-2xl sm:text-3xl font-bold text-pink-400 mb-1">OCI</div>
                      <div className="text-[10px] sm:text-xs text-gray-400 leading-tight">{t('cardBack.stat3')}</div>
                    </div>
                  </div>

                  <div className="mb-8 text-center">
                    <p className="text-gray-300 leading-relaxed max-w-2xl mx-auto">
                      {t('cardBack.desc')}
                    </p>
                  </div>

                  {/* VISION SECTION */}
                  <div className="mb-8 backdrop-blur-xl bg-gradient-to-br from-purple-600/10 via-pink-600/10 to-blue-600/10 rounded-xl p-6 border border-white/10">
                    <div className="mb-5">
                      <h3 className="text-xl font-bold mb-2 text-center">
                        <a 
                          href="https://www.aideazz.xyz/" 
                          target="_blank" 
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent hover:from-purple-200 hover:to-pink-200 transition-all"
                        >
                          {t('section3.mainTitle')}
                        </a>
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed mb-2">
                        <a 
                          href="https://www.aideazz.xyz/" 
                          target="_blank" 
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-purple-300 hover:text-purple-200 underline underline-offset-2 transition-colors"
                        >
                          AIdeazz
                        </a>
                        {' '}is an ecosystem of emotionally intelligent agents — born in Panama and supported by{' '}
                        <a 
                          href="https://www.isdistrict.com/" 
                          target="_blank" 
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-purple-300 hover:text-purple-200 underline underline-offset-2 transition-colors"
                        >
                          Innovation Smart District (ISD)
                        </a>
                        . Our mission is to build conscious AI companions that amplify human potential through education, coaching, and trusted digital assistance.
                      </p>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {t('section3.desc2')}
                      </p>
                    </div>

                    <div className="mb-5">
                      <p className="text-gray-300 text-sm leading-relaxed">
                        <Lightbulb className="w-4 h-4 text-purple-300 inline flex-shrink-0" /> {t('section3.vision')}
                      </p>
                    </div>

                    <div className="mb-5">
                      <p className="text-xs text-pink-300 mb-2 flex items-center gap-1.5"><Compass className="w-3.5 h-3.5" /> {t('section3.nextSteps.title')}</p>
                      <ul className="space-y-2 text-xs text-gray-300">
                        <li className="flex items-start gap-2">
                          <span className="text-pink-400">•</span>
                          <span>
                            Scaling{' '}
                            <a 
                              href="https://wa.me/50766623757" 
                              target="_blank" 
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-purple-300 hover:text-purple-200 underline underline-offset-2 transition-colors"
                            >
                              EspaLuz
                            </a>
                            {' '}&{' '}
                            <a 
                              href="https://twitter.com/reviceva" 
                              target="_blank" 
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-purple-300 hover:text-purple-200 underline underline-offset-2 transition-colors"
                            >
                              ALGOM Alpha
                            </a>
                            {' '}to 10K+ users across LATAM
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-pink-400">•</span>
                          {t('section3.nextSteps.step2')}
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-pink-400">•</span>
                          {t('section3.nextSteps.step3')}
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-pink-400">•</span>
                          {t('section3.nextSteps.step4')}
                        </li>
                      </ul>
                    </div>

                    {/* Web3 Section */}
                    <div className="pt-5 border-t border-white/10">
                      <div className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-lg p-4 border border-purple-500/30">
                        <div className="flex items-center gap-2 mb-2">
                          <Globe className="w-5 h-5 text-purple-300" />
                          <p className="text-xs sm:text-sm text-purple-300 font-semibold">{t('section3.web3.title')}</p>
                        </div>
                        <p className="text-[10px] sm:text-xs text-gray-300 mb-3 leading-relaxed">
                          {t('section3.web3.desc')}
                        </p>
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                          <span className="text-[8px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 bg-purple-600/20 border border-purple-500/30 rounded-full text-purple-300 whitespace-nowrap">
                            {t('section3.web3.badge1')}
                          </span>
                          <span className="text-[8px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 bg-blue-600/20 border border-blue-500/30 rounded-full text-blue-300 whitespace-nowrap">
                            {t('section3.web3.badge2')}
                          </span>
                          <span className="text-[8px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 bg-pink-600/20 border border-pink-500/30 rounded-full text-pink-300 whitespace-nowrap">
                            {t('section3.web3.badge3')}
                          </span>
                          <span className="text-[8px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 bg-green-600/20 border border-green-500/30 rounded-full text-green-300 whitespace-nowrap">
                            {t('section3.web3.badge4')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-center gap-3">
                    <a
                      href="https://t.me/elenarevicheva"
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-blue-500 hover:bg-blue-400 transition-all border border-blue-400 shadow-lg shadow-blue-500/50"
                    >
                      <MessageCircle className="w-4 h-4" /> {t('cardBack.telegram')}
                    </a>
                    <a 
                      href="https://x.com/reviceva" 
                      target="_blank" 
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all border border-white/20"
                    >
                      <Twitter className="w-4 h-4" /> {t('cardBack.twitter')}
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/elenarevicheva/" 
                      target="_blank" 
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all border border-white/20"
                    >
                      <Linkedin className="w-4 h-4" /> {t('cardBack.linkedin')}
                    </a>
                    <a 
                      href="mailto:aipa@aideazz.xyz"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all font-semibold shadow-lg"
                    >
                      <Mail className="w-4 h-4" /> {t('cardBack.email')}
                    </a>
                  </div>

                  <div className="mt-8 text-center">
                    <p className="text-sm text-purple-300 italic">
                      {t('cardBack.quote')}
                    </p>
                  </div>

                  <div className="mt-8 text-center">
                    <motion.p 
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ repeat: Infinity, duration: 3 }}
                      className="text-sm text-purple-400 flex items-center justify-center gap-2"
                    >
                      <ArrowRight className="w-3.5 h-3.5" /> {t('cardBack.flipText')}
                    </motion.p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
