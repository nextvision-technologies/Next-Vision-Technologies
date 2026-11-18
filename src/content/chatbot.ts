// Rule-based website assistant. No AI service is called: every reply comes from this file.
// Answers support [text](/link) and **bold**. Each intent has an English and a Roman Urdu reply.
import { services } from "./services";
import { packages } from "./misc";
import { site } from "./site";

export type Lang = "en" | "ur";
export type Reply = { text: string; chips?: string[]; action?: "lead" };
export type Intent = { id: string; keywords: string[]; en: Reply; ur: Reply };

const PK = site.phones[0].value;
const UK = site.phones[1].value;
const EMAIL = site.email;
const WA = `https://wa.me/${site.whatsapp}`;
const priceList = packages.map((p) => `**${p.name}** $${p.price}/month`).join(", ");

const MAIN_CHIPS_EN = ["Services", "Pricing", "Get a quote", "Book a demo", "Talk to a human"];
const MAIN_CHIPS_UR = ["Services", "Pricing", "Quote chahiye", "Demo book karein", "Insaan se baat"];

// ------------------------------------------------------------------ General intents
const general: Intent[] = [
  {
    id: "greeting",
    keywords: ["hi", "hello", "hey", "salam", "assalam", "assalamualaikum", "aoa", "slam", "good morning", "good evening", "hy", "helo", "hola", "salaam"],
    en: { text: "Hello! 👋 Welcome to **Next Vision Technologies**. I can help with our services, prices, timelines or getting a free quote. What would you like to know?", chips: MAIN_CHIPS_EN },
    ur: { text: "Walaikum assalam! 👋 **Next Vision Technologies** mein khush aamdeed. Main services, prices, timeline ya free quote ke baare mein madad kar sakta hoon. Aap kya janna chahte hain?", chips: MAIN_CHIPS_UR },
  },
  {
    id: "how-are-you",
    keywords: ["how are you", "kaise ho", "kese ho", "kaisay ho", "kya haal", "kia haal", "haal hai", "how r u", "whats up", "sup"],
    en: { text: "I'm doing great, thanks for asking! 😊 How can I help your business today?", chips: MAIN_CHIPS_EN },
    ur: { text: "Main bilkul theek hoon, shukriya! 😊 Batayein, aaj aapke business ke liye kya madad karun?", chips: MAIN_CHIPS_UR },
  },
  {
    id: "who-bot",
    keywords: ["who are you", "are you bot", "are you human", "robot", "ap kon", "aap kon", "tum kon", "kon ho", "bot ho", "real person", "ai ho"],
    en: { text: "I'm the **Next Vision assistant**, a virtual helper for this website. For anything detailed, our team is one tap away on [WhatsApp](" + WA + ").", chips: ["Talk to a human", "Services"] },
    ur: { text: "Main **Next Vision ka assistant** hoon, is website ka virtual helper. Detail mein baat karni ho to hamari team [WhatsApp](" + WA + ") par available hai.", chips: ["Insaan se baat", "Services"] },
  },
  {
    id: "about",
    keywords: ["about", "company", "who is next vision", "what do you do", "what you do", "kya karte", "kia karte", "company kya", "aap log", "ap log", "next vision kya", "business kya", "kaam kya", "kam kya"],
    en: { text: "**Next Vision Technologies** is an IT company working across **A.I, SaaS, websites and marketing**. We build AI chatbots and automations, websites and online stores, mobile apps and custom software, and run SEO and ads, all with one team in Pakistan and the UK. [Learn more about us](/about).", chips: ["Services", "Our team", "Portfolio"] },
    ur: { text: "**Next Vision Technologies** ek IT company hai jo **A.I, SaaS, websites aur marketing** par kaam karti hai. Hum AI chatbots, automation, websites, online stores, mobile apps aur custom software banate hain, aur SEO aur ads bhi chalate hain. Hamari team Pakistan aur UK mein hai. [Hamare baare mein](/about).", chips: ["Services", "Our team", "Portfolio"] },
  },
  {
    id: "services",
    keywords: ["services", "service", "what services", "offer", "kon si services", "konsi services", "kya kya", "kia kia", "provide", "kaam", "solutions"],
    en: { text: `We offer **${services.length} services** in 4 areas:\n• **AI & Automation:** AI automation, AI chatbots, AI lead generation\n• **Development:** websites, WordPress, Shopify, e-commerce, mobile apps, custom software, CRM\n• **Marketing:** SEO, digital marketing, Meta & Google ads\n• **Design & Consulting:** graphic design, IT consulting\n\n[See all services](/services). Which one interests you?`, chips: ["AI chatbot", "Website", "SEO", "Mobile app"] },
    ur: { text: `Hum **${services.length} services** dete hain, 4 categories mein:\n• **AI & Automation:** AI automation, AI chatbots, AI lead generation\n• **Development:** websites, WordPress, Shopify, e-commerce, mobile apps, custom software, CRM\n• **Marketing:** SEO, digital marketing, Meta & Google ads\n• **Design & Consulting:** graphic design, IT consulting\n\n[Saari services dekhein](/services). Aapko kis mein interest hai?`, chips: ["AI chatbot", "Website", "SEO", "Mobile app"] },
  },
  {
    id: "pricing",
    keywords: ["price", "pricing", "prices", "cost", "rate", "rates", "charges", "fee", "fees", "package", "packages", "plan", "plans", "kitne", "kitna", "kitni", "paise", "pese", "paisay", "qeemat", "keemat", "budget", "kharcha", "monthly", "how much", "per month"],
    en: { text: `Our monthly growth packages: ${priceList}. Each includes website, SEO and marketing work, and Gold adds an AI chatbot. One-off projects get a **fixed quote within 24 hours**. [Compare packages](/pricing).`, chips: ["Get a quote", "Website cost", "Book a demo"] },
    ur: { text: `Hamare monthly packages: ${priceList}. In mein website, SEO aur marketing shamil hai, aur Gold plan mein AI chatbot bhi hai. Ek dafa wale project ka **fixed quote 24 ghante mein** milta hai. [Packages compare karein](/pricing).`, chips: ["Quote chahiye", "Website cost", "Demo book karein"] },
  },
  {
    id: "website-cost",
    keywords: ["website cost", "website price", "website kitne", "website kitna", "website ki qeemat", "site cost", "website charges", "website banwane", "website bnwani", "website banwani", "web price", "kitne ki", "kitne ka", "kitni ki", "website kitne ki", "how much", "website", "cost of website"],
    en: { text: "Website prices depend on pages, design and features. A business website usually takes **2–4 weeks**, an online store **3–6 weeks**. Our [Silver plan](/pricing) starts at $249/month including the website, or we can give you a **fixed one-time quote**. Read our guide: [How much does a website cost?](/blog/how-much-does-a-website-cost-in-pakistan)", chips: ["Get a quote", "Pricing"] },
    ur: { text: "Website ki qeemat pages, design aur features par depend karti hai. Business website aam taur par **2–4 hafton** mein, aur online store **3–6 hafton** mein banta hai. Hamara [Silver plan](/pricing) $249/month se shuru hota hai jis mein website shamil hai, ya hum **ek dafa ka fixed quote** de sakte hain. Guide parhein: [Website kitne ki banti hai?](/blog/how-much-does-a-website-cost-in-pakistan)", chips: ["Quote chahiye", "Pricing"] },
  },
  {
    id: "timeline",
    keywords: ["how long", "time", "timeline", "duration", "days", "weeks", "kitne din", "kitna time", "kitna waqt", "kab tak", "deadline", "deliver", "delivery", "jaldi", "fast", "urgent"],
    en: { text: "Typical timelines:\n• Landing page: about **1 week**\n• Business website: **2–4 weeks**\n• Online store: **3–6 weeks**\n• AI chatbot or automation: **2–4 weeks**\n• Mobile app or custom software: **6+ weeks**\nUrgent work is possible, just tell us your deadline.", chips: ["Get a quote", "Services"] },
    ur: { text: "Aam timeline:\n• Landing page: taqreeban **1 hafta**\n• Business website: **2–4 hafte**\n• Online store: **3–6 hafte**\n• AI chatbot ya automation: **2–4 hafte**\n• Mobile app ya custom software: **6+ hafte**\nJaldi chahiye to bhi ho sakta hai, bas apni deadline batayein.", chips: ["Quote chahiye", "Services"] },
  },
  {
    id: "quote",
    keywords: ["quote", "quotation", "estimate", "proposal", "get started", "start project", "hire", "order", "quote chahiye", "kaam karwana", "kam karwana", "project start", "banwana", "bnwana", "chahiye", "chaiye", "need website", "want website", "i want", "i need", "mujhe", "muje"],
    en: { text: "Great, let's get your **free quote**! I'll take a few details and our team will contact you within 24 hours. You can also use the [quote form](/contact).", action: "lead" },
    ur: { text: "Zabardast, aapka **free quote** tayyar karte hain! Main kuch details le leta hoon, hamari team 24 ghante mein aap se rabta karegi. Aap [quote form](/contact) bhi bhar sakte hain.", action: "lead" },
  },
  {
    id: "demo",
    keywords: ["demo", "meeting", "call", "appointment", "book", "schedule", "consultation", "meeting karni", "baat karni", "zoom", "video call"],
    en: { text: "You can book a **free 30-minute demo** at a time that suits you: [Book a demo](/book-demo). We'll show live examples and give you a rough plan and price.", chips: ["Get a quote", "Talk to a human"] },
    ur: { text: "Aap apni marzi ke waqt par **free 30 minute ka demo** book kar sakte hain: [Demo book karein](/book-demo). Hum live examples dikhayenge aur andaza plan aur price batayenge.", chips: ["Quote chahiye", "Insaan se baat"] },
  },
  {
    id: "contact",
    keywords: ["contact", "phone", "number", "call you", "email", "mail", "reach", "rabta", "raabta", "contact number", "phone number", "mobile number", "kaise contact", "touch"],
    en: { text: `You can reach us anytime:\n• 🇵🇰 Pakistan: **${PK}**\n• 🇬🇧 UK: **${UK}**\n• Email: [${EMAIL}](mailto:${EMAIL})\n• WhatsApp: [Chat now](${WA})\nOr use our [contact page](/contact).`, chips: ["Get a quote", "Office location"] },
    ur: { text: `Aap hum se kabhi bhi rabta kar sakte hain:\n• 🇵🇰 Pakistan: **${PK}**\n• 🇬🇧 UK: **${UK}**\n• Email: [${EMAIL}](mailto:${EMAIL})\n• WhatsApp: [Abhi chat karein](${WA})\nYa [contact page](/contact) use karein.`, chips: ["Quote chahiye", "Office location"] },
  },
  {
    id: "whatsapp",
    keywords: ["whatsapp", "whats app", "watsapp", "whatsap", "wa", "chat on whatsapp"],
    en: { text: `Sure! Chat with our team on WhatsApp: [Open WhatsApp](${WA}) (${PK}).` },
    ur: { text: `Bilkul! Hamari team se WhatsApp par baat karein: [WhatsApp kholein](${WA}) (${PK}).` },
  },
  {
    id: "human",
    keywords: ["human", "agent", "person", "talk to", "representative", "insaan", "banda", "kisi se baat", "team se baat", "real person", "manager", "sales", "talk to a human", "insaan se baat"],
    en: { text: `Of course. Our team replies quickly on [WhatsApp](${WA}), or call **${PK}** (Pakistan) / **${UK}** (UK). Prefer a call back? Share your details and we'll contact you.`, chips: ["Get a quote"] },
    ur: { text: `Zaroor. Hamari team [WhatsApp](${WA}) par jaldi jawab deti hai, ya **${PK}** (Pakistan) / **${UK}** (UK) par call karein. Call back chahiye? Apni details dein, hum rabta karenge.`, chips: ["Quote chahiye"] },
  },
  {
    id: "location",
    keywords: ["location", "office", "address", "where", "kahan", "kidhar", "lahore", "pakistan", "uk", "london", "city", "office location", "physical"],
    en: { text: "We have teams in **Lahore, Pakistan** and the **United Kingdom**, and we work with clients worldwide, fully online. Meetings happen on video call or WhatsApp. [Contact us](/contact) to visit or meet.", chips: ["Book a demo", "Contact"] },
    ur: { text: "Hamari teams **Lahore, Pakistan** aur **United Kingdom** mein hain, aur hum duniya bhar ke clients ke saath online kaam karte hain. Meetings video call ya WhatsApp par hoti hain. Milne ke liye [contact karein](/contact).", chips: ["Demo book karein", "Contact"] },
  },
  {
    id: "hours",
    keywords: ["hours", "timing", "timings", "open", "working hours", "office time", "kab khulta", "time kya", "available", "sunday", "weekend", "24/7"],
    en: { text: "Our office hours are **Monday to Saturday, 10am–7pm (Pakistan time)**. Messages on WhatsApp outside these hours are answered the next working morning, and I'm here 24/7 for quick questions.", chips: ["Contact"] },
    ur: { text: "Hamare office ke auqaat **Monday se Saturday, subah 10 se shaam 7 baje (Pakistan time)** hain. Baad mein WhatsApp par aaye messages ka jawab agli subah diya jata hai, aur main 24/7 yahan hoon.", chips: ["Contact"] },
  },
  {
    id: "payment",
    keywords: ["payment", "pay", "bank", "transfer", "jazzcash", "easypaisa", "card", "advance", "installment", "installments", "qist", "adaigi", "payment method", "deposit", "paypal", "wise", "payment kaise", "payment karni", "pay kaise", "how to pay"],
    en: { text: "Projects usually start with a **deposit**, then milestone payments as work is delivered. Monthly packages are billed at the start of each month. We accept bank transfer and common local and international methods. Details are in our [Terms](/terms).", chips: ["Refund policy", "Pricing"] },
    ur: { text: "Project aam taur par **advance deposit** se shuru hota hai, phir kaam ke milestones par payment hoti hai. Monthly packages har mahine ke shuru mein bill hote hain. Hum bank transfer aur local aur international payment methods lete hain. Detail [Terms](/terms) mein hai.", chips: ["Refund policy", "Pricing"] },
  },
  {
    id: "refund",
    keywords: ["refund", "money back", "cancel", "cancellation", "wapas", "paise wapas", "return"],
    en: { text: "If you cancel before work starts, the deposit is refunded (minus third-party costs). Monthly packages can be cancelled with 30 days' notice. Full details: [Refund Policy](/refund-policy).", chips: ["Payment", "Talk to a human"] },
    ur: { text: "Kaam shuru hone se pehle cancel karein to deposit wapas ho jata hai (third-party kharche kaat kar). Monthly packages 30 din ke notice par band ho sakte hain. Poori detail: [Refund Policy](/refund-policy).", chips: ["Payment", "Insaan se baat"] },
  },
  {
    id: "portfolio",
    keywords: ["portfolio", "your work", "projects", "previous work", "samples", "examples", "case study", "kaam dikhao", "pehle ka kaam", "clients", "reviews"],
    en: { text: "We've delivered **100+ projects** for 50+ clients: websites, online stores, AI chatbots, apps and campaigns. See highlights in our [portfolio](/portfolio), or [book a demo](/book-demo) to see live examples.", chips: ["Book a demo", "Services"] },
    ur: { text: "Hum **100+ projects** 50+ clients ke liye kar chuke hain: websites, online stores, AI chatbots, apps aur campaigns. [Portfolio](/portfolio) dekhein, ya live examples ke liye [demo book karein](/book-demo).", chips: ["Demo book karein", "Services"] },
  },
  {
    id: "team",
    keywords: ["team", "founder", "ceo", "owner", "director", "cto", "coo", "ali raza", "ahsan", "babar", "ehtisham", "malik", "who owns", "our team"],
    en: { text: "Our leadership team: **Muhammad Ahsan Khan** (Director & Owner), **Ali Raza** (CEO & Founder), **Babar Ali** (COO & Head of Sales) and **Ehtisham Malik** (CTO). [Meet the team](/team).", chips: ["About", "Contact"] },
    ur: { text: "Hamari leadership team: **Muhammad Ahsan Khan** (Director & Owner), **Ali Raza** (CEO & Founder), **Babar Ali** (COO & Head of Sales) aur **Ehtisham Malik** (CTO). [Team se milein](/team).", chips: ["About", "Contact"] },
  },
  {
    id: "jobs",
    keywords: ["job", "jobs", "career", "careers", "vacancy", "hiring", "internship", "intern", "naukri", "nokri", "apply", "cv", "resume"],
    en: { text: "We're hiring! Current openings include **Senior Sales Closer** and **Calling Agent**. See details and apply on our [careers page](/jobs).", chips: ["Courses", "Contact"] },
    ur: { text: "Hum hiring kar rahe hain! Abhi **Senior Sales Closer** aur **Calling Agent** ki jobs hain. Detail aur apply ke liye [careers page](/jobs) dekhein.", chips: ["Courses", "Contact"] },
  },
  {
    id: "courses",
    keywords: ["course", "courses", "training", "learn", "class", "classes", "sikhna", "seekhna", "batch", "academy", "teach"],
    en: { text: "We run practical courses in **AI automation, full-stack web development, digital marketing & Meta ads** and **SEO**. See dates and enrol on our [courses page](/courses).", chips: ["Jobs", "Contact"] },
    ur: { text: "Hum **AI automation, full-stack web development, digital marketing & Meta ads** aur **SEO** ke practical courses karwate hain. Detail aur enrolment ke liye [courses page](/courses) dekhein.", chips: ["Jobs", "Contact"] },
  },
  {
    id: "ownership",
    keywords: ["own", "ownership", "source code", "code", "kis ka hoga", "malik", "domain mera", "rights", "copyright"],
    en: { text: "Once your project is paid in full, **you own** the final website, code, designs and content. Domains and hosting can be registered in your name. See our [Terms](/terms).", chips: ["Payment", "Get a quote"] },
    ur: { text: "Poori payment ke baad website, code, design aur content **aapka hota hai**. Domain aur hosting aapke naam par register ho sakti hai. [Terms](/terms) dekhein.", chips: ["Payment", "Quote chahiye"] },
  },
  {
    id: "support",
    keywords: ["support", "maintenance", "after launch", "update", "updates", "bug", "fix", "issue", "problem", "masla", "help after", "maintain"],
    en: { text: "Every project includes a support period after launch, and we offer monthly maintenance for updates, backups, security and changes. Our [monthly packages](/pricing) include ongoing support.", chips: ["Pricing", "Talk to a human"] },
    ur: { text: "Har project mein launch ke baad support shamil hoti hai, aur hum monthly maintenance bhi dete hain: updates, backups, security aur changes. Hamare [monthly packages](/pricing) mein support shamil hai.", chips: ["Pricing", "Insaan se baat"] },
  },
  {
    id: "hosting",
    keywords: ["hosting", "domain", "server", "ssl", "host", "domain name", "cpanel", "deploy"],
    en: { text: "Yes, we handle **domain, hosting and SSL** setup for you, on fast and secure servers. We can also move your existing website without losing your Google rankings.", chips: ["Website cost", "Get a quote"] },
    ur: { text: "Ji haan, hum **domain, hosting aur SSL** ka setup khud karte hain, tez aur secure servers par. Aapki purani website ko Google rankings khoye baghair move bhi kar sakte hain.", chips: ["Website cost", "Quote chahiye"] },
  },
  {
    id: "revisions",
    keywords: ["revision", "revisions", "changes", "change", "edit", "tabdeeli", "badlna", "modify"],
    en: { text: "Each proposal includes rounds of revisions, and you'll see **previews at every stage**. Extra changes outside the scope are quoted before we start them, so there are no surprise bills.", chips: ["Get a quote"] },
    ur: { text: "Har proposal mein revisions shamil hoti hain, aur aap **har stage par preview** dekhte hain. Scope se bahar tabdeeli ka price pehle bata diya jata hai, koi chhupa kharcha nahi.", chips: ["Quote chahiye"] },
  },
  {
    id: "international",
    keywords: ["international", "abroad", "outside pakistan", "usa", "canada", "dubai", "uae", "saudi", "europe", "australia", "foreign", "worldwide", "bahar", "clients in", "work with clients", "other countries"],
    en: { text: "Absolutely. We work with clients in the **UK, USA, Middle East and worldwide**, fully online with WhatsApp, email and video calls, and invoice in your currency.", chips: ["Get a quote", "Book a demo"] },
    ur: { text: "Bilkul. Hum **UK, USA, Middle East aur duniya bhar** ke clients ke saath online kaam karte hain, WhatsApp, email aur video call ke zariye.", chips: ["Quote chahiye", "Demo book karein"] },
  },
  {
    id: "discount",
    keywords: ["discount", "offer", "deal", "sasta", "cheap", "kam price", "kam kar", "concession", "promo"],
    en: { text: "Our monthly packages are currently on offer, with savings shown on the [pricing page](/pricing). For larger or long-term projects, ask us for a custom package.", chips: ["Pricing", "Get a quote"] },
    ur: { text: "Hamare monthly packages par abhi offer chal raha hai, bachat [pricing page](/pricing) par dekhein. Bare ya lambe projects ke liye custom package ka poochein.", chips: ["Pricing", "Quote chahiye"] },
  },
  {
    id: "seo-time",
    keywords: ["google ranking", "rank", "first page", "top on google", "google pe", "google par", "ranking kab", "seo kitna time", "seo time", "seo kab", "seo results", "seo"],
    en: { text: "SEO usually shows steady progress from **3 to 6 months**, depending on competition. We start with an audit and track rankings monthly. Read our [SEO guide](/blog/how-to-rank-website-on-google-in-pakistan) or see [SEO services](/services/seo).", chips: ["SEO", "Get a quote"] },
    ur: { text: "SEO mein aam taur par **3 se 6 mahine** mein wazeh results aate hain, competition par depend karta hai. Hum audit se shuru karte hain aur har mahine ranking report dete hain. [SEO guide](/blog/how-to-rank-website-on-google-in-pakistan) parhein ya [SEO services](/services/seo) dekhein.", chips: ["SEO", "Quote chahiye"] },
  },
  {
    id: "chatbot-lang",
    keywords: ["urdu", "roman urdu", "language", "zaban", "zabaan", "english", "multilingual"],
    en: { text: "Yes! The AI chatbots we build for clients reply in **English, Urdu and Roman Urdu**, and I understand both English and Roman Urdu too. [AI chatbot service](/services/ai-chatbot-development).", chips: ["AI chatbot", "Get a quote"] },
    ur: { text: "Ji haan! Jo AI chatbots hum clients ke liye banate hain woh **English, Urdu aur Roman Urdu** mein jawab dete hain, aur main bhi English aur Roman Urdu samajhta hoon. [AI chatbot service](/services/ai-chatbot-development).", chips: ["AI chatbot", "Quote chahiye"] },
  },
  {
    id: "technologies",
    keywords: ["technology", "technologies", "tech stack", "stack", "react", "nextjs", "next js", "laravel", "php", "python", "node", "flutter", "react native", "framework"],
    en: { text: "We build with modern tools: **React, Next.js, Node.js, Python, WordPress, Shopify, React Native**, plus AI platforms like **OpenAI and Claude** and automation tools like **n8n, Make and Zapier**.", chips: ["Services", "Get a quote"] },
    ur: { text: "Hum modern tools use karte hain: **React, Next.js, Node.js, Python, WordPress, Shopify, React Native**, AI ke liye **OpenAI aur Claude**, aur automation ke liye **n8n, Make aur Zapier**.", chips: ["Services", "Quote chahiye"] },
  },
  {
    id: "privacy",
    keywords: ["privacy", "data safe", "secure", "security", "gdpr", "nda", "confidential", "data mehfooz"],
    en: { text: "Your data is safe with us. We use encrypted connections, access controls and backups, never sell personal data, and are happy to sign an **NDA**. See our [Privacy Policy](/privacy-policy) and [Security](/security) pages." },
    ur: { text: "Aapka data hamare paas mehfooz hai. Hum encrypted connections, access control aur backups use karte hain, data kabhi nahi bechte, aur **NDA** sign karne ko tayyar hain. [Privacy Policy](/privacy-policy) aur [Security](/security) dekhein." },
  },
  {
    id: "blog",
    keywords: ["blog", "article", "articles", "guide", "tips", "read"],
    en: { text: "Our [blog](/blog) has practical guides on AI chatbots, website costs and ranking on Google." },
    ur: { text: "Hamare [blog](/blog) mein AI chatbots, website ki qeemat aur Google ranking par guides hain." },
  },
  {
    id: "thanks",
    keywords: ["thanks", "thank you", "thank u", "thx", "shukriya", "shukria", "jazakallah", "jazak allah", "meherbani", "great", "nice", "awesome", "good", "ok thanks"],
    en: { text: "You're welcome! 😊 Anything else I can help with?", chips: MAIN_CHIPS_EN },
    ur: { text: "Koi baat nahi! 😊 Kuch aur madad chahiye?", chips: MAIN_CHIPS_UR },
  },
  {
    id: "bye",
    keywords: ["bye", "goodbye", "see you", "allah hafiz", "khuda hafiz", "allah hafiz", "baad mein", "later"],
    en: { text: `Thanks for visiting Next Vision! 👋 If you need us, we're on [WhatsApp](${WA}) anytime.` },
    ur: { text: `Next Vision visit karne ka shukriya! 👋 Kabhi bhi zaroorat ho to hum [WhatsApp](${WA}) par hain. Allah Hafiz!` },
  },
];

