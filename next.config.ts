import type { NextConfig } from "next";
import { draftSlugs } from "./src/content/blog";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
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
