import { Eye, Sparkles, Users, Zap, MapPin, Briefcase, Video } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const VisionSection = () => {
  const { t } = useTranslation();
  
  return (
    <section id="vision" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
            <Eye className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-amber-300">{t("vision.badge")}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-6">
            <span className="gradient-text">{t("vision.title")}</span>
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            {t("vision.subtitle")}
          </p>
        </div>

        {/* Vision Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Mission */}
          <div className="glass-card p-8 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white font-poppins">{t("vision.missionTitle")}</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              {t("vision.missionDescription")}
            </p>
          </div>

          {/* Impact */}
          <div className="glass-card p-8 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white font-poppins">{t("vision.impactTitle")}</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              {t("vision.impactDescription")}
            </p>
          </div>
        </div>

        {/* Core Principles */}
        <div className="glass-card p-12 mb-12">
          <h3 className="text-3xl font-bold text-white mb-8 text-center font-poppins">
            {t("vision.corePrinciples")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-3 font-poppins">{t("vision.principle1Title")}</h4>
              <p className="text-gray-300">
                {t("vision.principle1Description")}
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-3 font-poppins">{t("vision.principle2Title")}</h4>
              <p className="text-gray-300">
                {t("vision.principle2Description")}
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-3 font-poppins">{t("vision.principle3Title")}</h4>
              <p className="text-gray-300">
                {t("vision.principle3Description")}
              </p>
            </div>
          </div>
        </div>

        {/* Transformation Statement */}
        <div className="text-center">
          <div className="glass-card inline-block p-8 max-w-3xl">
            <h3 className="text-2xl font-semibold text-white mb-4 font-poppins">
              {t("vision.transformationTitle")}
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              {t("vision.transformationDescription")}
              <span className="text-purple-300 font-semibold"> {t("vision.transformationHighlight")}</span>
            </p>
          </div>
        </div>

        {/* Founder Section - Enhanced with Visual Timeline */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mt-16"
        >
          <div className="glass-card p-12 max-w-5xl mx-auto animate-glow-pulse">
            <h3 className="text-3xl md:text-4xl font-bold font-poppins mb-8 text-center gradient-text">
              🧠 {t("vision.founderTitle")}
            </h3>
            
            {/* Founder Timeline */}
            <div className="relative max-w-3xl mx-auto mb-8">
              {/* Vertical timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-pink-500 opacity-30"></div>
              
              <div className="space-y-8">
                {/* Timeline Item 1: Background */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="relative pl-20 animate-slide-in-right"
                >
                  <div className="absolute left-6 top-2 w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 animate-glow-pulse"></div>
                  <div className="glass-card p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Briefcase className="w-5 h-5 text-cyan-400" />
                      <h4 className="font-semibold text-white">IT Executive & CLO</h4>
                    </div>
                    <p className="text-gray-300 text-sm">
                      🇷🇺 {t("vision.founderBio1")}
                    </p>
                  </div>
                </motion.div>

                {/* Timeline Item 2: Location */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative pl-20 animate-slide-in-right"
                  style={{ animationDelay: '0.2s' }}
                >
                  <div className="absolute left-6 top-2 w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-glow-pulse"></div>
                  <div className="glass-card p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-5 h-5 text-pink-400" />
                      <h4 className="font-semibold text-white">Panama City 🇵🇦</h4>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Building AIdeazz as a solo founder since 2022
                    </p>
                  </div>
                </motion.div>

                {/* Timeline Item 3: Video Story */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="relative pl-20 animate-slide-in-right"
                  style={{ animationDelay: '0.4s' }}
                >
                  <div className="absolute left-6 top-2 w-5 h-5 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 animate-glow-pulse"></div>
                  <div className="glass-card p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Video className="w-5 h-5 text-green-400" />
                      <h4 className="font-semibold text-white">The Story</h4>
                    </div>
                    <a 
                      href="https://www.capcut.com/s/CU4u6UjQIC9QydoB/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg transition-all duration-300 cursor-pointer relative z-40 text-sm"
                      style={{ pointerEvents: 'auto' }}
                    >
                      {t("vision.videoButtonText")}
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
            
            {/* Portfolio Link */}
            <div className="text-center mt-8 pt-6 border-t border-purple-500/20">
              <a 
                href="https://www.aideazz.xyz/card" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-full transition-all duration-300 cursor-pointer relative z-40 transform hover:scale-105"
                style={{ pointerEvents: 'auto' }}
              >
                📂 {t("vision.founderLink")}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VisionSection;