// ------------------------------------------------------------------ Service intents (built from services data)
const extraKeywords: Record<string, string[]> = {
  "ai-automation": ["automation", "automate", "ai agent", "workflow", "n8n", "zapier", "make.com", "automatic"],
  "ai-chatbot-development": ["chatbot", "chat bot", "bot", "whatsapp bot", "ai chatbot", "customer support bot"],
  "ai-lead-generation": ["lead generation", "leads", "lead", "prospects", "cold email", "clients chahiye", "customers chahiye"],
  "web-development": ["website", "web", "site", "web development", "landing page", "web app"],
  "wordpress-development": ["wordpress", "wp", "elementor", "woocommerce"],
  "shopify-development": ["shopify", "shopify store", "dropshipping", "store"],
  "ecommerce-solutions": ["ecommerce", "e-commerce", "online store", "online shop", "store", "shop", "daraz"],
  "custom-software-development": ["software", "custom software", "saas", "erp", "pos", "system", "portal", "dashboard"],
  "crm-development": ["crm", "hubspot", "zoho", "customer management"],
  "mobile-app-development": ["app", "apps", "mobile app", "mobile apps", "make apps", "android", "ios", "application", "iphone", "play store"],
  "digital-marketing": ["marketing", "digital marketing", "social media", "facebook page", "instagram", "tiktok", "content"],
  seo: ["seo", "search engine", "google ranking", "ranking", "keywords", "backlinks"],
  "meta-google-ads": ["ads", "advertising", "facebook ads", "meta ads", "google ads", "boost", "campaign", "ppc"],
  "graphic-design": ["design", "logo", "branding", "graphic", "graphics", "poster", "banner", "brand identity"],
  "it-consulting": ["consulting", "consultant", "advice", "it consulting", "mashwara", "cto"],
  "care-agency-recruitment-compliance-system": ["care agency", "care home", "recruitment", "compliance", "dbs", "carers"],
};

