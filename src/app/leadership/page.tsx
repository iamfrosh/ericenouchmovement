import type { Metadata } from "next";
import { getLeaders } from "@/lib/cms";
import { OrgChart } from "@/components/leadership/OrgChart";
import { PageHeader, SectionHeading } from "@/components/ui/SectionHeading";
import { LeadershipDirectory } from "@/components/leadership/LeadershipDirectory";
import { ContactCTA } from "@/components/home/ContactCTA";
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
      </Section>
      <Section>
        <SectionHeading eyebrow="Directory" title="Find a leader" />
        <LeadershipDirectory leaders={leaders} />
      </Section>
      <ContactCTA />
    </>
  );
}
