"use client";

import { useEffect, useRef } from "react";

interface Layer {
  y: number; // vertical position (0..1 of height)
  amp: number; // amplitude (fraction of height)
  len: number; // wavelength (fraction of width)
  speed: number; // radians / second
  phase: number;
  top: string; // gradient colours (rgba, low alpha so it sits on a light page)
  bottom: string;
}

// Soft blues from the brand accent (#36BDDF) to a deeper blue. Transparent canvas: no background fill.
const LAYERS: Layer[] = [
  { y: 0.18, amp: 0.018, len: 1.1, speed: 0.35, phase: 0.0, top: "rgba(54,189,223,0.00)", bottom: "rgba(54,189,223,0.10)" },
  { y: 0.38, amp: 0.022, len: 0.8, speed: -0.28, phase: 1.7, top: "rgba(40,150,225,0.10)", bottom: "rgba(40,150,225,0.00)" },
  { y: 0.58, amp: 0.02, len: 1.3, speed: 0.22, phase: 3.1, top: "rgba(30,120,215,0.00)", bottom: "rgba(30,120,215,0.10)" },
  { y: 0.78, amp: 0.026, len: 0.9, speed: -0.32, phase: 4.6, top: "rgba(54,189,223,0.10)", bottom: "rgba(54,189,223,0.00)" },
];

interface Dust {
  x: number;
  y: number;
  r: number;
  vy: number;
  vx: number;
  tw: number; // twinkle speed
  ph: number; // twinkle phase
}

/**
 * Animated "fluid wavy layers + glowing dust" background on a transparent canvas.
 * Layers are sine-sum waves in translucent blues; dust motes drift upward and twinkle.
 * Pauses when off screen; renders a single still frame for prefers-reduced-motion.
 */
export function WaveBackground({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let running = false;
    let dust: Dust[] = [];

    const seedDust = () => {
      const count = Math.round(Math.min(90, Math.max(24, (w * h) / 28000)));
      dust = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.8 + Math.random() * 2.2,
        vy: -(6 + Math.random() * 14), // px/s upward
        vx: (Math.random() - 0.5) * 6,
        tw: 0.6 + Math.random() * 1.4,
        ph: Math.random() * Math.PI * 2,
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedDust();
      draw(performance.now() / 1000, 0);
    };

    let last = 0;
    const draw = (t: number, dt: number) => {
      ctx.clearRect(0, 0, w, h);

      // Wave layers
      for (const L of LAYERS) {
        const base = L.y * h;
        const amp = L.amp * h;
        const k = (Math.PI * 2) / (L.len * w);
        const g = ctx.createLinearGradient(0, base - amp * 2, 0, base + h * 0.22);
        g.addColorStop(0, L.top);
        g.addColorStop(1, L.bottom);
        ctx.beginPath();
        ctx.moveTo(0, h);
        for (let x = 0; x <= w + 8; x += 8) {
          const y =
            base +
            Math.sin(x * k + t * L.speed + L.phase) * amp +
            Math.sin(x * k * 2.1 - t * L.speed * 0.7 + L.phase * 1.6) * amp * 0.45;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(w, h);
        ctx.closePath();
        ctx.fillStyle = g;
        ctx.fill();
      }

      // Glowing dust
      for (const d of dust) {
        d.y += d.vy * dt;
        d.x += d.vx * dt;
        if (d.y < -10) {
          d.y = h + 10;
          d.x = Math.random() * w;
        }
        if (d.x < -10) d.x = w + 10;
        if (d.x > w + 10) d.x = -10;
        const a = 0.35 + 0.35 * Math.sin(t * d.tw + d.ph);
        const glow = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r * 6);
        glow.addColorStop(0, `rgba(54,189,223,${a * 0.55})`);
        glow.addColorStop(1, "rgba(54,189,223,0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r * 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(255,255,255,${0.5 + a * 0.5})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r * 0.7, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const frame = (now: number) => {
      const t = now / 1000;
      const dt = last ? Math.min(0.05, t - last) : 0;
      last = t;
      draw(t, dt);
      raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (running || reduce) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { threshold: 0 });
    io.observe(canvas);
    const onVis = () => (document.hidden ? stop() : undefined);
    document.addEventListener("visibilitychange", onVis);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={`pointer-events-none ${className}`} />;
}
