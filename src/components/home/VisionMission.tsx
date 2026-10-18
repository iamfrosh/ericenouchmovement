import { Eye, Landmark } from "lucide-react";
import { MISSION, VISION } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";

export function VisionMission() {
  return (
    <Reveal>
      <div className="grid overflow-hidden rounded-2xl border border-line bg-white lg:grid-cols-2">
        <section aria-labelledby="vision" className="px-7 py-10 sm:p-12">
          <h2 id="vision" className="flex items-center gap-3 text-[13px] font-bold uppercase tracking-[0.14em] text-brand-green-dark">
            <Eye aria-hidden className="size-5" strokeWidth={1.75} /> Our Vision
          </h2>
          <blockquote className="mt-5 border-l-[3px] border-brand-green pl-5 font-[family-name:var(--font-heading)] text-[1.1rem] font-medium leading-relaxed text-[#222] sm:text-[1.2rem]">{VISION}</blockquote>
        </section>
        <section aria-labelledby="mission" className="border-t border-line bg-muted px-7 py-10 sm:p-12 lg:border-l lg:border-t-0">
          <h2 id="mission" className="flex items-center gap-3 text-[13px] font-bold uppercase tracking-[0.14em] text-brand-red">
            <Landmark aria-hidden className="size-5" strokeWidth={1.75} /> Our Mission
          </h2>
          <blockquote className="mt-5 border-l-[3px] border-brand-red pl-5 font-[family-name:var(--font-heading)] text-[1.1rem] font-medium leading-relaxed text-[#222] sm:text-[1.2rem]">{MISSION}</blockquote>
        </section>
      </div>
    </Reveal>
  );
}
