import React from "react";

/**
 * The AIdeazz Lab backdrop: the orange-burst film behind a localised dot patch.
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

  // ── the film ────────────────────────────────────────────────────────────
  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || window.innerWidth < 860) return;

    const onReady = () => {
      v.play()
        .then(() => v.classList.add("opacity-100"))
        .catch(() => {
          /* autoplay refused — the poster stays, which is a fine outcome */
        });
    };
    v.addEventListener("canplay", onReady, { once: true });
    v.preload = "auto";
    v.src = "/media/orange-burst.mp4";
    return () => v.removeEventListener("canplay", onReady);
  }, []);

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

    const PX = 0.3, PY = 0.63, PW = 0.2, PH = 0.22, GAP = 11;

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
          x.fillStyle = `rgba(255,252,244,${(f * flick * 0.26 * breathe).toFixed(3)})`;
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
        loop
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
