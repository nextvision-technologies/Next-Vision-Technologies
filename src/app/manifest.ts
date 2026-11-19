import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f5f0e8",
    theme_color: "#121214",
    icons: [
      { src: "/brand/logo-square.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "192x192", type: "image/png" },
    ],
  };
}
