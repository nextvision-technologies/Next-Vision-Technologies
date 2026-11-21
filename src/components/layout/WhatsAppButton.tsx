"use client";

import { useState } from "react";
import { whatsappLink } from "@/content/site";
import { SocialIcon } from "@/components/ui/SocialIcons";

const teams = [
  {
    label: "PK Team",
    flag: "🇵🇰",
    href: whatsappLink(),
  },
  {
    label: "UK Team",
    flag: "🇬🇧",
    href:
      "https://wa.me/447448091908?text=" +
      encodeURIComponent("Hi Next Vision, I'd like to discuss a project."),
  },
] as const;

export function WhatsAppButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed left-[max(1.25rem,env(safe-area-inset-left))] bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-40 flex flex-col items-center gap-2">
      {/* Sub-buttons — shown above the main button when open */}
      <div
        className={`flex flex-col items-center gap-2 transition-all duration-300 ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {[...teams].reverse().map((team) => (
          <a
            key={team.label}
            href={team.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Chat with our ${team.label} on WhatsApp`}
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white shadow-lift transition hover:scale-105 hover:bg-[#1ebe59] whitespace-nowrap"
          >
            <span className="text-base leading-none">{team.flag}</span>
            <SocialIcon name="whatsapp" className="size-4" />
            <span>{team.label}</span>
          </a>
        ))}
      </div>

      {/* Main toggle button */}
      <button
        type="button"
        aria-label={open ? "Close WhatsApp options" : "Open WhatsApp options"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift transition hover:scale-105"
      >
        <SocialIcon
          name="whatsapp"
          className={`size-7 transition-transform duration-300 ${
            open ? "scale-90 opacity-80" : "scale-100 opacity-100"
          }`}
        />
      </button>
    </div>
  );
}
