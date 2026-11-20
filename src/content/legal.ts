// Legal pages. Inline links use [text](/path) and **bold** (rendered by components/article/ArticleBlocks).
// Written for Next Vision Technologies' own services. Have a qualified lawyer review before relying on them.
import type { LegalPage } from "@/types/content";
import { emailBodies, emailLink, site } from "./site";

export const legalUpdated = "18 November 2026";
// Follows the email in site.ts; opens the email app with a subject and template
const CONTACT = `[${site.email}](${emailLink("Privacy or policy question - Next Vision Technologies", emailBodies.question)})`;

export const legalPages: LegalPage[] = [
  // ------------------------------------------------------------------ Terms
  {
    slug: "terms",
    title: "Terms & Conditions",
    summary: "These terms explain how we work with you: how projects are agreed, paid for, delivered and supported, and what each side is responsible for. Your signed proposal sets out the details of your specific project.",
    sections: [
      { heading: "About these terms", body: [
        { type: "p", text: "These Terms & Conditions apply to this website and to every service provided by **Next Vision Technologies** (\"we\", \"us\", \"our\"), including [AI automation](/services/ai-automation), [web development](/services/web-development), [mobile apps](/services/mobile-app-development), [SEO](/services/seo), [digital marketing](/services/digital-marketing) and related work." },
        { type: "p", text: "By using our website, requesting a quote or signing a proposal, you (\"the client\") agree to these terms. If a signed proposal or contract says something different, the signed document takes priority for that project." },
      ] },
      { heading: "Quotes and proposals", body: [
        { type: "ul", items: [
          "Every project starts with a written proposal describing the scope, deliverables, timeline and price.",
          "Quotes are valid for 30 days from the date they are issued unless stated otherwise.",
          "Work begins once the proposal is accepted in writing (email or WhatsApp is enough) and any agreed deposit is received.",
          "Anything not listed in the proposal is outside the scope and will be quoted separately before we start it.",
        ] },
      ] },
      { heading: "Payments", body: [
        { type: "p", text: "Fixed-price projects are normally invoiced as a deposit at the start and the balance in milestones or on completion, as set out in your proposal. [Monthly packages](/pricing) are billed in advance at the start of each month." },
        { type: "ul", items: [
          "Invoices are payable within 7 days unless your proposal says otherwise.",
          "Prices are shown in the currency on your invoice. Bank and transfer charges are paid by the client.",
          "If a payment is more than 14 days late we may pause work until the account is up to date. Deadlines move by the length of the pause.",
          "Third-party costs such as domains, hosting, premium plugins, software licences and advertising spend are paid by the client unless your plan includes them.",
        ] },
      ] },
      { heading: "Your responsibilities", body: [
        { type: "p", text: "Good projects depend on both sides. To keep your project on time, we ask that you:" },
        { type: "ul", items: [
          "Provide content, logins, brand assets and feedback within the timeframes agreed.",
          "Make sure you have the right to use any text, images, logos or data you give us.",
          "Name one person who can approve work and make decisions.",
          "Check deliverables and report any problems within 10 working days of delivery.",
        ] },
      ] },
      { heading: "Changes and revisions", body: [
        { type: "p", text: "Your proposal states how many rounds of revisions are included. Requests that go beyond the agreed scope are treated as change requests: we will tell you the extra cost and any effect on the timeline, and only proceed with your approval." },
      ] },
      { heading: "Delivery and acceptance", body: [
        { type: "p", text: "We will share previews as work progresses. When a milestone is delivered you have 10 working days to request fixes for anything that does not match the agreed scope. If we do not hear from you within that time, the milestone is treated as accepted." },
      ] },
      { heading: "Ownership and intellectual property", body: [
        { type: "ul", items: [
          "Once your project is paid in full, you own the final designs, code and content we created specifically for you.",
          "Third-party items (fonts, themes, plugins, stock images, AI models, platforms) remain under their own licences, which we will pass on where possible.",
          "We keep ownership of our general tools, code libraries, methods and know-how, and you receive a permanent licence to use any of them included in your project.",
          "Unless you ask us not to, we may show completed work in our [Projects Gallery](/projects) and marketing.",
        ] },
      ] },
      { heading: "Confidentiality", body: [
        { type: "p", text: "Both sides agree to keep the other's confidential business information private and to use it only for the project. This continues after the project ends. We are happy to sign a separate non-disclosure agreement on request." },
      ] },
      { heading: "AI, marketing and results", body: [
        { type: "p", text: "We use proven methods and work hard to achieve your goals, but search rankings, advertising performance and AI outputs depend on factors outside our control, such as search engine updates, platform policies and market competition. For this reason we do not guarantee specific rankings, sales or results unless your proposal states a specific guarantee." },
        { type: "tip", title: "Reviewing AI output", text: "AI chatbots and automations can occasionally produce inaccurate answers. We build in safeguards and human hand-over, but you remain responsible for reviewing how AI tools are used in your business." },
      ] },
      { heading: "Support, hosting and maintenance", body: [
        { type: "p", text: "Each project includes the support period stated in your proposal. Ongoing updates, backups, monitoring and changes are available through a maintenance plan or our [monthly packages](/pricing). Where we manage hosting for you, we will take reasonable steps to keep your website secure and available, as described on our [Security](/security) page." },
      ] },
      { heading: "Cancellation", body: [
        { type: "p", text: "Either side may end a project with written notice. You will pay for work completed up to that date and any costs we have already committed to. Deposits and monthly fees are handled as described in our [Refund Policy](/refund-policy)." },
      ] },
      { heading: "Limitation of liability", body: [
        { type: "p", text: "To the extent the law allows, our total liability for any claim connected with a project is limited to the amount you paid us for that project (or, for monthly services, the fees paid in the previous three months). We are not liable for indirect losses such as lost profits, lost data or business interruption. Nothing in these terms limits liability that cannot be limited by law." },
      ] },
      { heading: "Governing law", body: [
        { type: "p", text: "For clients based in Pakistan, these terms are governed by the laws of Pakistan and the courts of Lahore. For clients based in the United Kingdom, they are governed by the laws of England and Wales and its courts. We will always try to resolve any disagreement informally first." },
      ] },
      { heading: "Contact", body: [
        { type: "p", text: `Questions about these terms? Email ${CONTACT} or use our [contact page](/contact).` },
      ] },
    ],
  },

  // ------------------------------------------------------------------ Privacy
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    summary: "We collect only the information we need to reply to you, deliver our services and improve our website. We never sell your personal data. This page explains what we collect, why, who we share it with and the choices you have.",
    sections: [
      { heading: "Who we are", body: [
        { type: "p", text: `**Next Vision Technologies** is responsible for the personal data described in this policy. We operate from Pakistan and the United Kingdom. You can contact us about privacy at any time at ${CONTACT}.` },
      ] },
      { heading: "Information we collect", body: [
        { type: "h3", text: "Information you give us" },
        { type: "ul", items: [
          "Contact details such as your name, phone or WhatsApp number and email address, when you fill in a [quote form](/contact), [book a demo](/book-demo) or message us.",
          "Details about your business and project that you choose to share.",
          "Billing information needed to issue invoices.",
          "Your CV and application details if you apply for a [job](/jobs).",
        ] },
        { type: "h3", text: "Information collected automatically" },
        { type: "ul", items: [
          "Basic technical data such as browser type, device, approximate location and pages visited, through analytics tools.",
          "Cookies and similar technologies, as explained in our [Cookie Policy](/cookie-policy).",
        ] },
      ] },
      { heading: "How we use your information", body: [
        { type: "ul", items: [
          "To reply to enquiries and prepare quotes.",
          "To deliver, support and invoice the services you buy.",
          "To send updates about your project and, if you agree, occasional news about our services.",
          "To understand how our website is used so we can improve it.",
          "To meet legal, tax and accounting obligations.",
          "To protect our website and clients from fraud and misuse.",
        ] },
      ] },
      { heading: "Legal basis for processing", body: [
        { type: "p", text: "For visitors in the UK and EU, we rely on these lawful bases under the UK GDPR and EU GDPR:" },
        { type: "ul", items: [
          "**Contract:** to provide services you have requested or agreed to.",
          "**Legitimate interests:** to reply to enquiries, run and improve our business and keep our systems secure.",
          "**Consent:** for marketing emails and non-essential cookies. You can withdraw consent at any time.",
          "**Legal obligation:** to keep financial and tax records.",
        ] },
      ] },
      { heading: "Who we share data with", body: [
        { type: "p", text: "We never sell your personal data. We share it only with trusted providers who help us run our business, under agreements that require them to protect it:" },
        { type: "ul", items: [
          "Hosting, email and cloud storage providers.",
          "Communication tools such as WhatsApp Business.",
          "Analytics providers, in line with your cookie choices.",
          "Accountants, payment processors and professional advisers.",
          "Authorities, where the law requires it.",
        ] },
      ] },
      { heading: "Data you share with us during projects", body: [
        { type: "p", text: "When we build systems for you, such as a [CRM](/services/crm-development) or an [AI chatbot](/services/ai-chatbot-development), we may handle your customers' data on your behalf. In that case you are the data controller and we act as your processor: we use that data only to deliver the service, under your instructions." },
      ] },
      { heading: "International transfers", body: [
        { type: "p", text: "Because we work across Pakistan, the UK and with global cloud providers, your data may be processed outside your country. Where data leaves the UK or EU, we use recognised safeguards such as standard contractual clauses." },
      ] },
      { heading: "How long we keep data", body: [
        { type: "ul", items: [
          "Enquiries that don't become projects: up to 24 months.",
          "Client project and billing records: up to 6 years, for legal and tax reasons.",
          "Job applications: up to 12 months, unless you ask us to delete them sooner.",
        ] },
      ] },
      { heading: "Keeping your data secure", body: [
        { type: "p", text: "We use encrypted connections, access controls, two-factor authentication and regular backups to protect your information. Read more on our [Security](/security) page." },
      ] },
      { heading: "Your rights", body: [
        { type: "p", text: "You can ask to access, correct or delete your personal data, or to stop receiving marketing, at any time. Visitors in the UK and EU have additional rights, explained on our [GDPR & Your Rights](/gdpr) page." },
      ] },
      { heading: "Changes to this policy", body: [
        { type: "p", text: "We may update this policy from time to time. The date at the top of the page shows when it last changed. Significant changes will be highlighted on our website." },
      ] },
    ],
  },

  // ------------------------------------------------------------------ Refund
  {
    slug: "refund-policy",
    title: "Refund Policy",
    summary: "We want every client to be happy with our work. This policy explains how deposits, milestone payments, monthly packages and cancellations work, and how to ask for a refund if something goes wrong.",
    sections: [
      { heading: "Our approach", body: [
        { type: "p", text: "Because our services involve time and expertise spent on your project from day one, refunds depend on how much work has been completed. If you are unhappy, please [talk to us](/contact) first: most issues can be fixed quickly." },
      ] },
      { heading: "Project deposits", body: [
        { type: "ul", items: [
          "Deposits reserve your place in our schedule and cover discovery, planning and early design work.",
          "If you cancel **before any work has started**, we refund the deposit minus any third-party costs already paid on your behalf.",
          "Once work has started, deposits are non-refundable.",
        ] },
      ] },
      { heading: "Milestone payments", body: [
        { type: "p", text: "Payments for milestones that have been delivered and accepted are non-refundable. If we have not delivered a milestone that you have already paid for, you can choose between a full refund for that milestone or a revised delivery date." },
      ] },
      { heading: "Monthly packages", body: [
        { type: "ul", items: [
          "[Monthly packages](/pricing) can be cancelled with 30 days' written notice.",
          "Fees already paid for the current month are not refunded, and the service continues until the end of the paid period.",
          "Advertising spend paid directly to Meta, Google or other platforms is controlled by those platforms and cannot be refunded by us.",
        ] },
      ] },
      { heading: "Courses", body: [
        { type: "p", text: "You can request a full refund for a [course](/courses) within 7 days of enrolling, provided you have attended no more than one session. After that, fees are non-refundable, but you may transfer to a later batch once." },
      ] },
      { heading: "Third-party costs", body: [
        { type: "p", text: "Domains, hosting, software licences, premium plugins and other services bought on your behalf are paid to third parties and are not refundable by us. Where possible, we will transfer them into your name." },
      ] },
      { heading: "When we will always refund", body: [
        { type: "ul", items: [
          "If we cancel your project for reasons that are not caused by you.",
          "If you have been charged twice or charged the wrong amount by mistake.",
          "If we have failed to deliver the agreed service and cannot put it right within a reasonable time.",
        ] },
      ] },
      { heading: "How to request a refund", body: [
        { type: "ol", items: [
          `Email ${CONTACT} with your name, invoice number and the reason for your request.`,
          "We will acknowledge your request within 2 working days.",
          "We will review it and reply with a decision within 10 working days.",
          "Approved refunds are paid using the original payment method within 14 days.",
        ] },
      ] },
      { heading: "Your statutory rights", body: [
        { type: "p", text: "This policy does not affect any rights you have under the consumer protection laws that apply to you." },
      ] },
    ],
  },

  // ------------------------------------------------------------------ GDPR
  {
    slug: "gdpr",
    title: "GDPR & Your Rights",
    summary: "If you are in the United Kingdom or the European Union, data protection law gives you strong rights over your personal data. This page explains each right in plain language and how to use it with us.",
    sections: [
      { heading: "Our commitment", body: [
        { type: "p", text: "Next Vision Technologies follows the UK General Data Protection Regulation (UK GDPR), the Data Protection Act 2018 and, where it applies, the EU GDPR. We apply the same care to every client, wherever they are. Full details of what we collect are in our [Privacy Policy](/privacy-policy)." },
      ] },
      { heading: "Your rights", body: [
        { type: "ul", items: [
          "**Right to be informed:** to know what data we collect and why. That's what our [Privacy Policy](/privacy-policy) is for.",
          "**Right of access:** to receive a copy of the personal data we hold about you.",
          "**Right to rectification:** to have inaccurate or incomplete data corrected.",
          "**Right to erasure:** to ask us to delete your data where there is no good reason to keep it.",
          "**Right to restrict processing:** to ask us to pause using your data while a concern is checked.",
          "**Right to data portability:** to receive your data in a common, machine-readable format, or have it sent to another provider.",
          "**Right to object:** to object to processing based on legitimate interests, and to stop direct marketing at any time.",
          "**Rights related to automated decisions:** to ask for a human review of any decision made only by automated means that significantly affects you.",
        ] },
      ] },
      { heading: "How to make a request", body: [
        { type: "ol", items: [
          `Email ${CONTACT} with the subject "Data request" and tell us which right you would like to use.`,
          "We may ask you to confirm your identity, to protect your data from anyone pretending to be you.",
          "We will respond within one month. For complex requests we may extend this by up to two further months and will tell you why.",
        ] },
        { type: "tip", title: "No charge", text: "Making a request is free. We only charge a reasonable fee if a request is clearly unfounded, excessive or repeated." },
      ] },
      { heading: "AI and automated processing", body: [
        { type: "p", text: "When we build [AI automation](/services/ai-automation) or [chatbots](/services/ai-chatbot-development) for clients, we design them to send only the data a task needs, keep human oversight for important decisions, and respect each client's own GDPR obligations." },
      ] },
      { heading: "Data breaches", body: [
        { type: "p", text: "If a personal data breach is likely to put your rights at risk, we will notify the Information Commissioner's Office (ICO) within 72 hours where required, and tell you without undue delay if there is a high risk to you." },
      ] },
      { heading: "Complaints", body: [
        { type: "p", text: "If you are unhappy with how we have handled your data, please contact us first so we can put it right. You also have the right to complain to the UK Information Commissioner's Office (ico.org.uk) or to the data protection authority in your EU country." },
      ] },
    ],
  },

  // ------------------------------------------------------------------ Security
  {
    slug: "security",
    title: "Security",
    summary: "Security is built into how we design, build and host every project. This page summarises the measures we take to protect your website, logins and data, and how to report a security concern.",
    sections: [
      { heading: "Our approach", body: [
        { type: "p", text: "We follow a security-by-design approach: every [website](/services/web-development), [app](/services/mobile-app-development) and [software project](/services/custom-software-development) is planned with security in mind from the first day, not added at the end." },
      ] },
      { heading: "How we protect your projects", body: [
        { type: "ul", items: [
          "HTTPS encryption on every website we build and host.",
          "Secure hosting with firewalls, DDoS protection and automatic updates.",
          "Daily or weekly backups, stored separately from the live site.",
          "Strong password rules and two-factor authentication for admin accounts.",
          "Least-privilege access: team members only get the access their role needs.",
          "Code reviews and dependency updates to remove known vulnerabilities.",
          "Input validation and protection against common attacks such as SQL injection and cross-site scripting.",
        ] },
      ] },
      { heading: "Protecting your data", body: [
        { type: "p", text: "Client logins and credentials are stored in an encrypted password manager, never in plain text or chat messages. Personal data is handled as described in our [Privacy Policy](/privacy-policy)." },
      ] },
      { heading: "AI and third-party tools", body: [
        { type: "p", text: "When we use AI providers or third-party services, we choose reputable platforms, send only the data a task requires and configure them so your data is not used to train public models where that option is available." },
      ] },
      { heading: "What you can do", body: [
        { type: "ul", items: [
          "Use a unique, strong password for your website and turn on two-factor login.",
          "Never share login details over unencrypted email or public chats.",
          "Tell us immediately if a team member with access leaves your company.",
          "Keep a [maintenance plan](/pricing) active so updates and backups continue.",
        ] },
        { type: "p", text: "For more tips, read our guide on [website security essentials](/blog) on the blog." },
      ] },
      { heading: "Reporting a vulnerability", body: [
        { type: "p", text: `If you believe you have found a security issue on our website or a project we built, please email ${CONTACT} with the subject "Security". Include as much detail as you can. Please do not publicly disclose the issue until we have had a chance to fix it. We investigate every report and will keep you updated.` },
      ] },
      { heading: "Incident response", body: [
        { type: "p", text: "If a security incident affects a client project, we act quickly to contain it, restore services from clean backups, inform affected clients and, where required, the relevant authorities." },
      ] },
    ],
  },

  // ------------------------------------------------------------------ Cookies
  {
    slug: "cookie-policy",
    title: "Cookie Policy",
    summary: "Cookies are small text files that help our website work and help us understand how it is used. This page explains which cookies we use, why, and how you can control them.",
    sections: [
      { heading: "What cookies are", body: [
        { type: "p", text: "Cookies are small files saved on your device when you visit a website. They let the site remember things like your preferences, and help website owners understand how visitors use their pages. Similar technologies, such as local storage and pixels, are covered by this policy too." },
      ] },
      { heading: "Cookies we use", body: [
        { type: "table", head: ["Type", "Purpose", "Can you turn it off?"], rows: [
          ["Essential", "Make the website work, keep it secure and remember form progress", "No, the site needs them"],
          ["Analytics", "Show us which pages are popular so we can improve the site", "Yes"],
          ["Marketing", "Measure our ad campaigns and show relevant ads on other platforms", "Yes"],
          ["Third-party embeds", "Set by services such as WhatsApp or YouTube when you use them", "Yes, through those services"],
        ] },
      ] },
      { heading: "Third-party cookies", body: [
        { type: "p", text: "Some cookies are set by other companies, such as analytics or advertising platforms. Those companies are responsible for their own cookies, and their privacy policies explain how they use the data." },
      ] },
      { heading: "How long cookies last", body: [
        { type: "ul", items: [
          "**Session cookies** are deleted when you close your browser.",
          "**Persistent cookies** stay for a set period, usually between a few days and 24 months, unless you delete them.",
        ] },
      ] },
      { heading: "Managing your cookies", body: [
        { type: "p", text: "You can block or delete cookies at any time in your browser settings. Most browsers also let you block third-party cookies only. Blocking essential cookies may stop parts of our website, such as forms, from working properly." },
      ] },
      { heading: "More information", body: [
        { type: "p", text: "To learn how we handle personal data collected through cookies, read our [Privacy Policy](/privacy-policy) and [GDPR & Your Rights](/gdpr) pages." },
      ] },
    ],
  },
];

export const getLegal = (slug: string) => legalPages.find((p) => p.slug === slug)!;
