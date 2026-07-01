import { PassportContainer } from "@/features/passport/components/passport-container";
import { auth } from "@/lib/auth/auth";
import { Metadata } from "next";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Digital Fan Passport | Passivoo",
  description: "Your permanent digital passport. Archive your memories from the FIFA World Cup 2026 and beyond.",
  openGraph: {
    title: "My Digital Passivoo Fan Passport",
    description: "I'm collecting the moments and owning the history. See my passport on Passivoo.",
    type: "website",
  },
};

export default async function PassportPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  
  const user = session?.user 
    ? { 
        id: session.user.id, // <-- Fetch the unique ID
        name: session.user.name, 
        createdAt: session.user.createdAt 
      }
    : undefined;

  return (
    <main className="min-h-screen bg-zinc-950 py-12 px-4 relative overflow-hidden">
      
      {/* Ambient lighting matching other pages */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/5 blur-[120px] md:h-[800px] md:w-[800px]" />
      <div className="pointer-events-none absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-blue-900/5 blur-[120px] md:h-[800px] md:w-[800px]" />
      
      {/* Subtle noise texture */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.02] mix-blend-overlay"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-serif text-white uppercase tracking-tight mb-4">
          Fan Passport
        </h1>
        <p className="text-zinc-400 font-mono text-sm uppercase tracking-widest max-w-lg mx-auto">
          A permanent digital archive of your sporting journey. 
          Collect the moments, own the history.
        </p>
      </div>

      <PassportContainer user={user} />
    </main>
  );
}