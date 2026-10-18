import Image from "next/image";
import Link from "next/link";
import { Newspaper } from "lucide-react";
import type { Article } from "@/types/news";
import { formatDate } from "@/lib/utils";

export function NewsCard({ article }: { article: Article }) {
  return (
    <article className="group h-full overflow-hidden rounded-xl border border-line bg-white transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-[#cfe8d3]">
      <Link href={`/news/${article.slug}`} className="block h-full">
        <div className="relative flex aspect-[16/10] items-center justify-center bg-muted text-[#b9bfb9]">
          {article.image ? <Image src={article.image} alt={article.imageAlt || ""} fill sizes="(min-width:768px) 360px, 100vw" className="object-cover" /> : <Newspaper aria-hidden className="size-9" strokeWidth={1.5} />}
        </div>
        <div className="p-5">
          <p className="flex items-center gap-3 text-[13px] text-ink-soft">
            {article.category && <span className="font-[family-name:var(--font-heading)] font-semibold uppercase tracking-wider text-brand-green-dark">{article.category}</span>}
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
          </p>
          <h3 className="mt-2.5 text-lg group-hover:text-brand-green-dark">{article.title}</h3>
          <p className="mt-2 line-clamp-3 text-[15px] text-ink-soft">{article.excerpt}</p>
        </div>
      </Link>
    </article>
  );
}
