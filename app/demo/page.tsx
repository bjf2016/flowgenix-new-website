import Link from 'next/link';

export default function DemoPage() {
  return (
    <div>
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

      {/* Content Section */}
      <section className="container mx-auto max-w-7xl px-6 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg text-gray-600 mb-8">
            Right now, our live demos are showcased on the Solutions page. Use the links below to jump directly to them.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/services#demos"
              className="rounded-full bg-[#009CE3] px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-[#0088cc] hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 text-center"
            >
              View All Demos
            </Link>
            <Link
              href="/demo/dentist-intake-bot"
              className="rounded-full px-8 py-4 text-base font-semibold bg-gray-100 border border-gray-300 text-gray-900 hover:bg-gray-200 transition-all duration-200 hover:-translate-y-0.5 text-center"
            >
              Try Dentist Intake Demo
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/demo/dentist-intake-bot"
              className="p-6 rounded-lg border border-gray-200 hover:border-[#009CE3] hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-900 mb-2">Dentist Intake Bot</h3>
              <p className="text-sm text-gray-600">
                Collect the right info and increase completed bookings.
              </p>
            </Link>

            <Link
              href="/demo/hvac-after-hours"
              className="p-6 rounded-lg border border-gray-200 hover:border-[#009CE3] hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-900 mb-2">HVAC After-Hours Bot</h3>
              <p className="text-sm text-gray-600">
                Capture overnight leads and prepare next-day dispatch.
              </p>
            </Link>

            <Link
              href="/demo/restaurant-waitlist"
              className="p-6 rounded-lg border border-gray-200 hover:border-[#009CE3] hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-900 mb-2">Restaurant Waitlist Bot</h3>
              <p className="text-sm text-gray-600">
                Confirm reservations and reduce no-shows.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
