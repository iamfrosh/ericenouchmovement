export interface OfficialDocument {
  slug: string;
  title: string;
  summary: string;
  /** LGA name for ward-coordinator lists. */
  area?: string;
  coordinators?: { name: string; slug: string; label?: string }[];
  wardCoordinators?: number;
  pages: number;
  size: string;
  issued?: string;
  file: string;
  previews: string[];
}

const doc = (slug: string) => ({ file: `/documents/${slug}.pdf`, previews: [`/documents/previews/${slug}-p1.jpg`] });

export const FEATURED_DOCUMENT: OfficialDocument = {
  slug: "strategic-hub",
  title: "Strategic Hub & LGA Coordinators",
  summary: "The movement's structure chart, the list of executives and LGA coordinators, and the appointment letters, in one document.",
  pages: 24,
  size: "4.1 MB",
  file: "/documents/strategic-hub.pdf",
  previews: ["/documents/previews/strategic-hub-p1.jpg", "/documents/previews/strategic-hub-p2.jpg"],
};

const issued = "26 September 2026";

export const LGA_DOCUMENTS: OfficialDocument[] = [
  { slug: "mayo-belwa", area: "Mayo Belwa", title: "Mayo Belwa LGA", summary: "Executives and ward coordinators, with appointment letters.", coordinators: [{ name: "Kennedy Bature", slug: "kennedy-bature", label: "Coordinator 1" }, { name: "Monday Jonah", slug: "monday-jonah", label: "Coordinator 2" }], wardCoordinators: 12, pages: 13, size: "1.8 MB", issued, ...doc("mayo-belwa") },
  { slug: "guyuk", area: "Guyuk", title: "Guyuk LGA", summary: "Executives and ward coordinators, with appointment letters.", coordinators: [{ name: "Wusa John Kenan", slug: "wusa-john-kenan" }], wardCoordinators: 10, pages: 11, size: "1.5 MB", issued, ...doc("guyuk") },
  { slug: "lamurde", area: "Lamurde", title: "Lamurde LGA", summary: "Executives and ward coordinators, with appointment letters.", coordinators: [{ name: "Monday Bright Sapta", slug: "monday-bright-sapta" }], wardCoordinators: 11, pages: 12, size: "1.7 MB", issued, ...doc("lamurde") },
  { slug: "demsa", area: "Demsa", title: "Demsa LGA", summary: "Executives and ward coordinators, with appointment letters.", coordinators: [{ name: "Zainab Levi", slug: "zainab-levi" }], wardCoordinators: 10, pages: 11, size: "1.5 MB", issued, ...doc("demsa") },
  { slug: "numan", area: "Numan", title: "Numan LGA", summary: "Executives and ward coordinators, with appointment letters.", coordinators: [{ name: "Danjuma Gingiru", slug: "danjuma-gingiru" }], wardCoordinators: 10, pages: 11, size: "1.5 MB", issued, ...doc("numan") },
  { slug: "shelleng", area: "Shelleng", title: "Shelleng LGA", summary: "Executives and ward coordinators, with appointment letters.", coordinators: [{ name: "Jamilu Ibrahim", slug: "jamilu-ibrahim" }], wardCoordinators: 10, pages: 11, size: "1.5 MB", issued, ...doc("shelleng") },
  { slug: "toungo", area: "Toungo", title: "Toungo LGA", summary: "Executives and ward coordinators, with appointment letters.", coordinators: [{ name: "Adamu Hamzat Adamu", slug: "adamu-hamzat-adamu" }], wardCoordinators: 10, pages: 11, size: "1.5 MB", issued, ...doc("toungo") },
  { slug: "ganye", area: "Ganye", title: "Ganye LGA", summary: "Executives and ward coordinators, with appointment letters.", coordinators: [{ name: "Mohammed Adamu", slug: "mohammed-adamu" }], wardCoordinators: 10, pages: 11, size: "1.5 MB", issued, ...doc("ganye") },
  { slug: "jada", area: "Jada", title: "Jada LGA", summary: "Executives and ward coordinators, with appointment letters.", coordinators: [{ name: "Haruna Samuel", slug: "haruna-samuel" }], wardCoordinators: 11, pages: 12, size: "1.7 MB", issued, ...doc("jada") },
];
