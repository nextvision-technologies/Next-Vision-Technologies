// Shapes of the data in src/content. Pages and components import these types from here.

// ---------- Services ----------
export type ServiceCategory = "AI & Automation" | "Development" | "Marketing" | "Design & Consulting";

export type Service = {
  slug: string;
  title: string;
  short: string; // one-line summary for cards
  category: ServiceCategory;
  icon: string; // key into components/ui/ServiceIcon
  tagline: string;
  intro: string;
  benefits: string[];
  tags: string[];
  offerings: { title: string; text: string }[];
  tools: string[];
  faqs: { q: string; a: string }[];
  related: string[]; // slugs
};

// ---------- Blog and long-form text ----------
export type Block =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "tip"; title: string; text: string }
  | { type: "quote"; text: string }
  | { type: "table"; head: string[]; rows: string[][]; note?: string };

export type BlogCategory =
  | "AI & Automation" | "Web Development" | "SEO" | "E-Commerce"
  | "Digital Marketing" | "Mobile Apps" | "Business Tips" | "Security";

/** A person credited on articles (writer or expert reviewer). Listed in src/content/people.ts */
export type Person = { id: string; name: string; role: string; photo: string; bio: string };

export type Post = {
  slug: string; // the URL: keep the focus keyword in it
  title: string; // the on-page H1: should contain the focus keyword
  excerpt: string;
  category: BlogCategory;
  date: string; // ISO
  updated?: string; // ISO, last meaningful update (shown as "Updated" and used as dateModified)
  readMinutes: number;
  /** SEO: the one search phrase this article targets */
  focusKeyword?: string;
  /** SEO: <title> tag, about 50 to 60 characters. Defaults to `title` */
  seoTitle?: string;
  /** SEO: meta description, about 140 to 160 characters. Defaults to `excerpt` */
  metaDescription?: string;
  /** Cover image path. Defaults to /blog/<slug>.webp. Give a replaced image a NEW file name so browser and CDN caches pick it up */
  cover?: string;
  /** Alt text for the cover image. Defaults to `title` */
  coverAlt?: string;
  /** Person ids from src/content/people.ts. The reviewer defaults to the expert for the post's category */
  author?: string;
  reviewer?: string;
  draft?: boolean;
  service?: string; // related service slug, used for the in-article call to action
  takeaways?: string[];
  faqs?: { q: string; a: string }[];
  body: Block[];
};

// ---------- Legal ----------
export type LegalSection = { heading: string; body: Block[] };
export type LegalPage = { slug: string; title: string; summary: string; sections: LegalSection[] };

// ---------- Navigation ----------
export type NavLink = { label: string; href: string; description?: string; icon?: string };
export type NavPromo = { eyebrow: string; title: string; text?: string; href: string; art: "browser" | "growth" | "book" | "shield" };
export type NavGroup = { label: string; href?: string; overview?: string; columns: 1 | 2; children: NavLink[]; footer?: NavLink[]; promo: NavPromo };

// ---------- Pricing, jobs, team ----------
export type PackageFeature = { text: string; included?: boolean }; // included defaults to true
export type Package = {
  name: string; icon: "medal" | "crown" | "gem"; tag: string; featured?: boolean;
  summary: string; price: number; was: number; currency: string;
  groups: { title: string; items: PackageFeature[] }[];
};

export type Job = { slug: string; title: string; type: string; location: string; summary: string; responsibilities: string[]; requirements: string[] };

export type TeamMember = {
  name: string;
  role: string;
  photo: string;
  /** Area of expertise, e.g. "SEO Expert" */
  specialty?: string;
  /** Degree and university */
  education?: string;
  /** Years of hands-on experience, e.g. "3+ years in SEO" */
  experience?: string;
  /** Short professional bio shown under the role */
  bio?: string;
  socials: { facebook?: string; instagram?: string; linkedin?: string; youtube?: string };
};

// ---------- Chatbot ----------
export type Lang = "en" | "ur";
export type Reply = { text: string; chips?: string[]; action?: "lead" };
export type Intent = { id: string; keywords: string[]; en: Reply; ur: Reply };
