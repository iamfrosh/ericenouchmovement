import Image from "next/image";
import Link from "next/link";

export function BrandLogo({ height = 46, priority = false }: { height?: number; priority?: boolean }) {
  const width = Math.round(height * (841 / 461));
  return (
    <Image src="/eem-logo.png" alt="Eric Enoch Movement logo" width={width} height={height} priority={priority} style={{ height, width: "auto" }} />
  );
}

export function BrandLink({ height = 46 }: { height?: number }) {
  return (
    <Link href="/" aria-label="Eric Enoch Movement home" className="inline-block">
      <BrandLogo height={height} priority />
    </Link>
  );
}
