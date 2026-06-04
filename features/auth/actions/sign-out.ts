"use server";

import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { APIError } from "better-auth/api";

// Consistent response structure matching the authentication flow
export type SignOutResponse =
  | { success: true; message: string }
  | { success: false; error: string };

/**
 * Server Action to securely terminate an active user session in Passivoo.
 */
export async function signOutAction(): Promise<SignOutResponse> {
  try {
    // In Next.js 15+, dynamic functions like headers() are asynchronous.
    // We pass the headers to Better Auth so it knows exactly which session cookie to invalidate.
    await auth.api.signOut({
      headers: await headers(), 
    });

    return {
      success: true,
      message: "Successfully signed out.",
    };
  } catch (error) {
    if (error instanceof APIError) {
      return {
        success: false,
        error: error.message || "Failed to sign out.",
      };
    }

    return {
      success: false,
      error: "An unexpected error occurred during sign out.",
    };
  }
}