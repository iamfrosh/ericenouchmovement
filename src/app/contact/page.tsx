import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { CONTACT, SOCIALS } from "@/lib/site";
import { ContactForm } from "@/components/layout/ContactForm";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Eric Enoch Movement.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const rows = [
    { Icon: Mail, label: "Email", value: CONTACT.email, href: CONTACT.email ? `mailto:${CONTACT.email}` : "" },
    { Icon: Phone, label: "Telephone", value: CONTACT.phone, href: CONTACT.phone ? `tel:${CONTACT.phone.replace(/\s/g, "")}` : "" },
    { Icon: MapPin, label: "Office", value: CONTACT.address, href: "" },
  ];
  return (
    <>
      <PageHeader eyebrow="Contact" title="Contact the Movement" text="Send a message to the Eric Enoch Movement team." />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-14">
          <div className="flex flex-col gap-6">
            {rows.map(({ Icon, label, value, href }) => (
              <div key={label} className="flex gap-4">
                <span className="flex size-[46px] shrink-0 items-center justify-center rounded-[10px] bg-brand-green-tint text-brand-green-dark"><Icon aria-hidden className="size-[22px]" strokeWidth={1.75} /></span>
                <div>
                  <p className="font-[family-name:var(--font-heading)] text-[15px] font-bold">{label}</p>
                  {href ? <a href={href} className="text-[14.5px] text-ink-soft hover:text-brand-green-dark">{value}</a> : <p className="text-[14.5px] text-ink-soft">{value || "To be provided"}</p>}
                </div>
              </div>
            ))}
            {SOCIALS.length > 0 && <ul className="flex flex-wrap gap-x-5 gap-y-2">{SOCIALS.map((s) => <li key={s.label}><a href={s.href} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-brand-green-dark">{s.label}</a></li>)}</ul>}
            <p className="flex gap-3 rounded-[10px] border border-line bg-muted p-4 text-[13.5px] text-ink-soft">
              <ShieldCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-brand-green-dark" strokeWidth={1.75} />
              <span>Your details are used only to respond to your message. See our <Link href="/privacy" className="underline">Privacy Policy</Link>.</span>
            </p>
          </div>
          <ContactForm />
        </div>
      </Section>
    </>
  );
}
