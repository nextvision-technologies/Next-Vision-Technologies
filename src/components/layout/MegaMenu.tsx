import Link from "next/link";
import {
  ArrowRight, BookOpen, Building, BriefcaseBusiness, Cookie, FileText, Globe, GraduationCap, Lock,
  MessagesSquare, Newspaper, RotateCcw, ShieldCheck, Tags, UserPlus, Users, type LucideIcon,
} from "lucide-react";
import type { NavGroup, NavPromo } from "@/content/navigation";
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
    <span className="mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition group-hover/item:bg-brand-gradient group-hover/item:text-white">
      {Icon ? <Icon className="size-5" strokeWidth={1.8} aria-hidden /> : <ServiceIcon name={name} className="size-5" />}
    </span>
  );
}

/** Decorative illustrations for the promo card, in brand colours */
function PromoArt({ art }: { art: NavPromo["art"] }) {
  if (art === "browser") {
    return (
      <div className="relative mx-6 mt-2 rounded-t-xl border border-white/15 bg-white/95 p-3 shadow-2xl" aria-hidden>
        <div className="flex items-center gap-1.5">
          <i className="size-2.5 rounded-full bg-[#F25C54]" /><i className="size-2.5 rounded-full bg-[#FF9A3C]" /><i className="size-2.5 rounded-full bg-emerald-400" />
          <i className="ml-2 h-2 flex-1 rounded-full bg-[#ece5f4]" />
        </div>
        <div className="bg-brand-gradient mt-3 flex flex-col gap-2 rounded-lg p-4">
          <i className="h-2 w-3/4 rounded-full bg-white/80" /><i className="h-2 w-1/2 rounded-full bg-white/50" /><i className="mt-1 h-4 w-20 rounded-full bg-white" />
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => <i key={i} className="h-10 rounded-md border border-[#ece5f4] bg-[#faf6fd]" />)}
        </div>
        <span className="absolute -top-3 -right-3 rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand-600 shadow-lg">SEO ready</span>
      </div>
    );
  }
  if (art === "growth") {
    const bars = [38, 56, 48, 74, 92];
    return (
      <div className="flex h-36 items-end gap-2.5" aria-hidden>
        {bars.map((h, i) => (
          <div key={i} className="relative w-9 rounded-t-lg bg-gradient-to-t from-brand-700 to-[#F0437A]" style={{ height: `${h}%` }}>
            <div className="absolute inset-x-1.5 top-2 grid grid-cols-2 gap-1">
              {Array.from({ length: Math.round(h / 12) }).map((_, j) => <i key={j} className={`h-1.5 rounded-sm ${j % 3 === 0 ? "bg-glow-400" : "bg-white/35"}`} />)}
            </div>
          </div>
        ))}
      </div>
    );
  }
  const Icon = art === "book" ? BookOpen : ShieldCheck;
  const Small = art === "book" ? GraduationCap : Lock;
  return (
    <div className="relative size-36" aria-hidden>
      <div className="bg-brand-gradient absolute top-0 right-0 flex size-28 rotate-6 items-center justify-center rounded-3xl shadow-2xl">
        <Icon className="size-14 text-white" strokeWidth={1.6} />
      </div>
      <div className="absolute bottom-0 left-0 flex size-16 -rotate-6 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur">
        <Small className="size-7 text-glow-400" strokeWidth={1.8} />
      </div>
    </div>
  );
}

function PromoCard({ promo }: { promo: NavPromo }) {
  const isBrowser = promo.art === "browser";
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted">{promo.eyebrow}</p>
      <Link href={promo.href}
        className="group/promo bg-navy-radial relative flex flex-1 flex-col overflow-hidden rounded-2xl text-white ring-1 ring-black/5">
        <div className="bg-pixel-grid pointer-events-none absolute inset-0" aria-hidden />
        {isBrowser ? (
          <>
            <span className="relative m-5 mb-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-navy-900">
              <i className="size-2 rounded-full bg-emerald-500" /> 100+ projects
            </span>
            <PromoArt art={promo.art} />
            <div className="relative flex items-center justify-between gap-4 bg-white p-5 text-navy-900">
              <p className="font-display text-lg font-bold">{promo.title}</p>
              <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-navy-900 text-white transition group-hover/promo:bg-brand-600">
                <ArrowRight className="size-5" />
              </span>
            </div>
          </>
        ) : (
          <div className="relative grid flex-1 grid-cols-[1fr_auto] items-center gap-4 p-7">
            <div className="flex flex-col gap-3">
              <p className="font-display text-2xl leading-tight font-bold">{promo.title}</p>
              {promo.text && <p className="text-sm leading-relaxed text-white/75">{promo.text}</p>}
              <span className="mt-3 inline-flex size-12 items-center justify-center rounded-full bg-white text-navy-900 transition group-hover/promo:bg-glow-400 group-hover/promo:text-white">
                <ArrowRight className="size-5" />
              </span>
            </div>
            <PromoArt art={promo.art} />
          </div>
        )}
      </Link>
    </div>
  );
}

export function MegaMenuPanel({ group }: { group: NavGroup }) {
  const two = group.columns === 2;
  return (
    <div className="grid grid-cols-[1.5fr_1fr] gap-8 rounded-3xl border border-line bg-white p-8 shadow-[0_30px_80px_-20px_rgb(31_10_77/0.35)]">
      <div className="flex flex-col">
        {group.overview && <p className="mb-4 text-sm text-muted">{group.overview}</p>}
        <ul className={`grid gap-1 ${two ? "grid-cols-2" : "grid-cols-1"}`}>
          {group.children.map((c) => (
            <li key={c.href}>
              <Link href={c.href} className="group/item flex gap-4 rounded-2xl p-3 transition hover:bg-surface">
                <NavIcon name={c.icon} />
                <span className="flex flex-col gap-0.5">
                  <span className="font-semibold text-navy-900 transition group-hover/item:text-brand-600">{c.label}</span>
                  {c.description && <span className="text-sm leading-snug text-muted">{c.description}</span>}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        {group.footer && (
          <div className="mt-auto flex flex-wrap items-center gap-6 border-t border-line pt-5">
            {group.footer.map((f, i) => (
              <Link key={f.href} href={f.href} className={`inline-flex items-center gap-1.5 text-sm font-semibold ${i === 0 ? "text-brand-600" : "text-navy-900"} hover:text-brand-700`}>
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
