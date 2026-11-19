import Image from "next/image";
import { BriefcaseBusiness, GraduationCap, type LucideIcon } from "lucide-react";
import { team } from "@/content/team";
import { SocialIcon } from "@/components/ui/SocialIcons";

const socialStyle = {
  facebook: "bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2] hover:text-white",
  instagram: "bg-[#E4405F]/10 text-[#E4405F] hover:bg-[#E4405F] hover:text-white",
  linkedin: "bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white",
} as const;

function Fact({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary" aria-hidden>
        <Icon className="size-[18px]" strokeWidth={2} />
      </span>
      <div className="min-w-0">
        <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted">{label}</dt>
        <dd className="text-sm font-medium leading-snug text-heading">{value}</dd>
      </div>
    </div>
  );
}

export function TeamGrid() {
  return (
    <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {team.map((m) => {
        const links = (Object.entries(m.socials) as [keyof typeof socialStyle, string | undefined][]).filter(([, url]) => url);
        return (
          <li key={m.name}
            className="group flex flex-col rounded-3xl border border-line bg-card p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10">
            {/* Photo, name, role */}
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <div className="solid-primary absolute -inset-1.5 rounded-full opacity-0 blur-md transition duration-300 group-hover:opacity-60" aria-hidden />
                <div className="solid-primary relative rounded-full p-1">
                  <Image src={m.photo} alt={`${m.name}, ${m.role}`} width={242} height={242}
                    className="size-40 rounded-full border-4 border-card object-cover transition duration-300 group-hover:scale-[1.02]" />
                </div>
              </div>
              <h3 className="mt-5 text-xl font-bold text-heading">{m.name}</h3>
              <p className="mt-1 text-sm text-muted">{m.role}</p>
              {m.specialty && (
                <span className="mt-3 inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {m.specialty}
                </span>
              )}
            </div>

            {/* Education and experience */}
            {(m.education || m.experience) && (
              <dl className="mt-6 flex flex-col gap-4 rounded-2xl bg-surface p-4">
                {m.education && <Fact icon={GraduationCap} label="Education" value={m.education} />}
                {m.experience && <Fact icon={BriefcaseBusiness} label="Experience" value={m.experience} />}
              </dl>
            )}

            {/* Bio */}
            {m.bio && (
              <div className="mt-6 border-t border-line pt-5">
                <h4 className="text-[11px] font-semibold uppercase tracking-wider text-muted">About</h4>
                <p className="mt-2 text-sm leading-relaxed text-body">{m.bio}</p>
              </div>
            )}

            {links.length > 0 && (
              <div className="mt-auto flex justify-center gap-3 pt-6">
                {links.map(([name, url]) => (
                  <a key={name} href={url} target="_blank" rel="noopener noreferrer" aria-label={`${m.name} on ${name}`}
                    className={`inline-flex size-11 items-center justify-center rounded-full transition ${socialStyle[name]}`}>
                    <SocialIcon name={name} className="size-5" />
                  </a>
                ))}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
