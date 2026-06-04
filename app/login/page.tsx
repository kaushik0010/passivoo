import { Metadata } from "next";
import { LoginForm } from "@/features/auth/components/login-form";

export const metadata: Metadata = {
  title: "Welcome Back | Passivoo",
  description: "Continue your journey and collect limited World Cup moments.",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 p-4 sm:p-6 md:p-8 relative overflow-hidden">
      {/* Subtle background ambient glows matching the registration page aesthetic */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="z-10 w-full flex justify-center">
        <LoginForm />
      </div>
    </main>
  );
}