import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // IMPORTANT: Replace this with your actual production domain
  const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://passivoo.com";

  // 1. Static High-Value Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: APP_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0, // The most important page on the platform
    },
    {
      url: `${APP_URL}/drops`,
      lastModified: new Date(),
      changeFrequency: "hourly", // Live event drops change constantly
      priority: 0.9, 
    },
    // Future static routes can be uncommented here:
    // {
    //   url: `${APP_URL}/store`,
    //   lastModified: new Date(),
    //   changeFrequency: "daily",
    //   priority: 0.8,
    // },
    // {
    //   url: `${APP_URL}/leaderboard`,
    //   lastModified: new Date(),
    //   changeFrequency: "hourly",
    //   priority: 0.7,
    // },
  ];

  // 2. Future Dynamic Routes (Architecture Setup)
  // When you add individual drop pages or stadium pages, 
  // you will fetch them here and map them to the sitemap format.
  
  /*
  const activeDrops = await getActiveDropsFromDatabase();
  const dynamicDropRoutes: MetadataRoute.Sitemap = activeDrops.map((drop) => ({
    url: `${APP_URL}/drops/${drop.slug}`,
    lastModified: drop.updatedAt,
    changeFrequency: "never", // Once a drop is minted/archived, it doesn't change
    priority: 0.6,
  }));
  */

  // 3. Combine and return all routes
  return [
    ...staticRoutes,
    // ...dynamicDropRoutes
  ];
}