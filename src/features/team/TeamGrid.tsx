import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { memberSlug, team } from "@/content/team";
import { MemberSocials } from "./MemberSocials";

/** Team cards: photo, name, title and social links. The whole card opens the member's profile page. */
export function TeamGrid() {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {team.map((m) => {
        const href = `/team/${memberSlug(m.name)}`;
        return (
          <li key={m.name}
            className="group relative flex flex-col items-center rounded-3xl border border-line bg-card p-7 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10">
            <div className="relative">
              <div className="solid-primary absolute -inset-1.5 rounded-full opacity-0 blur-md transition duration-300 group-hover:opacity-60" aria-hidden />
              <div className="solid-primary relative rounded-full p-1">
                <Image src={m.photo} alt={`${m.name}, ${m.role}`} width={242} height={242}
                  className="size-40 rounded-full border-4 border-card object-cover transition duration-300 group-hover:scale-[1.02]" />
              </div>
            </div>
            <h3 className="mt-5 text-xl font-bold text-heading">
              {/* Stretched link: makes the whole card clickable; social icons sit above it */}
              <Link href={href} className="after:absolute after:inset-0 after:rounded-3xl focus-visible:outline-none">
                {m.name}
              </Link>
            </h3>
            <p className="mt-1 text-sm text-muted">{m.role}</p>

            <MemberSocials member={m} className="relative z-10 mt-5" />

            <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-brand-600 transition group-hover:gap-2.5">
              View profile <ArrowRight className="size-4" aria-hidden />
            </span>
          </li>
        );
      })}
    </ul>
  );
}
