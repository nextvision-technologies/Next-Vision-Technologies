// Shared page sections used on many pages: CTA band, FAQ, process steps, stats, testimonials.
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Quote } from "lucide-react";
import { testimonials } from "@/content/misc";
import { site, whatsappLink } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SocialIcon } from "@/components/ui/SocialIcons";

export function CtaBand({ title = "Ready to take your business to the next level?", text = "Tell us about your project and get a free quote within 24 hours." }: { title?: string; text?: string }) {
  return (
    <section className="container-page py-16 sm:py-20">
      <div className="section-dark relative overflow-hidden rounded-[2rem] px-6 py-14 text-center text-white sm:px-12">
        <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-5">
          <h2 className="text-3xl font-extrabold sm:text-4xl">{title}</h2>
          <p className="text-lg text-white/85">{text}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button href="/contact" variant="secondary" size="lg" className="border-card">Start your project <ArrowRight className="size-4" /></Button>
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
          <details key={f.q} className="group rounded-2xl border border-line bg-card px-5 open:shadow-card">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-semibold text-heading">
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
        <li key={s.title} className="relative flex flex-col gap-3 rounded-card border border-line bg-card p-6">
          <span className="font-display text-sm font-bold text-brand-600">Step {i + 1}</span>
          <h3 className="text-lg font-bold text-heading">{s.title}</h3>
          <p className="text-sm leading-relaxed text-muted">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

export function StatsStrip({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <dl className="grid grid-cols-2 gap-6 lg:grid-cols-4">
      {site.stats.map((s) => (
        <div key={s.label} className="flex flex-col gap-1">
          <dt className={`order-2 text-sm ${tone === "dark" ? "text-white/65" : "text-muted"}`}>{s.label}</dt>
          <dd className={`font-display text-4xl font-extrabold ${tone === "dark" ? "text-white" : "text-brand-600"}`}>{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Testimonials() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {testimonials.map((t, i) => (
        <figure key={i} className="flex flex-col gap-5 rounded-card border border-line bg-card p-7 shadow-card">
          <Quote className="size-8 text-glow-400" aria-hidden />
          <blockquote className="flex-1 leading-relaxed text-ink">{t.text}</blockquote>
          <figcaption className="flex items-center gap-3">
            <span className="solid-primary inline-flex size-10 items-center justify-center rounded-full font-bold text-white">{t.name[0]}</span>
            <span>
              <span className="block text-sm font-semibold text-heading">{t.name}</span>
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
