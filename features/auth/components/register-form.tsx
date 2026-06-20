"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, Ticket, ShieldAlert, Sparkles, Crown, Globe } from "lucide-react";
import { signUpAction, type SignUpResponse } from "@/features/auth/actions/sign-up";
import { toast } from "sonner";

const initialState: SignUpResponse = {
  success: false,
  error: "",
};

interface ActiveEvent {
  name: string;
  shortName: string;
  badge: string;
  year: string;
  emoji: string;
}

interface RegisterFormProps {
  activeEvent: ActiveEvent;
}

export function RegisterForm({ activeEvent }: RegisterFormProps) {
  const router = useRouter();
  
  const actionBridge = async (prevState: SignUpResponse, formData: FormData) => {
    return await signUpAction(formData);
  };

  const [state, formAction, isPending] = useActionState(actionBridge, initialState);
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

  const isBusy = isPending || isSuccessRedirecting;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden bg-slate-900/50 border border-slate-800 shadow-2xl backdrop-blur-xl">
      
      {/* ==========================================
          LEFT SIDE: GRAPHICS / BRANDING
          ========================================== */}
      <div className="relative hidden lg:flex flex-col items-center justify-center p-10 xl:p-14 bg-gradient-to-br from-slate-950 via-slate-900/80 to-slate-950 overflow-hidden min-h-[600px]">
        
        {/* Background ambient glow */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />
        
        {/* Decorative grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none" />
        
        {/* Corner accents */}
        <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-amber-500/40 rounded-tl-sm pointer-events-none" />
        <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-amber-500/40 rounded-tr-sm pointer-events-none" />
        <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-amber-500/40 rounded-bl-sm pointer-events-none" />
        <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-amber-500/40 rounded-br-sm pointer-events-none" />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center space-y-8 max-w-sm">
          
          {/* Event Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1.5 text-[10px] font-bold tracking-widest text-amber-500 uppercase backdrop-blur-sm">
            <span>{activeEvent.emoji}</span>
            {activeEvent.badge}
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span>
            </span>
          </div>
          
          {/* Brand */}
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Ticket className="h-6 w-6 text-amber-500" />
              <span className="text-sm font-mono tracking-[0.3em] text-amber-500/80 uppercase">
                Passivoo
              </span>
            </div>
            <h1 className="text-4xl xl:text-5xl font-black tracking-tight text-white uppercase leading-tight">
              Digital Passport
            </h1>
          </div>
          
          {/* Divider with crown */}
          <div className="flex items-center gap-4 w-full max-w-[200px]">
            <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-amber-500/50" />
            <Crown className="h-4 w-4 text-amber-500/60" />
            <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-amber-500/50" />
          </div>
          
          {/* PASSport detail */}
          <div className="space-y-1">
            <p className="text-xs font-mono tracking-[0.2em] text-slate-400 uppercase">
              Passport
            </p>
            <p className="text-2xl font-black tracking-widest text-amber-500/80">
              #001
            </p>
          </div>
          
          {/* Brand Values */}
          <div className="flex items-center gap-3 text-xs font-mono tracking-[0.2em] text-slate-400 uppercase">
            <span>Collect</span>
            <span className="text-amber-500/40">•</span>
            <span>Connect</span>
            <span className="text-amber-500/40">•</span>
            <span>Compete</span>
          </div>
          
          {/* Distributed by */}
          <div className="pt-4 mt-4 border-t border-slate-800/50 w-full max-w-[200px]">
            <p className="text-[8px] font-mono tracking-[0.3em] text-slate-500 uppercase">
              Distributed by
            </p>
            <p className="text-xs font-mono tracking-[0.2em] text-slate-400 uppercase mt-1">
              Passion <span className="text-amber-500/40">•</span> Glory
            </p>
          </div>
          
          {/* Brand Tagline */}
          <div className="pt-2">
            <p className="text-[10px] font-mono tracking-[0.15em] text-slate-500 italic">
              Your journey. Your collection. Your legacy.
            </p>
          </div>
          
        </div>
      </div>
      
      {/* ==========================================
          RIGHT SIDE: FORM
          ========================================== */}
      <div className="relative p-6 sm:p-8 md:p-10 bg-slate-900/30 backdrop-blur-sm flex flex-col justify-center min-h-[600px]">
        
        {/* Mobile: Show condensed header */}
        <div className="lg:hidden flex flex-col items-center text-center space-y-3 mb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-[10px] font-bold tracking-widest text-amber-500 uppercase backdrop-blur-sm">
            <span>{activeEvent.emoji}</span>
            {activeEvent.badge}
          </div>
          <div className="flex items-center justify-center gap-2">
            <Ticket className="h-4 w-4 text-amber-500" />
            <span className="text-xs font-mono tracking-[0.3em] text-amber-500/80 uppercase">
              Passivoo
            </span>
          </div>
          <h2 className="text-xl font-black tracking-tight text-white uppercase">
            Digital Passport
          </h2>
          <p className="text-xs text-slate-400">
            Create your passport to start collecting
          </p>
        </div>
        
        {/* Global Error Banner */}
        {!state.success && state.error && (
          <div className="mb-6 p-4 rounded-lg bg-red-950/50 border border-red-900/50 flex items-start gap-3">
            <ShieldAlert className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
            <p className="text-sm text-red-200">{state.error}</p>
          </div>
        )}

        {/* Form */}
        <form action={formAction} className="space-y-5">
          
          {/* Username Field */}
          <div className="space-y-2">
            <label 
              htmlFor="username" 
              className="text-xs font-medium text-slate-300 tracking-wider uppercase flex items-center gap-2"
            >
              <span className="text-amber-500/60">●</span>
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              disabled={isBusy}
              autoComplete="username"
              className="w-full h-11 px-4 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all duration-200 disabled:opacity-50"
              placeholder="Choose your username"
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
              className="text-xs font-medium text-slate-300 tracking-wider uppercase flex items-center gap-2"
            >
              <span className="text-amber-500/60">●</span>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              disabled={isBusy}
              autoComplete="email"
              className="w-full h-11 px-4 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all duration-200 disabled:opacity-50"
              placeholder="Enter your email"
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
              className="text-xs font-medium text-slate-300 tracking-wider uppercase flex items-center gap-2"
            >
              <span className="text-amber-500/60">●</span>
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              disabled={isBusy}
              autoComplete="new-password"
              className="w-full h-11 px-4 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all duration-200 disabled:opacity-50"
              placeholder="Enter your password"
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
            className="w-full h-12 mt-4 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold hover:from-amber-400 hover:to-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.2)] hover:shadow-[0_0_40px_rgba(245,158,11,0.3)] active:scale-[0.98] cursor-pointer"
          >
            {isBusy ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Create Passport
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 space-y-4">
          {/* Login Link */}
          <div className="text-center">
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
          
          {/* Mobile: Show brand tagline */}
          <div className="lg:hidden text-center pt-2 border-t border-slate-800/50">
            <p className="text-[10px] font-mono tracking-[0.15em] text-slate-500 italic">
              Your journey. Your collection. Your legacy.
            </p>
          </div>
        </div>
        
      </div>
      
    </div>
  );
}