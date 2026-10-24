import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { TOTAL_WARD_COORDINATORS } from "@/lib/wards-data";
import { WardDirectory } from "@/components/wards/WardDirectory";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Ward Coordinators",
  description: "Search the Eric Enoch Movement ward coordinators by name, ward and local government area.",
  alternates: { canonical: "/leadership/wards" },
};

export default function WardsPage() {
  return (
    <>
      <PageHeader eyebrow="Leadership" title="Ward coordinators" text={`${TOTAL_WARD_COORDINATORS} ward coordinators across nine local government areas. Search by name or ward.`} />
      <Section>
        <Link href="/leadership" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-green-dark"><ArrowLeft aria-hidden className="size-4" /> Leadership</Link>
        <WardDirectory />
        <div className="mt-14 flex flex-col items-start justify-between gap-4 rounded-xl border border-line bg-muted p-5 sm:flex-row sm:items-center">
          <p className="max-w-[56ch] text-[15px] text-ink-soft">The official signed lists and appointment letters are available to preview and download.</p>
          <ButtonLink href="/documents" variant="secondary">Official documents</ButtonLink>
        </div>
      </Section>
    </>
  );
}
