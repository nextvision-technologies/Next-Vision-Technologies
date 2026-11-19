import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { site, whatsappLink } from "@/content/site";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/features/contact/ContactForm";
import { SocialIcon } from "@/components/ui/SocialIcons";

const WhatsAppIcon = ({ className }: { className?: string }) => <SocialIcon name="whatsapp" className={className} />;

export const metadata: Metadata = { title: "Contact Us", description: "Get a free quote from Next Vision Technologies within 24 hours." };

export default function ContactPage() {
  const items = [
    { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
    ...site.phones.map((p) => ({ icon: p.whatsapp ? WhatsAppIcon : Phone, label: p.whatsapp ? `${p.label} (WhatsApp)` : p.label, value: p.value, href: p.href })),
    ...site.offices.map((o) => ({ icon: MapPin, label: o.label, value: o.address, href: undefined })),
    { icon: Clock, label: "Hours", value: "Monday to Saturday, 10am to 7pm PKT", href: undefined },
  ];
  return (
    <>
      <PageHero crumbs={[{ label: "Contact" }]} eyebrow="Contact us" title="Let's talk about your project"
        text="Send us a message and we'll reply within one working day with next steps and a free quote." />
      <section className="container-page grid gap-12 py-20 lg:grid-cols-[1fr_1.4fr]">
        <div className="flex flex-col gap-4">
          {items.map((i) => (
            <div key={i.label} className="flex gap-4 rounded-card border border-line p-5">
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600"><i.icon className="size-5" aria-hidden /></span>
              <div>
                <p className="text-sm text-muted">{i.label}</p>
                {i.href ? <a href={i.href} className="font-semibold text-heading hover:text-brand-600" {...(i.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{i.value}</a> : <p className="font-semibold text-heading">{i.value}</p>}
              </div>
            </div>
          ))}
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 font-semibold text-night-950 transition hover:brightness-105">
            <SocialIcon name="whatsapp" className="size-5" /> Chat on WhatsApp
          </a>
        </div>
        <div className="rounded-[1.5rem] border border-line bg-card p-6 shadow-card sm:p-8">
          <h2 className="mb-6 text-2xl font-bold text-heading">Send us a message</h2>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
