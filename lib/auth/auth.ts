import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { username } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import client from "@/lib/db/mongo-client";

export const auth = betterAuth({
  // Use the official native MongoDB adapter powered by our MongoClient
  database: mongodbAdapter(client.db()),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Preserving rapid onboarding for V1
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