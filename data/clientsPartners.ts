import type { Heading } from "./types";

export interface Testimonial {
  name: string;
  role: string;
  location: string;
  quote: string;
  photo: string;
}

export const clients = {
  id: "clients",
  heading: { before: "What Our", accent: "Clients Say" } satisfies Heading,
  description: "Trusted by professionals and businesses across Sri Lanka.",

  testimonials: [
    {
      name: "Peter Fleming",
      role: "CFO, Deskera",
      location: "Singapore",
      quote:
        "In late 2018, I engaged the services of Mr Viraj of Taxadvisor.lk to help us register VAT for our company Deskera (www.deskera.com) and despite a tight deadline and some complications, we were able to succeed. I would therefore be pleased to recommend these services.",
      photo: "/img/clients/client1.jpg",
    },
    {
      name: "Prof. A. Chamaru De Alwis",
      role: "Professor in Management, Department of Human Resource Management",
      location: "University of Kelaniya, Sri Lanka",
      quote:
        "First of all appreciate your great excellent work. Actually, this is the first time we are experiencing such a valuable updated, speed, accurate, user friendly and professional service in Sri Lanka. Best wishes for more unique ideas",
      photo: "/img/clients/client2.jpg",
    },
    {
      name: "Thushara Amarasinghe",
      role: "Chief Financial Officer",
      location: "Continental Insurance Lanka Ltd",
      quote:
        "I strongly believe that this service is an innovative thing which will give great help to tax paying community as well as tax practitioners to keep their knowledge updated and ensuring tax compliance on time.",
      photo: "/img/clients/client4.jpg",
    },
    {
      name: "Ruwan Wanniarachchi",
      role: "Head of Finance",
      location: "Siyapatha Finance PLC",
      quote:
        "We highly appreciate your SMS service. The excellent solution offered by you has taken a huge load off our shoulders. If possible, please send a reminder before 4 working days regarding the deadline of the relevant payment/report. Then it will be very useful to the persons who are dealing with those.",
      photo: "/img/clients/client3.jpg",
    },
  ] satisfies Testimonial[],
};

export interface Partner {
  name: string;
  role: string;
  description: string;
  logo: string;
  href: string;
}

export const partners = {
  id: "partners",
  heading: { before: "Our Strategic", accent: "Partners" } satisfies Heading,
  description: "Trusted expertise across valuation, business advisory, audit and taxation.",
  items: [
    {
      name: "IJVR",
      role: "Valuation Partner",
      description:
        "IJVR, over the years has evolved to become the most sought after and trusted Real Estate valuation and consultancy firms in Sri Lanka.",
      logo: "/img/partners/Partner1.svg",
      href: "#",
    },
    {
      name: "Business Advisor",
      role: "Business Partner",
      description:
        "Our main intention is to provide online business advisory services to businessmen and potential businessmen of Sri Lanka at every stage of their businesses.",
      logo: "/img/partners/Partner2.svg",
      href: "#",
    },
    {
      name: "IBT Consultants",
      role: "Audit & Assurance Service Partner",
      description:
        "IBT Consultants is a leading firm of Chartered Accountants in Sri Lanka united by a commitment to provide exceptional client service.",
      logo: "/img/partners/Partner3.svg",
      href: "#",
    },
    {
      name: "Dasanayaka Associates",
      role: "Corporate Tax Partner",
      description:
        "Dasanayaka Associates (DA) provides expert corporate tax advisory, compliance and planning solutions for businesses in Sri Lanka.",
      logo: "/img/partners/Partner4.svg",
      href: "#",
    },
  ] satisfies Partner[],
};
