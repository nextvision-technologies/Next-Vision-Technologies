// People credited on blog articles: the writer and the subject-matter expert who reviews each post.
// Showing a real, qualified writer and reviewer helps readers (and Google's E-E-A-T guidelines) trust the content.
import type { BlogCategory, Person } from "@/types/content";

export const people: Person[] = [
  {
    id: "babar-ali",
    name: "Babar Ali",
    role: "SEO Expert",
    photo: "/team/babar-ali.webp",
    bio: "Babar plans and writes Next Vision's guides on SEO, websites and automation, turning what our engineers build for clients into practical advice business owners can use.",
  },
  {
    id: "ehtisham-iftikhar",
    name: "Ehtisham Iftikhar",
    role: "AI Engineer",
    photo: "/team/ehtisham-malik.webp",
    bio: "Ehtisham designs and builds the AI chatbots, HR and workflow automations Next Vision delivers, and checks every AI article for technical accuracy.",
  },
  {
    id: "ali-raza",
    name: "Ali Raza",
    role: "Software Engineer",
    photo: "/team/ali-raza.webp",
    bio: "Ali leads website and software development at Next Vision and reviews our web articles so pricing, timelines and technical advice match real projects.",
  },
  {
    id: "muhammad-ahsan-khan",
    name: "Muhammad Ahsan Khan",
    role: "Director, Next Vision Technologies",
    photo: "/team/muhammad-ahsan-khan.webp",
    bio: "Ahsan oversees client growth projects at Next Vision and reviews our SEO and marketing guides against the results we see on live client websites.",
  },
];

/** Every post is written by this person unless the post sets its own `author` */
export const DEFAULT_AUTHOR = "babar-ali";

/** Who reviews a post, by topic, unless the post sets its own `reviewer` */
export const reviewerByCategory: Partial<Record<BlogCategory, string>> = {
  "AI & Automation": "ehtisham-iftikhar",
  "Web Development": "ali-raza",
  "E-Commerce": "ali-raza",
  "Mobile Apps": "ali-raza",
  Security: "ali-raza",
  SEO: "muhammad-ahsan-khan",
  "Digital Marketing": "muhammad-ahsan-khan",
  "Business Tips": "muhammad-ahsan-khan",
};

export const getPerson = (id?: string) => people.find((p) => p.id === id);
