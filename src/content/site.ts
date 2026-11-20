// Central business details. Replace every value marked TODO before launch.
export const site = {
  name: "Next Vision Technologies",
  shortName: "Next Vision",
  tagline: "A.I • SaaS • Website • Marketing",
  copyrightYear: 2026, // static so pages stay fully prerendered; bump each January
  description:
    "Next Vision Technologies builds AI automation, SaaS products, websites and digital marketing campaigns that help businesses grow.",
  url: "https://www.nextvision-technologies.com", // primary domain (the bare domain redirects here)
  gtmId: "GTM-PM9BTDMZ", // Google Tag Manager container (analytics and marketing tags are managed inside GTM)
  email: "info@nextvision-technologies.com",
  phones: [
    { label: "Pakistan", value: "+92 300 3209005", href: "tel:+923003209005", whatsapp: false },
    { label: "United Kingdom", value: "+44 7448 091908", href: "https://wa.me/447448091908", whatsapp: true }, // UK number is WhatsApp only
  ],
  whatsapp: "923003209005", // WhatsApp number, international format, digits only
  offices: [
    { label: "Pakistan Office", address: "28 Davis Road, Lahore, Punjab, Pakistan" }, // registered office (SECP/FBR documents)
    { label: "UK Office", address: "United Kingdom" }, // TODO: add street address
  ],
  socials: {
    facebook: "https://www.facebook.com/nextvisiontechnologies",
    instagram: "https://www.instagram.com/nextvisiontechnologies/",
    linkedin: "", // add the LinkedIn page URL here to show the icon
    youtube: "https://www.youtube.com/@nextvision-technologies",
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
