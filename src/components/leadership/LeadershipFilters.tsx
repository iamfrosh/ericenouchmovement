"use client";
import { Search } from "lucide-react";
import { LEADERSHIP_CATEGORIES } from "@/types/leadership";

export interface Filters { q: string; category: string; state: string; lga: string }

const field = "h-12 w-full rounded-lg border border-[#d6d6d6] bg-white px-3.5 text-[15px] transition focus:border-brand-green focus:outline-none focus:ring-[3px] focus:ring-brand-green/15";
const lbl = "mb-1.5 block font-[family-name:var(--font-heading)] text-[12.5px] font-semibold text-[#333]";

export function LeadershipFilters({ value, onChange, categories, states, lgas }: {
  value: Filters; onChange: (f: Filters) => void; categories: string[]; states: string[]; lgas: string[];
}) {
  const set = (k: keyof Filters) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => onChange({ ...value, [k]: e.target.value });
  return (
    <form role="search" aria-label="Filter leadership directory" onSubmit={(e) => e.preventDefault()} className="mb-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-[2fr_1fr_1fr_1fr]">
      <div className="sm:col-span-3 lg:col-span-1">
        <label htmlFor="lq" className={lbl}>Search by name</label>
        <div className="relative">
          <Search aria-hidden className="pointer-events-none absolute left-3.5 top-3.5 size-5 text-[#888]" strokeWidth={1.75} />
          <input id="lq" type="search" value={value.q} onChange={set("q")} placeholder="Search leaders" className={`${field} pl-11`} />
        </div>
      </div>
      <div>
        <label htmlFor="lc" className={lbl}>Category</label>
        <select id="lc" value={value.category} onChange={set("category")} className={field}>
          <option value="">All categories</option>
          {categories.map((c) => <option key={c} value={c}>{LEADERSHIP_CATEGORIES[c as keyof typeof LEADERSHIP_CATEGORIES] ?? c}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="ls" className={lbl}>State</label>
        <select id="ls" value={value.state} onChange={set("state")} className={field}>
          <option value="">All states</option>
          {states.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="ll" className={lbl}>Local government</label>
        <select id="ll" value={value.lga} onChange={set("lga")} className={field}>
          <option value="">All LGAs</option>
          {lgas.map((l) => <option key={l}>{l}</option>)}
        </select>
      </div>
    </form>
  );
}
