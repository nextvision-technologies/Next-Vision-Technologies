"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

/**
 * Site-wide smooth scrolling (Lenis).
 * - In-page anchor links (#section) glide to their target, offset below the sticky header.
 * - Turned off for visitors who prefer reduced motion.
 * - Elements with `data-lenis-prevent` (menus, scrollable lists) keep their own native scrolling.
 */
export function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 1,
      smoothWheel: true,
      anchors: { offset: -140 },
      autoRaf: true,
    });
    lenisRef.current = lenis;
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Start each new page at the top without a long glide
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
