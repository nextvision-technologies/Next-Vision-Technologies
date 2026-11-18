import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "light";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 whitespace-nowrap focus-visible:outline-2";
const variants: Record<Variant, string> = {
  primary: "bg-brand-gradient text-white shadow-lift hover:brightness-110 hover:-translate-y-0.5",
  secondary: "border border-line bg-white text-navy-900 hover:border-brand-600 hover:text-brand-600",
  ghost: "text-brand-600 hover:text-brand-700",
  light: "border border-white/20 bg-white/5 text-white backdrop-blur hover:bg-white/15",
};
const sizes: Record<Size, string> = { md: "h-11 px-5 text-sm", lg: "h-13 px-7 text-base" };

export const buttonClass = (variant: Variant = "primary", size: Size = "md", extra = "") =>
  `${base} ${variants[variant]} ${sizes[size]} ${extra}`;

type Props = { href: string; variant?: Variant; size?: Size; children: ReactNode; className?: string } & Omit<
  ComponentProps<typeof Link>,
  "href" | "className"
>;

export function Button({ href, variant, size, children, className = "", ...rest }: Props) {
  const external = href.startsWith("http");
  return (
    <Link
      href={href}
      className={buttonClass(variant, size, className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {children}
    </Link>
  );
}
