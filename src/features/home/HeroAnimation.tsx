/**
 * Pure-CSS animated backdrop for the pinned hero's media card (used when no video is available).
 * Deep logo indigo, one soft violet light, a scrolling perspective grid and twinkling "pixels"
 * in the logo colours. Transform/opacity only; reduced-motion visitors get a still frame.
 */
const sparks = [
  { left: "12%", top: "18%", delay: "0s", color: "#ff9a3c" },
  { left: "28%", top: "72%", delay: "-0.8s", color: "#f0437a" },
  { left: "44%", top: "30%", delay: "-1.6s", color: "#c084fc" },
  { left: "58%", top: "84%", delay: "-2.2s", color: "#ff9a3c" },
  { left: "66%", top: "12%", delay: "-0.4s", color: "#f0437a" },
  { left: "88%", top: "26%", delay: "-1.2s", color: "#c084fc" },
  { left: "92%", top: "68%", delay: "-2.6s", color: "#ff9a3c" },
  { left: "36%", top: "52%", delay: "-1.9s", color: "#f0437a" },
];

export function HeroAnimation() {
  return (
    <div className="nv-anim">
      <div className="nv-anim__light" />
      <div className="nv-anim__grid" />
      {sparks.map((s, i) => (
        <span key={i} className="nv-anim__spark" style={{ left: s.left, top: s.top, animationDelay: s.delay, background: s.color }} />
      ))}
    </div>
  );
}
