import type { Metadata } from "next";
import { getLeaders } from "@/lib/cms";
import { OrgChart } from "@/components/leadership/OrgChart";
import { PageHeader, SectionHeading } from "@/components/ui/SectionHeading";
import { LeadershipDirectory } from "@/components/leadership/LeadershipDirectory";
import { ContactCTA } from "@/components/home/ContactCTA";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Our Leadership",
  description: "Meet the national leaders, state leadership and local government coordinators of Eric Enoch Movement.",
  alternates: { canonical: "/leadership" },
};

export default async function LeadershipPage() {
  const leaders = await getLeaders();
  return (
    <>
      <PageHeader eyebrow="Leadership" title="Our Leadership & Coordinators" text="National leaders, state leadership and local government coordinators." />
      <Section alt>
        <SectionHeading eyebrow="Structure" title="Organisational structure" />
        <OrgChart />
        <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-xl border border-line bg-white p-5 sm:flex-row sm:items-center">
          <p className="max-w-[56ch] text-[15px] text-ink-soft">Want the full official lists? Preview and download the Strategic Hub and every LGA ward coordinator list.</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/leadership/wards" variant="secondary">Search ward coordinators</ButtonLink>
            <ButtonLink href="/documents">Official documents</ButtonLink>
          </div>
        </div>
      </Section>
      <Section>
        <SectionHeading eyebrow="Directory" title="Find a leader" />
        <LeadershipDirectory leaders={leaders} />
      </Section>
      <ContactCTA />
    </>
  );
}
