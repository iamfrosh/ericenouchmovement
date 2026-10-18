import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";

export function Hero() {
  return (
    <section className="py-10 sm:py-[72px] lg:pb-24">
      <Container className="grid items-center gap-10 lg:grid-cols-[1.1fr_.9fr] lg:gap-16">
        <div>
          <Eyebrow>Eric Enoch Movement</Eyebrow>
          <h1 className="text-[clamp(2.3rem,5.4vw,4rem)] font-extrabold">
            Empowering young people to <span className="text-brand-green-dark">shape the future.</span>
          </h1>
          <p className="mb-9 mt-6 max-w-[58ch] text-lg text-ink-soft">
            A movement committed to political awareness, responsible citizenship, democratic participation and accountability.
          </p>
          <div className="flex flex-col gap-3.5 sm:flex-row">
            <ButtonLink href="/about">Discover Our Mission</ButtonLink>
            <ButtonLink href="/leadership" variant="secondary" arrow={false}>Meet Our Leadership</ButtonLink>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-7 rounded-2xl border border-line bg-gradient-to-b from-white to-muted px-6 py-10 sm:px-9 sm:py-12">
          <Image src="/eem-logo.png" alt="Eric Enoch Movement logo" width={420} height={230} priority className="h-auto w-[78%]" />
          <div aria-hidden className="h-[3px] w-16 rounded bg-gradient-to-r from-brand-green from-60% to-brand-red to-60%" />
          <ul className="flex gap-5 font-[family-name:var(--font-heading)] text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">
            {["Educate", "Empower", "Participate"].map((w) => (
              <li key={w} className="flex items-center gap-2"><span aria-hidden className="size-1.5 rounded-full bg-brand-green" />{w}</li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
