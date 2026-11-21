import type { Heading } from "@/data/types";

/** Heading with a #36BDDF accent part: "before <accent> after". */
export function SectionHeading({
  heading,
  as: Tag = "h2",
  className = "",
}: {
  heading: Heading;
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return (
    <Tag
      className={`text-[28px] font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl ${className}`}
    >
      {heading.before && <>{heading.before} </>}
      <span className="text-accent">{heading.accent}</span>
      {heading.after && <> {heading.after}</>}
    </Tag>
  );
}
