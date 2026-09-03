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
  const aRef = React.useRef<HTMLVideoElement | null>(null);
  const bRef = React.useRef<HTMLVideoElement | null>(null);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  // ── the reel ────────────────────────────────────────────────────────────
  // TWO video elements, not one. Swapping `src` on a single element gave a hard
  // cut and a black flash while the next file buffered. Here the films alternate
  // between A and B: while one plays, the other silently preloads the next, and
  // 1.2s before the end they cross-dissolve on opacity. The viewer sees one
  // continuous piece of footage rather than three clips in a row.
  const REEL = React.useMemo(
    () => ["/media/orange-burst.mp4", "/media/pomegranate.mp4", "/media/kiwi.mp4"],
    [],
  );

  React.useEffect(() => {
    const a = aRef.current;
    const b = bRef.current;
    if (!a || !b) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerWidth < 860) return;

    const XFADE = 1.2; // seconds of overlap
    let cur = a;
    let nxt = b;
    let i = 0;
    let handing = false;
    let dead = false;

    const show = (el: HTMLVideoElement) => (el.style.opacity = "1");
    const hide = (el: HTMLVideoElement) => (el.style.opacity = "0");

    const preloadNext = () => {
      const j = (i + 1) % REEL.length;
      if (nxt.getAttribute("data-src") !== REEL[j]) {
        nxt.setAttribute("data-src", REEL[j]);
        nxt.src = REEL[j];
        nxt.load();
      }
    };

    // The hand-off. Fires once per film, on the last 1.2s.
    const onTime = () => {
      if (dead || handing) return;
      const left = (cur.duration || 0) - cur.currentTime;
      if (!cur.duration || left > XFADE) return;
      handing = true;
      nxt.currentTime = 0;
      nxt
        .play()
        .then(() => {
          show(nxt);
          hide(cur);
          window.setTimeout(() => {
            if (dead) return;
            const finished = cur;
            cur = nxt;
            nxt = finished;
            i = (i + 1) % REEL.length;
            finished.pause();
            handing = false;
            preloadNext();
          }, XFADE * 1000);
        })
        .catch(() => {
          handing = false;
        });
    };

    // A file that will not load must not strand the reel on a frozen frame.
    const onError = () => {
      if (dead) return;
      i = (i + 1) % REEL.length;
      cur.src = REEL[i];
      cur.load();
      cur.play().then(() => show(cur)).catch(() => {});
      preloadNext();
    };

    a.addEventListener("timeupdate", onTime);
    b.addEventListener("timeupdate", onTime);
    a.addEventListener("error", onError);
    b.addEventListener("error", onError);

    a.preload = "auto";
    a.src = REEL[0];
    a.setAttribute("data-src", REEL[0]);
    a.play().then(() => { show(a); preloadNext(); }).catch(() => {
      /* autoplay refused — the poster stays, which is a fine outcome */
    });

    return () => {
      dead = true;
      a.removeEventListener("timeupdate", onTime);
      b.removeEventListener("timeupdate", onTime);
      a.removeEventListener("error", onError);
      b.removeEventListener("error", onError);
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

    // Near full-frame now, and each dot carries its own colour: warm gold on the
    // left, white through the centre, violet on the right -- the arcoiris Elena
    // asked for. The rainbow lives IN the dots rather than only in the streak,
    // which is what makes the field read as refracted sunlight instead of a grid
    // with a coloured smear laid over it.
    const PX = 0.02, PY = 0.16, PW = 0.96, PH = 0.76, GAP = 14;

    const frame = (t: number) => {
      x.clearRect(0, 0, W, H);

      const x0 = W * PX, y0 = H * PY, w = W * PW, h = H * PH;
      const breathe = Math.sin(t * 0.00035) * 0.18 + 0.82;
      for (let gy = 0; gy < h; gy += GAP) {
        for (let gx = 0; gx < w; gx += GAP) {
          const u = gx / w, v = gy / h;
          const f = Math.min(1, Math.min(Math.min(u, 1 - u) / 0.34, Math.min(v, 1 - v) / 0.34));
          if (f <= 0.02) continue;
          const flick = 0.7 + 0.3 * Math.sin(t * 0.0011 + gx * 0.21 + gy * 0.13);
          // arcoiris across the frame, with a slow hue drift so it never sits still
          const hx = (x0 + gx) / W + Math.sin(t * 0.00012) * 0.06;
          const R = Math.round(255 - Math.max(0, hx - 0.45) * 150);
          const G = Math.round(238 - Math.abs(hx - 0.5) * 120);
          const B = Math.round(196 + hx * 59);
          x.fillStyle = `rgba(${R},${G},${B},${(f * flick * 0.3 * breathe).toFixed(3)})`;
          x.beginPath();
          x.arc(x0 + gx, y0 + gy, 1.3, 0, 6.283);
          x.fill();
        }
      }

      // two broad prism bands, drifting out of phase
      x.save();
      x.globalCompositeOperation = "screen";
      x.filter = "blur(22px)";
      const band = (cx: number, cy: number, bw: number, bh: number, ph: number) => {
        const g = x.createLinearGradient(cx, 0, cx + bw, 0);
        g.addColorStop(0, "rgba(255,178,61,0)");
        g.addColorStop(0.2, "rgba(255,178,61,.20)");
        g.addColorStop(0.45, "rgba(140,255,214,.16)");
        g.addColorStop(0.72, "rgba(180,124,255,.19)");
        g.addColorStop(1, "rgba(180,124,255,0)");
        x.fillStyle = g;
        x.fillRect(cx, cy + Math.sin(t * 0.0004 + ph) * 9, bw, bh);
      };
      band(W * 0.1, H * 0.34, W * 0.55, H * 0.07, 0);
      band(W * 0.42, H * 0.66, W * 0.5, H * 0.06, 2.1);
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
        ref={aRef}
        muted
        playsInline
        preload="none"
        poster="/media/orange-burst.jpg"
        style={{ opacity: 0, transitionDuration: "1200ms" }}
        className="absolute inset-0 h-full w-full object-cover transition-opacity"
      />
      <video
        ref={bRef}
        muted
        playsInline
        preload="none"
        style={{ opacity: 0, transitionDuration: "1200ms" }}
        className="absolute inset-0 h-full w-full object-cover transition-opacity"
      />
      {/* legibility veil — dark at top and bottom, the burst survives in the middle */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,5,14,.90) 0%, rgba(8,5,14,.55) 26%, rgba(8,5,14,.60) 58%, rgba(8,5,14,.78) 100%)",
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
