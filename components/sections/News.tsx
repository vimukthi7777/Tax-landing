import Image from "next/image";
import Link from "next/link";
import { news } from "@/data/news";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/animation/Reveal";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function News() {
  return (
    <section id={news.id} className="py-16 lg:py-24">
      <Container>
        <Reveal className="flex items-start justify-between gap-3">
          <div>
            <SectionHeading heading={news.heading} className="!text-xl sm:!text-3xl lg:!text-5xl" />
            <p className="mt-1.5 text-[10px] text-black/60 sm:mt-3 sm:text-base lg:text-xl">{news.description}</p>
          </div>
          <Button
            href={news.viewAll.href}
            variant="outline"
            className="mt-0.5 w-fit shrink-0 !gap-1 !rounded-full !py-1.5 !pl-3 !pr-1.5 !text-[10px] sm:!gap-6 sm:!py-2.5 sm:!pl-6 sm:!pr-3 sm:!text-base [&>span:last-child]:!size-4 sm:[&>span:last-child]:!size-9 [&_svg]:!size-3 sm:[&_svg]:!size-5"
          >
            {news.viewAll.label}
          </Button>
        </Reveal>

        <Reveal
          stagger={0.1}
          className="relative mt-10 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:mt-14 lg:gap-x-16 lg:gap-y-14 sm:[&>*:nth-child(odd)]:relative"
        >
          {/* center divider (desktop) */}
          {news.items.map((n, i) => (
            <Link key={n.title} href={n.href} className={`group ${i >= 2 ? "hidden sm:block" : "block"}`}>
              <div className="overflow-hidden rounded-3xl">
                <Image
                  src={n.image}
                  alt=""
                  width={1230}
                  height={634}
                  sizes="(min-width:640px) 50vw, 100vw"
                  className="aspect-[1230/634] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <p className="mt-4 flex items-center gap-3 text-sm text-black/60">
                <span>{n.category}</span>
                <span className="size-1 rounded-full bg-black/60" />
                <time dateTime={n.date}>{n.dateLabel}</time>
              </p>
              <h3 className="mt-2 text-xl font-bold leading-snug text-[#0b1b3a] transition-colors group-hover:text-accent lg:text-[28px]">
                {n.title}
              </h3>
            </Link>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
