import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rankrascal.lol";

  const routes = [
    "",
    "/game",
    "/updates",
    "/labs",
    "/devlog",
    "/community",
    "/safety",
    "/privacy",
    "/terms",
    "/support",
    "/status",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
