import Image from "next/image";
import Link from "next/link";
import { postImage } from "@/content/blog";
import { formatDate } from "@/lib/format";
import type { Post } from "@/types/content";

export function PostCard({ p }: { p: Post }) {
  return (
    <Link href={`/blog/${p.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-card shadow-card transition hover:-translate-y-1 hover:shadow-lift">
      <div className="section-dark relative flex aspect-[16/9] items-end overflow-hidden p-4">
        <Image src={postImage(p.slug)} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105" />
        <span className="relative rounded-full bg-charcoal-950/80 px-3 py-1 text-xs font-semibold text-white md:backdrop-blur">{p.category}</span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <p className="text-xs text-muted">{formatDate(p.date)} · {p.readMinutes} min read</p>
        <h3 className="text-lg font-bold leading-snug text-heading group-hover:text-brand-600">{p.title}</h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-muted">{p.excerpt}</p>
      </div>
    </Link>
  );
}
