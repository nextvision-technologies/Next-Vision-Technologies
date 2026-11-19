import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { allSeoEntries, type SeoEntry } from "@/content/seo";
import { PageHero } from "@/components/sections/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/site-map");

const order: SeoEntry["group"][] = ["Main pages", "Services", "Blog", "Careers", "Locations", "Legal"];

/** Human-readable sitemap: every page with its title and meta description */
export default function SiteMapPage() {
  const entries = allSeoEntries().filter((e) => e.path !== "/site-map");
  return (
    <>
      <PageHero crumbs={[{ label: "Sitemap" }]} eyebrow={`${entries.length} pages`} title="Sitemap"
        text="Every page on our website in one place, with a short description of what you'll find there." />
      <div className="container-page flex flex-col gap-14 py-16 sm:py-20">
        {order.map((group) => {
          const list = entries.filter((e) => e.group === group);
          if (!list.length) return null;
          return (
            <section key={group} aria-labelledby={`sm-${group}`} className="flex flex-col gap-5">
              <h2 id={`sm-${group}`} className="flex items-baseline gap-3 text-2xl font-extrabold text-heading">
                {group} <span className="text-sm font-semibold text-muted">{list.length}</span>
              </h2>
              <ul className="grid gap-4 md:grid-cols-2">
                {list.map((e) => (
                  <li key={e.path}>
                    <Link href={e.path} className="group flex h-full flex-col gap-1.5 rounded-2xl border border-line bg-card p-5 transition hover:border-brand-600/40 hover:shadow-card">
                      <span className="flex items-start justify-between gap-3 font-semibold text-heading group-hover:text-brand-600">
                        {e.title}
                        <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-muted transition group-hover:text-brand-600" aria-hidden />
                      </span>
                      <span className="text-sm leading-relaxed text-muted">{e.description}</span>
                      <span className="mt-1 text-xs text-muted/80">{e.path}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </>
  );
}
