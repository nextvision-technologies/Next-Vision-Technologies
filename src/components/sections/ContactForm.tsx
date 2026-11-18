"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { services } from "@/content/services";
import { buttonClass } from "@/components/ui/Button";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent" } | { kind: "error"; message: string };

const field = "h-12 w-full rounded-xl border border-line bg-card px-4 text-sm text-ink outline-none transition placeholder:text-muted/70 focus:border-brand-600 focus:ring-4 focus:ring-brand-100";

export function ContactForm({ variant = "quote" }: { variant?: "quote" | "demo" }) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...Object.fromEntries(new FormData(form)), variant }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      form.reset();
      setStatus({ kind: "sent" });
    } catch (err) {
      setStatus({ kind: "error", message: err instanceof Error ? err.message : "Something went wrong." });
    }
  }

  if (status.kind === "sent") {
    return (
      <div className="flex flex-col items-start gap-3 rounded-2xl border border-line bg-brand-50 p-8" role="status">
        <h3 className="text-xl font-bold text-heading">Thanks, we got your message.</h3>
        <p className="text-muted">Our team will contact you on WhatsApp or phone within 24 hours.</p>
        <button type="button" className="text-sm font-semibold text-brand-600" onClick={() => setStatus({ kind: "idle" })}>Send another message</button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2" noValidate={false}>
      <label className="flex flex-col gap-1.5 text-sm font-medium text-heading">
        Your name *
        <input id="cf-name" name="name" required autoComplete="name" className={field} placeholder="Full name" />
      </label>
      <label className="flex flex-col gap-1.5 text-sm font-medium text-heading">
        WhatsApp / phone *
        <input id="cf-phone" name="phone" required type="tel" autoComplete="tel" className={field} placeholder="+92 300 0000000" />
      </label>
      <label className="flex flex-col gap-1.5 text-sm font-medium text-heading">
        Email
        <input id="cf-email" name="email" type="email" autoComplete="email" className={field} placeholder="you@company.com" />
      </label>
      <label className="flex flex-col gap-1.5 text-sm font-medium text-heading">
        Service needed *
        <select id="cf-service" name="service" required defaultValue="" className={field}>
          <option value="" disabled>Select a service</option>
          {services.map((s) => <option key={s.slug} value={s.title}>{s.title}</option>)}
          <option value="Other">Other</option>
        </select>
      </label>
      {variant === "demo" && (
        <label className="flex flex-col gap-1.5 text-sm font-medium text-heading sm:col-span-2">
          Preferred date and time
          <input id="cf-time" name="preferredTime" type="datetime-local" className={field} />
        </label>
      )}
      <label className="flex flex-col gap-1.5 text-sm font-medium text-heading sm:col-span-2">
        Project details
        <textarea id="cf-details" name="details" rows={4} className={`${field} h-auto py-3`} placeholder="Tell us what you want to build or improve" />
      </label>
      {/* Honeypot: hidden from people, filled in by bots */}
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center">
        <button type="submit" disabled={status.kind === "sending"} className={buttonClass("primary", "lg", "disabled:opacity-60")}>
          <Send className="size-4" aria-hidden />
          {status.kind === "sending" ? "Sending…" : variant === "demo" ? "Book my demo" : "Get free quote"}
        </button>
        {status.kind === "error" && <p className="text-sm text-red-600" role="alert">{status.message}</p>}
      </div>
    </form>
  );
}
