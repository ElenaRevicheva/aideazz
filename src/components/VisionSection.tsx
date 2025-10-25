import { Eye, Sparkles, Users, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";

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

        {/* Founder Section */}
        <div className="mt-16">
          <div className="glass-card p-8 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold font-poppins mb-6 text-center gradient-text">
              🧠 {t("vision.founderTitle")}
            </h3>
            <div className="text-center mb-6">
            <a 
              href="https://www.aideazz.xyz/card" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xl font-semibold text-purple-300 hover:text-purple-200 transition-colors underline cursor-pointer relative z-40"
              style={{ pointerEvents: 'auto' }}
            >
              {t("vision.founderLink")}
            </a>
            </div>
            
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p className="text-center">
                🇷🇺 {t("vision.founderBio1")}
              </p>
              
              <div className="mt-6 text-center">
                <a 
                  href="https://www.capcut.com/s/CU4u6UjQIC9QydoB/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg transition-all duration-300 cursor-pointer relative z-40"
                  style={{ pointerEvents: 'auto' }}
                >
                  {t("vision.videoButtonText")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;