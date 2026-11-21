import Link from "next/link";
import { FiBox, FiCalendar, FiCheck, FiStar, FiUser } from "react-icons/fi";
import { pricing, type PlanIcon, type PricingPlan } from "@/data/pricing";

const planIcons: Record<PlanIcon, typeof FiUser> = {
  user: FiUser,
  calendar: FiCalendar,
  box: FiBox,
  star: FiStar,
};

/**
 * Pricing card. Base classes = compact mobile card (two fit side by side at 390),
 * `md:` = tablet, `lg:` = Figma desktop size (≈306 wide, 32px padding).
 */
export function PlanCard({ plan, className = "" }: { plan: PricingPlan; className?: string }) {
  const Icon = planIcons[plan.icon];
  const dark = plan.popular;
  return (
    <article
      className={`relative flex flex-col rounded-[20px] p-4 transition-transform duration-300 hover:-translate-y-1 md:rounded-3xl md:p-5 lg:p-8 ${
        dark
          ? "border border-white/10 bg-[#202224]/90 text-white shadow-[0_20px_50px_rgb(0_0_0/0.25)] backdrop-blur-xl"
          : "glass text-black"
      } ${className}`}
    >
      {dark && (
        <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-accent px-2.5 py-0.5 text-[9px] font-semibold text-white md:-top-3 md:px-3 md:py-1 md:text-xs">
          {pricing.popularLabel}
        </span>
      )}
      <div className="flex items-center gap-2 md:gap-3">
        <span
          className={`grid size-6 place-items-center rounded-lg md:size-10 md:rounded-xl ${dark ? "bg-accent text-white" : "bg-accent/15 text-accent"}`}
        >
          <Icon className="size-3 md:size-5" />
        </span>
        <h4 className="text-[13px] font-medium md:text-base lg:text-[19px]">{plan.name}</h4>
      </div>

      {plan.description && (
        <p
          className={`mt-4 min-h-[52px] text-[9.5px] leading-[13px] md:mt-6 md:min-h-20 md:text-[13px] md:leading-5 lg:text-sm ${dark ? "text-white/80" : "text-black/65"}`}
        >
          {plan.description}
        </p>
      )}
      <p
        className={`${plan.description ? "mt-2 md:mt-4" : "mt-4 md:mt-6"} text-[9.5px] md:text-[13px] lg:text-sm ${dark ? "text-white/70" : "text-black/60"}`}
      >
        {plan.period}
      </p>
      <p className="mt-0.5 text-[26px] font-medium leading-tight tracking-tight md:mt-1 md:text-3xl lg:text-[41px]">
        {plan.price}
        {plan.priceSuffix && (
          <span className={`ml-1 text-[9px] md:text-sm ${dark ? "text-white/60" : "text-black/50"}`}>
            {plan.priceSuffix}
          </span>
        )}
      </p>
      <div className={`my-3 h-px md:my-5 ${dark ? "bg-white/15" : "bg-black/10"}`} />

      <ul className="flex-1 space-y-1.5 md:space-y-2.5">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-[10px] leading-[14px] md:gap-2.5 md:text-[13px] md:leading-snug lg:text-[15px]">
            <span
              className={`mt-px grid size-3 shrink-0 place-items-center rounded-full md:mt-0.5 md:size-4 ${dark ? "bg-accent text-white" : "text-accent"}`}
            >
              <FiCheck className="size-2 md:size-3" strokeWidth={3} />
            </span>
            {f}
          </li>
        ))}
      </ul>

      {plan.note && (
        <p
          className={`mt-3 text-[8px] leading-[11px] md:mt-5 md:text-[11px] md:leading-[18px] lg:text-[13px] ${dark ? "text-white/70" : "text-black/60"}`}
        >
          {plan.note}
        </p>
      )}
      <Link
        href={plan.cta.href}
        className={`mt-4 flex h-8 items-center justify-center rounded-full text-[10px] font-semibold transition-opacity hover:opacity-85 md:mt-6 md:h-[45px] md:text-sm lg:text-[15px] ${
          dark ? "bg-white text-black" : "bg-[#0d0707] text-white"
        }`}
      >
        {plan.cta.label}
      </Link>
    </article>
  );
}
