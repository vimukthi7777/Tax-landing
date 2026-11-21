import type { Cta } from "./types";

export const hero = {
  id: "home",
  title: "Tax clarity",
  titleAccent: "Confident decisions",
  description:
    "Expert tax guidance, compliance and digital tools for individuals and businesses across Sri Lanka.",
  primaryCta: { label: "Request Details", href: "#contact" } satisfies Cta,
  secondaryCta: { label: "Our Services", href: "#services" } satisfies Cta,
  followLabel: "Follow us",
  image: {
    src: "/img/hero/NewHeroImg.svg",
    alt: "TaxAdvisor glass card inside a glowing ring",
  },
  /** Mobile (< lg) hero image: podcast banner from the mobile design. */
  mobileImage: {
    src: "/img/hero/hero-mobile.png",
    width: 1047,
    height: 568,
    alt: "TaxAdvisor.lk weekly tax review podcast hosts",
  },
  /** #36BDDF faded glow behind the image + its bg. */
  glow: { color: "#36BDDF", opacity: 0.35 },
  badges: ["Expert Guidance", "Digital Tools", "AI Powered Support"],
};
