import { Bot, TrendingUp } from "lucide-react";

/** Hero visual: one clean growth card and a single floating AI chat bubble. Decorative. */
export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-md pb-12 lg:max-w-[28rem]" aria-hidden>
      <div className="absolute inset-x-10 top-10 bottom-4 rounded-full bg-brand-600/30 blur-3xl" />

      {/* Growth card */}
      <div className="relative rounded-[1.75rem] border border-white/12 bg-white/[0.07] p-6 shadow-2xl backdrop-blur-xl">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] font-medium tracking-[0.14em] text-white/50 uppercase">Example client · Monthly leads</p>
            <p className="mt-1 font-display text-4xl font-extrabold text-white">1,284</p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/15 px-2.5 py-1 text-xs font-semibold text-emerald-300">
            <TrendingUp className="size-3.5" /> +68%
          </span>
        </div>
        <svg viewBox="0 0 320 140" className="mt-4 w-full">
          <defs>
            <linearGradient id="hvArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#F0437A" stopOpacity=".4" />
              <stop offset="1" stopColor="#F0437A" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="hvLine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#7C3AED" />
              <stop offset=".55" stopColor="#F0437A" />
              <stop offset="1" stopColor="#FF9A3C" />
            </linearGradient>
          </defs>
          {[35, 70, 105].map((y) => <line key={y} x1="0" x2="320" y1={y} y2={y} stroke="white" strokeOpacity=".07" />)}
          <path d="M0 122 L40 114 L80 118 L120 94 L160 98 L200 68 L240 54 L280 28 L312 14 V140 H0Z" fill="url(#hvArea)" />
          <path d="M0 122 L40 114 L80 118 L120 94 L160 98 L200 68 L240 54 L280 28 L312 14" fill="none" stroke="url(#hvLine)" strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round" />
          <circle cx="312" cy="14" r="6" fill="#FF9A3C" className="animate-soft-pulse" style={{ transformOrigin: "312px 14px" }} />
        </svg>
      </div>

      {/* Floating AI chat bubble */}
      <div className="animate-float absolute bottom-0 -left-4 w-56 rounded-2xl border border-white/12 bg-navy-900/95 p-3.5 shadow-xl backdrop-blur sm:-left-10">
        <div className="flex items-center gap-2">
          <span className="bg-brand-gradient inline-flex size-7 items-center justify-center rounded-full text-white"><Bot className="size-4" /></span>
          <p className="text-xs font-semibold text-white">AI assistant</p>
          <span className="ml-auto size-2 rounded-full bg-emerald-400" />
        </div>
        <p className="mt-2.5 rounded-xl rounded-tl-sm bg-white/[0.08] px-3 py-2 text-xs leading-relaxed text-white/85">
          Your demo is booked for Monday, 3pm ✅
        </p>
      </div>
    </div>
  );
}
