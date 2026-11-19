import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, BadgeCheck, CalendarDays, Check, ChevronRight, Clock, FileText, Wrench } from "lucide-react";
import { defaultProcess, getService, services } from "@/content/services";
import { postImage, sortedPosts } from "@/content/blog";
import { site, whatsappLink } from "@/content/site";
import { CtaBand, Faq } from "@/components/sections/Blocks";
import { ServiceCard } from "@/features/services/ServiceCard";
import { formatDate } from "@/lib/format";
import { PixelCluster } from "@/components/sections/PageHero";
import { Button, buttonClass } from "@/components/ui/Button";
import { IconTile, ServiceIcon } from "@/components/ui/ServiceIcon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SocialIcon } from "@/components/ui/SocialIcons";
import { pageMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/SiteJsonLd";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const s = getService((await params).slug);
  if (!s) return {};
  return pageMetadata(`/services/${s.slug}`);
}

const sections = [
  { id: "overview", label: "Overview" },
  { id: "offer", label: "What we offer" },
  { id: "process", label: "Process" },
  { id: "tools", label: "Technologies" },
  { id: "faq", label: "FAQ" },
];

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const s = getService((await params).slug);
  if (!s) notFound();
  const related = s.related.map(getService).filter((r) => r !== undefined);
  const sameCategory = services.filter((x) => x.category === s.category && x.slug !== s.slug);
  const allPosts = sortedPosts();
  const articles = [...allPosts.filter((p) => p.service === s.slug), ...allPosts.filter((p) => p.service !== s.slug)].slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    description: s.intro,
    serviceType: s.category,
    provider: { "@type": "Organization", name: site.name, url: site.url },
    areaServed: ["Pakistan", "United Kingdom"],
  };

  return (
    <>
      <BreadcrumbJsonLd items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: s.title }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      {/* ---------- Hero ---------- */}
      <section className="section-dark relative overflow-hidden text-white">
        <div className="container-page relative grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.25fr_1fr]">
          <div className="flex flex-col gap-5">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/60">
                <li><Link href="/" className="hover:text-white">Home</Link></li>
                <li><ChevronRight className="size-3.5" aria-hidden /></li>
                <li><Link href="/services" className="hover:text-white">Services</Link></li>
                <li><ChevronRight className="size-3.5" aria-hidden /></li>
                <li aria-current="page" className="text-white/90">{s.title}</li>
              </ol>
            </nav>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] py-1 pr-3.5 pl-1 text-sm text-white/80">
              <span className="solid-primary inline-flex size-6 items-center justify-center rounded-full"><ServiceIcon name={s.icon} className="size-3.5" /></span>
              {s.category}
            </span>
            <h1 className="text-4xl leading-[1.08] font-extrabold sm:text-5xl lg:text-[3.4rem]">{s.title}</h1>
            <p className="max-w-xl text-lg leading-relaxed text-white/75">{s.tagline} {s.short}</p>
            <div className="flex flex-wrap gap-3">
              <Button href="/contact" size="lg">Get a free quote <ArrowRight className="size-4" /></Button>
              <Button href={whatsappLink(`Hi Next Vision, I'm interested in ${s.title}.`)} variant="light" size="lg">
                <SocialIcon name="whatsapp" className="size-5" /> Chat on WhatsApp
              </Button>
            </div>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/65">
              {["Free consultation", "Fixed-price quote in 24h", "You own everything"].map((t) => (
                <li key={t} className="flex items-center gap-2"><Check className="size-4 text-glow-400" aria-hidden />{t}</li>
              ))}
            </ul>
          </div>

          {/* At a glance card */}
          <div className="relative">
            <PixelCluster className="absolute -top-10 -right-4 w-28" />
            <div className="relative rounded-[1.75rem] border border-white/12 bg-white/[0.07] p-6 shadow-2xl md:backdrop-blur-xl sm:p-7">
              <div className="flex items-center gap-4">
                <IconTile name={s.icon} size="lg" />
                <div>
                  <p className="text-xs font-semibold tracking-[0.14em] text-glow-400 uppercase">At a glance</p>
                  <p className="font-display text-lg font-bold">{s.title}</p>
                </div>
              </div>
              <ul className="mt-5 flex flex-col gap-2.5">
                {s.benefits.slice(0, 4).map((b) => (
                  <li key={b} className="flex gap-2.5 text-sm text-white/85">
                    <BadgeCheck className="mt-0.5 size-4 shrink-0 text-glow-400" aria-hidden />{b}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                {s.tags.map((t) => <span key={t} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80">{t}</span>)}
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3 border-t border-white/10 pt-5 text-sm">
                <Link href="/pricing" className="group rounded-xl bg-white/[0.06] p-3 transition hover:bg-white/10">
                  <span className="block text-xs text-white/55">Pricing</span>
                  <span className="flex items-center gap-1 font-semibold">See packages <ArrowUpRight className="size-3.5 transition group-hover:translate-x-0.5" /></span>
                </Link>
                <Link href="/book-demo" className="group rounded-xl bg-white/[0.06] p-3 transition hover:bg-white/10">
                  <span className="block text-xs text-white/55">Free 30 min</span>
                  <span className="flex items-center gap-1 font-semibold">Book a demo <ArrowUpRight className="size-3.5 transition group-hover:translate-x-0.5" /></span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Sticky section menu ---------- */}
      <nav aria-label="On this page" className="sticky top-16 z-30 border-b border-line bg-card/90 md:backdrop-blur lg:top-[4.5rem]">
        <ul className="container-page flex gap-1 overflow-x-auto py-2.5 text-sm font-semibold">
          {sections.map((x) => (
            <li key={x.id}>
              <a href={`#${x.id}`} className="block rounded-full px-4 py-2 whitespace-nowrap text-muted transition hover:bg-brand-50 hover:text-brand-600">{x.label}</a>
            </li>
          ))}
          <li className="ml-auto hidden sm:block">
            <Link href="/contact" className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-4 py-2 whitespace-nowrap text-brand-600 hover:bg-brand-100">Get a quote <ArrowRight className="size-4" aria-hidden /></Link>
          </li>
        </ul>
      </nav>

      {/* ---------- Main + sidebar ---------- */}
      <div className="container-page grid gap-12 py-14 sm:py-16 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-14">
        <div className="flex min-w-0 flex-col gap-20">
          {/* Overview */}
          <section id="overview" className="scroll-mt-40">
            <span className="text-xs font-semibold tracking-[0.16em] text-brand-600 uppercase">Overview</span>
            <h2 className="mt-3 text-3xl leading-tight font-extrabold text-heading sm:text-4xl">What {s.title} can do for you</h2>
            <div className="mt-5 flex flex-col gap-4 text-lg leading-relaxed text-body">
              <p>{s.intro}</p>
              {related.length > 0 && (
                <p>
                  It works best as part of a bigger plan. Many clients pair it with{" "}
                  {related.map((r, i) => (
                    <span key={r.slug}>
                      <Link href={`/services/${r.slug}`} className="font-semibold text-brand-600 underline decoration-brand-600/30 underline-offset-4 hover:decoration-brand-600">{r.title}</Link>
                      {i < related.length - 2 ? ", " : i === related.length - 2 ? " and " : ""}
                    </span>
                  ))}
                  , and our <Link href="/pricing" className="font-semibold text-brand-600 underline decoration-brand-600/30 underline-offset-4 hover:decoration-brand-600">monthly growth packages</Link> bundle them into one simple price.
                </p>
              )}
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {s.benefits.map((b) => (
                <div key={b} className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-4">
                  <span className="solid-primary inline-flex size-8 shrink-0 items-center justify-center rounded-full text-white"><Check className="size-4" strokeWidth={3} /></span>
                  <span className="font-medium text-heading">{b}</span>
                </div>
              ))}
            </div>
          </section>

          {/* What we offer */}
          <section id="offer" className="scroll-mt-40">
            <span className="text-xs font-semibold tracking-[0.16em] text-brand-600 uppercase">What we offer</span>
            <h2 className="mt-3 text-3xl leading-tight font-extrabold text-heading sm:text-4xl">What&apos;s included in {s.title}</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {s.offerings.map((o) => (
                <article key={o.title} className="group relative overflow-hidden rounded-2xl border border-line bg-card p-6 transition hover:-translate-y-1 hover:border-brand-600/30 hover:shadow-lift">
                  <span className="solid-primary absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition duration-300 group-hover:scale-x-100" aria-hidden />
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition group-hover:solid-primary group-hover:text-white">
                    <ServiceIcon name={s.icon} className="size-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-heading">{o.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{o.text}</p>
                </article>
              ))}
            </div>
          </section>

          {/* Process */}
          <section id="process" className="scroll-mt-40">
            <span className="text-xs font-semibold tracking-[0.16em] text-brand-600 uppercase">Our process</span>
            <h2 className="mt-3 text-3xl leading-tight font-extrabold text-heading sm:text-4xl">How we deliver {s.title}</h2>
            <ol className="relative mt-8 flex flex-col gap-6 before:absolute before:top-2 before:bottom-2 before:left-[1.4rem] before:w-0.5 before:bg-gradient-to-b before:from-brand-700 before:to-glow-400">
              {defaultProcess.map((p, i) => (
                <li key={p.title} className="relative flex gap-5">
                  <span className="solid-primary relative z-10 inline-flex size-11 shrink-0 items-center justify-center rounded-full font-display font-extrabold text-white ring-4 ring-card">{i + 1}</span>
                  <div className="flex-1 rounded-2xl border border-line bg-card p-5">
                    <h3 className="font-bold text-heading">{p.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{p.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Tools */}
          <section id="tools" className="section-dark relative scroll-mt-40 overflow-hidden rounded-[1.75rem] p-8 text-white sm:p-10">
            <div className="relative">
              <span className="flex items-center gap-2 text-xs font-semibold tracking-[0.16em] text-glow-400 uppercase"><Wrench className="size-4" /> Tools &amp; technologies</span>
              <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">What we build with</h2>
              <ul className="mt-6 flex flex-wrap gap-2.5">
                {s.tools.map((t) => <li key={t} className="rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 text-sm font-medium">{t}</li>)}
              </ul>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="scroll-mt-40"><Faq items={s.faqs} title={`${s.title} questions`} /></section>
        </div>

        {/* Sidebar */}
        <aside className="lg:block">
          <div className="flex flex-col gap-6 lg:sticky lg:top-40">
            <div className="rounded-2xl section-dark relative overflow-hidden p-6 text-white">
              <div className="relative flex flex-col gap-3">
                <p className="font-display text-lg font-bold">Start your {s.title} project</p>
                <p className="text-sm text-white/70">Free consultation and a fixed quote within 24 hours.</p>
                <Link href="/contact" className={buttonClass("primary", "md", "w-full")}>Get a free quote</Link>
                <Link href="/book-demo" className={buttonClass("light", "md", "w-full")}><CalendarDays className="size-4" /> Book a demo</Link>
                <a href={site.phones[0].href} className="text-center text-sm text-white/70 hover:text-white">or call {site.phones[0].value}</a>
              </div>
            </div>

            {sameCategory.length > 0 && (
              <nav aria-label={`More ${s.category} services`} className="rounded-2xl border border-line p-5">
                <p className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">More in {s.category}</p>
                <ul className="mt-3 flex flex-col">
                  {sameCategory.map((x) => (
                    <li key={x.slug}>
                      <Link href={`/services/${x.slug}`} className="group flex items-center gap-3 rounded-xl px-2 py-2.5 transition hover:bg-surface">
                        <span className="inline-flex size-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600"><ServiceIcon name={x.icon} className="size-4" /></span>
                        <span className="flex-1 text-sm font-semibold text-heading group-hover:text-brand-600">{x.title}</span>
                        <ChevronRight className="size-4 text-muted" aria-hidden />
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href="/services" className="mt-2 inline-flex items-center gap-1.5 px-2 text-sm font-semibold text-brand-600">View all {services.length} services <ArrowRight className="size-4" aria-hidden /></Link>
              </nav>
            )}

            <Link href="/pricing" className="group flex items-center gap-4 rounded-2xl border border-line p-5 transition hover:border-brand-600/30 hover:shadow-card">
              <span className="inline-flex size-10 items-center justify-center rounded-xl bg-glow-100 text-glow-400"><FileText className="size-5" /></span>
              <span className="flex-1">
                <span className="block text-sm font-semibold text-heading">Monthly packages</span>
                <span className="block text-xs text-muted">From $249/month, all-in-one</span>
              </span>
              <ArrowRight className="size-4 text-brand-600 transition group-hover:translate-x-1" aria-hidden />
            </Link>
          </div>
        </aside>
      </div>

      {/* ---------- Related articles ---------- */}
      {articles.length > 0 && (
        <section className="bg-surface py-16 sm:py-20">
          <div className="container-page flex flex-col gap-10">
            <div className="flex items-end justify-between gap-4">
              <SectionHeading align="left" eyebrow="From our blog" title="Helpful reading" />
              <Link href="/blog" className="hidden items-center gap-1.5 text-sm font-semibold text-brand-600 sm:inline-flex">All articles <ArrowRight className="size-4" /></Link>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {articles.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="group grid overflow-hidden rounded-2xl border border-line bg-card transition hover:shadow-lift sm:grid-cols-[14rem_1fr]">
                  <div className="relative aspect-[16/9] sm:aspect-auto">
                    <Image src={postImage(p.slug)} alt="" fill sizes="(min-width: 640px) 14rem, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
                  </div>
                  <div className="flex flex-col gap-2 p-5">
                    <span className="text-xs font-semibold text-brand-600">{p.category}</span>
                    <h3 className="font-bold leading-snug text-heading group-hover:text-brand-600">{p.title}</h3>
                    <p className="mt-auto flex items-center gap-3 text-xs text-muted">
                      <span>{formatDate(p.date)}</span>
                      <span className="inline-flex items-center gap-1"><Clock className="size-3.5" />{p.readMinutes} min</span>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------- Related services ---------- */}
      {related.length > 0 && (
        <section className="container-page flex flex-col gap-10 py-16 sm:py-20">
          <SectionHeading eyebrow="Related services" title="Often combined with" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => <ServiceCard key={r.slug} s={r} />)}
          </div>
        </section>
      )}

      {/* ---------- All services (internal links) ---------- */}
      <section className="border-t border-line py-12">
        <div className="container-page flex flex-col gap-5">
          <p className="text-sm font-semibold text-heading">Explore all our services</p>
          <ul className="flex flex-wrap gap-2">
            {services.map((x) => (
              <li key={x.slug}>
                <Link href={`/services/${x.slug}`} aria-current={x.slug === s.slug ? "page" : undefined}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm transition ${
                    x.slug === s.slug ? "border-brand-600 bg-brand-50 font-semibold text-brand-700" : "border-line text-muted hover:border-brand-600/40 hover:text-brand-600"}`}>
                  <ServiceIcon name={x.icon} className="size-3.5" />{x.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand title={`Let's talk about your ${s.title} project`} />
    </>
  );
}
