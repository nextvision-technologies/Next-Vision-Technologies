// Projects Gallery: live client work. Screenshots live in /public/projects/<slug>.webp (1440x900).
// Software and portals never show login details. Visitors are sent to the demo booking page instead.

export type ProjectType = "Website" | "Software" | "AI";

export type Project = {
  slug: string;
  name: string;
  type: ProjectType;
  industry: string;
  summary: string;
  url: string;
  /** false for software that only has a login screen: the card then shows "Request a demo" only */
  publicSite?: boolean;
};

export const projectFilters: { label: string; type?: ProjectType }[] = [
  { label: "All projects" },
  { label: "Websites", type: "Website" },
  { label: "Software & Portals", type: "Software" },
  { label: "AI Solutions", type: "AI" },
];

export const projects: Project[] = [
  // ---------- Software & AI ----------
  { slug: "inex-courier-management", name: "Inex Courier Management System", type: "Software", industry: "Logistics",
    summary: "Courier website with shipment booking and live tracking, backed by an admin portal for parcels, riders and branches.",
    url: "https://inex-courier-management.vercel.app/" },
  { slug: "ecl-cod-management", name: "ECL C.O.D Management System", type: "Software", industry: "Logistics & E-Commerce",
    summary: "Cash-on-delivery courier platform for online stores, with Shopify integration, parcel tracking and COD settlements.",
    url: "https://selections-cod-flow.vercel.app/" },
  { slug: "courier-accounts-management", name: "Courier Accounts Management System", type: "Software", industry: "Logistics",
    summary: "Finance portal for courier companies that manages COD collections, merchant payments, invoices and account statements.",
    url: "https://courier-management-system-cms-mu.vercel.app/login", publicSite: false },
  { slug: "clinic-management-system", name: "Clinic Management System", type: "Software", industry: "Healthcare",
    summary: "Front desk and doctor software for appointments, walk-in queues, consultations, prescriptions and patient billing.",
    url: "https://clinic-management-system-roan-ten.vercel.app/", publicSite: false },
  { slug: "pos-billing-software", name: "POS Billing Software", type: "Software", industry: "Retail & Trading",
    summary: "Point-of-sale and billing system that turns quotations into invoices and keeps stock, customers and payments in one place.",
    url: "https://rizwan-global-trader-pos.vercel.app/login", publicSite: false },
  { slug: "raza-gpt", name: "Raza GPT Chat Bot", type: "AI", industry: "AI Assistant",
    summary: "AI research assistant that answers questions with structured, source-backed replies through a clean chat interface.",
    url: "https://raza-gpt-gamma.vercel.app/" },

  // ---------- Websites ----------
  { slug: "pak-heritage-hotel", name: "Pak Heritage Hotel", type: "Website", industry: "Hospitality",
    summary: "Heritage hotel website in Lahore with room showcases, a restaurant section and an availability search for direct bookings.",
    url: "https://pak-heritage-hotel.netlify.app/" },
  { slug: "stayin-guest-house", name: "Stay-in Guest House", type: "Website", industry: "Hospitality",
    summary: "Guest house website with rooms, amenities, a photo gallery and a simple check-in and check-out booking form.",
    url: "https://stayin-guest-house.netlify.app/" },
  { slug: "surgical-hospital", name: "Surgical Hospital", type: "Website", industry: "Healthcare",
    summary: "Hospital website in Lahore listing consultants, departments and OPD timings, with online appointment booking.",
    url: "https://surgical-hospital.netlify.app/" },
  { slug: "smilecare-dental", name: "SmileCare Dental", type: "Website", industry: "Healthcare",
    summary: "Family dental clinic website with treatments, dentist profiles, a smile gallery and online appointment booking.",
    url: "https://smil-care-dental.netlify.app/" },
  { slug: "raza-clinic", name: "Raza Clinic", type: "Website", industry: "Healthcare",
    summary: "Medical centre website with specialist doctors, services, 24/7 emergency contact and appointment booking.",
    url: "https://raza-clinic.vercel.app/" },
  { slug: "umair-clinic", name: "Umair Clinic", type: "Website", industry: "Healthcare",
    summary: "Clinic website presenting experienced doctors, diagnostics and patient services, with booking and WhatsApp chat.",
    url: "https://umair-clinic.vercel.app/" },
  { slug: "dr-maaz-arif", name: "Dr. Muhammad Maaz Arif", type: "Website", industry: "Healthcare",
    summary: "Personal brand website for a public health specialist, covering his experience, research, portfolio and contact details.",
    url: "https://dr-muhammad-maaz-arif.netlify.app/" },
  { slug: "real-estate-agency", name: "Real Estate Agency", type: "Website", industry: "Real Estate",
    summary: "Property website with buy and rent listings and a search by location, property type and budget.",
    url: "https://real-estate-agency-pk.vercel.app/" },
  { slug: "buildright-constructions", name: "BuildRight Constructions", type: "Website", industry: "Construction",
    summary: "Construction company website with services, completed projects, a free quote form and a construction cost calculator.",
    url: "https://build-right-constructions.netlify.app/" },
  { slug: "restaurant-food-ordering", name: "Restaurant & Food Ordering", type: "Website", industry: "Food & Restaurant",
    summary: "Restaurant website with an online menu, food ordering and delivery details, designed to turn visitors into orders.",
    url: "https://restaurant-food-ordering-pk.vercel.app/" },
  { slug: "fitzone-gym", name: "FitZone Gym", type: "Website", industry: "Fitness",
    summary: "Bold gym website with classes, certified trainers, membership plans and a free trial sign-up.",
    url: "https://fit-zon-gym.netlify.app/" },
  { slug: "ali-motor-sports", name: "Ali Motor Sports", type: "Website", industry: "Automotive",
    summary: "Sports bike showroom website showcasing premium bikes, brands and contact options for buyers.",
    url: "https://ali-motor-sport-o3ex.vercel.app/" },
  { slug: "rizwan-stationers", name: "Rizwan Stationers", type: "Website", industry: "Retail",
    summary: "Stationery store website with a product catalogue for school and office supplies and ordering on WhatsApp.",
    url: "https://rizwan-stationers.netlify.app/" },
];

export const projectImage = (slug: string) => `/projects/${slug}.webp`;
