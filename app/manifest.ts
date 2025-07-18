import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "HealthConnect Jakarta",
    short_name: "HealthConnect",
    description: "AI-powered healthcare access for Jakarta residents",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2DD4BF",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
