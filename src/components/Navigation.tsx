
import { useState } from "react";
import { Menu, X, Brain, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import { motion } from "framer-motion";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const navItems = [
    { name: t("nav.home"), href: "#home" },
    { name: t("nav.espaluz"), href: "#espaluz" },
    { name: t("nav.platform"), href: "#platform" },
    { name: t("nav.agents"), href: "#agents" },
    { name: t("nav.vision"), href: "#vision" },
    { name: t("nav.vibeCoding"), href: "#vibe-coding" },
    { name: t("nav.invest"), href: "#invest" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] py-4 pointer-events-none">
      <div className="container mx-auto px-6">
        <div className="glass-card px-6 py-4 pointer-events-auto">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div 
                className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg animate-breathe"
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <Brain className="w-6 h-6 text-white" />
              </motion.div>
              <span className="text-xl font-bold font-poppins text-white">
                AI<span className="text-purple-400">deazz</span><span className="text-pink-400">.xyz</span>
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8 pointer-events-auto">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-white transition-colors duration-200 font-medium cursor-pointer relative z-[110]"
                  style={{ pointerEvents: 'auto' }}
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Desktop CTA & Language Switcher */}
            <div className="hidden md:flex items-center gap-4">
              <LanguageSwitcher />
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
                <Sparkles className="w-4 h-4 mr-2" />
                {t("nav.cta")}
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-3 text-white hover:text-purple-400 transition-colors relative z-[120] pointer-events-auto cursor-pointer bg-purple-600/20 rounded-lg"
              onClick={() => setIsOpen(!isOpen)}
              style={{ pointerEvents: 'auto' }}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-white/10 pointer-events-auto relative z-[110]">
              <div className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 font-medium py-2 cursor-pointer relative z-[110]"
                    onClick={() => setIsOpen(false)}
                    style={{ pointerEvents: 'auto' }}
                  >
                    {item.name}
                  </a>
                ))}
                <div className="flex items-center justify-center py-2">
                  <LanguageSwitcher />
                </div>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-purple-500/25 transition-all duration-300 mt-4">
                  <Sparkles className="w-4 h-4 mr-2" />
                  {t("nav.cta")}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
