const tech = ["OpenAI", "Claude AI", "Next.js", "React", "Node.js", "Python", "Shopify", "WordPress", "React Native", "AWS", "Meta Ads", "Google Ads", "HubSpot", "n8n", "Figma", "Tailwind CSS"];

/** Scrolling strip of the technologies we work with */
export function TechMarquee() {
  const row = [...tech, ...tech];
  return (
    <section className="border-y border-line bg-white py-7" aria-label="Technologies we work with">
      <div className="container-page flex flex-col items-center gap-5 md:flex-row md:gap-10">
        <p className="shrink-0 text-xs font-semibold tracking-[0.16em] text-muted uppercase">Built with</p>
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
          <ul className="animate-marquee flex w-max gap-10">
            {row.map((t, i) => (
              <li key={i} aria-hidden={i >= tech.length} className="font-display text-lg font-bold whitespace-nowrap text-navy-900/35">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
