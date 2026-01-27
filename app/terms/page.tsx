"use client";

export default function TermsPage() {
  const lastUpdated = "2026-01-27";

  return (
    <main className="pb-20">
      <section className="bg-[#CDE4F3] py-16">
        <div className="container mx-auto max-w-7xl px-6 text-center">
          <p className="text-xs font-semibold tracking-[0.18em] text-sky-700 uppercase">
            Terms of Service
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            FlowGenixAI Terms of Service
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            The ground rules for working together on AI systems and workflow automation.
          </p>
        </div>
      </section>

      <section className="container mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="mx-auto max-w-4xl rounded-2xl border bg-background p-6 md:p-10 shadow-sm space-y-8 text-gray-800">
          <p className="text-sm text-gray-500">Last updated: {lastUpdated}</p>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Agreement to Terms</h2>
            <p className="leading-relaxed">
              By engaging FlowGenixAI LLC (“FlowGenixAI,” “we,” “us”) for consulting or implementation services, you (“Client”) agree to these Terms. If you do not agree, please do not use our services.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Services</h2>
            <p className="leading-relaxed">
              We provide consulting, implementation, and workflow automation services. Scope, deliverables, and timelines are defined in written proposals, statements of work, or order forms agreed by both parties.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Client Responsibilities</h2>
            <ul className="list-disc list-inside space-y-2 leading-relaxed">
              <li>Provide timely access to tools, systems, and stakeholders needed to complete the work.</li>
              <li>Respond to questions and approvals promptly to keep projects on schedule.</li>
              <li>Ensure information shared with us is accurate and complete.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Fees &amp; Payment</h2>
            <p className="leading-relaxed">
              Fees and payment terms are as stated in the applicable written agreement. Invoices are due as specified in that agreement.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Scheduling, Cancellations, and No-Shows</h2>
            <ul className="list-disc list-inside space-y-2 leading-relaxed">
              <li>We aim to accommodate scheduling changes with reasonable notice.</li>
              <li>Missed or repeatedly rescheduled sessions may delay delivery timelines.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Intellectual Property</h2>
            <ul className="list-disc list-inside space-y-2 leading-relaxed">
              <li>Client data remains the property of the Client.</li>
              <li>Deliverables and any licenses or usage rights are defined in the applicable proposal or statement of work.</li>
              <li>We retain ownership of pre-existing materials, frameworks, and know-how; Client receives any license expressly granted in writing.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Confidentiality</h2>
            <p className="leading-relaxed">
              Each party will protect the other’s confidential information and use it only for fulfilling the agreed services, except as required by law.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Third-Party Services</h2>
            <p className="leading-relaxed">
              Our solutions may rely on third-party platforms (e.g., hosting providers, analytics, calendaring, n8n). We are not responsible for their availability, performance, or changes.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Disclaimers</h2>
            <p className="leading-relaxed">
              We provide services on an “as is” basis and do not guarantee specific business outcomes, revenue, or performance results.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Limitation of Liability</h2>
            <p className="leading-relaxed">
              To the fullest extent permitted by law, FlowGenixAI’s total liability arising out of or related to the services is limited to the amounts paid by Client for the services giving rise to the claim.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Indemnification</h2>
            <p className="leading-relaxed">
              Client agrees to indemnify and hold FlowGenixAI harmless from third-party claims arising from Client’s misuse of the services, violation of law, or infringement of third-party rights.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Termination</h2>
            <p className="leading-relaxed">
              Either party may terminate as permitted in the applicable agreement. Upon termination, Client will pay for services rendered through the termination date.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Governing Law</h2>
            <p className="leading-relaxed">
              These Terms are governed by the laws of the State of California, USA, without regard to its conflict of laws rules.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Changes to Terms</h2>
            <p className="leading-relaxed">
              We may update these Terms from time to time. The “Last updated” date will change when revisions are posted. Continued use of our services after changes take effect constitutes acceptance.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Contact Us</h2>
            <p className="leading-relaxed">
              Questions about these Terms? Contact us at <span className="font-semibold">info@flowgenixai.com</span>.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
