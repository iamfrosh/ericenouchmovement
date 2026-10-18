import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Mail, MapPin } from "lucide-react";
import { getLeader, getLeaders } from "@/lib/cms";
import { initials } from "@/lib/utils";
import { LEADERSHIP_CATEGORIES } from "@/types/leadership";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getLeaders()).map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const leader = await getLeader((await params).slug);
  if (!leader) return { title: "Profile not found" };
  return {
    title: `${leader.name}, ${leader.role}`,
    description: leader.bio?.slice(0, 160) || `${leader.name} is ${leader.role} at Eric Enoch Movement.`,
    alternates: { canonical: `/leadership/${leader.slug}` },
  };
}

export default async function LeaderPage({ params }: Props) {
  const leader = await getLeader((await params).slug);
  if (!leader) notFound();
  return (
    <Container className="py-14 sm:py-20">
      <Link href="/leadership" className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-brand-green-dark"><ArrowLeft aria-hidden className="size-4" /> All leadership</Link>
      <div className="grid gap-10 md:grid-cols-[320px_1fr] md:gap-14">
        <div className="relative flex aspect-[4/4.6] items-center justify-center overflow-hidden rounded-2xl border border-line bg-muted text-[#b9bfb9]">
          {leader.photo ? <Image src={leader.photo} alt={leader.photoAlt || leader.name} fill priority sizes="(min-width:768px) 320px, 100vw" className="object-cover object-top" /> : <span aria-hidden className="flex size-28 items-center justify-center rounded-full border border-line bg-white font-[family-name:var(--font-heading)] text-4xl font-bold text-brand-green-dark">{initials(leader.name)}</span>}
        </div>
        <div>
          <Eyebrow>{LEADERSHIP_CATEGORIES[leader.category] ?? leader.category}</Eyebrow>
          <h1 className="text-[clamp(2rem,4.4vw,3rem)] font-extrabold">{leader.name}</h1>
          <p className="mt-2 text-lg text-ink-soft">{leader.role}</p>
          {(leader.lga || leader.state) && <p className="mt-4 flex items-center gap-2 text-ink-soft"><MapPin aria-hidden className="size-[18px] text-brand-green-dark" strokeWidth={1.75} />{[leader.lga, leader.state].filter(Boolean).join(", ")}</p>}
          {leader.bio && <p className="mt-8 max-w-[62ch] whitespace-pre-line leading-[1.8] text-[#2b2b2b]">{leader.bio}</p>}
          {leader.contactEmail && <p className="mt-8"><a href={`mailto:${leader.contactEmail}`} className="inline-flex items-center gap-2 font-semibold text-brand-green-dark"><Mail aria-hidden className="size-[18px]" strokeWidth={1.75} />{leader.contactEmail}</a></p>}
        </div>
      </div>
    </Container>
  );
}
