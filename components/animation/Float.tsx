"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

/** Gentle continuous up/down movement. `delay` offsets the phase between elements. */
export function Float({
  children,
  distance = 14,
  duration = 2.6,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  distance?: number;
  duration?: number;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          ref.current,
          { y: distance / 2 },
          { y: -distance / 2, duration, delay, ease: "sine.inOut", yoyo: true, repeat: -1 },
        );
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
