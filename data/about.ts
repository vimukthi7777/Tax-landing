export const about = {
  id: "about",
  /**
   * Scroll-reveal text (light → dark). `accent` marks words rendered in #36BDDF
   * once revealed. Split on whitespace by ScrollTextFill.
   */
  text: "TaxAdvisor.lk helps individuals and businesses manage taxes with expert guidance, digital tools and AI-powered solutions for faster, more accurate and compliant tax decisions.",
  accentWords: [".lk"],
  boldWords: ["TaxAdvisor"],
};

export interface AboutStat {
  icon: string;
  /** Number the counter animates to (0 → value). */
  value: number;
  /** Text after the number, e.g. "+" */
  suffix: string;
  /** Static display for non-numeric stats (e.g. "24/7"). Skips counting. */
  staticValue?: string;
  label: string;
}

export const aboutStats: AboutStat[] = [
  { icon: "/img/about/icon1.svg", value: 15, suffix: "+", label: "Years Experience" },
  { icon: "/img/about/icon2.svg", value: 1000, suffix: "+", label: "Clients Supported" },
  // "24/7": counted as two numbers (0→24, "/", 0→7) by CountUp, or shown static.
  { icon: "/img/about/icon3.svg", value: 24, suffix: "/7", staticValue: "24/7", label: "Tax AI Access" },
];
