import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getMember, memberSlug, team } from "@/content/team";
import { MemberProfile } from "@/features/team/MemberProfile";
import { PageSkeleton } from "@/components/sections/PageSkeleton";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return team.map((m) => ({ slug: memberSlug(m.name) }));
}

export async function generateMetadata({ params }: PageProps<"/team/[slug]">): Promise<Metadata> {
  const m = getMember((await params).slug);
  return m ? pageMetadata(`/team/${memberSlug(m.name)}`, { type: "profile" }) : {};
}

// `params` is read inside <Suspense> so navigations stay instant under Cache Components.
// Every slug comes from generateStaticParams, so each profile is still fully prerendered at build time.
export default function MemberPage({ params }: PageProps<"/team/[slug]">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <MemberContent params={params} />
    </Suspense>
  );
}

async function MemberContent({ params }: { params: PageProps<"/team/[slug]">["params"] }) {
  const member = getMember((await params).slug);
  if (!member) notFound();
  return <MemberProfile member={member} />;
}
