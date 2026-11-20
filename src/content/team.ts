// Leadership team shown on /team and the about page.
import type { TeamMember } from "@/types/content";
import { site } from "./site";

// Leadership team. Photos live in /public/team. Add profile URLs to show social icons (empty = hidden).
export const team: TeamMember[] = [
  {
    name: "Muhammad Ahsan Khan", role: "Director & Owner", photo: "/team/muhammad-ahsan-khan.webp",
    specialty: "Business Strategy & Growth",
    education: "BBA, FAST University",
    bio: "Ahsan sets the direction of Next Vision Technologies and makes sure every service we offer, from websites and software to AI automation and digital marketing, is tied to clear business goals. With his business management background, he guides client partnerships, project planning and growth strategy, so clients get solutions that deliver measurable returns, not just technology.",
    socials: {
      facebook: "https://www.facebook.com/MAK.muhammadahsan/",
      instagram: "https://www.instagram.com/muhammad.ahsan.khan/",
      linkedin: "https://www.linkedin.com/in/muhammadahsankhan/",
    },
  },
  {
    name: "Ali Raza", role: "CEO & Founder", photo: "/team/ali-raza.webp",
    specialty: "Senior Software Engineer",
    education: "BSCS, Virtual University of Pakistan",
    experience: "3+ years in software & web development",
    bio: "Ali is a senior software engineer with over three years of experience building websites, web applications and custom software. He works across the full stack with modern frameworks such as React, Next.js and Node.js, and focuses on clean architecture, fast performance and reliable delivery, turning client requirements into scalable products that are built to last.",
    socials: {
      facebook: "https://www.facebook.com/aliraza.software.eng/",
      instagram: "https://www.instagram.com/aliraza.software.eng/",
      linkedin: "https://www.linkedin.com/in/aliraza-software-eng/",
      youtube: site.socials.youtube, // company YouTube channel
    },
  },
  {
    name: "Babar Ali", role: "COO & Head of Sales", photo: "/team/babar-ali.webp",
    specialty: "SEO Expert",
    education: "BBIS, University of Management and Technology (UMT)",
    experience: "3+ years in SEO",
    bio: "Babar is an SEO specialist with three years of experience helping businesses grow their organic visibility on Google. His work covers technical SEO audits, keyword research, on-page optimization, content strategy, local SEO and link building. He combines data-driven analysis with a clear understanding of business goals, so rankings turn into qualified traffic, leads and sales.",
    socials: {
      facebook: "https://www.facebook.com/abid.ali.abid.ali.369447",
      instagram: "https://www.instagram.com/babar_ali__45/",
      linkedin: "https://www.linkedin.com/in/babaraliseowordpress/",
    },
  },
  {
    name: "Ehtisham Malik", role: "Chief Technology Officer (CTO)", photo: "/team/ehtisham-malik.webp",
    specialty: "AI Engineer",
    education: "Virtual University of Pakistan",
    experience: "2+ years in AI & backend development",
    bio: "Ehtisham is an AI engineer with two years of experience building AI-powered software and backend systems. He develops intelligent chatbots, workflow automations and LLM integrations, and designs the secure APIs, databases and server-side logic behind them, delivering AI solutions that are practical, dependable and ready for real business use.",
    socials: {
      facebook: "https://www.facebook.com/people/Ehtisham-Iftikhar/", // TODO: confirm, /people/ links normally end with a numeric ID
      instagram: site.socials.instagram, // company Instagram (owner's choice)
      linkedin: "https://www.linkedin.com/in/ehtisham-iftikhar-4b6b86309/",
    },
  },
];

/** URL slug for a member's profile page: "Muhammad Ahsan Khan" -> "muhammad-ahsan-khan" */
export const memberSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
export const getMember = (slug: string) => team.find((m) => memberSlug(m.name) === slug);
