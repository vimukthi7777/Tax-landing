"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { clients } from "@/data/clientsPartners";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

export function Testimonials() {
  const items = clients.testimonials;
  const [i, setI] = useState(0);
  const card = useRef<HTMLDivElement>(null);
  const t = items[i];
  const multiple = items.length > 1;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(card.current, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" });
      });
    },
    { scope: card, dependencies: [i] },
  );

  const go = (d: number) => setI((v) => (v + d + items.length) % items.length);

  return (
    <div className="relative mx-auto max-w-5xl">
      <div
        ref={card}
        aria-live="polite"
        className="grid gap-6 rounded-[32px] border border-black/5 bg-white p-6 sm:p-8 md:grid-cols-[260px_1fr] md:items-center lg:gap-10 lg:p-12"
      >
        <div className="flex flex-col items-center text-center md:border-r md:border-black/10 md:pr-10">
          <Image
            src={t.photo}
            alt={t.name}
            width={160}
            height={160}
            className="size-32 rounded-full border-[3px] border-accent object-cover lg:size-40"
          />
          <p className="mt-4 text-xl font-bold lg:text-2xl">{t.name}</p>
          <p className="mt-1 text-sm text-black/70 lg:text-base">
            {t.role}
            <br />
            {t.location}
          </p>
        </div>
        <div className="text-center md:text-left">
          <span aria-hidden className="block text-6xl font-extrabold leading-none text-accent">“</span>
          <blockquote className="text-base leading-relaxed lg:text-xl">&ldquo;{t.quote}&rdquo;</blockquote>
        </div>
      </div>

      {multiple && (
        <>
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => go(-1)}
            className="absolute -left-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white shadow-md transition-transform hover:scale-105 lg:-left-6"
          >
            <FiChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => go(1)}
            className="absolute -right-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white shadow-md transition-transform hover:scale-105 lg:-right-6"
          >
            <FiChevronRight className="size-5" />
          </button>
        </>
      )}
    </div>
  );
}
