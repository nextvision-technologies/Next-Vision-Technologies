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
  email: "nextvisiontechnologies.pvt.ltd@gmail.com", // temporary; switch to the business domain email (info@nextvision-technologies.com) once it is set up
  phones: [
    { label: "Pakistan", value: "+92 300 3209005", href: "tel:+923003209005", whatsapp: false },
    { label: "United Kingdom", value: "+44 7448 091908", href: "https://wa.me/447448091908", whatsapp: true }, // UK number is WhatsApp only
  ],
  whatsapp: "923003209005", // WhatsApp number, international format, digits only
  offices: [
    { label: "Pakistan Office", address: "28 Davis Road, Lahore, Punjab, Pakistan" }, // registered office (SECP/FBR documents)
    { label: "UK Office", address: "United Kingdom" }, // TODO: add street address
  ],
  // Google Business Profile, shown as a map in the footer (no API key needed).
  // `kgmid` is the listing's Google Knowledge Graph ID: with `mapName` it pins only our listing and opens its info card.
  // (A name-only search also pins the similarly named "Nextech Vision" listing nearby.)
  google: {
    profileUrl: "https://share.google/EVQmjR9jFzx2MvSQc",
    mapName: "Next Vision Technologies Pvt. Ltd.",
    kgmid: "/g/11_1lpfmmp",
    directionsQuery: "Next Vision Technologies Pvt. Ltd., 28 Davis Road, Garhi Shahu, Lahore 54000",
  },
  socials: {
    facebook: "https://www.facebook.com/nextvisiontechnologies",
    instagram: "https://www.instagram.com/nextvisiontechnologies/",
    linkedin: "https://www.linkedin.com/company/next-vision-technologies-pvt-ltd/",
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

/** Ready-to-send email bodies, so enquiries arrive with the details we need */
export const emailBodies = {
  project: [
    "Hi Next Vision Technologies team,", "", "I'd like to discuss a project.", "",
    "Name:", "Company:", "Phone / WhatsApp:", "Service needed:", "", "Project details:", "", "", "Thank you",
  ].join("\n"),
  question: ["Hi Next Vision Technologies team,", "", "My question:", "", "", "Name:", "Phone / WhatsApp:"].join("\n"),
  verification: [
    "Hi Next Vision Technologies team,", "", "Someone contacted me in your name. Please confirm if this is genuine.", "",
    "Who contacted me (name / number / email):", "What they asked for:", "", "My name:", "Phone / WhatsApp:",
  ].join("\n"),
  job: (title: string, location: string) => [
    "Hi Next Vision Technologies team,", "", `I'd like to apply for the ${title} role (${location}). My CV is attached.`, "",
    "Name:", "Phone / WhatsApp:", "Current city:", "Years of experience:", "LinkedIn / portfolio:", "", "Thank you",
  ].join("\n"),
};

/** mailto: link that opens the visitor's email app with our address, a subject and a template filled in */
export const emailLink = (subject = "Project enquiry - Next Vision Technologies", body: string = emailBodies.project) =>
  `mailto:${site.email}?subject=${mailEncode(subject)}&body=${mailEncode(body)}`;

/** encodeURIComponent leaves ' ( ) unescaped; some email apps and our [text](link) parser need them encoded */
const mailEncode = (text: string) => encodeURIComponent(text).replace(/['()]/g, (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`);
