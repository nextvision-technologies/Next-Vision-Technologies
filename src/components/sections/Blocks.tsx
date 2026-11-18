// Shared page sections: cards, CTA, FAQ, process, pricing, stats, testimonials.
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Quote } from "lucide-react";
import type { Service } from "@/content/services";
import type { Post } from "@/content/blog";
import { packages, testimonials } from "@/content/misc";
import { site, whatsappLink } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { IconTile } from "@/components/ui/ServiceIcon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SocialIcon } from "@/components/ui/SocialIcons";
import { PixelCluster } from "./PageHero";

export function ServiceCard({ s }: { s: Service }) {
  return (
    <Link href={`/services/${s.slug}`}
      className="group flex h-full flex-col gap-4 rounded-card border border-line bg-white p-6 shadow-card transition hover:-translate-y-1 hover:border-brand-400/50 hover:shadow-lift">
      <IconTile name={s.icon} />
      <div className="flex flex-1 flex-col gap-2">
        <h3 className="text-lg font-bold text-navy-900">{s.title}</h3>
        <p className="text-sm leading-relaxed text-muted">{s.short}</p>
      </div>
      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
        Learn more <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden />
      </span>
    </Link>
  );
}

const dateFmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" });
export const formatDate = (iso: string) => dateFmt.format(new Date(iso + "T00:00:00Z"));

export function PostCard({ p }: { p: Post }) {
  return (
    <Link href={`/blog/${p.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-white shadow-card transition hover:-translate-y-1 hover:shadow-lift">
      <div className="bg-navy-radial relative flex aspect-[16/9] items-end p-5">
        <div className="bg-pixel-grid absolute inset-0" aria-hidden />
        <PixelCluster className="absolute top-4 right-4 w-20" />
        <span className="relative rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-glow-400 backdrop-blur">{p.category}</span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <p className="text-xs text-muted">{formatDate(p.date)} · {p.readMinutes} min read</p>
        <h3 className="text-lg font-bold leading-snug text-navy-900 group-hover:text-brand-600">{p.title}</h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-muted">{p.excerpt}</p>
      </div>
    </Link>
  );
}

export function CtaBand({ title = "Ready to take your business to the next level?", text = "Tell us about your project and get a free quote within 24 hours." }: { title?: string; text?: string }) {
  return (
    <section className="container-page py-16 sm:py-20">
      <div className="bg-brand-gradient relative overflow-hidden rounded-[2rem] px-6 py-14 text-center text-white sm:px-12">
        <div className="bg-pixel-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden />
        <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-5">
          <h2 className="text-3xl font-extrabold sm:text-4xl">{title}</h2>
          <p className="text-lg text-white/85">{text}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button href="/contact" variant="secondary" size="lg" className="border-white">Start your project <ArrowRight className="size-4" /></Button>
            <Button href={whatsappLink()} variant="light" size="lg"><SocialIcon name="whatsapp" className="size-5" /> Chat on WhatsApp</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Faq({ items, title = "Frequently asked questions" }: { items: { q: string; a: string }[]; title?: string }) {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <SectionHeading eyebrow="FAQ" title={title} />
      <div className="flex flex-col gap-3">
        {items.map((f) => (
          <details key={f.q} className="group rounded-2xl border border-line bg-white px-5 open:shadow-card">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-semibold text-navy-900">
              {f.q}
              <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600 transition group-open:rotate-45" aria-hidden>+</span>
            </summary>
            <p className="pb-5 leading-relaxed text-muted">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}

export function ProcessSteps({ steps }: { steps: { title: string; text: string }[] }) {
  return (
    <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((s, i) => (
        <li key={s.title} className="relative flex flex-col gap-3 rounded-card border border-line bg-white p-6">
          <span className="font-display text-sm font-bold text-brand-600">Step {i + 1}</span>
          <h3 className="text-lg font-bold text-navy-900">{s.title}</h3>
          <p className="text-sm leading-relaxed text-muted">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

export function PricingCards() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {packages.map((p) => {
        const featured = p.badge === "Most popular";
        return (
          <div key={p.name}
            className={`relative flex flex-col gap-6 rounded-[1.5rem] p-8 ${featured ? "bg-navy-radial text-white shadow-lift ring-2 ring-brand-600 lg:-translate-y-3" : "border border-line bg-white shadow-card"}`}>
            {p.badge && (
              <span className={`absolute -top-3 left-8 rounded-full px-3 py-1 text-xs font-bold ${featured ? "bg-brand-gradient text-white" : "bg-glow-100 text-navy-900"}`}>{p.badge}</span>
            )}
            <div>
              <h3 className={`text-xl font-bold ${featured ? "text-white" : "text-navy-900"}`}>{p.name}</h3>
              <p className={`mt-1 text-sm ${featured ? "text-white/70" : "text-muted"}`}>{p.summary}</p>
            </div>
            <p className="flex items-baseline gap-1">
              <span className="font-display text-5xl font-extrabold">${p.price}</span>
              <span className={featured ? "text-white/60" : "text-muted"}>/{p.period}</span>
            </p>
            <ul className="flex flex-1 flex-col gap-3 text-sm">
              {p.features.map((f) => (
                <li key={f} className="flex gap-2.5">
                  <Check className={`mt-0.5 size-4 shrink-0 ${featured ? "text-glow-400" : "text-brand-600"}`} aria-hidden /> {f}
                </li>
              ))}
            </ul>
            <Button href="/contact" variant={featured ? "primary" : "secondary"} className="w-full">Choose {p.name}</Button>
          </div>
        );
      })}
    </div>
  );
}

export function StatsStrip({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <dl className="grid grid-cols-2 gap-6 lg:grid-cols-4">
      {site.stats.map((s) => (
        <div key={s.label} className="flex flex-col gap-1">
          <dt className={`order-2 text-sm ${tone === "dark" ? "text-white/65" : "text-muted"}`}>{s.label}</dt>
          <dd className={`font-display text-4xl font-extrabold ${tone === "dark" ? "text-white" : "text-brand-gradient"}`}>{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Testimonials() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {testimonials.map((t, i) => (
        <figure key={i} className="flex flex-col gap-5 rounded-card border border-line bg-white p-7 shadow-card">
          <Quote className="size-8 text-glow-400" aria-hidden />
          <blockquote className="flex-1 leading-relaxed text-ink">{t.text}</blockquote>
          <figcaption className="flex items-center gap-3">
            <span className="bg-brand-gradient inline-flex size-10 items-center justify-center rounded-full font-bold text-white">{t.name[0]}</span>
            <span>
              <span className="block text-sm font-semibold text-navy-900">{t.name}</span>
              <span className="block text-xs text-muted">{t.role} · {t.project}</span>
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export function RelatedLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="inline-flex items-center gap-1 font-semibold text-brand-600 hover:text-brand-700">
      {children} <ArrowUpRight className="size-4" aria-hidden />
    </Link>
  );
}
