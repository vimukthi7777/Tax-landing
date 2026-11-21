import type { ElementType, ReactNode } from "react";

/** Page container: 1440 max, 80px margins on desktop (Figma), 20px on mobile. */
export function Container({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return (
    <Tag className={`mx-auto w-full max-w-page px-5 md:px-10 lg:px-20 ${className}`}>
      {children}
    </Tag>
  );
}
