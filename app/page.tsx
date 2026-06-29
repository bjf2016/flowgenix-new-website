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
        eyebrow="Built for service businesses and busy owners"
        title="AI systems that run your front desk and your back office"
        highlight="back office"
        subtitle="FlowGenixAI designs and builds AI phone, intake, and automation systems so your team answers every call, captures every lead, and keeps the busywork moving, without adding headcount."
        features="Voice receptionist · Lead intake & routing · Workflow automation · Operations dashboards"
        primaryCta={{ label: "Book a strategy call", href: "/strategy-call" }}
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
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            AI systems we specialize in and implement
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/services"
              className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium hover:bg-[#009CE3] hover:text-white transition-colors"
            >
              Home & field services
            </Link>
            <Link
              href="/services"
              className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium hover:bg-[#009CE3] hover:text-white transition-colors"
            >
              Professional services
            </Link>
            <Link
              href="/services"
              className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium hover:bg-[#009CE3] hover:text-white transition-colors"
            >
              Health & wellness
            </Link>
            <Link
              href="/services"
              className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium hover:bg-[#009CE3] hover:text-white transition-colors"
            >
              Real estate
            </Link>
            <Link
              href="/services"
              className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium hover:bg-[#009CE3] hover:text-white transition-colors"
            >
              Owners & operators
            </Link>
            <Link
              href="/services"
              className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium hover:bg-[#009CE3] hover:text-white transition-colors"
            >
              Other SMBs
            </Link>
          </div>
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
            label: "Book a 30-min consult",
            href: "/strategy-call"
        }}
      />
    </div>
  );
}
