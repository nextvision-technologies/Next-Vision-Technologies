"use client";

import { useEffect, useState } from "react";

/**
 * Types and deletes each word in turn. Decorative: pair it with a screen-reader sentence.
 * Visitors who prefer reduced motion see the words change without the typing animation.
 */
export function Typewriter({ words, className = "" }: { words: string[]; className?: string }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(words[0]);
  const [phase, setPhase] = useState<"hold" | "deleting" | "typing">("hold");

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const word = words[index];
    let t: ReturnType<typeof setTimeout>;

    if (reduce) {
      t = setTimeout(() => { const n = (index + 1) % words.length; setIndex(n); setText(words[n]); }, 2600);
    } else if (phase === "hold") {
      t = setTimeout(() => setPhase("deleting"), 1900);
    } else if (phase === "deleting") {
      t = text.length > 0
        ? setTimeout(() => setText(text.slice(0, -1)), 38)
        : setTimeout(() => { setIndex((index + 1) % words.length); setPhase("typing"); }, 250);
    } else {
      t = text.length < word.length
        ? setTimeout(() => setText(word.slice(0, text.length + 1)), 75)
        : setTimeout(() => setPhase("hold"), 0);
    }
    return () => clearTimeout(t);
  }, [index, phase, text, words]);

  return (
    <span className={className} aria-hidden>
      {text}
      <span className="ml-1 inline-block h-[0.85em] w-[3px] translate-y-[0.08em] animate-pulse rounded-full bg-glow-400 align-baseline" />
    </span>
  );
}
