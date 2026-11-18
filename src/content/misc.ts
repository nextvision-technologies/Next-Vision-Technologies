// Pricing, jobs, courses, portfolio, team, testimonials and location pages.
// TODO: replace placeholder entries with real data before launch.

export const packages = [
  {
    name: "Silver", price: 249, period: "mo", badge: null,
    summary: "For small businesses getting started online.",
    features: ["5-page business website", "Basic on-page SEO", "Social media setup", "8 social posts per month", "Monthly report"],
  },
  {
    name: "Gold", price: 449, period: "mo", badge: "Most popular",
    summary: "For growing businesses that want steady leads.",
    features: ["10-page website", "SEO for 10 keywords", "16 social posts per month", "Meta ads management", "AI chatbot on website", "Fortnightly report"],
  },
  {
    name: "Platinum", price: 849, period: "mo", badge: "Best value",
    summary: "For brands ready to scale with automation.",
    features: ["Up to 40 pages or e-commerce store", "Full SEO campaign", "Meta & Google ads", "AI automation workflows", "WhatsApp chatbot", "Weekly report and calls"],
  },
] as const;

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

export const team = [
  { name: "TODO Name", role: "Founder & CEO" },
  { name: "TODO Name", role: "Head of Development" },
  { name: "TODO Name", role: "AI Engineer" },
  { name: "TODO Name", role: "Marketing Lead" },
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
