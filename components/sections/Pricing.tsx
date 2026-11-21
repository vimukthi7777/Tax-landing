import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { LuBuilding2 } from "react-icons/lu";
import { pricing } from "@/data/pricing";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/animation/Reveal";
import { WaveBackground } from "@/components/animation/WaveBackground";
import { PlanCarousel } from "./PlanCarousel";

export function Pricing() {
  const org = pricing.organizations;
  return (
    <section id={pricing.id} className="relative overflow-hidden py-16 lg:py-28">
      {/* Transparent animated waves + glowing dust, behind everything */}
      <WaveBackground className="absolute inset-0 z-0 size-full" />
      <Container className="relative">
        <Reveal className="mx-auto max-w-4xl text-center">
          <h2 className="text-[18px] font-extrabold leading-[1.2] tracking-tight sm:text-4xl lg:text-5xl">
            {pricing.heading.before}
            <br />
            <span className="text-accent">{pricing.heading.accent}</span>
          </h2>
          <p className="mt-2 text-[10px] text-black/50 sm:text-sm lg:mt-4 lg:text-lg">{pricing.description}</p>
        </Reveal>

        {pricing.groups.map((g, gi) => (
          <div key={g.id} className="relative z-10 mt-10 md:mt-14 lg:mt-20">
            <Reveal>
              <h3 className="text-base font-extrabold sm:text-2xl lg:text-4xl">{g.title}</h3>
              <p className="mt-1 text-[9px] leading-snug text-black/50 sm:mt-2 sm:text-sm lg:text-lg">{g.description}</p>
            </Reveal>
            <div className="relative mt-4 md:mt-10">
              {/* Ribbon sits behind the first row of cards and flows down behind the next row */}
              {gi === 0 && (
                <Image
                  src={pricing.ribbon}
                  alt=""
                  aria-hidden
                  width={1440}
                  height={1067}
                  className="pointer-events-none absolute left-1/2 top-24 z-0 w-[260%] max-w-none -translate-x-1/2 md:w-[100vw] lg:hidden"
                />
              )}
              <Reveal className="relative z-10">
                <PlanCarousel plans={g.plans} />
              </Reveal>
            </div>
          </div>
        ))}

        {/* Organizations: one composition at every size (Figma 1280 × 378 / mobile 350 × 104).
            Everything scales with the card width via container-query units (cqw),
            with small floors so phone text stays readable. */}
        <Reveal className="@container relative z-10 mt-10 overflow-hidden rounded-[clamp(20px,3.1cqw,40px)] bg-[linear-gradient(112deg,#fbfdff_0%,#f7fbff_36%,#dcf0fb_52%,#d6ecfa_72%,#e4f3fc_100%)] shadow-[0_12px_40px_rgb(15_40_80/0.08)] sm:mt-14 lg:mt-20">
          <div className="relative z-10 flex flex-col p-[clamp(18px,5.2cqw,66px)]">
            <div className="flex items-center gap-[clamp(7px,2.2cqw,28px)]">
              <span className="grid size-[clamp(22px,6.1cqw,78px)] shrink-0 place-items-center rounded-[clamp(7px,1.6cqw,20px)] bg-[#cdeefb] text-accent">
                <LuBuilding2 className="size-[clamp(13px,3.1cqw,40px)]" />
              </span>
              <h3 className="whitespace-nowrap text-[clamp(9.5px,2.8cqw,36px)] font-extrabold leading-[1.22]">
                {org.title.split(" ")[0]}
                <br />
                {org.title.split(" ").slice(1).join(" ")} <span className="text-[#0ba5ec]">{org.titleAccent}</span>
              </h3>
            </div>
            <p className="mt-[clamp(10px,2.2cqw,28px)] text-[clamp(8.5px,1.72cqw,22px)] text-black/55">
              {org.description}
            </p>
            <Link
              href={org.cta.href}
              className="group/btn mt-[clamp(12px,2.8cqw,36px)] inline-flex h-[clamp(24px,5.3cqw,68px)] w-fit min-w-[clamp(100px,25.4cqw,325px)] items-center justify-between gap-2 whitespace-nowrap rounded-full bg-[#100d0d] pl-[clamp(12px,4cqw,51px)] pr-[clamp(3px,2.1cqw,27px)] text-[clamp(9px,1.72cqw,22px)] font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
            >
              {org.cta.label}
              <span className="grid size-[clamp(18px,3.1cqw,40px)] place-items-center rounded-full bg-white text-black">
                <FiArrowUpRight className="size-[60%] transition-transform duration-300 group-hover/btn:rotate-45" />
              </span>
            </Link>
          </div>
          <Image
            src={org.illustration}
            alt=""
            width={529}
            height={353}
            className="pointer-events-none absolute bottom-0 right-0 z-0 w-[34%] sm:w-[41%]"
          />
        </Reveal>
      </Container>
    </section>
  );
}