const serviceIntents: Intent[] = services.map((s) => ({
  id: `service:${s.slug}`,
  keywords: [s.title.toLowerCase(), ...(extraKeywords[s.slug] ?? []), ...s.tags.map((t) => t.toLowerCase())],
  en: {
    text: `**${s.title}**: ${s.tagline} ${s.short}\n${s.benefits.slice(0, 3).map((b) => `• ${b}`).join("\n")}\n[Learn more](/services/${s.slug})`,
    chips: ["Get a quote", "Pricing", "Book a demo"],
  },
  ur: {
    text: `Ji haan, hum **${s.title}** provide karte hain. ${s.short}\n${s.benefits.slice(0, 3).map((b) => `• ${b}`).join("\n")}\n[Detail dekhein](/services/${s.slug})`,
    chips: ["Quote chahiye", "Pricing", "Demo book karein"],
  },
}));

export const intents: Intent[] = [...general, ...serviceIntents];

// ------------------------------------------------------------------ Fallback (bot always replies)
export const fallback: Record<Lang, Reply> = {
  en: { text: `I want to make sure you get the right answer. Could you tell me a bit more? You can ask about our **services, prices, timelines or contact details**, or talk to our team directly on [WhatsApp](${WA}).`, chips: MAIN_CHIPS_EN },
  ur: { text: `Main chahta hoon aapko bilkul sahi jawab mile. Thoda aur detail batayenge? Aap **services, prices, timeline ya contact** ke baare mein pooch sakte hain, ya seedha hamari team se [WhatsApp](${WA}) par baat karein.`, chips: MAIN_CHIPS_UR },
};

