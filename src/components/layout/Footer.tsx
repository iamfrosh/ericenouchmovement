import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { CONTACT, NAV, SITE, SOCIALS } from "@/lib/site";
import { BrandLogo } from "@/components/ui/Brand";
import { CookieSettingsButton } from "./CookieSettingsButton";

const linkCls = "text-[14.5px] text-ink-soft transition-colors duration-200 hover:text-brand-green-dark";
const h4 = "mb-4 font-[family-name:var(--font-heading)] text-xs font-bold uppercase tracking-[0.14em] text-[#333]";

export function Footer() {
  const rows = [
    { Icon: Mail, text: CONTACT.email, fallback: "Email to be provided", href: CONTACT.email ? `mailto:${CONTACT.email}` : "" },
    { Icon: Phone, text: CONTACT.phone, fallback: "Phone to be provided", href: CONTACT.phone ? `tel:${CONTACT.phone.replace(/\s/g, "")}` : "" },
    { Icon: MapPin, text: CONTACT.address, fallback: "Address to be provided", href: "" },
  ];
  return (
    <footer className="border-t border-line bg-white pb-7 pt-16">
      <div className="mx-auto w-full max-w-[1160px] px-5 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] lg:gap-12">
          <div>
            <div className="mb-4"><BrandLogo height={52} /></div>
            <p className="max-w-[34ch] text-[14.5px] text-ink-soft">
              A movement for political awareness, civic education, youth empowerment and democratic accountability.
            </p>
          </div>
          <div>
            <h2 className={h4}>Explore</h2>
            <ul className="grid gap-2.5">
              {NAV.map((n) => (
                <li key={n.href}><Link href={n.href} className={linkCls}>{n.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className={h4}>Legal</h2>
            <ul className="grid gap-2.5">
              <li><Link href="/privacy" className={linkCls}>Privacy Policy</Link></li>
              <li><Link href="/privacy#cookies" className={linkCls}>Cookie Policy</Link></li>
              <li><CookieSettingsButton className={`${linkCls} cursor-pointer`} /></li>
            </ul>
          </div>
          <div>
            <h2 className={h4}>Contact</h2>
            <ul className="grid gap-2.5">
              {rows.map(({ Icon, text, fallback, href }) => (
                <li key={fallback} className="flex items-center gap-2.5 text-[14.5px] text-ink-soft">
                  <Icon aria-hidden className="size-[17px] shrink-0 text-brand-green-dark" strokeWidth={1.75} />
                  {href ? <a href={href} className={linkCls}>{text}</a> : <span>{text || fallback}</span>}
                </li>
              ))}
            </ul>
            {SOCIALS.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
                {SOCIALS.map((s) => (
                  <li key={s.label}><a href={s.href} target="_blank" rel="noopener noreferrer" className={linkCls}>{s.label}</a></li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="mt-12 flex flex-wrap justify-between gap-4 border-t border-line pt-5 text-[13.5px] text-ink-soft">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p>
            Website created by{" "}
            <a href="https://www.froshx.com.ng/" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#333] underline-offset-4 transition-colors hover:text-brand-green-dark hover:underline">
              FroshX<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
