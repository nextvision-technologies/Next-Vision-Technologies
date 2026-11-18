import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/Blocks";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Our Team",
  description: "Meet the leadership team behind Next Vision Technologies: Muhammad Ahsan Khan, Ali Raza, Babar Ali and Ehtisham Malik.",
};

export default function TeamPage() {
  return (
    <>
      <PageHero crumbs={[{ label: "Our Team" }]} eyebrow="Our team" title="The people behind your project"
        text="A leadership team that brings together business, sales and technology, so every project has the right people from day one." />
      <section className="container-page flex flex-col gap-14 py-20 sm:py-24">
        <SectionHeading eyebrow="Leadership" title="Meet our leadership team" />
        <TeamGrid />
      </section>
      <CtaBand title="Want to join us?" text="We're hiring. See our open roles on the careers page." />
    </>
  );
}
