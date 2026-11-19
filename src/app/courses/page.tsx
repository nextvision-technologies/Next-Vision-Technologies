import { CalendarDays, GraduationCap } from "lucide-react";
import { courses } from "@/content/courses";
import { whatsappLink } from "@/content/site";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/courses");

export default function CoursesPage() {
  return (
    <>
      <PageHero crumbs={[{ label: "Courses" }]} eyebrow="Learn with us" title="Courses taught by working professionals"
        text="Hands-on training in the same skills our team uses on client projects every day." />
      <section className="container-page grid gap-6 py-20 md:grid-cols-2">
        {courses.map((c) => (
          <article key={c.title} className="flex flex-col gap-4 rounded-card border border-line bg-card p-7 shadow-card">
            <GraduationCap className="size-8 text-brand-600" aria-hidden strokeWidth={1.8} />
            <h2 className="text-xl font-bold text-heading">{c.title}</h2>
            <p className="flex-1 text-muted">{c.text}</p>
            <p className="flex gap-4 text-sm text-muted">
              <span className="rounded-full bg-brand-50 px-3 py-1 font-medium text-brand-700">{c.level}</span>
              <span className="inline-flex items-center gap-1.5"><CalendarDays className="size-4" aria-hidden />{c.weeks} weeks</span>
            </p>
            <Button href={whatsappLink(`Hi, I'd like to join the ${c.title} course.`)} variant="secondary" className="w-fit">Enrol on WhatsApp</Button>
          </article>
        ))}
      </section>
    </>
  );
}
