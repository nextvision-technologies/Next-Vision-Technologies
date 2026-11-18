"use client";

import Image from "next/image";
import { useMemo, useState, useSyncExternalStore } from "react";
import { ArrowLeft, CalendarCheck, ChevronLeft, ChevronRight, Clock, Globe, Video } from "lucide-react";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { buttonClass } from "@/components/ui/Button";

const TZ = "Asia/Karachi";
const SLOTS = ["10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00"];
const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Today's date in Karachi as YYYY-MM-DD. Read on the client only, so the prerendered page stays static.
const todayKey = () => new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(new Date());
const noopSubscribe = () => () => {};

const pad = (n: number) => String(n).padStart(2, "0");
const keyOf = (y: number, m: number, d: number) => `${y}-${pad(m + 1)}-${pad(d)}`;
const monthLabel = (y: number, m: number) => new Date(Date.UTC(y, m, 1)).toLocaleString("en-GB", { month: "long", year: "numeric", timeZone: "UTC" });
const longDate = (k: string) => new Date(k + "T00:00:00Z").toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" });
const to12h = (t: string) => { const [h, m] = t.split(":").map(Number); return `${((h + 11) % 12) + 1}:${pad(m)} ${h < 12 ? "am" : "pm"}`; };

const field = "h-12 w-full rounded-xl border border-line bg-white px-4 text-sm text-ink outline-none transition placeholder:text-muted/70 focus:border-brand-600 focus:ring-4 focus:ring-brand-100";

