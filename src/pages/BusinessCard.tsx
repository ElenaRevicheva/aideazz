import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Globe, Twitter, Linkedin, Mail, ExternalLink, Sparkles, Languages } from "lucide-react";
import { useTranslation } from "react-i18next";

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
  const { t, i18n } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
  };

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
      title: t('section1.espaluz.title'),
      subtitle: t('section1.espaluz.subtitle'),
      desc: t('section1.espaluz.desc'),
      traction: t('section1.espaluz.traction'),
      tech: t('section1.espaluz.tech'),
      action: t('section1.espaluz.action'),
      link: "https://wa.me/50766623757",
      badge: t('section1.espaluz.badge')
    },
    {
      emoji: "🧠",
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
    "Backend": ["Python", "Node.js", "Flask", "Deno Edge Functions", "Gunicorn"],
    "Frontend": ["TypeScript", "React", "Vite", "Tailwind CSS", "shadcn/ui"],
    "AI & ML": ["OpenAI GPT-5", "Anthropic Claude", "ElizaOS", "Whisper", "TTS"],
    "Database": ["PostgreSQL", "Supabase", "Railway", "Docker"],
    "Web3": ["Thirdweb SDK", "Polygon", "MetaMask", "IPFS"],
    "APIs": ["PayPal", "Telegram", "WhatsApp", "Twitter", "CCXT"]
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white antialiased relative overflow-hidden">
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none opacity-40" />
      
      <div className="fixed top-0 left-0 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000" />

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
                          {t('header.name')}
                        </h1>
                        <p className="text-sm text-purple-300 mt-1">
                          {t('header.title')}
                        </p>
                        <p className="text-xs text-gray-300 mt-2 max-w-xl">
                          {t('header.stats')}
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                          <span>📍 {t('header.location')}</span>
                          <span>🧠 {t('header.bilingual')}</span>
                          <span>⚡ {t('header.builder')}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <a href="https://aideazz.xyz" target="_blank" rel="noreferrer" 
                        onClick={(e) => e.stopPropagation()}
                        className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all text-sm backdrop-blur-sm border border-white/10">
                        🌐 {t('header.websiteButton')}
                      </a>
                      <a href="mailto:aipa@aideazz.xyz" 
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all font-semibold shadow-lg shadow-purple-500/50">
                        <Mail className="w-4 h-4"/> {t('header.contactButton')}
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
                    <h2 className="text-2xl font-bold">1️⃣ {t('section1.title')}</h2>
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

                {/* OTHER PRODUCTS */}
                <motion.section 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mb-12"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <Sparkles className="w-6 h-6 text-purple-400" />
                    <h2 className="text-2xl font-bold">{t('otherProducts.title')}</h2>
                  </div>

                  <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10 shadow-2xl">
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

                      {/* Product 2 */}
                      <motion.a
                        href={t('otherProducts.product2.link')}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        whileHover={{ scale: 1.02 }}
                        className="p-4 rounded-lg bg-blue-600/10 border border-blue-500/30 hover:border-blue-400/60 transition-all group"
                      >
                        <h3 className="text-sm font-bold text-blue-300 mb-1 group-hover:text-blue-200 transition-colors">
                          {t('otherProducts.product2.name')}
                        </h3>
                        <p className="text-xs text-gray-400 leading-relaxed">
                          {t('otherProducts.product2.desc')}
                        </p>
                      </motion.a>

                      {/* Product 3 */}
                      <motion.a
                        href={t('otherProducts.product3.link')}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        whileHover={{ scale: 1.02 }}
                        className="p-4 rounded-lg bg-pink-600/10 border border-pink-500/30 hover:border-pink-400/60 transition-all group"
                      >
                        <h3 className="text-sm font-bold text-pink-300 mb-1 group-hover:text-pink-200 transition-colors">
                          {t('otherProducts.product3.name')}
                        </h3>
                        <p className="text-xs text-gray-400 leading-relaxed">
                          {t('otherProducts.product3.desc')}
                        </p>
                      </motion.a>

                      {/* Product 4 */}
                      <motion.a
                        href={t('otherProducts.product4.link')}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        whileHover={{ scale: 1.02 }}
                        className="p-4 rounded-lg bg-slate-700/10 border border-slate-600/30 hover:border-slate-500/60 transition-all group"
                      >
                        <h3 className="text-sm font-bold text-slate-300 mb-1 group-hover:text-slate-200 transition-colors">
                          {t('otherProducts.product4.name')}
                        </h3>
                        <p className="text-xs text-gray-400 leading-relaxed">
                          {t('otherProducts.product4.desc')}
                        </p>
                      </motion.a>
                    </div>
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
                    <h2 className="text-2xl font-bold">2️⃣ {t('section2.title')}</h2>
                  </div>

                  <div className="mb-6 backdrop-blur-xl bg-blue-600/10 rounded-xl p-4 border border-blue-500/20">
                    <p className="text-sm text-blue-200 mb-2">
                      <strong>💼 {t('section2.background.title')}</strong>
                    </p>
                    <p className="text-xs text-gray-300">
                      {t('section2.background.text')}
                    </p>
                  </div>

                  <div className="mb-6 backdrop-blur-xl bg-purple-600/10 rounded-xl p-4 border border-purple-500/20">
                    <p className="text-sm text-purple-200 mb-2">
                      <strong>⚡ {t('section2.timeline.title')}</strong> — {t('section2.timeline.subtitle')}
                    </p>
                    <p className="text-xs text-white font-semibold mb-1">{t('section2.timeline.keyStats')}</p>
                    <ul className="space-y-1 text-xs text-gray-300">
                      <li>• {t('section2.timeline.stat1')}</li>
                      <li>• {t('section2.timeline.stat2')}</li>
                    </ul>
                  </div>

                  <div className="mt-6 backdrop-blur-xl bg-purple-600/10 rounded-xl p-4 border border-purple-500/20">
                    <p className="text-sm text-purple-200 mb-2">
                      <strong>⚡ {t('section2.vibeAdvantage.title')}</strong>
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
                      className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10 shadow-2xl"
                    >
                      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        ⚙️ {t('section2.techStack.title')}
                      </h3>
                      <div className="space-y-4">
                        {Object.entries(techStackByCategory).map(([category, techs]) => (
                          <div key={category}>
                            <p className="text-xs font-semibold text-purple-300 mb-2">{category}</p>
                            <div className="flex flex-wrap gap-2">
                              {techs.map((tech) => (
                                <span
                                  key={tech}
                                  className="px-2 py-1 rounded-lg bg-purple-600/20 border border-purple-500/30 text-xs font-medium hover:bg-purple-600/30 transition-all cursor-default"
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
                      className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10 shadow-2xl"
                    >
                      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        💫 {t('section2.coreVibes.title')}
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
                    className="mt-6 backdrop-blur-xl bg-gradient-to-br from-green-600/30 via-emerald-600/20 to-teal-600/30 rounded-2xl p-8 border-2 border-green-400/60 shadow-2xl shadow-green-500/50"
                  >
                    <div className="text-center mb-6">
                      <p className="text-2xl font-black mb-1">
                        <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                          💼 {t('section2.openTo.title')}
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
                          <span className="text-sm px-3 py-2 bg-blue-600/30 border border-blue-400/50 rounded-lg font-medium hover:bg-blue-600/40 transition-all">{t('section2.openTo.role7')}</span>
                        </div>
                      </div>

                      <a 
                        href="https://www.aideazz.xyz/pitch.html" 
                        target="_blank" 
                        rel="noreferrer"
                        className="block relative overflow-hidden rounded-xl border-2 border-purple-400/60 hover:border-purple-300 transition-all group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 group-hover:from-purple-600/30 group-hover:to-pink-600/30 transition-all" />
                        <div className="relative p-5">
                          <div className="flex items-center justify-between mb-3">
                            <p className="text-base font-bold text-purple-300 group-hover:text-purple-200 transition-colors">{t('section2.openTo.investment.title')}</p>
                            <span className="text-2xl group-hover:scale-110 transition-transform">🚀</span>
                          </div>
                          <p className="text-sm text-gray-200 mb-3">{t('section2.openTo.investment.desc')}</p>
                          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg group-hover:from-purple-500 group-hover:to-pink-500 transition-all">
                            <span className="text-sm font-bold text-white">{t('section2.openTo.investment.button')}</span>
                            <span className="text-white group-hover:translate-x-1 transition-transform">→</span>
                          </div>
                        </div>
                      </a>

                      <div className="backdrop-blur-sm bg-gradient-to-br from-green-600/20 to-emerald-600/20 rounded-xl p-5 border-2 border-green-400/50">
                        <p className="text-base font-bold text-green-300 mb-4">💎 {t('section2.openTo.hybrid.title')}</p>
                        <ul className="text-sm text-gray-200 space-y-3">
                          <li className="flex items-start gap-2">
                            <span className="text-green-400 mt-0.5 text-lg">✦</span>
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
                            <span className="text-green-400 mt-0.5 text-lg">✦</span>
                            <span>{t('section2.openTo.hybrid.item2')}</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-400 mt-0.5 text-lg">✦</span>
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
                  className="backdrop-blur-xl bg-white/5 rounded-2xl p-8 border border-white/10 shadow-2xl text-center"
                >
                  <h2 className="text-2xl font-bold mb-4">🔥 {t('contact.title')}</h2>
                  <p className="text-gray-300 mb-3">
                    <strong>{t('contact.forTeams')}</strong> {t('contact.forTeamsDesc')}
                  </p>
                  <p className="text-gray-300 mb-3">
                    <strong>{t('contact.forInvestors')}</strong> {t('contact.forInvestorsDesc')}
                  </p>
                  <p className="text-gray-300 mb-6">
                    {t('contact.location')}
                  </p>
                  
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
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-sm text-purple-400"
                  >
                    ✨ {t('footer.flipPrompt')} ✨
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

                  <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-8">
                    <div className="text-center p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-2xl sm:text-3xl font-bold text-purple-400 mb-1">6</div>
                      <div className="text-[10px] sm:text-xs text-gray-400 leading-tight">{t('cardBack.stat1')}</div>
                    </div>
                    <div className="text-center p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-2xl sm:text-3xl font-bold text-blue-400 mb-1">28</div>
                      <div className="text-[10px] sm:text-xs text-gray-400 leading-tight">{t('cardBack.stat2')}</div>
                    </div>
                    <div className="text-center p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-2xl sm:text-3xl font-bold text-pink-400 mb-1">1</div>
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
                        <span className="text-purple-300">✨</span> {t('section3.vision')}
                      </p>
                    </div>

                    <div className="mb-5">
                      <p className="text-xs text-pink-300 mb-2">🧭 {t('section3.nextSteps.title')}</p>
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
                          <span className="text-xl">🌐</span>
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
                      href="https://wa.me/50761666716" 
                      target="_blank" 
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-green-600 hover:bg-green-500 transition-all border border-green-400 shadow-lg shadow-green-500/50"
                    >
                      <Globe className="w-4 h-4" /> {t('cardBack.whatsapp')}
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
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="text-sm text-purple-400"
                    >
                      ✨ {t('cardBack.flipText')} ✨
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
