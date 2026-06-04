import Link from "next/link";
import { ArrowRight, Ticket, Trophy } from "lucide-react";
import { getCurrentUser } from "@/features/auth/actions/get-current-user";

export default async function HomePage() {
  // Fetch session state securely on the server to determine which CTAs to render
  const authData = await getCurrentUser();
  const user = authData?.user;

  return (
    <main className="relative flex min-h-[calc(100vh-4rem)] w-full flex-col items-center justify-center overflow-hidden bg-slate-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 px-4 sm:px-6 md:px-8">
      
      {/* Subtle Ambient Glows for the Passport Premium Aesthetic */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/10 blur-[120px] md:h-[600px] md:w-[600px]" />
      <div className="pointer-events-none absolute bottom-[-10%] right-[-10%] h-[400px] w-[400px] rounded-full bg-blue-900/10 blur-[120px] md:h-[600px] md:w-[600px]" />

      <div className="z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        
        {/* World Cup Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1.5 text-xs font-bold tracking-widest text-amber-500 uppercase backdrop-blur-sm">
          <Ticket className="h-3.5 w-3.5" />
          World Cup 2026 Collection
        </div>

        {/* Headline */}
        <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-slate-100 sm:text-5xl md:text-6xl lg:text-7xl">
          Collect the <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">World Cup.</span>
        </h1>

        {/* Subheadline */}
        <p className="mb-10 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg md:text-xl">
          Unlock limited drops, earn points, and build your passport before moments disappear forever.
        </p>

        {/* Dynamic Call-to-Action Buttons */}
        <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center">
          {user ? (
            <>
              <Link
                href="/passport"
                className="group flex h-14 w-full cursor-pointer items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-8 text-base font-bold text-slate-950 shadow-[0_0_30px_rgba(245,158,11,0.2)] transition-all hover:from-amber-400 hover:to-amber-500 hover:shadow-[0_0_40px_rgba(245,158,11,0.3)] sm:w-auto"
              >
                Open Passport
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/leaderboard"
                className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border border-slate-800 bg-slate-900/50 px-8 text-base font-medium text-slate-300 backdrop-blur-sm transition-all hover:border-amber-500/50 hover:text-amber-500 sm:w-auto"
              >
                <Trophy className="mr-2 h-5 w-5" />
                Leaderboard
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/register"
                className="group flex h-14 w-full cursor-pointer items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-8 text-base font-bold text-slate-950 shadow-[0_0_30px_rgba(245,158,11,0.2)] transition-all hover:from-amber-400 hover:to-amber-500 hover:shadow-[0_0_40px_rgba(245,158,11,0.3)] sm:w-auto"
              >
                Create Passport
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/login"
                className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border border-slate-800 bg-slate-900/50 px-8 text-base font-medium text-slate-300 backdrop-blur-sm transition-all hover:border-amber-500/50 hover:text-amber-500 sm:w-auto"
              >
                Sign In
              </Link>
            </>
          )}
        </div>

      </div>
    </main>
  );
}