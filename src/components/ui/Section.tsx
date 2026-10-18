import { cn } from "@/lib/utils";
import { Container } from "./Container";

export function Section({ alt, className, children }: { alt?: boolean; className?: string; children: React.ReactNode }) {
  return (
    <section className={cn("py-16 sm:py-24", alt && "border-y border-line bg-muted", className)}>
      <Container>{children}</Container>
    </section>
  );
}
