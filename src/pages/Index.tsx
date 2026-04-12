import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import EspaLuzSection from "@/components/EspaLuzSection";
import VibeCodingSection from "@/components/VibeCodingSection";
import VisionSection from "@/components/VisionSection";
import InvestorPitchSection from "@/components/InvestorPitchSection";
import AIdeazzPlatformSection from "@/components/AIdeazzPlatformSection";
import AIpaExplainerSection from "@/components/AIpaExplainerSection";
import UserJourneyTimeline from "@/components/UserJourneyTimeline";
import CallToActionSection from "@/components/CallToActionSection";
import YouTubeSubscriptionSection from "@/components/YouTubeSubscriptionSection";
import LegalFooter from "@/components/LegalFooter";
import ScrollProgress from "@/components/ScrollProgress";
import MagneticCursor from "@/components/MagneticCursor";

const Index = () => {
  useEffect(() => {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", "https://aideazz.xyz/");
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <MagneticCursor />
      <ScrollProgress />
      <Navigation />
      <main className="flex-1">
        <HeroSection />
        <EspaLuzSection />
        <AIdeazzPlatformSection />
        <AIpaExplainerSection />
        <UserJourneyTimeline />
        <VisionSection />
        <VibeCodingSection />
        <InvestorPitchSection />
        <CallToActionSection />
        <YouTubeSubscriptionSection />
      </main>
      <LegalFooter />
    </div>
  );
};

export default Index;
