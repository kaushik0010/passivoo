import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  // IMPORTANT: Replace this with your actual production domain
  const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://passivoo.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Disallow crawling of authenticated vaults and API routes
      // to preserve crawl budget for high-value public pages.
      disallow: [
        "/collections/",
        "/drops",
        "/profile/",
        "/api/",
        "/_next/",
      ],
    },
    // Search engines require an absolute URL for the sitemap
    sitemap: `${APP_URL}/sitemap.xml`,
  };
}