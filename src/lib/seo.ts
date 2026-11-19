import type { Metadata } from "next";
import { getSeo } from "@/content/seo";
import { site } from "@/content/site";

/**
 * Full metadata for a page listed in src/content/seo.ts:
 * title, description, canonical URL, Open Graph and Twitter cards.
 */
export function pageMetadata(path: string, extra: { type?: "website" | "article"; publishedTime?: string } = {}): Metadata {
  const e = getSeo(path);
  const fullTitle = path === "/" ? `${site.name} | ${e.title}` : `${e.title} | ${site.name}`;
  // Page image (blog covers) or the generated default share image (src/app/opengraph-image.tsx)
  const images = e.image
    ? [{ url: e.image, width: 1600, height: 900, alt: e.title }]
    : [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${site.name}: AI automation, SaaS, websites and digital marketing` }];
  return {
    title: path === "/" ? { absolute: fullTitle } : e.title,
    description: e.description,
    alternates: { canonical: path },
    openGraph: {
      type: extra.type ?? "website",
      url: path,
      siteName: site.name,
      title: fullTitle,
      description: e.description,
      locale: "en_GB",
      images,
      ...(extra.publishedTime ? { publishedTime: extra.publishedTime } : {}),
    },
    twitter: { card: "summary_large_image", title: fullTitle, description: e.description, images: images.map((i) => i.url) },
  };
}
