"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CalendarDays, ChevronDown, Menu, X, Mail, Phone } from "lucide-react";
import { mainNav } from "@/content/navigation";
import { emailLink, site } from "@/content/site";
import { buttonClass } from "@/components/ui/Button";
import { SocialIcon, SocialLinks } from "@/components/ui/SocialIcons";
import { useScrolledPast } from "@/hooks/useScroll";
import { MegaMenuPanel } from "./MegaMenu";
import { ThemeToggle } from "./ThemeToggle";

function TopBar() {
  return (
    <div className="section-dark hidden text-white md:block">
      <div className="container-page flex h-9 items-center justify-between text-[13px]">
        <div className="flex items-center gap-5 lg:gap-7">
          <a href={emailLink()} className="inline-flex items-center gap-2 font-medium whitespace-nowrap hover:opacity-80">
            <Mail className="size-3.5" aria-hidden /> {site.email}
          </a>
          {site.phones.map((p) => (
            // Tablets: the WhatsApp number is hidden here to keep one line (it's in the floating button and footer)
            <a key={p.label} href={p.href} className={`items-center gap-2 font-medium whitespace-nowrap hover:opacity-80 ${p.whatsapp ? "hidden lg:inline-flex" : "inline-flex"}`}
              {...(p.whatsapp ? { target: "_blank", rel: "noopener noreferrer", "aria-label": `WhatsApp ${p.value}` } : {})}>
              {p.whatsapp ? <SocialIcon name="whatsapp" className="size-3.5" /> : <Phone className="size-3.5" aria-hidden />}
              <span className="font-bold">{p.label === "Pakistan" ? "PK" : "UK"}</span> {p.value}
            </a>
          ))}
        </div>
        <SocialLinks className="gap-1 [&_a]:size-7 [&_a]:border-0 [&_svg]:size-3.5" />
      </div>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const scrolled = useScrolledPast(8);
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
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && (setOpenMenu(null), setMobile(false));
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const active = mainNav.find((g) => g.label === openMenu);

  return (
    <>
      <TopBar />
      <header className={`sticky top-0 z-40 bg-card/95 transition-shadow md:backdrop-blur ${scrolled || active ? "shadow-card" : ""}`}>
        <nav ref={navRef} className="container-page relative flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]" aria-label="Main"
          onMouseLeave={scheduleClose}>
          <Link href="/" className="shrink-0" aria-label={`${site.name} home`}>
            <Image src="/brand/logo-header.webp" alt={`${site.name}: ${site.tagline}`} width={211} height={44} priority
              className="h-9 w-auto sm:h-10 lg:h-11 dark:hidden" />
            <Image src="/brand/logo-header-white.webp" alt={`${site.name}: ${site.tagline}`} width={211} height={44} priority
              className="hidden h-9 w-auto sm:h-10 lg:h-11 dark:block" />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {/* Plain link (no dropdown): hovering it closes any open mega menu */}
            <li onMouseEnter={() => { if (closeTimer.current) clearTimeout(closeTimer.current); setOpenMenu(null); }}>
              <Link href="/" aria-current={pathname === "/" ? "page" : undefined}
                className={`inline-flex h-10 items-center rounded-full px-3.5 text-sm font-semibold transition ${pathname === "/" ? "text-brand-600" : "text-heading hover:text-brand-600"}`}>
                Home
              </Link>
            </li>
            {mainNav.map((g) => {
              const isOpen = openMenu === g.label;
              return (
                <li key={g.label} onMouseEnter={() => open(g.label)}>
                  <button type="button" aria-expanded={isOpen} aria-haspopup="true"
                    onClick={() => (isOpen ? setOpenMenu(null) : open(g.label))}
                    className={`inline-flex h-10 items-center gap-1 rounded-full px-2.5 text-sm xl:px-3.5 font-semibold transition ${isOpen ? "text-brand-600" : "text-heading hover:text-brand-600"}`}>
                    {g.label}
                    <ChevronDown className={`size-4 transition duration-200 ${isOpen ? "rotate-180" : ""}`} aria-hidden />
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2.5">
            <ThemeToggle />
            <span className="hidden sm:block">
              <Link href="/book-demo" className={buttonClass("primary", "md", "h-10 px-5")}>
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
            <div className={`absolute top-full left-1/2 hidden -translate-x-1/2 pt-1 lg:block ${active.columns === 2 ? "w-[min(56rem,calc(100vw-2rem))]" : "w-[min(44rem,calc(100vw-2rem))]"}`}
              onMouseEnter={() => open(active.label)} onMouseLeave={scheduleClose}
              onClick={(e) => { if ((e.target as HTMLElement).closest("a")) { if (closeTimer.current) clearTimeout(closeTimer.current); setOpenMenu(null); } }}>
              <div key={active.label} className="animate-rise [animation-duration:.25s]">
                <MegaMenuPanel group={active} />
              </div>
            </div>
          )}
        </nav>
      </header>

      {mobile && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="absolute inset-0 bg-night-950/50" onClick={() => setMobile(false)} />
          <div data-lenis-prevent className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col overflow-y-auto bg-card p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]"
            onClick={(e) => { if ((e.target as HTMLElement).closest("a")) setMobile(false); }}>
            <div className="flex items-center justify-between">
              <Image src="/brand/logo-header.webp" alt={site.name} width={191} height={40} className="h-10 w-auto dark:hidden" />
              <Image src="/brand/logo-header-white.webp" alt={site.name} width={191} height={40} className="hidden h-10 w-auto dark:block" />
              <button type="button" onClick={() => setMobile(false)} aria-label="Close menu"
                className="inline-flex size-11 items-center justify-center rounded-full border border-line">
                <X className="size-5" />
              </button>
            </div>
            <ul className="mt-6 flex flex-col divide-y divide-line">
              <li><Link href="/" className="block py-3.5 font-semibold text-heading">Home</Link></li>
              {mainNav.map((g) => (
                <li key={g.label}>
                  <details className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between py-3.5 font-semibold text-heading">
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
            {/* Social links (the top bar with them is hidden on phones) */}
            <SocialLinks className="mt-6 justify-center text-heading" />
          </div>
        </div>
      )}
    </>
  );
}
