"use client";
import { useMemo, useState } from "react";
import type { GalleryItem } from "@/types/gallery";
import { cn } from "@/lib/utils";
import { GalleryGrid } from "./GalleryGrid";

export function GalleryBrowser({ items }: { items: GalleryItem[] }) {
  const cats = useMemo(() => [...new Set(items.map((i) => i.category).filter((c): c is string => !!c))], [items]);
  const [cat, setCat] = useState("");
  const shown = cat ? items.filter((i) => i.category === cat) : items;
  const chip = (active: boolean) => cn("rounded-lg border px-4 py-2 text-sm font-semibold transition-colors", active ? "border-brand-green-dark bg-brand-green-dark text-white" : "border-[#d6d6d6] bg-white hover:border-brand-green");
  return (
    <div>
      {cats.length > 0 && (
        <div role="group" aria-label="Filter by category" className="mb-8 flex flex-wrap gap-2">
          <button type="button" aria-pressed={cat === ""} onClick={() => setCat("")} className={chip(cat === "")}>All</button>
          {cats.map((c) => <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)} className={chip(cat === c)}>{c}</button>)}
        </div>
      )}
      <GalleryGrid key={cat} items={shown} />
    </div>
  );
}
