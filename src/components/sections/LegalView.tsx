import type { Metadata } from "next";
import { getLegal, legalUpdated } from "@/content/legal";
import { PageHero } from "./PageHero";

export const legalMetadata = (slug: string): Metadata => ({ title: getLegal(slug).title });

export function LegalView({ slug }: { slug: string }) {
  const page = getLegal(slug);
  return (
    <>
      <PageHero crumbs={[{ label: "Legal" }, { label: page.title }]} title={page.title} text={`Last updated ${legalUpdated}`} />
      <article className="container-page py-16">
        <div className="prose-nv mx-auto">
          {page.sections.map((s) => (
            <section key={s.heading}>
              <h2>{s.heading}</h2>
              <p>{s.text}</p>
            </section>
          ))}
        </div>
      </article>
    </>
  );
}
