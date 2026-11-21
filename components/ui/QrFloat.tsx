"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/**
 * Fixed QR card (bottom-right, black background). Appears while the section with
 * id `targetId` is in the middle of the viewport and disappears once you scroll
 * past it (or before you reach it).
 */
export function QrFloat({ targetId, src, label }: { targetId: string; src: string; label: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      // only the middle band of the viewport counts
      rootMargin: "-30% 0px -30% 0px",
      threshold: 0,
    });
    io.observe(target);
    return () => io.disconnect();
  }, [targetId]);

  return (
    <div
      aria-hidden={!visible}
      className={`fixed bottom-4 right-4 z-40 rounded-xl bg-black p-2 shadow-[0_12px_40px_rgb(0_0_0/0.35)] transition-all duration-500 md:bottom-6 md:right-6 md:rounded-2xl md:p-3 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <Image src={src} alt={label} width={320} height={320} className="size-20 rounded-md md:size-28 md:rounded-lg lg:size-32" />
    </div>
  );
}
