import type { Metadata } from "next";
import { DemoBooking } from "@/components/sections/DemoBooking";

export const metadata: Metadata = { title: "Book a Demo", description: "Book a free 30-minute demo of our AI automation, chatbot and software solutions." };

export default function BookDemoPage() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-white to-white">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-[#F0437A]/10 blur-3xl" aria-hidden />
      <div className="container-page relative flex flex-col gap-12 py-16 sm:py-20">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <h1 className="text-4xl font-extrabold text-navy-900 sm:text-6xl">Book your <span className="text-brand-gradient">free demo</span></h1>
          <p className="text-lg text-muted">Pick a date and time that suits you, and we&apos;ll confirm your slot by email or WhatsApp.</p>
        </div>
        <DemoBooking />
      </div>
    </section>
  );
}
