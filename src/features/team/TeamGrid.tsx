import Image from "next/image";
import { team } from "@/content/misc";
import { SocialIcon } from "@/components/ui/SocialIcons";

const socialStyle = {
  facebook: "bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2] hover:text-white",
  instagram: "bg-[#E4405F]/10 text-[#E4405F] hover:bg-[#E4405F] hover:text-white",
  linkedin: "bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white",
} as const;

export function TeamGrid() {
  return (
    <ul className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
      {team.map((m) => {
        const links = (Object.entries(m.socials) as [keyof typeof socialStyle, string | undefined][]).filter(([, url]) => url);
        return (
          <li key={m.name} className="group flex flex-col items-center text-center">
            <div className="relative">
              <div className="solid-primary absolute -inset-1.5 rounded-full opacity-0 blur-md transition duration-300 group-hover:opacity-60" aria-hidden />
              <div className="solid-primary relative rounded-full p-1">
                <Image src={m.photo} alt={`${m.name}, ${m.role}`} width={242} height={242}
                  className="size-52 rounded-full border-4 border-card object-cover transition duration-300 group-hover:scale-[1.02]" />
              </div>
            </div>
            <h3 className="mt-6 text-xl font-bold text-heading">{m.name}</h3>
            <span className="solid-primary mt-3 h-1 w-12 rounded-full" aria-hidden />
            <p className="mt-3 text-muted">{m.role}</p>
            {links.length > 0 && (
              <div className="mt-5 flex gap-3">
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
