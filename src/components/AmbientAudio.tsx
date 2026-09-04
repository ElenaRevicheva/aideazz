import React from "react";

/**
 * The page's ambient track — "Deep House Sunset", Pixabay, royalty-free.
 *
 * Sourced with the method documented in `cto-aipa/docs/atuona/FILM_COMPILATION_GUIDE.md`
 * §4: Pixabay Cloudflare-blocks plain curl, so the track page comes through the
 * Bright Data Web Unlocker, its JSON-LD `AudioObject.contentUrl` gives the real
 * cdn.pixabay.com mp3, and that CDN file downloads with an ordinary request. The
 * guide's ">= 2:30 so the loop is unnoticeable" rule is why a 3:11 track was picked
 * over the 1:38 one that otherwise fit.
 *
 * ── Why this is not simply `<audio autoplay>` ───────────────────────────────────
 *
 * Every current browser BLOCKS audible autoplay until the user has interacted with
 * the page. Chrome, Safari and Firefox all reject the `play()` promise with
 * NotAllowedError. So "plays automatically" cannot be implemented as a flag; it has
 * to be implemented as an attempt plus a fallback:
 *
 *   1. try to play on mount — succeeds when the user already has a media-engagement
 *      history with the domain, which is common for a returning visitor;
 *   2. if that is refused, arm ONE listener for the first real interaction
 *      (pointerdown / keydown / scroll) and start then;
 *   3. either way the control shows the true state, so the page never claims to be
 *      playing while it is silent.
 *
 * A muted autoplay would satisfy the letter of "plays automatically" and none of
 * its intent, so it is not used.
 *
 * ── Consent, and why the default is remembered ─────────────────────────────────
 *
 * A visitor who mutes must stay muted on the next page load, or the control is
 * decorative. The choice lives in localStorage and is read BEFORE any play attempt.
 * `prefers-reduced-motion` is honoured too: someone who has asked their OS to calm
 * interfaces down is not asking for a soundtrack.
 *
 * `preload="none"` — 1.4 MB is not downloaded for anyone who never turns it on.
 */

const KEY = "aidz_ambient_muted";

export default function AmbientAudio() {
  const ref = React.useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = React.useState(false);
  const [ready, setReady] = React.useState(false);

  // Read the stored choice before deciding anything. Wrapped because Safari in
  // private mode throws on localStorage access rather than returning null.
  const storedMuted = React.useMemo(() => {
    try {
      return localStorage.getItem(KEY) === "1";
    } catch {
      return false;
    }
  }, []);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setReady(true);

    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (storedMuted || calm) return;

    let armed = false;
    const start = () => {
      el.volume = 0.35;
      el.play()
        .then(() => setPlaying(true))
        .catch(() => {
          // Autoplay refused. Wait for the first genuine interaction, once.
          if (armed) return;
          armed = true;
          const go = () => {
            el.play().then(() => setPlaying(true)).catch(() => {});
            window.removeEventListener("pointerdown", go);
            window.removeEventListener("keydown", go);
            window.removeEventListener("scroll", go);
          };
          window.addEventListener("pointerdown", go, { once: true });
          window.addEventListener("keydown", go, { once: true });
          window.addEventListener("scroll", go, { once: true, passive: true });
        });
    };
    start();

    // The control must never lie about the state, so it follows the ELEMENT rather
    // than our own bookkeeping — a tab suspend or an OS interruption pauses the
    // audio without telling React.
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    return () => {
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
    };
  }, [storedMuted]);

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) {
      el.volume = 0.35;
      el.play().then(() => setPlaying(true)).catch(() => {});
      try {
        localStorage.setItem(KEY, "0");
      } catch {
        /* private mode — the session still works, it just will not remember */
      }
    } else {
      el.pause();
      setPlaying(false);
      try {
        localStorage.setItem(KEY, "1");
      } catch {
        /* as above */
      }
    }
  };

  return (
    <>
      <audio ref={ref} loop preload="none" playsInline>
        <source src="/media/ambient.webm" type="audio/webm" />
        <source src="/media/ambient.mp3" type="audio/mpeg" />
      </audio>

      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Mute background music" : "Play background music"}
        aria-pressed={playing}
        title={playing ? "Mute music" : "Play music"}
        className="fixed bottom-5 left-5 z-50 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white/80 backdrop-blur-md transition-colors hover:border-white/35 hover:text-white"
        style={{ visibility: ready ? "visible" : "hidden" }}
      >
        {playing ? (
          // speaker with waves — sound is ON, pressing this mutes
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 5 6 9H3v6h3l5 4V5Z" />
            <path d="M15.5 8.5a5 5 0 0 1 0 7" />
            <path d="M18.5 5.5a9 9 0 0 1 0 13" />
          </svg>
        ) : (
          // speaker crossed out — sound is OFF
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 5 6 9H3v6h3l5 4V5Z" />
            <path d="m16 9 5 6M21 9l-5 6" />
          </svg>
        )}
      </button>
    </>
  );
}
