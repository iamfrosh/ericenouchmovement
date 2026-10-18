import type { MetadataRoute } from "next";
import { getArticles, getLeaders } from "@/lib/cms";
import { siteUrl } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, leaders] = await Promise.all([getArticles(), getLeaders()]);
  const pages = ["", "/about", "/leadership", "/news", "/gallery", "/contact", "/privacy"].map((p) => ({ url: `${siteUrl}${p}`, changeFrequency: "monthly" as const }));
  return [
    ...pages,
    ...articles.map((a) => ({ url: `${siteUrl}/news/${a.slug}`, lastModified: a.publishedAt })),
    ...leaders.map((l) => ({ url: `${siteUrl}/leadership/${l.slug}` })),
  ];
}
