/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Optional override; default `aideazz.hashnode.dev` for live post sync */
  readonly VITE_HASHNODE_HOST?: string;
  /** dev.to username for public API (blog fallback + index). Default: elenarevicheva */
  readonly VITE_DEVTO_USERNAME?: string;
  /** Override Oracle public inquiry URL (default: webhook.aideazz.xyz/cto/marketing/inquiry-proxy) */
  readonly VITE_MARKETING_INQUIRY_PROXY_URL?: string;
  /** CTO AIPA public origin (no path). Used to redirect /cto/* from this SPA — default https://webhook.aideazz.xyz */
  readonly VITE_CTO_WEBHOOK_ORIGIN?: string;
  /** Google reCAPTCHA v3 site key (public); pair with RECAPTCHA_SECRET_KEY on CTO AIPA */
  readonly VITE_RECAPTCHA_SITE_KEY?: string;
}
