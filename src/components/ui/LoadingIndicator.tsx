import Image from "next/image";

export function LoadingIndicator() {
  return (
    <div role="status" aria-live="polite" className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-white">
      <Image src="/eem-logo.png" alt="Eric Enoch Movement" width={170} height={93} priority className="eem-breathe h-auto w-[170px]" />
      <div aria-hidden className="eem-bar h-[3px] w-[120px] overflow-hidden rounded bg-[#e9efe9]" />
      <span className="sr-only">Loading</span>
    </div>
  );
}
