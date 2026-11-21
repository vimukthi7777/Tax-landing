import type { Heading } from "./types";

export interface TaxServiceCard {
  title: string;
  description: string;
  icon: string;
  href: string;
}

export const taxServices = {
  id: "services",
  heading: { before: "Explore Our", accent: "Tax Services" } satisfies Heading,
  description:
    "A complete range of tax solutions, tools and resources to support your personal and business tax needs.",
  cards: [
    {
      title: "Online Tax Consultation",
      description: "Get expert tax advice and guidance from a Chartered Accountant.",
      icon: "/img/taxServices/OnlineTaxConsultation-icon.svg",
      href: "#",
    },
    {
      title: "Tax Agent",
      description: "Appoint a Chartered Accountant to manage your tax matters.",
      icon: "/img/taxServices/TaxAgent-icon.svg",
      href: "#",
    },
    {
      title: "Tax Academy",
      description: "Develop your tax knowledge and become an industry expert.",
      icon: "/img/taxServices/TaxAcademy-icon.svg",
      href: "#",
    },
    {
      title: "Tax Alerts",
      description: "Stay informed about tax deadlines and important changes in Sri Lanka.",
      icon: "/img/taxServices/TaxAlerts-icon.svg",
      href: "#",
    },
    {
      title: "Tax Store",
      description: "Explore and purchase useful tax publications and resources online.",
      icon: "/img/taxServices/TaxStore-icon.svg",
      href: "#",
    },
    {
      title: "Tax Calculator",
      description: "Calculate your monthly APIT and estimate your tax obligations.",
      icon: "/img/taxServices/TaxCalculator-icon.svg",
      href: "#",
    },
    {
      title: "Tax Calendar",
      description: "Keep track of important tax deadlines, payments and filing dates.",
      icon: "/img/taxServices/TaxCalendar-icon.svg",
      href: "#",
    },
    {
      title: "Tax Jobs",
      description: "Discover and apply for tax-related career opportunities in Sri Lanka.",
      icon: "/img/taxServices/TaxJobs-icon.svg",
      href: "#",
    },
  ] satisfies TaxServiceCard[],
};
