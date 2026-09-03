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
  // WebM where the browser takes it, MP4 otherwise. Read off hud.ai, which ships
  // its hero as `hero_scene.webm`: at matched quality VP9 lands ~17% under x264
  // (2505 KB vs 3002 KB on the orange), so this is sharper AND lighter rather
  // than a trade between them. `src` is set imperatively by the crossfade below,
  // so the choice is made here rather than with <source> children.
  const REEL = React.useMemo(() => {
    const probe = document.createElement("video");
    const webm = probe.canPlayType('video/webm; codecs="vp9"') !== "";
    const ext = webm ? "webm" : "mp4";
    return [
      `/media/orange-burst.${ext}`,
      `/media/pomegranate.${ext}`,
      `/media/kiwi.${ext}`,
    ];
  }, []);

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
    // Read off hud.ai's own login page rather than invented: small SQUARES on a
    // tight grid, not circles on a loose one, massed into a single soft-edged
    // blob that fills the frame instead of sitting in a rectangle.
    //
    // Two details do the work. Each dot twitches on its own pseudo-random phase,
    // so the field SCINTILLATES like light on water rather than pulsing in
    // visible waves — a shared phase reads as a screensaver, an independent one
    // reads as something alive. And the hue runs gold → white → violet across
    // the width, so the arcoiris lives IN the dots; a coloured smear laid over a
    // grey grid always looks like a filter stuck on the glass.
    const GAP = 12, DOT = 2;

    const frame = (t: number) => {
      x.clearRect(0, 0, W, H);

      const cx = W * 0.5, cy = H * 0.52;
      const rad = Math.hypot(W, H) * 0.58;
      const breathe = Math.sin(t * 0.00035) * 0.14 + 0.86;
      for (let gy = 0; gy < H; gy += GAP) {
        for (let gx = 0; gx < W; gx += GAP) {
          const d = Math.hypot(gx - cx, gy - cy) / rad;
          const blob = Math.max(0, 1 - d * d);
          // feather the frame edges too, so the blob never hits a hard wall
          const edge = Math.min(1, Math.min(gx, W - gx) / 90, Math.min(gy, H - gy) / 90);
          const f = blob * edge;
          if (f <= 0.015) continue;
          // cheap per-dot hash → neighbours are never in step
          const hash = (gx * 12.9898 + gy * 78.233) % 6.283;
          const flick = 0.42 + 0.58 * Math.abs(Math.sin(t * 0.0026 + hash));
          const hx = gx / W + Math.sin(t * 0.00016) * 0.09;
          const R = Math.round(255 - Math.max(0, hx - 0.42) * 168);
          const G = Math.round(240 - Math.abs(hx - 0.5) * 150);
          const B = Math.round(188 + hx * 67);
          x.fillStyle = `rgba(${R},${G},${B},${(f * flick * 0.52 * breathe).toFixed(3)})`;
          x.fillRect(gx, gy, DOT, DOT);
        }
      }

      // Three prism rays, tilted rather than level and drifting out of phase.
      // Tilt is what separates a ray of light from a stripe: level bands read as
      // UI chrome, a few degrees off horizontal reads as sun through a window.
      x.save();
      x.globalCompositeOperation = "screen";
      x.filter = "blur(26px)";
      const ray = (rx: number, ry: number, bw: number, bh: number, ang: number, ph: number) => {
        x.save();
        x.translate(rx, ry + Math.sin(t * 0.0004 + ph) * 12);
        x.rotate(ang);
        const g = x.createLinearGradient(-bw / 2, 0, bw / 2, 0);
        g.addColorStop(0, "rgba(255,178,61,0)");
        g.addColorStop(0.22, "rgba(255,178,61,.30)");
        g.addColorStop(0.46, "rgba(140,255,214,.26)");
        g.addColorStop(0.74, "rgba(180,124,255,.30)");
        g.addColorStop(1, "rgba(180,124,255,0)");
        x.fillStyle = g;
        x.fillRect(-bw / 2, -bh / 2, bw, bh);
        x.restore();
      };
      ray(W * 0.38, H * 0.32, W * 0.88, H * 0.09, -0.13, 0);
      ray(W * 0.64, H * 0.66, W * 0.8, H * 0.08, 0.1, 2.1);
      ray(W * 0.5, H * 0.49, W * 0.96, H * 0.06, -0.04, 4.2);
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
        src="/media/orange-burst.webp"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <video
        ref={aRef}
        muted
        playsInline
        preload="none"
        poster="/media/orange-burst.webp"
        style={{ opacity: 0, transitionDuration: "1200ms", filter: "saturate(0.82) brightness(0.78)" }}
        className="absolute inset-0 h-full w-full object-cover transition-opacity"
      />
      <video
        ref={bRef}
        muted
        playsInline
        preload="none"
        style={{ opacity: 0, transitionDuration: "1200ms", filter: "saturate(0.82) brightness(0.78)" }}
        className="absolute inset-0 h-full w-full object-cover transition-opacity"
      />
      {/* legibility veil — dark at top and bottom, the burst survives in the middle */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,5,14,.92) 0%, rgba(8,5,14,.62) 24%, rgba(8,5,14,.72) 52%, rgba(8,5,14,.86) 78%, rgba(8,5,14,.90) 100%)",
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

    </div>
  );
}
