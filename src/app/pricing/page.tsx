import { PageHero } from "@/components/sections/PageHero";
import { CtaBand, Faq } from "@/components/sections/Blocks";
import { PricingCards } from "@/features/pricing/PricingCards";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/pricing");

const faqs = [
  { q: "Is there a minimum contract?", a: "Monthly packages run month to month after the first three months. Cancel with 30 days' notice." },
  { q: "Do you offer one-off projects?", a: "Yes. Websites, apps and automations can be quoted as fixed-price projects." },
  { q: "Are ad budgets included?", a: "No. Package prices cover our work; ad spend is paid directly to Meta or Google." },
  { q: "Can I upgrade later?", a: "Yes, you can move between packages at the start of any month." },
];

export default function PricingPage() {
  return (
    <>
      <PageHero crumbs={[{ label: "Pricing" }]} eyebrow="Pricing" title="Simple, transparent pricing"
        text="Choose a monthly growth package, or ask for a fixed quote on a one-off project." />
      <section className="container-page py-20"><PricingCards /></section>
      <section className="bg-surface py-20"><div className="container-page"><Faq items={faqs} title="Pricing questions" /></div></section>
      <CtaBand title="Need a custom package?" text="Tell us what you need and we'll put together a plan and price within 24 hours." />
    </>
  );
}
