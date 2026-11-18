import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Briefcase, MapPin } from "lucide-react";
import { jobs } from "@/content/misc";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = { title: "Careers", description: "Open roles at Next Vision Technologies." };

export default function JobsPage() {
  return (
    <>
      <PageHero crumbs={[{ label: "Careers" }]} eyebrow="Careers" title="Build what's next with us"
        text="We're a growing team working on AI, software and marketing projects for clients in Pakistan and abroad." />
      <section className="container-page flex flex-col gap-4 py-20">
        <h2 className="text-2xl font-bold text-heading">Open positions ({jobs.length})</h2>
        {jobs.map((j) => (
          <Link key={j.slug} href={`/jobs/${j.slug}`}
            className="group flex flex-col gap-3 rounded-card border border-line bg-card p-6 shadow-card transition hover:border-brand-400/50 hover:shadow-lift sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold text-heading group-hover:text-brand-600">{j.title}</h3>
              <p className="text-muted">{j.summary}</p>
              <p className="flex flex-wrap gap-4 text-sm text-muted">
                <span className="inline-flex items-center gap-1.5"><Briefcase className="size-4" aria-hidden />{j.type}</span>
                <span className="inline-flex items-center gap-1.5"><MapPin className="size-4" aria-hidden />{j.location}</span>
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 font-semibold text-brand-600">View role <ArrowRight className="size-4" aria-hidden /></span>
          </Link>
        ))}
      </section>
    </>
  );
}
