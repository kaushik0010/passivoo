import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { username } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import client from "@/lib/db/mongo-client";
import { ServerAnalytics } from "@/lib/analytics/server";

export const auth = betterAuth({
  // Use the official native MongoDB adapter powered by our MongoClient
  database: mongodbAdapter(client.db()),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Preserving rapid onboarding for V1
  },

  // ==========================================
  // DATABASE LIFECYCLE HOOKS
  // ==========================================
  databaseHooks: {
    user: {
      create: {
        /**
         * Fires strictly after a new user row has been successfully 
         * written and committed to the MongoDB database.
         */
        after: async (user) => {
          try {
            // Safely extract and explicitly cast to satisfy strict TypeScript rules
            const safeUserId = user.id || (user as any)._id?.toString() || "unknown_id";
            const safeUsername = user.name || (user as any).username || "anonymous";

            await ServerAnalytics.trackUserRegistered({
              userId: safeUserId as string,
              email: user.email as string,
              username: safeUsername as string,
              provider: "email",
            });
          } catch (analyticsError) {
            // Fail silently so analytics drops never block the core sign-up flow
            console.error("[Analytics Error] User Registered hook failed:", analyticsError);
          }
        },
      },
    },
  },

  plugins: [
    // Initializes username support with default alphanumeric validation
    username({
      minUsernameLength: 3,
      maxUsernameLength: 50,
    }),
    // Critical for Next.js 15 Server Actions cookie synchronization
    nextCookies(),
  ],
});