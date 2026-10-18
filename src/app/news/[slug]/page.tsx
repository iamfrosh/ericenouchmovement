import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Share2 } from "lucide-react";
import { getArticle, getArticles } from "@/lib/cms";
import { ArticleContent } from "@/components/news/ArticleContent";
import { NewsCard } from "@/components/news/NewsCard";
import { Container } from "@/components/ui/Container";
import { SITE } from "@/lib/site";
import { formatDate, siteUrl } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getArticles()).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = await getArticle((await params).slug);
  if (!a) return { title: "Article not found" };
  const title = a.seoTitle || a.title;
  const description = a.seoDescription || a.excerpt;
  return {
    title,
    description,
    alternates: { canonical: `/news/${a.slug}` },
    openGraph: { type: "article", title, description, publishedTime: a.publishedAt, images: a.image ? [{ url: a.image }] : undefined },
    twitter: { card: a.image ? "summary_large_image" : "summary", title, description },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const [article, all] = await Promise.all([getArticle(slug), getArticles()]);
  if (!article) notFound();

  const idx = all.findIndex((a) => a.slug === slug);
  const newer = idx > 0 ? all[idx - 1] : undefined;
  const older = idx >= 0 ? all[idx + 1] : undefined;
  const related = all.filter((a) => a.slug !== slug && ((article.category && a.category === article.category) || a.tags.some((t) => article.tags.includes(t)))).slice(0, 3);

  const url = `${siteUrl}/news/${article.slug}`;
  const enc = encodeURIComponent;
  const shares = [
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}` },
    { label: "X", href: `https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(article.title)}` },
    { label: "WhatsApp", href: `https://wa.me/?text=${enc(`${article.title} ${url}`)}` },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}` },
  ];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    datePublished: article.publishedAt,
    ...(article.image ? { image: [article.image] } : {}),
    author: { "@type": "Organization", name: article.author || SITE.name },
    publisher: { "@type": "Organization", name: SITE.name },
    mainEntityOfPage: url,
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Container className="py-12 sm:py-16">
        <Link href="/news" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-green-dark"><ArrowLeft aria-hidden className="size-4" /> All updates</Link>
        <header className="max-w-3xl">
          <p className="mb-4 flex items-center gap-3 text-[13px] text-ink-soft">
            {article.category && <span className="font-[family-name:var(--font-heading)] font-semibold uppercase tracking-wider text-brand-green-dark">{article.category}</span>}
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
            {article.author && <span>By {article.author}</span>}
          </p>
          <h1 className="text-[clamp(2rem,4.6vw,3.1rem)] font-extrabold">{article.title}</h1>
          <p className="mt-5 text-xl text-ink-soft">{article.excerpt}</p>
        </header>
        {article.image && (
          <div className="relative my-10 aspect-[16/9] overflow-hidden rounded-2xl border border-line bg-muted">
            <Image src={article.image} alt={article.imageAlt || ""} fill priority sizes="(min-width:1160px) 1112px, 100vw" className="object-cover" />
          </div>
        )}
        <div className="mt-10">{article.body && <ArticleContent blocks={article.body} />}</div>

        {article.tags.length > 0 && <ul className="mt-10 flex flex-wrap gap-2" aria-label="Tags">{article.tags.map((t) => <li key={t} className="rounded bg-brand-green-tint px-2.5 py-1 text-xs font-semibold text-brand-green-dark">{t}</li>)}</ul>}

        <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-6">
          <span className="flex items-center gap-2 text-sm font-semibold"><Share2 aria-hidden className="size-4" strokeWidth={1.75} /> Share</span>
          {shares.map((s) => <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="text-sm text-ink-soft transition-colors hover:text-brand-green-dark">{s.label}<span className="sr-only"> (opens in a new tab)</span></a>)}
        </div>

        {(newer || older) && (
          <nav aria-label="Article navigation" className="mt-10 grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
            {older ? <Link href={`/news/${older.slug}`} className="group rounded-xl border border-line p-5 transition-colors hover:border-[#cfe8d3]"><span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink-soft"><ArrowLeft aria-hidden className="size-4" /> Previous</span><span className="mt-1 block font-[family-name:var(--font-heading)] font-semibold group-hover:text-brand-green-dark">{older.title}</span></Link> : <span />}
            {newer && <Link href={`/news/${newer.slug}`} className="group rounded-xl border border-line p-5 text-right transition-colors hover:border-[#cfe8d3]"><span className="flex items-center justify-end gap-2 text-xs font-semibold uppercase tracking-wider text-ink-soft">Next <ArrowRight aria-hidden className="size-4" /></span><span className="mt-1 block font-[family-name:var(--font-heading)] font-semibold group-hover:text-brand-green-dark">{newer.title}</span></Link>}
          </nav>
        )}
      </Container>
      {related.length > 0 && (
        <section aria-labelledby="related" className="border-t border-line bg-muted py-16">
          <Container>
            <h2 id="related" className="mb-8 text-2xl">Related articles</h2>
            <ul className="grid gap-6 md:grid-cols-3">{related.map((a) => <li key={a.slug}><NewsCard article={a} /></li>)}</ul>
          </Container>
        </section>
      )}
    </article>
  );
}
