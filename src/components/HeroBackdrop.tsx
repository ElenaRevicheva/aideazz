import React from "react";

/**
 * The AIdeazz Lab backdrop: a film reel of fruit bursts behind a dot field.
 *
 * Made in Elena's own Runway account rather than bought from a stock library —
 * the violet glass shell cut open to a glowing citrus core is the product
 * metaphor (open the site up, show what is inside), so it is worth the bytes in
 * a way that a generic gradient never is.
 *
 * Three rules it will not break, because this page sells technical credibility
 * and a slow page argues against the pitch:
 *
 * 1. **The poster is the page.** It paints immediately and is what everyone sees
 *    first. The film fades in only once `canplay` fires; if it never does — slow
 *    network, missing file, codec refusal — the page looks exactly as it did
 *    before this component existed.
 * 2. **Phones never download it.** 1.4 MB of decoration on cellular is somebody
 *    else's money. Under 860px the video element is never given a `src`.
 * 3. **`prefers-reduced-motion` disables both** the film and the canvas.
 */
export default function HeroBackdrop() {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  // ── the reel ────────────────────────────────────────────────────────────
  // Each film runs its full 10s, then the next begins. No `loop` attribute:
  // the `ended` event drives the sequence, so adding a fourth fruit is one line
  // in this array and nothing else.
  const REEL = React.useMemo(
    () => ["/media/orange-burst.mp4", "/media/pomegranate.mp4"],
    [],
  );

  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || window.innerWidth < 860) return;

    let i = 0;
    const play = () => {
      v.play()
        .then(() => v.classList.add("opacity-100"))
        .catch(() => {
          /* autoplay refused — the poster stays, which is a fine outcome */
        });
    };
    const onReady = () => play();
    const onEnded = () => {
      // Advance the reel. A failed load must not freeze on a black frame, so
      // `error` walks forward too.
      i = (i + 1) % REEL.length;
      v.src = REEL[i];
      v.load();
      play();
    };
    v.addEventListener("canplay", onReady);
    v.addEventListener("ended", onEnded);
    v.addEventListener("error", onEnded);
    v.preload = "auto";
    v.src = REEL[0];
    return () => {
      v.removeEventListener("canplay", onReady);
      v.removeEventListener("ended", onEnded);
      v.removeEventListener("error", onEnded);
    };
  }, [REEL]);

  // ── the dot patch + prismatic streak ────────────────────────────────────
  // Read off hud.ai rather than invented: one contained patch of dot-matrix,
  // feathered at every edge so it dissolves into the frame, plus a single soft
  // prism streak. Deliberately NOT a full-screen grid — that reads as texture
  // stuck to the glass instead of light inside the scene.
  React.useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const x = c.getContext("2d");
    if (!x) return;

    let W = 0,
      H = 0,
      raf = 0;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const size = () => {
      W = c.clientWidth;
      H = c.clientHeight;
      c.width = W * DPR;
      c.height = H * DPR;
      x.setTransform(DPR, 0, 0, DPR, 0, 0);
    };
    size();
    window.addEventListener("resize", size);

    // Widened on Elena's note that the dots should hold more of the screen:
    // the patch was a fifth of the width sitting low; now it spans most of the
    // frame and rides higher. Still ONE feathered region rather than a global
    // grid -- edge falloff is what keeps it reading as light in the scene.
    const PX = 0.06, PY = 0.4, PW = 0.88, PH = 0.5, GAP = 13;

    const frame = (t: number) => {
      x.clearRect(0, 0, W, H);

      const x0 = W * PX, y0 = H * PY, w = W * PW, h = H * PH;
      const breathe = Math.sin(t * 0.00035) * 0.18 + 0.82;
      for (let gy = 0; gy < h; gy += GAP) {
        for (let gx = 0; gx < w; gx += GAP) {
          const u = gx / w, v = gy / h;
          const f = Math.min(1, Math.min(Math.min(u, 1 - u) / 0.34, Math.min(v, 1 - v) / 0.34));
          if (f <= 0.02) continue;
          const flick = 0.72 + 0.28 * Math.sin(t * 0.0011 + gx * 0.21 + gy * 0.13);
          x.fillStyle = `rgba(255,252,244,${(f * flick * 0.17 * breathe).toFixed(3)})`;
          x.beginPath();
          x.arc(x0 + gx, y0 + gy, 1.15, 0, 6.283);
          x.fill();
        }
      }

      const sx = W * 0.62, sy = H * 0.6, sw = W * 0.2, sh = H * 0.055;
      const g = x.createLinearGradient(sx, 0, sx + sw, 0);
      g.addColorStop(0, "rgba(255,178,61,0)");
      g.addColorStop(0.22, "rgba(255,178,61,.16)");
      g.addColorStop(0.48, "rgba(140,255,214,.13)");
      g.addColorStop(0.74, "rgba(180,124,255,.15)");
      g.addColorStop(1, "rgba(180,124,255,0)");
      x.save();
      x.globalCompositeOperation = "screen";
      x.filter = "blur(14px)";
      x.fillStyle = g;
      x.fillRect(sx, sy + Math.sin(t * 0.0004) * 6, sw, sh);
      x.restore();

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", size);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0" aria-hidden="true">
      <img
        src="/media/orange-burst.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <video
        ref={videoRef}
        muted
        playsInline
        preload="none"
        poster="/media/orange-burst.jpg"
        className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-1000"
      />
      {/* legibility veil — dark at top and bottom, the burst survives in the middle */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,5,14,.90) 0%, rgba(8,5,14,.55) 26%, rgba(8,5,14,.62) 58%, rgba(8,5,14,.95) 100%)",
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
