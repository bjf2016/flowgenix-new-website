export default function CRMDashboardPage() {
  const kpis = [
    {
      label: "Total Intakes",
      value: "16",
      caption: "All tickets in the last 7 days",
    },
    {
      label: "HVAC Tickets",
      value: "12",
      caption: "AC / Heating calls",
    },
    {
      label: "Law Tickets",
      value: "4",
      caption: "Law firm inquiries",
    },
    {
      label: "Emergency Rate",
      value: "75%",
      caption: "Marked as emergency",
    },
  ];

  const features = [
    "AI agent answers and qualifies every inbound call",
    "Intake data logged automatically into Sheets/CRM",
    "Dashboard updates in real time with no manual work",
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-7xl px-6 py-10">
        <header className="mb-10">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-[#202629] mb-3">
                FlowGenixAI – AI Intake CRM Demo
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl">
                Sample dashboard view for HVAC and Law Firm emergency intakes powered by AI + Google Sheets.
              </p>
            </div>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#009CE3] text-white text-sm font-medium shadow-sm">
              Live Demo Data
            </div>
          </div>
        </header>

        <section className="mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpis.map((kpi) => (
              <div
                key={kpi.label}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <p className="text-sm font-medium text-gray-600 mb-2">{kpi.label}</p>
                <p className="text-3xl font-bold text-[#202629] mb-1">{kpi.value}</p>
                <p className="text-xs text-gray-500">{kpi.caption}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div>
              <h2 className="text-2xl font-semibold text-[#202629] mb-4">What you're seeing</h2>
              <p className="text-gray-700 leading-relaxed">
                This is a demo view of how FlowGenixAI can track emergency intakes across different business types (HVAC, law firms, etc.) using AI receptionists and automated logging into Google Sheets or a CRM.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#202629] mb-4">How it works</h3>
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-[#009CE3] mt-1">✓</span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-[#202629] mb-2">
                Live Dashboard (example view)
              </h2>
              <p className="text-sm text-gray-600">
                In a real deployment, this panel is powered by live data coming from your AI
                receptionist and intake flows. For the demo, we’re showing a static example of
                what that dashboard looks like without embedding Google Sheets.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  What this dashboard tracks
                </h3>
                <ul className="text-sm text-gray-700 space-y-1.5">
                  <li>• New intakes by business type (HVAC vs. Law)</li>
                  <li>• Emergency vs. non-emergency rate</li>
                  <li>• Daily intake volume for the last 7 days</li>
                  <li>• Source of each lead (web, phone, AI agent, etc.)</li>
                </ul>
              </div>

              <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-6 flex flex-col items-center justify-center text-center">
                <p className="text-xs font-semibold text-gray-500 mb-2">
                  Dashboard snapshot (mock)
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  In your account this area would show your live charts and KPIs, powered by
                  Sheets, your CRM, or a custom data store.
                </p>
                <span className="inline-flex items-center rounded-full bg-gray-200 px-3 py-1 text-xs font-medium text-gray-700 mb-4">
                  No external embeds required
                </span>

                <a
                  href="https://docs.google.com/spreadsheets/d/e/2PACX-1vTUX-CHvoWH2y2RjIPX3GoG9U-Z1FzYf2kwBz4OhRBOq8ovbM4_QPotjqVYbvYCaOaOi7AuddWBrkZ9/pubhtml?gid=1997322929&single=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center justify-center rounded-md bg-[#009CE3] px-4 py-2 text-xs font-medium text-white hover:bg-[#0088cc] transition-colors"
                >
                  View live Google Sheet dashboard
                </a>
              </div>
            </div>
          </div>
        </section>


        <footer className="text-center py-12">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-10 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-[#202629] mb-3">
              Want a dashboard like this for your business?
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              We'll connect your calls, forms, and messages into a live AI-powered intake dashboard.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-[#009CE3] px-8 py-3 text-base font-medium text-white hover:bg-[#0088cc] transition-colors shadow-sm"
            >
              Book a strategy call
            </a>
            <div className="mt-4">
              <a
                href="/services/ai-voice-agent"
                className="text-sm text-[#009CE3] hover:underline"
              >
                Learn more about AI intake agents
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
