import { Check, Lightbulb, Quote } from "lucide-react";
import { headingId, type Block } from "@/content/blog";
import { RichText } from "./RichText";

export { RichText };

/** One content block (shared by blog posts and legal pages) */
export function ArticleBlock({ block, h2Prefix }: { block: Block; h2Prefix?: string }) {
  switch (block.type) {
    case "h2":
      return <h2 id={headingId(block.text)} className="scroll-mt-32">{h2Prefix}{block.text}</h2>;
    case "h3":
      return <h3 className="mt-7 mb-2 text-lg font-bold text-heading">{block.text}</h3>;
    case "ul":
      return (
        <ul className="!list-none !pl-0">
          {block.items.map((i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-1.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600"><Check className="size-3.5" strokeWidth={3} /></span>
              <span><RichText text={i} /></span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="my-6 flex flex-col gap-3">
          {block.items.map((i, n) => (
            <li key={i} className="flex gap-4 rounded-2xl border border-line bg-card p-4">
              <span className="bg-brand-gradient inline-flex size-8 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold text-white">{n + 1}</span>
              <span className="pt-0.5 text-body"><RichText text={i} /></span>
            </li>
          ))}
        </ol>
      );
    case "tip":
      return (
        <aside className="my-8 flex gap-4 rounded-2xl border border-glow-400/30 bg-glow-100/50 p-5">
          <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-glow-400 text-on-warm"><Lightbulb className="size-5" /></span>
          <div>
            <p className="font-display font-bold text-heading">{block.title}</p>
            <p className="mt-1 !mb-0 text-[0.98rem]"><RichText text={block.text} /></p>
          </div>
        </aside>
      );
    case "quote":
      return (
        <blockquote className="relative my-10 overflow-hidden rounded-2xl bg-navy-radial p-7 pl-16 text-white sm:p-9 sm:pl-20">
          <Quote className="absolute top-7 left-6 size-8 text-glow-400 sm:left-8" aria-hidden />
          <p className="!mb-0 font-display text-xl leading-snug font-semibold !text-white sm:text-2xl">{block.text}</p>
        </blockquote>
      );
    case "table":
      return (
        <figure className="my-8">
          <div className="overflow-x-auto rounded-2xl border border-line">
            <table className="w-full min-w-[32rem] text-left text-sm">
              <thead className="bg-navy-900 text-white">
                <tr>{block.head.map((h) => <th key={h} className="px-5 py-3.5 font-semibold">{h}</th>)}</tr>
              </thead>
              <tbody>
                {block.rows.map((r, i) => (
                  <tr key={i} className="border-t border-line odd:bg-card even:bg-surface">
                    {r.map((c, j) => <td key={j} className={`px-5 py-3.5 ${j === 0 ? "font-semibold text-heading" : "text-body"}`}><RichText text={c} /></td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.note && <figcaption className="mt-3 text-sm text-muted"><RichText text={block.note} /></figcaption>}
        </figure>
      );
    default:
      return <p><RichText text={block.text} /></p>;
  }
}
