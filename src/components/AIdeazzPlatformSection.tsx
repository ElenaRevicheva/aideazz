import { Layers, ShoppingCart, Users, Zap, Coins, GitBranch, Heart } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const AIdeazzPlatformSection = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  return (
    <section ref={sectionRef} id="platform" className="py-24 relative mood-hope">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium text-cyan-300">{t("platform.badge")}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-6">
            <span className="gradient-text">{t("platform.title")}</span>
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            {t("platform.subtitle")}
          </p>
        </div>

        {/* Platform Description */}
        <div className="glass-card p-12 mb-12 max-w-5xl mx-auto">
          <div className="text-lg text-gray-300 leading-relaxed space-y-6">
            <p>
              <strong className="text-white">{t("platform.description1")}</strong> {t("platform.description1Detail")}
            </p>
            <p>
              <strong className="text-purple-300">{t("platform.description2")}</strong> {t("platform.description2Detail")}
            </p>
            <p>
              <strong className="text-pink-300">{t("platform.description3")}</strong> {t("platform.description3Detail")}
            </p>
            <p>
              <strong className="text-blue-300">{t("platform.description4")}</strong> {t("platform.description4Detail")}
            </p>
          </div>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="glass-card p-8 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                <ShoppingCart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white font-poppins">{t("platform.marketplaceTitle")}</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              {t("platform.marketplaceDescription")}
            </p>
          </div>

          <div className="glass-card p-8 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white font-poppins">{t("platform.socialFiTitle")}</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              {t("platform.socialFiDescription")}
            </p>
          </div>

          <div className="glass-card p-8 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white font-poppins">{t("platform.evolutionTitle")}</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              {t("platform.evolutionDescription")}
            </p>
          </div>

          <div className="glass-card p-8 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full">
                <Coins className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white font-poppins">{t("platform.web3Title")}</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              {t("platform.web3Description")}
            </p>
          </div>

          <div className="glass-card p-8 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full">
                <GitBranch className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white font-poppins">{t("platform.modularTitle")}</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              {t("platform.modularDescription")}
            </p>
          </div>

          <div className="glass-card p-8 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-r from-pink-500 to-red-500 rounded-full">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white font-poppins">{t("platform.communityTitle")}</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              {t("platform.communityDescription")}
            </p>
          </div>
        </div>

        {/* Bottom Statement - Beautiful Story Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative mt-20"
        >
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-pink-900/30 to-blue-900/30 rounded-3xl blur-3xl animate-glow-pulse"></div>
          
          <div className="relative glass-card p-12 max-w-5xl mx-auto border-2 border-purple-500/20 animate-emotional-reveal">
            {/* Emotional heart icon with pulse */}
            <div className="flex justify-center mb-6">
              <Heart className="w-12 h-12 text-pink-400 animate-heart-pulse" />
            </div>
            
            {/* Title with animated gradient */}
            <h3 className="text-3xl md:text-4xl font-bold mb-8 text-center font-poppins bg-gradient-to-r from-green-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
              {t("platform.bottomTitle")}
            </h3>
            
            {/* Story paragraphs with beautiful formatting */}
            <div className="space-y-6 text-lg leading-relaxed">
              <p className="text-gray-200 font-medium animate-fade-in">
                {t("platform.bottomParagraph1")}
              </p>
              
              <p className="text-gray-300 animate-fade-in" style={{animationDelay: '0.2s'}}>
                {t("platform.bottomParagraph2")}
              </p>
              
              <p className="text-gray-300 animate-fade-in" style={{animationDelay: '0.4s'}}>
                {t("platform.bottomParagraph3")}
              </p>
              
              <p className="text-gray-300 animate-fade-in bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-4 rounded-xl border border-purple-500/20" style={{animationDelay: '0.6s'}}>
                {t("platform.bottomParagraph4")}
              </p>
              
              <p className="text-gray-200 font-medium animate-fade-in" style={{animationDelay: '0.8s'}}>
                {t("platform.bottomParagraph5")}
              </p>
              
              <p className="text-purple-300 italic font-semibold animate-fade-in text-center" style={{animationDelay: '1s'}}>
                {t("platform.bottomParagraph6")}
              </p>
              
              <p className="text-gray-300 animate-fade-in bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-4 rounded-xl border border-blue-500/20" style={{animationDelay: '1.2s'}}>
                {t("platform.bottomParagraph7")}
              </p>
            </div>
            
            {/* Final taglines with special styling */}
            <div className="mt-10 text-center space-y-3">
              <p className="text-2xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
                {t("platform.bottomHighlight1")}
              </p>
              <p className="text-2xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent animate-pulse" style={{animationDelay: '0.5s'}}>
                {t("platform.bottomHighlight2")}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AIdeazzPlatformSection;