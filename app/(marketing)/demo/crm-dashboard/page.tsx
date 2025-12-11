export default function CRMDashboardPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">FlowGenixAI – AI Intake CRM Demo</h1>
      <p className="text-gray-600 mb-8">
        Sample dashboard view for HVAC and Law Firm emergency intakes powered by AI + Google Sheets.
      </p>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <KpiCard label="Total Intakes" value="16" sub="All tickets in the last 7 days" />
        <KpiCard label="HVAC Tickets" value="12" sub="AC / Heating calls" />
        <KpiCard label="Law Tickets" value="4" sub="Law firm inquiries" />
        <KpiCard label="Emergency Rate" value="75%" sub="Marked as emergency" />
      </div>

      {/* What you're seeing */}
      <div className="bg-white border rounded-xl p-8 shadow-sm mb-12">
        <h2 className="text-xl font-semibold mb-4">What you're seeing</h2>
        <p className="text-gray-700 leading-relaxed">
          This is a demo view of how FlowGenixAI can track emergency intakes across different 
          business types (HVAC, law firms, etc.) using AI receptionists and automated logging 
          into Google Sheets or a CRM.
        </p>
      </div>

      {/* How it Works */}
      <div className="bg-white border rounded-xl p-8 shadow-sm mb-12">
        <h2 className="text-xl font-semibold mb-4">How it works</h2>
        <ul className="text-gray-700 space-y-2">
          <li>✓ AI agent answers and qualifies every inbound call</li>
          <li>✓ Intake data logged automatically into Sheets/CRM</li>
          <li>✓ Dashboard updates in real-time with no manual work</li>
        </ul>
      </div>

      {/* CTA */}
      <div className="bg-[#F7FBFF] border rounded-xl p-10 text-center shadow-sm">
        <h3 className="text-2xl font-semibold mb-4">Want a dashboard like this for your business?</h3>
        <p className="text-gray-600 mb-6">Book a free 30-minute consultation and we’ll show you what AI can automate today.</p>

        <a
          href="/contact"
          className="inline-block rounded-full bg-[#009CE3] px-8 py-4 text-white font-semibold shadow hover:bg-[#007db8] transition"
        >
          Book a 30-min consult
        </a>
      </div>
    </div>
  );
}

/* KPI component */
function KpiCard({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="border rounded-xl p-6 bg-white shadow-sm">
      <p className="text-sm text-gray-500">{label}</p>
      <div className="text-3xl font-bold mt-1">{value}</div>
      <p className="text-xs text-gray-500 mt-2">{sub}</p>
    </div>
  );
}
