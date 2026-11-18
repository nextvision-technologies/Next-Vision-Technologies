import type { Metadata } from "next";
import { team } from "@/content/misc";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/Blocks";

export const metadata: Metadata = { title: "Our Team", description: "Meet the people behind Next Vision Technologies." };

export default function TeamPage() {
  return (
    <>
      <PageHero crumbs={[{ label: "Our Team" }]} eyebrow="Our team" title="The people who build it"
        text="Developers, AI engineers, designers and marketers working as one team." />
      <section className="container-page grid gap-6 py-20 sm:grid-cols-2 lg:grid-cols-4">
        {team.map((m, i) => (
          <article key={i} className="flex flex-col overflow-hidden rounded-card border border-line bg-white shadow-card">
            {/* TODO: add team photos to /public/team and render with next/image */}
            <div className="bg-brand-gradient flex aspect-square items-center justify-center font-display text-5xl font-extrabold text-white/90">
              {m.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
            </div>
            <div className="p-5">
              <h2 className="text-lg font-bold text-navy-900">{m.name}</h2>
              <p className="text-sm text-muted">{m.role}</p>
            </div>
          </article>
        ))}
      </section>
      <CtaBand title="Want to join us?" text="We're hiring. See our open roles on the careers page." />
    </>
  );
}
