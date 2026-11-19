import { services } from "./services";
import { legalPages } from "./legal";
import type { NavGroup } from "@/types/content";

const featuredServices = [
  "ai-automation", "ai-chatbot-development", "web-development", "shopify-development",
  "mobile-app-development", "custom-software-development", "seo", "meta-google-ads",
].map((slug) => services.find((s) => s.slug === slug)!);

const legalMeta: Record<string, { icon: string; description: string }> = {
  terms: { icon: "file", description: "The agreement behind every project" },
  "privacy-policy": { icon: "lock", description: "How we collect, use and protect your data" },
  "refund-policy": { icon: "refund", description: "Cancellations and refunds, step by step" },
  gdpr: { icon: "globe", description: "Data rights for customers in the UK and EU" },
  security: { icon: "shieldcheck", description: "How we keep your site, logins and data safe" },
  "cookie-policy": { icon: "cookie", description: "What cookies this website uses and why" },
};

export const mainNav: NavGroup[] = [
  {
    label: "Services",
    href: "/services",
    overview: "Services overview",
    columns: 2,
    children: featuredServices.map((s) => ({ label: s.title, href: `/services/${s.slug}`, icon: s.icon })),
    footer: [
      { label: `View all ${services.length} services`, href: "/services" },
      { label: "View pricing", href: "/pricing" },
    ],
    promo: { eyebrow: "100+ projects", title: "Not sure which service you need?", href: "/contact", art: "browser" },
  },
  {
    label: "Company",
    columns: 1,
    children: [
      { label: "About Us", href: "/about", icon: "building", description: "Who we are and how we work" },
      { label: "Projects Gallery", href: "/projects", icon: "briefcase", description: "Live websites, software and AI we've delivered" },
      { label: "Our Team", href: "/team", icon: "users", description: "The people behind your project" },
      { label: "Contact Us", href: "/contact", icon: "chat", description: "Offices in Pakistan and the UK" },
    ],
    promo: { eyebrow: "Our work", title: "100+ projects delivered", text: "See the websites, stores, apps and AI tools we've built for businesses in Pakistan, the UK and beyond.", href: "/projects", art: "growth" },
  },
  {
    label: "Resources",
    columns: 1,
    children: [
      { label: "Blog", href: "/blog", icon: "news", description: "Guides on AI, websites, SEO and growth" },
      { label: "Courses", href: "/courses", icon: "graduation", description: "Learn AI, development and marketing with our experts" },
      { label: "Pricing", href: "/pricing", icon: "tags", description: "Monthly packages and project pricing" },
      { label: "Jobs", href: "/jobs", icon: "userplus", description: "Current openings: join our team" },
    ],
    promo: { eyebrow: "Free consultation", title: "Not sure where to start?", text: "Tell us about your business and we'll recommend the right solution, budget and plan.", href: "/contact", art: "book" },
  },
  {
    label: "Legal",
    columns: 2,
    children: legalPages.map((p) => ({ label: p.title, href: `/${p.slug}`, ...legalMeta[p.slug] })),
    promo: { eyebrow: "Your data, your rights", title: "Questions about your data?", text: "Ask us what we hold, or request a copy or deletion. We reply within one month.", href: "/contact", art: "shield" },
  },
];

export const footerNav = {
  quick: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Pricing", href: "/pricing" },
    { label: "Projects Gallery", href: "/projects" },
    { label: "Courses", href: "/courses" },
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/team" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/jobs" },
  ],
  services: ["ai-automation", "web-development", "shopify-development", "wordpress-development", "mobile-app-development", "seo", "digital-marketing"]
    .map((slug) => services.find((s) => s.slug === slug)!)
    .map((s) => ({ label: s.title, href: `/services/${s.slug}` })),
  support: [
    { label: "Contact Us", href: "/contact" },
    { label: "Book a Demo", href: "/book-demo" },
    ...legalPages.map((p) => ({ label: p.title, href: `/${p.slug}` })),
    { label: "Sitemap", href: "/site-map" },
  ],
};
