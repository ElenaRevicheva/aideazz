/** Public Phase 3 endpoint (Oracle nginx → CTO AIPA). No secret in the bundle. */
export const MARKETING_INQUIRY_PROXY_URL =
  import.meta.env.VITE_MARKETING_INQUIRY_PROXY_URL ||
  "https://webhook.aideazz.xyz/cto/marketing/inquiry-proxy";
