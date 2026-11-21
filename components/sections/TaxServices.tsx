"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { taxServices } from "@/data/taxServices";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/animation/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const PAGE_SIZE = 4; // mobile shows 4 cards per swipe page

export function TaxServices() {
  const cards = taxServices.cards;
  // "Online Tax Consultation" (first card) is selected by default.
  const [active, setActive] = useState(0);
  const [page, setPage] = useState(0);
  const scroller = useRef<HTMLDivElement>(null);

  const pages = Array.from({ length: Math.ceil(cards.length / PAGE_SIZE) }, (_, p) =>
    cards.slice(p * PAGE_SIZE, p * PAGE_SIZE + PAGE_SIZE).map((c, i) => ({ c, index: p * PAGE_SIZE + i })),
  );

  const pageEls = useRef<(HTMLDivElement | null)[]>([]);

  // Track which swipe page is mostly visible (drives the indicator).
  useEffect(() => {
    const root = scroller.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && e.intersectionRatio >= 0.6) {
            const i = pageEls.current.indexOf(e.target as HTMLDivElement);
            if (i >= 0) setPage(i);
          }
        }
      },
      { root, threshold: [0.6] },
    );
    pageEls.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const goTo = (p: number) => {
    const root = scroller.current;
    const el = pageEls.current[p];
    if (root && el) root.scrollTo({ left: el.offsetLeft - root.offsetLeft, behavior: "smooth" });
  };

  return (
    <section id={taxServices.id} className="py-14 lg:py-28">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <SectionHeading heading={taxServices.heading} />
          <p className="mt-4 text-base text-black/50 lg:text-lg">{taxServices.description}</p>
        </Reveal>

        <Reveal className="mt-8 lg:mt-16">
          {/* Mobile: horizontal swipe, 4 cards (2×2) per page. Desktop: 4-col grid. */}
          <div
            ref={scroller}
            className="relative flex snap-x snap-mandatory gap-4 overflow-x-auto [scrollbar-width:none] lg:grid lg:grid-cols-4 lg:gap-5 lg:overflow-visible [&::-webkit-scrollbar]:hidden"
          >
            {pages.map((items, p) => (
              <div key={p} ref={(el) => { pageEls.current[p] = el; }} className="grid w-full min-w-0 shrink-0 grow-0 basis-full snap-start grid-cols-2 grid-rows-2 gap-4 lg:contents">
                {items.map(({ c, index }) => {
                  const isActive = active === index;
                  return (
                    <Link
                      key={c.title}
                      href={c.href}
                      onMouseEnter={() => setActive(index)}
                      onFocus={() => setActive(index)}
                      onClick={() => setActive(index)}
                      className={`relative flex min-h-[200px] flex-col items-center justify-center rounded-3xl px-2 py-5 text-center transition-all duration-300 lg:min-h-0 lg:justify-start lg:px-8 lg:pb-12 lg:pt-14 ${
                        isActive
                          ? "-translate-y-1 bg-white shadow-[0_14px_40px_rgb(15_40_80/0.12)]"
                          : "bg-white/60"
                      }`}
                    >
                      <span
                        className={`absolute left-1/2 top-0 h-1.5 w-1/4 -translate-x-1/2 rounded-b-full bg-accent transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0"}`}
                      />
                      <Image
                        src={c.icon}
                        alt=""
                        width={80}
                        height={80}
                        className={`h-10 w-auto transition-transform duration-300 lg:h-20 ${isActive ? "scale-110" : ""}`}
                      />
                      <h3 className="mt-3 text-sm font-bold leading-tight lg:mt-8 lg:text-2xl">{c.title}</h3>
                      <p className="mt-1.5 text-[10px] leading-snug text-black/70 lg:mt-5 lg:text-[15px]">
                        {c.description}
                      </p>
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Mobile page dots */}
          <div className="mt-5 flex justify-center gap-2 lg:hidden">
            {pages.map((_, p) => (
              <button
                key={p}
                type="button"
                aria-label={`Show services page ${p + 1}`}
                aria-current={page === p}
                onClick={() => goTo(p)}
                className={`rounded-full transition-all duration-300 ${page === p ? "h-2 w-6 bg-accent" : "h-2 w-2 bg-black/15"}`}
              />
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
