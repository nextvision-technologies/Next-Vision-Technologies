"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hero coding terminal: an editor window that types real code, character by character,
 * then "runs" it and prints the output. Cycles through three snippets that match what we build.
 *
 * - Decorative (aria-hidden): the hero heading already says the same thing in words.
 * - Pauses while off screen or when the tab is hidden, so it costs nothing in the background.
 * - Visitors who prefer reduced motion see each finished snippet, changing every few seconds.
 */

type Tone = "kw" | "fn" | "str" | "prop" | "num" | "com" | "punc" | "plain" | "ok" | "dim" | "prompt";
type Part = [text: string, tone: Tone];
type Line = { parts: Part[]; out?: boolean }; // `out` lines are printed instantly (command output)
type Snippet = { file: string; lang: string; lines: Line[] };

const L = (...parts: Part[]): Line => ({ parts });
const OUT = (...parts: Part[]): Line => ({ parts, out: true });

const snippets: Snippet[] = [
  {
    file: "ai-agent.ts",
    lang: "TypeScript",
    lines: [
      L(["import", "kw"], [" { ", "punc"], ["createAgent", "fn"], [" } ", "punc"], ["from", "kw"], [" \"@nextvision/ai\"", "str"], [";", "punc"]),
      L(),
      L(["const", "kw"], [" agent ", "plain"], ["= ", "punc"], ["createAgent", "fn"], ["({", "punc"]),
      L(["  name", "prop"], [": ", "punc"], ["\"Sales Assistant\"", "str"], [",", "punc"]),
      L(["  languages", "prop"], [": ", "punc"], ["[", "punc"], ["\"en\"", "str"], [", ", "punc"], ["\"ur\"", "str"], ["],", "punc"]),
      L(["  tools", "prop"], [": ", "punc"], ["[whatsapp, crm, calendar],", "plain"]),
      L(["});", "punc"]),
      L(),
      L(["agent", "plain"], [".", "punc"], ["on", "fn"], ["(", "punc"], ["\"lead\"", "str"], [", ", "punc"], ["async", "kw"], [" (lead) ", "plain"], ["=>", "kw"], [" {", "punc"]),
      L(["  await", "kw"], [" crm", "plain"], [".", "punc"], ["save", "fn"], ["(lead);", "punc"]),
      L(["  await", "kw"], [" whatsapp", "plain"], [".", "punc"], ["reply", "fn"], ["(lead, ", "punc"], ["\"Demo booked!\"", "str"], [");", "punc"]),
      L(["});", "punc"]),
      OUT(["$ ", "prompt"], ["npm run deploy", "plain"]),
      OUT(["✓ ", "ok"], ["Agent live on WhatsApp · ", "dim"], ["24/7", "num"]),
    ],
  },
  {
    file: "storefront.tsx",
    lang: "React",
    lines: [
      L(["export default function", "kw"], [" ", "plain"], ["Store", "fn"], ["() {", "punc"]),
      L(["  return", "kw"], [" (", "punc"]),
      L(["    <", "punc"], ["Page", "fn"], [" seo", "prop"], ["=", "punc"], ["\"optimised\"", "str"], [" speed", "prop"], ["={", "punc"], ["100", "num"], ["}>", "punc"]),
      L(["      <", "punc"], ["Hero", "fn"], [" title", "prop"], ["=", "punc"], ["\"Your brand, online\"", "str"], [" />", "punc"]),
      L(["      <", "punc"], ["Products", "fn"], [" grid", "prop"], [" live", "prop"], [" />", "punc"]),
      L(["      <", "punc"], ["Checkout", "fn"], [" pay", "prop"], ["={[", "punc"], ["\"card\"", "str"], [", ", "punc"], ["\"jazzcash\"", "str"], ["]} />", "punc"]),
      L(["    </", "punc"], ["Page", "fn"], [">", "punc"]),
      L(["  );", "punc"]),
      L(["}", "punc"]),
      OUT(["$ ", "prompt"], ["npm run build", "plain"]),
      OUT(["✓ ", "ok"], ["Compiled · Lighthouse ", "dim"], ["100", "num"], [" · mobile ready", "dim"]),
    ],
  },
  {
    file: "growth.py",
    lang: "Python",
    lines: [
      L(["# Weekly growth report, sent every Monday", "com"]),
      L(["from", "kw"], [" nextvision ", "plain"], ["import", "kw"], [" ads, seo, report", "plain"]),
      L(),
      L(["def", "kw"], [" ", "plain"], ["grow", "fn"], ["(business):", "punc"]),
      L(["    leads", "plain"], [" = ", "punc"], ["ads", "plain"], [".", "punc"], ["run", "fn"], ["(budget=", "punc"], ["500", "num"], [")", "punc"]),
      L(["    rank", "plain"], [" = ", "punc"], ["seo", "plain"], [".", "punc"], ["optimise", "fn"], ["(business.site)", "punc"]),
      L(["    return", "kw"], [" report", "plain"], [".", "punc"], ["send", "fn"], ["(leads, rank)", "punc"]),
      OUT(["$ ", "prompt"], ["python growth.py", "plain"]),
      OUT(["✓ ", "ok"], ["+38 leads this week · rank ", "dim"], ["#3", "num"], [" on Google", "dim"]),
    ],
  },
];

