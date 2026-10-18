import { FOCUS_AREAS } from "@/lib/site";
import { FocusIcon } from "@/components/ui/FocusIcon";
import { Reveal } from "@/components/ui/Reveal";

export function FocusAreas() {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {FOCUS_AREAS.map((f) => (
        <li key={f.title}>
          <Reveal className="h-full">
            <article className="h-full rounded-xl border border-line bg-white p-7 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-[#cfe8d3] hover:shadow-[0_10px_30px_-18px_rgba(0,0,0,.18)]">
              <FocusIcon name={f.icon} />
              <h3 className="text-[1.1rem]">{f.title}</h3>
              <p className="mt-2.5 text-[15px] text-ink-soft">{f.text}</p>
            </article>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
