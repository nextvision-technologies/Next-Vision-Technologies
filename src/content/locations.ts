// Local SEO landing pages: /software-house-lahore and /web-development-company-uk.
// Each page targets one local search phrase. Keep every claim true: only real offices, services and projects.

type LocationPage = {
  title: string; // <title> and breadcrumb; contains the target phrase
  heading: string; // H1
  intro: string; // hero text, also the meta description source
  sections: { heading: string; paragraphs: string[] }[];
  reasons: { title: string; text: string }[];
  industries: string[];
  process: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
};

export const locations = {
  "software-house-lahore": {
    title: "Software House in Lahore",
    heading: "A software house in Lahore building AI, web and SaaS products",
    intro: "Next Vision Technologies works with businesses in Lahore and across Pakistan on websites, custom software, AI automation and marketing.",
    sections: [
      {
        heading: "Your software house in Lahore, from idea to launch",
        paragraphs: [
          "Next Vision Technologies is a registered software house in Lahore. Our office is at 28 Davis Road, Garhi Shahu, and our team of developers, AI engineers, designers and marketers works on projects for businesses in Lahore, across Pakistan and in the United Kingdom.",
          "We build the systems a growing business actually runs on: [custom software](/services/custom-software-development) such as courier, clinic and POS billing systems, [business websites](/services/web-development), [Shopify](/services/shopify-development) and [WooCommerce stores](/services/ecommerce-solutions), [mobile apps](/services/mobile-app-development) and [AI chatbots](/services/ai-chatbot-development) that answer customers on WhatsApp around the clock.",
          "Because design, development and marketing sit under one roof, you deal with one team and one plan. The people who build your website also set up its SEO and tracking, so it is ready to bring in customers from the day it goes live.",
        ],
      },
      {
        heading: "Software built for how Lahore businesses work",
        paragraphs: [
          "Most of our clients in Pakistan sell through WhatsApp, take cash on delivery and work with local couriers. We design around that: order and COD tracking, courier accounts, WhatsApp notifications and reports in the format your accounts team already uses.",
          "We talk to you in English or Urdu, explain technical choices in plain language and give you a fixed quote with a written scope before any work starts, so the price does not grow halfway through the project.",
          "You own what we build. Once the project is paid in full, the final code, designs and content are yours, the domain and hosting can be registered in your name, and we hand everything over with training for your team.",
        ],
      },
      {
        heading: "A registered company you can verify",
        paragraphs: [
          "Next Vision Technologies (Private) Limited is incorporated with the SECP and registered with the FBR. You can check both records yourself on our [company registration page](/company-registration) before you work with us.",
          "See what we have built for hotels, clinics, couriers, retailers and other businesses in our [projects gallery](/projects), or [meet the leadership team](/team).",
        ],
      },
    ],
    reasons: [
      { title: "One team for everything", text: "Software, websites, AI and marketing from one office, so nothing falls between two agencies." },
      { title: "Fixed quotes in 24 hours", text: "A clear scope and price within a day of your first message, with no hidden extras." },
      { title: "Local know-how", text: "COD, local couriers, WhatsApp selling and Urdu-speaking customers built into the plan." },
      { title: "Meet us in Lahore", text: "Visit our Garhi Shahu office to discuss your project face to face. Message us first to book a time." },
      { title: "You own your system", text: "Code, designs and content are yours once paid in full, with handover and training." },
      { title: "Support after launch", text: "Updates, backups, fixes and new features when your business needs them." },
    ],
    industries: ["Logistics & couriers", "Clinics & hospitals", "Hotels & guest houses", "Retail & POS", "Real estate", "Restaurants", "Construction", "Fitness & gyms", "Automotive"],
    process: [
      { title: "Free consultation", text: "Tell us your goals on a call, on WhatsApp or at our office." },
      { title: "Fixed quote", text: "A written scope, timeline and price within 24 hours." },
      { title: "Design & build", text: "Regular progress updates and a preview you can test before launch." },
      { title: "Launch & grow", text: "Go live, then SEO, marketing and support to bring in customers." },
    ],
    faqs: [
      { q: "Where is your office in Lahore?", a: "Our registered office is at 28 Davis Road, Garhi Shahu, Lahore. It is also on Google Maps; see the map at the bottom of this page. Please message us before visiting so the right person is available." },
      { q: "Do you only work with Lahore businesses?", a: "No. We work with businesses in Lahore, across Pakistan and in the United Kingdom. Most projects run smoothly over WhatsApp and video calls." },
      { q: "How much does custom software cost in Lahore?", a: "It depends on the features you need. We give you a fixed written quote within 24 hours of understanding your requirements. For websites, our guide on [website costs](/blog/how-much-does-a-website-cost-in-pakistan) explains the main price drivers." },
      { q: "Can you add an AI chatbot to my existing website or WhatsApp?", a: "Yes. We train the chatbot on your own business information and connect it to your website, WhatsApp, Facebook or Instagram, with a hand-over to your team when a person is needed." },
      { q: "Is Next Vision Technologies a registered company?", a: "Yes. Next Vision Technologies (Private) Limited is registered with the SECP and the FBR. The details and documents are on our company registration page." },
    ],
  },
  "web-development-company-uk": {
    title: "Web Development Company UK",
    heading: "Web development for UK businesses",
    intro: "UK businesses work with Next Vision Technologies for fast websites, web apps and AI automation, with UK-hours support.",
    sections: [
      {
        heading: "A web development company for UK businesses",
        paragraphs: [
          "Next Vision Technologies builds websites, web applications and automation for small and growing businesses across the United Kingdom. You get a dedicated team of developers, designers and marketers, available during UK working hours on WhatsApp, email and video calls.",
          "We build [fast, mobile-first websites](/services/web-development) with on-page SEO built in, [Shopify stores](/services/shopify-development) and [custom WordPress sites](/services/wordpress-development) you can manage yourself, and [bespoke software and CRMs](/services/crm-development) that replace spreadsheets and manual admin.",
          "Our development team is based in Lahore, which keeps projects cost-effective without cutting corners on quality, communication or ownership.",
        ],
      },
      {
        heading: "Built for the way UK businesses work",
        paragraphs: [
          "For UK care agencies we offer a [recruitment and compliance system](/services/care-agency-recruitment-compliance-system) with applicant tracking, DBS and document expiry alerts and audit-ready reports. For service businesses we connect websites to booking, payments and CRMs, so enquiries do not get lost in an inbox.",
          "We follow UK GDPR principles in what we build: clear privacy notices, cookie controls and only the data you actually need. Read more on our [GDPR page](/gdpr).",
          "Every project starts with a fixed written quote. Once it is paid in full, the website, code and content are yours, and the domain and hosting can be registered in your name.",
        ],
      },
      {
        heading: "AI and automation for UK teams",
        paragraphs: [
          "Many UK clients come to us for more than a website. [AI chatbots](/services/ai-chatbot-development) answer customer questions and book appointments out of hours, and [AI automation](/services/ai-automation) connects your apps so routine admin runs on its own.",
          "To grow traffic after launch, we also run [SEO](/services/seo) and [Google and Meta ads](/services/meta-google-ads) campaigns with monthly reports.",
        ],
      },
    ],
    reasons: [
      { title: "UK-hours support", text: "Reach us on our UK WhatsApp number, email or video call during your working day." },
      { title: "Fixed, written quotes", text: "A clear scope and price within 24 hours, so the budget does not creep." },
      { title: "Cost-effective delivery", text: "An experienced team in Lahore keeps prices fair without lowering quality." },
      { title: "SEO from day one", text: "Fast pages, clean structure and tracking built in before launch." },
      { title: "You own everything", text: "Code, designs and content are yours once paid in full." },
      { title: "Registered company", text: "Next Vision Technologies (Private) Limited, registered with the SECP and FBR." },
    ],
    industries: ["Care agencies", "Healthcare & clinics", "E-commerce brands", "Professional services", "Hospitality", "Construction & trades", "Startups & SaaS", "Recruitment"],
    process: [
      { title: "Discovery call", text: "A video call at a time that suits you in the UK." },
      { title: "Fixed quote", text: "A written scope, timeline and price within 24 hours." },
      { title: "Design & build", text: "Regular updates and a preview link to review before launch." },
      { title: "Launch & support", text: "Go live, then ongoing updates, SEO and marketing." },
    ],
    faqs: [
      { q: "How can UK clients reach you?", a: "On our UK WhatsApp number, by email or on a video call during UK working hours. All contact details are on our [contact page](/contact)." },
      { q: "How do we communicate during the project?", a: "On WhatsApp, by email and on video calls, whichever suits you. You get regular progress updates and a preview link so you can see the work before it goes live." },
      { q: "Will my website be GDPR-friendly?", a: "Yes. We add a privacy notice, cookie controls and secure forms, and we only collect the data your business needs. Your own GDPR obligations as the data controller still apply." },
      { q: "Can you take over and improve an existing website?", a: "Yes. We can audit your current site for speed, SEO and security, fix problems and add features, or rebuild it if that is better value." },
      { q: "How quickly can you start?", a: "Usually within a few days of agreeing the quote. A typical business website takes two to four weeks from the first call to launch." },
    ],
  },
} satisfies Record<string, LocationPage>;
