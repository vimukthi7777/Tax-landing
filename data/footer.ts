import type { NavLink } from "./types";
import { site } from "./site";

export const footer = {
  logo: site.logoWhite,
  description: "Your trusted partner for tax advisory, compliance and professional tax education in Sri Lanka.",
  contacts: [
    { type: "phone", label: site.footerPhone, href: `tel:${site.footerPhone.replace(/\s/g, "")}` },
    { type: "email", label: site.email, href: `mailto:${site.email}` },
    { type: "address", label: site.address.join(" "), href: "#" },
  ] as const,
  columns: [
    {
      title: "Pages",
      links: [
        { label: "Home", href: "#home" },
        { label: "About Us", href: "#about" },
        { label: "Articles", href: "#news" },
        { label: "Contact", href: "#contact" },
      ] satisfies NavLink[],
    },
    {
      title: "Our Services",
      links: [
        { label: "Tax Advisory", href: "#" },
        { label: "Tax Agent Services", href: "#" },
        { label: "Tax Academy", href: "#" },
        { label: "Tax Calculator", href: "#" },
        { label: "Tax Updates", href: "#news" },
      ] satisfies NavLink[],
    },
  ],
  copyright: `© ${site.domain}`,
};
