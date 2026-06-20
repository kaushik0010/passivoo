"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect } from "react";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Ensure this only runs on the client
    if (typeof window !== "undefined") {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
        person_profiles: "identified_only", // Keeps anonymous traffic cheap and lean
        capture_pageview: false, // We will handle this manually for Next.js App Router
        autocapture: false, // Disabled per your lean philosophy
      });
    }
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}