import Image from "next/image";
import { FOUNDER } from "@/lib/founder";
import { TextLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/SectionHeading";

export function FounderSpotlight() {
  return (
    <Section>
      <Reveal className="grid items-center gap-10 md:grid-cols-[minmax(0,380px)_1fr] md:gap-16">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-[380px] overflow-hidden rounded-2xl border border-line bg-muted md:mx-0">
          <Image src={FOUNDER.photo!} alt={FOUNDER.photoAlt!} fill sizes="(min-width:768px) 380px, 90vw" className="object-cover object-top" />
          <span aria-hidden className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-brand-green from-60% to-brand-red to-60%" />
        </div>
        <div>
          <Eyebrow>Founder</Eyebrow>
          <h2 className="text-[clamp(1.8rem,3.6vw,2.7rem)] font-extrabold">{FOUNDER.name}</h2>
          <p className="mt-2 font-[family-name:var(--font-heading)] text-lg font-semibold text-brand-green-dark">{FOUNDER.role}</p>
          <p className="mb-7 mt-5 max-w-[52ch] text-lg text-ink-soft">
            Hon. Eric Enoch Kugama is the Founder and Chairman of Eric Enoch Movement.
          </p>
          <TextLink href={`/leadership/${FOUNDER.slug}`}>View profile</TextLink>
        </div>
      </Reveal>
    </Section>
  );
}