export function DemoBooking() {
  const today = useSyncExternalStore(noopSubscribe, todayKey, () => null);
  const [view, setView] = useState<{ y: number; m: number } | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [step, setStep] = useState<"pick" | "details" | "done">("pick");
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  const base = today ? { y: Number(today.slice(0, 4)), m: Number(today.slice(5, 7)) - 1 } : null;
  const cur = view ?? base;

  const cells = useMemo(() => {
    if (!cur) return [];
    const first = new Date(Date.UTC(cur.y, cur.m, 1)).getUTCDay(); // 0 = Sun
    const lead = (first + 6) % 7; // Monday-first
    const days = new Date(Date.UTC(cur.y, cur.m + 1, 0)).getUTCDate();
    return [...Array(lead).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)] as (number | null)[];
  }, [cur]);

  const shift = (delta: number) => {
    if (!cur) return;
    const d = new Date(Date.UTC(cur.y, cur.m + delta, 1));
    setView({ y: d.getUTCFullYear(), m: d.getUTCMonth() });
  };
  const atCurrentMonth = !!(cur && base && cur.y === base.y && cur.m === base.m);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...Object.fromEntries(new FormData(e.currentTarget)), preferredTime: `${date} ${time} (${TZ})`, variant: "demo" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setStep("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="grid overflow-hidden rounded-[2rem] border border-line bg-white shadow-lift lg:grid-cols-[22rem_1fr]">
      {/* Left: meeting summary */}
      <aside className="flex flex-col border-b border-line lg:border-r lg:border-b-0">
        <div className="flex items-center justify-center bg-surface px-8 py-10">
          <Image src="/brand/logo-tagline.svg" alt={site.name} width={462} height={108} className="h-16 w-auto" />
        </div>
        <div className="flex flex-col gap-4 p-8">
          <p className="text-sm text-muted">{site.name}</p>
          <h2 className="text-2xl font-bold text-navy-900">Book a free demo</h2>
          <ul className="flex flex-col gap-3 text-ink">
            <li className="flex gap-3"><Clock className="mt-0.5 size-5 shrink-0 text-brand-600" aria-hidden />30 minutes</li>
            <li className="flex gap-3"><Video className="mt-0.5 size-5 shrink-0 text-brand-600" aria-hidden />Video call or WhatsApp. We share the details when we confirm.</li>
            <li className="flex gap-3"><Globe className="mt-0.5 size-5 shrink-0 text-brand-600" aria-hidden />Times shown in Pakistan time ({TZ})</li>
            {date && time && (
              <li className="flex gap-3 rounded-xl bg-brand-50 p-3 font-semibold text-brand-700">
                <CalendarCheck className="mt-0.5 size-5 shrink-0" aria-hidden />{longDate(date)}, {to12h(time)}
              </li>
            )}
          </ul>
        </div>
      </aside>

      {/* Right: steps */}
      <div className="p-6 sm:p-10">
        {step === "done" ? (
          <div className="flex h-full flex-col items-center justify-center gap-4 py-16 text-center" role="status">
            <span className="bg-brand-gradient inline-flex size-16 items-center justify-center rounded-full text-white"><CalendarCheck className="size-8" /></span>
            <h3 className="text-2xl font-bold text-navy-900">Request received</h3>
            <p className="max-w-md text-muted">We&apos;ll confirm your demo for <strong className="text-navy-900">{date && longDate(date)}, {time && to12h(time)}</strong> by email or WhatsApp shortly.</p>
          </div>
        ) : step === "details" ? (
          <form onSubmit={submit} className="flex flex-col gap-5">
            <button type="button" onClick={() => setStep("pick")} className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-brand-600">
              <ArrowLeft className="size-4" /> Change date or time
            </button>
            <h3 className="text-xl font-bold text-navy-900">Your details</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5 text-sm font-medium text-navy-900">Your name *<input id="bd-name" name="name" required autoComplete="name" className={field} /></label>
              <label className="flex flex-col gap-1.5 text-sm font-medium text-navy-900">WhatsApp / phone *<input id="bd-phone" name="phone" required type="tel" autoComplete="tel" className={field} /></label>
              <label className="flex flex-col gap-1.5 text-sm font-medium text-navy-900">Email<input id="bd-email" name="email" type="email" autoComplete="email" className={field} /></label>
              <label className="flex flex-col gap-1.5 text-sm font-medium text-navy-900">Interested in *
                <select id="bd-service" name="service" required defaultValue="" className={field}>
                  <option value="" disabled>Select a service</option>
                  {services.map((s) => <option key={s.slug}>{s.title}</option>)}
                  <option>Other</option>
                </select>
              </label>
              <label className="flex flex-col gap-1.5 text-sm font-medium text-navy-900 sm:col-span-2">Anything we should know?
                <textarea id="bd-details" name="details" rows={3} className={`${field} h-auto py-3`} />
              </label>
              <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <button type="submit" disabled={sending} className={buttonClass("primary", "lg", "disabled:opacity-60")}>
                {sending ? "Booking…" : "Confirm booking"}
              </button>
              {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
            </div>
          </form>
        ) : (
          <div className="grid gap-8 xl:grid-cols-[1fr_13rem]">
            <div className="flex flex-col gap-6">
              <h3 className="text-xl font-bold text-navy-900">Select a date &amp; time</h3>
              <div className="flex items-center justify-center gap-6">
                <button type="button" onClick={() => shift(-1)} disabled={!cur || atCurrentMonth} aria-label="Previous month"
                  className="inline-flex size-10 items-center justify-center rounded-full text-brand-600 transition hover:bg-brand-50 disabled:text-line">
                  <ChevronLeft className="size-5" />
                </button>
                <p className="w-44 text-center font-display text-lg font-bold text-navy-900">{cur ? monthLabel(cur.y, cur.m) : " "}</p>
                <button type="button" onClick={() => shift(1)} disabled={!cur} aria-label="Next month"
                  className="inline-flex size-10 items-center justify-center rounded-full text-brand-600 transition hover:bg-brand-50">
                  <ChevronRight className="size-5" />
                </button>
              </div>
              <div className="grid grid-cols-7 gap-y-2 text-center">
                {WEEKDAYS.map((w) => <span key={w} className="pb-2 text-xs font-semibold text-muted">{w}</span>)}
                {cells.map((d, i) => {
                  if (!d || !cur) return <span key={i} />;
                  const k = keyOf(cur.y, cur.m, d);
                  const sunday = i % 7 === 6;
                  const disabled = !today || k <= today || sunday;
                  const selected = k === date;
                  return (
                    <span key={i} className="flex justify-center">
                      <button type="button" disabled={disabled} onClick={() => { setDate(k); setTime(null); }}
                        aria-pressed={selected} aria-label={longDate(k)}
                        className={`inline-flex size-11 items-center justify-center rounded-full text-sm font-semibold transition ${
                          selected ? "bg-brand-gradient text-white shadow-lift"
                            : disabled ? "cursor-default text-muted/40"
                            : "bg-brand-50 text-brand-700 hover:bg-brand-100"}`}>
                        {d}
                      </button>
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-sm font-semibold text-navy-900">{date ? longDate(date) : "Pick a date to see times"}</p>
              {date && (
                <div className="flex max-h-80 flex-col gap-2 overflow-y-auto pr-1">
                  {SLOTS.map((s) => (
                    <div key={s} className="flex gap-2">
                      <button type="button" onClick={() => setTime(s)} aria-pressed={time === s}
                        className={`h-11 flex-1 rounded-xl border text-sm font-semibold transition ${time === s ? "border-navy-900 bg-navy-900 text-white" : "border-brand-600/40 text-brand-700 hover:border-brand-600"}`}>
                        {to12h(s)}
                      </button>
                      {time === s && (
                        <button type="button" onClick={() => setStep("details")} className={buttonClass("primary", "md", "h-11 flex-1 px-3")}>Next</button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
