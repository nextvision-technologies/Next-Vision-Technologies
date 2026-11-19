import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { footerNav } from "@/content/navigation";
import { site } from "@/content/site";
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
      <div className="container-page relative grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-16">
        <div className="flex flex-col gap-5">
          <Image src="/brand/logo-tagline-white.svg" alt={site.name} width={462} height={108} className="h-16 w-auto self-start" />
          <p className="max-w-xs text-sm leading-relaxed text-white/65">{site.description}</p>
          <ul className="flex flex-col gap-3 text-sm text-white/75">
            <li className="flex gap-2.5"><Mail className="mt-0.5 size-4 shrink-0 text-glow-400" aria-hidden /><a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a></li>
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
      <div className="relative border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/55 sm:flex-row">
          <p>© {site.copyrightYear} {site.name}. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/software-house-lahore" className="hover:text-white">Software house in Lahore</Link>
            <Link href="/web-development-company-uk" className="hover:text-white">Web development UK</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
