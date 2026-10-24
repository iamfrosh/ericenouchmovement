"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Download, MapPin, Search, SearchX, User } from "lucide-react";
import { WARD_GROUPS } from "@/lib/wards-data";
import { LGA_DOCUMENTS } from "@/lib/documents";
import { EmptyState } from "@/components/ui/EmptyState";

const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/['’`]/g, "");
const field = "h-12 w-full rounded-lg border border-[#d6d6d6] bg-white px-3.5 text-[15px] transition focus:border-brand-green focus:outline-none focus:ring-[3px] focus:ring-brand-green/15";
const lbl = "mb-1.5 block font-[family-name:var(--font-heading)] text-[12.5px] font-semibold text-[#333]";

export function WardDirectory() {
  const [q, setQ] = useState("");
  const [lga, setLga] = useState("");

  const groups = useMemo(() => {
    const term = norm(q.trim());
    return WARD_GROUPS.filter((g) => !lga || g.slug === lga)
      .map((g) => ({
        ...g,
        doc: LGA_DOCUMENTS.find((d) => d.slug === g.slug),
        wards: g.wards.filter((e) => !term || norm(e.name).includes(term) || norm(e.ward).includes(term) || norm(g.lga).includes(term)),
      }))
      .filter((g) => g.wards.length > 0);
  }, [q, lga]);

  const total = groups.reduce((n, g) => n + g.wards.length, 0);

  return (
    <div>
      <form role="search" aria-label="Search ward coordinators" onSubmit={(e) => e.preventDefault()} className="mb-8 grid gap-3 sm:grid-cols-[2fr_1fr]">
        <div>
          <label htmlFor="wq" className={lbl}>Search by name or ward</label>
          <div className="relative">
            <Search aria-hidden className="pointer-events-none absolute left-3.5 top-3.5 size-5 text-[#888]" strokeWidth={1.75} />
            <input id="wq" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="e.g. Kiri or Victoria" className={`${field} pl-11`} />
          </div>
        </div>
        <div>
          <label htmlFor="wl" className={lbl}>Local government</label>
          <select id="wl" value={lga} onChange={(e) => setLga(e.target.value)} className={field}>
            <option value="">All LGAs</option>
            {WARD_GROUPS.map((g) => <option key={g.slug} value={g.slug}>{g.lga}</option>)}
          </select>
        </div>
      </form>

      <p aria-live="polite" className="mb-6 text-sm text-ink-soft">{total} ward {total === 1 ? "coordinator" : "coordinators"} in {groups.length} {groups.length === 1 ? "LGA" : "LGAs"}</p>

      {groups.length === 0 ? (
        <EmptyState icon={SearchX} title="No matches" text="Try a different name or ward, or clear the filters." />
      ) : (
        <div className="space-y-10">
          {groups.map((g) => (
            <section key={g.slug} aria-labelledby={`g-${g.slug}`}>
              <div className="mb-4 flex flex-wrap items-end justify-between gap-3 border-b border-line pb-3">
                <div>
                  <h2 id={`g-${g.slug}`} className="text-xl">{g.lga} LGA</h2>
                  <p className="text-[13.5px] text-ink-soft">
                    Coordinator:{" "}
                    {g.doc?.coordinators?.map((c, i) => (
                      <span key={c.slug}>{i > 0 && ", "}<Link href={`/leadership/${c.slug}`} className="font-semibold text-ink hover:text-brand-green-dark">{c.name}</Link></span>
                    ))}
                  </p>
                </div>
                {g.doc && (
                  <a href={g.doc.file} download={`EEM-${g.slug}.pdf`} className="inline-flex items-center gap-2 text-[13.5px] font-semibold text-brand-green-dark">
                    <Download aria-hidden className="size-4" strokeWidth={1.75} /> Official list (PDF)
                  </a>
                )}
              </div>
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {g.wards.map((e) => (
                  <li key={e.ward + e.name} className="flex items-center gap-3 rounded-xl border border-line bg-white p-4">
                    <span aria-hidden className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-green-tint text-brand-green-dark"><User className="size-5" strokeWidth={1.75} /></span>
                    <div className="min-w-0">
                      <p className="font-[family-name:var(--font-heading)] text-[15px] font-bold leading-snug">{e.name}</p>
                      <p className="flex items-center gap-1.5 text-[13.5px] text-ink-soft"><MapPin aria-hidden className="size-3.5 shrink-0" strokeWidth={1.75} />{e.ward}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
