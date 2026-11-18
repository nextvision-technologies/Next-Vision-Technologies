import type { Metadata } from "next";
import { sortedPosts } from "@/content/blog";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand, PostCard } from "@/components/sections/Blocks";

export const metadata: Metadata = {
  title: "Blog",
  description: "Guides on AI automation, web development, SEO, e-commerce and digital marketing from the Next Vision team.",
};

export default function BlogPage() {
  const posts = sortedPosts();
  return (
    <>
      <PageHero crumbs={[{ label: "Blog" }]} eyebrow="Knowledge base" title="Our blog"
        text="Practical guides on AI, websites, SEO and marketing, written by the people who do the work." />
      <section className="container-page py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => <PostCard key={p.slug} p={p} />)}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
