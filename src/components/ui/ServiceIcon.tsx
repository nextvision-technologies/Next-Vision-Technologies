import {
  Bot, MessageSquare, Target, CodeXml, LayoutTemplate, ShoppingBag, ShoppingCart, Cpu, Users,
  Smartphone, Megaphone, Search, ChartLine, Palette, Compass, ShieldCheck, Sparkles, type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  bot: Bot, message: MessageSquare, target: Target, code: CodeXml, layout: LayoutTemplate, bag: ShoppingBag,
  cart: ShoppingCart, cpu: Cpu, users: Users, phone: Smartphone, megaphone: Megaphone, search: Search,
  chart: ChartLine, palette: Palette, compass: Compass, shield: ShieldCheck,
};

export function ServiceIcon({ name, className = "size-6" }: { name: string; className?: string }) {
  const Icon = icons[name] ?? Sparkles;
  return <Icon className={className} aria-hidden strokeWidth={1.8} />;
}

/** Icon in a gradient tile, used on service cards */
export function IconTile({ name, size = "md" }: { name: string; size?: "md" | "lg" }) {
  const box = size === "lg" ? "size-14 rounded-2xl" : "size-12 rounded-xl";
  return (
    <span className={`solid-primary inline-flex ${box} shrink-0 items-center justify-center text-white shadow-lift`}>
      <ServiceIcon name={name} className={size === "lg" ? "size-7" : "size-6"} />
    </span>
  );
}
