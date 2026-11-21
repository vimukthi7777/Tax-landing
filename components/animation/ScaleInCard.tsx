"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

/**
 * Scroll-scrubbed "shrink to fit" entrance: the card starts scaled up so it fills the full
 * viewport width with square corners, then scales down to its normal size and rounded
 * corners as it scrolls into view. Normal scrolling continues to the next section.
 */
export function ScaleInCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const radius = getComputedStyle(el).borderTopLeftRadius || "0px";
        gsap.fromTo(
          el,
          {
            // full viewport width ÷ current card width (>= 1)
            scale: () => Math.max(1, window.innerWidth / el.offsetWidth),
            borderRadius: 0,
          },
          {
            scale: 1,
            borderRadius: radius,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "top 15%",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
