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
      priority: 1.0, // The most important entry point
    },
    {
      url: `${APP_URL}/passport`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9, // Core acquisition/product page
    },
    {
      url: `${APP_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8, // Crucial for trust and E-E-A-T signals
    },
    {
      url: `${APP_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3, // Legal page, rarely changes
    },
    {
      url: `${APP_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3, // Legal page, rarely changes
    },
    {
      url: `${APP_URL}/disclaimer`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3, // Legal page, rarely changes
    },
    
    // --------------------------------------------------
    // FUTURE STATIC ROUTES
    // --------------------------------------------------
    // {
    //   url: `${APP_URL}/leaderboard`,
    //   lastModified: new Date(),
    //   changeFrequency: "hourly",
    //   priority: 0.8,
    // },
    // {
    //   url: `${APP_URL}/store`,
    //   lastModified: new Date(),
    //   changeFrequency: "daily",
    //   priority: 0.7,
    // },
  ];

  // 2. Future Dynamic Routes (Architecture Setup)
  // When you add public SEO entities (Tournaments, Matches, Stadiums, Events), 
  // you will fetch them here and map them to the sitemap format.
  
  /*
  const activeTournaments = await getTournamentsFromDatabase();
  const dynamicTournamentRoutes: MetadataRoute.Sitemap = activeTournaments.map((tournament) => ({
    url: `${APP_URL}/tournaments/${tournament.slug}`,
    lastModified: tournament.updatedAt,
    changeFrequency: "monthly", 
    priority: 0.7,
  }));
  */

  // 3. Combine and return all routes
  return [
    ...staticRoutes,
    // ...dynamicTournamentRoutes
  ];
}