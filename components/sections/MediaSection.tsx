import Image from "next/image";
import Link from "next/link";
import { agentVideo, mockupFloat, podcast } from "@/data/media";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/animation/Reveal";
import { Float } from "@/components/animation/Float";
import { Button } from "@/components/ui/Button";
import { YouTubeAutoplay } from "@/components/ui/YouTubeAutoplay";

/**
 * 2×2 of flush panels inside the standard page container (same side padding as the other sections).
 *   [ Appoint your tax agent ][ autoplay video ]
 *   [ YouTube podcast        ][ Spotify podcast ]
 * Panel text sizes scale with the viewport (vw clamps).
 */
const PANEL = "lg:aspect-[994/932] lg:min-h-[460px]";
const PAD_LEFT = "px-5 md:px-10 lg:pl-16 lg:pr-8";
const PAD_RIGHT = PAD_LEFT;

export function MediaSection() {
  return (
    <section id={agentVideo.id} className="py-8 lg:py-12">
      <Container>
      <div className="flex flex-col gap-6 lg:gap-10">
        {/* Row 1: agent + video */}
        <div className="grid overflow-hidden rounded-[24px] shadow-[0_12px_40px_rgb(15_40_80/0.14)] lg:grid-cols-2 lg:rounded-[32px]">
          <div className={`order-2 flex items-center bg-white py-12 lg:order-1 ${PANEL} ${PAD_LEFT}`}>
            <Reveal className="max-w-[40rem]">
              <h2 className="text-[28px] font-extrabold leading-[1.15] tracking-tight sm:text-4xl lg:text-[clamp(30px,3.2vw,46px)]">
                {agentVideo.title} <span className="text-accent">{agentVideo.titleAccent}</span>
              </h2>
              <p className="mt-4 max-w-[34rem] text-[15px] leading-relaxed text-black/60 lg:mt-6 lg:text-[clamp(14px,1.05vw,15px)] lg:leading-[1.6]">
                {agentVideo.description}
              </p>
              <div className="mt-7 lg:mt-10">
                <Button href={agentVideo.cta.href} variant="dark">
                  {agentVideo.cta.label}
                </Button>
              </div>
            </Reveal>
          </div>

          <div className={`relative order-1 lg:order-2 ${PANEL}`}>
            <YouTubeAutoplay
              videoId={agentVideo.youtubeId}
              title="Appoint your tax agent from anywhere in Sri Lanka"
            />
            {/* soft blend between the white panel and the left edge of the video */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-14 bg-linear-to-t from-white to-transparent lg:inset-y-0 lg:bottom-auto lg:right-auto lg:h-auto lg:w-[12%] lg:bg-linear-to-r"
            />
          </div>
        </div>

        {/* Row 2: podcast panels */}
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
          {podcast.map((p, i) => {
            const isYt = p.platform === "youtube";
            return (
              <article
                key={p.id}
                id={p.id}
                className={`relative isolate flex min-h-[500px] flex-col overflow-hidden rounded-[24px] shadow-[0_12px_40px_rgb(15_40_80/0.14)] lg:rounded-[32px] ${PANEL} ${i === 0 ? PAD_LEFT : PAD_RIGHT} ${isYt ? "bg-[#f1f5fc]" : "bg-[#f6f7fb]"}`}
              >
                <Reveal className="relative z-10 pt-10 lg:pt-[clamp(48px,9.4vw,136px)]">
                  <h2 className="text-[28px] font-extrabold leading-[1.15] tracking-tight text-[#0b1b3a] sm:text-4xl lg:text-[clamp(28px,2.96vw,43px)]">
                    {p.title}
                    <br />
                    <span className="text-accent">{p.titleAccent}</span> {p.titleAfter}
                  </h2>
                  <p className="mt-3 max-w-[30rem] text-[14px] leading-relaxed text-black/55 lg:mt-4 lg:text-[clamp(13px,1vw,15px)] lg:leading-[1.55]">
                    {p.description}
                  </p>
                  <Link
                    href={p.cta.href}
                    className={`mt-5 inline-flex h-12 items-center gap-3 rounded-2xl px-6 text-base font-semibold text-white transition-transform hover:-translate-y-0.5 lg:mt-7 lg:h-[clamp(46px,4.1vw,58px)] lg:gap-4 lg:px-[clamp(18px,2.3vw,34px)] lg:text-[clamp(15px,1.35vw,20px)] ${isYt ? "bg-[#e50914]" : "bg-[#17a34a]"}`}
                  >
                    <Image src={p.icon} alt="" width={26} height={20} className="h-5 w-auto brightness-0 invert lg:h-[clamp(18px,1.9vw,27px)]" />
                    {p.cta.label}
                  </Link>
                </Reveal>

                {/* Wavy background + floating phone (46.5% of the panel, centred at 55%) */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 aspect-[3/2]">
                  <Image
                    src={p.mockupBg}
                    alt=""
                    fill
                    sizes="(min-width:1024px) 50vw, 100vw"
                    className="object-cover object-bottom"
                  />
                </div>
                <Float
                  distance={mockupFloat.distance}
                  duration={mockupFloat.duration}
                  delay={i * mockupFloat.stagger}
                  className="absolute bottom-0 left-[55%] w-[72%] max-w-[360px] -translate-x-1/2 translate-y-[20%] lg:w-[46.5%] lg:max-w-none lg:translate-y-[9%]"
                >
                  <Image
                    src={p.mockup}
                    alt={`${p.titleAccent} Podcast on ${isYt ? "YouTube" : "Spotify"}`}
                    width={410}
                    height={289}
                    className="w-full"
                  />
                </Float>
              </article>
            );
          })}
        </div>
      </div>
      </Container>
    </section>
  );
}
