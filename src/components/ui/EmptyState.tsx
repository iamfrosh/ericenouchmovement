import type { LucideIcon } from "lucide-react";

export function EmptyState({ icon: Icon, title, text }: { icon: LucideIcon; title: string; text: string }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-[#cfd5cf] bg-white px-7 py-14 text-center">
      <span className="flex size-[46px] items-center justify-center rounded-[10px] bg-brand-green-tint text-brand-green-dark">
        <Icon aria-hidden className="size-[22px]" strokeWidth={1.75} />
      </span>
      <h3 className="text-lg">{title}</h3>
      <p className="max-w-[46ch] text-ink-soft">{text}</p>
    </div>
  );
}
