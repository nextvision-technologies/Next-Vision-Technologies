import { site } from "@/content/site";
import { company } from "@/content/company";
import { services } from "@/content/services";
import type { Job } from "@/types/content";

/** Registered office (SECP/FBR documents), matching the Google Business Profile listing */
const lahoreAddress = {
  "@type": "PostalAddress",
  streetAddress: "28 Davis Road, Garhi Shahu",
  addressLocality: "Lahore",
  addressRegion: "Punjab",
  postalCode: "54000",
  addressCountry: "PK",
};

/** Organization + WebSite structured data, rendered once in the root layout */
export function SiteJsonLd() {
  const sameAs = Object.values(site.socials).filter(Boolean);
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      legalName: company.legalName,
      alternateName: site.shortName,
      taxID: company.ntn,
      identifier: { "@type": "PropertyValue", propertyID: "SECP Corporate Unique Identification No.", value: company.cuin },
      url: site.url,
      logo: `${site.url}/brand/logo-square.png`,
      image: `${site.url}/brand/logo-og.png`,
      description: site.description,
      slogan: site.tagline,
      email: site.email,
      telephone: site.phones[0].value.replace(/\s/g, ""),
      address: [
        lahoreAddress,
        { "@type": "PostalAddress", addressCountry: "GB" },
      ],
      areaServed: ["Pakistan", "United Kingdom", "Worldwide"],
      contactPoint: site.phones.map((p) => ({
        "@type": "ContactPoint",
        telephone: p.value.replace(/\s/g, ""),
        contactType: "customer service",
        areaServed: p.label === "Pakistan" ? "PK" : "GB",
        availableLanguage: ["English", "Urdu"],
      })),
      sameAs: [...sameAs, site.google.profileUrl],
      hasMap: site.google.profileUrl,
      knowsAbout: services.map((s) => s.title),
    },
    {
      // Local business entity for the Lahore office: helps "software house Lahore" style local searches
      // and ties the site to the Google Business Profile listing.
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "@id": `${site.url}/#lahore-office`,
      name: site.google.mapName,
      parentOrganization: { "@id": `${site.url}/#organization` },
      url: site.url,
      image: `${site.url}/brand/logo-og.png`,
      logo: `${site.url}/brand/logo-square.png`,
      description: site.description,
      email: site.email,
      telephone: site.phones[0].value.replace(/\s/g, ""),
      address: lahoreAddress,
      hasMap: site.google.profileUrl,
      areaServed: ["Lahore", "Pakistan", "United Kingdom"],
      knowsLanguage: ["en", "ur"],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      publisher: { "@id": `${site.url}/#organization` },
      inLanguage: "en",
    },
  ];
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

/** JobPosting structured data, so open roles can appear in Google's job search */
export function JobPostingJsonLd({ job }: { job: Job }) {
  const list = (items: string[]) => `<ul>${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;
  const data = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: `<p>${job.summary}</p><p><strong>What you'll do</strong></p>${list(job.responsibilities)}<p><strong>What we're looking for</strong></p>${list(job.requirements)}`,
    datePosted: job.posted,
    employmentType: job.type.toLowerCase().includes("part") ? "PART_TIME" : "FULL_TIME",
    hiringOrganization: { "@type": "Organization", "@id": `${site.url}/#organization`, name: site.name, sameAs: site.url, logo: `${site.url}/brand/logo-square.png` },
    jobLocation: { "@type": "Place", address: lahoreAddress },
    ...(job.remote ? { jobLocationType: "TELECOMMUTE", applicantLocationRequirements: { "@type": "Country", name: "Pakistan" } } : {}),
    directApply: false,
    url: `${site.url}/jobs/${job.slug}`,
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

/** BreadcrumbList structured data for inner pages */
export function BreadcrumbJsonLd({ items }: { items: { label: string; href?: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${site.url}${c.href === "/" ? "" : c.href}` } : {}),
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
