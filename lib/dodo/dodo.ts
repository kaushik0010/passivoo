import DodoPayments from "dodopayments";
import { DODO_CONFIG } from "@/config/dodo";

const globalForDodo = globalThis as unknown as {
  dodo: DodoPayments | undefined;
};

export const dodo =
  globalForDodo.dodo ??
  new DodoPayments({
    bearerToken: process.env.DODO_PAYMENTS_API_KEY,
    environment: process.env.DODO_PAYMENTS_ENVIRONMENT as "test_mode" | "live_mode" || "test_mode",
    timeout: DODO_CONFIG.TIMEOUT_MS,
    maxRetries: DODO_CONFIG.MAX_RETRIES,
  });

if (process.env.NODE_ENV !== "production") globalForDodo.dodo = dodo;