"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Link2 } from "lucide-react";
import { SocialIcon } from "@/components/ui/SocialIcons";
import { useScrollEffect } from "@/hooks/useScroll";

/** Thin bar at the top of the window showing how far the reader has scrolled */
export function ReadingProgress() {
  // Writes straight to the bar's transform: no React re-render on every scroll frame
  const barRef = useRef<HTMLDivElement>(null);
  useScrollEffect(() => {
    const el = document.getElementById("article-body");
    if (!el || !barRef.current) return;
    const rect = el.getBoundingClientRect();
    const total = rect.height - window.innerHeight * 0.6;
    const p = Math.min(1, Math.max(0, -rect.top / Math.max(total, 1)));
    barRef.current.style.transform = `scaleX(${p})`;
  });
  return (
    <div className="fixed inset-x-0 top-0 z-50 h-1 bg-transparent" aria-hidden>
      <div ref={barRef} className="bg-logo-gradient h-full origin-left scale-x-0" />
    </div>
  );
}

/** Table of contents that highlights the section in view */
export function TableOfContents({ items }: { items: { id: string; text: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-120px 0px -60% 0px" },
    );
    items.forEach((i) => { const el = document.getElementById(i.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [items]);
  return (
    <nav aria-label="On this page">
      <p className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">On this page</p>
      <ol className="mt-4 flex flex-col border-l border-line">
        {items.map((i) => (
          <li key={i.id}>
            <a href={`#${i.id}`}
              className={`-ml-px block border-l-2 py-1.5 pl-4 text-sm leading-snug transition ${active === i.id ? "border-brand-600 font-semibold text-brand-600" : "border-transparent text-muted hover:text-heading"}`}>
              {i.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Share links plus a copy-link button */
export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const enc = encodeURIComponent;
  const links = [
    { name: "whatsapp" as const, label: "Share on WhatsApp", href: `https://wa.me/?text=${enc(`${title} ${url}`)}`, cls: "hover:bg-[#25D366]" },
    { name: "facebook" as const, label: "Share on Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`, cls: "hover:bg-[#1877F2]" },
    { name: "linkedin" as const, label: "Share on LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`, cls: "hover:bg-[#0A66C2]" },
  ];
  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked: the link is still in the address bar */
    }
  }
  return (
    <div>
      <p className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">Share this article</p>
      <div className="mt-3 flex gap-2">
        {links.map((l) => (
          <a key={l.name} href={l.href} target="_blank" rel="noopener noreferrer" aria-label={l.label}
            className={`inline-flex size-10 items-center justify-center rounded-full bg-surface text-heading transition hover:text-white ${l.cls}`}>
            <SocialIcon name={l.name} className="size-4" />
          </a>
        ))}
        <button type="button" onClick={copy} aria-label="Copy link"
          className="inline-flex size-10 items-center justify-center rounded-full bg-surface text-heading transition hover:bg-night-900 hover:text-white">
          {copied ? <Check className="size-4" /> : <Link2 className="size-4" />}
        </button>
      </div>
      <p className="mt-2 h-4 text-xs text-brand-600" role="status">{copied ? "Link copied" : ""}</p>
    </div>
  );
}
