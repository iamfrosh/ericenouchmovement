"use client";
import Image from "next/image";
import { useState } from "react";
import type { GalleryItem } from "@/types/gallery";
import { Lightbox } from "./Lightbox";

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState<number | null>(null);
  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {items.map((g, i) => (
          <li key={g.id}>
            <button type="button" onClick={() => setActive(i)} aria-label={`View larger: ${g.title}`} className="group relative block aspect-[4/3] w-full overflow-hidden rounded-xl border border-line bg-muted">
              <Image src={g.image} alt={g.alt} fill sizes="(min-width:1024px) 370px, 50vw" loading="lazy" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
            </button>
          </li>
        ))}
      </ul>
      {active !== null && items[active] && (
        <Lightbox items={items} index={active} onIndex={setActive} onClose={() => setActive(null)} />
      )}
    </>
  );
}
