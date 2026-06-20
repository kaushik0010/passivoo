"use client";

import { usePostHog } from "posthog-js/react";
import { useEffect } from "react";

interface PostHogIdentifierProps {
  user: {
    id: string;
    name?: string;
    email?: string;
  } | null;
}

export function PostHogIdentifier({ user }: PostHogIdentifierProps) {
  const posthog = usePostHog();

  useEffect(() => {
    if (!posthog) return;

    if (user && user.id) {
      // Tie the user to their unique ID
      posthog.identify(user.id, {
        email: user.email,
        name: user.name,
      });
    } else if (user === null) {
      // User is logged out. Reset the session to prevent data leakage.
      posthog.reset();
    }
  }, [user, posthog]);

  return null;
}