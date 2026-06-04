import { z } from "zod";

export const signUpSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, { message: "Username must be at least 3 characters." })
    .max(50, { message: "Username must not exceed 50 characters." }),
  
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email({ message: "Please provide a valid email address." }),
  
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

export type SignUpInput = z.infer<typeof signUpSchema>;