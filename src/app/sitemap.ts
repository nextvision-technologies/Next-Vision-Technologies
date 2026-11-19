import type { MetadataRoute } from "next";
import { allSeoEntries, SITE_UPDATED } from "@/content/seo";
import { site } from "@/content/site";

// Every page from src/content/seo.ts, with last-modified date, change frequency, priority and images.
// (Meta descriptions are not part of the sitemap format; they live on each page and on /site-map.)
export default function sitemap(): MetadataRoute.Sitemap {
  return allSeoEntries().map((e) => ({
    url: `${site.url}${e.path === "/" ? "" : e.path}`,
    lastModified: e.lastModified ?? SITE_UPDATED,
    changeFrequency: e.changeFrequency,
    priority: e.priority,
    images: [`${site.url}${e.image ?? "/brand/logo-og.png"}`],
  }));
}
