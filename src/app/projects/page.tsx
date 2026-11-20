import { Building2, Cpu, Globe, Rocket } from "lucide-react";
import { projects, projectImage, projectStats } from "@/content/projects";
import { CountUp } from "@/components/ui/CountUp";
import { site } from "@/content/site";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/Blocks";
import { ProjectsGallery } from "@/features/projects/ProjectsGallery";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/projects");

const statIcons = { rocket: Rocket, globe: Globe, cpu: Cpu, building: Building2 };

export default function ProjectsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Projects Gallery",
    url: `${site.url}/projects`,
    description: `Websites, custom software and AI solutions delivered by ${site.name}.`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: projects.length,
      itemListElement: projects.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": p.type === "Website" ? "WebSite" : "SoftwareApplication",
          name: p.name,
          description: p.summary,
          image: `${site.url}${projectImage(p.slug)}`,
          ...(p.publicSite !== false ? { url: p.url } : {}),
          ...(p.type !== "Website" ? { applicationCategory: "BusinessApplication", operatingSystem: "Web" } : {}),
          creator: { "@type": "Organization", name: site.name, url: site.url },
        },
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <PageHero crumbs={[{ label: "Projects Gallery" }]} eyebrow="Projects Gallery" title="Websites, software and AI we have built"
        text="Live projects delivered for hotels, hospitals, clinics, couriers, retailers and more. Open any website to see it in action, or book a demo of our software." />

      {/* Company totals, counting up as they come into view */}
      <section className="container-page relative z-10 -mt-10 sm:-mt-12" aria-label="Our track record">
        <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {projectStats.map((s) => {
            const Icon = statIcons[s.icon];
            return (
              <div key={s.label} className="group relative flex flex-col gap-3 overflow-hidden rounded-card border border-line bg-card p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift">
                <span className="bg-logo-gradient absolute inset-x-0 top-0 h-1 opacity-80" aria-hidden />
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition group-hover:solid-primary group-hover:text-white">
                  <Icon className="size-5" aria-hidden />
                </span>
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-gradient text-4xl leading-none font-extrabold sm:text-5xl">
                  <CountUp value={s.value} suffix={s.suffix} />
                </dd>
                <dd className="flex flex-col gap-1">
                  <span className="font-bold text-heading" aria-hidden>{s.label}</span>
                  <span className="text-sm leading-relaxed text-muted">{s.text}</span>
                </dd>
              </div>
            );
          })}
        </dl>
      </section>

      <section className="container-page py-14 sm:py-20">
        <ProjectsGallery />
      </section>
      <CtaBand title="Want a project like these?" />
    </>
  );
}
