import { Brain, Shield, Zap, Heart, Sparkles, ExternalLink, Rocket, X, Check, HelpCircle, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const AIpaExplainerSection = () => {
  const { t } = useTranslation();
  
  return (
    <section id="agents" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
            <Brain className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-300">{t("aipa.badge")}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-6">
            <span className="gradient-text">{t("aipa.title")}</span>
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-4">
            {t("aipa.subtitle")}
          </p>
          <div className="text-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-purple-500/50 transition-all duration-300 cursor-pointer"
              >
                <a 
                  href="https://www.capcut.com/s/CXgM3XiNSKkniT0N/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                  style={{ pointerEvents: 'auto' }}
                >
                  <ExternalLink className="w-5 h-5" />
                  {t("aipa.videoPrompt")}
                </a>
              </Button>
            </motion.div>
          </div>

          {/* Business Portfolio CTA */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                className="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 hover:from-pink-700 hover:via-purple-700 hover:to-blue-700 text-white px-10 py-6 rounded-full font-bold text-lg shadow-2xl hover:shadow-pink-500/50 transition-all duration-300"
              >
                <a 
                  href="https://www.aideazz.xyz/card" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3"
                >
                  <Rocket className="w-6 h-6" />
                  {t("aipa.businessPortfolioButton")}
                  <ExternalLink className="w-5 h-5" />
                </a>
              </Button>
            </motion.div>
            <p className="text-sm text-gray-400 mt-3">{t("aipa.businessPortfolioDescription")}</p>
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left: Core Features */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <motion.div 
              whileHover={{ scale: 1.02, rotateY: 3 }}
              style={{ transformStyle: 'preserve-3d' }}
              className="glass-card p-8"
            >
              <h3 className="text-2xl font-semibold text-white mb-6 font-poppins flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-purple-400" />
                {t("aipa.coreFeaturesTitle")}
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <Heart className="w-6 h-6 text-pink-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">{t("aipa.feature1Title")}</h4>
                    <p className="text-gray-300">
                      {t("aipa.feature1Description")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Zap className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">{t("aipa.feature2Title")}</h4>
                    <p className="text-gray-300">
                      {t("aipa.feature2Description")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <Shield className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">{t("aipa.feature3Title")}</h4>
                    <p className="text-gray-300">
                      {t("aipa.feature3Description")}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: NFT & Bonding */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <motion.div 
              whileHover={{ scale: 1.02, rotateY: -3 }}
              style={{ transformStyle: 'preserve-3d' }}
              className="glass-card p-8 border-2 border-purple-500/30"
            >
              <h3 className="text-2xl font-semibold text-white mb-6 font-poppins flex items-center gap-3">
                <Shield className="w-8 h-8 text-purple-400" />
                {t("aipa.nftTitle")}
              </h3>
              <div className="space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  {t("aipa.nftDescription")} <strong className="text-purple-300 font-bold">{t("aipa.nftDescriptionHighlight")}</strong> {t("aipa.nftDescriptionContinued")}
                </p>
                
                {/* ERC-7857 Explainer */}
                <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-4">
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {t("aipa.nftExplainer")}
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-green-300 mb-2">{t("aipa.whatThisMeansTitle")}</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>{t("aipa.ownership")}</li>
                    <li>{t("aipa.bonding")}</li>
                    <li>{t("aipa.transferable")}</li>
                    <li>{t("aipa.evolution")}</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02, rotateY: -3 }}
              style={{ transformStyle: 'preserve-3d' }}
              className="glass-card p-8"
            >
              <h3 className="text-xl font-semibold text-white mb-4 font-poppins">
                {t("aipa.contextsTitle")}
              </h3>
              <p className="text-gray-300 mb-4">
                {t("aipa.contextsDescription")}
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-2.5 md:p-3 text-center">
                  <span className="text-purple-300 font-semibold text-xs md:text-sm break-words">{t("aipa.contextLearning")}</span>
                </div>
                <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-2.5 md:p-3 text-center">
                  <span className="text-pink-300 font-semibold text-xs md:text-sm break-words">{t("aipa.contextCoaching")}</span>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-2.5 md:p-3 text-center">
                  <span className="text-blue-300 font-semibold text-xs md:text-sm break-words">{t("aipa.contextTransitions")}</span>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-2.5 md:p-3 text-center">
                  <span className="text-green-300 font-semibold text-xs md:text-sm break-words">{t("aipa.contextCommunication")}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Why Not ChatGPT? - Competitive Differentiation */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="glass-card p-8 md:p-12 border-2 border-amber-500/30 bg-gradient-to-r from-amber-500/5 to-orange-500/5">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="relative flex-shrink-0">
                  {/* Aura circles */}
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 blur-xl"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 blur-2xl"
                    animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  />
                  {/* Icon with pulsing animation */}
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="relative z-10"
                  >
                    <HelpCircle className="w-12 h-12 md:w-14 md:h-14 text-purple-400" style={{ 
                      filter: 'drop-shadow(0 0 20px rgba(168, 85, 247, 0.8)) drop-shadow(0 0 40px rgba(168, 85, 247, 0.6))',
                    }} />
                  </motion.div>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white font-poppins">
                  {t("aipa.whyNotChatGPTTitle")}
                </h3>
              </div>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                {t("aipa.whyNotChatGPTSubtitle")}
              </p>
            </div>

            {/* Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* ChatGPT Column */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-600/30 rounded-xl p-6"
              >
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-700/50 rounded-full mb-3">
                    <MessageSquare className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-300 font-semibold">{t("aipa.chatGPTLabel")}</span>
                  </div>
                  <p className="text-gray-400 text-sm">{t("aipa.chatGPTTagline")}</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <X className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-300 text-sm">{t("aipa.chatGPTCon1")}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <X className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-300 text-sm">{t("aipa.chatGPTCon2")}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <X className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-300 text-sm">{t("aipa.chatGPTCon3")}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <X className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-300 text-sm">{t("aipa.chatGPTCon4")}</p>
                  </div>
                </div>
              </motion.div>

              {/* EspaLuz Column */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-2 border-purple-500/50 rounded-xl p-6 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  {t("aipa.aipaAdvantage")}
                </div>
                <div className="text-center mb-6 mt-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600/50 to-pink-600/50 rounded-full mb-3">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Heart className="w-5 h-5 text-pink-300" />
                    </motion.div>
                    <span className="text-white font-semibold">{t("aipa.espaluzLabel")}</span>
                  </div>
                  <p className="text-purple-200 text-sm font-semibold">{t("aipa.espaluzTagline")}</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <p className="text-white text-sm font-medium">{t("aipa.aipaMemory")}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <p className="text-white text-sm font-medium">{t("aipa.aipaEmotion")}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <p className="text-white text-sm font-medium">{t("aipa.aipaContext")}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <p className="text-white text-sm font-medium">{t("aipa.aipaAdaptation")}</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Bottom Tagline */}
            <div className="text-center mt-8">
              <p className="text-xl md:text-2xl font-bold gradient-text">
                {t("aipa.comparisonTagline")}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Marketplace Preview */}
        <div className="glass-card p-12 mb-12">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white mb-4 font-poppins">
              {t("aipa.marketplaceTitle")}
            </h3>
            <p className="text-xl text-gray-300">
              {t("aipa.marketplaceSubtitle")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">{t("aipa.browseTitle")}</h4>
              <p className="text-gray-300 text-sm">{t("aipa.browseDescription")}</p>
            </div>
            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">{t("aipa.previewTitle")}</h4>
              <p className="text-gray-300 text-sm">{t("aipa.previewDescription")}</p>
            </div>
            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg p-6 text-center opacity-60">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">{t("aipa.comingSoonTitle")}</h4>
              <p className="text-gray-300 text-sm">{t("aipa.comingSoonDescription")}</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            asChild
            className="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 hover:from-pink-700 hover:via-purple-700 hover:to-blue-700 text-white px-10 py-6 rounded-full font-bold text-xl shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 transform hover:scale-105"
          >
            <a 
              href="https://www.aideazz.xyz/card" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3"
            >
              <Rocket className="w-6 h-6" />
              {t("aipa.businessPortfolioButton")}
              <ExternalLink className="w-5 h-5" />
            </a>
          </Button>
          <p className="text-base text-gray-300 mt-4 font-medium">{t("aipa.businessPortfolioDescription")}</p>
        </div>
      </div>
    </section>
  );
};

export default AIpaExplainerSection;