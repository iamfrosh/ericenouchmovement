export const SITE = {
  name: "Eric Enoch Movement",
  short: "EEM",
  description:
    "Eric Enoch Movement (EEM) promotes political awareness, civic education, youth empowerment, democratic participation and accountability.",
};

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/leadership", label: "Our Leadership" },
  { href: "/news", label: "News & Updates" },
  { href: "/gallery", label: "Gallery" },
  { href: "/documents", label: "Documents" },
  { href: "/contact", label: "Contact" },
] as const;

// Official wording. Do not edit without approval from the movement.
export const VISION =
  "To raise a generation of politically conscious, informed, and responsible young people who understand governance, know their rights, demand accountability, and recognise their power to shape the future through democratic participation.";

export const MISSION =
  "To educate, empower, and encourage young people to participate meaningfully in politics by equipping them with political knowledge, civic awareness, leadership skills, and an understanding of their rights and responsibilities. We are committed to promoting active citizenship and helping young people hold elected leaders accountable through democratic processes.";

export const FOCUS_AREAS = [
  { icon: "book", title: "Political Education", text: "Building a clear understanding of governance, institutions and how decisions are made." },
  { icon: "eye", title: "Civic Awareness", text: "Helping young people know their rights, responsibilities and the issues that affect them." },
  { icon: "users", title: "Youth Empowerment", text: "Encouraging young people to take part meaningfully in political life." },
  { icon: "award", title: "Leadership Development", text: "Equipping the next generation with leadership skills for public service." },
  { icon: "vote", title: "Democratic Participation", text: "Promoting informed participation through democratic processes." },
  { icon: "scale", title: "Accountability & Active Citizenship", text: "Supporting citizens to hold elected leaders accountable." },
] as const;

// PROPOSED values. Must be confirmed by the movement before launch.
export const PROPOSED_VALUES = [
  { title: "Integrity", text: "Honest and principled conduct." },
  { title: "Accountability", text: "Answerable actions, from leaders and members alike." },
  { title: "Civic responsibility", text: "Active care for community and country." },
  { title: "Inclusion", text: "Room for every young voice." },
  { title: "Democratic participation", text: "Meaningful engagement in democratic processes." },
  { title: "Leadership", text: "Preparing young people to serve." },
] as const;

export const CONTACT = {
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "",
  address: process.env.NEXT_PUBLIC_CONTACT_ADDRESS ?? "",
};

export const SOCIALS = [
  { label: "Facebook", href: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK ?? "" },
  { label: "X", href: process.env.NEXT_PUBLIC_SOCIAL_X ?? "" },
  { label: "Instagram", href: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM ?? "" },
  { label: "YouTube", href: process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE ?? "" },
].filter((s) => s.href);
