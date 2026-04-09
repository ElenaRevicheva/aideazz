/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Optional override; default `aideazz.hashnode.dev` for live post sync */
  readonly VITE_HASHNODE_HOST?: string;
  /** Override Oracle public inquiry URL (default: webhook.aideazz.xyz/cto/marketing/inquiry-proxy) */
  readonly VITE_MARKETING_INQUIRY_PROXY_URL?: string;
}
