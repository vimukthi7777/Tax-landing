import Image from "next/image";
import { about, aboutStats } from "@/data/about";
import { heroSocialPlatforms, socialLinks } from "@/data/site";
import { Container } from "@/components/layout/Container";
import { ScrollTextFill } from "@/components/animation/ScrollTextFill";
import { CountUp } from "@/components/animation/CountUp";
import { Reveal } from "@/components/animation/Reveal";
import { SocialIcon } from "@/components/ui/SocialIcon";

export function About() {
  return (
    <section id={about.id} className="bg-white py-16 lg:py-28">
      <Container>
        <ScrollTextFill
          text={about.text}
          accentWords={about.accentWords}
          boldWords={about.boldWords}
          className="mx-auto max-w-5xl text-center text-xl font-medium leading-snug sm:text-2xl lg:text-[34px]"
        />

        <Reveal
          stagger={0.15}
          className="mx-auto mt-12 grid max-w-5xl grid-cols-3 divide-x divide-black/10 lg:mt-20"
        >
          {aboutStats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center justify-center gap-2 px-2 sm:flex-row sm:gap-5 lg:px-8"
            >
              <Image src={s.icon} alt="" width={40} height={40} className="h-8 w-auto lg:h-11" />
              <div className="text-center sm:text-left">
                <p className="text-xl font-extrabold sm:text-3xl lg:text-[40px] lg:leading-none">
                  <CountUp value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-[11px] text-black/80 sm:text-sm lg:text-lg">{s.label}</p>
              </div>
            </div>
          ))}
        </Reveal>

        {/* Mobile design: social icons sit below the stats */}
        <ul className="mt-10 flex items-center justify-between px-4 lg:hidden">
          {heroSocialPlatforms.map((p) => {
            const link = socialLinks.find((s) => s.platform === p)!;
            return (
              <li key={p}>
                <a href={link.href} aria-label={link.label} className="text-accent">
                  <SocialIcon platform={p} className="size-8" />
                </a>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
