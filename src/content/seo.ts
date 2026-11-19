// SEO for every page in one place: titles, meta descriptions and sitemap settings.
// Page metadata, /sitemap.xml and the HTML sitemap (/site-map) all read from here,
// so a page added to this file is automatically listed everywhere.
import { services } from "./services";
import { posts, postImage } from "./blog";
import { jobs } from "./jobs";
import { locations } from "./locations";
import { legalPages } from "./legal";
import { site } from "./site";

type ChangeFrequency = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

export type SeoEntry = {
  path: string;
  title: string; // used in <title> as "Title | Next Vision Technologies"
  description: string; // meta description, ideally 120 to 160 characters
  group: "Main pages" | "Services" | "Blog" | "Careers" | "Locations" | "Legal";
  priority: number;
  changeFrequency: ChangeFrequency;
  lastModified?: string; // ISO date
  image?: string; // social share / sitemap image
};

/** Date the site content was last reviewed. Bump it when pages change significantly. */
export const SITE_UPDATED = "2026-11-19";

export const keywords = [
  "software house Lahore", "IT company Pakistan", "web development company UK", "AI automation",
  "AI chatbot development", "WhatsApp chatbot", "SaaS development", "website development",
  "Shopify store development", "WordPress development", "mobile app development", "SEO services",
  "digital marketing agency", "Meta ads", "Google ads", "custom software development", "Next Vision Technologies",
];

const staticPages: SeoEntry[] = [
  {
    path: "/", group: "Main pages", priority: 1, changeFrequency: "weekly",
    title: "AI Automation, SaaS, Websites & Digital Marketing",
    description: "Next Vision Technologies is a software house in Lahore and the UK building AI chatbots, automation, SaaS products, websites and marketing campaigns that grow your business.",
  },
  {
    path: "/services", group: "Main pages", priority: 0.9, changeFrequency: "monthly",
    title: "IT, AI & Digital Marketing Services",
    description: `${services.length} services from Next Vision Technologies: AI automation, chatbots, web and app development, Shopify, SEO, Meta & Google ads and design.`,
  },
  {
    path: "/pricing", group: "Main pages", priority: 0.9, changeFrequency: "monthly",
    title: "Pricing & Monthly Growth Packages",
    description: "Clear pricing for websites, SEO, marketing and AI automation. Compare Silver, Gold and Platinum packages or get a fixed project quote in 24 hours.",
  },
  {
    path: "/projects", group: "Main pages", priority: 0.8, changeFrequency: "monthly",
    title: "Projects Gallery: Websites, Software & AI Projects",
    description: "Explore live websites, custom software and AI solutions built by Next Vision Technologies for hotels, clinics, couriers, retailers and more.",
    image: "/projects/pak-heritage-hotel.webp",
  },
  {
    path: "/about", group: "Main pages", priority: 0.8, changeFrequency: "monthly",
    title: "About Us",
    description: "Meet Next Vision Technologies: one team of developers, AI engineers and marketers in Lahore and the UK, helping businesses plan, build and grow online.",
  },
  {
    path: "/team", group: "Main pages", priority: 0.7, changeFrequency: "monthly",
    title: "Our Leadership Team",
    description: "Meet the leadership team behind Next Vision Technologies: Muhammad Ahsan Khan, Ali Raza, Babar Ali and Ehtisham Malik, leading business, sales and technology.",
  },
  {
    path: "/contact", group: "Main pages", priority: 0.8, changeFrequency: "yearly",
    title: "Contact Us: Free Quote in 24 Hours",
    description: `Contact Next Vision Technologies on WhatsApp ${site.phones[0].value} or by email. Tell us about your project and get a free quote within 24 hours.`,
  },
  {
    path: "/book-demo", group: "Main pages", priority: 0.8, changeFrequency: "yearly",
    title: "Book a Free Demo",
    description: "Book a free 30-minute demo with Next Vision Technologies. See AI chatbots, automation and websites in action and get a rough plan and price for your project.",
  },
  {
    path: "/courses", group: "Main pages", priority: 0.6, changeFrequency: "monthly",
    title: "Courses in AI, Web Development & Marketing",
    description: "Hands-on courses in AI automation, full-stack web development, SEO, digital marketing and Meta ads, taught by working professionals in Lahore.",
  },
  {
    path: "/blog", group: "Blog", priority: 0.8, changeFrequency: "weekly",
    title: "Blog: AI, Website & SEO Guides",
    description: "Practical guides on AI chatbots, website costs, SEO and digital marketing, written for business owners in Pakistan and the UK by the Next Vision team.",
  },
  {
    path: "/jobs", group: "Careers", priority: 0.6, changeFrequency: "weekly",
    title: "Careers & Jobs in Lahore",
    description: "Join Next Vision Technologies. See current openings in sales, development and marketing at our Lahore office and remote, and apply by email or WhatsApp.",
  },
  {
    path: "/site-map", group: "Main pages", priority: 0.3, changeFrequency: "monthly",
    title: "Sitemap",
    description: "A complete list of every page on the Next Vision Technologies website: services, blog articles, careers, locations and legal pages.",
  },
];

/** Shortens text to a meta-description length on a word boundary */
/** Keeps whole sentences up to the length limit (falls back to a word boundary) */
const clip = (text: string, max = 158) => {
  if (text.length <= max) return text;
  const sentences = text.match(/[^.!?]+[.!?]+(\s|$)/g) ?? [text];
  let out = "";
  for (const sen of sentences) { if ((out + sen).trim().length > max) break; out += sen; }
  out = out.trim();
  return out.length >= 90 ? out : text.slice(0, text.lastIndexOf(" ", max - 1)).replace(/[,;:]$/, "") + ".";
};

export function allSeoEntries(): SeoEntry[] {
  return [
    ...staticPages,
    ...services.map<SeoEntry>((s) => ({
      path: `/services/${s.slug}`, group: "Services", priority: 0.9, changeFrequency: "monthly",
      title: `${s.title} Services`,
      description: clip(`${s.short} ${s.tagline} Free consultation and a fixed quote within 24 hours from Next Vision Technologies.`),
    })),
    ...posts.map<SeoEntry>((p) => ({
      path: `/blog/${p.slug}`, group: "Blog", priority: 0.7, changeFrequency: "monthly",
      title: p.seoTitle ?? p.title, description: p.metaDescription ?? clip(p.excerpt), lastModified: p.updated ?? p.date, image: postImage(p.slug),
    })),
    ...jobs.map<SeoEntry>((j) => ({
      path: `/jobs/${j.slug}`, group: "Careers", priority: 0.5, changeFrequency: "weekly",
      title: `${j.title} Job (${j.location})`,
      description: clip(`${j.type} ${j.title} role at Next Vision Technologies, ${j.location}. ${j.summary} Apply by email or WhatsApp.`),
    })),
    ...(Object.keys(locations) as (keyof typeof locations)[]).map<SeoEntry>((slug) => ({
      path: `/${slug}`, group: "Locations", priority: 0.8, changeFrequency: "monthly",
      title: locations[slug].title, description: clip(locations[slug].intro),
    })),
    ...legalPages.map<SeoEntry>((l) => ({
      path: `/${l.slug}`, group: "Legal", priority: 0.3, changeFrequency: "yearly",
      title: l.title, description: clip(l.summary),
    })),
  ];
}

export const getSeo = (path: string) => {
  const e = allSeoEntries().find((x) => x.path === path);
  if (!e) throw new Error(`No SEO entry for ${path}. Add it to src/content/seo.ts`);
  return e;
};
