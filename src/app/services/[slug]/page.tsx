import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { defaultProcess, getService, services } from "@/content/services";
import { whatsappLink } from "@/content/site";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand, Faq, ProcessSteps, ServiceCard } from "@/components/sections/Blocks";
import { Button } from "@/components/ui/Button";
import { IconTile } from "@/components/ui/ServiceIcon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SocialIcon } from "@/components/ui/SocialIcons";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const s = getService((await params).slug);
  if (!s) return {};
  return { title: s.title, description: `${s.tagline} ${s.short}` };
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const s = getService((await params).slug);
  if (!s) notFound();
  const related = s.related.map(getService).filter((r) => r !== undefined);

  return (
    <>
      <PageHero crumbs={[{ label: "Services", href: "/services" }, { label: s.title }]} eyebrow={s.category} title={s.title} text={s.tagline}>
        <Button href="/contact" size="lg">Get a free quote</Button>
        <Button href={whatsappLink(`Hi Next Vision, I'm interested in ${s.title}.`)} variant="light" size="lg">
          <SocialIcon name="whatsapp" className="size-5" /> Chat on WhatsApp
        </Button>
      </PageHero>

      {/* Overview */}
      <section className="container-page grid gap-12 py-20 lg:grid-cols-[1.3fr_1fr]">
        <div className="flex flex-col gap-6">
          <IconTile name={s.icon} size="lg" />
          <h2 className="text-3xl font-bold text-navy-900">Overview</h2>
          <p className="text-lg leading-relaxed text-muted">{s.intro}</p>
          <ul className="flex flex-wrap gap-2">
            {s.tags.map((t) => <li key={t} className="rounded-full bg-brand-50 px-3.5 py-1.5 text-sm font-medium text-brand-700">{t}</li>)}
          </ul>
        </div>
        <div className="rounded-card border border-line bg-surface p-7">
          <h3 className="text-lg font-bold text-navy-900">Why businesses choose us</h3>
          <ul className="mt-5 flex flex-col gap-3.5">
            {s.benefits.map((b) => (
              <li key={b} className="flex gap-3 text-ink"><Check className="mt-0.5 size-5 shrink-0 text-brand-600" aria-hidden /> {b}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Offerings */}
      <section className="bg-surface py-20">
        <div className="container-page flex flex-col gap-12">
          <SectionHeading eyebrow="What we offer" title={`Our ${s.title.toLowerCase()} services`} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {s.offerings.map((o) => (
              <div key={o.title} className="flex flex-col gap-2 rounded-card bg-white p-6 shadow-card">
                <h3 className="text-lg font-bold text-navy-900">{o.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{o.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="container-page flex flex-col gap-12 py-20">
        <SectionHeading eyebrow="Our process" title="How we work" />
        <ProcessSteps steps={defaultProcess} />
      </section>

      {/* Tools */}
      <section className="bg-navy-radial py-16 text-white">
        <div className="container-page flex flex-col items-center gap-8">
          <SectionHeading tone="dark" eyebrow="Tools & technologies" title="What we build with" />
          <ul className="flex flex-wrap justify-center gap-3">
            {s.tools.map((t) => <li key={t} className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium">{t}</li>)}
          </ul>
        </div>
      </section>

      <section className="container-page py-20"><Faq items={s.faqs} /></section>

      {related.length > 0 && (
        <section className="bg-surface py-20">
          <div className="container-page flex flex-col gap-12">
            <SectionHeading eyebrow="Related services" title="Often combined with" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => <ServiceCard key={r.slug} s={r} />)}
            </div>
          </div>
        </section>
      )}

      <CtaBand title={`Let's talk about your ${s.title.toLowerCase()} project`} />
    </>
  );
}
