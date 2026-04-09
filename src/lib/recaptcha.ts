/** Google reCAPTCHA v3 (invisible) — site key is public; secret stays on CTO AIPA. */

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, opts: { action: string }) => Promise<string>;
    };
  }
}

const SCRIPT_ID = "recaptcha-v3-script";
const LOAD_TIMEOUT_MS = 25_000;
const EXEC_TIMEOUT_MS = 20_000;

export function getRecaptchaSiteKey(): string | undefined {
  const k = import.meta.env.VITE_RECAPTCHA_SITE_KEY?.trim();
  return k || undefined;
}

let loadScriptPromise: Promise<void> | null = null;

function withTimeout<T>(p: Promise<T>, ms: number, label: string): Promise<T> {
  return Promise.race([
    p,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`${label} (${ms}ms)`)), ms)
    ),
  ]);
}

/** Wait until grecaptcha exists (script may still be initializing). */
function waitForGrecaptchaReady(): Promise<void> {
  return new Promise((resolve, reject) => {
    const tick = () => {
      if (window.grecaptcha?.ready) {
        try {
          window.grecaptcha.ready(() => resolve());
        } catch (e) {
          reject(e);
        }
        return;
      }
      setTimeout(tick, 50);
    };
    tick();
  });
}

function loadScript(siteKey: string): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.grecaptcha?.execute) return Promise.resolve();
  if (loadScriptPromise) return loadScriptPromise;

  loadScriptPromise = (async () => {
    if (!document.getElementById(SCRIPT_ID)) {
      await new Promise<void>((resolve, reject) => {
        const s = document.createElement("script");
        s.id = SCRIPT_ID;
        s.async = true;
        s.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
        s.onload = () => resolve();
        s.onerror = () => reject(new Error("reCAPTCHA script failed to load"));
        document.head.appendChild(s);
      });
    }
    await withTimeout(waitForGrecaptchaReady(), LOAD_TIMEOUT_MS, "reCAPTCHA API bind");
  })();

  loadScriptPromise = loadScriptPromise.catch((e) => {
    loadScriptPromise = null;
    const tag = document.getElementById(SCRIPT_ID);
    if (tag?.parentNode) tag.parentNode.removeChild(tag);
    throw e;
  });

  return loadScriptPromise;
}

export async function getRecaptchaToken(siteKey: string): Promise<string> {
  await loadScript(siteKey);
  if (!window.grecaptcha?.execute) {
    throw new Error("reCAPTCHA execute unavailable");
  }
  return withTimeout(
    new Promise<string>((resolve, reject) => {
      window.grecaptcha!.ready(() => {
        window
          .grecaptcha!.execute(siteKey, { action: "inquiry" })
          .then(resolve)
          .catch(reject);
      });
    }),
    EXEC_TIMEOUT_MS,
    "reCAPTCHA execute"
  );
}
