import { Users } from "lucide-react";
import { getLeaders } from "@/lib/cms";
import { LeaderCard } from "@/components/leadership/LeaderCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/Button";

export async function LeadershipPreview() {
  const leaders = (await getLeaders()).slice(0, 4);
  return (
    <Section>
      <SectionHeading eyebrow="Leadership" title="The people behind the movement" action={<TextLink href="/leadership">Full directory</TextLink>} />
      {leaders.length ? (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{leaders.map((l) => <li key={l.slug}><LeaderCard leader={l} /></li>)}</ul>
      ) : (
        <EmptyState icon={Users} title="Leadership profiles coming soon" text="Verified profiles of national leaders and local government coordinators will appear here once confirmed by the movement." />
      )}
    </Section>
  );
}
