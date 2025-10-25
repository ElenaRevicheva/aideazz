import { MessageCircle, Heart, Globe, Users, ExternalLink, Sparkles, Monitor, Mic, Image, Video, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const EspaLuzSection = () => {
  const { t } = useTranslation();
  
  const openTelegramChat = () => {
    window.open('https://t.me/EspaLuzFamily_bot', '_blank');
  };

  const openWebApp = () => {
    window.open('https://espaluz-ai-language-tutor.lovable.app/', '_blank');
  };

  const openLiveWhatsApp = () => {
    window.open('https://bit.ly/EspaLuz', '_blank');
  };

  return (
    <section id="espaluz" className="py-24 relative">
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
            <Sparkles className="w-4 h-4 text-pink-400" />
            <span className="text-sm font-medium text-pink-300">{t("espaluz.badge")}</span>
          </div>
          
          {/* EspaLuz Photo and Title */}
          <div className="flex flex-col items-center gap-6 mb-6">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <motion.img 
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
                src="/lovable-uploads/a9ca2d17-65b0-43f6-8da1-665c7f725d79.png"
                alt={t("espaluz.altText")}
                className="w-32 h-32 rounded-full object-cover shadow-2xl border-4 border-purple-400/30 animate-heartbeat"
              />
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center"
              >
                <span className="text-xs">🤖</span>
              </motion.div>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-4xl md:text-5xl font-bold font-poppins"
            >
              {t("espaluz.title")} <span className="gradient-text">{t("espaluz.titleHighlight")}</span>
            </motion.h2>
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl text-gray-300 leading-relaxed"
          >
            {t("espaluz.subtitle")}
          </motion.p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Description & Features */}
          <div className="space-y-8">
            <div className="glass-card p-8">
              <h3 className="text-2xl font-semibold text-white mb-6 font-poppins flex items-center gap-3">
                <Heart className="w-8 h-8 text-pink-400" />
                {t("espaluz.emotionalTitle")}
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                {t("espaluz.emotionalDescription")}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-purple-300">
                  <Globe className="w-5 h-5" />
                  <span>{t("espaluz.bilingualSupport")}</span>
                </div>
                <div className="flex items-center gap-2 text-pink-300">
                  <Users className="w-5 h-5" />
                  <span>{t("espaluz.familyFocused")}</span>
                </div>
                <div className="flex items-center gap-2 text-amber-300">
                  <Heart className="w-5 h-5" />
                  <span>{t("espaluz.emotionallyAware")}</span>
                </div>
                <div className="flex items-center gap-2 text-green-300">
                  <MessageCircle className="w-5 h-5" />
                  <span>{t("espaluz.realTimeChat")}</span>
                </div>
              </div>
            </div>

            {/* Current Functionalities */}
            <div className="glass-card p-8">
              <h3 className="text-2xl font-semibold text-white mb-6 font-poppins">
                {t("espaluz.currentFunctionalities")}
              </h3>
              <div className="grid gap-4">
                <div className="flex items-start gap-3">
                  <Mic className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                  <span className="text-gray-300">{t("espaluz.functionality1")}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <span className="text-gray-300">{t("espaluz.functionality2")}</span>
                </div>
                <div className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                  <span className="text-gray-300">{t("espaluz.functionality3")}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Video className="w-5 h-5 text-pink-400 mt-1 flex-shrink-0" />
                  <span className="text-gray-300">{t("espaluz.functionality4")}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Mic className="w-5 h-5 text-amber-400 mt-1 flex-shrink-0" />
                  <span className="text-gray-300">{t("espaluz.functionality5")}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Image className="w-5 h-5 text-orange-400 mt-1 flex-shrink-0" />
                  <span className="text-gray-300">{t("espaluz.functionality6")}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Brain className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                  <span className="text-gray-300">{t("espaluz.functionality7")}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-rose-400 mt-1 flex-shrink-0" />
                  <span className="text-gray-300">{t("espaluz.functionality8")}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Action Cards */}
          <div className="space-y-6">
            {/* Telegram Card */}
            <div className="glass-card p-8 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white font-poppins">{t("espaluz.telegramTitle")}</h3>
                  <p className="text-gray-300">{t("espaluz.telegramSubtitle")}</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6">
                {t("espaluz.telegramDescription")}
              </p>
              <Button 
                onClick={openTelegramChat}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 rounded-full transition-all duration-300 cursor-pointer relative z-40"
                style={{ pointerEvents: 'auto' }}
              >
                {t("espaluz.openTelegram")}
                <ExternalLink className="ml-2 w-5 h-5" />
              </Button>
            </div>

            {/* WhatsApp Live Card - PRIORITY */}
            <div className="glass-card p-8 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 border-2 border-green-400/50 relative overflow-hidden">
              {/* Premium Badge */}
              <div className="absolute top-4 right-4 bg-gradient-to-r from-green-400 to-emerald-400 text-white text-xs font-bold px-3 py-1 rounded-full">
                {t("espaluz.whatsappLiveBadge")}
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-lg">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white font-poppins flex items-center gap-2">
                    {t("espaluz.whatsappLiveTitle")}
                    <span className="text-green-400">⚡</span>
                  </h3>
                  <p className="text-green-300 font-medium">{t("espaluz.whatsappLiveSubtitle")}</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                {t("espaluz.whatsappLiveDescription")}
              </p>
              <Button 
                onClick={openLiveWhatsApp}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              >
                {t("espaluz.startChatting")}
                <ExternalLink className="ml-2 w-5 h-5" />
              </Button>
            </div>

            {/* EspaLuz Web App Card */}
            <div className="glass-card p-8 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 border border-purple-400/30 relative overflow-hidden">
              {/* Beta Badge */}
              <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-400 to-pink-400 text-white text-xs font-bold px-3 py-1 rounded-full">
                {t("espaluz.webAppBadge")}
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                  <Monitor className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white font-poppins">{t("espaluz.webAppTitle")}</h3>
                  <p className="text-purple-300 font-medium">{t("espaluz.webAppSubtitle")}</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                {t("espaluz.webAppDescription")}
              </p>
              <Button 
                onClick={openWebApp}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              >
                {t("espaluz.tryWebApp")}
                <ExternalLink className="ml-2 w-5 h-5" />
              </Button>
            </div>

            {/* Stats */}
            <div className="glass-card p-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-400 mb-1">{t("espaluz.statsLive")}</div>
                  <div className="text-gray-300 text-sm">{t("espaluz.statsTelegram")}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-400 mb-1">{t("espaluz.statsLive")}</div>
                  <div className="text-gray-300 text-sm">{t("espaluz.statsWhatsapp")}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-400 mb-1">{t("espaluz.statsBeta")}</div>
                  <div className="text-gray-300 text-sm">{t("espaluz.statsWebApp")}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EspaLuzSection;
