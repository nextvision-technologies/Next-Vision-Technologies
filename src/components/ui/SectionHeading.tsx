import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  text?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  as?: "h1" | "h2";
};

export function SectionHeading({ eyebrow, title, text, align = "center", tone = "light", as: H = "h2" }: Props) {
  const dark = tone === "dark";
  return (
    <div className={`flex flex-col gap-3 ${align === "center" ? "mx-auto items-center text-center" : ""} max-w-2xl`}>
      {eyebrow && (
        <span
          className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] ${dark ? "text-glow-400" : "text-brand-600"}`}
        >
          <span aria-hidden className="grid grid-cols-2 gap-0.5">
            <i className="size-1 rounded-[1px] bg-current opacity-50" />
            <i className="size-1 rounded-[1px] bg-current" />
            <i className="size-1 rounded-[1px] bg-current" />
            <i className="size-1 rounded-[1px] bg-current opacity-30" />
          </span>
          {eyebrow}
        </span>
      )}
      <H className={`text-3xl font-bold leading-tight sm:text-4xl ${dark ? "text-white" : "text-navy-900"}`}>{title}</H>
      {text && <p className={`text-base leading-relaxed sm:text-lg ${dark ? "text-white/70" : "text-muted"}`}>{text}</p>}
    </div>
  );
}
