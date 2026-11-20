// Blog posts. Each body is a list of blocks so posts can later move to a CMS or MDX without changing the page.
// Set `draft: true` to hide a post: it disappears from the blog, footer and sitemap, and its URL redirects to /blog.
import type { Post } from "@/types/content";
import { DEFAULT_AUTHOR, getPerson, reviewerByCategory } from "./people";

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
    focusKeyword: "AI chatbots for business",
    seoTitle: "AI Chatbots for Business: Automate Customer Support 24/7",
    metaDescription: "AI chatbots for business answer customers instantly on your website and WhatsApp, capture leads and book appointments. See how they work and how to start.",
    cover: "/blog/ai-chatbots-for-business.webp",
    coverAlt: "AI chatbots for business: a customer service robot holding a tablet",
    reviewer: "ehtisham-iftikhar",
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
    focusKeyword: "website cost",
    seoTitle: "How Much Does a Website Cost? 2026 Pricing Guide",
    metaDescription: "What does a website cost? Typical budgets for business sites, online stores and custom builds, what drives the price, and the running costs most people forget.",
    cover: "/blog/website-cost-guide.webp",
    coverAlt: "Laptop with website code on a desk: what a website costs to build",
    reviewer: "ali-raza",
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
    focusKeyword: "rank your website on Google",
    seoTitle: "How to Rank Your Website on Google: Complete SEO Guide",
    metaDescription: "Learn how to rank your website on Google step by step: technical SEO, keyword research, on-page content, local SEO and links that actually move rankings.",
    cover: "/blog/rank-your-website-on-google.webp",
    coverAlt: "SEO letter tiles on a desk: how to rank your website on Google",
    reviewer: "muhammad-ahsan-khan",
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

  {
    slug: "hr-automation-software",
    title: "HR Automation Software: A Complete Guide for Growing Businesses",
    excerpt: "Attendance sheets, payroll mistakes, piles of CVs and leave requests lost in WhatsApp chats slow every growing team down. Here is how HR automation software handles the routine work, including AI CV screening, what it costs and how to choose the right system.",
    category: "AI & Automation",
    date: "2026-11-19",
    readMinutes: 13,
    service: "ai-automation",
    focusKeyword: "HR automation software",
    seoTitle: "HR Automation Software: Features, Benefits & Cost Guide",
    metaDescription: "HR automation software handles attendance, payroll, leave and AI CV screening for you. See key features, benefits, costs and how to pick the right system.",
    coverAlt: "Team using HR automation software on office computers",
    reviewer: "ehtisham-iftikhar",
    takeaways: [
      "HR automation software takes over repeat HR tasks such as attendance, payroll, leave approvals and onboarding, so your HR team spends time on people instead of paperwork.",
      "The fastest wins usually come from automating payroll and attendance first, because they cause the most errors and take the most hours each month.",
      "An AI CV screening pipeline reads every application, scores it against your job requirements and shortlists the best-matched candidates, while your recruiters make the final call.",
      "A good system connects to the tools you already use: biometric devices, WhatsApp, email and your accounting software.",
      "Choose between a ready-made HR tool and custom HR software based on your team size, your processes and how much you need to change.",
    ],
    body: [
      { type: "p", text: "Ask any HR manager where their week goes and you will hear the same list: chasing attendance records, fixing payroll errors, answering \"how many leaves do I have left?\" and copying the same employee details into five different spreadsheets. None of this work is difficult. It is simply repetitive, and it grows every time you hire." },
      { type: "p", text: "**HR automation software** solves this by handling the routine steps for you. Attendance flows in from your biometric device, salaries calculate themselves, leave requests go to the right manager and new employees receive their documents without anyone sending them by hand. In this guide we explain what HR automation software does, which tasks to automate first, what it costs and how to choose a system that fits your business." },

      { type: "h2", text: "What is HR automation software?" },
      { type: "p", text: "HR automation software is a system that performs repeat human resources tasks automatically, following rules you set once. Instead of a person moving information between sheets, emails and chats, the software collects the data, applies your policies and notifies the right people at each step." },
      { type: "p", text: "Modern systems also use AI. An [AI assistant](/services/ai-chatbot-development) can answer employee questions about leave balances or payslips on WhatsApp, read uploaded CVs to shortlist candidates and flag unusual attendance patterns before they become payroll problems." },
      { type: "h3", text: "HR automation vs. a traditional HRMS" },
      { type: "p", text: "A traditional HR management system (HRMS) is mostly a digital filing cabinet: it stores employee records but people still do the work. HR automation software goes further by acting on that data. It does not just store a leave request, it routes it, approves it within your policy, updates the balance and adjusts payroll." },

      { type: "h2", text: "Which HR tasks can you automate?" },
      { type: "p", text: "Almost any HR process with clear steps and rules can be automated. These are the areas where businesses see the biggest time savings:" },
      { type: "h3", text: "1. Attendance and time tracking" },
      { type: "p", text: "The software pulls check-in and check-out times from biometric devices, a mobile app or a web portal, then applies your rules for late arrivals, half days, overtime and shifts. No more copying fingerprint reports into Excel at the end of the month." },
      { type: "h3", text: "2. Payroll processing" },
      { type: "p", text: "Salaries are calculated from attendance, allowances, deductions, loans and tax in one run. Payslips are generated and sent to each employee automatically, and a bank transfer file is ready for your accounts team." },
      { type: "h3", text: "3. Leave management" },
      { type: "p", text: "Employees apply for leave from their phone, managers approve with one tap and balances update instantly. Your leave policy, including carry-forward rules and public holidays, is applied the same way for everyone." },
      { type: "h3", text: "4. Recruitment and onboarding" },
      { type: "p", text: "Job applications are collected in one place, every CV is screened and scored by AI against your requirements, and interviews are scheduled automatically. Once you hire, the system sends the offer letter, collects documents and creates the employee's profile, email and payroll record. We explain the full CV screening pipeline in the next section." },
      { type: "h3", text: "5. Performance reviews and employee self-service" },
      { type: "p", text: "Review cycles start on time with reminders for managers, and employees can download payslips, update details and check policies without emailing HR." },

      { type: "h2", text: "AI CV screening: how our pipeline shortlists the right candidates" },
      { type: "p", text: "Recruitment is where HR teams lose the most hours. A single job post can bring in hundreds of CVs, and reading each one by hand takes days. Strong candidates get missed in a crowded inbox, and two recruiters can judge the same CV in two different ways." },
      { type: "p", text: "That is why we built a complete **AI CV screening pipeline** into our HR automation software. It reads every CV the moment it arrives, compares it with your job requirements, scores each candidate and automatically shortlists the best matches, so your team starts with a ranked list instead of a pile of PDFs." },
      { type: "h3", text: "How the CV screening pipeline works" },
      { type: "ol", items: [
        "**Collect CVs from every channel.** Applications from your careers page, email inbox, LinkedIn, job portals such as Rozee.pk and Indeed, and WhatsApp land in one place. PDF and Word files are supported, and scanned CVs are read with OCR.",
        "**Extract the key details.** The AI turns each CV into a clean candidate profile: contact details, education, work history, total experience, skills, certifications, notice period and expected salary. Duplicate applications are merged automatically.",
        "**Match against your job requirements.** You set must-have criteria (for example \"3+ years in sales\" or \"Lahore-based\") and nice-to-have skills. The AI understands related terms, so a candidate who lists \"React\" is recognised for a frontend developer role even if the exact words differ.",
        "**Score and rank every candidate.** Each applicant receives a match score from 0 to 100, weighted by what matters most for the role, with a short explanation of why they scored that way.",
        "**Shortlist automatically.** Candidates above your score threshold move straight to the shortlist. Applicants who miss a must-have requirement are flagged rather than silently lost.",
        "**Review, interview and reply.** Recruiters review the shortlist with all the reasons in front of them, book interviews in one click and send automatic email or WhatsApp updates, including interview invites and polite regret messages.",
      ] },
      { type: "h3", text: "What your recruiters see for each candidate" },
      { type: "table", head: ["Field", "Example"], rows: [
        ["Match score", "87 / 100"],
        ["Matched requirements", "4 years in B2B sales, CRM experience, based in Lahore"],
        ["Missing requirements", "No Salesforce certification (nice to have)"],
        ["Experience summary", "Sales Executive at two software companies, consistent growth in targets"],
        ["Recommended action", "Shortlist for first interview"],
      ], note: "Every score comes with its reasons, so recruiters can check the AI's judgement in seconds." },
      { type: "h3", text: "Fair, transparent and privacy-safe screening" },
      { type: "p", text: "Automated hiring is only useful if candidates are treated fairly. We built the pipeline around these safeguards:" },
      { type: "ul", items: [
        "**Job-related criteria only.** Scores are based on skills, experience and qualifications. Name, photo, gender, age, religion and marital status are kept out of the scoring.",
        "**Every decision is explained.** Recruiters see exactly which requirements a candidate met or missed, so nothing is a black box.",
        "**People make the final decision.** The AI recommends and ranks, but a recruiter approves every shortlist and rejection. This also keeps you in line with rules on automated decisions such as UK GDPR.",
        "**Candidate data stays protected.** CVs are stored encrypted with role-based access, and are deleted automatically after the retention period you choose.",
        "**Regular checks.** Shortlist results can be reviewed over time to make sure the criteria are not unfairly filtering out any group.",
      ] },
      { type: "h3", text: "What changes for your hiring team" },
      { type: "p", text: "Instead of spending days reading CVs, your recruiters open a ranked shortlist within minutes of a job closing. Every applicant is judged against the same criteria, no strong CV is lost in an inbox, and candidates hear back quickly, which protects your employer brand." },
      { type: "tip", title: "Get the job criteria right first", text: "The pipeline is only as good as the requirements you give it. Separate true must-haves from nice-to-haves, keep the list short and job-related, and review the first few shortlists with your hiring manager before you rely on them fully." },

      { type: "h2", text: "Benefits of HR automation software" },
      { type: "ul", items: [
        "**Hours saved every month.** Work that took days at month end, such as payroll and attendance reports, finishes in minutes.",
        "**Fewer costly mistakes.** Calculations follow the same rules every time, so you avoid overpayments, missed deductions and unhappy employees.",
        "**Faster answers for employees.** Staff see their leave balance, payslips and policies instantly, which reduces questions to HR.",
        "**Faster, fairer hiring.** AI CV screening ranks every applicant against the same criteria and hands recruiters a shortlist in minutes.",
        "**Consistent, fair policies.** Every request is handled by the same rules, which builds trust and makes audits easier.",
        "**Better decisions.** Live dashboards show headcount, overtime, absenteeism and payroll costs, so management can plan with real numbers.",
        "**Easy to scale.** Hiring ten more people does not mean hiring another HR assistant.",
      ] },
      { type: "quote", text: "The goal of HR automation is not to replace your HR team. It is to give them back the hours they spend on data entry, so they can focus on hiring, training and keeping good people." },

      { type: "h2", text: "Key features to look for" },
      { type: "p", text: "Not every system is a good fit. Before you commit, check that the HR automation software you are considering includes the features your team will actually use:" },
      { type: "table", head: ["Feature", "Why it matters"], rows: [
        ["Biometric and mobile attendance", "Removes manual entry and supports field staff and multiple branches"],
        ["Rule-based payroll", "Handles your allowances, deductions, loans, overtime and tax correctly"],
        ["Leave workflows", "Routes requests to the right manager and keeps balances accurate"],
        ["AI CV screening", "Reads, scores and shortlists applicants automatically, with reasons for every score"],
        ["Employee self-service", "Lets staff view payslips and apply for leave from their phone"],
        ["WhatsApp and email notifications", "Reaches employees where they already are"],
        ["Role-based access", "Keeps salary and personal data visible only to the right people"],
        ["Reports and dashboards", "Gives management live numbers instead of month-end spreadsheets"],
        ["Integrations", "Connects to your accounting, [CRM](/services/crm-development) and banking tools"],
      ], note: "Tip: ask for a live demo using your own policies, not a generic sample company." },

      { type: "h2", text: "Ready-made tool or custom HR software?" },
      { type: "p", text: "There are two main routes. A ready-made (off-the-shelf) tool is quick to start and has a monthly fee per employee. [Custom HR software](/services/custom-software-development) is built around your exact processes and you own it, which suits businesses with unusual shifts, multiple branches or specific approval chains." },
      { type: "table", head: ["", "Ready-made tool", "Custom HR software"], rows: [
        ["Setup time", "Days to a few weeks", "Usually 4 to 10 weeks"],
        ["Cost model", "Monthly fee per employee", "One-time build plus optional support"],
        ["Fits your process", "You adapt to the software", "The software adapts to you"],
        ["Local payroll and tax rules", "Sometimes limited", "Built exactly to your rules"],
        ["Ownership of data", "Stored with the vendor", "Fully yours, on your own server or cloud"],
      ] },
      { type: "tip", title: "Not sure which route fits?", text: "If your team is under 25 people and your policies are simple, a ready-made tool is often enough. If you have several branches, shift-based staff or approval steps no tool supports, custom software usually costs less over three years." },

      { type: "h2", text: "How much does HR automation software cost?" },
      { type: "p", text: "Cost depends on the number of employees, the modules you need and whether you choose a ready-made or custom system. Ready-made tools charge a monthly fee per employee, which adds up as you grow. A custom system has a higher upfront cost but no per-user fees, so it often becomes the cheaper option for larger teams." },
      { type: "p", text: "Whichever route you take, budget for setup, importing your existing employee data, staff training and ongoing support. For a fixed quote based on your team and processes, see our [pricing](/pricing) or [contact us](/contact)." },

      { type: "h2", text: "How to implement HR automation in 6 steps" },
      { type: "ol", items: [
        "**Map your current process.** Write down how attendance, payroll, leave and onboarding work today, including every approval step.",
        "**Pick your first module.** Start where the pain is biggest, usually payroll or attendance, instead of automating everything at once.",
        "**Clean your employee data.** Correct names, joining dates, salary details and leave balances before you import them.",
        "**Configure your policies.** Set up shifts, leave types, allowances, deductions and approval chains in the system.",
        "**Run a parallel month.** Process one payroll in both the old and new way, compare the results and fix any differences.",
        "**Train your team and go live.** Show managers and employees how to use the app, then switch fully and review reports every month.",
      ] },
      { type: "tip", title: "Start with payroll", text: "Payroll is usually the task with the most errors and the highest time cost, so automating it first shows clear results within the first month and builds support for the next module." },

      { type: "h2", text: "Common mistakes to avoid" },
      { type: "ul", items: [
        "Automating a broken process. Fix unclear policies first, or the software will simply repeat the confusion faster.",
        "Skipping employee training, which leads to people falling back on WhatsApp messages and paper forms.",
        "Choosing software that cannot connect to your biometric devices or accounting system.",
        "Ignoring data security. Salary and personal records need role-based access, backups and encryption.",
      ] },

      { type: "h2", text: "Is HR automation software right for your business?" },
      { type: "p", text: "If your HR team spends days on payroll every month, if leave records live in spreadsheets, or if you are planning to grow, HR automation software will almost certainly pay for itself. Even a team of 15 to 20 people can save several working days each month." },
      { type: "p", text: "At Next Vision Technologies we build [AI automation](/services/ai-automation) and custom HR systems that fit how your business already works, from biometric attendance to WhatsApp leave requests and one-click payroll. [Book a free demo](/book-demo) and we will show you what your HR process could look like when the routine work runs on its own." },
    ],
    faqs: [
      { q: "What is HR automation software?", a: "HR automation software is a system that handles repeat human resources tasks such as attendance, payroll, leave approvals and onboarding automatically, using rules you set once." },
      { q: "Which HR process should I automate first?", a: "Most businesses start with payroll or attendance, because these take the most time each month and cause the most errors. Leave management is usually the next step." },
      { q: "Can HR automation software connect to my biometric attendance device?", a: "Yes. Most modern systems, and all custom systems we build, can pull data directly from common biometric devices as well as mobile and web check-ins." },
      { q: "How does AI CV screening work?", a: "The system collects CVs from your careers page, email and job portals, extracts each candidate's experience and skills, scores them against your job requirements and automatically shortlists the best matches with a reason for every score." },
      { q: "Does the AI reject candidates on its own?", a: "No. The AI ranks and recommends, but a recruiter reviews and approves every shortlist and rejection. Personal details such as name, photo, gender and age are kept out of the scoring." },
      { q: "Is HR automation only for large companies?", a: "No. Teams of 15 to 20 people already save several working days a month. Smaller teams can start with a single module, such as leave or payroll, and add more later." },
      { q: "Is employee data safe in HR software?", a: "It should be. Look for role-based access, encrypted storage, regular backups and audit logs. With custom software, the data stays on servers you control." },
    ],
  },

  // ------------------------------------------------------------------ Drafts (hidden for now)
  {
    "slug": "off-page-seo-backlinks-guide-pakistan",
    "title": "Off-Page SEO in 2026: Every Type of Backlink Explained",
    "excerpt": "Which backlinks still move rankings, which ones put your site at risk, and how to build them safely with guest posts, digital PR, citations and partnerships.",
    "category": "SEO",
    "date": "2026-11-20",
    "readMinutes": 10,
    "service": "seo",
    "focusKeyword": "off-page SEO",
    "seoTitle": "Off-Page SEO: Every Type of Backlink Explained (2026)",
    "metaDescription": "Off-page SEO explained: which backlinks still move Google rankings, which put your site at risk, and how to build safe links with guest posts, PR and citations.",
    "cover": "/blog/off-page-seo-backlinks-guide-pakistan.webp",
    "coverAlt": "Off-page SEO: website pages connected by chains, representing backlinks between sites",
    "takeaways": [
      "Off-page SEO is everything outside your website that builds trust with Google: mainly backlinks, but also reviews, mentions and business listings.",
      "One relevant link from a respected site is worth more than hundreds of links from low-quality directories.",
      "Buying links or swapping them in bulk breaks Google's spam policies and can cost you your rankings.",
      "The safest links come from being worth linking to: useful content, real partnerships, local listings and digital PR."
    ],
    "body": [
      {
        "type": "p",
        "text": "You can have a fast website with perfect on-page SEO and still sit on page three of Google. Very often the missing piece is **off-page SEO**: the signals from other websites that tell Google your business is real, relevant and trusted."
      },
      {
        "type": "p",
        "text": "This guide explains what off-page SEO is, every common type of backlink, which ones still help in 2026, which ones can get your site penalised, and a safe plan you can follow."
      },
      {
        "type": "h2",
        "text": "What is off-page SEO?"
      },
      {
        "type": "p",
        "text": "On-page SEO is what you control on your own site: content, titles, speed and structure. Off-page SEO covers everything that happens elsewhere on the web and affects how Google sees you:"
      },
      {
        "type": "ul",
        "items": [
          "**Backlinks:** links from other websites to yours. These are still one of the strongest ranking signals.",
          "**Brand mentions:** your business name mentioned on news sites, blogs or forums, even without a link.",
          "**Local signals:** your Google Business Profile, reviews and consistent listings in business directories.",
          "**Social and community presence:** active profiles that send real visitors and support your brand."
        ]
      },
      {
        "type": "p",
        "text": "Think of each good backlink as a recommendation. A recommendation from a respected, relevant source carries weight; hundreds from unknown sources carry almost none."
      },
      {
        "type": "h2",
        "text": "What makes a backlink valuable?"
      },
      {
        "type": "ol",
        "items": [
          "**Relevance:** a link from a site in your industry or area means more than a link from an unrelated one.",
          "**Authority and trust:** links from well-known, well-maintained sites count for more.",
          "**Placement:** a link inside the main content of an article beats one hidden in a footer or sidebar.",
          "**Real traffic:** if people actually click the link, it is a strong sign it is genuine.",
          "**Natural anchor text:** the clickable words should read naturally, often your brand name, not the same keyword every time."
        ]
      },
      {
        "type": "h2",
        "text": "Every type of backlink, and whether it still works"
      },
      {
        "type": "table",
        "head": [
          "Type of link",
          "Value",
          "Risk"
        ],
        "rows": [
          [
            "Editorial links (sites citing your content)",
            "Very high",
            "None"
          ],
          [
            "Digital PR and news coverage",
            "Very high",
            "None"
          ],
          [
            "Guest posts on relevant, real sites",
            "High",
            "Low if genuine, high if paid or spammy"
          ],
          [
            "Local citations and business directories",
            "Medium (high for local SEO)",
            "Low with trusted directories"
          ],
          [
            "Partner, supplier and client links",
            "Medium to high",
            "Low"
          ],
          [
            "Resource pages and broken link building",
            "Medium",
            "Low"
          ],
          [
            "Social profiles and community sites",
            "Low for rankings, good for brand",
            "None"
          ],
          [
            "Forum and blog comment links",
            "Very low",
            "Medium if spammy"
          ],
          [
            "Paid links, link farms and private blog networks",
            "Short-lived at best",
            "Very high"
          ]
        ]
      },
      {
        "type": "h3",
        "text": "1. Editorial links"
      },
      {
        "type": "p",
        "text": "These are the gold standard: another site links to you because your page is genuinely useful. Original guides, data, calculators and clear explanations attract them over time. Every useful article on your blog is a chance to earn one."
      },
      {
        "type": "h3",
        "text": "2. Digital PR"
      },
      {
        "type": "p",
        "text": "Digital PR means giving journalists and bloggers a reason to write about you: a new product, a local success story, an expert comment or survey results. Coverage on news sites brings strong links, referral traffic and brand searches. Reply to journalist requests in your field and build relationships with local publications."
      },
      {
        "type": "h3",
        "text": "3. Guest posting"
      },
      {
        "type": "p",
        "text": "Writing an article for another relevant website, with a link back to yours, still works when it is done for readers rather than for links. Choose sites with a real audience in your industry, write something genuinely helpful, and keep the link natural. Avoid sites that openly sell \"guest posts\" to anyone, as these are often flagged as link schemes."
      },
      {
        "type": "h3",
        "text": "4. Local citations and business directories"
      },
      {
        "type": "p",
        "text": "For local businesses, listings on trusted directories, chambers of commerce and industry sites are essential. Make sure your business name, address and phone number are written exactly the same way everywhere, matching your Google Business Profile. A small number of trusted listings beats hundreds of automated submissions."
      },
      {
        "type": "h3",
        "text": "5. Partners, suppliers and clients"
      },
      {
        "type": "p",
        "text": "The businesses you already work with are an easy source of relevant links. Suppliers often list stockists, software vendors list partners, and clients may add a \"website by\" credit or a case study. These links are natural because the relationship is real."
      },
      {
        "type": "h3",
        "text": "6. Resource pages and broken link building"
      },
      {
        "type": "p",
        "text": "Many sites keep resource pages that link to helpful tools and guides. If you have a page that fits, ask to be included. Broken link building works the same way: find a dead link on a relevant page, then suggest your similar page as a replacement."
      },
      {
        "type": "h3",
        "text": "7. Social profiles, forums and comments"
      },
      {
        "type": "p",
        "text": "Links from social media, forums and blog comments usually carry a nofollow or ugc tag, so they pass little ranking value. They are still worth having for brand presence and real visitors, but they are not a link building strategy on their own."
      },
      {
        "type": "h2",
        "text": "Links that can hurt your rankings"
      },
      {
        "type": "p",
        "text": "Google's spam policies treat links made mainly to manipulate rankings as \"link schemes\". Sites caught using them can lose rankings, either through algorithm updates or a manual action in Search Console. Stay away from:"
      },
      {
        "type": "ul",
        "items": [
          "Buying links that pass ranking value, or selling them on your own site.",
          "Private blog networks (PBNs) and link farms built only to link out.",
          "Large-scale link exchanges (\"link to me and I'll link to you\").",
          "Automated directory and profile submissions in bulk.",
          "Keyword-stuffed anchor text across many links."
        ]
      },
      {
        "type": "tip",
        "title": "Paid placements must be labelled",
        "text": "Sponsored posts and ads are fine, but their links should carry rel=\"sponsored\" or rel=\"nofollow\" so they don't pass ranking value. Links in user-generated content should use rel=\"ugc\"."
      },
      {
        "type": "p",
        "text": "If your site already has many spammy links from past work, don't panic: Google ignores most of them. Use the disavow tool in Search Console only if you have received a manual action or know of a large paid-link campaign pointing at your site."
      },
      {
        "type": "h2",
        "text": "A safe off-page SEO plan for the next 90 days"
      },
      {
        "type": "ol",
        "items": [
          "**Claim and complete your Google Business Profile.** Add your website, services, photos and opening hours, and post updates regularly.",
          "**Ask happy clients for Google reviews.** A short, polite message with a direct review link works best.",
          "**Fix your citations.** List your business on a handful of trusted directories with the exact same name, address and phone number.",
          "**Publish one genuinely useful article a month** that answers questions your customers ask. This is what earns editorial links.",
          "**Reach out to partners and suppliers** for links and case studies.",
          "**Pitch one guest post or expert comment a month** to a relevant site with a real audience.",
          "**Track progress** in Google Search Console: links, impressions and the queries you start to rank for."
        ]
      },
      {
        "type": "p",
        "text": "Off-page SEO works best on top of strong foundations, so start with our [guide to ranking on Google](/blog/how-to-rank-website-on-google-in-pakistan). If you would rather have experts do it, our [SEO services](/services/seo) include safe, white-hat link building and monthly reports."
      }
    ],
    "faqs": [
      {
        "q": "What is the difference between on-page and off-page SEO?",
        "a": "On-page SEO is what you change on your own website, such as content, titles and speed. Off-page SEO is what happens on other websites, mainly backlinks, reviews, brand mentions and business listings."
      },
      {
        "q": "How many backlinks do I need to rank?",
        "a": "There is no fixed number. A few relevant links from trusted sites often beat hundreds of weak ones. Compare yourself with the pages that rank above you and focus on quality."
      },
      {
        "q": "Is guest posting still safe?",
        "a": "Yes, when you write genuinely useful articles for relevant sites with a real audience. Paying for guest posts on sites that publish anything for money is risky and can count as a link scheme."
      },
      {
        "q": "How long does off-page SEO take to work?",
        "a": "Usually a few months. New links and reviews build trust gradually, so most businesses see steady improvement over three to six months of consistent work."
      }
    ]
  },
  { slug: "how-to-build-shopify-store-in-pakistan-2025", title: "How to Build a Shopify Store in Pakistan", excerpt: "A step-by-step guide from choosing a plan to taking your first order with local payments and couriers.", category: "E-Commerce", date: "2026-07-10", readMinutes: 8, draft: true, body: [{ type: "p", text: "Draft." }] },
  {
    "slug": "wordpress-vs-shopify-which-is-better-for-pakistan",
    "title": "WordPress vs Shopify: Which Is Better for Your Online Store?",
    "excerpt": "Shopify is quicker to launch and easier to run; WordPress with WooCommerce is more flexible and cheaper to scale. Here's how they compare on cost, payments, SEO and growth.",
    "category": "E-Commerce",
    "date": "2026-11-20",
    "readMinutes": 9,
    "service": "shopify-development",
    "focusKeyword": "WordPress vs Shopify",
    "seoTitle": "WordPress vs Shopify: Which Is Better for Your Store?",
    "metaDescription": "WordPress vs Shopify compared on cost, ease of use, payments, SEO and growth, with clear advice on which platform suits your online store and budget.",
    "cover": "/blog/wordpress-vs-shopify-which-is-better-for-pakistan.webp",
    "coverAlt": "WordPress vs Shopify: a balance scale weighing a website layout against an online shopping cart",
    "reviewer": "ali-raza",
    "takeaways": [
      "Shopify is a hosted platform: quick to launch, easy to manage and paid for with a monthly subscription.",
      "WordPress with WooCommerce is free software you host yourself: more flexible and cheaper to scale, but it needs more maintenance.",
      "Payment options matter: check that your preferred gateways and cash on delivery work smoothly on the platform you choose.",
      "Both can rank well on Google. Speed, content and structure matter far more than the platform itself."
    ],
    "body": [
      {
        "type": "p",
        "text": "If you are planning an online store, one of the first decisions is the platform. Two names come up in almost every conversation: [Shopify](/services/shopify-development) and [WordPress](/services/wordpress-development) with its e-commerce plugin, WooCommerce. Together they power a large share of the world's online stores, and both can work very well."
      },
      {
        "type": "p",
        "text": "The right choice depends less on which one is \"better\" and more on your products, your budget, how much control you want and who will run the store day to day. This guide compares WordPress vs Shopify on the points that actually affect your business."
      },
      {
        "type": "h2",
        "text": "WordPress vs Shopify at a glance"
      },
      {
        "type": "table",
        "head": [
          "",
          "Shopify",
          "WordPress + WooCommerce"
        ],
        "rows": [
          [
            "What it is",
            "Hosted e-commerce platform (software as a service)",
            "Free, open-source software you install on your own hosting"
          ],
          [
            "Getting started",
            "Sign up, choose a theme, add products",
            "Buy hosting and a domain, install WordPress and WooCommerce"
          ],
          [
            "Running costs",
            "Monthly plan, plus paid apps and theme",
            "Hosting, domain, premium plugins and maintenance"
          ],
          [
            "Ease of use",
            "Very easy, everything in one dashboard",
            "Easy once set up, more settings to learn"
          ],
          [
            "Flexibility",
            "High within Shopify's rules",
            "Almost unlimited: you control the code and data"
          ],
          [
            "Maintenance",
            "Shopify handles hosting, security and updates",
            "You (or your developer) keep plugins, themes and backups up to date"
          ],
          [
            "Best for",
            "Product-focused stores that want to launch fast",
            "Content-rich sites, custom features and tighter budgets at scale"
          ]
        ]
      },
      {
        "type": "h2",
        "text": "What is Shopify?"
      },
      {
        "type": "p",
        "text": "Shopify is an all-in-one, hosted e-commerce platform. You pay a monthly subscription and Shopify provides the hosting, security, checkout and store dashboard. You pick a theme, add your products, connect payments and shipping, and you can be selling within days."
      },
      {
        "type": "p",
        "text": "The trade-off is control. You work inside Shopify's system: some features need paid apps, deep changes to the checkout are limited on lower plans, and moving away later takes more effort than moving a WordPress site."
      },
      {
        "type": "h2",
        "text": "What is WordPress with WooCommerce?"
      },
      {
        "type": "p",
        "text": "WordPress is the world's most popular website software. On its own it is a content management system for pages and blogs. Add the free WooCommerce plugin and it becomes a full online store with products, cart, checkout, coupons and order management."
      },
      {
        "type": "p",
        "text": "Because you host it yourself, you own everything and can customise anything. The flip side is responsibility: you choose the hosting, keep WordPress, plugins and themes updated, and take care of backups and security, or you hand that work to a developer on a maintenance plan."
      },
      {
        "type": "h2",
        "text": "Cost: what you really pay"
      },
      {
        "type": "p",
        "text": "Shopify looks simple on price because most costs are bundled into one monthly plan. Remember to add paid apps, a premium theme and any transaction fees that apply when you use third-party payment gateways instead of Shopify's own payments service."
      },
      {
        "type": "p",
        "text": "WordPress itself is free, but a professional store still has costs: good hosting, a domain, an SSL certificate, premium plugins for features such as advanced shipping or subscriptions, and regular maintenance. For a small store the yearly total is often similar to Shopify. As a store grows, WordPress usually becomes cheaper, because there is no platform subscription that rises with your plan."
      },
      {
        "type": "ul",
        "items": [
          "**Shopify running costs:** monthly plan, paid apps, theme, possible transaction fees.",
          "**WordPress running costs:** hosting, domain, premium plugins and theme, maintenance and security.",
          "**Both:** design and setup, product photography and content, marketing."
        ]
      },
      {
        "type": "p",
        "text": "Our guide on [how much a website costs](/blog/how-much-does-a-website-cost-in-pakistan) explains the build costs in more detail."
      },
      {
        "type": "h2",
        "text": "Payments and cash on delivery"
      },
      {
        "type": "p",
        "text": "Payments are where location matters most. In the UK, both platforms work smoothly with major card processors such as Stripe and PayPal, and Shopify's own payments service is available. In Pakistan, Shopify's own payments service is not available, so stores rely on cash on delivery, bank transfer and local gateways connected through apps or manual payment methods."
      },
      {
        "type": "p",
        "text": "WooCommerce has long been popular in Pakistan because many local banks and payment providers, including mobile wallets, offer WooCommerce plugins. Whichever platform you choose, confirm three things before you build: that your preferred gateway supports it, what fees apply, and how cash on delivery orders will be confirmed and tracked."
      },
      {
        "type": "tip",
        "title": "Check your courier too",
        "text": "If you ship within Pakistan, ask whether your courier offers an app or plugin for your platform. Automatic booking and tracking numbers save hours every week once orders grow."
      },
      {
        "type": "h2",
        "text": "Ease of use and day-to-day running"
      },
      {
        "type": "p",
        "text": "Shopify wins on simplicity. Adding products, processing orders and checking reports all happen in one clean dashboard, and there is nothing to update or back up. If you want to focus purely on selling and don't have technical help, that matters."
      },
      {
        "type": "p",
        "text": "WordPress is not difficult once it is set up well, and the editor is familiar to anyone who has used a blog. It does have more settings and moving parts. With a good developer looking after updates and backups, most store owners find it just as manageable."
      },
      {
        "type": "h2",
        "text": "SEO: which ranks better on Google?"
      },
      {
        "type": "p",
        "text": "Both platforms can rank well. Google does not prefer one over the other; it ranks pages that load fast, answer the searcher's question and are well structured. In practice:"
      },
      {
        "type": "ul",
        "items": [
          "**WordPress** gives you full control over URLs, page structure and content, and it is excellent for blogging, which helps you rank for informational searches.",
          "**Shopify** handles the technical basics well, but URL structures are fixed (for example /products/ and /collections/) and some SEO features need apps.",
          "On both, too many plugins or apps and heavy images slow the site down, which hurts rankings and sales."
        ]
      },
      {
        "type": "p",
        "text": "Read our [guide to ranking your website on Google](/blog/how-to-rank-website-on-google-in-pakistan) for the steps that matter on any platform, or ask us about [SEO services](/services/seo)."
      },
      {
        "type": "h2",
        "text": "Flexibility and growth"
      },
      {
        "type": "p",
        "text": "If your business needs something unusual, such as custom product builders, wholesale and retail pricing in one store, complex delivery rules or integration with your own ERP or POS, WordPress gives you more freedom because you control the code. Shopify can do a lot through its app store and, on higher plans, custom development, but you always work within its rules."
      },
      {
        "type": "p",
        "text": "For a store that mainly sells a clear product range and wants a fast, reliable checkout, Shopify's structure is a strength rather than a limit."
      },
      {
        "type": "h2",
        "text": "Which should you choose?"
      },
      {
        "type": "h3",
        "text": "Choose Shopify if"
      },
      {
        "type": "ul",
        "items": [
          "You want to launch quickly and avoid dealing with hosting and updates.",
          "You sell physical products and your payment and shipping options are supported.",
          "You prefer a predictable monthly cost and a simple dashboard for your team."
        ]
      },
      {
        "type": "h3",
        "text": "Choose WordPress with WooCommerce if"
      },
      {
        "type": "ul",
        "items": [
          "You need custom features, local payment gateways or integrations with your own systems.",
          "Content and blogging are a big part of how you plan to attract customers.",
          "You want full ownership of your site and data and lower costs as you grow."
        ]
      },
      {
        "type": "tip",
        "title": "Not sure yet?",
        "text": "Write down your must-have features, payment methods and monthly budget, then compare both platforms against that list. We are happy to do this with you for free and recommend the option that fits."
      },
      {
        "type": "p",
        "text": "At Next Vision Technologies we build stores on both platforms, so our advice is based on your needs rather than a favourite tool. See our [e-commerce solutions](/services/ecommerce-solutions) or [ask for a free quote](/contact)."
      }
    ],
    "faqs": [
      {
        "q": "Is Shopify or WordPress cheaper?",
        "a": "For a small store the yearly cost is often similar. Shopify bundles hosting into a monthly plan, while WordPress is free software with separate hosting, plugin and maintenance costs. As a store grows, WordPress usually works out cheaper."
      },
      {
        "q": "Can I move from Shopify to WordPress later?",
        "a": "Yes. Products, customers and orders can be exported and imported, but the design and some features need to be rebuilt, and old URLs must be redirected to keep your Google rankings."
      },
      {
        "q": "Which platform is better for SEO?",
        "a": "Both can rank well. WordPress gives more control over URLs and content, and is stronger for blogging. On either platform, speed, helpful content and good structure matter most."
      },
      {
        "q": "Does Shopify work in Pakistan?",
        "a": "Yes. You can run a Shopify store from Pakistan using cash on delivery, bank transfer and local payment gateways connected through apps. Shopify's own payments service is not available there, so check the fees for the gateway you choose."
      }
    ]
  },
  { slug: "best-digital-marketing-strategies-for-pakistani-businesses", title: "Digital Marketing Strategies That Work for Local Businesses", excerpt: "The channels and tactics that bring real customers, not just likes.", category: "Digital Marketing", date: "2026-07-03", readMinutes: 7, draft: true, body: [{ type: "p", text: "Draft." }] },
  { slug: "mobile-app-development-pakistan-native-vs-cross-platform", title: "Native vs Cross-Platform Mobile Apps: Which Should You Build?", excerpt: "Cost, speed and performance compared to help you choose the right approach.", category: "Mobile Apps", date: "2026-06-28", readMinutes: 7, draft: true, body: [{ type: "p", text: "Draft." }] },
  { slug: "how-to-choose-web-development-agency-in-pakistan", title: "How to Choose the Right Web Development Agency", excerpt: "A checklist of questions to ask before you sign with any agency.", category: "Business Tips", date: "2026-06-20", readMinutes: 6, draft: true, body: [{ type: "p", text: "Draft." }] },
  { slug: "website-security-essentials-pakistani-businesses", title: "Website Security Essentials Every Business Should Know", excerpt: "Simple steps that protect your site, your customers and your reputation.", category: "Security", date: "2026-06-16", readMinutes: 6, draft: true, body: [{ type: "p", text: "Draft." }] },
  { slug: "software-house-in-lahore-pakistan", title: "Choosing a Software House in Lahore: A Guide for Businesses", excerpt: "What Lahore's software houses offer, what they cost, and how to pick the right partner.", category: "Business Tips", date: "2026-07-15", readMinutes: 8, draft: true, body: [{ type: "p", text: "Draft." }] },
];

/** Published posts only */
export const posts = allPosts.filter((p) => !p.draft);
export const draftSlugs = allPosts.filter((p) => p.draft).map((p) => p.slug);

/** Cover image for a post (16:9, 3840x2160): the post's `cover`, otherwise /public/blog/<slug>.webp */
export const postImage = (slug: string) => allPosts.find((p) => p.slug === slug)?.cover ?? `/blog/${slug}.webp`;

export const sortedPosts = () => [...posts].sort((a, b) => b.date.localeCompare(a.date));
export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

/** The writer and the subject expert who reviewed the post */
export const postAuthor = (p: Post) => getPerson(p.author ?? DEFAULT_AUTHOR)!;
export const postReviewer = (p: Post) => getPerson(p.reviewer ?? reviewerByCategory[p.category]);
