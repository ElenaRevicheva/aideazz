
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import EspaLuzSection from "@/components/EspaLuzSection";
import VibeCodingSection from "@/components/VibeCodingSection";
import VisionSection from "@/components/VisionSection";
import InvestorPitchSection from "@/components/InvestorPitchSection";
import AIdeazzPlatformSection from "@/components/AIdeazzPlatformSection";
import AIpaExplainerSection from "@/components/AIpaExplainerSection";
import CallToActionSection from "@/components/CallToActionSection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
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
      </main>
      <footer className="w-full mt-16 pb-8 flex justify-center">
        <div className="rounded-full bg-white/5 px-6 py-3 text-sm font-semibold text-amber-300 shadow-lg border border-white/10 flex items-center gap-2 backdrop-blur-md">
          <span role="img" aria-label="point">👉</span> 
          <span>AIPA Era minted. <span role="img" aria-label="fire">🔥</span> Have any AIdeazz? Get on the ledger.</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;

