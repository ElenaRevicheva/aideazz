/** Public Phase 3 endpoint (Oracle nginx → CTO AIPA). No secret in the bundle. */
export const MARKETING_INQUIRY_PROXY_URL =
  import.meta.env.VITE_MARKETING_INQUIRY_PROXY_URL ||
  "https://webhook.aideazz.xyz/cto/marketing/inquiry-proxy";

export const PORTFOLIO_INQUIRY_ANCHOR = "portfolio-inquiry-form";

/** Newsletter double opt-in (Oracle newsletter_subscribers → Resend confirmation). */
export const NEWSLETTER_SUBSCRIBE_URL =
  import.meta.env.VITE_NEWSLETTER_SUBSCRIBE_URL ||
  "https://webhook.aideazz.xyz/cto/v1/newsletter/subscribe";

export const PORTFOLIO_NEWSLETTER_ANCHOR = "portfolio-newsletter";

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

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;
const UTM_STORE = "aideazz_utm_v1";

/** Persist inbound UTMs so /api → /portfolio still closes the HubSpot loop. */
export function captureInboundUtms(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const next: Record<string, string> = {};
  const params = new URLSearchParams(window.location.search);
  for (const k of UTM_KEYS) {
    const v = params.get(k);
    if (v) next[k] = v;
  }
  if (Object.keys(next).length) {
    try {
      sessionStorage.setItem(UTM_STORE, JSON.stringify(next));
    } catch {
      /* private mode */
    }
    return next;
  }
  try {
    const raw = sessionStorage.getItem(UTM_STORE);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, string>;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

/** Prefer the click's campaign over the generic lab-api CTA. */
export function inquiryLinkFromInbound(fallback: string): string {
  const utm = captureInboundUtms();
  if (utm.utm_source && utm.utm_campaign) {
    return portfolioInquiryLink({
      utm_source: utm.utm_source,
      utm_medium: utm.utm_medium || "community",
      utm_campaign: utm.utm_campaign,
      ...(utm.utm_content ? { utm_content: utm.utm_content } : {}),
      ...(utm.utm_term ? { utm_term: utm.utm_term } : {}),
    });
  }
  return fallback;
}
