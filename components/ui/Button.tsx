import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

type Variant = "dark" | "light" | "accent" | "outline";

const styles: Record<Variant, { base: string; circle: string }> = {
  dark: { base: "bg-[#0d0707] text-white", circle: "bg-white text-black" },
  light: { base: "bg-white text-black", circle: "bg-black text-white" },
  accent: { base: "bg-accent text-white", circle: "bg-white text-accent" },
  outline: { base: "border border-accent text-accent", circle: "text-accent" },
};

/** Pill button with an optional arrow circle (as in the design). */
export function Button({
  href,
  children,
  variant = "dark",
  arrow = true,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
}) {
  const s = styles[variant];
  return (
    <Link
      href={href}
      className={`group inline-flex items-center justify-between gap-1.5 whitespace-nowrap rounded-2xl py-2.5 pl-3.5 pr-2 text-sm font-semibold transition-transform duration-300 hover:-translate-y-0.5 sm:gap-6 sm:py-3 sm:pl-6 sm:pr-3 sm:text-base md:text-lg ${s.base} ${className}`}
    >
      <span>{children}</span>
      {arrow && (
        <span
          className={`grid size-7 shrink-0 place-items-center sm:size-9 rounded-full transition-transform duration-300 group-hover:rotate-45 md:size-10 ${s.circle}`}
        >
          <FiArrowUpRight className="size-5" />
        </span>
      )}
    </Link>
  );
}
