/** Google reCAPTCHA v3 (invisible) — site key is public; secret stays on CTO AIPA. */

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, opts: { action: string }) => Promise<string>;
    };
  }
}

export function getRecaptchaSiteKey(): string | undefined {
  const k = import.meta.env.VITE_RECAPTCHA_SITE_KEY?.trim();
  return k || undefined;
}

let loadScriptPromise: Promise<void> | null = null;

function loadScript(siteKey: string): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.grecaptcha?.execute) return Promise.resolve();
  if (loadScriptPromise) return loadScriptPromise;

  loadScriptPromise = new Promise((resolve, reject) => {
    const id = "recaptcha-v3-script";
    if (document.getElementById(id)) {
      window.grecaptcha!.ready(() => resolve());
      return;
    }
    const s = document.createElement("script");
    s.id = id;
    s.async = true;
    s.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
    s.onload = () => {
      window.grecaptcha!.ready(() => resolve());
    };
    s.onerror = () => reject(new Error("reCAPTCHA script failed"));
    document.head.appendChild(s);
  });
  return loadScriptPromise;
}

export async function getRecaptchaToken(siteKey: string): Promise<string> {
  await loadScript(siteKey);
  return new Promise((resolve, reject) => {
    window.grecaptcha!.ready(() => {
      window
        .grecaptcha!.execute(siteKey, { action: "inquiry" })
        .then(resolve)
        .catch(reject);
    });
  });
}
