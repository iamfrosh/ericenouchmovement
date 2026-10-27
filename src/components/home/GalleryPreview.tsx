import { ImageIcon } from "lucide-react";
import { getGallery } from "@/lib/cms";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { EmptyState } from "@/components/ui/EmptyState";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/Button";

export async function GalleryPreview() {
  const all = await getGallery();
  const featured = all.filter((g) => g.featured);
  // One featured photo per category so the preview shows a spread of LGAs.
  const perCategory = featured.filter((g, i) => featured.findIndex((x) => x.category === g.category) === i);
  const items = (perCategory.length ? perCategory : all).slice(0, 6);
  return (
    <Section>
      <SectionHeading eyebrow="Activities" title="Moments from our work" action={<TextLink href="/gallery">Open gallery</TextLink>} />
      {items.length ? <GalleryGrid items={items} /> : <EmptyState icon={ImageIcon} title="Gallery coming soon" text="Approved photographs from EEM activities and events will appear here." />}
    </Section>
  );
}
