import type { Cta, Heading } from "./types";

export type PlanIcon = "user" | "calendar" | "box" | "star";

export interface PricingPlan {
  name: string;
  icon: PlanIcon;
  /** Line above the price, e.g. "Per appointment" / "Annual plan". */
  period: string;
  /** Intro paragraph (consultation plans only). */
  description?: string;
  price: string;
  /** Small suffix next to the price, e.g. "annum". */
  priceSuffix?: string;
  features: string[];
  note?: string;
  popular?: boolean;
  cta: Cta;
}

export interface PricingGroup {
  id: string;
  title: string;
  description: string;
  plans: PricingPlan[];
}

const requestDetails: Cta = { label: "Request Details", href: "#contact" };
const consultNote =
  "For a more effective tax consultation, it is advisable to submit your requirements in advance.";

const agentCommon = {
  period: "Annual plan",
  priceSuffix: "annum",
  cta: requestDetails,
};

const agentTail = [
  "Advising on quarterly tax payments",
  "Reminders on Tax due dates",
  "Advising on Quarterly payments and filing attachment 01, 02 & Tax Credit Statements",
  "Filing Final Tax Return online",
  "Post Return filing support",
];

export const pricing = {
  id: "pricing",
  heading: {
    before: "Transparent Pricing for Exceptional",
    accent: "Tax Advisory Services",
  } satisfies Heading,
  description: "Choose the right plan for your tax needs, Clear, simple and no hidden fees.",
  /** Ribbon shown behind the glassmorphism cards. */
  ribbon: "/img/priceCard/price-section-bg-rebon.svg",
  popularLabel: "Most Popular",
  groups: [
    {
      id: "consultations",
      title: "Online Tax Consultations",
      description:
        "Choose the right consultation plan for expert tax advice, personalised guidance, and professional support from a Chartered Accountant.",
      plans: [
        {
          name: "Basic",
          icon: "user",
          period: "Per appointment",
          description:
            "You can discuss your personal tax matter online with a Chartered Accountant and get the clarifications.",
          price: "Rs.3,000",
          features: ["Personal tax Consultation", "One to one discussion", "Online Consultation", "15 minutes"],
          note: consultNote,
          cta: requestDetails,
        },
        {
          name: "Basic Plus",
          icon: "calendar",
          period: "Per appointment",
          description:
            "You can discuss your personal tax matter online with a Chartered Accountant and get the clarifications.",
          price: "Rs.6,000",
          features: ["Personal tax Consultation", "One to one discussion", "Online Consultation", "30 minutes"],
          note: consultNote,
          popular: true,
          cta: requestDetails,
        },
        {
          name: "Enterprise",
          icon: "box",
          period: "Per appointment",
          description:
            "You can discuss your corporate tax matter online with a Chartered Accountant and get the clarifications.",
          price: "Rs.10,000",
          features: ["Specific tax matters", "One to one discussion", "Online Consultation", "30 minutes"],
          note: consultNote,
          cta: requestDetails,
        },
        {
          name: "Startup",
          icon: "star",
          period: "Per appointment",
          description:
            "You can gain a comprehensive understanding of the taxation aspect of your future business by consulting with a Chartered Accountant.",
          price: "Rs.10,000",
          features: ["General guidance", "One to one discussion", "Online Consultation", "30 minutes"],
          note: consultNote,
          cta: requestDetails,
        },
      ],
    },
    {
      id: "agent-individuals",
      title: "Tax Agent Services for Individuals",
      description:
        "Explore flexible tax agent packages designed to simplify tax registration, compliance, payments, and annual tax return filing.",
      plans: [
        {
          ...agentCommon,
          name: "Starter",
          icon: "user",
          price: "Rs.25,000",
          features: [
            "Free Tax Registration",
            "Free Tax Portal",
            "Free advisory service through the Portal",
            "Covers Employment or Investment Income only",
            ...agentTail,
          ],
        },
        {
          ...agentCommon,
          name: "Standard",
          icon: "calendar",
          price: "Rs.30,000",
          popular: true,
          features: [
            "Free Tax Registration",
            "Free Tax Portal",
            "Free advisory service through the Portal",
            "Covers Investment Income & Employment Income",
            ...agentTail,
          ],
        },
        {
          ...agentCommon,
          name: "Premium",
          icon: "box",
          price: "Rs.35,000",
          features: [
            "Free Tax Registration",
            "Free Tax Portal",
            "Free advisory service through the Portal",
            "Covers Investment Income / Employment Income / Business Income (without Financial statements)",
            ...agentTail,
          ],
        },
        {
          ...agentCommon,
          name: "Platinum",
          icon: "star",
          price: "Rs.45,000",
          features: [
            "Free Tax Registration",
            "Free Tax Portal",
            "Free advisory service through the Portal",
            "Covers Investment Income / Employment Income / Business Income (with Financial statements)",
            ...agentTail,
          ],
        },
      ],
    },
  ] satisfies PricingGroup[],
  /** Wide card at the bottom for organizations. */
  organizations: {
    icon: "building",
    title: "Companies/Charitable Institutions/NGOs",
    titleAccent: "& Other organizations",
    description: "Send your Tax Requirement for pricing.",
    cta: { label: "Request a Price", href: "#contact" } satisfies Cta,
    illustration: "/img/priceCard/OtherOrganizations-card-ilus.svg",
  },
};
