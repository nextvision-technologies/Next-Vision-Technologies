import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPost, posts, sortedPosts, type Block } from "@/content/blog";
import { site } from "@/content/site";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand, PostCard, formatDate } from "@/components/sections/Blocks";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const p = getPost((await params).slug);
  if (!p) return {};
  return { title: p.title, description: p.excerpt, openGraph: { type: "article", publishedTime: p.date } };
}

function Render({ block }: { block: Block }) {
  if (block.type === "h2") return <h2>{block.text}</h2>;
  if (block.type === "ul") return <ul>{block.items.map((i) => <li key={i}>{i}</li>)}</ul>;
  return <p>{block.text}</p>;
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const more = sortedPosts().filter((p) => p.slug !== post.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <PageHero crumbs={[{ label: "Blog", href: "/blog" }, { label: post.category }]} eyebrow={post.category} title={post.title}
        text={`${formatDate(post.date)} · ${post.readMinutes} min read`} />
      <article className="container-page py-16">
        <div className="prose-nv mx-auto">
          <p className="!text-xl !text-navy-900">{post.excerpt}</p>
          {post.body.map((b, i) => <Render key={i} block={b} />)}
        </div>
      </article>
      <section className="bg-surface py-20">
        <div className="container-page flex flex-col gap-10">
          <h2 className="text-2xl font-bold text-navy-900">More articles</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((p) => <PostCard key={p.slug} p={p} />)}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
