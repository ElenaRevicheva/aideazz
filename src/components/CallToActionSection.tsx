import { Heart, MessageCircle, DollarSign, Users, Mail, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const CallToActionSection = () => {
  const { t } = useTranslation();
  
  const handleContactClick = () => {
    window.location.href = "mailto:aipa@aideazz.xyz";
  };

  const openTelegramChat = () => {
    window.open('https://t.me/EspaLuzFamily_bot', '_blank');
  };

  return (
    <section id="contact" className="py-24 relative bg-gradient-to-r from-purple-900/30 to-pink-900/30">
      <div className="container mx-auto px-6">
        {/* Main CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-6">
            <span className="gradient-text">{t("cta.title")}</span>
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-8">
            {t("cta.subtitle")}
          </p>
        </motion.div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Try EspaLuz */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="glass-card p-6"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3 font-poppins">{t("cta.experienceTitle")}</h3>
              <p className="text-gray-300 text-sm mb-4">{t("cta.experienceDescription")}</p>
              <Button 
                size="sm" 
                className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-semibold"
                onClick={openTelegramChat}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                {t("cta.chatNow")}
              </Button>
            </div>
          </div>

          {/* Invest */}
          <div className="glass-card p-6 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3 font-poppins">{t("cta.investTitle")}</h3>
              <p className="text-gray-300 text-sm mb-4">{t("cta.investDescription")}</p>
              <Button size="sm" className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold">
                <ExternalLink className="w-4 h-4 mr-2" />
                {t("cta.learnMore")}
              </Button>
            </div>
          </div>

          {/* Community */}
          <div className="glass-card p-6 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3 font-poppins">{t("cta.communityTitle")}</h3>
              <p className="text-gray-300 text-sm mb-4">{t("cta.communityDescription")}</p>
              <Button size="sm" className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold">
                <Users className="w-4 h-4 mr-2" />
                {t("cta.joinUs")}
              </Button>
            </div>
          </div>

          {/* Contact */}
          <div className="glass-card p-6 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3 font-poppins">{t("cta.contactTitle")}</h3>
              <p className="text-gray-300 text-sm mb-2">{t("cta.contactEmail")}</p>
              <p className="text-gray-300 text-sm mb-4">{t("cta.contactChat")}</p>
              <div className="space-y-2">
                <Button 
                  size="sm" 
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold"
                  onClick={handleContactClick}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  {t("cta.emailButton")}
                </Button>
                <Button 
                  size="sm" 
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold"
                  onClick={() => window.open('https://lit.link/en/aideazz', '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {t("cta.callChatButton")}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Message */}
        <div className="text-center">
          <div className="glass-card inline-block p-8 max-w-3xl">
            <h3 className="text-2xl font-semibold text-white mb-4 font-poppins">
              {t("cta.footerTitle")}
            </h3>
            <p className="text-gray-300 leading-relaxed">
              {t("cta.footerDescription")}
              <span className="text-purple-300 font-semibold"> {t("cta.footerHighlight")}</span>
            </p>
            <div className="mt-6 text-sm text-gray-400">
              <p>{t("cta.footerTagline")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;