const toneClass: Record<Tone, string> = {
  kw: "text-[#ff7ab6]", // logo pink
  fn: "text-[#ffb26b]", // logo orange
  str: "text-[#f9d48a]",
  prop: "text-[#c4b5fd]", // logo violet, light
  num: "text-[#ff9a3c]",
  com: "text-[#8f84b0] italic",
  punc: "text-[#d9d2ec]",
  plain: "text-[#f6f2ff]",
  ok: "text-[#4ade80]",
  dim: "text-[#b9b0d3]",
  prompt: "text-[#f0abfc]",
};

const lineLength = (l: Line) => l.parts.reduce((n, [t]) => n + t.length, 0);

/** Renders the first `chars` characters of a line, keeping each token's colour */
function PartialLine({ line, chars }: { line: Line; chars: number }) {
  // Character offset where each token starts
  const starts = line.parts.reduce<number[]>((acc, _part, i) => [...acc, i === 0 ? 0 : acc[i - 1] + line.parts[i - 1][0].length], []);
  return (
    <>
      {line.parts.map(([text, tone], i) => {
        const left = chars - starts[i];
        if (left <= 0) return null;
        return <span key={i} className={toneClass[tone]}>{text.slice(0, left)}</span>;
      })}
    </>
  );
}

type Pos = { s: number; line: number; ch: number; done: boolean };