export const welcome: Record<Lang, Reply> = {
  en: { text: "Hi! 👋 I'm the Next Vision assistant. Ask me anything in **English or Roman Urdu**: services, prices, timelines or a free quote.", chips: MAIN_CHIPS_EN },
  ur: { text: "Assalam o Alaikum! 👋 Main Next Vision ka assistant hoon. Mujh se **English ya Roman Urdu** mein kuch bhi poochein.", chips: MAIN_CHIPS_UR },
};

// ------------------------------------------------------------------ Matching
const ROMAN_URDU = new Set([
  "kya", "kia", "hai", "hain", "hy", "he", "ap", "aap", "apka", "aapka", "apki", "aapki", "mujhe", "muje", "mjhe", "mera", "meri", "mere", "chahiye", "chaiye", "chahye",
  "kitna", "kitne", "kitni", "kaise", "kese", "kaisay", "kesay", "karna", "krna", "karni", "krni", "karwana", "krwana", "banwana", "bnwana", "banwani", "bnwani",
  "nahi", "nai", "haan", "han", "ji", "jee", "kab", "kahan", "kidhar", "kyun", "kyu", "kon", "kaun", "konsi", "kis", "ka", "ki", "ke", "ko", "se", "sy", "mein", "mai",
  "acha", "accha", "theek", "thik", "batao", "bataen", "btao", "dain", "dein", "hum", "humein", "hamein", "tum", "yar", "yaar", "bhai", "salam", "shukriya", "wala", "wali",
  "paise", "pese", "qeemat", "keemat", "kaam", "raha", "rahi", "rahe", "sakta", "sakte", "skta", "skte", "hoga", "hogi", "chahta", "chahti", "dikhao",
  "assalam", "alaikum", "aoa", "karoge", "karo", "kro", "milega", "milegi", "karein", "krein", "lagenge", "lagega", "dega", "deta", "dete", "banegi", "banega", "bnegi", "leta", "lete", "hu", "hoon", "ho", "tha", "thi", "kuch", "koi", "bhi", "aur", "lekin", "agar", "abhi",
]);

