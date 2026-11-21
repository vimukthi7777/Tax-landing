"use client";

import { useRef } from "react";
import Image from "next/image";
import { FiCheckCircle } from "react-icons/fi";
import { hero } from "@/data/hero";
import { heroSocialPlatforms, socialLinks } from "@/data/site";
import { gsap, MOTION_OK, onLoaderDone, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { SocialIcon } from "@/components/ui/SocialIcon";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // Entrance
        const intro = gsap
          .timeline({ defaults: { ease: "power3.out" }, paused: true })
          .from("[data-hero='text'] > *", { opacity: 0, y: 40, duration: 0.9, stagger: 0.12 })
          .from("[data-hero='image']", { opacity: 0, scale: 0.92, y: 30, duration: 1.2 }, 0.2)
          .from("[data-hero='image-mobile']", { opacity: 0, y: 30, duration: 1 }, 0.5)
          .from("[data-hero='glow']", { opacity: 0, scale: 0.7, duration: 1.6 }, 0)
          .from("[data-hero='footer'] > *", { opacity: 0, y: 20, duration: 0.8, stagger: 0.1 }, 0.8);
        // play the intro as the page loader lifts away (immediately if there is no loader)
        onLoaderDone(() => intro.play());

        // Gentle floating + glow breathing
        gsap.to("[data-hero='float']", {
          y: -14,
          duration: 3,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
        gsap.to("[data-hero='glow']", {
          scale: 1.08,
          opacity: 0.85,
          duration: 3.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id={hero.id} className="relative overflow-hidden pb-14 pt-28 lg:pb-28 lg:pt-44">
      <Container className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-5">
          {/* Text */}
          <div data-hero="text" className="relative z-10 lg:col-span-7">
            {/* Title scales with viewport on mobile (≈40px at 390). Accent line is 87% of it, never wraps. */}
            <h1 className="text-[10.3vw] font-extrabold leading-[1.15] tracking-tight md:text-6xl lg:text-[72px]">
              {hero.title}
              <span className="block whitespace-nowrap text-[0.87em] text-accent">{hero.titleAccent}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-black/70 lg:text-2xl">
              {hero.description}
            </p>
            {/* Mobile: 4-col grid, 2 cols each, 16px gutter. Desktop: inline. */}
            <div className="mt-8 grid grid-cols-2 gap-4 lg:mt-10 lg:flex lg:flex-wrap">
              <Button href={hero.primaryCta.href} variant="dark">
                {hero.primaryCta.label}
              </Button>
              <Button href={hero.secondaryCta.href} variant="light">
                {hero.secondaryCta.label}
              </Button>
            </div>
          </div>

          {/* Mobile image */}
          <div data-hero="image-mobile" className="relative lg:hidden">
            <div
              data-hero="glow"
              aria-hidden
              className="pointer-events-none absolute left-[90%] top-[6%] aspect-square w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(54_189_223/0.6)_0%,rgb(54_189_223/0.25)_40%,transparent_70%)] opacity-80 blur-3xl"
            />
            <Image
              src={hero.mobileImage.src}
              alt={hero.mobileImage.alt}
              width={hero.mobileImage.width}
              height={hero.mobileImage.height}
              priority
              className="relative w-full rounded-3xl shadow-[0_10px_30px_rgb(15_40_80/0.15)]"
            />
          </div>

          {/* Desktop image: NewHeroImg.svg only (it includes its own glow) */}
          <div className="relative hidden aspect-[613/384] lg:col-span-5 lg:block">
            <div data-hero="image" className="absolute inset-0">
              {/* centring (CSS translate) and the GSAP float live on different elements so they don't fight */}
              <div className="absolute left-1/2 top-1/2 w-[190%] -translate-x-1/2 -translate-y-1/2">
                <div data-hero="float">
                  <Image
                    src={hero.image.src}
                    alt={hero.image.alt}
                    width={1102}
                    height={1008}
                    priority
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer row */}
        <div
          data-hero="footer"
          className="relative z-10 mt-16 hidden lg:mt-24 lg:flex lg:flex-row lg:items-center lg:justify-between"
        >
          <div className="flex items-center gap-5">
            <span className="text-lg text-black/70 lg:text-xl">{hero.followLabel}</span>
            <span className="h-8 w-px bg-black/15" />
            <ul className="flex items-center gap-4">
              {heroSocialPlatforms.map((p) => {
                const link = socialLinks.find((s) => s.platform === p)!;
                return (
                  <li key={p}>
                    <a
                      href={link.href}
                      aria-label={link.label}
                      className="text-accent transition-transform duration-300 hover:-translate-y-1"
                    >
                      <SocialIcon platform={p} className="size-6 lg:size-7" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 text-black/60">
            {hero.badges.map((b, i) => (
              <li key={b} className="flex items-center gap-6">
                <span className="flex items-center gap-2.5">
                  <FiCheckCircle className="size-5 text-accent" />
                  {b}
                </span>
                {i < hero.badges.length - 1 && <span className="hidden h-6 w-px bg-black/15 sm:block" />}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
