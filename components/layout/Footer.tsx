import Image from "next/image";
import Link from "next/link";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { footer } from "@/data/footer";

const icons = { phone: FiPhone, email: FiMail, address: FiMapPin };

/**
 * Mobile (< sm): compact three-column footer (brand | Pages | Our Services) + copyright,
 * no contact list (as in the mobile design). sm and up: three columns in one row, with contacts.
 */
export function Footer() {
  return (
    <footer className="bg-white pb-6 pt-6 lg:pb-8">
      {/* Figma: card spans the 1440 frame with ~22px side margins */}
      <div className="mx-auto w-full max-w-page px-5 md:px-10 lg:px-[22px]">
        <div className="rounded-[20px] bg-[#011f2c] px-5 py-6 text-white sm:rounded-[28px] sm:px-10 sm:py-10 lg:rounded-[45px] lg:px-20 lg:pb-14 lg:pt-[72px]">
          <div className="grid grid-cols-[1.35fr_0.75fr_1.1fr] gap-3 sm:grid-cols-[1.6fr_1fr_1fr] sm:gap-8 lg:grid-cols-[1.8fr_1fr_1.15fr] lg:gap-10">
            <div>
              <Image src={footer.logo} alt="TaxAdvisor" width={189} height={34} className="h-5 w-auto sm:h-8 lg:h-[45px]" />
              <p className="mt-3 max-w-md text-[8px] leading-snug text-white/85 sm:mt-6 sm:text-base sm:leading-relaxed lg:mt-7 lg:max-w-[391px] lg:text-[17px] lg:leading-[34px]">
                {footer.description}
              </p>
              <ul className="mt-8 hidden space-y-4 sm:block lg:mt-9">
                {footer.contacts.map((c) => {
                  const Icon = icons[c.type];
                  return (
                    <li key={c.type}>
                      <a href={c.href} className="flex items-center gap-4 text-base lg:gap-6 lg:text-[18px]">
                        <span className="grid size-10 shrink-0 place-items-center rounded-full border-2 lg:size-[39px] border-[#16e0f0] text-[#16e0f0]">
                          <Icon className="size-4" />
                        </span>
                        {c.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            {footer.columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h3 className="text-[11px] font-bold sm:text-xl lg:text-2xl">{col.title}</h3>
                <span className="mt-2 block h-0.5 w-6 rounded-full bg-[#16e0f0] sm:mt-4 sm:h-1 sm:w-12 lg:mt-7 lg:h-[5px] lg:w-[54px]" />
                <ul className="mt-3 space-y-2.5 sm:mt-6 sm:space-y-4 lg:mt-9 lg:space-y-7">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="block whitespace-nowrap text-[9px] text-white/85 transition-colors hover:text-accent sm:text-base lg:text-xl lg:leading-7"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          <div className="mt-5 border-t border-white/20 pt-3 text-center text-[10px] sm:mt-10 sm:pt-6 sm:text-base lg:mt-12 lg:pt-8 lg:text-xl">
            {footer.copyright}
          </div>
        </div>
      </div>
    </footer>
  );
}
