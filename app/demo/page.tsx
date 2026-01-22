import Link from 'next/link';

export default function DemoPage() {
  const demos = [
    {
      title: "AI Voice Receptionist & Call Intake",
      description: "Watch how an AI receptionist answers calls, captures caller intent, and routes leads to your team — even after hours.",
      goodFor: "Good for: dentists, clinics, local service businesses",
      href: "/demo/dentist-callback",
      ctaLabel: "View voice demo"
    },
    {
      title: "HVAC After-Hours Bot",
      description: "See how emergency calls are captured overnight and prepared for next-day dispatch with detailed intake data.",
      goodFor: "Good for: HVAC, plumbing, emergency services",
      href: "/demo/hvac-after-hours",
      ctaLabel: "View demo"
    },
    {
      title: "Restaurant Waitlist Bot",
      description: "Try an AI-powered waitlist system that confirms reservations, reduces no-shows, and improves table turnover.",
      goodFor: "Good for: restaurants, cafes, hospitality",
      href: "/demo/restaurant-waitlist",
      ctaLabel: "View demo"
    },
    {
      title: "AI Intake CRM Dashboard",
      description: "See how captured leads show up in a simple CRM-style dashboard with statuses and hand-offs.",
      goodFor: "Good for: any business tracking leads",
      href: "/demo/crm-dashboard",
      ctaLabel: "View demo"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#CDE4F3] py-16">
        <div className="container mx-auto max-w-7xl px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Live AI System Demos
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore how AI voice receptionists, intake flows, and CRM dashboards work before we map them to your business.
          </p>
        </div>
      </section>

      {/* How to use section */}
      <section className="container mx-auto max-w-7xl px-6 pt-12 pb-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to use these demos</h2>
          <p className="text-lg text-gray-600">
            Use these demos to see baseline → workflow → outcomes. When you're ready, book a strategy call and we'll adapt everything to your workflows.
          </p>
        </div>
      </section>

      {/* Demo Cards */}
      <section className="container mx-auto max-w-7xl px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {demos.map((demo) => (
            <div
              key={demo.title}
              className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {demo.title}
              </h3>
              <p className="text-sm text-[#009CE3] font-medium mb-4">
                {demo.goodFor}
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {demo.description}
              </p>
              <Link
                href={demo.href}
                className="inline-flex items-center justify-center rounded-full bg-[#009CE3] px-6 py-3 text-sm font-semibold text-white shadow hover:bg-[#0088cc] transition-all duration-200 hover:-translate-y-0.5"
              >
                {demo.ctaLabel}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="container mx-auto max-w-7xl px-6 py-16">
        <div className="bg-gray-50 rounded-2xl border border-gray-200 p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to talk about your own workflows?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            These demos show what's possible. Let's discuss how we can adapt these solutions to fit your specific business needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/strategy-call"
              className="rounded-full bg-[#009CE3] px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-[#0088cc] hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 text-center"
            >
              Book a strategy call
            </Link>
            <Link
              href="/services"
              className="rounded-full px-8 py-4 text-base font-semibold bg-white border border-gray-300 text-gray-900 hover:bg-gray-50 transition-all duration-200 hover:-translate-y-0.5 text-center"
            >
              View solutions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
