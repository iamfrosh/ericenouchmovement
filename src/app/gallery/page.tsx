import type { Metadata } from "next";
import { ImageIcon } from "lucide-react";
import { getGallery } from "@/lib/cms";
import { GalleryBrowser } from "@/components/gallery/GalleryBrowser";
import { EmptyState } from "@/components/ui/EmptyState";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photographs from Eric Enoch Movement activities, meetings and civic education programmes.",
  alternates: { canonical: "/gallery" },
};

export default async function GalleryPage() {
  const items = await getGallery();
  return (
    <>
      <PageHeader eyebrow="Gallery" title="Movement activities" text="Approved photographs from meetings, community engagements and civic education programmes." />
      <Section>
        {items.length ? <GalleryBrowser items={items} /> : <EmptyState icon={ImageIcon} title="Gallery is empty" text="Only approved EEM photographs will be shown here. Stock images are never presented as real events." />}
      </Section>
    </>
  );
}
