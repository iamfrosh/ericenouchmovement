import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

export function ContactCTA() {
  return (
    <Section>
      <Reveal>
        <div className="relative flex flex-wrap items-center justify-between gap-8 overflow-hidden rounded-2xl border border-line bg-white px-7 py-10 sm:p-14">
          <span aria-hidden className="absolute inset-y-0 left-0 w-1 bg-brand-green" />
          <div>
            <h2 className="text-[clamp(1.7rem,3.2vw,2.4rem)]">Learn more about the movement</h2>
            <p className="mt-2.5 max-w-[52ch] text-ink-soft">Explore our mission, meet the people behind it, or get in touch with the movement directly.</p>
          </div>
          <ButtonLink href="/contact">Contact the Movement</ButtonLink>
        </div>
      </Reveal>
    </Section>
  );
}
