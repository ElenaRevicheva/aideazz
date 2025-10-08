import { Layers, ShoppingCart, Users, Zap, Coins, GitBranch } from "lucide-react";
import { useTranslation } from "react-i18next";

const AIdeazzPlatformSection = () => {
  const { t } = useTranslation();
  
  return (
    <section id="platform" className="py-24 relative bg-gradient-to-r from-blue-900/20 to-purple-900/20">
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

        {/* Bottom Statement */}
        <div className="text-center">
          <div className="glass-card inline-block p-8 max-w-3xl">
            <h3 className="text-2xl font-semibold text-white mb-4 font-poppins">
              {t("platform.bottomTitle")}
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              {t("platform.bottomDescription")} 
              <span className="text-purple-300 font-semibold"> {t("platform.bottomHighlight")}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIdeazzPlatformSection;