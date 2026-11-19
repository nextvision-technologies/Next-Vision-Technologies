import Link from "next/link";
import { ArrowRight, Bot, CodeXml, Megaphone, Palette, type LucideIcon } from "lucide-react";
import { services, serviceCategories } from "@/content/services";
import type { ServiceCategory } from "@/types/content";
import { whatsappLink } from "@/content/site";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/Blocks";
import { ServiceCard, categoryTheme } from "@/components/cards/ServiceCard";
import { Button } from "@/components/ui/Button";
import { SocialIcon } from "@/components/ui/SocialIcons";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/services");

const categoryInfo: Record<ServiceCategory, { id: string; icon: LucideIcon; text: string }> = {
  "AI & Automation": { id: "ai-automation", icon: Bot, text: "AI agents, chatbots and automated workflows that save hours every week and answer customers instantly." },
  Development: { id: "development", icon: CodeXml, text: "Websites, online stores, mobile apps and custom software built to be fast, secure and easy to grow." },
  Marketing: { id: "marketing", icon: Megaphone, text: "SEO, social media and paid ads that bring measurable leads and sales, with clear monthly reports." },
  "Design & Consulting": { id: "design-consulting", icon: Palette, text: "Brand identity, design and independent technology advice to help you make the right decisions." },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero crumbs={[{ label: "Services" }]} eyebrow={`${services.length} services · 4 categories`} title="Services to build, automate and grow your business"
        text="Pick a single service or combine them. Every project gets one team, one plan and one point of contact.">
        <Button href="/contact" size="lg">Get a free quote <ArrowRight className="size-4" /></Button>
        <Button href={whatsappLink("Hi Next Vision, I'd like help choosing a service.")} variant="light" size="lg">
          <SocialIcon name="whatsapp" className="size-5" /> Ask on WhatsApp
        </Button>
      </PageHero>

      {/* Category jump links */}
      <nav aria-label="Service categories" className="sticky top-16 z-30 border-b border-line bg-card/90 md:backdrop-blur lg:top-[4.5rem]">
        <ul className="container-page flex gap-2 overflow-x-auto py-3">
          {serviceCategories.map((c) => {
            const info = categoryInfo[c];
            const count = services.filter((s) => s.category === c).length;
            return (
              <li key={c}>
                <a href={`#${info.id}`} className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2 text-sm font-semibold whitespace-nowrap text-heading transition hover:border-brand-600/40 hover:text-brand-600">
                  <info.icon className="size-4" aria-hidden /> {c}
                  <span className="rounded-full bg-surface px-2 text-xs text-muted">{count}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="container-page flex flex-col gap-20 py-16 sm:py-20">
        {serviceCategories.map((c) => {
          const info = categoryInfo[c];
          const list = services.filter((s) => s.category === c);
          const t = categoryTheme[c];
          return (
            <section key={c} id={info.id} className="flex scroll-mt-40 flex-col gap-8" aria-labelledby={`h-${info.id}`}>
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div className="flex items-start gap-4">
                  <span className={`inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${t.icon} text-white`}>
                    <info.icon className="size-6" aria-hidden />
                  </span>
                  <div>
                    <h2 id={`h-${info.id}`} className="text-2xl font-extrabold text-heading sm:text-3xl">{c}</h2>
                    <p className="mt-1.5 max-w-2xl text-muted">{info.text}</p>
                  </div>
                </div>
                <span className={`w-fit shrink-0 rounded-full px-3 py-1 text-sm font-semibold ${t.label}`}>{list.length} services</span>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((s) => <ServiceCard key={s.slug} s={s} />)}
              </div>
            </section>
          );
        })}

        {/* Help choosing */}
        <section className="flex flex-col items-start justify-between gap-6 rounded-[1.75rem] border border-line bg-surface p-8 sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="text-2xl font-extrabold text-heading">Not sure which service you need?</h2>
            <p className="mt-2 max-w-xl text-muted">Tell us about your business and goals. We&apos;ll recommend the right mix of services and send a fixed quote within 24 hours.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/book-demo" variant="secondary">Book a free demo</Button>
            <Link href="/pricing" className="inline-flex h-11 items-center gap-1.5 px-2 text-sm font-semibold text-brand-600">See packages <ArrowRight className="size-4" /></Link>
          </div>
        </section>
      </div>
      <CtaBand />
    </>
  );
}
