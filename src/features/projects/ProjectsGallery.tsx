"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { projectFilters, projectImage, projects, type Project, type ProjectType } from "@/content/projects";

const typeLabel: Record<ProjectType, string> = { Website: "Website", Software: "Software", AI: "AI Solution" };

function ProjectCard({ p, priority }: { p: Project; priority?: boolean }) {
  const host = new URL(p.url).hostname;
  const showLive = p.publicSite !== false;
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-card shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift">
      {/* Screenshot in a browser frame */}
      <div className="section-dark relative overflow-hidden px-5 pt-6 sm:px-7 sm:pt-8">
        <span className="bg-logo-gradient absolute -top-16 -right-16 size-48 rounded-full opacity-25 blur-3xl" aria-hidden />
        <span className="absolute top-3.5 left-4 z-10 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-night-900">{typeLabel[p.type]}</span>
        <div className="relative translate-y-1 overflow-hidden rounded-t-xl bg-white shadow-[0_24px_50px_-20px_rgb(0_0_0/0.6)] ring-1 ring-white/10 transition duration-500 group-hover:translate-y-0">
          <div className="flex h-6 items-center gap-1.5 border-b border-black/5 bg-[#f1edf8] px-3" aria-hidden>
            <span className="size-2 rounded-full bg-[#ff5f57]" /><span className="size-2 rounded-full bg-[#febc2e]" /><span className="size-2 rounded-full bg-[#28c840]" />
            <span className="ml-2 truncate rounded bg-white px-2 text-[10px] leading-4 text-[#6b6480]">{host}</span>
          </div>
          <div className="relative aspect-[16/10]">
            <Image src={projectImage(p.slug)} alt={`${p.name} ${p.type === "Website" ? "website" : "software"} built by Next Vision Technologies`}
              fill priority={priority} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw" className="object-cover object-top" />
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-6">
        <span className="text-xs font-semibold tracking-wider text-brand-600 uppercase">{p.industry}</span>
        <h3 className="text-lg leading-snug font-bold text-heading">{p.name}</h3>
        <p className="text-sm leading-relaxed text-muted">{p.summary}</p>
        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-4">
          {showLive && (
            <a href={p.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${p.name} (opens in a new tab)`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700">
              Visit live {p.type === "Website" ? "site" : "website"} <ArrowUpRight className="size-4" aria-hidden />
            </a>
          )}
          {p.type !== "Website" && (
            <Link href="/book-demo" className="inline-flex items-center gap-1.5 text-sm font-semibold text-heading hover:text-brand-600">
              <CalendarDays className="size-4" aria-hidden /> Request a demo
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

export function ProjectsGallery() {
  const [type, setType] = useState<ProjectType | undefined>();
  const shown = type ? projects.filter((p) => p.type === type) : projects;
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects">
        {projectFilters.map((f) => {
          const count = f.type ? projects.filter((p) => p.type === f.type).length : projects.length;
          const on = f.type === type;
          return (
            <button key={f.label} type="button" aria-pressed={on} onClick={() => setType(f.type)}
              className={`inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition ${on ? "border-primary bg-primary text-on-primary" : "border-line bg-card text-heading hover:border-brand-600 hover:text-brand-600"}`}>
              {f.label}
              <span className={`rounded-full px-2 text-xs ${on ? "bg-white/20" : "bg-surface text-muted"}`}>{count}</span>
            </button>
          );
        })}
      </div>
      <p className="sr-only" role="status">{shown.length} projects shown</p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p, i) => <ProjectCard key={p.slug} p={p} priority={i < 3} />)}
      </div>
    </div>
  );
}
