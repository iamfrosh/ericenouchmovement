import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { FEATURED_DOCUMENT, LGA_DOCUMENTS } from "@/lib/documents";
import { DocumentLibrary } from "@/components/documents/DocumentLibrary";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Official Documents",
  description: "Download the official Eric Enoch Movement strategy hub, executive list and LGA ward coordinator lists.",
  alternates: { canonical: "/documents" },
};

export default function DocumentsPage() {
  return (
    <>
      <PageHeader eyebrow="Documents" title="Official documents" text="Preview and download the movement's official lists, structure chart and appointment letters." />
      <Section>
        <DocumentLibrary featured={FEATURED_DOCUMENT} documents={LGA_DOCUMENTS} />
        <p className="mb-6 mt-12 text-[15px] text-ink-soft">Looking for a specific person? <Link href="/leadership/wards" className="font-semibold text-brand-green-dark underline underline-offset-4">Search all ward coordinators</Link> by name or ward.</p>
        <p className="flex items-start gap-3 rounded-[10px] border border-line bg-muted px-4 py-3.5 text-[13.5px] text-ink-soft">
          <ShieldCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-brand-green-dark" strokeWidth={1.75} />
          Documents are published by the movement as issued. They are compressed for fast download.
        </p>
      </Section>
    </>
  );
}
