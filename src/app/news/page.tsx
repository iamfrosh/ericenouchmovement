import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Newspaper } from "lucide-react";
import { getArticles } from "@/lib/cms";
import { NewsCard } from "@/components/news/NewsCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/ui/SectionHeading";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "News & Updates",
  description: "Official announcements and news from Eric Enoch Movement.",
  alternates: { canonical: "/news" },
};

export default async function NewsPage() {
  const articles = await getArticles();
  const [featured, ...rest] = articles;
  return (
    <>
      <PageHeader eyebrow="News & updates" title="Latest from the movement" text="Official announcements and verified statements." />
      <Section>
        {!featured ? (
          <EmptyState icon={Newspaper} title="No articles published yet" text="Official news will appear here once approved and published." />
        ) : (
          <>
            <article className="group mb-12 grid overflow-hidden rounded-2xl border border-line bg-white md:grid-cols-2">
              <Link href={`/news/${featured.slug}`} className="contents">
                <div className="relative flex aspect-[16/10] items-center justify-center bg-muted text-[#b9bfb9] md:aspect-auto md:min-h-[320px]">
                  {featured.image ? <Image src={featured.image} alt={featured.imageAlt || ""} fill priority sizes="(min-width:768px) 580px, 100vw" className="object-cover" /> : <Newspaper aria-hidden className="size-10" strokeWidth={1.5} />}
                </div>
                <div className="flex flex-col justify-center p-7 sm:p-10">
                  <p className="flex items-center gap-3 text-[13px] text-ink-soft"><span className="font-[family-name:var(--font-heading)] font-semibold uppercase tracking-wider text-brand-red">Featured</span><time dateTime={featured.publishedAt}>{formatDate(featured.publishedAt)}</time></p>
                  <h2 className="mt-3 text-[clamp(1.5rem,3vw,2rem)] group-hover:text-brand-green-dark">{featured.title}</h2>
                  <p className="mt-3 text-ink-soft">{featured.excerpt}</p>
                </div>
              </Link>
            </article>
            {rest.length > 0 && <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{rest.map((a) => <li key={a.slug}><NewsCard article={a} /></li>)}</ul>}
          </>
        )}
      </Section>
    </>
  );
}
