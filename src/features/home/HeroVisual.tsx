import type { ReactNode } from "react";
import { Bot, CircleCheck } from "lucide-react";

/* Editor syntax colours, used only inside this decorative code window */
const Key = ({ children }: { children: ReactNode }) => <span className="text-[#E0907E]">{children}</span>;
const Fn = ({ children }: { children: ReactNode }) => <span className="text-[#E0B070]">{children}</span>;
const Prop = ({ children }: { children: ReactNode }) => <span className="text-[#C9C2B6]">{children}</span>;

const code: ReactNode[] = [
  <><Key>const</Key> team = <Fn>nextVision</Fn>();</>,
  "",
  <><Key>async function</Key> <Fn>grow</Fn>(client) {"{"}</>,
  <>  <Key>const</Key> plan = team.<Fn>plan</Fn>();</>,
  <>  <Key>const</Key> app = team.<Fn>build</Fn>(plan);</>,
  "",
  <>  <Key>if</Key> (app.<Prop>isReady</Prop>) {"{"}</>,
  <>    team.<Fn>launch</Fn>(app);</>,
  "  }",
  "",
  <>  <Key>return</Key> client.<Prop>growth</Prop>;</>,
  "}",
];

/** Hero visual: a code editor window on a sand panel, with a floating chat bubble. Decorative, currently unused. */
export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-md pb-12 lg:max-w-[29rem]" aria-hidden>
      {/* Backdrop */}
      <div className="rounded-[1.75rem] bg-surface p-4 pb-20 shadow-2xl sm:p-7 sm:pb-20">
        {/* Editor window */}
        <div className="overflow-hidden rounded-2xl border border-white/15 bg-night-900 shadow-[0_18px_40px_-12px_rgb(31_10_77/0.6)]">
          <div className="relative flex h-11 items-center gap-2 px-4">
            <span className="size-3 rounded-full bg-white/25" />
            <span className="size-3 rounded-full bg-white/25" />
            <span className="size-3 rounded-full bg-white/25" />
            <span className="absolute inset-x-0 text-center text-xs font-medium text-white/60">next-vision.ts</span>
          </div>
          <pre className="overflow-hidden px-4 pt-1 pb-5 font-mono text-xs leading-6 text-[#F3EEE6] sm:px-5 sm:text-[13px] sm:leading-[1.7rem]">
            <code>
              {code.map((line, i) => <span key={i} className="block min-h-[1lh] whitespace-pre">{line}</span>)}
            </code>
          </pre>
        </div>
      </div>

      {/* Floating AI chat bubble */}
      <div className="animate-float absolute bottom-0 -left-2 w-56 rounded-2xl border border-white/12 bg-night-900 p-3.5 shadow-xl sm:-left-8">
        <div className="flex items-center gap-2">
          <span className="solid-primary inline-flex size-7 items-center justify-center rounded-full"><Bot className="size-4" /></span>
          <p className="text-xs font-semibold text-white">AI assistant</p>
          <span className="ml-auto size-2 rounded-full bg-emerald-400" />
        </div>
        <p className="mt-2.5 rounded-xl rounded-tl-sm bg-white/[0.08] px-3 py-2 text-xs leading-relaxed text-white/85">
          Your demo is booked for Monday, 3pm <CircleCheck className="ml-0.5 inline size-3.5 -translate-y-px text-emerald-400" aria-label="Confirmed" />
        </p>
      </div>
    </div>
  );
}
