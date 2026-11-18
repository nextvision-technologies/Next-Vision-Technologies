// Blog posts. Each body is a list of blocks so posts can later move to a CMS or MDX without changing the page.
export type Block = { type: "h2"; text: string } | { type: "p"; text: string } | { type: "ul"; items: string[] };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  date: string; // ISO
  readMinutes: number;
  body: Block[];
};

export type BlogCategory =
  | "AI & Automation" | "Web Development" | "SEO" | "E-Commerce"
  | "Digital Marketing" | "Mobile Apps" | "Business Tips" | "Security";

// TODO: these are first drafts written as starting points. Expand each before publishing.
export const posts: Post[] = [
  {
    slug: "off-page-seo-backlinks-guide-pakistan",
    title: "Off-Page SEO in 2026: Every Type of Backlink Explained",
    excerpt: "Which backlinks still move rankings, which ones put your site at risk, and how to build them safely.",
    category: "SEO", date: "2026-10-10", readMinutes: 9,
    body: [
      { type: "p", text: "Backlinks are still one of the strongest signals Google uses to judge how trustworthy a website is. But not every link helps, and some can hurt." },
      { type: "h2", text: "Links that help" },
      { type: "ul", items: ["Editorial links from relevant industry sites", "Local business directories and chambers of commerce", "Guest articles on respected blogs", "Digital PR and data-led stories"] },
      { type: "h2", text: "Links to avoid" },
      { type: "ul", items: ["Bought link packages", "Private blog networks", "Spammy comment and forum links"] },
      { type: "p", text: "Build fewer, better links over time, and track them in Search Console." },
    ],
  },
  {
    slug: "how-to-build-shopify-store-in-pakistan-2025",
    title: "How to Build a Shopify Store in Pakistan",
    excerpt: "A step-by-step guide from choosing a plan to taking your first order with local payments and couriers.",
    category: "E-Commerce", date: "2026-07-10", readMinutes: 8,
    body: [
      { type: "p", text: "Shopify is one of the fastest ways to start selling online. Here is how to set it up for customers in Pakistan." },
      { type: "h2", text: "The steps" },
      { type: "ul", items: ["Pick a plan and a fast theme", "Add products with clear photos and prices", "Set up local payment gateways and cash on delivery", "Connect a courier for booking and tracking", "Test checkout on mobile before launch"] },
    ],
  },
  {
    slug: "wordpress-vs-shopify-which-is-better-for-pakistan",
    title: "WordPress vs Shopify: Which Is Better for Your Business?",
    excerpt: "Costs, flexibility and ease of use compared, so you can pick the right platform first time.",
    category: "Web Development", date: "2026-07-08", readMinutes: 7,
    body: [
      { type: "p", text: "Both platforms power millions of sites. The right choice depends on what you sell and how much control you need." },
      { type: "h2", text: "Choose Shopify if" },
      { type: "ul", items: ["Selling products is your main goal", "You want hosting and security handled for you"] },
      { type: "h2", text: "Choose WordPress if" },
      { type: "ul", items: ["Content and blogging matter most", "You need custom features or full code ownership"] },
    ],
  },
  {
    slug: "how-much-does-a-website-cost-in-pakistan",
    title: "How Much Does a Website Cost? A Clear Pricing Guide",
    excerpt: "What drives website prices, typical budgets for each type of site, and the hidden costs to plan for.",
    category: "Web Development", date: "2026-07-05", readMinutes: 6,
    body: [
      { type: "p", text: "Website prices vary widely because websites vary widely. These are the main cost drivers." },
      { type: "ul", items: ["Number of pages and custom designs", "E-commerce or booking features", "Content writing and photography", "Hosting, domain and maintenance"] },
      { type: "p", text: "Ask for a fixed quote with a clear scope so there are no surprises." },
    ],
  },
  {
    slug: "best-digital-marketing-strategies-for-pakistani-businesses",
    title: "Digital Marketing Strategies That Work for Local Businesses",
    excerpt: "The channels and tactics that bring real customers, not just likes.",
    category: "Digital Marketing", date: "2026-07-03", readMinutes: 7,
    body: [
      { type: "p", text: "Good marketing starts with knowing exactly who your customer is and where they spend time online." },
      { type: "ul", items: ["Short video content on Instagram and TikTok", "WhatsApp for follow-ups and repeat sales", "Google Business Profile for local search", "Retargeting ads for warm audiences"] },
    ],
  },
  {
    slug: "how-to-rank-website-on-google-in-pakistan",
    title: "How to Rank Your Website on Google: A Complete SEO Guide",
    excerpt: "Technical basics, content planning and local SEO in one practical checklist.",
    category: "SEO", date: "2026-07-01", readMinutes: 10,
    body: [
      { type: "h2", text: "Fix the foundations" },
      { type: "ul", items: ["Fast loading on mobile", "Clean URLs and a sitemap", "One clear topic per page"] },
      { type: "h2", text: "Create content people search for" },
      { type: "p", text: "Research the questions your customers ask, then answer them better than anyone else." },
    ],
  },
  {
    slug: "mobile-app-development-pakistan-native-vs-cross-platform",
    title: "Native vs Cross-Platform Mobile Apps: Which Should You Build?",
    excerpt: "Cost, speed and performance compared to help you choose the right approach.",
    category: "Mobile Apps", date: "2026-06-28", readMinutes: 7,
    body: [
      { type: "p", text: "Cross-platform frameworks like React Native let one team ship to both iOS and Android. Native apps still win for heavy device features." },
      { type: "ul", items: ["Cross-platform: lower cost, faster launch", "Native: best performance and device access"] },
    ],
  },
  {
    slug: "ai-chatbots-for-business-pakistan-2025",
    title: "AI Chatbots for Business: Automating Customer Support",
    excerpt: "How companies use AI chatbots on websites and WhatsApp to answer customers instantly.",
    category: "AI & Automation", date: "2026-06-24", readMinutes: 8,
    body: [
      { type: "p", text: "Customers expect fast answers at any hour. AI chatbots trained on your business information make that possible without a night shift." },
      { type: "ul", items: ["Answer common questions instantly", "Qualify leads before your team calls", "Book appointments automatically", "Hand over to a human when needed"] },
    ],
  },
  {
    slug: "how-to-choose-web-development-agency-in-pakistan",
    title: "How to Choose the Right Web Development Agency",
    excerpt: "A checklist of questions to ask before you sign with any agency.",
    category: "Business Tips", date: "2026-06-20", readMinutes: 6,
    body: [
      { type: "ul", items: ["Can you see live projects similar to yours?", "Is the quote fixed, with a written scope?", "Who owns the code and domain?", "What support is included after launch?"] },
    ],
  },
  {
    slug: "website-security-essentials-pakistani-businesses",
    title: "Website Security Essentials Every Business Should Know",
    excerpt: "Simple steps that protect your site, your customers and your reputation.",
    category: "Security", date: "2026-06-16", readMinutes: 6,
    body: [
      { type: "ul", items: ["Use SSL everywhere", "Keep software and plugins updated", "Turn on two-factor login", "Take automatic off-site backups", "Limit admin access"] },
    ],
  },
  {
    slug: "software-house-in-lahore-pakistan",
    title: "Choosing a Software House in Lahore: A Guide for Businesses",
    excerpt: "What Lahore's software houses offer, what they cost, and how to pick the right partner.",
    category: "Business Tips", date: "2026-07-15", readMinutes: 8,
    body: [
      { type: "p", text: "Lahore has become one of Pakistan's main technology hubs, serving local and international clients." },
      { type: "ul", items: ["Check portfolios and client references", "Agree on communication and reporting", "Start with a small paid phase"] },
    ],
  },
];

export const sortedPosts = () => [...posts].sort((a, b) => b.date.localeCompare(a.date));
export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
