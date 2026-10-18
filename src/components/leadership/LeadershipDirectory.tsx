"use client";
import { useMemo, useState } from "react";
import { SearchX, Users } from "lucide-react";
import type { Leader } from "@/types/leadership";
import { EmptyState } from "@/components/ui/EmptyState";
import { LeaderCard } from "./LeaderCard";
import { LeadershipFilters, type Filters } from "./LeadershipFilters";

const uniq = (a: (string | undefined)[]) => [...new Set(a.filter((x): x is string => !!x))].sort();

export function LeadershipDirectory({ leaders }: { leaders: Leader[] }) {
  const [f, setF] = useState<Filters>({ q: "", category: "", state: "", lga: "" });

  const options = useMemo(() => {
    // LGA options narrow to the selected state.
    const scoped = f.state ? leaders.filter((l) => l.state === f.state) : leaders;
    return { categories: uniq(leaders.flatMap((l) => [l.category, ...(l.alsoIn ?? [])])), states: uniq(leaders.map((l) => l.state)), lgas: uniq(scoped.map((l) => l.lga)) };
  }, [leaders, f.state]);

  const results = useMemo(() => {
    const q = f.q.trim().toLowerCase();
    return leaders.filter((l) => (!q || l.name.toLowerCase().includes(q)) && (!f.category || l.category === f.category || !!l.alsoIn?.includes(f.category as Leader["category"])) && (!f.state || l.state === f.state) && (!f.lga || l.lga === f.lga));
  }, [leaders, f]);

  if (!leaders.length) {
    return <EmptyState icon={Users} title="Leadership directory coming soon" text="Verified leaders and coordinators will be listed here, searchable by name, category, state and local government area." />;
  }
  return (
    <div>
      <LeadershipFilters value={f} onChange={(n) => setF(n.state !== f.state ? { ...n, lga: "" } : n)} {...options} />
      <p aria-live="polite" className="mb-5 text-sm text-ink-soft">{results.length} {results.length === 1 ? "leader" : "leaders"}</p>
      {results.length ? (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{results.map((l) => <li key={l.slug}><LeaderCard leader={l} /></li>)}</ul>
      ) : (
        <EmptyState icon={SearchX} title="No matches" text="Try a different name or clear the filters." />
      )}
    </div>
  );
}
