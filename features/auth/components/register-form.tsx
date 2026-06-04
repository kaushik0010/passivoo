"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, Ticket, ShieldAlert } from "lucide-react";
import { signUpAction, type SignUpResponse } from "@/features/auth/actions/sign-up";
import { toast } from "sonner";

const initialState: SignUpResponse = {
  success: false,
  error: "",
};

export function RegisterForm() {
  const router = useRouter();
  
  // 1. We create a bridge function to satisfy React 19's useActionState signature.
  // It absorbs the previous state as the first argument, and forwards the FormData to our action.
  const actionBridge = async (prevState: SignUpResponse, formData: FormData) => {
    return await signUpAction(formData);
  };

  const [state, formAction, isPending] = useActionState(actionBridge, initialState);
  
  // Track if we successfully registered to prevent flicker during redirect
  const [isSuccessRedirecting, setIsSuccessRedirecting] = useState(false);

  useEffect(() => {
    if (state.success) {
      toast.success("Passport created successfully.");
      setIsSuccessRedirecting(true);
      router.push("/");
    } else if (state.error) {
      toast.error(state.error);
    }
  }, [state, router]);

  // If redirecting, we hold the loading state to prevent the form from re-enabling
  const isBusy = isPending || isSuccessRedirecting;

  return (
    <div className="w-full max-w-sm mx-auto p-6 md:p-8 rounded-2xl bg-slate-900/50 border border-slate-800 shadow-2xl backdrop-blur-xl">
      
      {/* Header Section */}
      <div className="flex flex-col items-center text-center space-y-3 mb-8">
        <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20 mb-2">
          <Ticket className="h-6 w-6 text-amber-500" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-100">
          Create Your Passport
        </h1>
        <p className="text-sm text-slate-400">
          Collect limited World Cup moments before they're gone forever.
        </p>
      </div>

      {/* Global Error Banner */}
      {!state.success && state.error && (
        <div className="mb-6 p-4 rounded-lg bg-red-950/50 border border-red-900/50 flex items-start gap-3">
          <ShieldAlert className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
          <p className="text-sm text-red-200">{state.error}</p>
        </div>
      )}

      {/* Form Action Wrapper */}
      <form action={formAction} className="space-y-5">
        
        {/* Username Field */}
        <div className="space-y-2">
          <label 
            htmlFor="username" 
            className="text-xs font-medium text-slate-300 tracking-wider uppercase"
          >
            Collector Handle
          </label>
          <input
            id="username"
            name="username"
            type="text"
            required
            disabled={isBusy}
            autoComplete="username"
            className="w-full h-11 px-4 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-colors disabled:opacity-50"
            placeholder="e.g. messi10"
          />
          {!state.success && state.fieldErrors?.username && (
            <p className="text-xs text-red-400 font-medium">
              {state.fieldErrors.username[0]}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <label 
            htmlFor="email" 
            className="text-xs font-medium text-slate-300 tracking-wider uppercase"
          >
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            disabled={isBusy}
            autoComplete="email"
            className="w-full h-11 px-4 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-colors disabled:opacity-50"
            placeholder="you@example.com"
          />
          {!state.success && state.fieldErrors?.email && (
            <p className="text-xs text-red-400 font-medium">
              {state.fieldErrors.email[0]}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <label 
            htmlFor="password" 
            className="text-xs font-medium text-slate-300 tracking-wider uppercase"
          >
            Security Key
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            disabled={isBusy}
            autoComplete="new-password"
            className="w-full h-11 px-4 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-colors disabled:opacity-50"
            placeholder="••••••••"
          />
          {!state.success && state.fieldErrors?.password && (
            <p className="text-xs text-red-400 font-medium">
              {state.fieldErrors.password[0]}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isBusy}
          className="w-full h-12 mt-6 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold hover:from-amber-400 hover:to-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.2)] cursor-pointer"
        >
          {isBusy ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Stamping Passport...
            </>
          ) : (
            "Create Passport"
          )}
        </button>
      </form>

      {/* Footer Navigation */}
      <div className="mt-8 text-center">
        <p className="text-sm text-slate-400">
          Already have a passport?{" "}
          <Link 
            href="/login" 
            className="text-amber-500 font-medium hover:text-amber-400 underline-offset-4 hover:underline transition-all"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}