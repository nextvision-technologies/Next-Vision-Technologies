/**
 * Placeholder for detail pages (blog posts, services, jobs) while their URL params resolve.
 * Those pages read `params` inside <Suspense> so navigations stay instant under Cache Components.
 * Every known slug is prerendered at build time, so visitors rarely see this.
 */
export function PageSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading page" className="animate-pulse">
      <div className="section-dark">
        <div className="container-page flex flex-col gap-4 py-14">
          <div className="h-4 w-40 rounded-full bg-white/15" />
          <div className="h-10 w-full max-w-2xl rounded-xl bg-white/15" />
          <div className="h-5 w-full max-w-xl rounded-full bg-white/10" />
        </div>
      </div>
      <div className="container-page flex flex-col gap-4 py-14">
        <div className="h-5 w-full max-w-3xl rounded-full bg-surface" />
        <div className="h-5 w-full max-w-2xl rounded-full bg-surface" />
        <div className="h-5 w-full max-w-3xl rounded-full bg-surface" />
        <div className="h-5 w-2/3 max-w-xl rounded-full bg-surface" />
      </div>
    </div>
  );
}
