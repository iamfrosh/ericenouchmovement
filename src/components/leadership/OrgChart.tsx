import Link from "next/link";
import { EXECUTIVES, LGA_COORDINATORS } from "@/lib/leaders-data";
import { FOUNDER } from "@/lib/founder";
import type { Leader } from "@/types/leadership";

const find = (slug: string): Leader => EXECUTIVES.find((l) => l.slug === slug)!;
const short = (role: string) => role.split(" · ")[0]!.replace(/^Assistant /, "Asst. ");

function Node({ leader, label, className }: { leader: Leader; label: string; className: string }) {
  return (
    <Link href={`/leadership/${leader.slug}`} className={`org-node ${className}`}>
      <small>{label}</small>
      <strong>{leader.name}</strong>
    </Link>
  );
}

/** Organisational structure drawn from the movement's confirmed roster. */
export function OrgChart() {
  const adviser = find("yegoshibe-jonah");
  const row = ["prince-seriluh-ibrahim-suleman", "zainab-levi", "dishon-edison", "wusa-john-kenan"].map(find);
  const columns = [0, 1, 2].map((c) => LGA_COORDINATORS.filter((_, i) => i % 3 === c));

  return (
    <figure className="org" aria-label="Organisational structure of Eric Enoch Movement">
      <div className="org-top">
        <div className="org-founder">
          <Node leader={FOUNDER} label="Chairman / Founder" className="founder" />
        </div>
        <div className="org-adviser">
          <div className="org-line" aria-hidden />
          <Node leader={adviser} label="Adviser" className="adviser" />
        </div>
      </div>
      <div className="org-line" aria-hidden />
      <div className="org-row4">
        {row.map((l) => (
          <div key={l.slug} className="org-child">
            <Node leader={l} label={short(l.role)} className="exec" />
          </div>
        ))}
      </div>

      <div className="org-line mt-10" aria-hidden />
      <div className="mx-auto w-full max-w-md">
        <div className="org-node head"><strong>Local Government Area Coordinators</strong></div>
      </div>
      <div className="org-line" aria-hidden />
      <div className="org-lga">
        {columns.map((col, ci) => (
          <div key={ci} className="org-col">
            <div className="org-chain">
              {col.map((l, i) => (
                <div key={l.slug}>
                  {i > 0 && <div className="org-line" aria-hidden />}
                  <Node leader={l} label={l.areaLabel ?? l.lga ?? ""} className="" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </figure>
  );
}
