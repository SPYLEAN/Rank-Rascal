import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rankrascal.lol";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/dashboard",
          "/commands",
          "/verify",
          "/linked-roles",
          "/games/roblox",
          "/api/discord",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
