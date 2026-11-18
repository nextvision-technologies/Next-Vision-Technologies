import type { Metadata } from "next";
import { portfolio } from "@/content/misc";
import { PageHero, PixelCluster } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/Blocks";

export const metadata: Metadata = { title: "Portfolio", description: "Selected projects by Next Vision Technologies across AI, web, e-commerce and marketing." };

export default function PortfolioPage() {
  return (
    <>
      <PageHero crumbs={[{ label: "Portfolio" }]} eyebrow="Our work" title="Projects that moved the numbers"
        text="A selection of websites, apps, automations and campaigns we've delivered." />
      <section className="container-page py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {portfolio.map((p) => (
            <article key={p.title} className="flex flex-col overflow-hidden rounded-card border border-line bg-white shadow-card">
              {/* TODO: replace with project screenshots in /public/portfolio */}
              <div className="bg-navy-radial relative aspect-[4/3]">
                <div className="bg-pixel-grid absolute inset-0" aria-hidden />
                <PixelCluster className="absolute right-6 bottom-6 w-24" />
              </div>
              <div className="flex flex-col gap-2 p-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">{p.category}</span>
                <h2 className="text-lg font-bold text-navy-900">{p.title}</h2>
                <p className="text-sm text-muted">{p.result}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <CtaBand title="Want results like these?" />
    </>
  );
}
