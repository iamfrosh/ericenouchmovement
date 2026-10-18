import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary";
const base =
  "group inline-flex h-12 items-center justify-center gap-2.5 rounded-lg border px-6 font-[family-name:var(--font-heading)] text-[15px] font-semibold transition-colors duration-200";
const variants: Record<Variant, string> = {
  primary: "border-transparent bg-brand-green-dark text-white hover:bg-[#0b6a19]",
  secondary: "border-[#d6d6d6] bg-white text-ink hover:border-brand-green hover:text-brand-green-dark",
};

export function buttonClass(variant: Variant = "primary", className?: string) {
  return cn(base, variants[variant], className);
}

export function ButtonLink({
  href,
  variant = "primary",
  arrow = true,
  className,
  children,
}: {
  href: string;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={buttonClass(variant, className)}>
      {children}
      {arrow && <ArrowRight aria-hidden className="size-[18px] transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={1.75} />}
    </Link>
  );
}

export function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="group inline-flex items-center gap-2 font-[family-name:var(--font-heading)] text-[15px] font-semibold text-brand-green-dark">
      {children}
      <ArrowRight aria-hidden className="size-[18px] transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={1.75} />
    </Link>
  );
}
