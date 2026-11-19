"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hero "hacker" terminal: a secure-shell session that boots, decrypts a message and then
 * types "Welcome to Next Vision Technologies" in large letters, over a faint matrix rain.
 * The sequence clears and replays in a loop.
 *
 * - Decorative (aria-hidden): the hero heading already says the same thing in words.
 * - Pauses (typing and rain) while off screen or when the tab is hidden.
 * - Visitors who prefer reduced motion see the finished screen, with no rain or typing.
 */

const PROMPT_USER = "root@nextvision";
const WELCOME = "Welcome to Next Vision Technologies";
const BREAK_AT = "Welcome to ".length; // the welcome wraps onto a second line here
const BAR_STEPS = 24;
const GLYPHS = "01ABCDEF#$%&@*+=<>/\\|{}[]アイウエオカキクケコ";

type Step =
  | { kind: "cmd"; text: string } // typed after the prompt
  | { kind: "out"; text: string; tone: "ok" | "info" | "warn" } // printed line
  | { kind: "bar" } // decrypt progress bar
  | { kind: "welcome" }; // the big typed message

const script: Step[] = [
  { kind: "cmd", text: "ssh guest@nextvision.tech" },
  { kind: "out", tone: "info", text: "Connecting to nextvision.tech:22 ..." },
  { kind: "out", tone: "ok", text: "Encrypted tunnel established (AES-256)" },
  { kind: "cmd", text: "./decrypt --file welcome.enc" },
  { kind: "bar" },
  { kind: "out", tone: "ok", text: "Access granted. Loading message..." },
  { kind: "welcome" },
  { kind: "out", tone: "warn", text: "AI · SaaS · Websites · Marketing" },
];

const stepLength = (s: Step) => (s.kind === "bar" ? BAR_STEPS : s.kind === "welcome" ? WELCOME.length : s.text.length);
const randomGlyphs = (n: number) => Array.from({ length: n }, () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]).join("");

type Pos = { step: number; ch: number; done: boolean; glyphs: string };
const START: Pos = { step: 0, ch: 0, done: false, glyphs: "" };
const FINISHED: Pos = { step: script.length, ch: 0, done: true, glyphs: "" };

function Prompt() {
  return (
    <>
      <span className="text-[#39ff88]">{PROMPT_USER}</span>
      <span className="text-white/50">:</span>
      <span className="text-[#5ee7ff]">~</span>
      <span className="text-white/50">$ </span>
    </>
  );
}

const outTone = { ok: "text-[#39ff88]", info: "text-[#8be9fd]/80", warn: "text-[#ffb26b]" };
const outIcon = { ok: "[✓] ", info: "[*] ", warn: ">> " };

/** One step of the script, showing its first `chars` characters */
function StepView({ step, chars, current, glyphs }: { step: Step; chars: number; current: boolean; glyphs: string }) {
  const caret = current ? <span className="nv-caret nv-caret--hack" /> : null;
  switch (step.kind) {
    case "cmd":
      return <div className="whitespace-pre"><Prompt /><span className="text-[#e6fff1]">{step.text.slice(0, chars)}</span>{caret}</div>;
    case "out":
      return <div className={`whitespace-pre ${outTone[step.tone]}`}>{outIcon[step.tone]}{step.text.slice(0, chars)}{caret}</div>;
    case "bar": {
      const pct = Math.round((chars / BAR_STEPS) * 100);
      return (
        <div className="whitespace-pre text-[#39ff88]">
          <span className="text-[#8be9fd]/80">Decrypting </span>
          [<span>{"█".repeat(chars)}</span><span className="text-[#39ff88]/20">{"░".repeat(BAR_STEPS - chars)}</span>]
          <span className="text-white/80"> {String(pct).padStart(3, " ")}%</span>
        </div>
      );
    }
    case "welcome": {
      const typed = WELCOME.slice(0, chars);
      const first = typed.slice(0, BREAK_AT);
      const second = typed.slice(BREAK_AT);
      return (
        <div className="nv-hack-welcome my-3 font-bold tracking-tight">
          <span className="block text-[#e6fff1]">{first}{chars < BREAK_AT && <>{current && <span className="text-[#39ff88]/70">{glyphs}</span>}{caret}</>}</span>
          <span className="nv-hack-grad block min-h-[1.2em]">
            {second}
            {chars >= BREAK_AT && current && <span className="text-[#39ff88]/70 [-webkit-text-fill-color:currentColor]">{glyphs}</span>}
            {chars >= BREAK_AT && caret}
          </span>
        </div>
      );
    }
  }
}

