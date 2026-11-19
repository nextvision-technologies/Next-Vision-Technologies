import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";

type Crumb = { label: string; href?: string };

/** Indigo page header with breadcrumb, used on every inner page. A thin logo-gradient rule marks its bottom edge. */
export function PageHero({ title, text, crumbs, eyebrow, children }: { title: ReactNode; text?: ReactNode; crumbs: Crumb[]; eyebrow?: string; children?: ReactNode }) {
  return (
    <section className="section-dark relative overflow-hidden text-white">
      <PixelCluster className="absolute top-6 right-[6%] hidden w-28 md:block" />
      <span className="bg-logo-gradient absolute inset-x-0 bottom-0 h-1" aria-hidden />
      <div className="container-page relative flex flex-col gap-3.5 py-10 sm:py-14">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/60">
            {[{ label: "Home", href: "/" }, ...crumbs].map((c, i, arr) => (
              <li key={c.label} className="flex items-center gap-1.5">
                {c.href && i < arr.length - 1 ? <Link href={c.href} className="hover:text-white">{c.label}</Link> : <span aria-current="page" className="text-white/90">{c.label}</span>}
                {i < arr.length - 1 && <ChevronRight className="size-3.5" aria-hidden />}
              </li>
            ))}
          </ol>
        </nav>
        {eyebrow && <span className="text-xs font-semibold uppercase tracking-[0.16em] text-glow-400">{eyebrow}</span>}
        <h1 className="max-w-3xl text-3xl font-extrabold leading-[1.15] sm:text-4xl lg:text-[2.75rem]">{title}</h1>
        {text && <p className="max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">{text}</p>}
        {children && <div className="mt-2 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}

/** Pixels breaking away, the motif from the logo */
export function PixelCluster({ className = "" }: { className?: string }) {
  const px = [[60, 0, 10], [38, 14, 14], [74, 22, 12], [20, 34, 18], [52, 42, 20], [86, 48, 10], [0, 62, 12], [34, 70, 24], [70, 76, 16]];
  return (
    <svg viewBox="0 0 110 100" className={`w-40 opacity-80 ${className}`} aria-hidden>
      <defs>
        <linearGradient id="pxg" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#8b2be2" />
          <stop offset="0.5" stopColor="#f0437a" />
          <stop offset="1" stopColor="#ff9a3c" />
        </linearGradient>
      </defs>
      {px.map(([x, y, s], i) => (
        <rect key={i} x={x} y={y} width={s} height={s} rx={s * 0.2} fill="url(#pxg)" opacity={0.35 + (i % 3) * 0.2} />
      ))}
    </svg>
  );
}
