export interface PortableSpan { _type: "span"; _key?: string; text: string; marks?: string[] }
export interface PortableBlock {
  _type: "block";
  _key?: string;
  style?: string;
  listItem?: "bullet" | "number";
  children: PortableSpan[];
  markDefs?: { _key: string; _type: string; href?: string }[];
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category?: string;
  tags: string[];
  author?: string;
  publishedAt: string;
  image?: string;
  imageAlt?: string;
  seoTitle?: string;
  seoDescription?: string;
  body?: PortableBlock[];
}
