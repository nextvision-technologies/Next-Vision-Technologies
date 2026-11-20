import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, BriefcaseBusiness, CalendarDays, GraduationCap, Mail, Sparkles, UserRound, type LucideIcon } from "lucide-react";
import { memberSlug, team } from "@/content/team";
import { emailLink, site } from "@/content/site";
import { buttonClass } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import type { TeamMember } from "@/types/content";
import { MemberSocials } from "./MemberSocials";

function Detail({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="flex gap-4 rounded-2xl border border-line bg-card p-5 shadow-card">
      <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600"><Icon className="size-5" aria-hidden /></span>
      <div className="min-w-0">
        <dt className="text-xs font-semibold tracking-wider text-muted uppercase">{label}</dt>
        <dd className="mt-1 font-semibold text-heading">{value}</dd>
      </div>
    </div>
  );
}

/** Full profile page for one team member: about, education, experience and expertise */
export function MemberProfile({ member: m }: { member: TeamMember }) {
  const firstName = m.name.split(" ").find((w) => w !== "Muhammad") ?? m.name;
  const others = team.filter((x) => x.name !== m.name);
  const url = `${site.url}/team/${memberSlug(m.name)}`;
  const sameAs = Object.values(m.socials).filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url,
    mainEntity: {
      "@type": "Person",
      name: m.name,
      jobTitle: m.role,
      image: `${site.url}${m.photo}`,
      ...(m.bio ? { description: m.bio } : {}),
      ...(m.specialty ? { knowsAbout: m.specialty } : {}),
      ...(m.education ? { alumniOf: m.education } : {}),
      ...(sameAs.length ? { sameAs } : {}),
      worksFor: { "@type": "Organization", name: site.name, url: site.url },
    },
  };

  const details = [
    { icon: UserRound, label: "Role", value: m.role },
    ...(m.specialty ? [{ icon: Sparkles, label: "Expertise", value: m.specialty }] : []),
    ...(m.education ? [{ icon: GraduationCap, label: "Education", value: m.education }] : []),
    ...(m.experience ? [{ icon: BriefcaseBusiness, label: "Experience", value: m.experience }] : []),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <PageHero crumbs={[{ label: "Our Team", href: "/team" }, { label: m.name }]} eyebrow={m.role} title={m.name}
        text={m.specialty ? `${m.specialty} at ${site.name}.` : undefined} />

      <section className="container-page grid gap-10 py-14 sm:py-16 lg:grid-cols-[22rem_minmax(0,1fr)] lg:gap-14">
        {/* ---------- Profile card ---------- */}
        <aside>
          <div className="flex flex-col items-center rounded-3xl border border-line bg-card p-7 text-center shadow-card lg:sticky lg:top-28">
            <div className="solid-primary rounded-full p-1.5">
              <Image src={m.photo} alt={`${m.name}, ${m.role} at ${site.name}`} width={384} height={384} priority
                className="size-52 rounded-full border-4 border-card object-cover sm:size-60" />
            </div>
            <h2 className="mt-6 text-2xl font-bold text-heading">{m.name}</h2>
            <p className="mt-1 text-muted">{m.role}</p>
            {m.specialty && (
              <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                <BadgeCheck className="size-3.5" aria-hidden /> {m.specialty}
              </span>
            )}
            <MemberSocials member={m} className="mt-6" />
            <div className="mt-7 flex w-full flex-col gap-3">
              <Link href="/book-demo" className={buttonClass("primary", "md", "w-full")}>
                <CalendarDays className="size-4" aria-hidden /> Book a meeting
              </Link>
              <a href={emailLink(`Message for ${m.name} - Next Vision Technologies`)} className={buttonClass("secondary", "md", "w-full")}>
                <Mail className="size-4" aria-hidden /> Send an email
              </a>
            </div>
          </div>
        </aside>

        {/* ---------- About and details ---------- */}
        <div className="flex min-w-0 flex-col gap-12">
          {m.bio && (
            <section aria-labelledby="about">
              <p className="text-xs font-semibold tracking-[0.16em] text-brand-600 uppercase">About</p>
              <h2 id="about" className="mt-2 text-2xl font-bold text-heading sm:text-3xl">About {firstName}</h2>
              <p className="mt-5 text-lg leading-relaxed text-body">{m.bio}</p>
            </section>
          )}

          <section aria-labelledby="details">
            <h2 id="details" className="text-2xl font-bold text-heading sm:text-3xl">Background</h2>
            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              {details.map((d) => <Detail key={d.label} {...d} />)}
            </dl>
          </section>

          <section aria-labelledby="work-with" className="section-dark relative overflow-hidden rounded-[1.5rem] p-7 text-white sm:p-9">
            <span className="bg-logo-gradient absolute -top-20 -right-20 size-60 rounded-full opacity-25 blur-3xl" aria-hidden />
            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="flex-1">
                <h2 id="work-with" className="font-display text-xl font-bold">Work with {firstName} and the team</h2>
                <p className="mt-1 text-white/70">Tell us about your project and get a free consultation and a fixed quote within 24 hours.</p>
              </div>
              <Link href="/contact" className={buttonClass("primary", "md", "relative shrink-0")}>Start your project <ArrowRight className="size-4" /></Link>
            </div>
          </section>

          {/* ---------- Rest of the team ---------- */}
          <section aria-labelledby="others">
            <h2 id="others" className="text-2xl font-bold text-heading">Meet the rest of the team</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-3">
              {others.map((o) => (
                <li key={o.name}>
                  <Link href={`/team/${memberSlug(o.name)}`}
                    className="group flex items-center gap-4 rounded-2xl border border-line bg-card p-4 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-card sm:flex-col sm:text-center">
                    <Image src={o.photo} alt="" width={128} height={128} className="size-16 shrink-0 rounded-full object-cover sm:size-20" />
                    <span className="min-w-0">
                      <span className="block font-bold text-heading group-hover:text-brand-600">{o.name}</span>
                      <span className="mt-0.5 block text-sm text-muted">{o.role}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </section>
    </>
  );
}
