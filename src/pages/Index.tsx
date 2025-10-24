import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import EspaLuzSection from "@/components/EspaLuzSection";
import VibeCodingSection from "@/components/VibeCodingSection";
import VisionSection from "@/components/VisionSection";
import InvestorPitchSection from "@/components/InvestorPitchSection";
import AIdeazzPlatformSection from "@/components/AIdeazzPlatformSection";
import AIpaExplainerSection from "@/components/AIpaExplainerSection";
import CallToActionSection from "@/components/CallToActionSection";
import YouTubeSubscriptionSection from "@/components/YouTubeSubscriptionSection";
import LegalFooter from "@/components/LegalFooter";
import ScrollProgress from "@/components/ScrollProgress";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollProgress />
      <Navigation />
      <main className="flex-1">
        <HeroSection />
        <EspaLuzSection />
        <VibeCodingSection />
        <InvestorPitchSection />
        <VisionSection />
        <AIdeazzPlatformSection />
        <AIpaExplainerSection />
        <CallToActionSection />
        <YouTubeSubscriptionSection />
      </main>
      <LegalFooter />
    </div>
  );
};

export default Index;
