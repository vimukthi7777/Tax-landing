import type { Heading } from "./types";

export const mobileApp = {
  id: "app",
  heading: { before: "Manage", accent: "Your Taxes", after: "Anytime, Anywhere" } satisfies Heading,
  description:
    "Get the latest tax updates, use powerful tax tools, and manage your tax needs all in one app.",
  background: "/img/mobileApp/mobileapp-section-bg.png",
  mockup: {
    src: "/img/mobileApp/mobileapp-section-mockup.png",
    alt: "Tax Advisor mobile app screens",
  },
  stores: [
    // TODO: replace with the real store URLs.
    { name: "App Store", icon: "/img/mobileApp/appleStoreIcon.svg", href: "#" },
    { name: "Google Play", icon: "/img/mobileApp/googlePlayIcon.svg", href: "#" },
  ],
  /** Stat row under the store buttons. */
  stats: [
    { value: "10K+", label: "Downloads", icon: "download" },
    { value: "4.8★", label: "User Rating", icon: "star" },
    { value: "All in One", label: "Tax Tools", icon: "phone" },
    { value: "Real time", label: "Tax Updates", icon: "bell" },
  ],
  /** Floating cards overlapping the phones. */
  floatingCards: [
    { value: "10K+", label: "Downloads", image: "/img/mobileApp/Downloads.svg", position: "left" },
    { value: "4.8★", label: "User Rating", image: "/img/mobileApp/UserRating.svg", position: "right" },
  ],
} as const;
