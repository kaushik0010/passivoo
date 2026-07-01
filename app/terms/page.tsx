import { Metadata } from "next";
import Link from "next/link";
import { TextDocumentLayout } from "@/components/layout/text-document-layout";

export const metadata: Metadata = {
  title: "Terms of Service | Passivoo",
  description: "Read the rules and guidelines for using Passivoo, an independent digital collectible platform for sports fans.",
  openGraph: {
    title: "Terms of Service | Passivoo",
    description: "Read the rules and guidelines for using Passivoo, an independent digital collectible platform for sports fans.",
    type: "website",
  },
};

export default function TermsPage() {
  // Shared style for inline links to maintain accessibility and visual consistency
  const linkClass = "text-white hover:text-zinc-300 underline underline-offset-4 decoration-zinc-700 hover:decoration-zinc-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 rounded-sm";

  return (
    <TextDocumentLayout>
      {/* Meta Data */}
      <time className="block text-xs font-mono text-zinc-500 tracking-widest uppercase mb-8">
        Last Updated: July 2026
      </time>

      {/* Main Header */}
      <h1 className="text-4xl md:text-5xl font-serif font-black text-white uppercase tracking-tight mb-8">
        Terms of Service
      </h1>

      <div className="prose prose-invert prose-zinc max-w-none">
        
        {/* Intro */}
        <p className="text-lg text-zinc-300 leading-relaxed mb-12">
          Welcome to <Link href="/" className={linkClass}>Passivoo</Link>. By accessing or using our platform, you agree to follow these Terms of Service. We have kept them as simple and human as possible, so please read them carefully.
        </p>

        {/* Section: Using Passivoo */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif text-white uppercase tracking-wide mb-4">
            Using Passivoo
          </h2>
          <div className="space-y-4 text-zinc-400 leading-relaxed">
            <p>
              Passivoo is built for sports fans. You may use the platform for personal, non-commercial purposes to collect digital memories and celebrate the sporting events you love. We ask that you use the platform responsibly and treat the community with respect.
            </p>
          </div>
        </section>

        {/* Section: Accounts */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif text-white uppercase tracking-wide mb-4">
            Accounts
          </h2>
          <div className="space-y-4 text-zinc-400 leading-relaxed">
            <p>
              When you create an account to build your <Link href="/passport" className={linkClass}>Digital Fan Passport</Link>, you are responsible for maintaining the security of your login credentials. 
            </p>
            <p>
              Please choose appropriate usernames. If an account is found to be abusing the platform, impersonating others, or violating these terms, we reserve the right to suspend or terminate it to protect the integrity of the project.
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
              When you claim <Link href="/drops" className={linkClass}>digital collectibles</Link> on our platform, you are collecting digital memorabilia created specifically for fans. 
            </p>
            <p>
              Owning an item inside your <Link href="/collections" className={linkClass}>collection</Link> simply means it is tied to your account on our platform. It does not transfer any ownership, copyright, or commercial rights of any tournament branding, logos, or intellectual property. These collectibles exist exclusively within the Passivoo ecosystem.
            </p>
          </div>
        </section>

        {/* Section: Premium Purchases */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif text-white uppercase tracking-wide mb-4">
            Premium Purchases
          </h2>
          <div className="space-y-4 text-zinc-400 leading-relaxed">
            <p>
              While much of Passivoo is free to use, we may offer optional premium collectibles or features. Purchasing these items unlocks digital content inside your account. 
            </p>
            <p>
              Future pricing and digital offerings may change as the platform evolves. Any refunds, if applicable, are governed strictly by local laws and the policies of our payment providers. We do not make promises or guarantees regarding the future financial value of any digital item.
            </p>
          </div>
        </section>

        {/* Section: Acceptable Use */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif text-white uppercase tracking-wide mb-4">
            Acceptable Use
          </h2>
          <div className="space-y-4 text-zinc-400 leading-relaxed">
            <p>To keep Passivoo a fair and enjoyable space, you agree that you will not:</p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-300">
              <li>Attempt to hack, exploit, or disrupt the platform.</li>
              <li>Scrape data or reverse engineer our software.</li>
              <li>Use bots or automated scripts to gain unfair advantages.</li>
              <li>Upload malicious content or send spam.</li>
              <li>Impersonate other individuals or organizations.</li>
            </ul>
          </div>
        </section>

        {/* Section: Availability */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif text-white uppercase tracking-wide mb-4">
            Availability
          </h2>
          <div className="space-y-4 text-zinc-400 leading-relaxed">
            <p>
              Passivoo is continuously evolving. Features may be added, altered, or removed over time. While we do our absolute best to keep everything running smoothly, some services may become temporarily unavailable for maintenance or upgrades, and we cannot guarantee uninterrupted availability.
            </p>
          </div>
        </section>

        {/* Section: Intellectual Property */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif text-white uppercase tracking-wide mb-4">
            Intellectual Property
          </h2>
          <div className="space-y-4 text-zinc-400 leading-relaxed">
            <p>
              Passivoo owns its software, UI design, branding, and original platform content. 
            </p>
            <p>
              As detailed in our <Link href="/disclaimer" className={linkClass}>disclaimer</Link>, Passivoo is an independent project. All tournament names, trademarks, and logos used to identify sporting events remain the exclusive property of their respective owners. We make no claim to official affiliation.
            </p>
          </div>
        </section>

        {/* Section: Limitation of Liability */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif text-white uppercase tracking-wide mb-4">
            Limitation of Liability
          </h2>
          <div className="space-y-4 text-zinc-400 leading-relaxed">
            <p>
              Passivoo is provided on an "as is" and "as available" basis. While we strive to provide a safe and reliable experience, we cannot guarantee that the service will be flawless or accept liability for every possible issue, data loss, or interruption that may occur.
            </p>
            <p>
              To read more about why we are building this platform, you can learn <Link href="/about" className={linkClass}>about the project</Link> and our mission. For details on how we handle your data, please review our <Link href="/privacy" className={linkClass}>privacy policy</Link>.
            </p>
          </div>
        </section>

        {/* Section: Changes to These Terms */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif text-white uppercase tracking-wide mb-4">
            Changes to These Terms
          </h2>
          <div className="space-y-4 text-zinc-400 leading-relaxed">
            <p>
              As Passivoo grows and expands to new events, these Terms of Service may be updated. The "Last Updated" date at the top of this page will always reflect the latest version. Continued use of the platform after updates indicates your acceptance of the new terms.
            </p>
          </div>
        </section>

        {/* Section: Contact */}
        <section className="pt-8 border-t border-zinc-800/50 mt-16">
          <p className="text-zinc-400 leading-relaxed">
            Questions or concerns about these Terms are always welcome. Feel free to reach out to us for clarification.
          </p>
        </section>

      </div>
    </TextDocumentLayout>
  );
}