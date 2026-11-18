import { Bot, CheckCircle2, TrendingUp } from "lucide-react";

/** Layered product-style visual: growth chart, AI chat and launch cards. Decorative. */
export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-xl pt-10 pb-16" aria-hidden>
      {/* glow */}
      <div className="absolute inset-x-8 top-10 bottom-0 rounded-full bg-brand-600/30 blur-3xl" />

      {/* Main card: growth chart */}
      <div className="relative rounded-[1.75rem] border border-white/12 bg-white/[0.07] p-6 shadow-2xl backdrop-blur-xl">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium tracking-wide text-white/55 uppercase">Example client dashboard · Leads</p>
            <p className="mt-1 font-display text-4xl font-extrabold text-white">1,284</p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/15 px-2.5 py-1 text-xs font-semibold text-emerald-300">
            <TrendingUp className="size-3.5" /> +68%
          </span>
        </div>
        <svg viewBox="0 0 320 130" className="mt-5 w-full">
          <defs>
            <linearGradient id="hvArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#F0437A" stopOpacity=".45" />
              <stop offset="1" stopColor="#F0437A" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="hvLine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#7C3AED" />
              <stop offset=".55" stopColor="#F0437A" />
              <stop offset="1" stopColor="#FF9A3C" />
            </linearGradient>
          </defs>
          {[32, 64, 96].map((y) => <line key={y} x1="0" x2="320" y1={y} y2={y} stroke="white" strokeOpacity=".07" />)}
          <path d="M0 112 L40 104 L80 108 L120 86 L160 90 L200 62 L240 50 L280 26 L312 12 V130 H0Z" fill="url(#hvArea)" />
          <path d="M0 112 L40 104 L80 108 L120 86 L160 90 L200 62 L240 50 L280 26 L312 12" fill="none" stroke="url(#hvLine)" strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round" />
          <circle cx="312" cy="12" r="6" fill="#FF9A3C" className="animate-soft-pulse" style={{ transformOrigin: "312px 12px" }} />
        </svg>
        <div className="mt-4 mb-10 grid grid-cols-3 gap-2 text-center sm:mb-0 sm:ml-48">
          {[["Website", "4.2k"], ["Ads", "612"], ["Chatbot", "238"]].map(([k, v]) => (
            <div key={k} className="rounded-xl bg-white/[0.06] px-2 py-2.5">
              <p className="text-[11px] text-white/55">{k} visits</p>
              <p className="font-display text-sm font-bold text-white">{v}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Floating: AI chat */}
      <div className="animate-float absolute bottom-0 -left-2 w-60 rounded-2xl border border-white/12 bg-navy-900/95 p-3.5 shadow-xl backdrop-blur sm:-left-10">
        <div className="flex items-center gap-2">
          <span className="bg-brand-gradient inline-flex size-7 items-center justify-center rounded-full text-white"><Bot className="size-4" /></span>
          <p className="text-xs font-semibold text-white">AI assistant</p>
          <span className="ml-auto size-2 rounded-full bg-emerald-400" />
        </div>
        <p className="mt-2.5 rounded-xl rounded-tl-sm bg-white/[0.08] px-3 py-2 text-xs leading-relaxed text-white/85">
          Booked! Your demo is on Monday at 3pm. I&apos;ve sent the details on WhatsApp.
        </p>
      </div>

      {/* Floating: launch */}
      <div className="animate-float-slow absolute top-0 right-4 flex items-center gap-3 rounded-2xl border border-white/12 bg-navy-900/95 px-4 py-3 shadow-xl backdrop-blur sm:-right-6">
        <CheckCircle2 className="size-8 text-emerald-400" />
        <div>
          <p className="text-sm font-semibold text-white">Website launched</p>
          <p className="text-xs text-white/55">Speed score 98 / 100</p>
        </div>
      </div>

    </div>
  );
}
