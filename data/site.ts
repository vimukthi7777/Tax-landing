import type { SocialLink } from "./types";

/** Global site info shared by hero, contact and footer. */
export const site = {
  name: "TaxAdvisor",
  domain: "TaxAdvisor.lk",
  logo: "/img/logo.svg",
  logoWhite: "/img/logo-white.svg",
  email: "info@taxadvisor.lk",
  /** Contact section phone */
  phone: "+94 11 234 5678",
  /** Footer phone (differs in design) */
  footerPhone: "+94 117 525 555",
  address: ["148 1/1 Colombo street,", "Kandy"],
} as const;

// TODO: replace "#" with the real profile URLs.
export const socialLinks: SocialLink[] = [
  { platform: "facebook", label: "Facebook", href: "#" },
  { platform: "instagram", label: "Instagram", href: "#" },
  { platform: "linkedin", label: "LinkedIn", href: "#" },
  { platform: "youtube", label: "YouTube", href: "#" },
  { platform: "x", label: "X", href: "#" },
  { platform: "spotify", label: "Spotify", href: "#" },
];

/** Social icons shown in the hero ("Follow us"). */
export const heroSocialPlatforms = ["facebook", "instagram", "linkedin", "youtube", "x"] as const;

/** Social icons shown in the contact section. */
export const contactSocialPlatforms = ["facebook", "youtube", "linkedin", "instagram", "spotify"] as const;
