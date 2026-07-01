import { Metadata } from "next";
import Link from "next/link";
import { TextDocumentLayout } from "@/components/layout/text-document-layout";

export const metadata: Metadata = {
  title: "Disclaimer | Passivoo",
  description: "Passivoo is an independent, unofficial fan project. Read our disclaimer regarding trademarks, copyrights, and our relationship with official sporting organizations.",
  openGraph: {
    title: "Disclaimer | Passivoo",
    description: "Passivoo is an independent, unofficial fan project. Read our disclaimer regarding trademarks, copyrights, and our relationship with official sporting organizations.",
    type: "website",
  },
};

export default function DisclaimerPage() {
  // Shared style for inline links to maintain accessibility and visual consistency across all text pages
  const linkClass = "text-white hover:text-zinc-300 underline underline-offset-4 decoration-zinc-700 hover:decoration-zinc-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 rounded-sm";

  return (
    <TextDocumentLayout>
      {/* Meta Data */}
      <time className="block text-xs font-mono text-zinc-500 tracking-widest uppercase mb-8">
        Last Updated: July 2026
      </time>

      {/* Main Header */}
      <h1 className="text-4xl md:text-5xl font-serif font-black text-white uppercase tracking-tight mb-8">
        Disclaimer
      </h1>

      <div className="prose prose-invert prose-zinc max-w-none">
        
        {/* Intro */}
        <p className="text-lg text-zinc-300 leading-relaxed mb-12">
          This page exists to provide complete transparency regarding the relationship between <Link href="/" className={linkClass}>Passivoo</Link> and third-party sporting organizations. We believe in being upfront about who we are and what we do.
        </p>

        {/* Section: Independent Fan Project */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif text-white uppercase tracking-wide mb-4">
            Independent Fan Project
          </h2>
          <div className="space-y-4 text-zinc-400 leading-relaxed">
            <p>
              Passivoo is an independently developed fan project. As explained in detail on our <Link href="/about" className={linkClass}>about page</Link>, this platform is created and maintained by an independent developer who loves sports.
            </p>
            <p>
              <strong>Passivoo is NOT owned, operated, sponsored, endorsed, or officially associated with FIFA, the International Olympic Committee, Formula 1, UEFA, the ICC, or any other official sporting organization.</strong>
            </p>
          </div>
        </section>

        {/* Section: Trademarks */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif text-white uppercase tracking-wide mb-4">
            Trademarks
          </h2>
          <div className="space-y-4 text-zinc-400 leading-relaxed">
            <p>
              All tournament names, competition names, club names, team names, player names, logos, brand names, and trademarks mentioned or displayed on this platform remain the exclusive property of their respective owners. 
            </p>
            <p>
              These references are used strictly in a descriptive, editorial context to identify the specific sporting events that fans are celebrating. Their use does not imply any affiliation with or endorsement by the trademark holders.
            </p>
          </div>
        </section>

        {/* Section: Copyright */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif text-white uppercase tracking-wide mb-4">
            Copyright
          </h2>
          <div className="space-y-4 text-zinc-400 leading-relaxed">
            <p>
              The original software, website design, user interface, Passivoo branding, original digital artwork, and the design of the <Link href="/passport" className={linkClass}>Digital Fan Passport</Link> belong entirely to Passivoo. 
            </p>
            <p>
              Any third-party intellectual property, photography, or event-specific imagery remains with its respective owners. We respect the intellectual property rights of others and expect users of our platform to do the same.
            </p>
          </div>
        </section>

        {/* Section: Digital Collectibles */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif text-white uppercase tracking-wide mb-4">
            Digital Collectibles
          </h2>
          <div className="space-y-4 text-zinc-400 leading-relaxed">
            <p>
              When you claim or purchase <Link href="/drops" className={linkClass}>digital collectibles</Link> on our platform, you are collecting fan-made digital memorabilia intended to celebrate historic sporting moments.
            </p>
            <p>
              Owning an item in your <Link href="/collections" className={linkClass}>collection</Link> does NOT transfer any real-world ownership of trademarks, logos, event branding, or copyright. Premium collectibles simply unlock digital content and experiences exclusively within the Passivoo ecosystem.
            </p>
          </div>
        </section>

        {/* Section: Accuracy of Information */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif text-white uppercase tracking-wide mb-4">
            Accuracy of Information
          </h2>
          <div className="space-y-4 text-zinc-400 leading-relaxed">
            <p>
              While we strive to keep all sporting information, match data, and event statistics accurate and up to date, mistakes or delays may occasionally occur. Users should always verify schedules, results, and other critical sporting information through official tournament sources.
            </p>
          </div>
        </section>

        {/* Section: External Links */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif text-white uppercase tracking-wide mb-4">
            External Links
          </h2>
          <div className="space-y-4 text-zinc-400 leading-relaxed">
            <p>
              Passivoo may contain links to external websites for context or convenience. We are not responsible for the content, privacy practices, or availability of any third-party websites.
            </p>
          </div>
        </section>

        {/* Section: Future Events */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif text-white uppercase tracking-wide mb-4">
            Future Events
          </h2>
          <div className="space-y-4 text-zinc-400 leading-relaxed">
            <p>
              Passivoo plans to support additional global sporting events in the future. The same principles of independence, respect for intellectual property, and unofficial status described in this Disclaimer apply to all future event integrations on the platform.
            </p>
          </div>
        </section>

        {/* Section: Contact & Legal Links */}
        <section className="pt-8 border-t border-zinc-800/50 mt-16">
          <p className="text-zinc-400 leading-relaxed mb-6">
            If you have any questions regarding this Disclaimer, please feel free to reach out to us.
          </p>
          <p className="text-zinc-500 text-sm leading-relaxed">
            Please also ensure you review our <Link href="/terms" className="hover:text-zinc-300 underline underline-offset-4 decoration-zinc-700 hover:decoration-zinc-500 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 rounded-sm">terms of service</Link> for platform usage rules and our <Link href="/privacy" className="hover:text-zinc-300 underline underline-offset-4 decoration-zinc-700 hover:decoration-zinc-500 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 rounded-sm">privacy policy</Link> to understand how we handle your data.
          </p>
        </section>

      </div>
    </TextDocumentLayout>
  );
}