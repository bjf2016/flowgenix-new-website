"use client";

export default function PrivacyPolicyPage() {
  const lastUpdated = "2026-01-27";

  return (
    <main className="pb-20">
      <section className="bg-[#CDE4F3] py-16">
        <div className="container mx-auto max-w-7xl px-6 text-center">
          <p className="text-xs font-semibold tracking-[0.18em] text-sky-700 uppercase">
            Privacy Policy
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Your Privacy at FlowGenixAI
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We respect your data and use it only to serve you better. This policy explains what we collect, why we collect it, and how you can stay in control.
          </p>
        </div>
      </section>

      <section className="container mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="mx-auto max-w-4xl rounded-2xl border bg-background p-6 md:p-10 shadow-sm space-y-8 text-gray-800">
          <p className="text-sm text-gray-500">Last updated: {lastUpdated}</p>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Overview</h2>
            <p className="leading-relaxed">
              FlowGenixAI is a consulting business focused on AI systems and workflow automation for service businesses. We collect only the information we need to respond to inquiries, deliver services, and improve our site.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Information We Collect</h2>
            <ul className="list-disc list-inside space-y-2 leading-relaxed">
              <li>Contact details you submit (full name, email, business name, website, and your message) via our contact and strategy-call forms.</li>
              <li>Website usage data (e.g., pages visited, referring URLs, approximate location) collected through standard analytics tools.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">How We Use Information</h2>
            <ul className="list-disc list-inside space-y-2 leading-relaxed">
              <li>Respond to your inquiries and provide requested information.</li>
              <li>Schedule consultations or strategy calls you request.</li>
              <li>Improve our services, website performance, and user experience.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Sharing</h2>
            <ul className="list-disc list-inside space-y-2 leading-relaxed">
              <li>We share data with service providers (e.g., hosting, analytics, form processing) who help us operate our website and services.</li>
              <li>We do not sell your personal information.</li>
              <li>We may disclose information if required by law or to protect our rights.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Cookies & Analytics</h2>
            <p className="leading-relaxed">
              We use cookies and similar technologies to understand site usage and improve performance. You can control cookies through your browser settings; disabling them may affect certain features.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Data Retention</h2>
            <p className="leading-relaxed">
              We retain personal information only as long as needed to fulfill the purposes described above or to comply with legal requirements. When data is no longer needed, we delete or anonymize it.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Security</h2>
            <p className="leading-relaxed">
              We use reasonable administrative, technical, and physical safeguards to protect your information. However, no method of transmission over the internet is 100% secure, so we cannot guarantee absolute security.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Your Choices</h2>
            <ul className="list-disc list-inside space-y-2 leading-relaxed">
              <li>You can request access, correction, or deletion of your personal information.</li>
              <li>You may opt out of marketing communications at any time.</li>
              <li>For requests, email us at <span className="font-semibold">info@flowgenixai.com</span>.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Children's Privacy</h2>
            <p className="leading-relaxed">
              Our services are not directed to children under 13, and we do not knowingly collect personal information from children. If you believe a child has provided us data, please contact us and we will delete it.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Changes to This Policy</h2>
            <p className="leading-relaxed">
              We may update this Privacy Policy from time to time. When we do, we will revise the “Last updated” date above. Your continued use of our site after changes take effect means you accept the updated policy.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Contact Us</h2>
            <p className="leading-relaxed">
              If you have questions about this policy or how we handle your data, contact us at <span className="font-semibold">info@flowgenixai.com</span>.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
