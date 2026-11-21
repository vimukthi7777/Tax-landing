"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

/**
 * Appear-on-scroll wrapper. Fades + slides children in when they enter the
 * viewport. `stagger` animates direct children one after another.
 */
export function Reveal({
  children,
  className = "",
  as: Tag = "div",
  id,
  y = 40,
  delay = 0,
  duration = 0.9,
  stagger = 0,
  start = "top 85%",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  id?: string;
  y?: number;
  delay?: number;
  duration?: number;
  stagger?: number;
  start?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const targets = stagger ? Array.from(el.children) : el;
        gsap.from(targets, {
          opacity: 0,
          y,
          duration,
          delay,
          stagger,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start, once: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} id={id} className={className}>
      {children}
    </Tag>
  );
}
