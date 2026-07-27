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
import AiLabSection from "@/components/AiLabSection";
import AIpaExplainerSection from "@/components/AIpaExplainerSection";
import UserJourneyTimeline from "@/components/UserJourneyTimeline";
import CallToActionSection from "@/components/CallToActionSection";
import YouTubeSubscriptionSection from "@/components/YouTubeSubscriptionSection";
import LegalFooter from "@/components/LegalFooter";
import ScrollProgress from "@/components/ScrollProgress";
import MagneticCursor from "@/components/MagneticCursor";
import WhatsAppFloat from "@/components/WhatsAppFloat";

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
      {/* WhatsApp lives bottom-LEFT here exactly as on /portfolio — the homepage
          never had it, so visitors on the vision site had no one-tap way to reach
          Elena while HubSpot chat sat on the right (2026-07-27). */}
      <WhatsAppFloat />
      <Navigation />
      <main className="flex-1">
        <HeroSection />
        <EspaLuzSection />
        <AIdeazzPlatformSection />
        <AiLabSection />
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
