"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type State = "idle" | "loading" | "done";

/**
 * Thin logo-gradient bar at the top of the window while a page is loading.
 * Starts when an internal link to another page is clicked, completes when the new route renders.
 */
export function NavigationProgress() {
  const pathname = usePathname();
  const [state, setState] = useState<State>("idle");

  // Route changed: finish the bar (adjusting state during render, no effect needed)
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    if (state === "loading") setState("done");
  }

  // Start on clicks to internal links that lead to a different page
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest("a");
      if (!a || !a.href || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
      setState("loading");
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // Fade out after finishing; give up quietly if a navigation never completes
  useEffect(() => {
    if (state === "idle") return;
    const t = setTimeout(() => setState("idle"), state === "done" ? 450 : 15000);
    return () => clearTimeout(t);
  }, [state]);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]" aria-hidden>
      <div
        className="bg-logo-gradient h-full shadow-[0_0_10px_rgb(240_67_122/0.6)]"
        style={{
          width: state === "idle" ? "0%" : state === "loading" ? "85%" : "100%",
          opacity: state === "loading" ? 1 : 0, // "done": fills to 100%, then fades (opacity transition is delayed)
          transition:
            state === "loading" ? "width 6s cubic-bezier(0.1, 0.7, 0.2, 1), opacity 0.15s"
            : state === "done" ? "width 0.2s ease-out, opacity 0.25s ease 0.2s"
            : "none",
        }}
      />
    </div>
  );
}
