"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryItem } from "@/types/gallery";

export function Lightbox({ items, index, onIndex, onClose }: { items: GalleryItem[]; index: number; onIndex: (i: number) => void; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const item = items[index];
  const go = (d: number) => onIndex((index + d + items.length) % items.length);

  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    ref.current?.querySelector<HTMLElement>("button")?.focus();
    return () => {
      document.body.style.overflow = "";
      prevFocus?.focus();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onIndex((index + 1) % items.length);
      else if (e.key === "ArrowLeft") onIndex((index - 1 + items.length) % items.length);
      else if (e.key === "Tab" && ref.current) {
        const f = [...ref.current.querySelectorAll<HTMLElement>("button")];
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [index, items.length, onClose, onIndex]);

  if (!item) return null;
  const btn = "flex size-11 items-center justify-center rounded-full bg-white/95 text-ink shadow transition hover:bg-white";
  return (
    <div ref={ref} role="dialog" aria-modal="true" aria-label={item.title} className="fixed inset-0 z-[95] flex flex-col bg-black/90 p-4" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="flex justify-end"><button type="button" aria-label="Close" onClick={onClose} className={btn}><X aria-hidden className="size-5" /></button></div>
      <div className="relative mx-auto my-3 w-full max-w-5xl flex-1" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
        <Image src={item.image} alt={item.alt} fill sizes="100vw" className="object-contain" />
      </div>
      <div className="flex items-center justify-between gap-4 text-white">
        <button type="button" aria-label="Previous image" onClick={() => go(-1)} className={btn}><ChevronLeft aria-hidden className="size-5" /></button>
        <p className="text-center text-sm">{item.title} <span className="text-white/60">({index + 1}/{items.length})</span></p>
        <button type="button" aria-label="Next image" onClick={() => go(1)} className={btn}><ChevronRight aria-hidden className="size-5" /></button>
      </div>
    </div>
  );
}
