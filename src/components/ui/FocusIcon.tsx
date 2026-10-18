import { Award, BookOpen, Eye, Scale, Users, Vote } from "lucide-react";

const map = { book: BookOpen, eye: Eye, users: Users, award: Award, vote: Vote, scale: Scale } as const;
export type FocusIconName = keyof typeof map;

export function FocusIcon({ name }: { name: FocusIconName }) {
  const Icon = map[name];
  return (
    <span className="mb-5 flex size-[46px] items-center justify-center rounded-[10px] bg-brand-green-tint text-brand-green-dark">
      <Icon aria-hidden className="size-[22px]" strokeWidth={1.75} />
    </span>
  );
}
