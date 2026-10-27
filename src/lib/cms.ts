import type { Leader } from "@/types/leadership";
import type { Article } from "@/types/news";
import type { GalleryItem } from "@/types/gallery";
import { LOCAL_LEADERS } from "@/lib/leaders-data";
import { LOCAL_GALLERY } from "@/lib/gallery-data";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_READ_TOKEN;
const API_VERSION = "2025-01-01";

/** Published documents only: drafts are excluded by perspective and by filter. */
const PUBLISHED = `published == true && !(_id in path("drafts.**"))`;

async function query<T>(groq: string, params: Record<string, string> = {}, tag = "cms"): Promise<T | null> {
  if (!projectId) return null; // CMS not configured: pages render designed empty states
  const host = token ? "api.sanity.io" : "apicdn.sanity.io";
  const url = new URL(`https://${projectId}.${host}/v${API_VERSION}/data/query/${dataset}`);
  url.searchParams.set("query", groq);
  url.searchParams.set("perspective", "published");
  for (const [k, v] of Object.entries(params)) url.searchParams.set(`$${k}`, JSON.stringify(v));
  try {
    const res = await fetch(url, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      next: { revalidate: 300, tags: [tag] },
    });
    if (!res.ok) {
      console.error(`CMS request failed with status ${res.status}`);
      return null;
    }
    const json = (await res.json()) as { result: T };
    return json.result;
  } catch {
    console.error("CMS request error");
    return null;
  }
}

const LEADER_FIELDS = `"slug": slug.current, name, role, category, state, lga, "order": coalesce(order, 999), "photo": photo.asset->url, "photoAlt": photo.alt, bio, contactEmail`;
const ARTICLE_FIELDS = `"slug": slug.current, title, excerpt, category, "tags": coalesce(tags, []), author, publishedAt, "image": image.asset->url, "imageAlt": image.alt, seoTitle, seoDescription`;

export async function getLeaders(): Promise<Leader[]> {
  const cms = (await query<Leader[]>(`*[_type == "leader" && ${PUBLISHED}] | order(order asc, name asc){${LEADER_FIELDS}}`, {}, "leaders")) ?? [];
  // Confirmed local roster first; a CMS entry with the same slug takes precedence.
  const bySlug = new Map<string, Leader>(LOCAL_LEADERS.map((l) => [l.slug, l]));
  for (const l of cms) bySlug.set(l.slug, l);
  return [...bySlug.values()].sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
}

export async function getLeader(slug: string): Promise<Leader | null> {
  const found = await query<Leader | null>(`*[_type == "leader" && slug.current == $slug && ${PUBLISHED}][0]{${LEADER_FIELDS}}`, { slug }, "leaders");
  return found ?? LOCAL_LEADERS.find((l) => l.slug === slug) ?? null;
}

export async function getArticles(limit = 100): Promise<Article[]> {
  return (await query<Article[]>(`*[_type == "article" && ${PUBLISHED}] | order(publishedAt desc)[0...${Math.max(1, Math.floor(limit))}]{${ARTICLE_FIELDS}}`, {}, "articles")) ?? [];
}

export async function getArticle(slug: string): Promise<Article | null> {
  return query<Article | null>(`*[_type == "article" && slug.current == $slug && ${PUBLISHED}][0]{${ARTICLE_FIELDS}, body}`, { slug }, "articles");
}

export async function getGallery(): Promise<GalleryItem[]> {
  const cms =
    (await query<GalleryItem[]>(
      `*[_type == "galleryItem" && ${PUBLISHED}] | order(order asc){"id": _id, title, "alt": coalesce(image.alt, title), category, "order": coalesce(order, 999), "image": image.asset->url, "width": image.asset->metadata.dimensions.width, "height": image.asset->metadata.dimensions.height, videoUrl}`,
      {},
      "gallery",
    )) ?? [];
  // Local approved photos first, then anything published in the CMS.
  return [...LOCAL_GALLERY, ...cms.filter((g) => g.image).map((g) => ({ ...g, order: g.order + 1000 }))].sort((a, b) => a.order - b.order);
}
