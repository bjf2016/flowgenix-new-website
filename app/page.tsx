import Hero from '@/components/Hero';
import { DemoTiles } from '@/components/DemoTiles';
import { AboutStrip } from '@/components/AboutStrip';
import { BlogList } from '@/components/BlogList';
import { TrustSignals } from '@/components/TrustSignals';
import { CallToAction } from '@/components/CallToAction';
import { fetchLatestPosts } from '@/lib/sanity';
import Link from 'next/link';

export const revalidate = 60;

export default async function Home() {
  const posts = await fetchLatestPosts(3);

  return (
    <div className="space-y-20 pb-20">
      <Hero
        eyebrow="Built for local & service-based businesses"
        title="AI Systems & Workflow Automation for Service Businesses"
        highlight="Service Businesses"
        subtitle="FlowGenixAI designs and implements AI phone, intake, and automation systems so your team answers every call, captures every lead, and keeps your CRM up to date — without adding headcount."
        features="AI voice receptionist · Multi-step intake & routing · CRM dashboards & workflows"
        primaryCta={{ label: "Book a strategy call", href: "/contact" }}
        secondaryCta={{ label: "View solutions", href: "/services" }}
        badges={[
          { src: "/badges/cert-1.svg", alt: "Certification placeholder" },
          { src: "/badges/cert-2.svg", alt: "Award placeholder" }
        ]}
        portraitSrc="/brand/ben v4.png"
        trustLogos={["retell","n8n","sanity","vercel"]}
      />

      <section className="container mx-auto max-w-7xl px-6 -mt-8">
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-3">We specialize in:</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/services"
              className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium hover:bg-[#009CE3] hover:text-white transition-colors"
            >
              Dentists
            </Link>
            <Link
              href="/services"
              className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium hover:bg-[#009CE3] hover:text-white transition-colors"
            >
              Local services
            </Link>
            <Link
              href="/services"
              className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium hover:bg-[#009CE3] hover:text-white transition-colors"
            >
              Other SMBs
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            AI systems we implement
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We design and deploy practical AI systems that plug into your existing tools and workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              AI Voice Receptionist & Call Systems
            </h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Answer every call, qualify intent, and capture leads 24/7 without adding headcount.
            </p>
            <Link
              href="/services"
              className="inline-flex items-center text-[#009CE3] font-semibold hover:gap-2 transition-all"
            >
              View solutions
              <span className="ml-1">→</span>
            </Link>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Lead Intake & Routing
            </h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Guide callers and web visitors through the right questions, then route structured data into n8n and Google Sheets or your CRM.
            </p>
            <Link
              href="/services"
              className="inline-flex items-center text-[#009CE3] font-semibold hover:gap-2 transition-all"
            >
              View solutions
              <span className="ml-1">→</span>
            </Link>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Workflow Automation & Reporting
            </h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Automate handoffs, reminders, and give your team a clear view of what AI is capturing and where it's going.
            </p>
            <Link
              href="/services"
              className="inline-flex items-center text-[#009CE3] font-semibold hover:gap-2 transition-all"
            >
              View solutions
              <span className="ml-1">→</span>
            </Link>
          </div>
        </div>
      </section>

      <DemoTiles
        id="demos"
        items={[
          {
            title: "Dentist Intake Bot",
            label: "Demo (synthetic)",
            description: "Collect the right info and increase completed bookings.",
            href: "/demo/dentist-intake-bot"
          },
          {
            title: "HVAC After-Hours Bot",
            label: "Demo (synthetic)",
            description: "Capture overnight leads and prepare next-day dispatch.",
            href: "/demo/hvac-after-hours"
          },
          {
            title: "Restaurant Waitlist Bot",
            label: "Demo (synthetic)",
            description: "Confirm reservations and reduce no-shows.",
            href: "/demo/restaurant-waitlist"
          }
        ]}
      />

      <AboutStrip />

      <BlogList posts={posts} />

      <TrustSignals />

      <CallToAction
        title="Ready to see it in action?"
        primary={{
          label: "Talk to our AI front desk",
          onClick: "openChat"
        }}
        secondary={{
          label: "Watch the 60-sec demo",
          href: "/demo/dentist-intake-bot"
        }}
      />
    </div>
  );
}
