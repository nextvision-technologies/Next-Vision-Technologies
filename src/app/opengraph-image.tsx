// Default social share image (Facebook, WhatsApp, LinkedIn, X) for every page without its own image.
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/content/site";

export const alt = `${site.name}: AI automation, SaaS, websites and digital marketing`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/brand/logo-og.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  const pills = ["AI Chatbots", "Automation", "SaaS", "Websites", "SEO & Ads"];
  const domain = site.url.replace("https://", "");

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "70px 80px", background: "linear-gradient(135deg, #121214 0%, #1d1d20 55%, #3a1a14 100%)", color: "#f3eee6", fontFamily: "sans-serif" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={520} height={156} alt="" />
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1, maxWidth: 980 }}>We build the next version of your business</div>
          <div style={{ display: "flex", fontSize: 28, color: "#cfcac2" }}>{`Software house in Lahore & the UK · ${domain}`}</div>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ display: "flex", gap: 12 }}>
            {pills.map((p) => (
              <div key={p} style={{ display: "flex", padding: "10px 20px", borderRadius: 999, border: "2px solid #e0907e", color: "#e0907e", fontSize: 22 }}>{p}</div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
