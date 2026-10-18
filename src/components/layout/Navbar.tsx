"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { NAV } from "@/lib/site";
import { BrandLink } from "@/components/ui/Brand";
import { buttonClass } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  // Menu is "open" only for the path it was opened on, so navigation closes it without an effect.
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const close = () => {
    setOpenPath(null);
    btnRef.current?.focus();
  };

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenPath(null);
        btnRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-[76px] w-full max-w-[1160px] items-center justify-between px-5 sm:px-6">
        <BrandLink height={44} />

        <nav aria-label="Primary" className="hidden items-center gap-1.5 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={isActive(n.href) ? "page" : undefined}
              className={cn(
                "relative px-3.5 py-2 font-[family-name:var(--font-heading)] text-[14.5px] font-medium text-[#333] transition-colors duration-200 hover:text-brand-green-dark",
                "after:absolute after:inset-x-3.5 after:bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-brand-green after:transition-transform after:duration-300",
                isActive(n.href) && "text-brand-green-dark after:scale-x-100",
              )}
            >
              {n.label}
            </Link>
          ))}
          <Link href="/contact" className={buttonClass("primary", "ml-3.5 h-10 px-[18px] text-sm")}>
            Contact the Movement
          </Link>
        </nav>

        <button
          ref={btnRef}
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => (open ? close() : setOpenPath(pathname))}
          className="flex size-11 items-center justify-center rounded-lg border border-line bg-white lg:hidden"
        >
          {open ? <X aria-hidden className="size-5" strokeWidth={1.75} /> : <Menu aria-hidden className="size-5" strokeWidth={1.75} />}
        </button>
      </div>

      <nav
        id="mobile-nav"
        ref={panelRef}
        aria-label="Mobile"
        inert={!open}
        className={cn(
          "fixed inset-x-0 bottom-0 top-[76px] z-40 flex flex-col overflow-y-auto bg-white px-5 pb-10 pt-4 transition-[opacity,transform,visibility] duration-300 ease-[var(--ease-eem)] lg:hidden",
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0",
        )}
      >
        {NAV.map((n) => (
          <Link
            key={n.href}
            href={n.href}
            aria-current={isActive(n.href) ? "page" : undefined}
            onClick={() => setOpenPath(null)}
            className={cn(
              "flex items-center justify-between border-b border-line py-[18px] font-[family-name:var(--font-heading)] text-lg font-semibold",
              isActive(n.href) && "text-brand-green-dark",
            )}
          >
            {n.label}
            <ArrowRight aria-hidden className="size-[18px] text-ink-soft" strokeWidth={1.75} />
          </Link>
        ))}
        <Link href="/contact" onClick={() => setOpenPath(null)} className={buttonClass("primary", "mt-7")}>
          Contact the Movement
        </Link>
      </nav>
    </header>
  );
}
