"use server";

import { auth } from "@/lib/auth/auth";
import { APIError } from "better-auth/api";
import { signUpSchema } from "@/features/auth/schemas/sign-up.schema";

// Expanded response structure to handle field-level validation errors
export type SignUpResponse =
  | { success: true; user: { id: string; email: string; username: string }; message: string }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> };

/**
 * Server Action to register a new user in Passivoo.
 * Validates input using Zod before calling the Better Auth instance.
 */
export async function signUpAction(formData: FormData): Promise<SignUpResponse> {
  // 1. Extract raw data from the form submission
  const rawData = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  // 2. Validate the raw data against our Zod schema
  const validatedFields = signUpSchema.safeParse(rawData);

  // 3. Handle validation failure
  if (!validatedFields.success) {
    return {
      success: false,
      error: "Please check your inputs and try again.",
      // Zod's flatten() converts complex nested errors into a clean { field: ["error message"] } object
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 4. Extract perfectly typed and sanitized data from the successful parse
  // Here, TypeScript knows this exactly matches our SignUpInput type
  const { username, email, password } = validatedFields.data;

  // 5. Proceed with registration via Better Auth
  try {
    const session = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name: username, // Base schema requirement
        username,
      },
    });

    return {
      success: true,
      user: {
        id: session.user.id,
        email: session.user.email,
        // Fallback to our strictly-typed Zod username if Better Auth's type is nullable
        username: session.user.username || username, 
      },
      message: "Account created successfully.",
    };
  } catch (error) {
    if (error instanceof APIError) {
      return {
        success: false,
        error: error.message || "Authentication server failed to process registration.",
      };
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : "An unexpected execution error occurred.",
    };
  }
}