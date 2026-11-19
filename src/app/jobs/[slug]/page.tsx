import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { getJob, jobs } from "@/content/misc";
import { site, whatsappLink } from "@/content/site";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return jobs.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: PageProps<"/jobs/[slug]">): Promise<Metadata> {
  const j = getJob((await params).slug);
  return j ? pageMetadata(`/jobs/${j.slug}`) : {};
}

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-heading">{title}</h2>
      <ul className="flex flex-col gap-3">
        {items.map((i) => <li key={i} className="flex gap-3"><Check className="mt-0.5 size-5 shrink-0 text-brand-600" aria-hidden />{i}</li>)}
      </ul>
    </div>
  );
}

export default async function JobPage({ params }: PageProps<"/jobs/[slug]">) {
  const job = getJob((await params).slug);
  if (!job) notFound();
  return (
    <>
      <PageHero crumbs={[{ label: "Careers", href: "/jobs" }, { label: job.title }]} eyebrow={`${job.type} · ${job.location}`} title={job.title} text={job.summary} />
      <section className="container-page grid gap-12 py-20 lg:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col gap-12">
          <List title="What you'll do" items={job.responsibilities} />
          <List title="What we're looking for" items={job.requirements} />
        </div>
        <aside className="h-fit rounded-card border border-line bg-surface p-7">
          <h2 className="text-lg font-bold text-heading">How to apply</h2>
          <p className="mt-3 text-muted">Send your CV to <strong className="text-heading">{site.email}</strong> with &ldquo;{job.title}&rdquo; in the subject, or message us on WhatsApp.</p>
          <div className="mt-6 flex flex-col gap-3">
            <Button href={`mailto:${site.email}?subject=${encodeURIComponent(`Application: ${job.title}`)}`}>Email your CV</Button>
            <Button href={whatsappLink(`Hi, I'd like to apply for the ${job.title} role.`)} variant="secondary">Apply on WhatsApp</Button>
          </div>
        </aside>
      </section>
    </>
  );
}
