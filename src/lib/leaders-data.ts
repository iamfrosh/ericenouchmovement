import type { Leader } from "@/types/leadership";
import { FOUNDER } from "@/lib/founder";

/**
 * Official leadership list supplied by the movement.
 * Add `photo` ("/leaders/<slug>.jpg") and `bio` per person as they are provided.
 * State is inferred from the LGAs and should be confirmed by the movement.
 */
const STATE = "Adamawa";
const face = (slug: string, name: string) => ({ photo: `/leaders/${slug}.jpg`, photoAlt: `Portrait of ${name}` });

export const EXECUTIVES: Leader[] = [
  { slug: "yegoshibe-jonah", name: "Yegoshibe Jonah", role: "Adviser", category: "executive", order: 1, ...face("yegoshibe-jonah", "Yegoshibe Jonah") },
  { slug: "prince-seriluh-ibrahim-suleman", name: "Prince Seriluh Ibrahim Suleman", role: "Zonal Coordinator", category: "executive", order: 2, ...face("prince-seriluh-ibrahim-suleman", "Prince Seriluh Ibrahim Suleman") },
  { slug: "zainab-levi", name: "Zainab Levi", role: "Assistant Zonal Coordinator · LGA Coordinator, Demsa", category: "executive", alsoIn: ["lga"], lga: "Demsa", state: STATE, order: 3, ...face("zainab-levi", "Zainab Levi") },
  { slug: "dishon-edison", name: "Dishon Edison", role: "Head of Media", category: "executive", order: 4 },
  { slug: "wusa-john-kenan", name: "Wusa John Kenan", role: "Videographer · LGA Coordinator, Guyuk", category: "executive", alsoIn: ["lga"], lga: "Guyuk", state: STATE, order: 5, ...face("wusa-john-kenan", "Wusa John Kenan") },
];

const lga = (slug: string, name: string, area: string, order: number, areaLabel?: string): Leader => ({
  slug, name, role: `Local Government Coordinator, ${areaLabel ?? area}`, category: "lga", lga: area, areaLabel, state: STATE, order, ...face(slug, name),
});

const exec = (slug: string) => EXECUTIVES.find((l) => l.slug === slug)!;

/** Chart order: row by row, three columns (index % 3 = column). */
export const LGA_COORDINATORS: Leader[] = [
  lga("kennedy-bature", "Kennedy Bature", "Mayo Belwa", 10),
  exec("wusa-john-kenan"),
  lga("monday-bright-sapta", "Monday Bright Sapta", "Lamurde", 12),
  exec("zainab-levi"),
  lga("danjuma-gingiru", "Danjuma Gingiru", "Numan", 14),
  lga("jamilu-ibrahim", "Jamilu Ibrahim", "Shelleng", 15),
  lga("adamu-hamzat-adamu", "Adamu Hamzat Adamu", "Toungo", 16),
  lga("mohammed-adamu", "Mohammed Adamu", "Ganye", 17),
  lga("haruna-samuel", "Haruna Samuel", "Jada", 18),
  lga("monday-jonah", "Monday Jonah", "Mayo Belwa", 19, "Mayo Belwa 2"),
];

export const LOCAL_LEADERS: Leader[] = [
  FOUNDER,
  ...EXECUTIVES,
  ...LGA_COORDINATORS.filter((l) => l.category === "lga"),
];
