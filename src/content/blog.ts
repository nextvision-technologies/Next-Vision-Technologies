// Blog posts. Each body is a list of blocks so posts can later move to a CMS or MDX without changing the page.
// Set `draft: true` to hide a post: it disappears from the blog, footer and sitemap, and its URL redirects to /blog.
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

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  date: string; // ISO
  readMinutes: number;
  draft?: boolean;
  service?: string; // related service slug, used for the in-article call to action
  takeaways?: string[];
  faqs?: { q: string; a: string }[];
  body: Block[];
};

const allPosts: Post[] = [
  // ------------------------------------------------------------------ Published
  {
    slug: "ai-chatbots-for-business-pakistan-2025",
    title: "AI Chatbots for Business: How Companies Are Automating Customer Support",
    excerpt: "Customers expect instant replies at any hour. Here is how AI chatbots on your website and WhatsApp answer questions, capture leads and book appointments while your team sleeps.",
    category: "AI & Automation",
    date: "2026-11-12",
    readMinutes: 7,
    service: "ai-chatbot-development",
    takeaways: [
      "AI chatbots answer common questions instantly, 24 hours a day, on your website, WhatsApp, Facebook and Instagram.",
      "A good bot is trained on your own business information and hands the chat to a person when it should.",
      "Most businesses start with one channel and one goal, such as answering FAQs or booking appointments.",
      "Measure success by response time, leads captured and hours your team saves each week.",
    ],
    body: [
      { type: "p", text: "Think about the last time you messaged a business and waited hours for a reply. Many customers don't wait. They message the next company on their list. For most businesses, the problem isn't a lack of interest, it's that nobody is available to answer at 11pm, on Sunday, or when ten people message at once." },
      { type: "p", text: "[AI chatbots](/services/ai-chatbot-development) solve exactly this. Modern chatbots are not the rigid, button-only bots of a few years ago. They understand normal language, including Roman Urdu, and they reply using your business information." },
      { type: "h2", text: "What an AI chatbot actually does" },
      { type: "p", text: "An AI chatbot is a virtual assistant that sits on your website or messaging apps and handles conversations on your behalf. It is trained on your services, prices, policies and FAQs, so its answers match what your team would say." },
      { type: "ul", items: [
        "Answers questions about services, prices, timings and locations",
        "Collects the customer's name, number and requirement, then saves it to your [CRM](/services/crm-development) or Google Sheet",
        "Books appointments and demos straight into your calendar",
        "Sends order updates and reminders on WhatsApp",
        "Passes the chat to a human when the question is complex or the customer asks for a person",
      ] },
      { type: "h2", text: "Where businesses use chatbots most" },
      { type: "h3", text: "Website chat" },
      { type: "p", text: "A chat window on your [website](/services/web-development) greets visitors, answers questions and turns browsers into leads. It works especially well on pricing and service pages, where visitors have the most questions." },
      { type: "h3", text: "WhatsApp Business" },
      { type: "p", text: "For many customers in Pakistan, WhatsApp is the first place they contact a business. A WhatsApp bot replies instantly, qualifies the lead and alerts your sales team with a summary, so nobody has to start the conversation from zero." },
      { type: "h3", text: "Facebook and Instagram inboxes" },
      { type: "p", text: "Comments and DMs from [Meta ads](/services/meta-google-ads) arrive in bursts. A bot can reply to every message within seconds while your campaign is running, which protects the money you spend on ads." },
      { type: "tip", title: "Start small", text: "Pick one channel and one job for your first bot, for example \"answer the 20 most common WhatsApp questions\". You can add booking, payments and more channels once it is working well." },
      { type: "h2", text: "How to launch a chatbot in five steps" },
      { type: "ol", items: [
        "List the questions your team answers every day, with the correct answers.",
        "Choose the channel that brings you the most messages: website, WhatsApp or social.",
        "Train the bot on your content and set clear rules for when it hands over to a person.",
        "Test it with real questions, including tricky ones and Roman Urdu.",
        "Go live, then review conversations weekly and improve the answers.",
      ] },
      { type: "h2", text: "What results to expect" },
      { type: "p", text: "Results depend on your message volume and how well the bot is trained, but the common wins are clear: replies in seconds instead of hours, more leads captured outside office hours, and fewer repetitive questions for your team." },
      { type: "quote", text: "The goal isn't to replace your team. It's to make sure no customer waits, and your people spend their time on conversations that actually need them." },
      { type: "h2", text: "Is a chatbot right for your business?" },
      { type: "p", text: "If you receive the same questions again and again, lose leads after hours, or run ads that bring in lots of messages, a chatbot will almost certainly pay for itself. If you get only a few messages a week, a simple auto-reply may be enough for now. Not sure which fits? [Book a free demo](/book-demo) and we will show you live examples." },
    ],
    faqs: [
      { q: "Can the chatbot reply in Urdu or Roman Urdu?", a: "Yes. Modern AI chatbots understand and reply in English, Urdu and Roman Urdu, and can switch based on how the customer writes." },
      { q: "What happens if the bot doesn't know the answer?", a: "It tells the customer a team member will help, collects their details and notifies your staff, so the conversation is never lost." },
      { q: "How long does it take to set up?", a: "A focused chatbot for one channel usually goes live in two to four weeks, including training and testing." },
    ],
  },
  {
    slug: "how-much-does-a-website-cost-in-pakistan",
    title: "How Much Does a Website Cost? A Clear Pricing Guide",
    excerpt: "Website prices range from a few thousand rupees to several lakhs. Here's what actually drives the cost, typical budgets for each type of site, and the running costs most people forget.",
    category: "Web Development",
    date: "2026-11-05",
    readMinutes: 8,
    service: "web-development",
    takeaways: [
      "The biggest cost drivers are custom design, number of pages, features like e-commerce or booking, and content.",
      "A professional business website is a one-time build cost plus yearly domain, hosting and maintenance.",
      "Template sites are cheaper to start; custom sites cost more but convert and rank better.",
      "Always get a fixed quote with a written scope so the price doesn't grow mid-project.",
    ],
    body: [
      { type: "p", text: "\"How much will my website cost?\" is the first question almost every client asks, and the honest answer is: it depends on what the website needs to do. A one-page site for a local shop and an [online store](/services/ecommerce-solutions) with 500 products are completely different projects." },
      { type: "p", text: "This guide breaks down what you are actually paying for, so you can set a realistic budget and compare quotes fairly." },
      { type: "h2", text: "What drives the price of a website" },
      { type: "ul", items: [
        "Design: a ready-made template is cheaper; a custom design built around your brand costs more but stands out.",
        "Number of pages: each page needs layout, content and testing.",
        "Features: online payments, booking systems, customer accounts, multiple languages and integrations add development time.",
        "Content: professional copywriting, photography and product uploads are often priced separately.",
        "Platform: [WordPress](/services/wordpress-development), [Shopify](/services/shopify-development) or a [custom-coded site](/services/web-development) each have different setup and running costs.",
      ] },
      { type: "h2", text: "Typical budget ranges" },
      { type: "p", text: "These are typical market ranges to help you plan. Your exact price depends on scope, so treat them as a starting point, not a quote." },
      { type: "table",
        head: ["Type of website", "Typical scope", "Typical timeline"],
        rows: [
          ["Landing page", "1 page for an ad campaign or launch", "1 week"],
          ["Business website", "5 to 10 pages, contact form, basic SEO", "2 to 4 weeks"],
          ["E-commerce store", "Product catalogue, cart, payments, delivery", "3 to 6 weeks"],
          ["Custom web app or portal", "User accounts, dashboards, custom logic", "6 weeks or more"],
        ],
        note: "[Ask us for a fixed quote](/contact) for your project. We reply within 24 hours.",
      },
      { type: "h2", text: "The running costs people forget" },
      { type: "p", text: "Building the site is a one-time cost, but every website also has yearly costs. Plan for these from day one so there are no surprises." },
      { type: "ul", items: [
        "Domain name, renewed every year",
        "Hosting, which affects your site's speed and uptime",
        "SSL certificate, often included with good hosting",
        "Maintenance: updates, backups and [security monitoring](/security)",
        "Paid plugins, themes or apps, if your platform uses them",
      ] },
      { type: "tip", title: "Watch out for very cheap quotes", text: "A suspiciously low price often means a reused template, no SEO, slow hosting or no support after launch. Ask exactly what is included and who owns the website once it's finished." },
      { type: "h2", text: "Template or custom: which is right for you?" },
      { type: "p", text: "A template site is a good choice if you need to get online quickly on a small budget. A custom site makes more sense when your website is a key source of leads or sales, because it's built around your customers, loads faster and is easier to grow. Compare our [monthly packages](/pricing) if you would rather spread the cost." },
      { type: "h2", text: "Questions to ask before you hire anyone" },
      { type: "ol", items: [
        "Is the quote fixed, and what exactly is included?",
        "Will the site be mobile-friendly and [SEO-ready](/blog/how-to-rank-website-on-google-in-pakistan)?",
        "Who owns the domain, hosting account and code?",
        "How many rounds of changes are included?",
        "What support do I get after launch, and what does it cost?",
      ] },
    ],
    faqs: [
      { q: "Can I update the website myself after it's built?", a: "Yes. We set up an easy editor so you can change text, images and blog posts without a developer." },
      { q: "Do you offer monthly payment plans?", a: "Yes. Our growth packages include a website, hosting and marketing for one monthly price." },
      { q: "How long does a business website take?", a: "Most business websites take two to four weeks from the first call to launch." },
    ],
  },
  {
    slug: "how-to-rank-website-on-google-in-pakistan",
    title: "How to Rank Your Website on Google: A Complete SEO Guide",
    excerpt: "Getting to the first page of Google isn't luck. This guide walks you through the technical basics, content and local SEO steps that actually move rankings.",
    category: "SEO",
    date: "2026-10-28",
    readMinutes: 9,
    service: "seo",
    takeaways: [
      "Google ranks pages that load fast, work on mobile and clearly answer what people search for.",
      "Keyword research tells you which searches bring buyers, not just visitors.",
      "Local businesses should set up and maintain a Google Business Profile first.",
      "SEO builds over months: expect steady progress from three to six months onwards.",
    ],
    body: [
      { type: "p", text: "Most people never scroll past the first page of Google. If your business isn't there for the searches your customers make, you're invisible to them, no matter how good your service is." },
      { type: "p", text: "The good news: ranking isn't a mystery. Google wants to show the most useful, trustworthy page for each search. [SEO](/services/seo) is simply the work of making your pages that answer." },
      { type: "h2", text: "Step 1: Fix the technical foundations" },
      { type: "p", text: "Before writing a single word, make sure Google can find, read and trust your site." },
      { type: "ul", items: [
        "Fast loading on mobile: aim for pages that load in under three seconds. A well-built [website](/services/web-development) makes this much easier.",
        "Mobile-friendly design: most searches now happen on phones.",
        "[HTTPS security](/security) on every page.",
        "A sitemap submitted in Google Search Console.",
        "Clean, readable URLs such as /services/web-development.",
      ] },
      { type: "h2", text: "Step 2: Find the right keywords" },
      { type: "p", text: "Keywords are the words people type into Google. The best ones show buying intent. \"Web development company in Lahore\" is far more valuable to an agency than \"what is HTML\"." },
      { type: "ol", items: [
        "List the services you sell and the cities you serve.",
        "Type them into Google and note the suggestions and \"People also ask\" questions.",
        "Use a keyword tool to check search volume and competition.",
        "Assign one main keyword to each page so pages don't compete with each other.",
      ] },
      { type: "h2", text: "Step 3: Optimise every important page" },
      { type: "ul", items: [
        "Put the main keyword in the page title, main heading and first paragraph.",
        "Write a clear meta description that makes people want to click.",
        "Use descriptive headings and short paragraphs that are easy to scan.",
        "Add internal links between related pages and services.",
        "Give every image a descriptive file name and alt text.",
      ] },
      { type: "tip", title: "Write for people first", text: "Google's systems reward pages that genuinely help readers. Answer the question fully, use examples, and avoid stuffing the same keyword into every sentence." },
      { type: "h2", text: "Step 4: Win local searches" },
      { type: "p", text: "If you serve customers in specific cities, local SEO is the fastest win. Set up your Google Business Profile with accurate details, photos and opening hours, and ask happy customers to leave reviews. Keep your business name, address and phone number identical everywhere online." },
      { type: "h2", text: "Step 5: Publish helpful content regularly" },
      { type: "p", text: "Blog posts and guides let you rank for the questions your customers ask before they buy. One genuinely useful article a week will do more than ten thin ones, like the guides on our [blog](/blog)." },
      { type: "h2", text: "Step 6: Build trust with quality backlinks" },
      { type: "p", text: "Links from other reputable websites tell Google your site can be trusted. Earn them through business directories, partnerships, guest articles and content worth sharing. Avoid buying links: it can get your site penalised." },
      { type: "h2", text: "How long does SEO take?" },
      { type: "quote", text: "SEO is like compound interest. The first months feel slow, then the results keep building on each other." },
      { type: "p", text: "New sites usually start seeing movement within three to six months, depending on competition. Track your progress in Google Search Console: impressions, clicks and average position for your main keywords. Want faster results? Our [SEO team](/services/seo) can audit your site, and [Google & Meta ads](/services/meta-google-ads) can bring leads while SEO builds." },
    ],
    faqs: [
      { q: "Can you guarantee the first position on Google?", a: "No honest agency can guarantee a position, because Google controls the rankings. We commit to a clear plan and transparent monthly reporting." },
      { q: "Do I need to keep doing SEO after I rank?", a: "Yes. Competitors keep improving, so ongoing content, technical checks and link building protect your rankings." },
      { q: "Is SEO better than paid ads?", a: "They work best together. Ads bring leads immediately while SEO builds free, long-term traffic." },
    ],
  },

  // ------------------------------------------------------------------ Drafts (hidden for now)
  { slug: "off-page-seo-backlinks-guide-pakistan", title: "Off-Page SEO in 2026: Every Type of Backlink Explained", excerpt: "Which backlinks still move rankings, which ones put your site at risk, and how to build them safely.", category: "SEO", date: "2026-10-10", readMinutes: 9, draft: true, body: [{ type: "p", text: "Draft." }] },
  { slug: "how-to-build-shopify-store-in-pakistan-2025", title: "How to Build a Shopify Store in Pakistan", excerpt: "A step-by-step guide from choosing a plan to taking your first order with local payments and couriers.", category: "E-Commerce", date: "2026-07-10", readMinutes: 8, draft: true, body: [{ type: "p", text: "Draft." }] },
  { slug: "wordpress-vs-shopify-which-is-better-for-pakistan", title: "WordPress vs Shopify: Which Is Better for Your Business?", excerpt: "Costs, flexibility and ease of use compared, so you can pick the right platform first time.", category: "Web Development", date: "2026-07-08", readMinutes: 7, draft: true, body: [{ type: "p", text: "Draft." }] },
  { slug: "best-digital-marketing-strategies-for-pakistani-businesses", title: "Digital Marketing Strategies That Work for Local Businesses", excerpt: "The channels and tactics that bring real customers, not just likes.", category: "Digital Marketing", date: "2026-07-03", readMinutes: 7, draft: true, body: [{ type: "p", text: "Draft." }] },
  { slug: "mobile-app-development-pakistan-native-vs-cross-platform", title: "Native vs Cross-Platform Mobile Apps: Which Should You Build?", excerpt: "Cost, speed and performance compared to help you choose the right approach.", category: "Mobile Apps", date: "2026-06-28", readMinutes: 7, draft: true, body: [{ type: "p", text: "Draft." }] },
  { slug: "how-to-choose-web-development-agency-in-pakistan", title: "How to Choose the Right Web Development Agency", excerpt: "A checklist of questions to ask before you sign with any agency.", category: "Business Tips", date: "2026-06-20", readMinutes: 6, draft: true, body: [{ type: "p", text: "Draft." }] },
  { slug: "website-security-essentials-pakistani-businesses", title: "Website Security Essentials Every Business Should Know", excerpt: "Simple steps that protect your site, your customers and your reputation.", category: "Security", date: "2026-06-16", readMinutes: 6, draft: true, body: [{ type: "p", text: "Draft." }] },
  { slug: "software-house-in-lahore-pakistan", title: "Choosing a Software House in Lahore: A Guide for Businesses", excerpt: "What Lahore's software houses offer, what they cost, and how to pick the right partner.", category: "Business Tips", date: "2026-07-15", readMinutes: 8, draft: true, body: [{ type: "p", text: "Draft." }] },
];

/** Published posts only */
export const posts = allPosts.filter((p) => !p.draft);
export const draftSlugs = allPosts.filter((p) => p.draft).map((p) => p.slug);

/** Cover image for a post: /public/blog/<slug>.webp (AI-generated, 16:9) */
export const postImage = (slug: string) => `/blog/${slug}.webp`;

export const sortedPosts = () => [...posts].sort((a, b) => b.date.localeCompare(a.date));
export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

/** URL-safe id for headings, used by the table of contents */
export const headingId = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
