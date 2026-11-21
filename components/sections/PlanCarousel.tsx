"use client";

import { useRef, useState } from "react";
import type { PricingPlan } from "@/data/pricing";
import { PlanCard } from "./PlanCard";

/**
 * Plans for one pricing group.
 * - Mobile: a tab bar (plan names) + a swipeable row showing 2 cards at a time.
 *   The selected tab is the right-most visible card (starts on the 2nd, "Most Popular").
 * - md and up: a 4-column grid.
 */
export function PlanCarousel({ plans }: { plans: PricingPlan[] }) {
  const [active, setActive] = useState(Math.min(1, plans.length - 1));
  const scroller = useRef<HTMLDivElement>(null);
  const lastLeft = useRef(0);

  const stepOf = (el: HTMLDivElement) => {
    const [a, b] = [el.children[0] as HTMLElement | undefined, el.children[1] as HTMLElement | undefined];
    return a && b ? b.offsetLeft - a.offsetLeft : (a?.clientWidth ?? 1);
  };

  const onScroll = () => {
    const el = scroller.current;
    if (!el) return;
    const left = Math.round(el.scrollLeft / stepOf(el));
    if (left !== lastLeft.current) {
      lastLeft.current = left;
      setActive(Math.min(left + 1, plans.length - 1));
    }
  };

  const goTo = (i: number) => {
    const el = scroller.current;
    if (!el) return;
    setActive(i);
    // bring card i into view as the right-most of the two visible cards
    const target = el.children[Math.max(i - 1, 0)] as HTMLElement | undefined;
    if (target) el.scrollTo({ left: target.offsetLeft - el.offsetLeft, behavior: "smooth" });
  };

  return (
    <div>
      {/* Mobile tabs */}
      <div role="tablist" className="mt-5 flex rounded-full bg-white p-1.5 shadow-[0_4px_20px_rgb(15_40_80/0.06)] md:hidden">
        {plans.map((p, i) => (
          <button
            key={p.name}
            type="button"
            role="tab"
            aria-selected={active === i}
            onClick={() => goTo(i)}
            className={`flex-1 whitespace-nowrap rounded-full px-1 py-2.5 text-[13px] transition-colors duration-300 ${
              active === i ? "bg-[#0d0707] font-semibold text-white" : "text-black/80"
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      <div
        ref={scroller}
        onScroll={onScroll}
        className="relative -mx-1 mt-3 flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-1 pb-6 pt-4 [scrollbar-width:none] md:mx-0 md:mt-0 md:grid md:grid-cols-4 md:gap-5 md:overflow-visible md:p-0 [&::-webkit-scrollbar]:hidden"
      >
        {plans.map((p) => (
          <PlanCard
            key={p.name}
            plan={p}
            className="basis-[calc(50%-5px)] shrink-0 snap-start md:basis-auto"
          />
        ))}
      </div>
    </div>
  );
}
