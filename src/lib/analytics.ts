/**
 * The one place the app talks to GA4.
 *
 * WHY THIS EXISTS
 * gtag.js has been loaded in index.html all along, but nothing in the app ever
 * called it — every event in the property came from Enhanced Measurement. That
 * is why a 28-day window showed 2,404 sessions and `keyEvents: 0`: the actions
 * worth money were never emitted, so no amount of later analysis could tie a
 * session to a lead.
 *
 * It also explains the missing `form_submit`. Enhanced Measurement listens for a
 * NATIVE form submit, and every form here calls preventDefault() and POSTs via
 * fetch. So "0 submissions" was never a measurement — it was a blind spot, and a
 * blind spot that reads as a zero is worse than no number at all.
 *
 * PRIVACY: never pass names, emails, message bodies or any other field a person
 * typed. Events record THAT something happened and where it came from, never who.
 */
type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params?: EventParams) => void;
  }
}

/**
 * Fire a GA4 event. Never throws: analytics exists to observe a conversion, so
 * it must not be able to break the conversion it is watching (an ad-blocker
 * removing gtag is the normal case, not an error).
 */
export function track(event: string, params: EventParams = {}): void {
  try {
    window.gtag?.("event", event, params);
  } catch {
    /* observation must never cost the thing being observed */
  }
}

export {};
