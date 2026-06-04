import { createAuthClient } from "better-auth/react";
import { usernameClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  // The base URL of the Better Auth API endpoints
  baseURL: process.env.NEXT_PUBLIC_APP_URL, 
  
  // Register the client-side equivalent of the username plugin
  plugins: [
    usernameClient(),
  ],
});