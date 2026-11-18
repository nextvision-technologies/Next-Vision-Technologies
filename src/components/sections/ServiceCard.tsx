import Link from "next/link";
import { ArrowRight, CircleCheck, MessageSquareQuote } from "lucide-react";
import type { Service, ServiceCategory } from "@/content/services";
import { ServiceIcon } from "@/components/ui/ServiceIcon";

/** Each category gets its own tint within the brand palette */
export const categoryTheme: Record<ServiceCategory, { card: string; icon: string; check: string; glow: string; label: string }> = {
  "AI & Automation": {
    card: "from-[#f3ecff] via-white to-white", icon: "from-[#6d28d9] to-[#a855f7]", check: "text-[#7c3aed]", glow: "bg-[#a855f7]/25", label: "text-[#6d28d9] bg-[#f3ecff]",
  },
  Development: {
    card: "from-[#fcebfd] via-white to-white", icon: "from-[#a21caf] to-[#e879f9]", check: "text-[#c026d3]", glow: "bg-[#e879f9]/25", label: "text-[#a21caf] bg-[#fcebfd]",
  },
  Marketing: {
    card: "from-[#ffe9f0] via-white to-white", icon: "from-[#e11d74] to-[#fb7185]", check: "text-[#e11d74]", glow: "bg-[#fb7185]/25", label: "text-[#be185d] bg-[#ffe9f0]",
  },
  "Design & Consulting": {
    card: "from-[#fff1e3] via-white to-white", icon: "from-[#ea580c] to-[#ff9a3c]", check: "text-[#ea580c]", glow: "bg-[#ff9a3c]/25", label: "text-[#c2410c] bg-[#fff1e3]",
  },
};

export function ServiceCard({ s, showCategory = false }: { s: Service; showCategory?: boolean }) {
  const t = categoryTheme[s.category];
  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-line bg-gradient-to-br ${t.card} p-7 transition duration-300 hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_24px_60px_-24px_rgb(31_10_77/0.35)]`}
    >
      {/* soft glow that grows on hover */}
      <span className={`pointer-events-none absolute -top-16 -right-16 size-44 rounded-full ${t.glow} blur-2xl transition duration-500 group-hover:scale-150`} aria-hidden />
      {/* gradient border on hover */}
      <span className="bg-brand-gradient pointer-events-none absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition duration-300 group-hover:scale-x-100" aria-hidden />

      <div className="relative flex items-start justify-between gap-3">
        <span className={`inline-flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br ${t.icon} text-white shadow-lg transition duration-300 group-hover:scale-105 group-hover:-rotate-3`}>
          <ServiceIcon name={s.icon} className="size-7" />
        </span>
        {showCategory && <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${t.label}`}>{s.category}</span>}
      </div>

      <h3 className="relative mt-6 text-xl font-extrabold text-navy-900">
        {/* Stretched link: the whole card opens the service page */}
        <Link href={`/services/${s.slug}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
          {s.title}
        </Link>
      </h3>
      <p className="relative mt-2.5 leading-relaxed text-muted">{s.tagline}</p>

      <ul className="relative mt-5 mb-7 grid grid-cols-1 gap-x-4 gap-y-2.5 sm:grid-cols-2">
        {s.tags.slice(0, 4).map((tag) => (
          <li key={tag} className="flex items-center gap-2 text-sm font-medium text-ink">
            <CircleCheck className={`size-4 shrink-0 ${t.check}`} aria-hidden /> {tag}
          </li>
        ))}
      </ul>

      <div className="relative z-10 mt-auto flex items-center justify-between gap-3 border-t border-line/80 pt-5">
        <Link href={`/services/${s.slug}`} className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-700">
          Learn more <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden />
        </Link>
        <Link href="/contact" aria-label={`Get a quote for ${s.title}`}
          className="inline-flex items-center gap-1.5 rounded-full border border-navy-900/15 bg-white px-4 py-2 text-sm font-semibold text-navy-900 transition hover:border-transparent hover:bg-navy-900 hover:text-white">
          <MessageSquareQuote className="size-4" aria-hidden /> Get a quote
        </Link>
      </div>
    </article>
  );
}
