import { Code, Zap, Heart, Brain, MessageCircle, Target } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const VibeCodingSection = () => {
  const { t } = useTranslation();
  
  return (
    <section id="vibe-coding" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
            <Code className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-300">{t("vibeCoding.badge")}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-6">
            <span className="gradient-text">{t("vibeCoding.title")}</span>
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            {t("vibeCoding.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="glass-card p-8 text-center"
          >
            <Heart className="w-12 h-12 text-pink-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-white mb-4 font-poppins">{t("vibeCoding.emotionalIntelligence")}</h3>
            <p className="text-gray-300">{t("vibeCoding.emotionalDescription")}</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="glass-card p-8 text-center"
          >
            <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-white mb-4 font-poppins">{t("vibeCoding.adaptiveLearning")}</h3>
            <p className="text-gray-300">{t("vibeCoding.adaptiveDescription")}</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="glass-card p-8 text-center"
          >
            <Code className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-white mb-4 font-poppins">{t("vibeCoding.humanCentered")}</h3>
            <p className="text-gray-300">{t("vibeCoding.humanDescription")}</p>
          </motion.div>
        </div>

        {/* New section */}
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-8 mb-8">
            <h3 className="text-3xl font-bold font-poppins mb-6 text-center flex items-center justify-center gap-3">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Brain className="w-10 h-10 text-purple-400 animate-glow-pulse" />
              </motion.div>
              <span className="gradient-text">{t("vibeCoding.sectionTitle")}</span>
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed mb-6 text-center">
              {t("vibeCoding.sectionSubtitle")}
            </p>
            <p className="text-center text-gray-300 mb-8">{t("vibeCoding.sectionDescription")}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Brain className="w-6 h-6 text-purple-400" />
                  <h4 className="text-xl font-semibold text-white font-poppins">{t("vibeCoding.card1Title")}</h4>
                </div>
                <p className="text-gray-300 mb-4">{t("vibeCoding.card1Description")}</p>
                <ul className="text-sm text-gray-300 space-y-2">
                  <li>{t("vibeCoding.card1Point1")}</li>
                  <li>{t("vibeCoding.card1Point2")}</li>
                  <li>{t("vibeCoding.card1Point3")}</li>
                </ul>
                <p className="text-sm text-gray-300 mt-4">
                  {t("vibeCoding.card1Conclusion")}
                </p>
              </div>

              <div className="glass-card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <MessageCircle className="w-6 h-6 text-green-400" />
                  <h4 className="text-xl font-semibold text-white font-poppins">{t("vibeCoding.card2Title")}</h4>
                </div>
                <p className="text-gray-300 mb-4">
                  {t("vibeCoding.card2Description")}
                </p>
                <p className="text-gray-300 mb-4">{t("vibeCoding.card2SubDescription")}</p>
                <ul className="text-sm text-gray-300 space-y-2">
                  <li>{t("vibeCoding.card2Point1")}</li>
                  <li>{t("vibeCoding.card2Point2")}</li>
                  <li>{t("vibeCoding.card2Point3")}</li>
                </ul>
              </div>

              <div className="glass-card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-6 h-6 text-orange-400" />
                  <h4 className="text-xl font-semibold text-white font-poppins">{t("vibeCoding.card3Title")}</h4>
                </div>
                <p className="text-gray-300">
                  {t("vibeCoding.card3Description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VibeCodingSection;