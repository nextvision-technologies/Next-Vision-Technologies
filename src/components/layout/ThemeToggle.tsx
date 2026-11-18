"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

const KEY = "nv-theme";

/**
 * Runs before the page paints (inlined in <head>) so there is no light flash.
 * Uses the saved choice, otherwise the visitor's system setting.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${KEY}");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d);}catch(e){}})();`;

// Read the current theme from the <html> class and re-render when it changes
function subscribe(cb: () => void) {
  const obs = new MutationObserver(cb);
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => obs.disconnect();
}
const isDark = () => document.documentElement.classList.contains("dark");

export function ThemeToggle({ className = "" }: { className?: string }) {
  const dark = useSyncExternalStore(subscribe, isDark, () => false);

  function toggle() {
    const next = !isDark();
    document.documentElement.classList.toggle("dark", next);
    try { localStorage.setItem(KEY, next ? "dark" : "light"); } catch { /* storage blocked */ }
  }

  return (
    <button type="button" onClick={toggle} role="switch" aria-checked={dark}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"} title={dark ? "Light mode" : "Dark mode"}
      className={`relative inline-flex h-10 w-[4.25rem] shrink-0 items-center rounded-full border border-line bg-surface p-1 transition hover:border-brand-600/40 ${className}`}>
      <span className={`bg-brand-gradient absolute top-1 left-1 inline-flex size-8 items-center justify-center rounded-full text-white shadow-lift transition-transform duration-300 ${dark ? "translate-x-[1.75rem]" : ""}`}>
        {dark ? <Moon className="size-4" aria-hidden /> : <Sun className="size-4" aria-hidden />}
      </span>
      <Sun className={`ml-1.5 size-4 transition ${dark ? "text-muted" : "opacity-0"}`} aria-hidden />
      <Moon className={`ml-auto mr-1.5 size-4 transition ${dark ? "opacity-0" : "text-muted"}`} aria-hidden />
    </button>
  );
}
