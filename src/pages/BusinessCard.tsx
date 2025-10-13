import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Globe, Twitter, Linkedin, Mail, ExternalLink, Sparkles } from "lucide-react";

interface Agent {
  emoji: string;
  title: string;
  subtitle: string;
  desc: string;
  traction: string;
  tech: string;
  action: string;
  link: string;
  badge: string;
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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);

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

  const agents: Agent[] = [
    {
      emoji: "🪄",
      title: "EspaLuz",
      subtitle: "WhatsApp AI Spanish Tutor",
      desc: "Emotionally intelligent conversational tutor for expats & travelers across 19 Spanish-speaking countries. Real dialogue, not word-by-word translation.",
      traction: "Growing organically with early user adoption across Panama and LATAM • PayPal Subscriptions LIVE, Crypto integrated",
      tech: "Python, OpenAI GPT, WhatsApp API, LangChain, Conversation Design",
      action: "Chat on WhatsApp",
      link: "https://wa.me/50766623757",
      badge: "LIVE"
    },
    {
      emoji: "🧠",
      title: "ALGOM Alpha",
      subtitle: "AI Crypto Advisor for Post-Scammer Era",
      desc: "AI trading agent with autonomous paper trading. Real-time market analysis across 5 exchanges (Bybit, Binance, Kraken, OKX, Coinbase) using technical indicators (MA, RSI) and risk management.",
      traction: "First 180 followers attracted • Paper trading LIVE on Railway • Engaging crypto community through trading education and auto-posting market insights to X",
      tech: "Node.js, Eliza OS, CCXT (5 exchanges), Twitter API v2, WebSocket, Technical indicators (MA, RSI)",
      action: "Follow on X",
      link: "https://x.com/reviceva",
      badge: "LIVE"
    }
  ];

  const techStack: string[] = [
    "OpenAI GPT-4", "Anthropic Claude", "ElizaOS", "Python", 
    "TypeScript", "React", "Node.js", "Flask", "Supabase", "Tailwind"
  ];

  const coreStrengths: string[] = [
    "AI Product Vision & Strategy",
    "Conversational UX Design",
    "0→1 Execution (proven by live agents)",
    "Human-AI Interaction Design",
    "Cross-domain Problem Solving",
    "Bilingual Product (EN/ES)"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white antialiased relative overflow-hidden">
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none opacity-40" />
      
      <div className="fixed top-0 left-0 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <div 
          className="relative w-full max-w-5xl cursor-pointer"
          style={{ perspective: '2000px' }}
          onClick={() => setIsFlipped(!isFlipped)}
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
                  className="mb-12 backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10 shadow-2xl"
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        className="w-20 h-20 rounded-2xl overflow-hidden shadow-lg shadow-purple-500/50 ring-2 ring-purple-500/30"
                      >
                        <img 
                          src="/elena-photo.jpg" 
                          alt="Elena Revicheva"
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                      <div>
                        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
                          Elena Revicheva
                        </h1>
                        <p className="text-sm text-purple-300 mt-1">
                          Founder @ AIdeazz | AI-First Engineer | Solo Vibe Coder
                        </p>
                        <p className="text-xs text-gray-300 mt-2 max-w-xl">
                          6 deployments (4 live AI agents, 2 apps) • 7 months solo vibe coded • &lt;$15K • Early traction
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                          <span>📍 Panama</span>
                          <span>🧠 Bilingual EN/ES</span>
                          <span>⚡ Builder & Founder</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <a href="https://aideazz.xyz" target="_blank" rel="noreferrer" 
                        onClick={(e) => e.stopPropagation()}
                        className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all text-sm backdrop-blur-sm border border-white/10">
                        🌐 AIdeazz
                      </a>
                      <a href="mailto:aipa@aideazz.xyz" 
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all font-semibold shadow-lg shadow-purple-500/50">
                        <Mail className="w-4 h-4"/> Hire Me
                      </a>
                    </div>
                  </div>
                </motion.header>

                {/* 1️⃣ TRACTION */}
                <motion.section 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-12"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <Sparkles className="w-6 h-6 text-purple-400" />
                    <h2 className="text-2xl font-bold">1️⃣ Live AI Products — Monetization Ready.</h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {agents.map((agent, idx) => (
                      <motion.div
                        key={agent.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + idx * 0.1 }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10 shadow-2xl hover:shadow-purple-500/30 transition-all relative overflow-hidden group"
                      >
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-0 group-hover:opacity-20 transition-opacity blur-xl" />
                        
                        <div className="relative z-10">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <span className="text-3xl">{agent.emoji}</span>
                                <div>
                                  <h3 className="text-xl font-bold">{agent.title}</h3>
                                  <p className="text-xs text-purple-300">{agent.subtitle}</p>
                                </div>
                              </div>
                            </div>
                            <motion.span 
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ repeat: Infinity, duration: 2 }}
                              className="px-3 py-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-black text-xs font-bold shadow-lg"
                            >
                              {agent.badge}
                            </motion.span>
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

                {/* 2️⃣ TALENT */}
                <motion.section 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mb-12"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <Sparkles className="w-6 h-6 text-blue-400" />
                    <h2 className="text-2xl font-bold">2️⃣ How I Built This Alone</h2>
                  </div>

                  <div className="mb-6 backdrop-blur-xl bg-purple-600/10 rounded-xl p-4 border border-purple-500/20">
                    <p className="text-sm text-purple-200 mb-2">
                      <strong>⚡ March-October 2025</strong> — Solo Founder Journey
                    </p>
                    <p className="text-xs text-gray-300">
                      Built and shipped 7 AI projects from scratch. Learned to code while building. 
                      Shipped 2 live agents (EspaLuz & ALGOM Alpha) now serving users across 19 Spanish-speaking countries.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                      className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10 shadow-2xl"
                    >
                      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        ⚙️ Tech Stack
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {techStack.map((tech, idx) => (
                          <motion.span
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.7 + idx * 0.05 }}
                            whileHover={{ scale: 1.1, y: -2 }}
                            className="px-3 py-1.5 rounded-lg bg-purple-600/20 border border-purple-500/30 text-sm font-medium hover:bg-purple-600/30 transition-all cursor-default"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                      className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10 shadow-2xl"
                    >
                      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        🧩 What I'm Actually Good At
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
                    className="mt-6 backdrop-blur-xl bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-2xl p-6 border border-purple-500/30 shadow-2xl"
                  >
                    <p className="text-sm text-purple-300 uppercase tracking-wider mb-3">🎯 What I Do</p>
                    
                    <div className="mb-4 text-sm text-gray-300">
                      <p className="mb-2">
                        <strong className="text-white">Ship AI products:</strong> 2 live agents with real users. Both launched and scaled solo.
                      </p>
                      <p className="mb-2">
                        <strong className="text-white">Own the full cycle:</strong> Product vision, UX design, technical build, go-to-market.
                      </p>
                      <p>
                        <strong className="text-white">Move fast:</strong> 7 projects in 8 months. Ship, iterate, improve.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-semibold text-green-400 mb-2">💎 Ideal Setup: HYBRID</p>
                        <ul className="text-xs text-gray-300 space-y-1.5 ml-4">
                          <li className="flex items-start gap-2">
                            <span className="text-green-400 mt-0.5">✦</span>
                            <span>Full-time role at AI startup + pre-seed for AIdeazz</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-400 mt-0.5">✦</span>
                            <span>You get full execution capacity, I scale the AI companion vision in parallel</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-400 mt-0.5">✦</span>
                            <span>Strategic partnership opportunities between your product and AIdeazz ecosystem</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-blue-400 mb-2">💼 Also Consider</p>
                        <div className="flex flex-wrap gap-2">
                          <span className="text-xs px-2 py-1 bg-blue-600/20 border border-blue-500/30 rounded">AI Product Designer</span>
                          <span className="text-xs px-2 py-1 bg-blue-600/20 border border-blue-500/30 rounded">AI Product Manager</span>
                          <span className="text-xs px-2 py-1 bg-blue-600/20 border border-blue-500/30 rounded">Founding AI Engineer</span>
                          <span className="text-xs px-2 py-1 bg-blue-600/20 border border-blue-500/30 rounded">AI UX Lead</span>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-purple-400 mb-2">💰 Investment Track</p>
                        <p className="text-xs text-gray-300 ml-4">Pre-seed/Seed for AIdeazz • Live agents • Organic traction • Clear GTM</p>
                      </div>
                    </div>

                    <p className="text-xs text-gray-400 mt-4">
                      Remote, hybrid, or relocation — all work. Let's explore fit.
                    </p>
                  </motion.div>
                </motion.section>

                {/* 3️⃣ VISION */}
                <motion.section 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="mb-12"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <Sparkles className="w-6 h-6 text-pink-400" />
                    <h2 className="text-2xl font-bold">3️⃣ AIdeazz Ecosystem — The Vision</h2>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="backdrop-blur-xl bg-gradient-to-br from-purple-600/10 via-pink-600/10 to-blue-600/10 rounded-2xl p-8 border border-white/10 shadow-2xl"
                  >
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                        AIdeazz
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        An ecosystem of emotionally intelligent AI companions — built to help people grow, succeed, and thrive. 
                        Born in 🇵🇦 Panama, nurtured by Innovation Smart District.
                      </p>
                    </div>

                    <div className="mb-6">
                      <p className="text-sm text-purple-300 mb-3">✨ The Vision:</p>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        I believe every human will soon want their own emotionally intelligent AI companion — 
                        evolving with them through life challenges, helping them become the best version of themselves. 
                        Not generic chatbots, but deeply personal AI that grows alongside you.
                      </p>
                    </div>

                    <div className="mb-6">
                      <p className="text-sm text-blue-300 mb-3">⚡ The Build:</p>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        March 2025: Founded AIdeazz. Built and shipped 7 projects solo to validate the vision.
                        <br />
                        <strong className="text-white">Launch:</strong> EspaLuz (AI Spanish tutor) and ALGOM Alpha (AI crypto advisor) — both live and serving users.
                        <br />
                        <strong className="text-white">Traction:</strong> Organic user growth across 19 Spanish-speaking countries in LATAM.
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-pink-300 mb-3">🧭 Next Steps:</p>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li className="flex items-start gap-2">
                          <span className="text-pink-400">•</span>
                          Scaling EspaLuz & ALGOM Alpha to 10K+ users across LATAM
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-pink-400">•</span>
                          Building v2: More emotionally intelligent, more personalized, more helpful
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-pink-400">•</span>
                          Exploring partnerships with EdTech & FinTech companies in Panama + beyond
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-pink-400">•</span>
                          Open to joining the right team to accelerate this vision together
                        </li>
                      </ul>
                    </div>

                    <div className="mt-6 pt-6 border-t border-white/10">
                      <div className="backdrop-blur-xl bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl p-5 border border-blue-500/30">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-2xl">🌐</span>
                          <p className="text-sm text-blue-300 font-semibold">Coming Soon: Web3 AI Agent Ecosystem</p>
                        </div>
                        
                        <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                          AIdeazz.xyz ecosystem where emotionally intelligent AI agents are wrapped in{' '}
                          <strong className="text-white">ERC-7857 standard NFTs</strong> — 
                          enabling true ownership, trading, and evolution of your personal AI companions.
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                          <span className="text-xs px-3 py-1 bg-purple-600/20 border border-purple-500/30 rounded-full text-purple-300">
                            ERC-7857 NFTs
                          </span>
                          <span className="text-xs px-3 py-1 bg-blue-600/20 border border-blue-500/30 rounded-full text-blue-300">
                            Web3-Native
                          </span>
                          <span className="text-xs px-3 py-1 bg-pink-600/20 border border-pink-500/30 rounded-full text-pink-300">
                            AI Ownership
                          </span>
                          <span className="text-xs px-3 py-1 bg-green-600/20 border border-green-500/30 rounded-full text-green-300">
                            In Development
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.section>

                {/* Contact */}
                <motion.section 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="backdrop-blur-xl bg-white/5 rounded-2xl p-8 border border-white/10 shadow-2xl text-center"
                >
                  <h2 className="text-2xl font-bold mb-4">🔥 Let's Build</h2>
                  <p className="text-gray-300 mb-3">
                    <strong>For teams:</strong> I ship AI products end-to-end. Vision to launch to users.
                  </p>
                  <p className="text-gray-300 mb-3">
                    <strong>For investors:</strong> 2 live agents, organic traction, clear path to emotionally intelligent AI at scale.
                  </p>
                  <p className="text-gray-300 mb-6">
                    Based in 🇵🇦 Panama (LATAM timezone) • Bilingual EN/ES • Remote/hybrid/relocation — all work
                  </p>
                  
                  <div className="flex flex-wrap justify-center gap-4">
                    <motion.a 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href="https://aideazz.xyz" 
                      target="_blank" 
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all border border-white/20"
                    >
                      <Globe className="w-4 h-4" /> Portfolio
                    </motion.a>
                    <motion.a 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href="https://x.com/reviceva" 
                      target="_blank" 
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all border border-white/20"
                    >
                      <Twitter className="w-4 h-4" /> X / Twitter
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
                      <Linkedin className="w-4 h-4" /> LinkedIn
                    </motion.a>
                    <motion.a 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href="mailto:hello@aideazz.xyz"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all font-semibold shadow-lg"
                    >
                      <Mail className="w-4 h-4" /> Contact Me
                    </motion.a>
                  </div>

                  <p className="mt-6 text-sm text-purple-300 italic">
                    "Have an AIdeazz? Get on the ledger." ⚡
                  </p>
                </motion.section>

                <footer className="mt-12 text-center text-sm text-gray-500">
                  © 2025 Elena Revicheva — AIdeazz. Built with ❤️ in Panama.
                </footer>

                <div className="mt-6 text-center">
                  <motion.p 
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-sm text-purple-400"
                  >
                    ✨ Click anywhere to flip card ✨
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
                  className="backdrop-blur-xl bg-white/5 rounded-2xl p-12 border border-white/10 shadow-2xl max-w-3xl mx-auto"
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
                    <h1 className="text-4xl font-bold mb-2">Elena Revicheva</h1>
                    <p className="text-purple-300 text-lg mb-3">Founder @ AIdeazz</p>
                    <p className="text-gray-400 text-sm">
                      AI Entrepreneur | Product Designer | Tech Visionary
                    </p>
                    <div className="flex items-center justify-center gap-4 mt-3 text-sm text-gray-400">
                      <span>📍 Panama</span>
                      <span>🧠 EN 🇬🇧 + ES 🇪🇸</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-6 mb-8">
                    <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-3xl font-bold text-purple-400 mb-1">2</div>
                      <div className="text-xs text-gray-400">Live AI Agents</div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-3xl font-bold text-blue-400 mb-1">10+</div>
                      <div className="text-xs text-gray-400">Tech Stack</div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-3xl font-bold text-pink-400 mb-1">1</div>
                      <div className="text-xs text-gray-400">Ecosystem Vision</div>
                    </div>
                  </div>

                  <div className="mb-8 text-center">
                    <p className="text-gray-300 leading-relaxed max-w-2xl mx-auto">
                      Building emotionally intelligent AI agents that help humans grow, connect & thrive. 
                      Seeking opportunities in AI Product Design, partnerships, and investment.
                    </p>
                  </div>

                  <div className="flex flex-wrap justify-center gap-3">
                    <a 
                      href="https://aideazz.xyz" 
                      target="_blank" 
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all border border-white/20"
                    >
                      <Globe className="w-4 h-4" /> Portfolio
                    </a>
                    <a 
                      href="https://x.com/reviceva" 
                      target="_blank" 
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all border border-white/20"
                    >
                      <Twitter className="w-4 h-4" /> X
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/elenarevicheva/" 
                      target="_blank" 
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all border border-white/20"
                    >
                      <Linkedin className="w-4 h-4" /> LinkedIn
                    </a>
                    <a 
                      href="mailto:hello@aideazz.xyz"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all font-semibold shadow-lg"
                    >
                      <Mail className="w-4 h-4" /> Contact
                    </a>
                  </div>

                  <div className="mt-8 text-center">
                    <p className="text-sm text-purple-300 italic">
                      "Have an AIdeazz? Get on the ledger." ⚡
                    </p>
                  </div>

                  <div className="mt-8 text-center">
                    <motion.p 
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="text-sm text-purple-400"
                    >
                      ✨ Click to see full portfolio ✨
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
