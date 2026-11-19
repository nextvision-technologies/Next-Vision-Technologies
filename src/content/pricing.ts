// Monthly growth packages shown on /pricing and the home page.
import type { Package } from "@/types/content";

// Monthly growth packages. `was` is the regular price shown struck through.
// TODO: confirm the regular (`was`) prices; only show a discount you actually offer.

export const packages: Package[] = [
  {
    name: "Silver Plan", icon: "medal", tag: "Starter",
    summary: "Everything a small business needs to get online and start growing.",
    price: 249, was: 349, currency: "$",
    groups: [
      { title: "Website", items: [{ text: "Business website, up to 5 pages" }, { text: "Mobile responsive design" }, { text: "WhatsApp button & contact form" }] },
      { title: "SEO", items: [{ text: "On-page SEO for up to 5 pages" }, { text: "Up to 10 SEO keywords tracked" }, { text: "Meta titles & descriptions setup" }] },
      { title: "Marketing", items: [{ text: "Google Business Profile setup" }, { text: "8 social media posts / month" }, { text: "Paid ads management", included: false }] },
      { title: "AI & Automation", items: [{ text: "AI chatbot & automation", included: false }] },
    ],
  },
  {
    name: "Gold Plan", icon: "crown", tag: "Most popular", featured: true,
    summary: "Website, SEO, ads and an AI chatbot, built to generate leads.",
    price: 449, was: 649, currency: "$",
    groups: [
      { title: "Website", items: [{ text: "Business website, up to 10 pages" }, { text: "Blog / CMS for easy updates" }, { text: "Speed & performance optimisation" }] },
      { title: "SEO", items: [{ text: "Up to 20 SEO keywords tracked" }, { text: "URL structure & technical review" }, { text: "Local directory submissions" }] },
      { title: "Marketing", items: [{ text: "16 social media posts / month" }, { text: "Meta or Google Ads management" }] },
      { title: "AI & Automation", items: [{ text: "AI website chatbot for FAQs & leads" }, { text: "CRM & workflow automation", included: false }] },
    ],
  },
  {
    name: "Platinum Plan", icon: "gem", tag: "Best value",
    summary: "A complete digital growth engine with advanced AI automation.",
    price: 849, was: 1199, currency: "$",
    groups: [
      { title: "Website", items: [{ text: "Website or e-commerce store, up to 40 pages" }, { text: "Custom features & integrations" }] },
      { title: "SEO", items: [{ text: "Up to 50 SEO keywords tracked" }, { text: "Competitor & keyword gap analysis" }, { text: "Internal linking & content optimisation" }] },
      { title: "Marketing", items: [{ text: "Full social media management" }, { text: "Meta + Google Ads with A/B testing" }] },
      { title: "AI & Automation", items: [{ text: "AI chatbot + WhatsApp automation" }, { text: "CRM integration & lead automation" }, { text: "Dedicated account manager & priority support" }] },
    ],
  },
];