/** Faint falling-glyph rain behind the text. Draws only while `running`. */
function MatrixRain({ running }: { running: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !running) return;
    const size = 14;
    let drops: number[] = [];
    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
      drops = Array.from({ length: Math.ceil(width / size) }, () => Math.random() * -(height / size));
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let raf = 0, last = 0;
    const draw = (t: number) => {
      raf = requestAnimationFrame(draw);
      if (t - last < 55) return; // about 18 frames a second is enough for a background effect
      last = t;
      ctx.fillStyle = "rgba(5, 7, 12, 0.18)"; // fade the previous frame to leave trails
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${size - 2}px ui-monospace, Consolas, monospace`;
      drops.forEach((y, i) => {
        ctx.fillStyle = Math.random() > 0.96 ? "#c4ffd9" : "#22c55e";
        ctx.fillText(GLYPHS[Math.floor(Math.random() * GLYPHS.length)], i * size, y * size);
        drops[i] = y * size > canvas.height && Math.random() > 0.975 ? 0 : y + 1;
      });
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [running]);
  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 size-full opacity-[0.16]" />;
}

export function CodeTerminal({ className = "" }: { className?: string }) {
  const [pos, setPos] = useState<Pos>(START);
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
    if (!active || reduced) return;
    const go = (p: Pos, ms: number) => setTimeout(() => setPos(p), ms);
    let t: ReturnType<typeof setTimeout>;

    if (pos.done) {
      t = go(START, 5200); // hold the finished screen, then clear and replay
    } else if (pos.step >= script.length) {
      t = go({ ...pos, done: true }, 0);
    } else {
      const step = script[pos.step];
      const len = stepLength(step);
      if (pos.ch < len) {
        let delay: number;
        if (step.kind === "cmd") delay = pos.ch === 0 ? 450 : 38 + Math.random() * 70; // a person typing
        else if (step.kind === "out") delay = pos.ch === 0 ? 260 : 9; // machine output
        else if (step.kind === "bar") delay = 45 + Math.random() * 90;
        else delay = pos.ch === 0 ? 500 : WELCOME[pos.ch] === " " ? 60 : 75 + Math.random() * 45; // the welcome
        const glyphs = step.kind === "welcome" ? randomGlyphs(Math.min(3, len - pos.ch - 1)) : "";
        t = go({ ...pos, ch: pos.ch + 1, glyphs }, delay);
      } else {
        t = go({ step: pos.step + 1, ch: 0, done: false, glyphs: "" }, step.kind === "welcome" ? 700 : 220);
      }
    }
    return () => clearTimeout(t);
  }, [pos, active, reduced]);

  // Reduced motion: always show the finished screen
  const view = reduced ? FINISHED : pos;
  const shown = script.slice(0, Math.min(view.step + 1, script.length));

  return (
    <div ref={rootRef} aria-hidden
      className={`nv-terminal nv-terminal--hack overflow-hidden rounded-2xl border border-[#39ff88]/25 bg-[#05070c]/95 ${className}`}>
      <div className="bg-logo-gradient h-0.5" />

      {/* Title bar */}
      <div className="flex items-center gap-3 border-b border-[#39ff88]/15 bg-[#0b1210] px-4 py-2.5 font-mono text-[11px] sm:text-xs">
        <div className="flex shrink-0 gap-1.5">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="min-w-0 flex-1 truncate text-center text-[#39ff88]/80">{PROMPT_USER}: ~/secure-shell</span>
        <span className="hidden shrink-0 rounded border border-[#39ff88]/30 px-1.5 py-0.5 text-[10px] text-[#39ff88]/80 sm:inline">SSH · AES-256</span>
      </div>

      {/* Screen */}
      <div className="nv-terminal__code relative overflow-hidden font-mono text-[11px] leading-[1.7] sm:text-[12.5px]">
        {!reduced && <MatrixRain running={active} />}
        <div className="nv-scanlines pointer-events-none absolute inset-0" />
        <div className="relative px-4 py-4 sm:px-5">
          {shown.map((s, i) => (
            <StepView key={i} step={s} chars={i < view.step || view.done ? stepLength(s) : view.ch} current={i === view.step && !view.done} glyphs={view.glyphs} />
          ))}
          {view.done && <div className="whitespace-pre"><Prompt /><span className="nv-caret nv-caret--hack" /></div>}
        </div>
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between gap-3 border-t border-[#39ff88]/15 bg-[#0b1210] px-4 py-2 font-mono text-[10.5px] text-[#39ff88]/60 sm:text-[11px]">
        <span className="flex items-center gap-2">
          <span className={`size-1.5 rounded-full ${view.done ? "bg-[#39ff88]" : "animate-pulse bg-[#ffb26b]"}`} />
          {view.done ? "Connected · secure" : "Establishing session…"}
        </span>
        <span>bash · UTF-8</span>
      </div>
    </div>
  );
}
