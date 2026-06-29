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
        portraitSrc="/brand/ben v4.png"
        trustLogos={["retell","n8n","sanity","vercel"]}
      />

      <section className="container mx-auto max-w-7xl px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Who we help
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            If your business runs on phone calls and follow-ups, we help you stop losing them. A few of the businesses we build for:
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Home &amp; field services</h3>
            <p className="text-gray-600 leading-relaxed">HVAC, plumbing, electrical, cleaning, landscaping. Never miss a service call, and book jobs around the clock.</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Professional services</h3>
            <p className="text-gray-600 leading-relaxed">Law, accounting, agencies, consultants. Automate intake, scheduling, follow-up, and reporting so billable time goes further.</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Health &amp; wellness</h3>
            <p className="text-gray-600 leading-relaxed">Med spas, clinics, and specialty practices. Fill the calendar, nurture leads, and cut no-shows.</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Real estate &amp; property</h3>
            <p className="text-gray-600 leading-relaxed">Capture and qualify every inquiry the moment it comes in, before it goes cold.</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Busy owners &amp; operators</h3>
            <p className="text-gray-600 leading-relaxed">A personal AI operations cockpit that triages email, runs your calendar, and turns voice into action.</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Other businesses</h3>
            <p className="text-gray-600 leading-relaxed">If you run on calls and follow-ups, we'll find the automation with the fastest payback for you.</p>
          </div>
        </div>
        <div className="text-center mt-10">
          <Link
            href="/strategy-call"
            className="inline-block rounded-full bg-[#009CE3] px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-[#0088cc] transition-all duration-200"
          >
            Not sure which fits? Book a strategy call
          </Link>
        </div>
      </section>

      <section className="container mx-auto max-w-7xl px-6 -mt-8">
        <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            AI systems we specialize in and implement
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
