import Image from "next/image";
import Link from "next/link";
import { clients, partners } from "@/data/clientsPartners";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/animation/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Testimonials } from "./Testimonials";

export function ClientsPartners() {
  return (
    <section id={clients.id} className="py-16 lg:py-28">
      <Container>
        <Reveal className="text-center">
          <SectionHeading heading={clients.heading} />
          <p className="mt-3 text-base text-black/50 lg:text-xl">{clients.description}</p>
        </Reveal>
        <Reveal className="mt-10 lg:mt-14">
          <Testimonials />
        </Reveal>

        <Reveal id={partners.id} className="mt-20 text-center lg:mt-32">
          <SectionHeading heading={partners.heading} />
          <p className="mt-3 text-base text-black/50 lg:text-xl">{partners.description}</p>
        </Reveal>

        <Reveal stagger={0.1} className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 lg:mt-14 lg:gap-5">
          {partners.items.map((p) => (
            <Link
              key={p.name}
              href={p.href}
              className="group relative flex flex-col rounded-[20px] border border-black/5 bg-white/70 px-3 pb-5 pt-8 sm:px-6 sm:pb-8 sm:pt-12 md:rounded-[28px] md:px-4 md:pb-6 md:pt-10 lg:px-6 lg:pb-8 lg:pt-12 transition-[transform,box-shadow,background-color] duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_14px_40px_rgb(15_40_80/0.12)]"
            >
              <span className="absolute left-1/2 top-0 h-1.5 w-1/3 -translate-x-1/2 rounded-b-full bg-accent" />
              <div className="flex h-12 items-center justify-center sm:h-20 md:h-14 lg:h-20">
                <Image src={p.logo} alt={p.name} width={240} height={70} className="max-h-9 w-auto max-w-full object-contain sm:max-h-16 md:max-h-11 lg:max-h-16" />
              </div>
              <h3 className="mt-4 min-h-[2.5rem] text-center text-[13px] font-bold leading-tight sm:mt-8 sm:min-h-[3.25rem] sm:text-lg md:mt-5 md:text-[15px] lg:mt-8 lg:text-lg">{p.role}</h3>
              <p className="mt-2 flex-1 text-[10.5px] leading-snug text-black/60 sm:mt-4 sm:text-sm sm:leading-relaxed md:text-[12px] lg:text-sm">{p.description}</p>
              <div className="mt-4 h-px bg-black/10 sm:mt-6" />
            </Link>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
