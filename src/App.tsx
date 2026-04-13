
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import BusinessCard from "./pages/BusinessCard";
import About from "./pages/About";
import BlogIndex from "./pages/BlogIndex";
import BlogPost from "./pages/BlogPost";

/** Redirect /cto/* paths to webhook.aideazz.xyz/cto/* (backend) */
const CtoRedirect = () => {
  useEffect(() => {
    const path = window.location.pathname.replace(/^\/cto/, '');
    const search = window.location.search;
    window.location.href = `https://webhook.aideazz.xyz/cto${path}${search}`;
  }, []);
  return <div style={{ padding: 40, fontFamily: 'sans-serif', color: '#a78bfa' }}>Redirecting to CTO dashboard…</div>;
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
          <Route path="/cto/*" element={<CtoRedirect />} />
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
