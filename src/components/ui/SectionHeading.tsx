export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 flex items-center gap-2.5 font-[family-name:var(--font-heading)] text-xs font-semibold uppercase tracking-[0.16em] text-brand-green-dark">
      <span aria-hidden className="h-0.5 w-6 bg-brand-red" />
      {children}
    </p>
  );
}

export function SectionHeading({ eyebrow, title, action }: { eyebrow: string; title: string; action?: React.ReactNode }) {
  return (
    <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="text-[clamp(1.7rem,3.2vw,2.4rem)]">{title}</h2>
      </div>
      {action}
    </div>
  );
}

export function PageHeader({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <section className="border-b border-line bg-gradient-to-b from-white to-muted py-14 sm:py-[72px]">
      <div className="mx-auto w-full max-w-[1160px] px-5 sm:px-6">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="text-[clamp(2rem,4.4vw,3.1rem)] font-extrabold">{title}</h1>
        <p className="mt-4 max-w-[58ch] text-lg text-ink-soft">{text}</p>
      </div>
    </section>
  );
}
