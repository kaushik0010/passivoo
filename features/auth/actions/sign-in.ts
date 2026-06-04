"use server";

import { auth } from "@/lib/auth/auth";
import { APIError } from "better-auth/api";
import { signInSchema } from "@/features/auth/schemas/sign-in.schema";

// Consistent response structure matching the registration flow
export type SignInResponse =
  | { success: true; user: { id: string; email: string; username: string }; message: string }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> };

/**
 * Server Action to authenticate an existing user in Passivoo.
 * Validates credentials using Zod before checking the database via Better Auth.
 */
export async function signInAction(formData: FormData): Promise<SignInResponse> {
  // 1. Extract raw data from the form submission
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  // 2. Validate the raw data against the Zod schema
  const validatedFields = signInSchema.safeParse(rawData);

  // 3. Handle validation failure
  if (!validatedFields.success) {
    return {
      success: false,
      error: "Please check your credentials and try again.",
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 4. Extract sanitized data from the successful parse
  const { email, password } = validatedFields.data;

  // 5. Proceed with authentication via Better Auth
  try {
    const session = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    return {
      success: true,
      user: {
        id: session.user.id,
        email: session.user.email,
        // Fallback to empty string or type coercion if Better Auth types it as nullable
        username: session.user.username || "", 
      },
      message: "Successfully logged in.",
    };
  } catch (error) {
    // Intercept standard authentication failures (wrong password, user not found)
    if (error instanceof APIError) {
      return {
        success: false,
        error: error.message || "Invalid email or password.",
      };
    }

    // Direct fallback for unexpected driver or network faults
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unexpected execution error occurred.",
    };
  }
}