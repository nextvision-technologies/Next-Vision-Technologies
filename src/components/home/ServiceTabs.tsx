"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { services, serviceCategories, type ServiceCategory } from "@/content/services";
import { IconTile, ServiceIcon } from "@/components/ui/ServiceIcon";
import { buttonClass } from "@/components/ui/Button";

/** All services, grouped by category tabs, with a featured detail panel */
export function ServiceTabs() {
  const [cat, setCat] = useState<ServiceCategory>(serviceCategories[0]);
  const list = services.filter((s) => s.category === cat);
  const [activeSlug, setActiveSlug] = useState(list[0].slug);
  const active = list.find((s) => s.slug === activeSlug) ?? list[0];

  return (
    <div className="flex flex-col gap-8">
      <div role="tablist" aria-label="Service categories" className="mx-auto flex max-w-full gap-2 overflow-x-auto rounded-full border border-line bg-card p-1.5 shadow-card">
        {serviceCategories.map((c) => (
          <button key={c} role="tab" type="button" aria-selected={c === cat}
            onClick={() => { setCat(c); setActiveSlug(services.find((s) => s.category === c)!.slug); }}
            className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition sm:px-5 ${c === cat ? "bg-brand-gradient text-white shadow-lift" : "text-muted hover:text-heading"}`}>
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.25fr]" role="tabpanel">
        <ul className="flex min-w-0 flex-col gap-2">
          {list.map((s) => {
            const on = s.slug === active.slug;
            return (
              <li key={s.slug}>
                <button type="button" onClick={() => setActiveSlug(s.slug)} onMouseEnter={() => setActiveSlug(s.slug)} aria-pressed={on}
                  className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${on ? "border-brand-600/40 bg-card shadow-lift" : "border-transparent hover:bg-card/70"}`}>
                  <span className={`inline-flex size-11 shrink-0 items-center justify-center rounded-xl transition ${on ? "bg-brand-gradient text-white" : "bg-brand-50 text-brand-600"}`}>
                    <ServiceIcon name={s.icon} className="size-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-heading">{s.title}</span>
                    <span className="block truncate text-sm text-muted">{s.short}</span>
                  </span>
                  <ArrowRight className={`size-4 shrink-0 transition ${on ? "text-brand-600" : "text-transparent"}`} aria-hidden />
                </button>
              </li>
            );
          })}
        </ul>

        <div className="bg-navy-radial relative flex min-w-0 flex-col gap-6 overflow-hidden rounded-[1.75rem] p-6 text-white sm:p-10">
          <div className="bg-pixel-grid pointer-events-none absolute inset-0" aria-hidden />
          <div className="relative flex flex-col gap-5">
            <IconTile name={active.icon} size="lg" />
            <h3 className="text-2xl font-bold sm:text-3xl">{active.title}</h3>
            <p className="text-lg leading-relaxed text-white/75">{active.tagline}</p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {active.benefits.slice(0, 4).map((b) => (
                <li key={b} className="flex gap-2.5 text-sm text-white/85">
                  <Check className="mt-0.5 size-4 shrink-0 text-glow-400" aria-hidden /> {b}
                </li>
              ))}
            </ul>
            <ul className="flex flex-wrap gap-2">
              {active.tags.map((t) => <li key={t} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/80">{t}</li>)}
            </ul>
            <div className="mt-2 flex flex-wrap gap-3">
              <Link href={`/services/${active.slug}`} className={buttonClass("primary")}>Explore {active.title} <ArrowRight className="size-4" /></Link>
              <Link href="/contact" className={buttonClass("light")}>Get a quote</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
