import Link from "next/link";
import {
  ArrowRight, BookOpen, Building, BriefcaseBusiness, Cookie, FileText, Globe, GraduationCap, Lock,
  MessagesSquare, Newspaper, RotateCcw, ShieldCheck, Tags, UserPlus, Users, type LucideIcon,
} from "lucide-react";
import type { NavGroup, NavPromo } from "@/types/content";
import { ServiceIcon } from "@/components/ui/ServiceIcon";

const navIcons: Record<string, LucideIcon> = {
  building: Building, briefcase: BriefcaseBusiness, users: Users, chat: MessagesSquare, news: Newspaper,
  graduation: GraduationCap, tags: Tags, userplus: UserPlus, file: FileText, lock: Lock, refund: RotateCcw,
  globe: Globe, shieldcheck: ShieldCheck, cookie: Cookie,
};

function NavIcon({ name }: { name?: string }) {
  if (!name) return null;
  const Icon = navIcons[name];
  return (
    <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 transition group-hover/item:solid-primary group-hover/item:text-white">
      {Icon ? <Icon className="size-4" strokeWidth={1.9} aria-hidden /> : <ServiceIcon name={name} className="size-4" />}
    </span>
  );
}

/** Decorative illustrations for the promo card, in brand colours */
function PromoArt({ art }: { art: NavPromo["art"] }) {
  if (art === "browser") {
    return (
      <div className="relative mx-4 mt-1 rounded-t-lg border border-white/15 bg-white/95 p-2.5 shadow-2xl" aria-hidden>
        <div className="flex items-center gap-1">
          <i className="size-2 rounded-full bg-brand-600" /><i className="size-2 rounded-full bg-glow-400" /><i className="size-2 rounded-full bg-emerald-400" />
          <i className="ml-1.5 h-1.5 flex-1 rounded-full bg-line" />
        </div>
        <div className="section-dark mt-2 flex flex-col gap-1.5 rounded-md p-3">
          <i className="h-1.5 w-3/4 rounded-full bg-white/80" /><i className="h-1.5 w-1/2 rounded-full bg-white/50" /><i className="mt-0.5 h-3 w-14 rounded-full bg-card" />
        </div>
        <span className="absolute -top-2.5 -right-2 rounded-full bg-card px-2 py-0.5 text-[10px] font-semibold text-brand-600 shadow-lg">SEO ready</span>
      </div>
    );
  }
  if (art === "growth") {
    const bars = [38, 56, 48, 74, 92];
    return (
      <div className="flex h-20 items-end gap-1.5" aria-hidden>
        {bars.map((h, i) => (
          <div key={i} className="relative w-5 rounded-t-md bg-brand-700" style={{ height: `${h}%` }}>
            <div className="absolute inset-x-1 top-1.5 grid grid-cols-2 gap-0.5">
              {Array.from({ length: Math.round(h / 16) }).map((_, j) => <i key={j} className={`h-1 rounded-[1px] ${j % 3 === 0 ? "bg-glow-400" : "bg-white/35"}`} />)}
            </div>
          </div>
        ))}
      </div>
    );
  }
  const Icon = art === "book" ? BookOpen : ShieldCheck;
  const Small = art === "book" ? GraduationCap : Lock;
  return (
    <div className="relative size-20 shrink-0" aria-hidden>
      <div className="solid-primary absolute top-0 right-0 flex size-16 rotate-6 items-center justify-center rounded-2xl shadow-2xl">
        <Icon className="size-8 text-white" strokeWidth={1.6} />
      </div>
      <div className="absolute bottom-0 left-0 flex size-9 -rotate-6 items-center justify-center rounded-xl border border-white/20 bg-white/10 backdrop-blur">
        <Small className="size-4 text-glow-400" strokeWidth={1.8} />
      </div>
    </div>
  );
}

function PromoCard({ promo }: { promo: NavPromo }) {
  const isBrowser = promo.art === "browser";
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs text-muted">{promo.eyebrow}</p>
      <Link href={promo.href}
        className="group/promo section-dark relative flex flex-1 flex-col overflow-hidden rounded-xl text-white ring-1 ring-black/5">
        {isBrowser ? (
          <>
            <span className="relative m-3 mb-1.5 inline-flex w-fit items-center gap-1 rounded-full bg-card px-2 py-0.5 text-[10px] font-semibold text-heading">
              <i className="size-1.5 rounded-full bg-emerald-500" /> 100+ projects
            </span>
            <PromoArt art={promo.art} />
            <div className="relative mt-auto flex items-center justify-between gap-3 bg-card p-3.5 text-heading">
              <p className="font-display text-sm leading-snug font-bold">{promo.title}</p>
              <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-night-900 text-white transition group-hover/promo:solid-primary">
                <ArrowRight className="size-4" />
              </span>
            </div>
          </>
        ) : (
          <div className="relative flex flex-1 flex-col gap-2.5 p-5">
            <div className="flex items-start justify-between gap-3">
              <p className="font-display text-base leading-snug font-bold">{promo.title}</p>
              <PromoArt art={promo.art} />
            </div>
            {promo.text && <p className="text-xs leading-relaxed text-white/75">{promo.text}</p>}
            <span className="mt-auto inline-flex size-9 items-center justify-center rounded-full bg-card text-heading transition group-hover/promo:bg-glow-400 group-hover/promo:text-on-warm">
              <ArrowRight className="size-4" />
            </span>
          </div>
        )}
      </Link>
    </div>
  );
}

export function MegaMenuPanel({ group }: { group: NavGroup }) {
  const two = group.columns === 2;
  return (
    <div data-lenis-prevent className="grid max-h-[calc(100dvh-9rem)] grid-cols-[1fr_15rem] gap-5 overflow-y-auto rounded-2xl border border-line bg-card p-5 shadow-[0_24px_60px_-20px_rgb(31_10_77/0.35)]">
      <div className="flex flex-col">
        {group.overview && <p className="mb-2 px-2 text-xs text-muted">{group.overview}</p>}
        <ul className={`grid gap-0.5 ${two ? "grid-cols-2" : "grid-cols-1"}`}>
          {group.children.map((c) => (
            <li key={c.href}>
              <Link href={c.href} className={`group/item flex gap-3 rounded-xl p-2 transition hover:bg-surface ${c.description ? "items-start" : "items-center"}`}>
                <NavIcon name={c.icon} />
                <span className="flex min-w-0 flex-col">
                  <span className="text-sm font-semibold text-heading transition group-hover/item:text-brand-600">{c.label}</span>
                  {c.description && <span className="text-xs leading-snug text-muted">{c.description}</span>}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        {group.footer && (
          <div className="mt-auto flex flex-wrap items-center gap-5 border-t border-line px-2 pt-3">
            {group.footer.map((f, i) => (
              <Link key={f.href} href={f.href} className={`inline-flex items-center gap-1.5 text-sm font-semibold ${i === 0 ? "text-brand-600" : "text-heading"} hover:text-brand-700`}>
                {f.label} {i === 0 && <ArrowRight className="size-4" />}
              </Link>
            ))}
          </div>
        )}
      </div>
      <PromoCard promo={group.promo} />
    </div>
  );
}
