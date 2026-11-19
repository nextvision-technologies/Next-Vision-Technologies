import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, ChevronRight, Clock, Cookie, FileText, Globe, Lock, Mail, RotateCcw, ShieldCheck, type LucideIcon } from "lucide-react";
import { getLegal, legalPages, legalUpdated } from "@/content/legal";
import { headingId } from "@/lib/format";
import { site, whatsappLink } from "@/content/site";
import { ArticleBlock } from "@/features/blog/ArticleBlocks";
import { RichText } from "@/components/ui/RichText";
import { ReadingProgress, TableOfContents } from "@/features/blog/ArticleChrome";
import { buttonClass } from "@/components/ui/Button";
import { SocialIcon } from "@/components/ui/SocialIcons";
import { pageMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/SiteJsonLd";

const icons: Record<string, LucideIcon> = {
  terms: FileText, "privacy-policy": Lock, "refund-policy": RotateCcw, gdpr: Globe, security: ShieldCheck, "cookie-policy": Cookie,
};

export const legalMetadata = (slug: string): Metadata => pageMetadata(`/${slug}`);

/** Rough reading time from the page's text */
function readMinutes(slug: string) {
  const p = getLegal(slug);
  const words = JSON.stringify(p.sections).split(/\s+/).length;
  return Math.max(2, Math.round(words / 220));
}

export function LegalView({ slug }: { slug: string }) {
  const page = getLegal(slug);
  const Icon = icons[slug] ?? FileText;
  const others = legalPages.filter((p) => p.slug !== slug);
  const toc = page.sections.map((s, i) => ({ id: headingId(s.heading), text: `${i + 1}. ${s.heading}` }));

  return (
    <>
      <BreadcrumbJsonLd items={[{ label: "Home", href: "/" }, { label: page.title }]} />
      <ReadingProgress />

      {/* ---------- Hero ---------- */}
      <header className="relative overflow-hidden border-b border-line bg-gradient-to-b from-brand-50 via-card to-card">
        <div className="container-page relative flex flex-col gap-5 py-12 sm:py-14">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
              <li><Link href="/" className="hover:text-brand-600">Home</Link></li>
              <li><ChevronRight className="size-3.5" aria-hidden /></li>
              <li>Legal</li>
              <li><ChevronRight className="size-3.5" aria-hidden /></li>
              <li aria-current="page" className="text-heading">{page.title}</li>
            </ol>
          </nav>
          <div className="flex items-center gap-4">
            <span className="solid-primary inline-flex size-14 shrink-0 items-center justify-center rounded-2xl text-white shadow-lift">
              <Icon className="size-7" strokeWidth={1.8} aria-hidden />
            </span>
            <h1 className="text-3xl leading-tight font-extrabold text-heading sm:text-5xl">{page.title}</h1>
          </div>
          <div className="flex flex-wrap gap-2.5 text-sm">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-3 py-1.5 text-muted"><CalendarDays className="size-4" aria-hidden /> Last updated {legalUpdated}</span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-3 py-1.5 text-muted"><Clock className="size-4" aria-hidden /> {readMinutes(slug)} min read</span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-3 py-1.5 text-muted"><Globe className="size-4" aria-hidden /> Pakistan &amp; United Kingdom</span>
          </div>
        </div>
      </header>

      {/* ---------- Body ---------- */}
      <div className="container-page grid gap-12 py-12 sm:py-14 lg:grid-cols-[16rem_minmax(0,46rem)] lg:justify-between lg:gap-16 xl:max-w-6xl">
        {/* Sidebar (left on desktop) */}
        <aside className="order-2 lg:order-1">
          <div className="flex flex-col gap-8 lg:sticky lg:top-28">
            <div className="hidden lg:block"><TableOfContents items={toc} /></div>
            <nav aria-label="Legal pages" className="rounded-2xl border border-line p-4">
              <p className="px-2 text-xs font-semibold tracking-[0.14em] text-muted uppercase">Legal pages</p>
              <ul className="mt-2 flex flex-col">
                {legalPages.map((p) => {
                  const I = icons[p.slug] ?? FileText;
                  const current = p.slug === slug;
                  return (
                    <li key={p.slug}>
                      <Link href={`/${p.slug}`} aria-current={current ? "page" : undefined}
                        className={`flex items-center gap-2.5 rounded-xl px-2 py-2 text-sm transition ${current ? "bg-brand-50 font-semibold text-brand-700" : "text-heading hover:bg-surface hover:text-brand-600"}`}>
                        <I className="size-4 shrink-0" aria-hidden /> {p.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </aside>

        {/* Main */}
        <article id="article-body" className="order-1 min-w-0 lg:order-2">
          <section className="rounded-2xl border border-line bg-surface p-6 sm:p-7" aria-label="Summary">
            <p className="text-xs font-bold tracking-[0.14em] text-brand-600 uppercase">In short</p>
            <p className="mt-2 text-lg leading-relaxed text-heading">{page.summary}</p>
          </section>

          <div className="prose-nv mt-4 max-w-none">
            {page.sections.map((s, i) => (
              <section key={s.heading}>
                <h2 id={headingId(s.heading)} className="flex items-baseline gap-3">
                  <span className="text-brand-600 font-display text-lg font-extrabold">{String(i + 1).padStart(2, "0")}</span>
                  {s.heading}
                </h2>
                {s.body.map((b, j) => <ArticleBlock key={j} block={b} />)}
              </section>
            ))}
          </div>

          {/* Contact card */}
          <section className="section-dark relative mt-14 overflow-hidden rounded-[1.5rem] p-7 text-white sm:p-9">
            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
              <span className="solid-primary inline-flex size-14 shrink-0 items-center justify-center rounded-2xl"><Mail className="size-7" /></span>
              <div className="flex-1">
                <p className="font-display text-xl font-bold">Questions about this policy?</p>
                <p className="mt-1 text-white/70">Email <RichText text={`[${site.email}](mailto:${site.email})`} /> and we&apos;ll reply within 2 working days.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className={buttonClass("primary")}>Contact us <ArrowRight className="size-4" /></Link>
                <a href={whatsappLink("Hi Next Vision, I have a question about your policies.")} target="_blank" rel="noopener noreferrer" className={buttonClass("light")}>
                  <SocialIcon name="whatsapp" className="size-4" /> WhatsApp
                </a>
              </div>
            </div>
          </section>

          {/* Related legal pages */}
          <section className="mt-14">
            <h2 className="text-xl font-bold text-heading">Related policies</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {others.slice(0, 4).map((p) => {
                const I = icons[p.slug] ?? FileText;
                return (
                  <Link key={p.slug} href={`/${p.slug}`} className="group flex gap-4 rounded-2xl border border-line p-5 transition hover:-translate-y-0.5 hover:border-brand-600/30 hover:shadow-card">
                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition group-hover:solid-primary group-hover:text-white"><I className="size-5" /></span>
                    <span>
                      <span className="block font-semibold text-heading group-hover:text-brand-600">{p.title}</span>
                      <span className="mt-0.5 line-clamp-2 block text-sm text-muted">{p.summary}</span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        </article>
      </div>
    </>
  );
}
