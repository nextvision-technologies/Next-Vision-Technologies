import Link from "next/link";
import type { ReactNode } from "react";

const defaultLink = "font-semibold text-brand-600 underline decoration-brand-600/30 underline-offset-4 transition hover:decoration-brand-600";

/** Renders inline [text](href) links and **bold** inside a content string. Internal links use next/link. */
export function RichText({ text, linkClassName = defaultLink }: { text: string; linkClassName?: string }) {
  const out: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[3]) {
      out.push(<strong key={k++}>{m[3]}</strong>);
    } else {
      const [, label, href] = m;
      if (href.startsWith("/")) out.push(<Link key={k++} href={href} className={linkClassName}>{label}</Link>);
      else out.push(<a key={k++} href={href} className={linkClassName} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{label}</a>);
    }
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}
