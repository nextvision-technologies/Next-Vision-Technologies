import type { Metadata } from "next";
import { locations } from "@/content/misc";
import { services } from "@/content/services";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand, StatsStrip } from "@/components/sections/Blocks";
import { ServiceCard } from "@/features/services/ServiceCard";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pageMetadata } from "@/lib/seo";

type Slug = keyof typeof locations;

export const locationMetadata = (slug: Slug): Metadata => pageMetadata(`/${slug}`);

export function LocationView({ slug }: { slug: Slug }) {
  const l = locations[slug];
  return (
    <>
      <PageHero crumbs={[{ label: l.title }]} eyebrow={l.title} title={l.heading} text={l.intro}>
        <Button href="/contact" size="lg">Get a free quote</Button>
      </PageHero>
      <section className="container-page py-16"><StatsStrip /></section>
      <section className="bg-surface py-20">
        <div className="container-page flex flex-col gap-12">
          <SectionHeading eyebrow="What we do" title="Services for businesses like yours" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((s) => <ServiceCard key={s.slug} s={s} />)}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
