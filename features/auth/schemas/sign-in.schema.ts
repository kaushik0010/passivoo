import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email({ message: "Please provide a valid email address." }),
  
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

export type SignInInput = z.infer<typeof signInSchema>;