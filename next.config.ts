import type { NextConfig } from "next";
import { draftSlugs } from "./src/content/blog";

const nextConfig: NextConfig = {
  cacheComponents: true,
  // Don't advertise the framework in an "X-Powered-By" response header
  poweredByHeader: false,
  // experimental.inlineCss was tested (2026-11-20) and rejected: it put the CSS in both a <style> tag and the RSC
  // payload, growing the home page HTML from 58 KB to 110 KB gzipped on every page, versus a 16.5 KB cached CSS file.
  // Security headers on every response (PageSpeed "Trust and Safety").
  // No COOP header on purpose: "same-origin" would break Google Tag Manager's Preview/Tag Assistant window.
  // No CSP yet: GTM injects inline scripts, so a CSP needs nonces and must be tested with every GTM tag.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
        ],
      },
    ];
  },
  // Dev-only "N" badge: keep it away from the WhatsApp (bottom-left) and chat (bottom-right) buttons
  devIndicators: { position: "top-right" },
  // Hidden (draft) blog posts send visitors to the blog index instead of a 404.
  // Temporary (307) so the URLs can be published again later without search engines dropping them.
  async redirects() {
    return [
      // The portfolio page was renamed to the Projects Gallery. Permanent (308) so search engines move its ranking over.
      { source: "/portfolio", destination: "/projects", permanent: true },
      ...draftSlugs.map((slug) => ({ source: `/blog/${slug}`, destination: "/blog", permanent: false })),
    ];
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
