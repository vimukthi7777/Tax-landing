import Image from "next/image";
import Link from "next/link";
import { FiBell, FiDownload, FiSmartphone, FiStar } from "react-icons/fi";
import { mobileApp } from "@/data/mobileApp";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/animation/Reveal";
import { Float } from "@/components/animation/Float";
import { ScaleInCard } from "@/components/animation/ScaleInCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

const statIcons = { download: FiDownload, star: FiStar, phone: FiSmartphone, bell: FiBell };

export function MobileApp() {
  return (
    <section id={mobileApp.id} className="overflow-x-clip py-10 lg:py-16">
      <Container>
        <ScaleInCard className="relative overflow-hidden rounded-[28px] lg:rounded-[40px]">
          <Image
            src={mobileApp.background}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="relative flex flex-col items-center px-5 pt-12 text-center lg:pt-20">
            <Reveal className="mx-auto max-w-4xl">
              <SectionHeading
                heading={mobileApp.heading}
                className="!text-3xl sm:!text-5xl lg:!text-[64px] lg:!leading-[1.1]"
              />
              <p className="mx-auto mt-4 max-w-2xl text-sm text-black/60 sm:text-lg lg:text-xl">
                {mobileApp.description}
              </p>
            </Reveal>

            <Reveal delay={0.15} className="mt-6 flex items-center justify-center gap-4 lg:mt-8">
              {mobileApp.stores.map((s) => (
                <Link key={s.name} href={s.href} aria-label={`Get it on ${s.name}`} className="transition-transform hover:-translate-y-1">
                  <Image src={s.icon} alt={s.name} width={180} height={53} className="h-9 w-auto sm:h-12 lg:h-14" />
                </Link>
              ))}
            </Reveal>

            <Reveal delay={0.25} stagger={0.1} className="mt-6 grid w-full max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4 lg:mt-10">
              {mobileApp.stats.map((s) => {
                const Icon = statIcons[s.icon];
                return (
                  <div key={s.label} className="flex items-center justify-center gap-3 text-left">
                    <Icon className="size-6 text-accent lg:size-7" />
                    <div>
                      <p className="text-base font-extrabold lg:text-2xl">{s.value}</p>
                      <p className="text-xs text-black/60 lg:text-base">{s.label}</p>
                    </div>
                  </div>
                );
              })}
            </Reveal>

            {/* Phones are cropped at the bottom (as in the design); floating cards overlap. */}
            <div className="relative mt-8 w-full max-w-5xl lg:mt-10">
              <div className="aspect-[1982/760] overflow-hidden">
                <Image
                  src={mobileApp.mockup.src}
                  alt={mobileApp.mockup.alt}
                  width={1982}
                  height={1014}
                  sizes="(min-width:1024px) 1000px, 100vw"
                  className="w-full"
                />
              </div>
              {mobileApp.floatingCards.map((c, i) => (
                <Float
                  key={c.label}
                  distance={12}
                  duration={2.8}
                  delay={i * 0.7}
                  className={`absolute top-[32%] w-[22%] ${c.position === "left" ? "left-[-4%] -rotate-[8deg]" : "right-[-4%] rotate-[8deg]"}`}
                >
                  <Image src={c.image} alt={`${c.value} ${c.label}`} width={184} height={69} className="w-full drop-shadow-lg" />
                </Float>
              ))}
            </div>
          </div>
        </ScaleInCard>
      </Container>
    </section>
  );
}
