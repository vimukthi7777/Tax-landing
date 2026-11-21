"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

const MIN_MS = 1200; // never flash: show at least this long
const RAMP_MS = 1800; // fake progress ramps to 90% over this long while the page loads

declare global {
  interface Window {
    __loaderDone?: boolean;
  }
}

/**
 * Full-screen page loader on the brand colour: logo in the middle with white sonar rings
 * pulsing behind it. Completion follows the real page load (an internal progress value
 * eases to 90%, then finishes when the window `load` event fires); no number is shown. When done it
 * slides up and fires `loader:done` so the hero intro can play.
 */
export function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    const start = performance.now();
    let loaded = document.readyState === "complete";
    const onLoad = () => (loaded = true);
    window.addEventListener("load", onLoad);

    let shown = 0;
    let raf = 0;
    let finishing = false;

    const finish = () => {
      if (finishing) return;
      finishing = true;
      window.__loaderDone = true;
      window.dispatchEvent(new Event("loader:done"));
      document.documentElement.style.overflow = prevOverflow;
      gsap
        .timeline({
          onComplete: () => {
            setGone(true);
            window.dispatchEvent(new Event("resize")); // let ScrollTrigger re-measure
          },
        })
        .to("[data-loader='content']", { opacity: 0, scale: 0.9, duration: 0.45, ease: "power2.in" })
        .to(el, { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, "-=0.1");
    };

    const tick = (now: number) => {
      const t = now - start;
      // eased ramp toward 90% while loading; after load, run to 100%
      const ramp = 90 * (1 - Math.pow(1 - Math.min(t / RAMP_MS, 1), 3));
      const target = loaded && t >= MIN_MS ? 100 : Math.min(ramp, 90);
      shown += (target - shown) * (loaded && t >= MIN_MS ? 0.12 : 0.2);
      if (target === 100 && shown > 99.5) shown = 100;
      if (shown >= 100) {
        window.setTimeout(finish, 250);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", onLoad);
      document.documentElement.style.overflow = prevOverflow;
    };
  }, []);

  if (gone) return null;

  return (
    <div
      ref={root}
      id="page-loader"
      role="status"
      aria-live="polite"
      aria-label="Loading"
      className="fixed inset-0 z-[100] grid place-items-center bg-[#36bddf] text-white"
    >
      <div data-loader="content" className="flex flex-col items-center">
        <div className="relative grid size-56 place-items-center sm:size-72">
          {/* sonar waves */}
          {[0, 0.8, 1.6].map((d) => (
            <span
              key={d}
              aria-hidden
              className="sonar-ring absolute size-28 rounded-full border-2 border-white/90 bg-white/35 sm:size-32"
              style={{ animationDelay: `${d}s` }}
            />
          ))}
          {/* white disc + logo */}
          <span className="relative z-10 grid size-28 place-items-center rounded-full bg-white shadow-[0_10px_40px_rgb(0_0_0/0.15)] sm:size-32">
            <Image src="/img/loader.png" alt="" width={201} height={201} priority className="size-20 sm:size-24" />
          </span>
        </div>
        <span className="sr-only">Loading…</span>
      </div>
    </div>
  );
}
