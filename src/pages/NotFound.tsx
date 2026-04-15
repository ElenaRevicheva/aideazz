import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { applyPageSeo, SITE_ORIGIN } from "@/lib/seo";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  useEffect(() => {
    const path = location.pathname || "/";
    applyPageSeo({
      title: "Page not found | AIdeazz",
      description:
        "This page is not on aideazz.xyz. Return to the homepage for AI agents, portfolio, and contact.",
      canonicalUrl: `${SITE_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`,
      ogTitle: "404 — AIdeazz",
      ogDescription: "Page not found.",
      robots: "noindex, follow",
    });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
