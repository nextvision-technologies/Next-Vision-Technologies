import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Navigation, Phone, Star } from "lucide-react";
import { footerNav } from "@/content/navigation";
import { emailLink, site } from "@/content/site";
import { SocialIcon, SocialLinks } from "@/components/ui/SocialIcons";

function Column({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold tracking-wide text-white">{title}</h3>
      <ul className="mt-4 flex flex-col gap-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-sm text-white/65 transition hover:text-glow-400">{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="section-dark relative overflow-hidden text-white">
      <span className="bg-logo-gradient absolute inset-x-0 top-0 h-1" aria-hidden />
      <div className="container-page relative grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-16">
        <div className="flex flex-col gap-5">
          <Image src="/brand/logo-tagline-white.svg" alt={site.name} width={462} height={108} className="h-16 w-auto self-start" />
          <p className="max-w-xs text-sm leading-relaxed text-white/65">{site.description}</p>
          <ul className="flex flex-col gap-3 text-sm text-white/75">
            <li className="flex gap-2.5"><Mail className="mt-0.5 size-4 shrink-0 text-glow-400" aria-hidden /><a href={emailLink()} className="hover:text-white">{site.email}</a></li>
            {site.phones.map((p) => (
              <li key={p.label} className="flex gap-2.5">
                {p.whatsapp ? <SocialIcon name="whatsapp" className="mt-0.5 size-4 shrink-0 text-glow-400" /> : <Phone className="mt-0.5 size-4 shrink-0 text-glow-400" aria-hidden />}
                <a href={p.href} className="hover:text-white" {...(p.whatsapp ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                  {p.label}{p.whatsapp ? " (WhatsApp)" : ""}: {p.value}
                </a>
              </li>
            ))}
            {site.offices.map((o) => (
              <li key={o.label} className="flex gap-2.5"><MapPin className="mt-0.5 size-4 shrink-0 text-glow-400" aria-hidden /><span><strong className="font-semibold text-white">{o.label}</strong><br />{o.address}</span></li>
            ))}
          </ul>
          <SocialLinks className="text-white/80" />
        </div>
        <Column title="Quick links" links={footerNav.quick} />
        <Column title="Our services" links={[...footerNav.services, { label: "View all services", href: "/services" }]} />
        <Column title="Support & legal" links={footerNav.support} />
      </div>

      {/* Google Business Profile + map (lazy: loads only when the visitor scrolls down to it) */}
      <div className="relative border-t border-white/10">
        <div className="container-page grid gap-8 py-12 lg:grid-cols-[1fr_2fr] lg:items-center lg:gap-12">
          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold tracking-[0.16em] text-glow-400 uppercase">Find us on Google</p>
            <h3 className="text-2xl font-bold text-white">Visit our Lahore office</h3>
            <p className="flex gap-2.5 text-sm leading-relaxed text-white/75">
              <MapPin className="mt-0.5 size-4 shrink-0 text-glow-400" aria-hidden />
              <span><strong className="font-semibold text-white">{site.name} (Pvt.) Ltd.</strong><br />{site.offices[0].address}</span>
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={site.google.profileUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-night-900 transition hover:bg-white/90">
                <Star className="size-4 text-glow-400" aria-hidden /> View on Google
              </a>
              <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(site.google.directionsQuery)}`} target="_blank" rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-white/25 px-5 text-sm font-semibold text-white transition hover:bg-white/10">
                <Navigation className="size-4" aria-hidden /> Get directions
              </a>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_20px_50px_-20px_rgb(0_0_0/0.6)]">
            <iframe
              title={`Map showing ${site.name} office in Lahore`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(site.google.mapName)}&kgmid=${encodeURIComponent(site.google.kgmid)}&output=embed`}
              className="block h-72 w-full sm:h-80 lg:h-96"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/55 sm:flex-row">
          <p>© {site.copyrightYear} {site.name}. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-5">
            <Link href="/software-house-lahore" className="hover:text-white">Software house in Lahore</Link>
            <Link href="/web-development-company-uk" className="hover:text-white">Web development UK</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
