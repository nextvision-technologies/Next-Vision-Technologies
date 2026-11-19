import { site } from "@/content/site";
import { services } from "@/content/services";

/** Organization + WebSite structured data, rendered once in the root layout */
export function SiteJsonLd() {
  const sameAs = Object.values(site.socials).filter(Boolean);
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      alternateName: site.shortName,
      url: site.url,
      logo: `${site.url}/brand/logo-square.png`,
      image: `${site.url}/brand/logo-og.png`,
      description: site.description,
      slogan: site.tagline,
      email: site.email,
      telephone: site.phones[0].value.replace(/\s/g, ""),
      address: [
        { "@type": "PostalAddress", addressLocality: "Lahore", addressCountry: "PK" },
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
      sameAs,
      knowsAbout: services.map((s) => s.title),
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
