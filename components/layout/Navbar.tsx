"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiArrowRight,
  FiArrowUpRight,
  FiCheckCircle,
  FiChevronDown,
  FiMenu,
  FiPhoneCall,
  FiUser,
  FiX,
} from "react-icons/fi";
import { LuCalendarDays, LuSparkles } from "react-icons/lu";
import { site } from "@/data/site";
import {
  navActions,
  navItems,
  serviceGroups,
  servicesMenuBanner,
  servicesMenuIntro,
  type NavItem,
  type ServiceGroup,
} from "@/data/nav";
import { Container } from "./Container";

/* ------------------------------------------------------------------ */
/* Desktop mega menu                                                   */
/* ------------------------------------------------------------------ */

function GroupBlock({ group }: { group: ServiceGroup }) {
  return (
    <div className="min-w-0">
      <div className="mb-3 flex items-center gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent/15">
          <Image src={group.icon} alt="" width={20} height={20} />
        </span>
        <h3 className="text-[15px] font-bold leading-tight">{group.title}</h3>
      </div>
      <ul>
        {group.links.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              className="group/link flex items-center justify-between gap-2 border-b border-black/10 py-1.5 text-[13px] leading-snug text-black/75 transition-colors hover:text-accent"
            >
              {l.label}
              <FiArrowUpRight className="size-3.5 opacity-40 transition-all group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 group-hover/link:opacity-100" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

const rowCls =
  "grid grid-flow-col auto-cols-fr gap-x-8 [&>*:not(:first-child)]:relative " +
  "[&>*:not(:first-child)]:before:absolute [&>*:not(:first-child)]:before:-left-4 " +
  "[&>*:not(:first-child)]:before:top-0 [&>*:not(:first-child)]:before:bottom-0 " +
  "[&>*:not(:first-child)]:before:w-px [&>*:not(:first-child)]:before:bg-black/10 " +
  "[&>*:not(:first-child)]:before:content-['']";

function MegaMenu({ onNavigate }: { onNavigate: () => void }) {
  const top = serviceGroups.slice(0, 4);
  const bottom = serviceGroups.slice(4);
  return (
    <div
      onClick={(e) => (e.target as HTMLElement).closest("a") && onNavigate()}
      className="grid max-h-[calc(100vh-7rem)] grid-cols-[260px_1fr] gap-5 overflow-y-auto rounded-[28px] border border-white bg-white/95 p-4 shadow-[0_20px_60px_rgb(15_40_80/0.12)] backdrop-blur-xl"
    >
      {/* Left intro panel */}
      <div className="relative flex flex-col overflow-hidden rounded-2xl bg-linear-to-b from-accent/5 to-accent/25 p-6">
        <span className="mb-4 grid size-12 place-items-center rounded-xl bg-accent/15">
          <Image src={servicesMenuIntro.icon} alt="" width={24} height={24} />
        </span>
        <h2 className="text-2xl font-extrabold">{servicesMenuIntro.title}</h2>
        <p className="mt-2 text-sm text-black/60">{servicesMenuIntro.description}</p>
        <ul className="mt-6 space-y-2.5">
          {servicesMenuIntro.highlights.map((h) => (
            <li key={h} className="flex items-center gap-2.5 text-sm font-medium">
              <FiCheckCircle className="size-4 text-accent" />
              {h}
            </li>
          ))}
        </ul>
        <Link
          href={servicesMenuIntro.cta.href}
          className="relative z-10 mt-6 inline-flex w-fit items-center gap-2.5 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white"
        >
          {servicesMenuIntro.cta.label}
          <FiArrowRight />
        </Link>
        <Image
          src={servicesMenuIntro.bottomArt}
          alt=""
          width={320}
          height={120}
          className="pointer-events-none absolute inset-x-0 bottom-0 w-full"
        />
      </div>

      {/* Right: groups + banner */}
      <div className="min-w-0">
        {/* Vertical dividers sit in the middle of the 32px gap (left = -gap/2) */}
        <div className={rowCls}>
          {top.map((g) => (
            <GroupBlock key={g.id} group={g} />
          ))}
        </div>
        <div className="my-4 h-px bg-black/10" />
        <div className={rowCls}>
          {bottom.map((g) => (
            <GroupBlock key={g.id} group={g} />
          ))}
        </div>
        <div className="mt-4 flex items-center gap-3 rounded-xl bg-accent/15 px-5 py-3">
          <LuCalendarDays className="size-6 text-accent" />
          <p className="text-base font-bold">{servicesMenuBanner.title}</p>
          <p className="text-[13px] text-black/60">{servicesMenuBanner.text}</p>
          <Link
            href={servicesMenuBanner.cta.href}
            className="ml-auto inline-flex items-center gap-2.5 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white"
          >
            {servicesMenuBanner.cta.label}
            <FiArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
}

function SmallDropdown({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  return (
    <ul className="min-w-60 rounded-2xl border border-white bg-white/95 p-2 shadow-[0_20px_60px_rgb(15_40_80/0.12)] backdrop-blur-xl">
      {item.children?.map((c) => (
        <li key={c.label}>
          <Link
            href={c.href}
            onClick={onNavigate}
            className="block rounded-xl px-4 py-2.5 text-[15px] transition-colors hover:bg-accent/10 hover:text-accent"
          >
            {c.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/* Mobile menu: main titles only, with sub dropdowns                   */
/* ------------------------------------------------------------------ */

function MobileMenu({ onNavigate }: { onNavigate: () => void }) {
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <nav aria-label="Mobile" className="flex h-full flex-col overflow-y-auto px-5 pb-10 pt-4">
      <ul className="divide-y divide-black/10">
        {navItems.map((item) => {
          const expandable = item.kind === "mega" || item.kind === "dropdown";
          const isOpen = openItem === item.label;
          return (
            <li key={item.label}>
              {expandable ? (
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenItem(isOpen ? null : item.label)}
                  className="flex w-full items-center justify-between py-4 text-lg font-semibold"
                >
                  {item.label}
                  <FiChevronDown
                    className={`size-5 transition-transform duration-300 ${isOpen ? "rotate-180 text-accent" : ""}`}
                  />
                </button>
              ) : (
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className="block py-4 text-lg font-semibold"
                >
                  {item.label}
                </Link>
              )}

              {expandable && (
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden">
                    {item.kind === "mega" ? (
                      <ul className="mb-3 space-y-1 rounded-2xl bg-accent/10 p-2">
                        {/* Mobile: only the main service topics (no sub-links) */}
                        {serviceGroups.map((g) => (
                          <li key={g.id}>
                            <Link
                              href="#services"
                              onClick={onNavigate}
                              className="flex items-center gap-3 rounded-xl px-3 py-3 font-semibold"
                            >
                              <Image src={g.icon} alt="" width={20} height={20} />
                              <span className="flex-1">{g.title}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <ul className="mb-3 space-y-1 rounded-2xl bg-accent/10 p-2">
                        {item.children?.map((c) => (
                          <li key={c.label}>
                            <Link
                              href={c.href}
                              onClick={onNavigate}
                              className="block rounded-xl px-3 py-2.5 text-[15px]"
                            >
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      <div className="mt-8 flex flex-col gap-3">
        <Link
          href={navActions.aiSearch.href}
          onClick={onNavigate}
          className="flex items-center justify-center gap-2 rounded-full border border-black px-6 py-3 font-semibold"
        >
          <LuSparkles className="size-5 text-accent" />
          {navActions.aiSearch.label}
        </Link>
        <Link
          href={navActions.login.href}
          onClick={onNavigate}
          className="flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-white"
        >
          <FiUser className="size-5" />
          {navActions.login.label}
        </Link>
      </div>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/* Navbar                                                              */
/* ------------------------------------------------------------------ */

export function Navbar() {
  const [open, setOpen] = useState<string | null>(null); // desktop dropdown
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);

  // Hide on scroll down, show on scroll up.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      if (y > 120 && y > lastY.current + 4) setHidden(true);
      else if (y < lastY.current - 4 || y <= 120) setHidden(false);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on Escape; lock scroll while the mobile menu is open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeAll = () => {
    setOpen(null);
    setMobileOpen(false);
  };

  return (
    <>
    <header
      onMouseLeave={() => setOpen(null)}
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ${hidden && !mobileOpen ? "-translate-y-full" : "translate-y-0"} bg-white lg:bg-transparent ${scrolled ? "lg:bg-bg/80 lg:backdrop-blur-md" : ""}`}
    >
      <Container className="relative flex h-20 items-center justify-between gap-3 lg:h-24 lg:gap-4">
        <Link href="#home" aria-label={`${site.name} home`} onClick={closeAll}>
          <Image src={site.logo} alt={site.name} width={189} height={34} priority className="h-6 w-auto shrink-0 sm:h-7 lg:h-8" />
        </Link>

        {/* Desktop nav */}
        <nav
          aria-label="Main"
          className="hidden min-w-0 rounded-full border border-black/5 bg-white/60 p-1.5 backdrop-blur-md lg:mx-auto lg:block"
        >
          <ul className="flex items-center">
            {navItems.map((item) => {
              const expandable = item.kind === "mega" || item.kind === "dropdown";
              const isOpen = open === item.label;
              const cls = `flex items-center gap-1.5 rounded-full px-3 py-2.5 text-[15px] font-medium transition-colors xl:px-5 ${isOpen ? "bg-accent/15" : "hover:text-accent"}`;
              return (
                <li
                  key={item.label}
                  className={item.kind === "dropdown" ? "relative" : ""}
                  onMouseEnter={() => setOpen(expandable ? item.label : null)}
                >
                  {expandable ? (
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                      onClick={() => setOpen(isOpen ? null : item.label)}
                      className={cls}
                    >
                      {item.label}
                      <FiChevronDown
                        className={`size-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                  ) : (
                    <Link href={item.href} className={cls}>
                      {item.label}
                    </Link>
                  )}

                  {item.kind === "dropdown" && (
                    <div
                      className={`absolute left-0 top-full pt-3 transition-all duration-300 ${isOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"}`}
                    >
                      <SmallDropdown item={item} onNavigate={closeAll} />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Desktop actions */}
        <div className="hidden shrink-0 items-center gap-2 lg:flex xl:gap-4">
          <Link
            href={navActions.aiSearch.href}
            className="flex items-center gap-2 rounded-full border border-black px-4 py-2.5 text-[15px] font-medium transition-colors hover:border-accent hover:text-accent xl:px-5"
          >
            <LuSparkles className="size-5 text-accent" />
            {navActions.aiSearch.label}
          </Link>
          <Link
            href={navActions.login.href}
            className="flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-[15px] font-semibold text-white transition-transform hover:-translate-y-0.5 xl:px-6"
          >
            <FiUser className="size-5" />
            {navActions.login.label}
          </Link>
        </div>

        {/* Mobile: phone number + burger (as in the mobile design) */}
        <a
          href={`tel:${site.phone.replace(/\s/g, "")}`}
          className="ml-auto mr-3 flex items-center gap-1.5 text-xs font-medium lg:hidden"
        >
          <span className="grid size-7 place-items-center rounded-full bg-[#06526f] text-white">
            <FiPhoneCall className="size-3.5" />
          </span>
          <span className="hidden whitespace-nowrap min-[360px]:inline">{site.phone}</span>
        </a>

        {/* Burger (mobile/tablet) */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="grid size-10 place-items-center rounded-full border border-black/10 bg-white/70 lg:hidden"
        >
          {mobileOpen ? <FiX className="size-6" /> : <FiMenu className="size-6" />}
        </button>

        {/* Services mega menu (desktop) */}
        <div
          className={`absolute inset-x-5 top-full hidden pt-1 transition-all duration-300 md:inset-x-10 lg:inset-x-20 lg:block ${open === "Services" ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"}`}
        >
          <MegaMenu onNavigate={closeAll} />
        </div>
      </Container>
    </header>

    {/* Mobile panel: a sibling of <header> (not inside it) so `fixed` is relative to the screen.
        The header uses transform/backdrop-filter, which would otherwise shrink it to header size. */}
    <div
      className={`fixed inset-x-0 bottom-0 top-20 z-40 bg-white transition-all duration-300 lg:hidden ${mobileOpen ? "visible opacity-100" : "invisible opacity-0"}`}
    >
      <MobileMenu onNavigate={closeAll} />
    </div>
    </>
  );
}
