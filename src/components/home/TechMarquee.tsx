import {
  siOpenai, siClaude, siNextdotjs, siReact, siNodedotjs, siPython, siShopify, siWordpress, siTypescript,
  siVercel, siMeta, siGoogleads, siHubspot, siN8n, siFigma, siTailwindcss, siWhatsapp, siGoogleanalytics,
  type SimpleIcon,
} from "simple-icons";

// Official brand logos and colours (from Simple Icons). `use` explains how we use each tool.
type Tech = { icon: SimpleIcon; label?: string; use: string };

const rowOne: Tech[] = [
  { icon: siOpenai, use: "GPT models that power the AI chatbots and assistants we build." },
  { icon: siClaude, use: "Anthropic's AI for smart agents, document analysis and content." },
  { icon: siNextdotjs, use: "Our main framework for fast, SEO-friendly websites and web apps." },
  { icon: siReact, use: "Interactive interfaces for web apps, portals and dashboards." },
  { icon: siNodedotjs, use: "Back-end APIs, integrations and real-time features." },
  { icon: siPython, use: "AI workflows, data processing and automation scripts." },
  { icon: siTypescript, use: "Typed code that keeps large projects reliable and easy to grow." },
  { icon: siReact, label: "React Native", use: "One codebase for both iOS and Android mobile apps." },
  { icon: siVercel, use: "Hosting on a global network so websites load fast everywhere." },
];

const rowTwo: Tech[] = [
  { icon: siShopify, use: "Online stores with payments, inventory and sales apps." },
  { icon: siWordpress, use: "Business websites and blogs you can update yourself." },
  { icon: siMeta, label: "Meta Ads", use: "Facebook and Instagram campaigns that bring in leads." },
  { icon: siGoogleads, use: "Search and YouTube ads that reach buyers ready to act." },
  { icon: siGoogleanalytics, use: "Tracking visitors and conversions so every decision uses real data." },
  { icon: siHubspot, use: "CRM setup to track leads, deals and follow-ups in one place." },
  { icon: siN8n, use: "Workflow automation that connects your apps and removes manual work." },
  { icon: siWhatsapp, label: "WhatsApp API", use: "WhatsApp Business bots, order updates and lead alerts." },
  { icon: siFigma, use: "UI/UX design and clickable prototypes before development starts." },
  { icon: siTailwindcss, use: "Clean, responsive styling that looks right on every screen." },
];

function Logo({ icon }: { icon: SimpleIcon }) {
  return (
    <svg viewBox="0 0 24 24" className="size-6 shrink-0" fill={`#${icon.hex}`} aria-hidden>
      <path d={icon.path} />
    </svg>
  );
}

function Row({ items, reverse = false, tipBelow = false }: { items: Tech[]; reverse?: boolean; tipBelow?: boolean }) {
  const row = [...items, ...items]; // duplicated for a seamless loop
  return (
    <ul className={`relative flex w-max gap-4 py-1 hover:z-20 hover:[animation-play-state:paused] ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}>
      {row.map((t, i) => {
        const name = t.label ?? t.icon.title;
        const copy = i >= items.length;
        return (
          <li key={i} aria-hidden={copy} tabIndex={copy ? -1 : 0}
            className="group/item relative flex cursor-default items-center gap-2.5 rounded-full border bg-card py-1.5 pr-4 pl-1.5 shadow-sm outline-none transition hover:-translate-y-0.5 hover:shadow-card focus-visible:ring-2 focus-visible:ring-brand-600"
            style={{ borderColor: `#${t.icon.hex}30` }}>
            <span className="inline-flex size-9 items-center justify-center rounded-full dark:!bg-white" style={{ backgroundColor: `#${t.icon.hex}16` }}>
              <Logo icon={t.icon} />
            </span>
            <span className="font-display text-[15px] font-bold whitespace-nowrap text-heading">{name}</span>

            {/* Tooltip: what we use it for */}
            <span role="tooltip"
              className={`pointer-events-none absolute left-1/2 z-20 w-60 -translate-x-1/2 rounded-xl ${tipBelow ? "top-[calc(100%+10px)] -translate-y-1" : "bottom-[calc(100%+10px)] translate-y-1"} bg-navy-900 px-3.5 py-2.5 text-left text-xs leading-relaxed text-white/90 opacity-0 shadow-lift transition duration-200 group-hover/item:translate-y-0 group-hover/item:opacity-100 group-focus-visible/item:translate-y-0 group-focus-visible/item:opacity-100`}>
              <span className="mb-0.5 block font-semibold text-white">{name}</span>
              {t.use}
              <span className={`absolute left-1/2 -translate-x-1/2 border-6 border-transparent ${tipBelow ? "bottom-full border-b-navy-900" : "top-full border-t-navy-900"}`} />
            </span>
          </li>
        );
      })}
    </ul>
  );
}

/** Two scrolling rows of the technologies we work with, in opposite directions */
export function TechMarquee() {
  return (
    <section className="border-y border-line bg-card py-8" aria-labelledby="tech-heading">
      <div className="container-page flex flex-col items-center gap-2 text-center">
        <p id="tech-heading" className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">Built with trusted technology</p>
        <p className="text-sm text-muted">Hover any logo to see how we use it.</p>
      </div>
      {/* Row 1 tooltips open downwards and row 2 upwards, so they stay inside the strip */}
      <div className="group/strip relative flex flex-col gap-4 overflow-hidden py-8 [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
        <Row items={rowOne} tipBelow />
        <Row items={rowTwo} reverse />
      </div>
    </section>
  );
}
