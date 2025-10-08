import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
  const { t } = useTranslation();
  
  const scrollToEspaLuz = () => {
    const espaluzSection = document.getElementById('espaluz');
    if (espaluzSection) {
      espaluzSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="pt-32 pb-20 relative">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-300">{t("hero.badge")}</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold font-poppins mb-8 leading-tight">
            {t("hero.title")}
            <br />
            <span className="gradient-text">{t("hero.titleHighlight")}</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
            {t("hero.description")}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={scrollToEspaLuz}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
            >
              {t("hero.tryEspaLuz")}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-4 rounded-full font-semibold text-lg">
              {t("hero.learnMore")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
