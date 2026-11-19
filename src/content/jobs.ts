// Open roles shown on /jobs and /jobs/[slug].
import type { Job } from "@/types/content";

export const jobs: Job[] = [
  {
    slug: "senior-sales-closer", title: "Senior Sales Closer", type: "Full-time", location: "Lahore / Remote",
    summary: "Close qualified deals for our AI, software and marketing services.",
    responsibilities: ["Run discovery and proposal calls", "Close inbound and outbound leads", "Keep the CRM up to date", "Work with delivery teams on scope"],
    requirements: ["3+ years in B2B sales", "Excellent spoken English", "Experience selling IT or agency services"],
  },
  {
    slug: "calling-agent", title: "Calling Agent", type: "Full-time", location: "Lahore",
    summary: "Make first contact with prospects and book meetings for the sales team.",
    responsibilities: ["Call and follow up with leads", "Qualify prospects with a script", "Book meetings in the calendar"],
    requirements: ["Clear communication in English and Urdu", "Comfort with targets", "Basic computer skills"],
  },
];
export const getJob = (slug: string) => jobs.find((j) => j.slug === slug);
