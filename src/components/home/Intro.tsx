import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function Intro() {
  return (
    <Section alt>
      <Reveal className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-[72px]">
        <div><Eyebrow>Who we are</Eyebrow><h2 className="text-[clamp(1.7rem,3.2vw,2.4rem)]">A movement built on informed participation</h2></div>
        <div className="space-y-4 text-ink-soft">
          <p>Eric Enoch Movement exists to help young people understand governance, know their rights and take an active part in democratic life.</p>
          <p>Through civic education, leadership development and a commitment to accountability, EEM works to raise a generation that engages with politics knowledgeably and responsibly.</p>
          <p className="pt-3"><TextLink href="/about">Read the full story</TextLink></p>
        </div>
      </Reveal>
    </Section>
  );
}
