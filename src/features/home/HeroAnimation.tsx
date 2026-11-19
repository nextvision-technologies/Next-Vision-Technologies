import type { CSSProperties } from "react";
import Image from "next/image";
import { Bot, Globe, Layers, Megaphone } from "lucide-react";

/**
 * Pure-CSS animated brand scene used inside the pinned hero when no video is available.
 * A scrolling perspective grid, orbiting rings and the logo mark on solid charcoal.
 * Everything animates with transform/opacity only; reduced-motion visitors get a still frame.
 */
const tags = [
  { icon: Bot, label: "AI Chatbots", className: "top-[-4%] left-[-22%]", delay: "0s" },
  { icon: Layers, label: "SaaS Products", className: "top-[22%] right-[-34%]", delay: "-1.5s" },
  { icon: Globe, label: "Websites", className: "bottom-[6%] left-[-30%]", delay: "-3s" },
  { icon: Megaphone, label: "Marketing", className: "bottom-[-8%] right-[-12%]", delay: "-4.5s" },
];

const sparks = [
  { left: "12%", top: "18%", delay: "0s" },
  { left: "28%", top: "72%", delay: "-0.8s" },
  { left: "44%", top: "30%", delay: "-1.6s" },
  { left: "58%", top: "84%", delay: "-2.2s" },
  { left: "66%", top: "12%", delay: "-0.4s" },
  { left: "88%", top: "26%", delay: "-1.2s" },
  { left: "92%", top: "68%", delay: "-2.6s" },
  { left: "36%", top: "52%", delay: "-1.9s" },
];

export function HeroAnimation() {
  return (
    <div className="nv-anim">
      <div className="nv-anim__grid" />

      {sparks.map((s, i) => (
        <span key={i} className="nv-anim__spark" style={{ left: s.left, top: s.top, animationDelay: s.delay }} />
      ))}

      <div className="nv-anim__core">
        <span className="nv-anim__ring" style={{ "--i": "0%", "--s": "28s", "--dot": "#e0907e" } as CSSProperties} />
        <span className="nv-anim__ring nv-anim__ring--rev" style={{ "--i": "12%", "--s": "20s", "--dot": "#e8dccb" } as CSSProperties} />
        <span className="nv-anim__ring" style={{ "--i": "24%", "--s": "14s", "--dot": "#e0b070" } as CSSProperties} />
        <div className="nv-anim__logo">
          <Image src="/brand/mark-white.svg" alt="" width={144} height={136} priority />
        </div>
        {tags.map(({ icon: Icon, label, className, delay }) => (
          <span key={label} className={`nv-anim__tag ${className}`} style={{ animationDelay: delay }}>
            <Icon aria-hidden />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
