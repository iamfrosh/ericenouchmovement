import Image from "next/image";
import Link from "next/link";
import { initials } from "@/lib/utils";
import { LEADERSHIP_CATEGORIES, type Leader } from "@/types/leadership";

export function LeaderCard({ leader }: { leader: Leader }) {
  return (
    <Link href={`/leadership/${leader.slug}`} className="group block h-full overflow-hidden rounded-xl border border-line bg-white transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-[#cfe8d3]">
      <div className="relative flex aspect-[4/4.4] items-center justify-center bg-muted text-[#b9bfb9]">
        {leader.photo ? (
          <Image src={leader.photo} alt={leader.photoAlt || leader.name} fill sizes="(min-width:1024px) 270px, (min-width:640px) 45vw, 100vw" className="object-cover object-top" />
        ) : (
          <span aria-hidden className="flex size-20 items-center justify-center rounded-full border border-line bg-white font-[family-name:var(--font-heading)] text-2xl font-bold text-brand-green-dark">{initials(leader.name)}</span>
        )}
      </div>
      <div className="p-[18px]">
        <h3 className="text-base">{leader.name}</h3>
        <p className="text-[13.5px] text-ink-soft">{leader.role}</p>
        <span className="mt-2.5 inline-block rounded bg-brand-green-tint px-2 py-1 font-[family-name:var(--font-heading)] text-[11px] font-semibold uppercase tracking-wider text-brand-green-dark">
          {LEADERSHIP_CATEGORIES[leader.category] ?? leader.category}
        </span>
        {(leader.lga || leader.state) && <p className="mt-2 text-[13px] text-ink-soft">{[leader.lga, leader.state].filter(Boolean).join(", ")}</p>}
      </div>
    </Link>
  );
}
