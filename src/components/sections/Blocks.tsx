// Shared page sections used on many pages: CTA band, FAQ, process steps, stats, testimonials.
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CalendarCheck, FolderCheck, HeartHandshake, Quote, Timer } from "lucide-react";
import { testimonials } from "@/content/testimonials";
import { site, whatsappLink } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { CountUp } from "@/components/ui/CountUp";
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

const statIcons = [FolderCheck, HeartHandshake, CalendarCheck, Timer];

/** Splits "100+" / "24h" into a number to count up to and its suffix */
const parseStat = (v: string) => {
  const m = v.match(/^(\d+)(.*)$/);
  return m ? { n: Number(m[1]), suffix: m[2] } : null;
};

/** Company numbers with icons; each number counts up when it scrolls into view */
export function StatsStrip({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <dl className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
      {site.stats.map((s, i) => {
        const Icon = statIcons[i % statIcons.length];
        const num = parseStat(s.value);
        return (
          <div key={s.label}
            className={`group relative flex flex-col gap-3 overflow-hidden rounded-2xl p-5 transition duration-300 hover:-translate-y-1 sm:p-7 ${
              dark ? "border border-white/10 bg-white/[0.05] hover:border-white/25 hover:bg-white/[0.08]" : "border border-line bg-card shadow-card hover:shadow-lift"}`}>
            <span className="bg-logo-gradient absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 transition duration-500 group-hover:scale-x-100" aria-hidden />
            <span className={`order-1 inline-flex size-11 items-center justify-center rounded-xl ${dark ? "bg-white/10 text-brand-400" : "bg-brand-50 text-brand-600"}`}>
              <Icon className="size-5" aria-hidden strokeWidth={1.9} />
            </span>
            {/* dt before dd for valid markup; flex order shows the number first */}
            <dt className="order-3 flex flex-col gap-1">
              <span className={`text-base font-semibold ${dark ? "text-white" : "text-heading"}`}>{s.label}</span>
              {"detail" in s && <span className={`text-sm leading-snug ${dark ? "text-white/60" : "text-muted"}`}>{s.detail}</span>}
            </dt>
            <dd className={`order-2 font-display text-4xl leading-none font-extrabold tracking-tight sm:text-5xl ${dark ? "text-white" : "text-heading"}`}>
              {num ? <CountUp value={num.n} suffix={num.suffix} /> : s.value}
            </dd>
          </div>
        );
      })}
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
