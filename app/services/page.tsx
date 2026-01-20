'use client';

import ServiceCard from '@/components/services/ServiceCard';
import { CallToAction } from '@/components/CallToAction';

export default function ServicesPage() {
  const services = [
    {
      title: "AI Voice Receptionist",
      desc: "Answer, qualify, schedule. 24/7 phone coverage that never misses a call or opportunity.",
      href: "/demo/dentist-intake-bot"
    },
    {
      title: "Website Chatbot",
      desc: "Turn your website into a 24/7 AI-powered sales assistant that answers questions, captures leads, and routes conversations to your team.",
      href: "/services/website-chatbot"
    },
    {
      title: "Workflow Automation",
      desc: "Connect apps, remove manual steps. Automate repetitive tasks and free up your team.",
      href: "/services/workflow-automation"
    },
    {
      title: "Lead Intake & Routing",
      desc: "Forms to CRM, alerts, follow-ups. Capture every lead and route it to the right person instantly.",
      href: "/services/lead-intake-routing"
    },
    {
      title: "Training & Playbooks",
      desc: "Team enablement + SOPs. Documentation and training that scales with your business.",
      href: "/demo/restaurant-waitlist"
    },
    {
      title: "Analytics & QA",
      desc: "Call summaries, trend insights. Data-driven decisions backed by real conversation intelligence.",
      href: "/demo/hvac-after-hours"
    }
  ];

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="bg-[#CDE4F3] py-16">
        <div className="container mx-auto max-w-7xl px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            AI Solutions that Drive Results
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From voice receptionists to end-to-end workflow automation, we implement fast and iterate.
          </p>
        </div>
      </section>

      {/* Lead Follow-up Card */}
      <section className="container mx-auto max-w-7xl px-6 py-12">
        <div className="max-w-md mx-auto">
          <div className="rounded-3xl border border-gray-200 bg-white shadow-lg p-6">
            <p className="text-sm sm:text-base font-semibold uppercase tracking-wide text-[#009CE3]">
              Lead Follow-Up & Nurture Flows
            </p>
            <p className="mt-2 text-sm text-gray-800">
              AI follows up with new and stale leads via SMS and email so your pipeline never goes cold.
            </p>
            <div className="mt-5 space-y-3">
              <div className="flex items-start gap-3">
                <div className="mt-1 h-6 w-6 flex items-center justify-center rounded-full bg-[#009CE3]/10 ring-1 ring-[#009CE3]/40">
                  <span className="text-[11px] font-semibold text-[#009CE3]">1</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-900">New lead hits your CRM or web form</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 h-6 w-6 flex items-center justify-center rounded-full bg-[#009CE3]/10 ring-1 ring-[#009CE3]/40">
                  <span className="text-[11px] font-semibold text-[#009CE3]">2</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-900">AI sends personalized follow-up within minutes</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 h-6 w-6 flex items-center justify-center rounded-full bg-[#009CE3]/10 ring-1 ring-[#009CE3]/40">
                  <span className="text-[11px] font-semibold text-[#009CE3]">3</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-900">Conversation continues over SMS/email based on responses</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 h-6 w-6 flex items-center justify-center rounded-full bg-[#009CE3]/10 ring-1 ring-[#009CE3]/40">
                  <span className="text-[11px] font-semibold text-[#009CE3]">4</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-900">Qualified leads are nudged to book directly into your calendar</p>
              </div>
            </div>
            <div className="mt-5 flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-2 text-xs text-gray-800">
              <span className="font-semibold">Outcome:</span>
              <span className="font-medium">More conversions from the same lead volume.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="container mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              desc={service.desc}
              href={service.href}
            />
          ))}
        </div>
      </section>

      <CallToAction
        title="Ready to automate the busywork?"
        primary={{
          label: "Talk to our AI",
          onClick: "openChat"
        }}
        secondary={{
          label: "Book a 30-min consult",
          href: "https://cal.com/b.foroodian/30-min-ai-workflow-audit"
        }}
      />
    </div>
  );
}
