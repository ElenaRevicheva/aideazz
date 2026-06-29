import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { applyHomePageSeo } from "@/lib/seo";
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
  const [searchParams] = useSearchParams();

  useEffect(() => {
    applyHomePageSeo();
  }, []);

  /** Atlas expat_language micro-tests: land on EspaLuz section, not generic hero. */
  useEffect(() => {
    const campaign = searchParams.get("utm_campaign") || "";
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    if (campaign === "atlas_expat_language" || hash === "#espaluz") {
      const t = window.setTimeout(() => {
        document.getElementById("espaluz")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 400);
      return () => window.clearTimeout(t);
    }
  }, [searchParams]);

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
