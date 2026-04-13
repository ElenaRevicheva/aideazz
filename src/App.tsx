
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useLayoutEffect } from "react";
import Index from "./pages/Index";
import BusinessCard from "./pages/BusinessCard";
import About from "./pages/About";
import BlogIndex from "./pages/BlogIndex";
import BlogPost from "./pages/BlogPost";

/** Public origin for CTO AIPA (nginx serves /cto/ → PM2). Override: VITE_CTO_WEBHOOK_ORIGIN */
const CTO_WEBHOOK_ORIGIN = (
  import.meta.env.VITE_CTO_WEBHOOK_ORIGIN || "https://webhook.aideazz.xyz"
).replace(/\/$/, "");

/** Redirect /cto/* on aideazz.xyz → webhook backend (Express is not on this SPA host). Preserves ?secret=… */
function buildCtoWebhookUrl(): string {
  const path = window.location.pathname; // e.g. /cto/leads/dashboard
  const after = path.replace(/^\/cto(\/?|$)/, "/"); // /leads/dashboard or /
  const suffix = after === "/" ? "" : after;
  return `${CTO_WEBHOOK_ORIGIN}/cto${suffix}${window.location.search}${window.location.hash}`;
}

const CtoRedirect = () => {
  useLayoutEffect(() => {
    window.location.replace(buildCtoWebhookUrl());
  }, []);
  return (
    <div style={{ padding: 40, fontFamily: "sans-serif", color: "#a78bfa" }}>
      Redirecting to CTO AIPA (lead triage dashboard)…
    </div>
  );
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/portfolio" element={<BusinessCard />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/card" element={<Navigate to="/portfolio" replace />} />
          {/* Explicit + splat so /cto/leads/dashboard always matches (SPA hosts + RR6) */}
          <Route path="/cto/leads/dashboard" element={<CtoRedirect />} />
          <Route path="/cto/*" element={<CtoRedirect />} />
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
