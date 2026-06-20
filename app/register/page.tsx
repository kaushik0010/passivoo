import { Metadata } from "next";
import { RegisterForm } from "@/features/auth/components/register-form";

// Dynamic event configuration - easily swappable for future events
const ACTIVE_EVENT = {
  name: "FIFA World Cup 2026",
  shortName: "World Cup 2026",
  badge: "WORLD CUP 2026",
  year: "2026",
  emoji: "⚽",
};

export const metadata: Metadata = {
  title: "Initialize Passport",
  description: "Create your Passivoo account to start collecting live event drops and building your permanent digital archive.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function RegisterPage() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-slate-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 p-4 sm:p-6 md:p-8 relative overflow-hidden">
      
      {/* Ambient lighting */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Subtle noise texture */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.02] mix-blend-overlay"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />
      
      <div className="z-10 w-full max-w-5xl mx-auto">
        <RegisterForm activeEvent={ACTIVE_EVENT} />
      </div>
    </main>
  );
}