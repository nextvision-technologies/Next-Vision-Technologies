import type { Metadata } from "next";
import { services, serviceCategories } from "@/content/services";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand, ServiceCard } from "@/components/sections/Blocks";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Services",
  description: "AI automation, chatbots, web and app development, SaaS, SEO, digital marketing and design services from Next Vision Technologies.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero crumbs={[{ label: "Services" }]} eyebrow={`${services.length} services`} title="Services to build, automate and grow your business"
        text="Pick a single service or combine them. Every project gets one team, one plan and one point of contact.">
        <Button href="/contact" size="lg">Get a free quote</Button>
      </PageHero>
      <div className="container-page flex flex-col gap-16 py-20">
        {serviceCategories.map((cat) => (
          <section key={cat} className="flex flex-col gap-6" aria-labelledby={`cat-${cat}`}>
            <h2 id={`cat-${cat}`} className="text-2xl font-bold text-navy-900">{cat}</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.filter((s) => s.category === cat).map((s) => <ServiceCard key={s.slug} s={s} />)}
            </div>
          </section>
        ))}
      </div>
      <CtaBand />
    </>
  );
}
