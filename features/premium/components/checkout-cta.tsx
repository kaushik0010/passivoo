"use client";

import React, { useState, useTransition } from "react";
import { Loader2, ShieldCheck } from "lucide-react";
import { createCheckoutSession } from "@/features/premium/actions/create-checkout-session";

interface CheckoutCTAProps {
  bundleId: string;
}

export function CheckoutCTA({ bundleId }: CheckoutCTAProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = () => {
    setError(null);

    startTransition(async () => {
      try {
        const result = await createCheckoutSession({ bundleId });

        if (result.success && result.checkoutUrl) {
          window.location.assign(result.checkoutUrl);
        } else {
          setError(result.message || "Failed to initialize secure checkout.");
        }
      } catch (err) {
        console.error("[CHECKOUT_CLIENT_ERROR]:", err);
        setError("A network error occurred. Please try again.");
      }
    });
  };

  return (
    <div className="flex flex-col items-center gap-2 sm:gap-3 w-full sm:w-auto">
      {error && (
        <p className="text-[10px] sm:text-xs font-mono text-rose-400 bg-rose-950/40 border border-rose-900/50 px-3 sm:px-4 py-2 rounded-lg text-center w-full">
          ⚠️ {error}
        </p>
      )}
      
      <button
        onClick={handleCheckout}
        disabled={isPending}
        className="w-full sm:w-auto flex items-center justify-center gap-1.5 sm:gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:from-amber-400 hover:to-amber-500 disabled:from-zinc-800 disabled:to-zinc-800 disabled:text-zinc-500 font-bold py-2.5 sm:py-3.5 px-4 sm:px-8 rounded-xl transition-all duration-200 active:scale-[0.98] shadow-[0_0_30px_rgba(245,158,11,0.15)] uppercase tracking-wider text-xs sm:text-sm cursor-pointer"
      >
        {isPending ? (
          <>
            <Loader2 size={16} className="animate-spin sm:h-[18px] sm:w-[18px]" />
            <span>Processing...</span>
          </>
        ) : (
          <>
            <ShieldCheck size={16} strokeWidth={2} className="sm:h-[18px] sm:w-[18px]" />
            <span>Secure Checkout</span>
          </>
        )}
      </button>
    </div>
  );
}