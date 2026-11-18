import { Button } from "@/components/ui/Button";
import { PixelCluster } from "@/components/sections/PageHero";

export default function NotFound() {
  return (
    <section className="bg-navy-radial relative overflow-hidden text-white">
      <div className="bg-pixel-grid absolute inset-0" aria-hidden />
      <div className="container-page relative flex flex-col items-center gap-6 py-28 text-center">
        <PixelCluster className="w-28" />
        <p className="font-display text-7xl font-extrabold text-brand-gradient">404</p>
        <h1 className="text-3xl font-bold">This page doesn&apos;t exist</h1>
        <p className="max-w-md text-white/70">The link may be old or mistyped. Try the home page or our services.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button href="/">Go home</Button>
          <Button href="/services" variant="light">View services</Button>
        </div>
      </div>
    </section>
  );
}
