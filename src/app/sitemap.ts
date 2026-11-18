import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { posts } from "@/content/blog";
import { jobs, locations } from "@/content/misc";
import { legalPages } from "@/content/legal";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${site.url}${path}`;
  const staticPages = ["", "/services", "/pricing", "/portfolio", "/courses", "/about", "/team", "/contact", "/book-demo", "/jobs", "/blog"];
  return [
    ...staticPages.map((p) => ({ url: url(p), priority: p === "" ? 1 : 0.8 })),
    ...services.map((s) => ({ url: url(`/services/${s.slug}`), priority: 0.9 })),
    ...posts.map((p) => ({ url: url(`/blog/${p.slug}`), lastModified: p.date, priority: 0.7 })),
    ...jobs.map((j) => ({ url: url(`/jobs/${j.slug}`), priority: 0.5 })),
    ...Object.keys(locations).map((l) => ({ url: url(`/${l}`), priority: 0.7 })),
    ...legalPages.map((l) => ({ url: url(`/${l.slug}`), priority: 0.3 })),
  ];
}
