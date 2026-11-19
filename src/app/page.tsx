import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Headset, Mail, Rocket, Zap } from "lucide-react";
import { services } from "@/content/services";
import { testimonials } from "@/content/misc";
import { site, whatsappLink } from "@/content/site";
import { publicFile } from "@/lib/files";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SocialIcon } from "@/components/ui/SocialIcons";
import { PixelCluster } from "@/components/sections/PageHero";
import { CtaBand, Faq, Testimonials } from "@/components/sections/Blocks";
import { PricingCards } from "@/features/pricing/PricingCards";
import { ContactForm } from "@/features/contact/ContactForm";
import { PinnedHero } from "@/features/home/PinnedHero";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TechMarquee } from "@/features/home/TechMarquee";
import { ServiceTabs } from "@/features/home/ServiceTabs";

const reasons = [
  { icon: Rocket, title: "Built around growth", text: "Every project starts from a business goal: more leads, more sales or fewer manual hours." },
  { icon: Zap, title: "AI-first technology", text: "Automation, AI agents and modern frameworks that keep you ahead of competitors." },
  { icon: Headset, title: "Support that answers", text: "A dedicated contact on WhatsApp, with replies the same working day." },
  { icon: BadgeCheck, title: "Quality checked", text: "Real-device testing, speed checks and security reviews before every launch." },
];

const steps = [
  { title: "Discover", text: "A free call to understand your goals, audience and budget." },
  { title: "Plan & quote", text: "A written plan, timeline and fixed price within 24 hours." },
  { title: "Design & build", text: "Weekly previews so you see progress and give feedback early." },
  { title: "Launch & grow", text: "Go live, track results and keep improving with ongoing support." },
];

const faqs = [
  { q: "How much does a project cost?", a: "Websites start from a few pages on our Silver plan; larger apps and automations get a fixed quote after a free consultation." },
  { q: "How long does it take?", a: "Most business websites take 2 to 4 weeks. AI automations and chatbots usually go live in 2 to 4 weeks as well." },
  { q: "Do you work with clients outside Pakistan?", a: "Yes. We have teams serving clients in Pakistan and the United Kingdom, and we work remotely with businesses worldwide." },
  { q: "Will I own my website and code?", a: "Yes. Once the project is paid, the code, domain and content belong to you." },
];

// Hero media: drop public/video/hero.mp4 (+ optional hero-poster.webp) in place and the
// animated brand scene is swapped for the video on the next build.
const heroVideo = publicFile("video", "hero.mp4")
  ? { src: "/video/hero.mp4", poster: publicFile("video", "hero-poster.webp") ? "/video/hero-poster.webp" : undefined }
  : undefined;

const hasRealReviews = testimonials.every((t) => !t.text.startsWith("Placeholder"));

