import { Newspaper } from "lucide-react";
import { getArticles } from "@/lib/cms";
import { NewsCard } from "@/components/news/NewsCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/Button";

export async function LatestNews() {
  const articles = await getArticles(3);
  return (
    <Section alt>
      <SectionHeading eyebrow="News & updates" title="Latest from the movement" action={<TextLink href="/news">All updates</TextLink>} />
      {articles.length ? (
        <ul className="grid gap-6 md:grid-cols-3">{articles.map((a) => <li key={a.slug}><NewsCard article={a} /></li>)}</ul>
      ) : (
        <EmptyState icon={Newspaper} title="No announcements yet" text="Official news and statements will be published here." />
      )}
    </Section>
  );
}
