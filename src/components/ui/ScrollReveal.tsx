"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Animates elements marked with `data-reveal` (up | left | right | zoom) when they scroll into view.
 * Children of `data-reveal-stagger` animate one after another.
 * Content stays visible if JavaScript is off; reduced-motion visitors see no animation.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;

    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal], [data-reveal-stagger] > *"));
    document.querySelectorAll<HTMLElement>("[data-reveal-stagger]").forEach((group) => {
      Array.from(group.children).forEach((child, i) => (child as HTMLElement).style.setProperty("--reveal-delay", `${Math.min(i, 8) * 90}ms`));
    });

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-revealed");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    targets.forEach((t) => io.observe(t));
    root.classList.add("reveal-ready");

    return () => io.disconnect();
  }, [pathname]);

  return null;
}
