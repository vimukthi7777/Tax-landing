import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { digitalServices } from "@/data/digitalServices";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/animation/Reveal";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Cards follow the Figma spec: 305 × 380 at 1440 (4 cards + 3×20px gutters = 1280).
 * Width comes from the 12-col grid; height is min 380 on desktop.
 */
export function DigitalServices() {
  return (
    <section id={digitalServices.id} className="py-14 lg:py-24">
      <Container>
        <Reveal className="flex items-start justify-between gap-3">
          <div>
            <SectionHeading heading={digitalServices.heading} className="!text-xl sm:!text-3xl lg:!text-[40px]" />
            <p className="mt-1.5 text-[11px] text-black/60 sm:mt-3 sm:text-base lg:text-xl">{digitalServices.description}</p>
          </div>
          <Button
            href={digitalServices.viewAll.href}
            variant="outline"
            className="mt-0.5 w-fit shrink-0 !gap-1 !rounded-full !py-1.5 !pl-3 !pr-1.5 !text-[10px] sm:!gap-6 sm:!py-2.5 sm:!pl-6 sm:!pr-3 sm:!text-base lg:!text-[17px] [&>span:last-child]:!size-4 sm:[&>span:last-child]:!size-9 [&_svg]:!size-3 sm:[&_svg]:!size-5"
          >
            {digitalServices.viewAll.label}
          </Button>
        </Reveal>

        <Reveal className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 md:grid-cols-4 lg:gap-5">
          {digitalServices.cards.map((c) => {
            const featured = "featured" in c && c.featured;
            return (
              <article
                key={c.title}
                className={`relative flex min-h-[240px] flex-col sm:min-h-[340px] md:min-h-[360px] overflow-hidden rounded-[22px] px-4 pb-5 pt-5 sm:rounded-[28px] sm:px-[27px] sm:pb-9 sm:pt-8 md:rounded-3xl md:pb-6 md:pt-6 lg:rounded-[28px] lg:pb-9 lg:pt-8 shadow-[0_10px_40px_rgb(15_40_80/0.10)] transition-transform duration-300 hover:-translate-y-1 lg:min-h-[380px] ${
                  featured ? "bg-[#019dcc] text-white" : "bg-white text-[#0b1b3a]"
                }`}
              >
                {"art" in c && c.art && (
                  <Image
                    src={c.art}
                    alt=""
                    width={203}
                    height={141}
                    className="pointer-events-none absolute bottom-0 right-0 w-[67%]"
                  />
                )}
                <Image src={c.icon} alt="" width={53} height={53} className="size-9 shrink-0 sm:size-[53px] md:size-11 lg:size-[53px]" />
                <h3 className="mt-3 text-lg font-extrabold leading-[1.15] sm:mt-5 sm:text-2xl md:text-[clamp(15px,2.2vw,32px)]">
                  {c.title}
                </h3>
                <p
                  className={`mt-2 text-[11px] leading-4 sm:mt-3 sm:text-base sm:leading-6 md:text-[13px] md:leading-5 lg:mt-4 lg:text-base lg:leading-6 ${featured ? "text-white" : "text-[#475569]"}`}
                >
                  {c.description}
                </p>
                <div className="mt-auto pt-4 sm:pt-6">
                <Link
                  href={c.cta.href}
                  className={`group/btn relative z-10 flex h-8 w-fit items-center gap-2 rounded-full pl-3 pr-1.5 text-[11px] font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:h-[46px] sm:gap-3 sm:pl-5 sm:pr-3 sm:text-base md:h-10 md:gap-2 md:pl-3.5 md:pr-2 md:text-[13px] lg:h-[46px] lg:gap-4 lg:pl-5 lg:pr-3 lg:text-base ${
                    featured
                      ? "bg-white text-black hover:bg-black hover:text-white"
                      : "bg-accent/20 text-[#0a7fa3] hover:bg-accent hover:text-white"
                  }`}
                >
                  {c.cta.label}
                  <span
                    className={`grid size-5 place-items-center rounded-full transition-all duration-300 group-hover/btn:scale-110 sm:size-6 ${
                      featured
                        ? "bg-black text-white group-hover/btn:bg-white group-hover/btn:text-black"
                        : "bg-white text-[#0a7fa3] group-hover/btn:text-accent"
                    }`}
                  >
                    <FiArrowUpRight className="size-3.5 transition-transform duration-300 group-hover/btn:rotate-45" />
                  </span>
                </Link>
                </div>
              </article>
            );
          })}
        </Reveal>
      </Container>
    </section>
  );
}
