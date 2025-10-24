import { Brain, Shield, Zap, Heart, Sparkles, ExternalLink, Rocket } from "lucide-react";
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
            <p className="mb-2 font-semibold text-purple-300">{t("aipa.videoPrompt")}</p>
            <a 
              href="https://www.capcut.com/s/CXgM3XiNSKkniT0N/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-300 hover:text-purple-200 transition-colors underline"
            >
              https://www.capcut.com/s/CXgM3XiNSKkniT0N/
            </a>
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
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3 text-center">
                  <span className="text-purple-300 font-semibold">{t("aipa.contextLearning")}</span>
                </div>
                <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-3 text-center">
                  <span className="text-pink-300 font-semibold">{t("aipa.contextCoaching")}</span>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 text-center">
                  <span className="text-blue-300 font-semibold">{t("aipa.contextTransitions")}</span>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-center">
                  <span className="text-green-300 font-semibold">{t("aipa.contextCommunication")}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

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
        <div className="text-center space-y-6">
          <div>
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
          
          <div className="pt-4">
            <Button 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 opacity-60"
              disabled
            >
              {t("aipa.exploreButton")}
              <span className="ml-2 text-sm opacity-75">{t("aipa.comingSoonLabel")}</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIpaExplainerSection;