"use server";

import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";

/**
 * Server Action / Utility to retrieve the currently authenticated user and session.
 * Can be used in both Server Components and Server Actions.
 */
export async function getCurrentUser() {
  try {
    // In Next.js 15/16, headers() is asynchronous.
    // We pass the request headers to Better Auth so it can parse the session cookie.
    const sessionData = await auth.api.getSession({
      headers: await headers(),
    });

    if (!sessionData) {
      return null;
    }

    return {
      user: sessionData.user,
      session: sessionData.session,
    };
  } catch (error) {
    // If the database connection drops or the token is malformed, fail gracefully.
    return null;
  }
}