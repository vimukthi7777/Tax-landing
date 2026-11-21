import type { Cta, Heading } from "./types";

export interface NewsItem {
  category: "TAX UPDATE" | "TAX News";
  /** ISO date, formatted for display in the component. */
  date: string;
  dateLabel: string;
  title: string;
  image: string;
  href: string;
}

export const news = {
  id: "news",
  heading: { before: "Latest Tax", accent: "Updates & News" } satisfies Heading,
  description: "Stay informed with the latest tax changes, announcements and expert insights.",
  viewAll: { label: "View All Updates", href: "#" } satisfies Cta,
  items: [
    {
      category: "TAX UPDATE",
      date: "2026-11-12",
      dateLabel: "Nov 12,2026",
      title: "Calculate Your 2027 Tax and Savings",
      image: "/img/news/newsCardImg1.png",
      href: "#",
    },
    {
      category: "TAX News",
      date: "2026-11-12",
      dateLabel: "Nov 12,2026",
      title: "Tax Proposals of 2027 Budget",
      image: "/img/news/newsCardImg2.png",
      href: "#",
    },
    {
      category: "TAX UPDATE",
      date: "2026-11-12",
      dateLabel: "Nov 12,2026",
      title: "Mandatory TIN Certificate Requirement Postponed to April 2027",
      image: "/img/news/newsCardImg3.png",
      href: "#",
    },
    {
      category: "TAX News",
      date: "2026-11-12",
      dateLabel: "Nov 12,2026",
      title: "Tax Residency Certificate (TRC)",
      image: "/img/news/newsCardImg4.png",
      href: "#",
    },
  ] satisfies NewsItem[],
};
