import type { Metadata } from "next";
import { CheckCircle2, MapPin } from "lucide-react";
import { locations } from "@/content/locations";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand, Faq, ProcessSteps, StatsStrip } from "@/components/sections/Blocks";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { Button } from "@/components/ui/Button";
import { RichText } from "@/components/ui/RichText";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pageMetadata } from "@/lib/seo";

type Slug = keyof typeof locations;

export const locationMetadata = (slug: Slug): Metadata => pageMetadata(`/${slug}`);

/** Removes [text](link) and **bold** markup for plain-text structured data */
const plain = (text: string) => text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*([^*]+)\*\*/g, "$1");

export function LocationView({ slug }: { slug: Slug }) {
  const l = locations[slug];
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: l.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: plain(f.a) } })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }} />
      <PageHero crumbs={[{ label: l.title }]} eyebrow={l.title} title={l.heading} text={l.intro}>
        <Button href="/contact" size="lg">Get a free quote</Button>
      </PageHero>
      <section className="container-page py-16"><StatsStrip /></section>

      {/* Long-form local content */}
      <section className="container-page grid gap-12 pb-20 lg:grid-cols-[1.6fr_1fr]">
        <div className="flex flex-col gap-10">
          {l.sections.map((s) => (
            <div key={s.heading} className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold text-heading sm:text-3xl">{s.heading}</h2>
              {s.paragraphs.map((p) => <p key={p.slice(0, 40)} className="leading-relaxed text-muted"><RichText text={p} /></p>)}
            </div>
          ))}
        </div>
        <aside className="flex h-fit flex-col gap-5 rounded-card border border-line bg-surface p-7 lg:sticky lg:top-28">
          <h2 className="text-lg font-bold text-heading">Industries we work with</h2>
          <ul className="flex flex-wrap gap-2">
            {l.industries.map((i) => <li key={i} className="rounded-full bg-brand-50 px-3 py-1 text-sm font-medium text-brand-700">{i}</li>)}
          </ul>
          <p className="flex gap-2 text-sm text-muted">
            <MapPin className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden />
            <span>{site.offices[0].address}</span>
          </p>
          <Button href="/projects" variant="secondary" className="w-fit">See our projects</Button>
        </aside>
      </section>

      <section className="bg-surface py-20">
        <div className="container-page flex flex-col gap-12">
          <SectionHeading eyebrow="Why Next Vision" title="Why businesses choose Next Vision Technologies" />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {l.reasons.map((r) => (
              <li key={r.title} className="flex gap-4 rounded-card border border-line bg-card p-6">
                <CheckCircle2 className="mt-0.5 size-6 shrink-0 text-brand-600" aria-hidden />
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-bold text-heading">{r.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{r.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-page flex flex-col gap-12 py-20">
        <SectionHeading eyebrow="What we do" title="Services for businesses like yours" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((s) => <ServiceCard key={s.slug} s={s} />)}
        </div>
        <Button href="/services" variant="secondary" className="mx-auto w-fit">View all services</Button>
      </section>

      <section className="bg-surface py-20">
        <div className="container-page flex flex-col gap-12">
          <SectionHeading eyebrow="How we work" title="From first call to launch in four steps" />
          <ProcessSteps steps={l.process} />
        </div>
      </section>

      <section className="container-page py-20"><Faq items={l.faqs} /></section>
      <CtaBand />
    </>
  );
}
