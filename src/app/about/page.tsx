import type { Metadata } from "next";
import { Eye, Rocket, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand, StatsStrip } from "@/components/sections/Blocks";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = { title: "About Us", description: "Who we are, what we believe and how Next Vision Technologies works." };

const values = [
  { icon: Eye, title: "Vision first", text: "We start from where your business needs to be, then choose the technology to get there." },
  { icon: Rocket, title: "Results over output", text: "We measure success in leads, sales and hours saved, not pages delivered." },
  { icon: ShieldCheck, title: "Honest partnership", text: "Fixed quotes, clear timelines and straight answers, even when that means saying no." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero crumbs={[{ label: "About Us" }]} eyebrow="About us" title="We help businesses see what's next and build it"
        text="Next Vision Technologies is a technology and marketing company working across AI, SaaS, websites and digital growth." />
      <section className="container-page grid gap-12 py-20 lg:grid-cols-2">
        <SectionHeading align="left" eyebrow="Our story" title="Built by engineers and marketers together" />
        <div className="flex flex-col gap-4 text-lg leading-relaxed text-muted">
          {/* TODO: replace with the real company story */}
          <p>We started Next Vision because businesses kept telling us the same thing: their website, marketing and software were handled by different people who never talked to each other.</p>
          <p>Today one team plans, builds and grows your digital presence, with AI and automation built in from day one.</p>
        </div>
      </section>
      <section className="bg-navy-radial py-16"><div className="container-page"><StatsStrip tone="dark" /></div></section>
      <section className="container-page flex flex-col gap-12 py-20">
        <SectionHeading eyebrow="Our values" title="How we work" />
        <div className="grid gap-6 md:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="flex flex-col gap-3 rounded-card border border-line p-7">
              <v.icon className="size-8 text-brand-600" aria-hidden strokeWidth={1.8} />
              <h3 className="text-xl font-bold text-navy-900">{v.title}</h3>
              <p className="text-muted">{v.text}</p>
            </div>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
