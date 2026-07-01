import { Metadata } from "next";
import Link from "next/link";
import { TextDocumentLayout } from "@/components/layout/text-document-layout";

export const metadata: Metadata = {
  title: "Privacy Policy | Passivoo",
  description: "Learn how Passivoo collects, uses, and protects your information while you build your digital sports passport.",
  openGraph: {
    title: "Privacy Policy | Passivoo",
    description: "Learn how Passivoo collects, uses, and protects your information while you build your digital sports passport.",
    type: "website",
  },
};

export default function PrivacyPage() {
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
        Privacy Policy
      </h1>

      <div className="prose prose-invert prose-zinc max-w-none">
        
        {/* Intro */}
        <p className="text-lg text-zinc-300 leading-relaxed mb-12">
          Respecting your privacy is important to us. This page explains what information we collect, why we need it, and how it is handled when you use <Link href="/" className={linkClass}>Passivoo</Link>. We aim to be completely transparent about how this platform operates.
        </p>

        {/* Section: Information We Collect */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif text-white uppercase tracking-wide mb-6">
            Information We Collect
          </h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-serif text-zinc-200 mb-2">Account Information</h3>
              <p className="text-zinc-400 leading-relaxed">
                When you create an account (powered by Better Auth), we collect basic details like your username, email address, and authentication information. This is collected solely to secure your account and allow you to log in.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-serif text-zinc-200 mb-2">Passport & Collection Data</h3>
              <p className="text-zinc-400 leading-relaxed">
                To make the platform work, we store information in our database (MongoDB) related to your <Link href="/passport" className={linkClass}>Digital Fan Passport</Link>. This includes the <Link href="/drops" className={linkClass}>collectibles</Link> you have claimed, premium items you have purchased, and the overall status of your <Link href="/collections" className={linkClass}>collections</Link>. This allows you to access your digital memories seamlessly across any device.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-serif text-zinc-200 mb-2">Payment Information</h3>
              <p className="text-zinc-400 leading-relaxed">
                If you choose to purchase premium collectibles, your payments are securely processed by our payment partner, Dodo Payments. Passivoo does not store your full payment card information. We only retain the basic transaction records required to verify your purchases and deliver your digital items.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-serif text-zinc-200 mb-2">Analytics</h3>
              <p className="text-zinc-400 leading-relaxed">
                We use privacy-focused analytics (PostHog) to understand how the platform is used. This includes measuring page visits, which features are popular, and identifying bugs. This data helps us build better experiences for fans. We do not use this data for advertising, and we absolutely do not sell your data.
              </p>
            </div>
          </div>
        </section>

        {/* Section: How We Use Information */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif text-white uppercase tracking-wide mb-4">
            How We Use Information
          </h2>
          <div className="space-y-4 text-zinc-400 leading-relaxed">
            <p>The information we collect is used strictly to operate and improve the platform. Specifically, we use it to:</p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-300">
              <li>Create and authenticate your account.</li>
              <li>Build and render your Digital Fan Passports.</li>
              <li>Deliver your claimed and purchased collectibles.</li>
              <li>Process premium transactions securely.</li>
              <li>Improve platform performance and design.</li>
              <li>Prevent abuse and maintain security.</li>
            </ul>
          </div>
        </section>

        {/* Section: Cookies */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif text-white uppercase tracking-wide mb-4">
            Cookies
          </h2>
          <div className="space-y-4 text-zinc-400 leading-relaxed">
            <p>
              We use cookies and similar technologies only where necessary. This includes keeping you signed in, ensuring platform security, and running our basic product analytics.
            </p>
          </div>
        </section>

        {/* Section: Data Sharing */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif text-white uppercase tracking-wide mb-4">
            Data Sharing
          </h2>
          <div className="space-y-4 text-zinc-400 leading-relaxed">
            <p>
              Passivoo does not sell your personal information. Ever.
            </p>
            <p>
              Information is only shared with trusted service providers when it is absolutely necessary to operate the platform. For example, we rely on Vercel for hosting, Dodo Payments for transactions, and PostHog for analytics. These providers only access the data required to perform their specific functions.
            </p>
          </div>
        </section>

        {/* Section: Data Security */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif text-white uppercase tracking-wide mb-4">
            Data Security
          </h2>
          <div className="space-y-4 text-zinc-400 leading-relaxed">
            <p>
              We use reasonable technical and organizational measures to protect your information from unauthorized access or loss. However, no online service can guarantee absolute security. We encourage you to use a strong password and keep your login credentials safe.
            </p>
          </div>
        </section>

        {/* Section: Your Choices */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif text-white uppercase tracking-wide mb-4">
            Your Choices
          </h2>
          <div className="space-y-4 text-zinc-400 leading-relaxed">
            <p>
              You have control over your experience. You can update your account information from your profile settings, or simply stop using the service at any time. If you have questions regarding your data or wish to request account deletion, please contact us.
            </p>
          </div>
        </section>

        {/* Section: Children's Privacy */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif text-white uppercase tracking-wide mb-4">
            Children's Privacy
          </h2>
          <div className="space-y-4 text-zinc-400 leading-relaxed">
            <p>
              Passivoo is designed for sports fans, but it is not intended for young children without parental guidance. We do not knowingly collect personal information from children where prohibited by law.
            </p>
          </div>
        </section>

        {/* Section: Changes to this Policy */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif text-white uppercase tracking-wide mb-4">
            Changes to this Privacy Policy
          </h2>
          <div className="space-y-4 text-zinc-400 leading-relaxed">
            <p>
              As the platform evolves and expands to new global events, we may update this policy. The "Last Updated" date at the top of the page will always reflect the current version.
            </p>
          </div>
        </section>

        {/* Section: Contact & Legal Cross-links */}
        <section className="pt-8 border-t border-zinc-800/50 mt-16">
          <p className="text-zinc-400 leading-relaxed mb-6">
            If you have questions or concerns about this policy, feedback is always welcome. 
          </p>
          <p className="text-zinc-500 text-sm leading-relaxed">
            To learn more <Link href="/about" className="hover:text-zinc-300 underline underline-offset-4 decoration-zinc-700 hover:decoration-zinc-500 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 rounded-sm">about the project</Link> or to review the rules for using the platform, please see our <Link href="/terms" className="hover:text-zinc-300 underline underline-offset-4 decoration-zinc-700 hover:decoration-zinc-500 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 rounded-sm">terms of service</Link> and our <Link href="/disclaimer" className="hover:text-zinc-300 underline underline-offset-4 decoration-zinc-700 hover:decoration-zinc-500 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 rounded-sm">unofficial disclaimer</Link>.
          </p>
        </section>

      </div>
    </TextDocumentLayout>
  );
}