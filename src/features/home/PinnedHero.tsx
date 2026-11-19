"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, BadgeCheck, ChevronDown, Phone, Sparkles } from "lucide-react";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { subscribeScroll } from "@/hooks/useScroll";
import { HeroAnimation } from "./HeroAnimation";
import { CodeTerminal } from "./CodeTerminal";
import { Typewriter } from "./Typewriter";

const typedWords = ["AI Chatbots", "AI Automation", "SaaS Products", "Websites", "Mobile Apps", "Ad Campaigns"];

/**
 * Scroll-driven pinned hero: the heading and calls to action sit on the left; a rounded media card
 * on the right (with a live coding terminal) expands to fill the screen as the visitor scrolls,
 * then a caption rises in over it. The heading types out what we build (Typewriter).
 * Media = `video` when provided, otherwise the animated brand backdrop (HeroAnimation).
 * All motion is driven by CSS custom properties written from the shared rAF-throttled scroll handler
 * (styles live in globals.css under "Pinned expanding hero").
 */
type Props = { video?: { src: string; poster?: string } };

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const range = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);

export function PinnedHero({ video }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const stickRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stick = stickRef.current;
    const intro = introRef.current;
    const caption = captionRef.current;
    if (!section || !stick || !intro || !caption) return;
    const capItems = Array.from(caption.querySelectorAll<HTMLElement>("[data-cap]"));

    const apply = (p: number) => {
      const s = section.style;
      const introT = range(p, 0, 0.3);
      const cap = range(p, 0.55, 1);
      s.setProperty("--pc", easeInOut(range(p, 0, 0.6)).toFixed(4));
      s.setProperty("--intro", introT.toFixed(4));
      s.setProperty("--fade", range(p, 0, 0.18).toFixed(4));
      s.setProperty("--shade", range(p, 0.35, 0.75).toFixed(4));
      capItems.forEach((el, i) => el.style.setProperty("--c", clamp((cap - i * 0.15) / 0.55).toFixed(4)));
      // Keep hidden layers out of the tab order and away from clicks
      intro.inert = introT > 0.95;
      caption.inert = cap < 0.5;
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      apply(1);
      videoRef.current?.pause();
      return;
    }

    let stickTop = 0;
    let distance = 1;
    const measure = () => {
      stickTop = parseFloat(getComputedStyle(stick).top) || 0;
      distance = section.offsetHeight - stick.offsetHeight;
    };

    const update = () => {
      const scrolled = stickTop - section.getBoundingClientRect().top;
      apply(distance > 0 ? clamp(scrolled / distance) : 1);
    };
    const onResize = () => {
      measure();
      update();
    };

    measure();
    update();
    const unsubscribe = subscribeScroll(update); // shared rAF-throttled listener (hooks/useScroll)
    window.addEventListener("resize", onResize);
    return () => {
      unsubscribe();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const stat = site.stats[0];
  const phone = site.phones[0];

  return (
    <section ref={sectionRef} className="pinned-hero section-dark text-white" aria-label="Introduction">
      <div ref={stickRef} className="pinned-hero__stick">
        {/* 1. Media card on the right that expands, with the live coding terminal on top */}
        <div className="pinned-hero__clip" aria-hidden>
          <div className="pinned-hero__media">
            {video ? (
              <video ref={videoRef} src={video.src} poster={video.poster} muted loop autoPlay playsInline preload="metadata" />
            ) : (
              <HeroAnimation />
            )}
          </div>
          <div className="pinned-hero__terminal">
            <CodeTerminal />
          </div>
        </div>

        {/* 2. Shade for caption contrast */}
        <div className="pinned-hero__shade" aria-hidden />

        {/* 3. Intro copy (left side on desktop) */}
        <div ref={introRef} className="pinned-hero__intro">
          <div className="container-page flex h-full flex-col justify-end pb-24 min-[820px]:justify-center min-[820px]:pb-16">
            <div className="flex max-w-xl flex-col gap-5 sm:gap-6 min-[820px]:w-[46%]">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-white/80 uppercase md:backdrop-blur sm:text-xs">
                <span className="size-1.5 rounded-full bg-emerald-400" aria-hidden />
                Pakistan · United Kingdom
              </span>
              <h1 className="text-[2.4rem] leading-[1.05] font-bold tracking-tight sm:text-5xl xl:text-[4rem]">
                <span className="sr-only">We build AI chatbots, AI automation, SaaS products, websites, mobile apps and ad campaigns for your business.</span>
                <span aria-hidden className="block">We build</span>
                <Typewriter words={typedWords} className="text-gradient block min-h-[1.1em] font-semibold whitespace-nowrap italic" />
                <span aria-hidden className="block text-[0.72em] text-white/90">for your business</span>
              </h1>
              <p className="max-w-md text-lg leading-relaxed text-white/75">
                One team in Pakistan and the UK that plans, builds and grows your digital business.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button href="/contact" size="lg">Get a free quote <ArrowRight className="size-4" aria-hidden /></Button>
                <Button href={phone.href} variant="light" size="lg"><Phone className="size-4" aria-hidden /> Call now</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Floating stat chip (desktop only) */}
        <div className="pinned-hero__chip pinned-hero__fade" aria-hidden>
          <span className="solid-primary inline-flex size-9 items-center justify-center rounded-full"><BadgeCheck className="size-5" /></span>
          <span className="flex flex-col leading-tight">
            <strong className="font-display text-lg font-extrabold">{stat.value}</strong>
            <span className="text-xs text-white/70">{stat.label}</span>
          </span>
        </div>

        {/* 4. Caption shown once expanded */}
        <div ref={captionRef} className="pinned-hero__caption" inert>
          <div className="container-page flex h-full flex-col items-start justify-end gap-5 pb-28 sm:pb-32">
            <span data-cap className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.14em] uppercase md:backdrop-blur sm:text-xs">
              <Sparkles className="size-3.5 text-brand-400" aria-hidden />
              Free consultation
            </span>
            <h2 data-cap className="max-w-3xl text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-6xl">
              Custom software and <em className="text-gradient font-serif font-semibold italic">affordable</em> packages
            </h2>
            <div data-cap>
              <Button href="/book-demo" size="lg">Book a free demo <ArrowRight className="size-4" aria-hidden /></Button>
            </div>
          </div>
        </div>

        {/* 5. Scroll hint */}
        <div className="pinned-hero__hint pinned-hero__fade" aria-hidden>
          Scroll
          <ChevronDown className="size-4 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
