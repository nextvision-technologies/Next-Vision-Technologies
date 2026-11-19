import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays, Check, ChevronRight, Clock, Sparkles } from "lucide-react";
import { getPost, postImage, posts, sortedPosts } from "@/content/blog";
import { formatDate, headingId } from "@/lib/format";
import { ArticleBlock } from "@/features/blog/ArticleBlocks";
import { RichText } from "@/components/ui/RichText";
import { getService } from "@/content/services";
import { site } from "@/content/site";
import { CtaBand, Faq } from "@/components/sections/Blocks";
import { PostCard } from "@/features/blog/PostCard";
import { ReadingProgress, ShareButtons, TableOfContents } from "@/features/blog/ArticleChrome";
import { IconTile } from "@/components/ui/ServiceIcon";
import { buttonClass } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/SiteJsonLd";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const p = getPost((await params).slug);
  if (!p) return {};
  return pageMetadata(`/blog/${p.slug}`, { type: "article", publishedTime: p.date });
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const more = sortedPosts().filter((p) => p.slug !== post.slug).slice(0, 3);
  const service = post.service ? getService(post.service) : undefined;
  const toc = post.body.filter((b) => b.type === "h2").map((b) => ({ id: headingId(b.text), text: b.text }));
  if (post.faqs?.length) toc.push({ id: "faq", text: "Frequently asked questions" });
  const url = `${site.url}/blog/${post.slug}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      image: `${site.url}${postImage(post.slug)}`,
      datePublished: post.date,
      author: { "@type": "Organization", name: site.name },
      publisher: { "@type": "Organization", name: site.name, logo: { "@type": "ImageObject", url: `${site.url}/brand/logo.svg` } },
      mainEntityOfPage: url,
    },
    ...(post.faqs?.length
      ? [{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }]
      : []),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <BreadcrumbJsonLd items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: post.title }]} />
      <ReadingProgress />

      {/* ---------- Hero ---------- */}
      <header className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-card to-card">
        <div className="container-page relative flex flex-col items-center gap-5 pt-10 pb-12 text-center sm:pt-14">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center justify-center gap-1.5 text-sm text-muted">
              <li><Link href="/" className="hover:text-brand-600">Home</Link></li>
              <li><ChevronRight className="size-3.5" aria-hidden /></li>
              <li><Link href="/blog" className="hover:text-brand-600">Blog</Link></li>
              <li><ChevronRight className="size-3.5" aria-hidden /></li>
              <li aria-current="page" className="text-heading">{post.category}</li>
            </ol>
          </nav>
          <span className="solid-primary rounded-full px-3.5 py-1 text-xs font-bold tracking-wide text-white">{post.category}</span>
          <h1 className="max-w-4xl text-3xl leading-[1.15] font-extrabold text-heading sm:text-5xl">{post.title}</h1>
          <p className="max-w-2xl text-lg leading-relaxed text-muted">{post.excerpt}</p>
          <div className="mt-1 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted">
            <span className="flex items-center gap-2.5">
              <span className="inline-flex size-9 items-center justify-center rounded-full border border-line bg-white">
                <Image src="/brand/mark.svg" alt="" width={24} height={24} className="size-6" />
              </span>
              <span className="font-semibold text-heading">Next Vision Team</span>
            </span>
            <span className="flex items-center gap-1.5"><CalendarDays className="size-4" aria-hidden />{formatDate(post.date)}</span>
            <span className="flex items-center gap-1.5"><Clock className="size-4" aria-hidden />{post.readMinutes} min read</span>
          </div>
        </div>
        <div className="container-page relative">
          <div className="relative mx-auto aspect-[16/9] max-w-5xl overflow-hidden rounded-[1.75rem] shadow-[0_30px_80px_-30px_rgb(31_10_77/0.5)] ring-1 ring-black/5">
            <Image src={postImage(post.slug)} alt={post.title} fill priority sizes="(min-width: 1024px) 64rem, 100vw" className="object-cover" />
          </div>
        </div>
      </header>

      {/* ---------- Article + sidebar ---------- */}
      <div className="container-page grid gap-12 py-14 lg:grid-cols-[minmax(0,46rem)_17rem] lg:justify-between lg:gap-16 xl:max-w-6xl">
        <article id="article-body" className="min-w-0">
          {post.takeaways && (
            <section className="mb-10 rounded-2xl border border-line bg-surface p-6 sm:p-8" aria-labelledby="takeaways">
              <h2 id="takeaways" className="flex items-center gap-2 text-lg font-bold text-heading">
                <Sparkles className="size-5 text-brand-600" aria-hidden /> Key takeaways
              </h2>
              <ul className="mt-4 flex flex-col gap-3">
                {post.takeaways.map((t) => (
                  <li key={t} className="flex gap-3 text-body">
                    <Check className="mt-1 size-4 shrink-0 text-brand-600" strokeWidth={3} aria-hidden /><span><RichText text={t} /></span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="prose-nv max-w-none [&>p:first-child]:text-[1.2rem] [&>p:first-child]:leading-[1.7] [&>p:first-child]:font-medium [&>p:first-child]:text-heading">
            {post.body.map((b, i) => <ArticleBlock key={i} block={b} />)}
          </div>

          {/* Mid-article service CTA (mobile shows it here; desktop also has it in the sidebar) */}
          {service && (
            <aside className="section-dark relative mt-12 flex flex-col gap-5 overflow-hidden rounded-[1.5rem] p-7 text-white sm:flex-row sm:items-center sm:p-9">
              <IconTile name={service.icon} size="lg" />
              <div className="relative flex-1">
                <p className="font-display text-xl font-bold">Need help with {service.title}?</p>
                <p className="mt-1 text-white/70">{service.tagline} Get a free consultation and a fixed quote within 24 hours.</p>
              </div>
              <Link href={`/services/${service.slug}`} className={buttonClass("primary", "md", "relative shrink-0")}>
                Learn more <ArrowRight className="size-4" />
              </Link>
            </aside>
          )}

          {post.faqs && post.faqs.length > 0 && (
            <section id="faq" className="mt-16 scroll-mt-32">
              <Faq items={post.faqs} />
            </section>
          )}

          {/* Author box */}
          <section className="mt-14 flex flex-col gap-5 rounded-2xl border border-line p-6 sm:flex-row sm:items-center">
            <span className="inline-flex size-16 shrink-0 items-center justify-center rounded-2xl bg-surface dark:bg-white">
              <Image src="/brand/mark.svg" alt="" width={44} height={44} className="size-11" />
            </span>
            <div className="flex-1">
              <p className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">Written by</p>
              <p className="font-display text-lg font-bold text-heading">The Next Vision Team</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">Developers, AI engineers and marketers sharing what we learn building websites, automations and campaigns for businesses in Pakistan and the UK.</p>
            </div>
          </section>

          <div className="mt-8 lg:hidden"><ShareButtons url={url} title={post.title} /></div>
        </article>

        {/* Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-28 flex flex-col gap-8">
            <TableOfContents items={toc} />
            <ShareButtons url={url} title={post.title} />
            <div className="flex flex-col gap-3 rounded-2xl border border-line bg-surface p-5">
              <p className="font-display font-bold text-heading">Get a free quote</p>
              <p className="text-sm text-muted">Tell us about your project. We reply within 24 hours.</p>
              <Link href="/contact" className={buttonClass("primary", "md", "w-full")}>Start your project</Link>
              <Link href="/book-demo" className="text-center text-sm font-semibold text-brand-600 hover:text-brand-700">or book a free demo</Link>
            </div>
          </div>
        </aside>
      </div>

      {/* ---------- Keep reading ---------- */}
      {more.length > 0 && (
        <section className="bg-surface py-16 sm:py-20">
          <div className="container-page flex flex-col gap-10">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-2xl font-bold text-heading sm:text-3xl">Keep reading</h2>
              <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">All articles <ArrowRight className="size-4" /></Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((p) => <PostCard key={p.slug} p={p} />)}
            </div>
          </div>
        </section>
      )}
      <CtaBand />
    </>
  );
}
