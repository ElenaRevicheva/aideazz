import { Heart, Sparkles, TrendingUp, CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const UserJourneyTimeline = () => {
  const { t } = useTranslation();
  const timelineRef = useRef(null);
  const isInView = useInView(timelineRef, { once: true, margin: "-50px" });

  const journeySteps = [
    {
      icon: Heart,
      title: t("journey.step1Title") || "Struggle & Need",
      description: t("journey.step1Desc") || "Life brings challenges — relocation, language barriers, cultural adaptation",
      mood: "struggle",
      color: "from-blue-500 to-cyan-500",
      iconColor: "text-blue-400"
    },
    {
      icon: Sparkles,
      title: t("journey.step2Title") || "Meet Your AIPA",
      description: t("journey.step2Desc") || "Discover an AI companion that truly understands your emotions and journey",
      mood: "hope",
      color: "from-purple-500 to-pink-500",
      iconColor: "text-purple-400"
    },
    {
      icon: TrendingUp,
      title: t("journey.step3Title") || "Growth & Learning",
      description: t("journey.step3Desc") || "Your AIPA evolves with you, helping you learn, adapt, and thrive",
      mood: "success",
      color: "from-pink-500 to-red-500",
      iconColor: "text-pink-400"
    },
    {
      icon: CheckCircle,
      title: t("journey.step4Title") || "Confidence & Connection",
      description: t("journey.step4Desc") || "You've adapted, grown stronger, and built meaningful connections",
      mood: "success",
      color: "from-green-500 to-emerald-500",
      iconColor: "text-green-400"
    }
  ];

  return (
    <section ref={timelineRef} className="py-24 relative overflow-hidden mood-hope">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
            <Heart className="w-4 h-4 text-pink-400 animate-heart-pulse" />
            <span className="text-sm font-medium text-pink-300">Your Journey</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-6">
            <span className="gradient-text">Every AIPA Journey</span>
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            From struggle to success — how AIPAs transform lives
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-6xl mx-auto relative">
          {/* Vertical line - hidden on mobile, centered on desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 opacity-30"></div>
          
          {/* Animated progress line - hidden on mobile, centered on desktop */}
          {isInView && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "100%" }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="hidden md:block absolute left-1/2 top-0 w-0.5 bg-gradient-to-b from-blue-400 via-purple-400 to-green-400 z-10"
            ></motion.div>
          )}

          {/* Steps */}
          <div className="space-y-8 md:space-y-16">
            {journeySteps.map((step, index) => {
              const Icon = step.icon;
              const isLeft = index % 2 === 0;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`relative flex items-start gap-4 md:items-center ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  } md:gap-8`}
                >
                  {/* Icon - Left side on mobile, center on desktop */}
                  <div className="relative z-20 flex-shrink-0">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                      className={`w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-2xl animate-glow-pulse`}
                    >
                      <Icon className={`w-7 h-7 md:w-8 md:h-8 text-white`} />
                    </motion.div>
                  </div>

                  {/* Content - Right side on mobile, alternating on desktop */}
                  <div className={`flex-1 ${isLeft ? "md:text-right md:pr-8" : "md:text-left md:pl-8"} text-left`}>
                    <div className={`glass-card p-5 md:p-6 ${isLeft ? "md:animate-slide-in-right" : "md:animate-slide-in-left"}`} style={{ animationDelay: `${index * 0.2}s` }}>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3 font-poppins">
                        {step.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Spacer for alignment - desktop only */}
                  <div className="flex-1 hidden md:block"></div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserJourneyTimeline;
