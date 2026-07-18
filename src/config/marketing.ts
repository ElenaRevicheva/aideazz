/** Public Phase 3 endpoint (Oracle nginx → CTO AIPA). No secret in the bundle. */
export const MARKETING_INQUIRY_PROXY_URL =
  import.meta.env.VITE_MARKETING_INQUIRY_PROXY_URL ||
  "https://webhook.aideazz.xyz/cto/marketing/inquiry-proxy";

export const PORTFOLIO_INQUIRY_ANCHOR = "portfolio-inquiry-form";

/** Portfolio inquiry form with UTM tags (Oracle business_leads + HubSpot path). */
export function portfolioInquiryLink(utm: {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content?: string;
  utm_term?: string;
}): string {
  const params = new URLSearchParams({
    utm_source: utm.utm_source,
    utm_medium: utm.utm_medium,
    utm_campaign: utm.utm_campaign,
  });
  if (utm.utm_content) params.set("utm_content", utm.utm_content);
  if (utm.utm_term) params.set("utm_term", utm.utm_term);
  return `/portfolio?${params.toString()}#${PORTFOLIO_INQUIRY_ANCHOR}`;
}

/** Lab API “Start a project” → attributed portfolio inquiry. */
export const LAB_API_INQUIRY_LINK = portfolioInquiryLink({
  utm_source: "lab-api",
  utm_medium: "web",
  utm_campaign: "visibility-api",
  utm_content: "start-project",
});
