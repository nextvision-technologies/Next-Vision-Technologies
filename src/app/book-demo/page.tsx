import { DemoBooking } from "@/features/contact/DemoBooking";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/book-demo");

export default function BookDemoPage() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-card to-card">
      <div className="container-page relative flex flex-col gap-12 py-16 sm:py-20">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <h1 className="text-4xl font-extrabold text-heading sm:text-6xl">Book your <span className="text-brand-600">free demo</span></h1>
          <p className="text-lg text-muted">Pick a date and time that suits you, and we&apos;ll confirm your slot by email or WhatsApp.</p>
        </div>
        <DemoBooking />
      </div>
    </section>
  );
}