export function detectLang(text: string): Lang {
  const words = normalize(text).split(" ").filter(Boolean);
  const hits = words.filter((w) => ROMAN_URDU.has(w)).length;
  return hits >= 1 && hits / Math.max(words.length, 1) >= 0.15 ? "ur" : "en";
}

function normalize(t: string) {
  return t.toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9\s.-]/g, " ").replace(/\s+/g, " ").trim();
}

function editDistance(a: string, b: string) {
  if (Math.abs(a.length - b.length) > 2) return 3;
  const d: number[][] = Array.from({ length: a.length + 1 }, (_, i) => Array.from({ length: b.length + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)));
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1); // swapped letters
    }
  return d[a.length][b.length];
}

/** Score every intent against the message and return the best reply. Never returns empty. */
export function getReply(message: string): { reply: Reply; lang: Lang; intent: string } {
  const lang = detectLang(message);
  const text = ` ${normalize(message)} `;
  const words = text.trim().split(" ");
  let best: { intent: Intent; score: number } | null = null;

  for (const intent of intents) {
    let score = 0;
    const used = new Set<string>(); // each word of the message counts once per intent
    for (const k of new Set(intent.keywords.map(normalize))) {
      if (!k) continue;
      if (k.includes(" ")) {
        if (text.includes(` ${k} `)) score += 2 + k.split(" ").length * 0.5; // phrases weigh more
      } else if (words.includes(k)) {
        if (!used.has(k)) { used.add(k); score += k.length <= 2 ? 0.6 : 1; }
      } else if (k.length >= 6) {
        const w = words.find((x) => !used.has(x) && x.length >= 5 && editDistance(x, k) <= 1);
        if (w) { used.add(w); score += 0.9; } // typo tolerance, e.g. "webiste", "shopfy"
      }
    }
    // Services and pricing beat small talk when both match
    if (score > 0 && (intent.id.startsWith("service:") || intent.id === "pricing" || intent.id === "quote")) score += 0.25;
    if (!best || score > best.score) best = { intent, score };
  }

  if (!best || best.score < 0.6) return { reply: fallback[lang], lang, intent: "fallback" };
  return { reply: best.intent[lang], lang, intent: best.intent.id };
}
