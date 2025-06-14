
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import EspaLuzSection from "@/components/EspaLuzSection";
import VisionSection from "@/components/VisionSection";
import InvestorPitchSection from "@/components/InvestorPitchSection";
import AIdeazzPlatformSection from "@/components/AIdeazzPlatformSection";
import AIpaExplainerSection from "@/components/AIpaExplainerSection";
import CallToActionSection from "@/components/CallToActionSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <EspaLuzSection />
        <InvestorPitchSection />
        <VisionSection />
        <AIdeazzPlatformSection />
        <AIpaExplainerSection />
        <CallToActionSection />
      </main>
    </div>
  );
};

export default Index;
