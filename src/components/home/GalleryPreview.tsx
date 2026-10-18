import { ImageIcon } from "lucide-react";
import { getGallery } from "@/lib/cms";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { EmptyState } from "@/components/ui/EmptyState";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/Button";

export async function GalleryPreview() {
  const items = (await getGallery()).slice(0, 6);
  return (
    <Section>
      <SectionHeading eyebrow="Activities" title="Moments from our work" action={<TextLink href="/gallery">Open gallery</TextLink>} />
      {items.length ? <GalleryGrid items={items} /> : <EmptyState icon={ImageIcon} title="Gallery coming soon" text="Approved photographs from EEM activities and events will appear here." />}
    </Section>
  );
}
