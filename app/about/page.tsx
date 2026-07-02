import { Metadata } from "next";
import Link from "next/link";
import { TextDocumentLayout } from "@/components/layout/text-document-layout";

export const metadata: Metadata = {
  title: "About Passivoo | The Digital Fan Passport",
  description: "Passivoo is an independent, fan-made platform to permanently collect digital moments and build your passport across global sporting events.",
  openGraph: {
    title: "About Passivoo",
    description: "Collect the Moments. Own the History. Learn why we are building the permanent digital archive for sports fans.",
    type: "website",
  },
};

export default function AboutPage() {
  // Shared style for inline links to keep the code clean and maintain a premium, accessible feel
  const linkClass = "text-white hover:text-zinc-300 underline underline-offset-4 decoration-zinc-700 hover:decoration-zinc-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 rounded-sm";

  return (
    <TextDocumentLayout>
      {/* Meta Data */}
      <time className="block text-xs font-mono text-zinc-500 tracking-widest uppercase mb-8">
        Last Updated: July 2026
      </time>

      {/* Main Header */}
      <h1 className="text-4xl md:text-5xl font-serif font-black text-white uppercase tracking-tight mb-8">
        About Passivoo
      </h1>

      <div className="prose prose-invert prose-zinc max-w-none">
        
        {/* Intro */}
        <p className="text-lg md:text-xl text-zinc-300 leading-relaxed mb-6">
          Sports give us moments we never forget. A 90th-minute winner. A chaotic penalty shootout. An impossible comeback.
        </p>
        <p className="text-lg md:text-xl text-zinc-300 leading-relaxed mb-6">
          But after the tournament ends, the physical traces fade. Paper tickets get lost in drawers. Photos are buried under thousands of others on our phones. The timeline moves on.
        </p>
        <p className="text-lg md:text-xl text-zinc-300 leading-relaxed mb-12">
          I wanted a place where these moments could live permanently. That is why I built <Link href="/" className={linkClass}>Passivoo</Link>. It is a <Link href="/passport" className={linkClass}>digital passport</Link> for your lifetime as a sports fan.
        </p>

        {/* Section: Why Passivoo Exists */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif text-white uppercase tracking-wide mb-4 mt-12">
            Why Passivoo Exists
          </h2>
          <div className="space-y-4 text-zinc-400 leading-relaxed">
            <p>
              Passivoo isn't trying to change how we watch sports. The magic happens on the pitch, the track, and the court.
            </p>
            <p>
              It simply provides a permanent digital home for the moments you care about. When a historic upset happens, you <Link href="/drops" className={linkClass}>collect it</Link>. When your team wins a championship, you record it.
            </p>
            <p>
              It is a <Link href="/collections" className={linkClass}>quiet archive</Link> of the tournaments you have followed. Collect the moments. Own the history.
            </p>
          </div>
        </section>

        {/* Section: Our Vision */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif text-white uppercase tracking-wide mb-4">
            Our Vision
          </h2>
          <div className="space-y-4 text-zinc-400 leading-relaxed">
            <p>
              The project starts with the Football World Cup 2026. But the long-term goal is to build a single, unified passport for your entire life as a fan.
            </p>
            <p>
              Eventually, Passivoo will expand to the Olympics, Formula 1, the UEFA Champions League, and Cricket World Cups. One account. One timeline. Decades of sports history.
            </p>
          </div>
        </section>

        {/* Section: Built by an Independent Developer */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif text-white uppercase tracking-wide mb-4">
            Built by an Independent Developer
          </h2>
          <div className="space-y-4 text-zinc-400 leading-relaxed">
            <p>
              Passivoo is not backed by a large corporate team. It is designed and built by a single independent developer.
            </p>
            <p>
              I love building software and I love watching global sporting events. This project is simply the intersection of those two things. Every feature, design choice, and update comes from building daily, learning, and listening to the people using it.
            </p>
          </div>
        </section>

        {/* Section: Respect for Intellectual Property */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif text-white uppercase tracking-wide mb-4">
            Respect for Intellectual Property
          </h2>
          <div className="space-y-4 text-zinc-400 leading-relaxed">
            <p>
              Passivoo is strictly an <Link href="/disclaimer" className={linkClass}>independent, unofficial fan project</Link>. We are not affiliated with, endorsed by, sponsored by, or officially connected to FIFA, the International Olympic Committee, Formula 1, or any official tournament organizer.
            </p>
            <p>
              Event names, locations, and statistics are used purely to identify the tournaments fans are collecting memories for. All trademarks and brand names remain the exclusive property of their respective owners.
            </p>
          </div>
        </section>

        {/* Section: Looking Ahead */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif text-white uppercase tracking-wide mb-4">
            Looking Ahead
          </h2>
          <div className="space-y-4 text-zinc-400 leading-relaxed">
            <p>
              This is only version one. As the platform grows, Passivoo will add more sporting events, better collection mechanics, and new ways to look back on the moments that matter.
            </p>
          </div>
        </section>

        {/* Section: Contact & Legal */}
        <section className="pt-8 border-t border-zinc-800/50 mt-16">
          <p className="text-zinc-400 leading-relaxed mb-6">
            Questions, ideas, or feedback are always welcome. Feel free to reach out as we continue to build this platform.
          </p>
          <p className="text-zinc-500 text-sm leading-relaxed">
            For more information on platform usage and data protection, please review our <Link href="/terms" className="hover:text-zinc-300 underline underline-offset-4 decoration-zinc-700 hover:decoration-zinc-500 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 rounded-sm">terms of service</Link> and <Link href="/privacy" className="hover:text-zinc-300 underline underline-offset-4 decoration-zinc-700 hover:decoration-zinc-500 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 rounded-sm">privacy policy</Link>.
          </p>
        </section>

      </div>
    </TextDocumentLayout>
  );
}