"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CalendarDays, ChevronDown, Menu, X, Mail, Phone } from "lucide-react";
import { mainNav } from "@/content/navigation";
import { site } from "@/content/site";
import { buttonClass } from "@/components/ui/Button";
import { SocialIcon, SocialLinks } from "@/components/ui/SocialIcons";
import { whatsappLink } from "@/content/site";
import { MegaMenuPanel } from "./MegaMenu";

function TopBar() {
  return (
    <div className="bg-brand-gradient hidden text-white md:block">
      <div className="container-page flex h-11 items-center justify-between text-sm">
        <div className="flex items-center gap-7">
          <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 font-medium hover:opacity-80">
            <Mail className="size-4" aria-hidden /> {site.email}
          </a>
          {site.phones.map((p) => (
            <a key={p.label} href={p.href} className="inline-flex items-center gap-2 font-medium hover:opacity-80">
              <Phone className="size-4" aria-hidden />
              <span className="font-bold">{p.label === "Pakistan" ? "PK" : "UK"}</span> {p.value}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <SocialLinks className="[&_a]:size-8 [&_a]:border-0 [&_svg]:size-4" />
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="inline-flex size-8 items-center justify-center rounded-full hover:opacity-80">
            <SocialIcon name="whatsapp" className="size-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close menus on route change
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpenMenu(null);
    setMobile(false);
  }

  // Hover intent: open immediately, close after a short delay so the pointer can travel to the panel
  const open = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 160);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && (setOpenMenu(null), setMobile(false));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const active = mainNav.find((g) => g.label === openMenu);

  return (
    <>
      <TopBar />
      <header className={`sticky top-0 z-40 bg-white/95 backdrop-blur transition-shadow ${scrolled || active ? "shadow-card" : ""}`}>
        <nav ref={navRef} className="container-page relative flex h-20 items-center justify-between gap-6 lg:h-24" aria-label="Main"
          onMouseLeave={scheduleClose}>
          <Link href="/" className="shrink-0" aria-label={`${site.name} home`}>
            <Image src="/brand/logo-tagline.svg" alt={`${site.name}: ${site.tagline}`} width={462} height={108} priority
              className="h-14 w-auto sm:h-16 lg:h-[4.5rem]" />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {mainNav.map((g) => {
              const isOpen = openMenu === g.label;
              return (
                <li key={g.label} onMouseEnter={() => open(g.label)}>
                  <button type="button" aria-expanded={isOpen} aria-haspopup="true"
                    onClick={() => (isOpen ? setOpenMenu(null) : open(g.label))}
                    className={`inline-flex h-11 items-center gap-1.5 rounded-full px-4 text-[15px] font-semibold transition ${isOpen ? "text-brand-600" : "text-navy-900 hover:text-brand-600"}`}>
                    {g.label}
                    <ChevronDown className={`size-4 transition duration-200 ${isOpen ? "rotate-180" : ""}`} aria-hidden />
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <span className="hidden sm:block">
              <Link href="/book-demo" className={buttonClass("primary", "md", "h-12 px-6")}>
                <CalendarDays className="size-4" aria-hidden /> Book a Demo
              </Link>
            </span>
            <button type="button" className="inline-flex size-11 items-center justify-center rounded-full border border-line lg:hidden"
              onClick={() => setMobile(true)} aria-label="Open menu" aria-expanded={mobile}>
              <Menu className="size-5" />
            </button>
          </div>

          {/* Mega menu panel: hover bridge (pt-3) keeps it open while the pointer moves down */}
          {active && (
            <div className="absolute top-full left-1/2 hidden w-[min(76rem,calc(100vw-2rem))] -translate-x-1/2 pt-1 lg:block"
              onMouseEnter={() => open(active.label)} onMouseLeave={scheduleClose}>
              <div key={active.label} className="animate-rise [animation-duration:.25s]">
                <MegaMenuPanel group={active} />
              </div>
            </div>
          )}
        </nav>
      </header>

      {mobile && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="absolute inset-0 bg-navy-950/50" onClick={() => setMobile(false)} />
          <div className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col overflow-y-auto bg-white p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            <div className="flex items-center justify-between">
              <Image src="/brand/logo-tagline.svg" alt={site.name} width={462} height={108} className="h-12 w-auto" />
              <button type="button" onClick={() => setMobile(false)} aria-label="Close menu"
                className="inline-flex size-11 items-center justify-center rounded-full border border-line">
                <X className="size-5" />
              </button>
            </div>
            <ul className="mt-6 flex flex-col divide-y divide-line">
              <li><Link href="/" className="block py-3.5 font-semibold text-navy-900">Home</Link></li>
              {mainNav.map((g) => (
                <li key={g.label}>
                  <details className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between py-3.5 font-semibold text-navy-900">
                      {g.label}
                      <ChevronDown className="size-4 transition group-open:rotate-180" aria-hidden />
                    </summary>
                    <ul className="flex flex-col pb-3">
                      {g.children.map((c) => (
                        <li key={c.href}><Link href={c.href} className="block py-2 pl-3 text-sm text-muted hover:text-brand-600">{c.label}</Link></li>
                      ))}
                      {g.footer?.map((f) => (
                        <li key={f.href}><Link href={f.href} className="block py-2 pl-3 text-sm font-semibold text-brand-600">{f.label}</Link></li>
                      ))}
                    </ul>
                  </details>
                </li>
              ))}
            </ul>
            <Link href="/book-demo" className={buttonClass("primary", "lg", "mt-6")}>Book a Demo</Link>
            <Link href="/contact" className={buttonClass("secondary", "lg", "mt-3")}>Get a free quote</Link>
          </div>
        </div>
      )}
    </>
  );
}
