import Link from "next/link";
import { ArrowRight, Check, Crown, Gem, Headset, Medal, Rocket, ShieldCheck, X } from "lucide-react";
import { packages, type Package } from "@/content/misc";

const icons = { medal: Medal, crown: Crown, gem: Gem } as const;

function PlanCard({ p }: { p: Package }) {
  const Icon = icons[p.icon];
  const dark = !!p.featured;
  const save = Math.round((1 - p.price / p.was) * 100);
  const fmt = (n: number) => n.toLocaleString("en-US");

  return (
    <article
      className={`group relative flex flex-col rounded-[1.75rem] transition duration-300 hover:-translate-y-1.5 ${
        dark
          ? "bg-navy-radial text-white shadow-[0_30px_70px_-25px_rgb(192_38_211/0.55)] ring-2 ring-brand-600/70 lg:-my-4"
          : "border border-line bg-white shadow-card hover:shadow-lift"
      }`}
    >
      {/* Top accent bar */}
      <span className={`absolute inset-x-8 top-0 h-1 rounded-b-full ${dark ? "bg-brand-gradient" : "bg-gradient-to-r from-brand-700/60 to-[#F0437A]/60"}`} aria-hidden />
      {dark && <div className="bg-pixel-grid pointer-events-none absolute inset-0 rounded-[1.75rem] opacity-70" aria-hidden />}

      <div className="relative flex flex-1 flex-col p-7 sm:p-8">
        {/* Icon + tag */}
        <div className="flex items-start justify-between gap-3">
          <span className={`inline-flex size-12 items-center justify-center rounded-2xl shadow-lift ${dark ? "bg-brand-gradient text-white" : "bg-brand-50 text-brand-600"}`}>
            <Icon className="size-6" strokeWidth={1.8} aria-hidden />
          </span>
          <span className={`rounded-full px-3 py-1 text-[11px] font-bold tracking-[0.12em] uppercase ${
            dark ? "bg-brand-gradient text-white" : "border border-line bg-surface text-muted"}`}>
            {dark && "★ "}{p.tag}
          </span>
        </div>

        <h3 className={`mt-6 text-2xl font-extrabold ${dark ? "text-white" : "text-navy-900"}`}>{p.name}</h3>
        <p className={`mt-2 min-h-[3rem] text-sm leading-relaxed ${dark ? "text-white/70" : "text-muted"}`}>{p.summary}</p>

        {/* Price with struck-through regular price */}
        <div className="mt-6 flex flex-col gap-1">
          <div className="flex items-center gap-2.5">
            <span className={`text-lg font-semibold line-through decoration-2 ${dark ? "text-white/45 decoration-[#F0437A]" : "text-muted/70 decoration-[#F25C54]"}`}>
              {p.currency}{fmt(p.was)}
            </span>
            <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-bold text-emerald-500">Save {save}%</span>
          </div>
          <p className="flex items-start gap-1">
            <span className={`mt-2 text-xl font-bold ${dark ? "text-white/80" : "text-navy-900/70"}`}>{p.currency}</span>
            <span className={`font-display text-6xl leading-none font-extrabold tracking-tight ${dark ? "text-white" : "text-navy-900"}`}>{fmt(p.price)}</span>
            <span className={`mt-auto mb-1.5 text-sm ${dark ? "text-white/60" : "text-muted"}`}>/month</span>
          </p>
          <p className={`text-xs ${dark ? "text-white/50" : "text-muted"}`}>Billed monthly · Cancel anytime</p>
        </div>

        <hr className={`my-6 ${dark ? "border-white/10" : "border-line"}`} />

        {/* Grouped features */}
        <div className="flex flex-1 flex-col gap-5">
          {p.groups.map((g) => (
            <div key={g.title}>
              <p className={`text-[11px] font-bold tracking-[0.14em] uppercase ${dark ? "text-glow-400" : "text-brand-600"}`}>{g.title}</p>
              <ul className="mt-2.5 flex flex-col gap-2">
                {g.items.map((f) => {
                  const on = f.included !== false;
                  return (
                    <li key={f.text} className={`flex gap-2.5 text-sm leading-snug ${on ? (dark ? "text-white/90" : "text-ink") : dark ? "text-white/35 line-through" : "text-muted/60 line-through"}`}>
                      <span className={`mt-px inline-flex size-[18px] shrink-0 items-center justify-center rounded-full ${
                        on ? (dark ? "bg-glow-400/20 text-glow-400" : "bg-brand-50 text-brand-600") : dark ? "bg-white/5 text-white/35" : "bg-surface text-muted/60"}`}>
                        {on ? <Check className="size-3" strokeWidth={3.5} aria-hidden /> : <X className="size-3" strokeWidth={3} aria-hidden />}
                      </span>
                      <span><span className="sr-only">{on ? "Included: " : "Not included: "}</span>{f.text}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <Link href="/contact"
          className={`mt-8 inline-flex h-13 items-center justify-center gap-2 rounded-full font-semibold transition ${
            dark ? "bg-brand-gradient text-white shadow-lift hover:brightness-110"
              : "bg-navy-900 text-white hover:bg-brand-gradient"}`}>
          Get Started <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden />
        </Link>
      </div>
    </article>
  );
}

export function PricingCards() {
  return (
    <div className="flex flex-col gap-10">
      <div className="grid items-stretch gap-8 lg:grid-cols-3 lg:gap-6">
        {packages.map((p) => <PlanCard key={p.name} p={p} />)}
      </div>
      <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted">
        <li className="flex items-center gap-2"><ShieldCheck className="size-4 text-brand-600" aria-hidden /> No hidden fees</li>
        <li className="flex items-center gap-2"><Rocket className="size-4 text-brand-600" aria-hidden /> Website, SEO &amp; marketing in one place</li>
        <li className="flex items-center gap-2"><Headset className="size-4 text-brand-600" aria-hidden /> Dedicated support on WhatsApp</li>
      </ul>
    </div>
  );
}
