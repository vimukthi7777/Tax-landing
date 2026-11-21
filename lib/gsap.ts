"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register once; import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap" everywhere.
gsap.registerPlugin(ScrollTrigger, useGSAP);

export { gsap, ScrollTrigger, useGSAP };

/** Media query string used with gsap.matchMedia() to skip motion. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

/**
 * ScrollTrigger measures trigger positions once. When the page height later changes
 * (web fonts, lazy images, carousels, embeds), those measurements go stale and
 * lower sections never reveal. Re-measure whenever the document size changes.
 */
if (typeof window !== "undefined") {
  const w = window as unknown as { __stRefreshBound?: boolean };
  if (!w.__stRefreshBound) {
    w.__stRefreshBound = true;
    let t: ReturnType<typeof setTimeout> | undefined;
    const refresh = () => {
      clearTimeout(t);
      t = setTimeout(() => ScrollTrigger.refresh(), 150);
    };
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);
    if (typeof ResizeObserver !== "undefined") {
      let lastH = 0;
      new ResizeObserver(() => {
        const h = document.documentElement.scrollHeight;
        if (h !== lastH) {
          lastH = h;
          refresh();
        }
      }).observe(document.body);
    }
  }
}

/** Run `cb` once the page loader has finished (immediately if it already has / isn't mounted). */
export function onLoaderDone(cb: () => void) {
  if (typeof window === "undefined") return;
  if (window.__loaderDone || !document.getElementById("page-loader")) {
    cb();
    return;
  }
  window.addEventListener("loader:done", cb, { once: true });
}
