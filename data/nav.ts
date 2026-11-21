import type { Cta, NavLink } from "./types";

export interface ServiceGroup {
  id: string;
  title: string;
  icon: string;
  links: NavLink[];
}

/** Left intro panel of the Services mega menu (desktop). */
export const servicesMenuIntro = {
  icon: "/img/nav/nav-OurServices-icon.svg",
  bottomArt: "/img/nav/nav-OurServices-card-bottom.svg",
  title: "Our Services",
  description: "Professional tax solutions for individuals and businesses.",
  highlights: ["Expert Guidance", "Compliance Support", "Digital & Online Solutions"],
  cta: { label: "View All Services", href: "#services" } satisfies Cta,
};

/** Bottom banner of the Services mega menu. */
export const servicesMenuBanner = {
  title: "Need expert tax advice?",
  text: "Book an online consultation with our tax experts today.",
  cta: { label: "Book a Consultation", href: "#contact" } satisfies Cta,
};

/** Desktop: first 4 groups = top row, last 3 = bottom row. */
export const serviceGroups: ServiceGroup[] = [
  {
    id: "advisory",
    title: "Tax Advisory & Consultation",
    icon: "/img/nav/nav-Consultation-icon.svg",
    links: [
      { label: "Online Tax Consultation", href: "#" },
      { label: "Personal Tax Consultation", href: "#" },
      { label: "Corporate Tax Consultation", href: "#" },
      { label: "Startup Tax Consultation", href: "#" },
      { label: "Video Consultation", href: "#" },
      { label: "Legal Opinions", href: "#" },
      { label: "Tax Impact Analysis", href: "#" },
      { label: "Tax Review Services", href: "#" },
    ],
  },
  {
    id: "agent",
    title: "Tax Agent & Compliance",
    icon: "/img/nav/nav-TaxAgent-icon.svg",
    links: [
      { label: "Tax Agent Appointment", href: "#" },
      { label: "TIN Registration", href: "#" },
      { label: "Tax Portal Registration", href: "#" },
      { label: "Individual Tax Return Filing", href: "#" },
      { label: "Corporate Tax Services", href: "#" },
      { label: "Quarterly Tax Payments", href: "#" },
      { label: "Tax Credit Statement Filing", href: "#" },
      { label: "Post-Return Support", href: "#" },
    ],
  },
  {
    id: "academy",
    title: "Tax Academy & Learning",
    icon: "/img/nav/nav-TaxAcademy-icon.svg",
    links: [
      { label: "Tax Academy", href: "#" },
      { label: "Certified Tax Technician (CTT)", href: "#" },
      { label: "CTT Membership", href: "#" },
      { label: "Professional Development", href: "#" },
    ],
  },
  {
    id: "tools",
    title: "Tax Tools & Resources",
    icon: "/img/nav/nav-TaxTools-icon.svg",
    links: [
      { label: "APIT Tax Calculator", href: "#" },
      { label: "Tax Calendar", href: "#" },
      { label: "Tax Store", href: "#" },
      { label: "Tax Publications", href: "#" },
      { label: "Tax Downloads & Guides", href: "#" },
    ],
  },
  {
    id: "updates",
    title: "Tax Updates & Information",
    icon: "/img/nav/nav-TaxUpdates-icon.svg",
    links: [
      { label: "SMS Tax Alerts", href: "#" },
      { label: "WhatsApp Tax Updates", href: "#" },
      { label: "Tax News & Announcements", href: "#" },
      { label: "Tax Articles & Insights", href: "#" },
      { label: "Tax Weekly Podcast", href: "#" },
      { label: "Tax Law Updates", href: "#" },
    ],
  },
  {
    id: "digital",
    title: "Digital & Online Services",
    icon: "/img/nav/nav-DigitalandOnline-icon.svg",
    links: [
      { label: "Tax Advisor AI – Web", href: "#" },
      { label: "Tax Advisor AI – WhatsApp", href: "#" },
      { label: "Online Consultation Booking", href: "#" },
      { label: "Online Payments", href: "#" },
      { label: "Client Portal", href: "#" },
      { label: "Mobile Application", href: "#" },
    ],
  },
  {
    id: "career",
    title: "Career & Employment",
    icon: "/img/nav/nav-career-icon.svg",
    links: [
      { label: "Tax Jobs", href: "#" },
      { label: "Tax-Related Opportunities", href: "#" },
    ],
  },
];

export interface NavItem {
  label: string;
  href: string;
  /** Services opens the mega menu (desktop) / accordion of groups (mobile). */
  kind?: "mega" | "dropdown";
  children?: NavLink[];
}

/**
 * Main navigation. Mobile menu shows only these titles; items with
 * `kind: "mega"` expand to `serviceGroups` (titles → links) and
 * `kind: "dropdown"` expand to `children`.
 */
export const navItems: NavItem[] = [
  { label: "Services", href: "#services", kind: "mega" },
  { label: "Pricing", href: "#pricing" },
  {
    label: "Resources",
    href: "#news",
    kind: "dropdown",
    // TODO: not in the design, confirm the real Resources sub-items.
    children: [
      { label: "Tax News & Announcements", href: "#news" },
      { label: "Tax Articles & Insights", href: "#" },
      { label: "Tax Weekly Podcast", href: "#podcast" },
      { label: "Tax Downloads & Guides", href: "#" },
    ],
  },
  { label: "Tax Academy", href: "#" },
  {
    label: "About",
    href: "#about",
    kind: "dropdown",
    // TODO: not in the design, confirm the real About sub-items.
    children: [
      { label: "About Us", href: "#about" },
      { label: "Clients & Partners", href: "#clients" },
    ],
  },
  { label: "Contact", href: "#contact" },
];

export const navActions = {
  aiSearch: { label: "AI Tax Search", href: "#" } satisfies Cta,
  login: { label: "Login", href: "#" } satisfies Cta,
};