export function CodeTerminal({ className = "" }: { className?: string }) {
  const [pos, setPos] = useState<Pos>({ s: 0, line: 0, ch: 0, done: false });
  const [active, setActive] = useState(false);
  const [reduced, setReduced] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Only animate while visible and the tab is in front
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    let onScreen = false;
    const sync = () => setActive(onScreen && document.visibilityState === "visible");
    const io = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; sync(); });
    io.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => { io.disconnect(); document.removeEventListener("visibilitychange", sync); };
  }, []);

  // The typing loop: one timeout per step
  useEffect(() => {
    if (!active) return;
    const snip = snippets[pos.s];
    const next = (p: Pos, ms: number) => setTimeout(() => setPos(p), ms);
    let t: ReturnType<typeof setTimeout>;

    if (reduced) {
      // No typing: show the whole snippet, then switch to the next one after a pause
      t = pos.done
        ? next({ s: (pos.s + 1) % snippets.length, line: snippets[(pos.s + 1) % snippets.length].lines.length, ch: 0, done: true }, 4500)
        : next({ ...pos, line: snip.lines.length, done: true }, 0);
    } else if (pos.done) {
      t = next({ s: (pos.s + 1) % snippets.length, line: 0, ch: 0, done: false }, 2600); // hold, then next snippet
    } else if (pos.line >= snip.lines.length) {
      t = next({ ...pos, done: true }, 0);
    } else {
      const line = snip.lines[pos.line];
      const len = lineLength(line);
      if (line.out) {
        t = next({ ...pos, line: pos.line + 1, ch: 0 }, 420); // command output appears whole
      } else if (pos.ch < len) {
        const ch = line.parts.flatMap(([text]) => text.split(""))[pos.ch];
        const delay = ch === " " ? 18 : 26 + Math.random() * 38; // human-ish rhythm
        t = next({ ...pos, ch: pos.ch + 1 }, delay);
      } else {
        t = next({ ...pos, line: pos.line + 1, ch: 0 }, len === 0 ? 60 : 140);
      }
    }
    return () => clearTimeout(t);
  }, [pos, active, reduced]);

  const snip = snippets[pos.s];
  const shownLines = snip.lines.slice(0, Math.min(pos.line + 1, snip.lines.length));
  const codeCount = snip.lines.filter((l) => !l.out).length;

  return (
    <div ref={rootRef} aria-hidden className={`nv-terminal overflow-hidden rounded-2xl border border-white/12 bg-[#12092a]/95 shadow-[0_30px_80px_-24px_rgb(0_0_0/0.75)] ${className}`}>
      {/* Logo-gradient hairline */}
      <div className="bg-logo-gradient h-0.5" />

      {/* Title bar with tabs */}
      <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.03] px-4">
        <div className="flex gap-1.5 py-3">
          <span className="size-3 rounded-full bg-[#f0437a]" />
          <span className="size-3 rounded-full bg-[#ff9a3c]" />
          <span className="size-3 rounded-full bg-[#8b2be2]" />
        </div>
        <div className="flex min-w-0 gap-1 overflow-hidden">
          {snippets.map((s, i) => (
            <span key={s.file}
              className={`truncate rounded-t-md px-3 py-2.5 font-mono text-[11px] sm:text-xs ${i === pos.s ? "bg-[#12092a] text-white" : "text-white/45"}`}>
              {s.file}
            </span>
          ))}
        </div>
      </div>

      {/* Code */}
      <pre className="nv-terminal__code overflow-hidden px-0 py-4 font-mono text-[11.5px] leading-[1.7] sm:text-[13px]">
        <code className="block">
          {shownLines.map((line, i) => {
            const isCurrent = i === pos.line && !pos.done;
            const n = snip.lines.slice(0, i + 1).filter((l) => !l.out).length;
            return (
              <span key={`${pos.s}-${i}`} className={`flex whitespace-pre ${line.out ? "bg-white/[0.03]" : ""}`}>
                <span className="w-10 shrink-0 pr-3 text-right text-white/25 select-none">{line.out ? "" : n}</span>
                <span className="min-w-0 pr-4">
                  {line.out || !isCurrent ? <PartialLine line={line} chars={Infinity} /> : <PartialLine line={line} chars={pos.ch} />}
                  {isCurrent && !line.out && <span className="nv-caret" />}
                </span>
              </span>
            );
          })}
          {pos.done && <span className="flex"><span className="w-10 shrink-0" /><span className="nv-caret ml-0" /></span>}
        </code>
      </pre>

      {/* Status bar */}
      <div className="flex items-center justify-between gap-3 border-t border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-[10.5px] text-white/50 sm:text-[11px]">
        <span className="flex items-center gap-2">
          <span className={`size-1.5 rounded-full ${pos.done ? "bg-emerald-400" : "bg-[#ff9a3c] animate-pulse"}`} />
          {pos.done ? "Deployed" : "Typing…"}
        </span>
        <span>{snip.lang} · {codeCount} lines · UTF-8</span>
      </div>
    </div>
  );
}
