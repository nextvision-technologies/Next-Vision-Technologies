import { SocialIcon } from "@/components/ui/SocialIcons";
import type { TeamMember } from "@/types/content";

const socialStyle = {
  facebook: "bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2] hover:text-white",
  instagram: "bg-[#E4405F]/10 text-[#E4405F] hover:bg-[#E4405F] hover:text-white",
  linkedin: "bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white",
  youtube: "bg-[#FF0000]/10 text-[#FF0000] hover:bg-[#FF0000] hover:text-white",
} as const;
const socialLabel = { facebook: "Facebook", instagram: "Instagram", linkedin: "LinkedIn", youtube: "YouTube" } as const;

/** A team member's social profile links. Renders nothing until links are added in src/content/team.ts */
export function MemberSocials({ member, className = "" }: { member: TeamMember; className?: string }) {
  const links = (Object.entries(member.socials) as [keyof typeof socialStyle, string | undefined][]).filter(([, url]) => url);
  if (links.length === 0) return null;
  return (
    <div className={`flex justify-center gap-3 ${className}`}>
      {links.map(([name, url]) => (
        <a key={name} href={url} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} on ${socialLabel[name]}`}
          className={`inline-flex size-11 items-center justify-center rounded-full transition ${socialStyle[name]}`}>
          <SocialIcon name={name} className="size-5" />
        </a>
      ))}
    </div>
  );
}
