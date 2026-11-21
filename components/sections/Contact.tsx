"use client";

import { useState, type FormEvent } from "react";
import { FiCheck, FiMail, FiMapPin, FiPhoneCall, FiSend } from "react-icons/fi";
import { contact } from "@/data/contact";
import { contactSocialPlatforms, socialLinks } from "@/data/site";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/animation/Reveal";
import { SocialIcon } from "@/components/ui/SocialIcon";

const detailIcons = { email: FiMail, phone: FiPhoneCall, address: FiMapPin };

type Errors = Partial<Record<"name" | "email" | "phone" | "message", string>>;

function validate(data: FormData): Errors {
  const e: Errors = {};
  const v = (k: string) => String(data.get(k) ?? "").trim();
  if (!v("name")) e.name = "Please enter your name";
  if (!/^\S+@\S+\.\S+$/.test(v("email"))) e.email = "Please enter a valid email";
  if (!/^[+\d][\d\s-]{6,}$/.test(v("phone"))) e.phone = "Please enter a valid phone number";
  if (!v("message")) e.message = "Please tell us how we can help";
  return e;
}

export function Contact() {
  const f = contact.form;
  const [interest, setInterest] = useState<string>(f.defaultInterest);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const onSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const form = ev.currentTarget;
    const errs = validate(new FormData(form));
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      // UI only for now: no backend. Hook a route handler here later.
      setSent(true);
      form.reset();
      setInterest(f.defaultInterest);
    } else {
      setSent(false);
    }
  };

  const input =
    "w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-[11px] outline-none transition-colors placeholder:text-black/35 focus:border-accent sm:rounded-xl sm:px-4 sm:py-3 sm:text-[15px]";
  const label = "mb-1.5 block text-[11px] font-bold sm:mb-2 sm:text-sm";

  return (
    <section id={contact.id} className="py-10 lg:py-16">
      <Container>
        {/* Mobile order: heading → form → contact details. Desktop: 2 columns. */}
        <div className="grid gap-6 rounded-[24px] bg-[#023a52] p-5 text-white sm:gap-8 sm:p-10 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-0 lg:rounded-[40px] lg:p-16">
          {/* heading */}
          <Reveal className="text-center lg:col-start-1 lg:row-start-1 lg:self-end lg:text-left">
            <p className="hidden text-lg tracking-wide text-accent lg:block">{contact.eyebrow}</p>
            <h2 className="text-xl font-extrabold leading-[1.2] tracking-tight sm:text-4xl lg:mt-3 lg:text-[56px] lg:leading-[1.1]">
              {contact.title} <span className="text-[#16e0f0]">{contact.titleAccent}</span> {contact.titleAfter}
            </h2>
            <p className="mx-auto mt-2 max-w-[17rem] text-[9px] leading-snug text-white/85 sm:mt-5 sm:max-w-xl sm:text-base lg:mx-0 lg:text-xl lg:leading-relaxed">
              {contact.description}
            </p>
          </Reveal>

          {/* form */}
          <Reveal delay={0.15} className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <form
              onSubmit={onSubmit}
              noValidate
              className="rounded-[22px] bg-white p-5 text-[#023a52] sm:rounded-[28px] sm:p-8 lg:p-10"
            >
              <h3 className="text-xl font-extrabold sm:text-2xl lg:text-[34px]">{f.title}</h3>
              <p className="mt-4 text-[11px] font-bold sm:mt-5 sm:text-base">{f.interestLabel}</p>
              <div className="mt-2.5 flex flex-wrap gap-2 sm:mt-3 sm:gap-2.5" role="radiogroup" aria-label={f.interestLabel}>
                {f.interests.map((opt) => {
                  const active = interest === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => setInterest(opt)}
                      className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] transition-colors sm:gap-2 sm:px-5 sm:py-2.5 sm:text-sm ${
                        active
                          ? "border-[#06a3d5] bg-[#06a3d5] text-white"
                          : "border-black/20 text-black/70 hover:border-accent"
                      }`}
                    >
                      {active && <FiCheck className="size-3 sm:size-4" />}
                      {opt}
                    </button>
                  );
                })}
              </div>
              <input type="hidden" name="interest" value={interest} />

              <div className="mt-4 grid grid-cols-2 gap-3 sm:mt-6 sm:gap-5">
                {f.fields
                  .filter((x) => x.name === "name" || x.name === "email")
                  .map((x) => (
                    <div key={x.name}>
                      <label htmlFor={x.name} className={label}>
                        {x.label} <span className="text-red-600">*</span>
                      </label>
                      <input id={x.name} name={x.name} type={x.type} placeholder={x.placeholder} className={input} aria-invalid={!!errors[x.name]} />
                      {errors[x.name] && <p className="mt-1 text-[10px] text-red-600 sm:text-xs">{errors[x.name]}</p>}
                    </div>
                  ))}
              </div>
              {f.fields
                .filter((x) => x.name === "phone" || x.name === "message")
                .map((x) => (
                  <div key={x.name} className="mt-3 sm:mt-5">
                    <label htmlFor={x.name} className={label}>
                      {x.label} <span className="text-red-600">*</span>
                    </label>
                    {x.type === "textarea" ? (
                      <textarea id={x.name} name={x.name} rows={3} placeholder={x.placeholder} className={`${input} resize-y sm:min-h-28`} aria-invalid={!!errors[x.name]} />
                    ) : (
                      <input id={x.name} name={x.name} type={x.type} placeholder={x.placeholder} className={input} aria-invalid={!!errors[x.name]} />
                    )}
                    {errors[x.name] && <p className="mt-1 text-[10px] text-red-600 sm:text-xs">{errors[x.name]}</p>}
                  </div>
                ))}

              <button
                type="submit"
                className="mt-4 flex w-full items-center justify-center gap-2.5 rounded-full bg-[#06a3d5] py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 sm:mt-6 sm:gap-3 sm:py-4 sm:text-lg"
              >
                <FiSend className="size-4 sm:size-5" />
                {f.submitLabel}
              </button>
              {sent && (
                <p role="status" className="mt-4 text-center text-sm font-medium text-[#0a7fa3]">
                  {f.successMessage}
                </p>
              )}
            </form>
          </Reveal>

          {/* details (row of 3 on mobile, list + socials on desktop) */}
          <Reveal className="lg:col-start-1 lg:row-start-2 lg:self-start">
            <ul className="flex items-center justify-between gap-1.5 sm:gap-4 lg:mt-8 lg:flex-col lg:items-stretch lg:gap-4">
              {contact.details.map((d) => {
                const Icon = detailIcons[d.type];
                return (
                  <li key={d.type} className="min-w-0">
                    <a href={d.href} className="flex items-center gap-1.5 text-[9px] leading-snug sm:gap-3 sm:text-sm lg:gap-4 lg:text-xl">
                      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[#0a5a7e] sm:size-10 lg:size-12">
                        <Icon className="size-3 sm:size-4 lg:size-5" />
                      </span>
                      <span className={d.type === "address" ? "min-w-0 max-w-[5.25rem] sm:max-w-none" : "whitespace-nowrap"}>{d.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
            <div className="my-8 hidden h-px bg-white/15 lg:block" />
            <ul className="hidden gap-3 lg:flex">
              {contactSocialPlatforms.map((p) => {
                const link = socialLinks.find((s) => s.platform === p)!;
                return (
                  <li key={p}>
                    <a
                      href={link.href}
                      aria-label={link.label}
                      className="grid size-12 place-items-center rounded-xl border border-white/20 transition-colors hover:border-accent hover:text-accent"
                    >
                      <SocialIcon platform={p} className="size-5" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