export default function Home() {
  return (
    <>
      {/* ---------- Pinned expanding hero ---------- */}
      <PinnedHero video={heroVideo} />

      {/* ---------- Stats card overlapping hero ---------- */}
      <section className="container-page relative z-10 -mt-16 lg:-mt-20">
        <dl data-reveal="zoom" className="grid grid-cols-2 divide-line overflow-hidden rounded-[1.5rem] border border-line bg-card shadow-lift lg:grid-cols-4 lg:divide-x">
          {site.stats.map((s) => (
            <div key={s.label} className="flex flex-col gap-1 p-6 text-center sm:p-8">
              <dd className="text-brand-600 font-display text-4xl font-extrabold sm:text-5xl">{s.value}</dd>
              <dt className="text-sm font-medium text-muted">{s.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      <div className="mt-16" data-reveal><TechMarquee /></div>

      {/* ---------- Services ---------- */}
      <section className="bg-surface py-20 sm:py-24">
        <div className="container-page flex flex-col gap-12">
          <div data-reveal><SectionHeading eyebrow="What we do" title={<>{services.length} services. <span className="text-brand-600">One team.</span></>}
            text="Choose a category to see how we can help, from AI agents to Google rankings." /></div>
          <div data-reveal><ServiceTabs /></div>
          <Button href="/services" variant="secondary" className="mx-auto">View all services <ArrowRight className="size-4" /></Button>
        </div>
      </section>

      {/* ---------- Why us (bento) ---------- */}
      <section className="container-page py-20 sm:py-24">
        <div data-reveal-stagger className="grid gap-5 lg:grid-cols-3">
          <div className="section-dark relative flex flex-col justify-between gap-10 overflow-hidden rounded-[1.75rem] p-8 text-white sm:p-10 lg:row-span-2">
            <div className="relative flex flex-col gap-5">
              <span className="text-xs font-semibold tracking-[0.16em] text-glow-400 uppercase">Why Next Vision</span>
              <h2 className="text-3xl leading-tight font-extrabold sm:text-4xl">One partner for AI, software and growth</h2>
              <p className="text-white/70">Strategy, design, development and marketing under one roof, so nothing gets lost between agencies.</p>
            </div>
            <div className="relative flex items-end justify-between">
              <Image src="/brand/mark-white.svg" alt="" width={136} height={136} className="size-28 opacity-90" />
              <Link href="/about" className="inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-glow-400">About us <ArrowRight className="size-4" /></Link>
            </div>
          </div>
          {reasons.map((r) => (
            <div key={r.title} className="group flex flex-col gap-4 rounded-[1.5rem] border border-line bg-card p-7 transition hover:-translate-y-1 hover:shadow-lift">
              <span className="inline-flex size-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition group-hover:solid-primary">
                <r.icon className="size-6" aria-hidden strokeWidth={1.8} />
              </span>
              <h3 className="text-xl font-bold text-heading">{r.title}</h3>
              <p className="leading-relaxed text-muted">{r.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Process ---------- */}
      <section className="section-dark relative overflow-hidden py-20 text-white sm:py-24">
        <PixelCluster className="absolute top-10 right-8 hidden w-32 lg:block" />
        <div className="container-page relative flex flex-col gap-14">
          <div data-reveal><SectionHeading tone="dark" eyebrow="How we work" title="From first call to launch in four steps" /></div>
          <ol data-reveal-stagger className="relative grid gap-10 md:grid-cols-4 md:gap-6">
            <span className="solid-primary absolute top-6 right-[12%] left-[12%] hidden h-0.5 md:block" aria-hidden />
            {steps.map((s, i) => (
              <li key={s.title} className="relative flex flex-col items-center gap-4 text-center">
                <span className="solid-primary relative inline-flex size-12 items-center justify-center rounded-full font-display text-lg font-extrabold text-white ring-8 ring-charcoal-950">
                  {i + 1}
                </span>
                <h3 className="text-xl font-bold">{s.title}</h3>
                <p className="max-w-[16rem] text-sm leading-relaxed text-white/65">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Pricing ---------- */}
      <section className="py-20 sm:py-24">
        <div className="container-page flex flex-col gap-14">
          <div data-reveal><SectionHeading eyebrow="Growth packages" title="Monthly plans that grow with you"
            text="Website, marketing and automation in one simple monthly price. Need something different? We'll build a custom package." /></div>
          <div data-reveal="zoom"><PricingCards /></div>
          <p className="text-center text-sm text-muted">
            One-off project? <Link href="/pricing" className="font-semibold text-brand-600">See all pricing</Link> or <Link href="/contact" className="font-semibold text-brand-600">ask for a custom quote</Link>.
          </p>
        </div>
      </section>

      {/* ---------- Reviews (shown once real reviews are added in content/misc.ts) ---------- */}
      {hasRealReviews && (
        <section className="bg-surface py-20">
          <div className="container-page flex flex-col gap-12">
            <div data-reveal><SectionHeading eyebrow="Client reviews" title="What our clients say" /></div>
            <div data-reveal><Testimonials /></div>
          </div>
        </section>
      )}

      {/* ---------- Quote ---------- */}
      <section id="quote" className="bg-surface py-20 sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div data-reveal="left" className="flex flex-col gap-7">
            <SectionHeading align="left" eyebrow="Free consultation" title="Get a free quote in 24 hours"
              text="Share your idea and we'll reply with a clear plan, timeline and fixed price. No obligation." />
            <div className="flex flex-col gap-3">
              {[
                { label: "WhatsApp Pakistan", value: site.phones[0].value, href: whatsappLink(), icon: <SocialIcon name="whatsapp" className="size-5 text-[#25D366]" /> },
                { label: "WhatsApp UK", value: site.phones[1].value, href: site.phones[1].href, icon: <SocialIcon name="whatsapp" className="size-5 text-[#25D366]" /> },
                { label: "Email", value: site.email, href: `mailto:${site.email}`, icon: <Mail className="size-5 text-brand-600" /> },
              ].map((c) => (
                <a key={c.label} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-2xl border border-line bg-card p-4 transition hover:border-brand-600/40 hover:shadow-card">
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-surface">{c.icon}</span>
                  <span>
                    <span className="block text-xs text-muted">{c.label}</span>
                    <span className="block font-semibold text-heading">{c.value}</span>
                  </span>
                  <ArrowRight className="ml-auto size-4 text-brand-600" aria-hidden />
                </a>
              ))}
            </div>
          </div>
          <div data-reveal="right" className="rounded-[1.75rem] border border-line bg-card p-6 shadow-lift sm:p-10">
            <h3 className="text-2xl font-bold text-heading">Start your project</h3>
            <p className="mt-1 mb-7 text-sm text-muted">Takes less than a minute. We reply within one working day.</p>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="container-page py-20 sm:py-24" data-reveal><Faq items={faqs} /></section>

      <div data-reveal="zoom"><CtaBand /></div>
      <ScrollReveal />
    </>
  );
}
