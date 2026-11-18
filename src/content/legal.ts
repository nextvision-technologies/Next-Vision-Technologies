// Legal pages. TODO: have these reviewed by a lawyer before launch. They are starting drafts, not legal advice.
export type LegalPage = { slug: string; title: string; sections: { heading: string; text: string }[] };

const updated = "16 November 2026";
export const legalUpdated = updated;

export const legalPages: LegalPage[] = [
  {
    slug: "terms", title: "Terms & Conditions",
    sections: [
      { heading: "Agreement", text: "By using this website or our services you agree to these terms. Project-specific terms are set out in each signed proposal." },
      { heading: "Payments", text: "Invoices are payable as stated in your proposal. Work may pause on overdue accounts." },
      { heading: "Ownership", text: "On full payment, you own the final deliverables created for you, excluding third-party licences." },
      { heading: "Liability", text: "Our liability is limited to the fees paid for the service in question." },
    ],
  },
  {
    slug: "privacy-policy", title: "Privacy Policy",
    sections: [
      { heading: "What we collect", text: "Contact details you send through forms, WhatsApp or email, and anonymous analytics about website use." },
      { heading: "How we use it", text: "To reply to enquiries, deliver services and improve our website. We do not sell personal data." },
      { heading: "Your choices", text: "You can ask us to access, correct or delete your data at any time." },
    ],
  },
  {
    slug: "refund-policy", title: "Refund Policy",
    sections: [
      { heading: "Project deposits", text: "Deposits secure your project slot and cover discovery work, and are non-refundable once work begins." },
      { heading: "Monthly packages", text: "Monthly plans can be cancelled with 30 days' notice. Paid months are not refunded." },
      { heading: "Disputes", text: "Contact us first and we will work to resolve any issue fairly." },
    ],
  },
  {
    slug: "gdpr", title: "GDPR & Your Rights",
    sections: [
      { heading: "Your rights", text: "If you are in the UK or EU you have the right to access, correct, erase, restrict and port your personal data, and to object to processing." },
      { heading: "Lawful basis", text: "We process data to fulfil contracts, meet legal duties, and for legitimate business interests such as replying to enquiries." },
      { heading: "Contact", text: "Send data requests to our email address and we will respond within one month." },
    ],
  },
  {
    slug: "security", title: "Security",
    sections: [
      { heading: "Our approach", text: "We use encrypted connections, access controls, regular updates and off-site backups across the systems we build and host." },
      { heading: "Reporting issues", text: "If you find a security issue, please email us. We investigate every report." },
    ],
  },
  {
    slug: "cookie-policy", title: "Cookie Policy",
    sections: [
      { heading: "What cookies we use", text: "Essential cookies to run the site and analytics cookies to understand how it is used." },
      { heading: "Managing cookies", text: "You can block or delete cookies in your browser settings." },
    ],
  },
];

export const getLegal = (slug: string) => legalPages.find((p) => p.slug === slug)!;
