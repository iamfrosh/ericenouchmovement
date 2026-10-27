"use client";
import { useEffect, useRef, useState } from "react";
import { Play, X } from "lucide-react";
import type { OutreachVideo } from "@/lib/videos-data";

function canAutoplay(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return !conn?.saveData;
}

function VideoCard({ video, onOpen }: { video: OutreachVideo; onOpen: () => void }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.muted = true; // required for autoplay on iOS and Android
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting && canAutoplay()) void el.play().catch(() => undefined);
        else el.pause();
      },
      { threshold: 0.55 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Watch full video with sound: ${video.title}, ${video.spokenDuration}`}
      className="group relative mx-auto block aspect-[9/16] w-full max-w-[360px] overflow-hidden rounded-2xl border border-line bg-[#0b1f10] text-left shadow-sm"
    >
      <video
        ref={ref}
        src={video.preview}
        poster={video.poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
        tabIndex={-1}
        className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
      />
      <span aria-hidden className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/70 to-transparent" />
      <span className="absolute left-3.5 top-3.5 rounded-md bg-white/95 px-2.5 py-1 font-[family-name:var(--font-heading)] text-[11px] font-bold uppercase tracking-wider text-brand-green-dark">{video.tag}</span>
      <span className="absolute right-3.5 top-3.5 rounded-md bg-black/60 px-2 py-1 text-xs font-semibold text-white">{video.duration}</span>
      <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 text-white">
        <span className="min-w-0">
          <span className="block font-[family-name:var(--font-heading)] text-[15px] font-bold leading-snug">{video.title}</span>
          <span className="mt-0.5 block text-[13px] text-white/85">Tap to watch with sound</span>
        </span>
        <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white text-brand-green-dark shadow-lg transition-transform duration-200 group-hover:scale-105">
          <Play aria-hidden className="ml-0.5 size-5 fill-current" strokeWidth={1.75} />
        </span>
      </span>
    </button>
  );
}

function PlayerDialog({ video, onClose }: { video: OutreachVideo; onClose: () => void }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const vidRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    boxRef.current?.querySelector<HTMLElement>("button")?.focus();
    const v = vidRef.current;
    void v?.play().catch(() => undefined); // user just tapped, so sound is allowed; controls remain if blocked
    return () => {
      document.body.style.overflow = "";
      v?.pause();
      prev?.focus();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && boxRef.current) {
        const f = [...boxRef.current.querySelectorAll<HTMLElement>("button, video[controls]")];
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[95] flex items-center justify-center bg-black/90 p-3 sm:p-6" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div ref={boxRef} role="dialog" aria-modal="true" aria-label={video.title} className="relative flex max-h-full w-full max-w-[420px] flex-col">
        <div className="mb-2 flex items-center justify-between gap-3 text-white">
          <p className="truncate font-[family-name:var(--font-heading)] text-sm font-semibold">{video.title}</p>
          <button type="button" aria-label="Close video" onClick={onClose} className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white/95 text-ink"><X aria-hidden className="size-5" strokeWidth={1.75} /></button>
        </div>
        <video
          ref={vidRef}
          src={video.src}
          poster={video.poster}
          controls
          playsInline
          preload="auto"
          controlsList="nodownload"
          className="max-h-[calc(100svh-96px)] w-full rounded-xl bg-black object-contain"
          style={{ aspectRatio: `${video.width} / ${video.height}` }}
        >
          Your browser cannot play this video.
        </video>
      </div>
    </div>
  );
}

export function OutreachVideos({ videos }: { videos: OutreachVideo[] }) {
  const [open, setOpen] = useState<OutreachVideo | null>(null);
  if (!videos.length) return null;
  return (
    <section aria-labelledby="videos-h" className="mb-16">
      <div className="mb-8">
        <p className="mb-4 flex items-center gap-2.5 font-[family-name:var(--font-heading)] text-xs font-semibold uppercase tracking-[0.16em] text-brand-green-dark"><span aria-hidden className="h-0.5 w-6 bg-brand-red" />Videos</p>
        <h2 id="videos-h" className="text-[clamp(1.7rem,3.2vw,2.4rem)]">A few videos from our outreach</h2>
        <p className="mt-3 max-w-[56ch] text-ink-soft">Previews play silently as you scroll. Tap a video to watch it in full, with sound.</p>
      </div>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((v) => (
          <li key={v.id}><VideoCard video={v} onOpen={() => setOpen(v)} /></li>
        ))}
      </ul>
      {open && <PlayerDialog video={open} onClose={() => setOpen(null)} />}
    </section>
  );
}
