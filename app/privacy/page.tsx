import type { Metadata } from 'next';
import { LegalLayout, type LegalSection } from '@/components/legal/LegalLayout';

export const metadata: Metadata = {
  title: 'Privacy Policy - FlowGenixAI',
  description:
    'How FlowGenixAI collects, uses, and protects your information, and the choices you have.',
};

const EMAIL = (
  <a href="mailto:info@flowgenixai.com">info@flowgenixai.com</a>
);

const SECTIONS: LegalSection[] = [
  {
    id: 'overview',
    heading: 'Overview',
    body: (
      <p>
        FlowGenixAI is a consulting business focused on AI systems and workflow automation for
        service businesses. We collect only the information we need to respond to inquiries, deliver
        services, and improve our site.
      </p>
    ),
  },
  {
    id: 'information-we-collect',
    heading: 'Information We Collect',
    body: (
      <ul>
        <li>
          Contact details you submit (full name, email, business name, website, and your message)
          via our contact and strategy-call forms.
        </li>
        <li>
          Website usage data (e.g., pages visited, referring URLs, approximate location) collected
          through standard analytics tools.
        </li>
      </ul>
    ),
  },
  {
    id: 'how-we-use-information',
    heading: 'How We Use Information',
    body: (
      <ul>
        <li>Respond to your inquiries and provide requested information.</li>
        <li>Schedule consultations or strategy calls you request.</li>
        <li>Improve our services, website performance, and user experience.</li>
      </ul>
    ),
  },
  {
    id: 'sharing',
    heading: 'Sharing',
    body: (
      <ul>
        <li>
          We share data with service providers (e.g., hosting, analytics, form processing) who help
          us operate our website and services.
        </li>
        <li>We do not sell your personal information.</li>
        <li>We may disclose information if required by law or to protect our rights.</li>
      </ul>
    ),
  },
  {
    id: 'cookies-analytics',
    heading: 'Cookies & Analytics',
    body: (
      <p>
        We use cookies and similar technologies to understand site usage and improve performance.
        You can control cookies through your browser settings; disabling them may affect certain
        features.
      </p>
    ),
  },
  {
    id: 'data-retention',
    heading: 'Data Retention',
    body: (
      <p>
        We retain personal information only as long as needed to fulfill the purposes described above
        or to comply with legal requirements. When data is no longer needed, we delete or anonymize
        it.
      </p>
    ),
  },
  {
    id: 'security',
    heading: 'Security',
    body: (
      <p>
        We use reasonable administrative, technical, and physical safeguards to protect your
        information. However, no method of transmission over the internet is 100% secure, so we
        cannot guarantee absolute security.
      </p>
    ),
  },
  {
    id: 'your-choices',
    heading: 'Your Choices',
    body: (
      <ul>
        <li>You can request access, correction, or deletion of your personal information.</li>
        <li>You may opt out of marketing communications at any time.</li>
        <li>For requests, email us at {EMAIL}.</li>
      </ul>
    ),
  },
  {
    id: 'childrens-privacy',
    heading: "Children's Privacy",
    body: (
      <p>
        Our services are not directed to children under 13, and we do not knowingly collect personal
        information from children. If you believe a child has provided us data, please contact us and
        we will delete it.
      </p>
    ),
  },
  {
    id: 'changes',
    heading: 'Changes to This Policy',
    body: (
      <p>
        We may update this Privacy Policy from time to time. When we do, we will revise the &ldquo;Last
        updated&rdquo; date above. Your continued use of our site after changes take effect means you
        accept the updated policy.
      </p>
    ),
  },
  {
    id: 'contact',
    heading: 'Contact Us',
    body: (
      <p>
        If you have questions about this policy or how we handle your data, contact us at {EMAIL}.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      lastUpdated="January 27, 2026"
      intro="We respect your data and use it only to serve you better. This policy explains what we collect, why we collect it, and how you can stay in control."
      sections={SECTIONS}
    />
  );
}
