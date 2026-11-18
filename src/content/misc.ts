// Pricing, jobs, courses, portfolio, team, testimonials and location pages.
// TODO: replace placeholder entries with real data before launch.

// Monthly growth packages. `was` is the regular price shown struck through.
// TODO: confirm the regular (`was`) prices; only show a discount you actually offer.
export type PackageFeature = { text: string; included?: boolean }; // included defaults to true
export type Package = {
  name: string; icon: "medal" | "crown" | "gem"; tag: string; featured?: boolean;
  summary: string; price: number; was: number; currency: string;
  groups: { title: string; items: PackageFeature[] }[];
};

export const packages: Package[] = [
  {
    name: "Silver Plan", icon: "medal", tag: "Starter",
    summary: "Everything a small business needs to get online and start growing.",
    price: 249, was: 349, currency: "$",
    groups: [
      { title: "Website", items: [{ text: "Business website, up to 5 pages" }, { text: "Mobile responsive design" }, { text: "WhatsApp button & contact form" }] },
      { title: "SEO", items: [{ text: "On-page SEO for up to 5 pages" }, { text: "Up to 10 SEO keywords tracked" }, { text: "Meta titles & descriptions setup" }] },
      { title: "Marketing", items: [{ text: "Google Business Profile setup" }, { text: "8 social media posts / month" }, { text: "Paid ads management", included: false }] },
      { title: "AI & Automation", items: [{ text: "AI chatbot & automation", included: false }] },
    ],
  },
  {
    name: "Gold Plan", icon: "crown", tag: "Most popular", featured: true,
    summary: "Website, SEO, ads and an AI chatbot, built to generate leads.",
    price: 449, was: 649, currency: "$",
    groups: [
      { title: "Website", items: [{ text: "Business website, up to 10 pages" }, { text: "Blog / CMS for easy updates" }, { text: "Speed & performance optimisation" }] },
      { title: "SEO", items: [{ text: "Up to 20 SEO keywords tracked" }, { text: "URL structure & technical review" }, { text: "Local directory submissions" }] },
      { title: "Marketing", items: [{ text: "16 social media posts / month" }, { text: "Meta or Google Ads management" }] },
      { title: "AI & Automation", items: [{ text: "AI website chatbot for FAQs & leads" }, { text: "CRM & workflow automation", included: false }] },
    ],
  },
  {
    name: "Platinum Plan", icon: "gem", tag: "Best value",
    summary: "A complete digital growth engine with advanced AI automation.",
    price: 849, was: 1199, currency: "$",
    groups: [
      { title: "Website", items: [{ text: "Website or e-commerce store, up to 40 pages" }, { text: "Custom features & integrations" }] },
      { title: "SEO", items: [{ text: "Up to 50 SEO keywords tracked" }, { text: "Competitor & keyword gap analysis" }, { text: "Internal linking & content optimisation" }] },
      { title: "Marketing", items: [{ text: "Full social media management" }, { text: "Meta + Google Ads with A/B testing" }] },
      { title: "AI & Automation", items: [{ text: "AI chatbot + WhatsApp automation" }, { text: "CRM integration & lead automation" }, { text: "Dedicated account manager & priority support" }] },
    ],
  },
];

export type Job = { slug: string; title: string; type: string; location: string; summary: string; responsibilities: string[]; requirements: string[] };
export const jobs: Job[] = [
  {
    slug: "senior-sales-closer", title: "Senior Sales Closer", type: "Full-time", location: "Lahore / Remote",
    summary: "Close qualified deals for our AI, software and marketing services.",
    responsibilities: ["Run discovery and proposal calls", "Close inbound and outbound leads", "Keep the CRM up to date", "Work with delivery teams on scope"],
    requirements: ["3+ years in B2B sales", "Excellent spoken English", "Experience selling IT or agency services"],
  },
  {
    slug: "calling-agent", title: "Calling Agent", type: "Full-time", location: "Lahore",
    summary: "Make first contact with prospects and book meetings for the sales team.",
    responsibilities: ["Call and follow up with leads", "Qualify prospects with a script", "Book meetings in the calendar"],
    requirements: ["Clear communication in English and Urdu", "Comfort with targets", "Basic computer skills"],
  },
];
export const getJob = (slug: string) => jobs.find((j) => j.slug === slug);

export const courses = [
  { title: "AI Automation for Business", level: "Beginner", weeks: 6, text: "Build real automations with no-code tools and AI." },
  { title: "Full-Stack Web Development", level: "Intermediate", weeks: 12, text: "React, Next.js and Node.js from first page to deployment." },
  { title: "Digital Marketing & Meta Ads", level: "Beginner", weeks: 8, text: "Plan, run and measure campaigns that sell." },
  { title: "SEO Fundamentals", level: "Beginner", weeks: 4, text: "Rank websites with technical, content and local SEO." },
];

export const portfolio = [
  { title: "Clinic booking platform", category: "Web App", result: "Online bookings up 3x in 4 months" },
  { title: "Fashion Shopify store", category: "E-Commerce", result: "Launched in 3 weeks" },
  { title: "WhatsApp sales chatbot", category: "AI Chatbot", result: "70% of enquiries answered automatically" },
  { title: "Care agency compliance system", category: "SaaS", result: "Audit prep cut from days to minutes" },
  { title: "Real estate lead campaign", category: "Meta Ads", result: "Steady weekly leads at lower cost" },
  { title: "Logistics dashboard", category: "Custom Software", result: "Live tracking for 40+ vehicles" },
]; // TODO: replace with real case studies and images

// Leadership team. Photos live in /public/team. Add profile URLs to show social icons (empty = hidden).
export type TeamMember = { name: string; role: string; photo: string; socials: { facebook?: string; instagram?: string; linkedin?: string } };
export const team: TeamMember[] = [
  { name: "Muhammad Ahsan Khan", role: "Director & Owner", photo: "/team/muhammad-ahsan-khan.webp", socials: {} },
  { name: "Ali Raza", role: "CEO & Founder", photo: "/team/ali-raza.webp", socials: {} },
  { name: "Babar Ali", role: "COO & Head of Sales", photo: "/team/babar-ali.webp", socials: {} },
  { name: "Ehtisham Malik", role: "Chief Technology Officer (CTO)", photo: "/team/ehtisham-malik.webp", socials: {} },
];

// TODO: replace with real client reviews (with permission) before launch. Not shown as real until then.
export const testimonials = [
  { name: "Client name", role: "Business owner", project: "Website", text: "Placeholder review. Add a real client quote here." },
  { name: "Client name", role: "Marketing manager", project: "AI Chatbot", text: "Placeholder review. Add a real client quote here." },
  { name: "Client name", role: "Founder", project: "E-Commerce", text: "Placeholder review. Add a real client quote here." },
];

export const locations = {
  "software-house-lahore": {
    title: "Software House in Lahore",
    heading: "A software house in Lahore building AI, web and SaaS products",
    intro: "Next Vision Technologies works with businesses in Lahore and across Pakistan on websites, custom software, AI automation and marketing.",
  },
  "web-development-company-uk": {
    title: "Web Development Company UK",
    heading: "Web development for UK businesses",
    intro: "UK businesses work with Next Vision Technologies for fast websites, web apps and AI automation, with UK-hours support.",
  },
} as const;
