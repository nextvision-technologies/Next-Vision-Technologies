"use client";

import { useEffect, useRef } from "react";

/**
 * Number that counts up from 0 when it scrolls into view (e.g. "100+").
 * The real value is in the server HTML (good for SEO and no-JS visitors) and is what screen readers hear;
 * only the visible digits animate. Visitors who prefer reduced motion see the final value straight away.
 */
export function CountUp({ value, suffix = "", duration = 1800, className = "" }: { value: number; suffix?: string; duration?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.textContent = `0${suffix}`;
    let raf = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3); // ease-out: fast start, gentle finish
        el.textContent = `${Math.round(eased * value)}${suffix}`;
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [value, suffix, duration]);

  return (
    <span className={className}>
      <span className="sr-only">{value}{suffix}</span>
      <span ref={ref} aria-hidden className="tabular-nums">{value}{suffix}</span>
    </span>
  );
}
