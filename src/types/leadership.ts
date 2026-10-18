export const LEADERSHIP_CATEGORIES = {
  "national-leader": "Movement Founder / National Leader",
  "national-executive": "National Executive",
  executive: "Executive",
  state: "State Leadership",
  senatorial: "Senatorial District Coordinator",
  lga: "Local Government Coordinator",
  ward: "Ward Coordinator",
  other: "Other Appointed Leaders",
} as const;

export type LeadershipCategory = keyof typeof LEADERSHIP_CATEGORIES;

export interface Leader {
  slug: string;
  name: string;
  role: string;
  category: LeadershipCategory;
  /** Extra categories this person also appears under (e.g. an executive who is also an LGA coordinator). */
  alsoIn?: LeadershipCategory[];
  state?: string;
  lga?: string;
  /** Label shown on the org chart when it differs from `lga` (e.g. "Mayo Belwa 2"). */
  areaLabel?: string;
  order: number;
  photo?: string;
  photoAlt?: string;
  bio?: string;
  contactEmail?: string;
}
