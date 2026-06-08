import { z } from "zod";

export const CheckoutRequestSchema = z.object({
  bundleId: z.string().min(1, "Bundle ID is required"),
});

export type CheckoutRequest = z.infer<typeof CheckoutRequestSchema>;