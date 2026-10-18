import type { Metadata } from "next";
import { Info } from "lucide-react";
import { PROPOSED_VALUES } from "@/lib/site";
import { FocusAreas } from "@/components/home/FocusAreas";
import { VisionMission } from "@/components/home/VisionMission";
import { FounderSpotlight } from "@/components/home/FounderSpotlight";
import { OrgChart } from "@/components/leadership/OrgChart";
import { ContactCTA } from "@/components/home/ContactCTA";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { PageHeader, SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Eric Enoch Movement: our vision, mission, values and focus areas.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About us" title="Eric Enoch Movement" text="A movement focused on political awareness, civic education, youth empowerment, democratic participation and accountability." />
      <FounderSpotlight />
      <Section alt><VisionMission /></Section>
      <Section alt>
        <SectionHeading eyebrow="Values" title="Core values" />
        <Reveal>
          <ul className="grid overflow-hidden rounded-xl border border-line bg-white sm:grid-cols-2 lg:grid-cols-3">
            {PROPOSED_VALUES.map((v) => (
              <li key={v.title} className="border-b border-r border-line p-6">
                <p className="font-[family-name:var(--font-heading)] text-[15px] font-bold">{v.title}</p>
                <p className="text-sm text-ink-soft">{v.text}</p>
              </li>
            ))}
          </ul>
          <p className="mt-5 flex items-start gap-3 rounded-[10px] border border-line bg-muted px-4 py-3.5 text-[13.5px] text-ink-soft">
            <Info aria-hidden className="mt-0.5 size-5 shrink-0 text-brand-green-dark" strokeWidth={1.75} />
            Proposed values, pending confirmation by the movement.
          </p>
        </Reveal>
      </Section>
      <Section>
        <SectionHeading eyebrow="Focus areas" title="Objectives" />
        <FocusAreas />
      </Section>
      <Section alt>
        <SectionHeading eyebrow="Structure" title="Organisational structure" action={<TextLink href="/leadership">Full directory</TextLink>} />
        <OrgChart />
      </Section>
      <ContactCTA />
    </>
  );
}
