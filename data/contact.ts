import { site } from "./site";

export interface ContactField {
  name: "name" | "email" | "phone" | "message";
  label: string;
  placeholder: string;
  type: "text" | "email" | "tel" | "textarea";
  required: boolean;
}

export const contact = {
  id: "contact",
  eyebrow: "GET IN TOUCH",
  title: "Let’s Talk About Your",
  titleAccent: "Tax Needs",
  titleAfter: "Together",
  description:
    "Have a question, need expert advice, or want to know more about our services? Reach out to our team we’re here to help.",
  details: [
    { type: "email", label: site.email, href: `mailto:${site.email}` },
    { type: "phone", label: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
    { type: "address", label: site.address.join(" "), href: "#" },
  ],
  form: {
    title: "Send Us a Message",
    interestLabel: "I’m interested in:",
    interests: ["Tax Consultation", "Tax Agent Services", "Tax Registration", "Tax Compliance", "Other"],
    defaultInterest: "Tax Consultation",
    fields: [
      { name: "name", label: "Your name", placeholder: "Enter your name", type: "text", required: true },
      { name: "email", label: "Your email", placeholder: "Enter your email", type: "email", required: true },
      { name: "phone", label: "Phone number", placeholder: "+94 7X XXX XXXX", type: "tel", required: true },
      {
        name: "message",
        label: "Your message",
        placeholder: "Tell us how we can help you...",
        type: "textarea",
        required: true,
      },
    ] satisfies ContactField[],
    submitLabel: "Send Message",
    successMessage: "Thank you! We’ll get back to you shortly.",
  },
} as const;
