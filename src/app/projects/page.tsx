import { projects, projectImage } from "@/content/projects";
import { site } from "@/content/site";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/Blocks";
import { ProjectsGallery } from "@/features/projects/ProjectsGallery";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/projects");

const industries = new Set(projects.map((p) => p.industry.split(" & ")[0])).size;
const stats = [
  { value: `${projects.length}`, label: "Live projects" },
  { value: `${projects.filter((p) => p.type === "Website").length}`, label: "Business websites" },
  { value: `${projects.filter((p) => p.type !== "Website").length}`, label: "Software & AI systems" },
  { value: `${industries}+`, label: "Industries served" },
];

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

      <section className="border-b border-line bg-card">
        <dl className="container-page grid grid-cols-2 gap-6 py-8 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col gap-1">
              <dt className="order-2 text-sm text-muted">{s.label}</dt>
              <dd className="order-1 text-3xl font-extrabold text-heading">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="container-page py-14 sm:py-20">
        <ProjectsGallery />
      </section>
      <CtaBand title="Want a project like these?" />
    </>
  );
}
