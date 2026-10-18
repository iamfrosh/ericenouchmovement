import type { PortableBlock, PortableSpan } from "@/types/news";

function safeHref(href?: string) {
  return href && /^(https?:|mailto:|\/)/i.test(href) ? href : undefined;
}

function Spans({ block }: { block: PortableBlock }) {
  return (
    <>
      {block.children.map((s: PortableSpan, i) => {
        let node: React.ReactNode = s.text;
        for (const m of s.marks ?? []) {
          if (m === "strong") node = <strong>{node}</strong>;
          else if (m === "em") node = <em>{node}</em>;
          else {
            const def = block.markDefs?.find((d) => d._key === m);
            const href = def?._type === "link" ? safeHref(def.href) : undefined;
            if (href) node = <a href={href} className="text-brand-green-dark underline underline-offset-4" rel="noopener noreferrer">{node}</a>;
          }
        }
        return <span key={s._key ?? i}>{node}</span>;
      })}
    </>
  );
}

/** Renders Sanity Portable Text (text blocks only) without dangerouslySetInnerHTML. */
export function ArticleContent({ blocks }: { blocks: PortableBlock[] }) {
  const out: React.ReactNode[] = [];
  let list: { type: "bullet" | "number"; items: PortableBlock[] } | null = null;
  const flush = () => {
    if (!list) return;
    const Tag = list.type === "bullet" ? "ul" : "ol";
    out.push(<Tag key={`l${out.length}`} className={`my-5 space-y-2 pl-6 ${list.type === "bullet" ? "list-disc" : "list-decimal"}`}>{list.items.map((b, i) => <li key={b._key ?? i}><Spans block={b} /></li>)}</Tag>);
    list = null;
  };
  blocks.forEach((b, i) => {
    if (b._type !== "block") return;
    if (b.listItem) {
      if (list && list.type !== b.listItem) flush();
      list ??= { type: b.listItem, items: [] };
      list.items.push(b);
      return;
    }
    flush();
    const key = b._key ?? `b${i}`;
    if (b.style === "h2") out.push(<h2 key={key} className="mb-3 mt-10 text-2xl"><Spans block={b} /></h2>);
    else if (b.style === "h3") out.push(<h3 key={key} className="mb-2 mt-8 text-xl"><Spans block={b} /></h3>);
    else if (b.style === "blockquote") out.push(<blockquote key={key} className="my-6 border-l-[3px] border-brand-green pl-5 text-lg italic"><Spans block={b} /></blockquote>);
    else out.push(<p key={key} className="my-5"><Spans block={b} /></p>);
  });
  flush();
  return <div className="max-w-[68ch] text-[1.0625rem] leading-[1.8] text-[#2b2b2b]">{out}</div>;
}
