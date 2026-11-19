"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import type Lenis from "lenis";
import "lenis/dist/lenis.css";

/**
 * Smooth wheel scrolling (Lenis), for desktop mouse and trackpad users only.
 * - Phones and tablets keep native touch scrolling, and never download Lenis at all.
 * - Turned off for visitors who prefer reduced motion.
 * - In-page anchor links (#section) glide to their target, offset below the sticky header.
 * - Elements with `data-lenis-prevent` (menus, scrollable lists) keep their own native scrolling.
 */
export function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const wanted = window.matchMedia("(pointer: fine) and (hover: hover) and (prefers-reduced-motion: no-preference)");
    if (!wanted.matches) return;

    let cancelled = false;
    import("lenis").then(({ default: LenisClass }) => {
      if (cancelled) return;
      lenisRef.current = new LenisClass({
        lerp: 0.09,
        wheelMultiplier: 1,
        smoothWheel: true,
        anchors: { offset: -140 },
        autoRaf: true,
      });
    });
    return () => {
      cancelled = true;
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Start each new page at the top without a long glide
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
