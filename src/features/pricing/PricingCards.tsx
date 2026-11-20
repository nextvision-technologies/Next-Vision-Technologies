import Link from "next/link";
import { ArrowRight, Check, Crown, Gem, Headset, Medal, Rocket, ShieldCheck, Star, X } from "lucide-react";
import { packages } from "@/content/pricing";
import type { Package } from "@/types/content";

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
          ? "section-dark text-white shadow-lift ring-2 ring-brand-600 lg:-my-4"
          : "border border-line bg-card shadow-card hover:shadow-lift"
      }`}
    >
      {/* Top accent bar */}
      <span className={`absolute inset-x-8 top-0 h-1 rounded-b-full ${dark ? "solid-primary" : "bg-line"}`} aria-hidden />

      <div className="relative flex flex-1 flex-col p-7 sm:p-8">
        {/* Icon + tag */}
        <div className="flex items-start justify-between gap-3">
          <span className={`inline-flex size-12 items-center justify-center rounded-2xl shadow-lift ${dark ? "solid-primary text-white" : "bg-brand-50 text-brand-600"}`}>
            <Icon className="size-6" strokeWidth={1.8} aria-hidden />
          </span>
          <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-bold tracking-[0.12em] uppercase ${
            dark ? "solid-primary text-white" : "border border-line bg-surface text-muted"}`}>
            {dark && <Star className="size-3 fill-current" aria-hidden />}{p.tag}
          </span>
        </div>

        <h3 className={`mt-6 text-2xl font-extrabold ${dark ? "text-white" : "text-heading"}`}>{p.name}</h3>
        <p className={`mt-2 min-h-[3rem] text-sm leading-relaxed ${dark ? "text-white/70" : "text-muted"}`}>{p.summary}</p>

        {/* Price with struck-through regular price */}
        <div className={`relative mt-6 overflow-hidden rounded-2xl p-5 ${
          dark
            ? "border border-white/15 bg-white/[0.07] shadow-[0_18px_40px_-18px_rgb(240_67_122/0.55),inset_0_1px_0_rgb(255_255_255/0.08)]"
            : "border border-brand-600/15 bg-gradient-to-br from-brand-50 via-card to-card shadow-[0_16px_36px_-20px_rgb(109_40_217/0.45),inset_0_1px_0_rgb(255_255_255/0.9)]"}`}>
          {/* soft glow behind the price */}
          <span className={`pointer-events-none absolute -top-10 -right-10 size-32 rounded-full blur-2xl ${dark ? "bg-[#f0437a]/30" : "bg-brand-600/15"}`} aria-hidden />

          {/* Regular price, struck through, and the discount */}
          <div className="relative flex flex-wrap items-center justify-between gap-2">
            <span className="flex items-baseline gap-1.5">
              <span className={`text-[11px] font-semibold tracking-[0.12em] uppercase ${dark ? "text-white/50" : "text-muted"}`}>Regular</span>
              <span className={`text-xl font-bold line-through decoration-[#ef4444] decoration-[3px] ${dark ? "text-white/60" : "text-heading/55"}`}>
                <span className="sr-only">Regular price </span>{p.currency}{fmt(p.was)}
              </span>
            </span>
            {/* On dark surfaces the success colour is a light green, so the text switches to dark green for contrast */}
            <span className={`inline-flex items-center rounded-full bg-success px-3 py-1 text-xs font-extrabold tracking-wide shadow-[0_6px_16px_-4px_rgb(21_128_61/0.6)] ${dark ? "text-[#052e16]" : "text-white dark:text-[#052e16]"}`}>
              SAVE {save}%
            </span>
          </div>

          {/* Offer price */}
          <p className="relative mt-3 flex items-start gap-1">
            <span className={`mt-2 text-2xl font-bold ${dark ? "text-white/85" : "text-brand-600"}`}>{p.currency}</span>
            <span className={`font-display text-6xl leading-none font-extrabold tracking-tight sm:text-7xl ${
              dark ? "text-white [text-shadow:0_0_28px_rgb(240_67_122/0.55)]" : "text-gradient drop-shadow-[0_6px_14px_rgb(109_40_217/0.25)]"}`}>
              <span className="sr-only">Offer price </span>{fmt(p.price)}
            </span>
            <span className={`mt-auto mb-2 text-sm font-medium ${dark ? "text-white/70" : "text-muted"}`}>/month</span>
          </p>

          <div className={`relative mt-3 flex flex-wrap items-center justify-between gap-2 border-t pt-3 text-xs ${dark ? "border-white/10" : "border-line"}`}>
            <span className="font-semibold text-success">You save {p.currency}{fmt(p.was - p.price)} every month</span>
            <span className={dark ? "text-white/55" : "text-muted"}>Billed monthly · Cancel anytime</span>
          </div>
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
            dark ? "solid-primary text-white shadow-lift hover:brightness-110"
              : "bg-night-900 text-white hover:solid-primary"}`}>
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
