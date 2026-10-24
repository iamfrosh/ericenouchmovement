"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Download, ExternalLink, Expand, FileText, Search, X } from "lucide-react";
import type { OfficialDocument } from "@/lib/documents";
import { buttonClass } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const downloadName = (d: OfficialDocument) => `EEM-${d.slug}.pdf`;

function Actions({ doc, onPreview, compact }: { doc: OfficialDocument; onPreview: () => void; compact?: boolean }) {
  const size = compact ? "h-11 px-4 text-sm" : "h-12 px-5";
  return (
    <div className="flex flex-col gap-2.5 sm:flex-row">
      <button type="button" onClick={onPreview} className={buttonClass("secondary", cn(size, "sm:flex-1"))}>
        <Expand aria-hidden className="size-[18px]" strokeWidth={1.75} /> Preview
      </button>
      <a href={doc.file} download={downloadName(doc)} className={buttonClass("primary", cn(size, "sm:flex-1"))}>
        <Download aria-hidden className="size-[18px]" strokeWidth={1.75} /> Download PDF
      </a>
    </div>
  );
}

function PreviewDialog({ doc, onClose }: { doc: OfficialDocument; onClose: () => void }) {
  const [page, setPage] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    ref.current?.querySelector<HTMLElement>("button")?.focus();
    return () => {
      document.body.style.overflow = "";
      prev?.focus();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && ref.current) {
        const f = [...ref.current.querySelectorAll<HTMLElement>("button, a[href]")];
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const src = doc.previews[page] ?? doc.previews[0]!;
  return (
    <div className="fixed inset-0 z-[95] flex items-stretch justify-center bg-black/70 sm:items-center sm:p-6" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div ref={ref} role="dialog" aria-modal="true" aria-labelledby="doc-title" className="flex h-full w-full max-w-3xl flex-col overflow-hidden bg-white sm:h-auto sm:max-h-full sm:rounded-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4">
          <div className="min-w-0">
            <h2 id="doc-title" className="truncate text-lg">{doc.title}</h2>
            <p className="text-[13px] text-ink-soft">{doc.pages} pages · PDF · {doc.size}</p>
          </div>
          <button type="button" aria-label="Close preview" onClick={onClose} className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-line"><X aria-hidden className="size-5" strokeWidth={1.75} /></button>
        </div>
        <div className="flex-1 overflow-auto bg-muted p-3 sm:p-5">
          <Image key={src} src={src} alt={`Preview of ${doc.title}, page ${page + 1}`} width={910} height={1287} sizes="(min-width:768px) 720px, 100vw" className="mx-auto h-auto w-full max-w-[720px] rounded border border-line bg-white shadow-sm" />
          {doc.previews.length > 1 && (
            <div className="mt-4 flex justify-center gap-2" role="group" aria-label="Preview pages">
              {doc.previews.map((_, i) => (
                <button key={i} type="button" aria-pressed={i === page} onClick={() => setPage(i)} className={cn("h-9 rounded-lg border px-4 text-sm font-semibold", i === page ? "border-brand-green-dark bg-brand-green-dark text-white" : "border-[#d6d6d6] bg-white")}>Page {i + 1}</button>
              ))}
            </div>
          )}
          <p className="mt-4 text-center text-[13px] text-ink-soft">Preview shows the first {doc.previews.length > 1 ? `${doc.previews.length} pages` : "page"}. Download or open the PDF to read all {doc.pages} pages.</p>
        </div>
        <div className="flex flex-col gap-2.5 border-t border-line bg-white px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:flex-row sm:justify-end">
          <a href={doc.file} target="_blank" rel="noopener noreferrer" className={buttonClass("secondary", "h-11 px-5 text-sm")}>
            <ExternalLink aria-hidden className="size-[18px]" strokeWidth={1.75} /> Open full PDF<span className="sr-only"> (new tab)</span>
          </a>
          <a href={doc.file} download={downloadName(doc)} className={buttonClass("primary", "h-11 px-5 text-sm")}>
            <Download aria-hidden className="size-[18px]" strokeWidth={1.75} /> Download PDF
          </a>
        </div>
      </div>
    </div>
  );
}

export function DocumentLibrary({ featured, documents }: { featured: OfficialDocument; documents: OfficialDocument[] }) {
  const [open, setOpen] = useState<OfficialDocument | null>(null);
  const [q, setQ] = useState("");
  const term = q.trim().toLowerCase();
  const shown = documents.filter((d) => !term || d.title.toLowerCase().includes(term) || d.coordinators?.some((c) => c.name.toLowerCase().includes(term)));

  return (
    <>
      <section aria-labelledby="featured" className="mb-16">
        <h2 id="featured" className="sr-only">Featured document</h2>
        <article className="grid overflow-hidden rounded-2xl border border-line bg-white md:grid-cols-[minmax(0,360px)_1fr]">
          <button type="button" onClick={() => setOpen(featured)} aria-label={`Preview ${featured.title}`} className="group relative block aspect-[4/3] overflow-hidden bg-muted md:aspect-auto md:min-h-[380px]">
            <Image src={featured.previews[0]!} alt="" fill sizes="(min-width:768px) 360px, 100vw" priority className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]" />
            <span className="absolute bottom-3 left-3 flex items-center gap-2 rounded-lg bg-white/95 px-3 py-1.5 text-[13px] font-semibold shadow"><Expand aria-hidden className="size-4" strokeWidth={1.75} /> Preview</span>
          </button>
          <div className="flex flex-col justify-center p-6 sm:p-10">
            <p className="mb-3 flex items-center gap-2 font-[family-name:var(--font-heading)] text-xs font-semibold uppercase tracking-[0.14em] text-brand-red"><FileText aria-hidden className="size-4" strokeWidth={1.75} /> Featured document</p>
            <h3 className="text-[clamp(1.4rem,3vw,1.9rem)]">{featured.title}</h3>
            <p className="mb-2 mt-3 max-w-[52ch] text-ink-soft">{featured.summary}</p>
            <p className="mb-6 text-[13.5px] text-ink-soft">{featured.pages} pages · PDF · {featured.size}</p>
            <Actions doc={featured} onPreview={() => setOpen(featured)} />
          </div>
        </article>
      </section>

      <section aria-labelledby="lga-lists">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="mb-4 flex items-center gap-2.5 font-[family-name:var(--font-heading)] text-xs font-semibold uppercase tracking-[0.16em] text-brand-green-dark"><span aria-hidden className="h-0.5 w-6 bg-brand-red" />Local government areas</p>
            <h2 id="lga-lists" className="text-[clamp(1.7rem,3.2vw,2.4rem)]">Ward coordinator lists</h2>
          </div>
          <div className="w-full sm:w-72">
            <label htmlFor="doc-q" className="mb-1.5 block font-[family-name:var(--font-heading)] text-[12.5px] font-semibold text-[#333]">Search by LGA or coordinator</label>
            <div className="relative">
              <Search aria-hidden className="pointer-events-none absolute left-3.5 top-3.5 size-5 text-[#888]" strokeWidth={1.75} />
              <input id="doc-q" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="e.g. Numan" className="h-12 w-full rounded-lg border border-[#d6d6d6] bg-white pl-11 pr-3.5 text-[15px] focus:border-brand-green focus:outline-none focus:ring-[3px] focus:ring-brand-green/15" />
            </div>
          </div>
        </div>
        <p aria-live="polite" className="mb-5 text-sm text-ink-soft">{shown.length} {shown.length === 1 ? "document" : "documents"}</p>
        {shown.length ? (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((d) => (
              <li key={d.slug}>
                <article className="flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-[#cfe8d3]">
                  <button type="button" onClick={() => setOpen(d)} aria-label={`Preview ${d.title}`} className="group relative block aspect-[4/3] overflow-hidden border-b border-line bg-muted">
                    <Image src={d.previews[0]!} alt="" fill sizes="(min-width:1024px) 370px, (min-width:640px) 45vw, 100vw" loading="lazy" className="object-cover object-[50%_92%] transition-transform duration-500 group-hover:scale-[1.03]" />
                  </button>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-lg">{d.title}</h3>
                    <p className="mt-1.5 text-[14.5px] text-ink-soft">
                      {d.coordinators?.map((c, i) => (
                        <span key={c.slug}>{i > 0 && <span aria-hidden> · </span>}<Link href={`/leadership/${c.slug}`} className="font-semibold text-ink hover:text-brand-green-dark">{c.name}</Link>{c.label && <span className="text-[12.5px]"> ({c.label})</span>}</span>
                      ))}
                    </p>
                    <ul className="mb-5 mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-ink-soft">
                      {d.wardCoordinators && <li>{d.wardCoordinators} ward coordinators</li>}
                      <li>{d.pages} pages</li>
                      <li>PDF · {d.size}</li>
                      {d.issued && <li>Issued {d.issued}</li>}
                    </ul>
                    <div className="mt-auto"><Actions doc={d} onPreview={() => setOpen(d)} compact /></div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        ) : (
          <p className="rounded-2xl border border-dashed border-[#cfd5cf] px-6 py-12 text-center text-ink-soft">No documents match your search.</p>
        )}
      </section>

      {open && <PreviewDialog doc={open} onClose={() => setOpen(null)} />}
    </>
  );
}
