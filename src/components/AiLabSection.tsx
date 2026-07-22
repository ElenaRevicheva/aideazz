import {
  MessageCircle,
  Zap,
  Search,
  Film,
  ShieldCheck,
  Gem,
  FlaskConical,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

/**
 * Commercial AI Lab services on the vision homepage — mirrors portfolio whatIBuild
 * copy (shared i18n keys). CTAs deep-link to /portfolio inquiry; does not alter
 * Platform / Agents / Vision sections.
 */
const SERVICES = [
  {
    icon: MessageCircle,
    titleKey: "whatIBuild.item1Title",
    descKey: "whatIBuild.item1Desc",
    iconColor: "text-purple-300",
    iconBg: "bg-purple-500/15 border-purple-500/30",
    cardBg: "bg-purple-600/10 border-purple-500/25",
  },
  {
    icon: Zap,
    titleKey: "whatIBuild.item2Title",
    descKey: "whatIBuild.item2Desc",
    iconColor: "text-blue-300",
    iconBg: "bg-blue-500/15 border-blue-500/30",
    cardBg: "bg-blue-600/10 border-blue-500/25",
  },
  {
    icon: Search,
    titleKey: "whatIBuild.item3Title",
    descKey: "whatIBuild.item3Desc",
    iconColor: "text-emerald-300",
    iconBg: "bg-emerald-500/15 border-emerald-500/30",
    cardBg: "bg-emerald-600/10 border-emerald-500/25",
  },
  {
    icon: Film,
    titleKey: "whatIBuild.item4Title",
    descKey: "whatIBuild.item4Desc",
    iconColor: "text-pink-300",
    iconBg: "bg-pink-500/15 border-pink-500/30",
    cardBg: "bg-pink-600/10 border-pink-500/25",
  },
  {
    icon: ShieldCheck,
    titleKey: "whatIBuild.item5Title",
    descKey: "whatIBuild.item5Desc",
    iconColor: "text-amber-300",
    iconBg: "bg-amber-500/15 border-amber-500/30",
    cardBg: "bg-amber-600/10 border-amber-500/25",
  },
  {
    icon: Gem,
    titleKey: "whatIBuild.personalTitle",
    descKey: "whatIBuild.personalDesc",
    iconColor: "text-purple-200",
    iconBg: "bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-400/30",
    cardBg: "bg-gradient-to-r from-purple-600/15 to-pink-600/15 border-purple-400/30",
  },
] as const;

const PROJECT_HREF = "/portfolio#portfolio-inquiry-form";

const AiLabSection = () => {
  const { t } = useTranslation();

  return (
    <section id="ai-lab" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
            <FlaskConical className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-medium text-emerald-300">{t("nav.aiLab")}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-4">
            <span className="gradient-text">{t("aiLab.title")}</span>
          </h2>
          <p className="text-lg md:text-xl font-semibold text-purple-200/95 tracking-tight mb-2">
            {t("whatIBuild.tagline")}
          </p>
          <p className="text-sm md:text-base text-gray-400 tracking-wide mb-6">
            {t("whatIBuild.lanes")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-purple-500/35 bg-white/[0.04] hover:bg-purple-500/10 text-sm font-semibold text-gray-200 hover:text-white transition-all"
            >
              {t("aiLab.portfolioCta")}
              <ArrowUpRight className="w-4 h-4 text-purple-300" />
            </Link>
            <a
              href="https://aideazz.xyz/api"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-emerald-500/35 bg-emerald-500/5 hover:bg-emerald-500/10 text-sm font-semibold text-emerald-100 transition-all"
            >
              {t("aiLab.auditCta")}
              <ArrowUpRight className="w-4 h-4 text-emerald-300" />
            </a>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-5xl mx-auto mb-10">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.titleKey}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className={`glass-card p-5 sm:p-6 border ${s.cardBg} flex gap-4`}
            >
              <div
                className={`w-10 h-10 shrink-0 rounded-lg border ${s.iconBg} flex items-center justify-center`}
              >
                <s.icon className={`w-5 h-5 ${s.iconColor}`} strokeWidth={1.75} />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-base sm:text-lg font-semibold text-white mb-1.5 leading-snug font-poppins">
                  {t(s.titleKey)}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-3">{t(s.descKey)}</p>
                <Link
                  to={PROJECT_HREF}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-purple-300 hover:text-purple-200 transition-colors"
                >
                  {t("whatIBuild.ctaHint")}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-[0.2em] mb-3">
            {t("whatIBuild.diffLabel")}
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {(["whatIBuild.diff1", "whatIBuild.diff2", "whatIBuild.diff3"] as const).map((k) => (
              <span
                key={k}
                className="text-[10px] sm:text-xs px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-200/90"
              >
                {t(k)}
              </span>
            ))}
          </div>
          <p className="text-base sm:text-lg font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
            {t("whatIBuild.punch")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default AiLabSection;
