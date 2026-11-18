import type { NextConfig } from "next";
import { draftSlugs } from "./src/content/blog";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  // Hidden (draft) blog posts send visitors to the blog index instead of a 404.
  // Temporary (307) so the URLs can be published again later without search engines dropping them.
  async redirects() {
    return draftSlugs.map((slug) => ({ source: `/blog/${slug}`, destination: "/blog", permanent: false }));
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
