// Central business details. Replace every value marked TODO before launch.
export const site = {
  name: "Next Vision Technologies",
  shortName: "Next Vision",
  tagline: "A.I • SaaS • Website • Marketing",
  copyrightYear: 2026, // static so pages stay fully prerendered; bump each January
  description:
    "Next Vision Technologies builds AI automation, SaaS products, websites and digital marketing campaigns that help businesses grow.",
  url: "https://nextvision-technologies.com", // domain taken from the company email; confirm before launch
  email: "info@nextvision-technologies.com",
  phones: [
    { label: "Pakistan", value: "+92 300 3209005", href: "tel:+923003209005" },
    { label: "United Kingdom", value: "+44 7448 091908", href: "tel:+447448091908" },
  ],
  whatsapp: "923003209005", // WhatsApp number, international format, digits only
  offices: [
    { label: "Pakistan Office", address: "Lahore, Pakistan" }, // TODO: add street address
    { label: "UK Office", address: "United Kingdom" }, // TODO: add street address
  ],
  socials: {
    facebook: "https://facebook.com/", // TODO
    instagram: "https://instagram.com/", // TODO
    linkedin: "https://linkedin.com/", // TODO
  },
  stats: [
    { value: "100+", label: "Projects delivered" },
    { value: "50+", label: "Happy clients" },
    { value: "5+", label: "Years of experience" },
    { value: "24h", label: "Quote turnaround" },
  ],
} as const;

export const whatsappLink = (text = "Hi Next Vision, I'd like to discuss a project.") =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
