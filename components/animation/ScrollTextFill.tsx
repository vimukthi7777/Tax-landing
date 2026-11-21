"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

interface Segment {
  text: string;
  cls: string;
}

function segmentsFor(word: string, accentWords: string[], boldWords: string[]): Segment[] {
  const accent = accentWords.find((a) => word.includes(a));
  if (accent) {
    const i = word.indexOf(accent);
    const head = word.slice(0, i);
    const bold = boldWords.some((b) => head.startsWith(b));
    return [
      { text: head, cls: bold ? "font-bold" : "" },
      { text: word.slice(i, i + accent.length), cls: "text-accent" },
      { text: word.slice(i + accent.length), cls: "" },
    ].filter((s) => s.text);
  }
  const bold = boldWords.some((b) => word.startsWith(b));
  return [{ text: word, cls: bold ? "font-bold" : "" }];
}

/**
 * Text that fills from light to dark word by word while scrolling (scrubbed).
 * Words in `accentWords` render in #36BDDF, `boldWords` in bold.
 */
export function ScrollTextFill({
  text,
  accentWords = [],
  boldWords = [],
  className = "",
}: {
  text: string;
  accentWords?: string[];
  boldWords?: string[];
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(/\s+/);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-word]",
          { opacity: 0.18 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.1,
            scrollTrigger: {
              trigger: ref.current,
              start: "top 80%",
              end: "bottom 45%",
              scrub: true,
            },
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={i} data-word className="inline-block">
          {segmentsFor(w, accentWords, boldWords).map((s, j) => (
            <span key={j} className={s.cls}>
              {s.text}
            </span>
          ))}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}
