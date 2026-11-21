import type { Cta, Heading } from "./types";

export interface DigitalServiceCard {
  title: string;
  description: string;
  icon: string;
  cta: Cta;
  /** Filled #36BDDF-style highlighted card (first card in the design). */
  featured?: boolean;
  /** Decorative art in the card's bottom-right corner. */
  art?: string;
}

export const digitalServices = {
  id: "digital-services",
  heading: { before: "Explore Tax Advisor", accent: "Digital Services" } satisfies Heading,
  description: "Access our key tax solutions, tools and expert services in one place.",
  viewAll: { label: "View All Services", href: "#services" } satisfies Cta,
  cards: [
    {
      title: "WhatsApp Channel",
      description: "Stay updated with the latest tax changes, announcements and expert insights.",
      icon: "/img/digitalServices/Whatsapp-icon.svg",
      cta: { label: "Join Channel", href: "#" },
      featured: true,
      art: "/img/digitalServices/WhatsappChannels-card-bottom-right.svg",
    },
    {
      title: "Tax Consultation",
      description: "Book your consultant at your convenient time and meet subject-matter experts.",
      icon: "/img/digitalServices/TaxConsultation-icon.svg",
      cta: { label: "Consult Now", href: "#" },
    },
    {
      title: "Tax Advisor AI",
      description: "Get instant, accurate answers to your tax questions, anytime via Web or WhatsApp.",
      icon: "/img/digitalServices/TaxAdvisorAI-icon.svg",
      cta: { label: "Try Tax AI", href: "#" },
    },
    {
      title: "Patreon Platform",
      description: "Stay ahead in taxation with weekly practical tax insights tailored for Sri Lankans.",
      icon: "/img/digitalServices/PatreonPlatform-icon.svg",
      cta: { label: "Join Today", href: "#" },
    },
  ] satisfies DigitalServiceCard[],
};
