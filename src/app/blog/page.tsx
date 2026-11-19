import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import { postImage, sortedPosts } from "@/content/blog";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/Blocks";
import { PostCard } from "@/features/blog/PostCard";
import { formatDate } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/blog");

export default function BlogPage() {
  const [featured, ...rest] = sortedPosts();
  return (
    <>
      <PageHero crumbs={[{ label: "Blog" }]} eyebrow="Knowledge base" title="Insights to grow your business online"
        text="Practical guides on AI, websites, SEO and marketing, written by the people who do the work." />

      <section className="container-page flex flex-col gap-10 py-16 sm:py-20">
        {featured && (
          <Link href={`/blog/${featured.slug}`}
            className="group grid overflow-hidden rounded-[1.75rem] border border-line bg-card shadow-card transition hover:shadow-lift lg:grid-cols-[1.15fr_1fr]">
            <div className="relative aspect-[16/9] overflow-hidden lg:aspect-auto lg:min-h-[22rem]">
              <Image src={postImage(featured.slug)} alt={featured.coverAlt ?? featured.title} fill priority sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-105" />
              <span className="absolute top-5 left-5 rounded-full bg-card px-3 py-1 text-xs font-bold text-brand-600 shadow">Latest article</span>
            </div>
            <div className="flex flex-col justify-center gap-4 p-7 sm:p-10">
              <span className="w-fit rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">{featured.category}</span>
              <h2 className="text-2xl leading-tight font-extrabold text-heading transition group-hover:text-brand-600 sm:text-3xl">{featured.title}</h2>
              <p className="leading-relaxed text-muted">{featured.excerpt}</p>
              <p className="flex flex-wrap gap-5 text-sm text-muted">
                <span className="inline-flex items-center gap-1.5"><CalendarDays className="size-4" aria-hidden />{formatDate(featured.date)}</span>
                <span className="inline-flex items-center gap-1.5"><Clock className="size-4" aria-hidden />{featured.readMinutes} min read</span>
              </p>
              <span className="mt-2 inline-flex items-center gap-1.5 font-semibold text-brand-600">
                Read article <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden />
              </span>
            </div>
          </Link>
        )}
        {rest.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => <PostCard key={p.slug} p={p} />)}
          </div>
        )}
      </section>
      <CtaBand />
    </>
  );
}
