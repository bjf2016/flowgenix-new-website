import type { Metadata } from 'next';
import { LegalLayout, type LegalSection } from '@/components/legal/LegalLayout';

export const metadata: Metadata = {
  title: 'Terms of Service - FlowGenixAI',
  description:
    'The terms that govern FlowGenixAI consulting and implementation services.',
};

const EMAIL = <a href="mailto:info@flowgenixai.com">info@flowgenixai.com</a>;

const SECTIONS: LegalSection[] = [
  {
    id: 'agreement',
    heading: 'Agreement to Terms',
    body: (
      <p>
        By engaging FlowGenixAI LLC (&ldquo;FlowGenixAI,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;)
        for consulting or implementation services, you (&ldquo;Client&rdquo;) agree to these Terms.
        If you do not agree, please do not use our services.
      </p>
    ),
  },
  {
    id: 'services',
    heading: 'Services',
    body: (
      <p>
        We provide consulting, implementation, and workflow automation services. Scope, deliverables,
        and timelines are defined in written proposals, statements of work, or order forms agreed by
        both parties.
      </p>
    ),
  },
  {
    id: 'client-responsibilities',
    heading: 'Client Responsibilities',
    body: (
      <ul>
        <li>Provide timely access to tools, systems, and stakeholders needed to complete the work.</li>
        <li>Respond to questions and approvals promptly to keep projects on schedule.</li>
        <li>Ensure information shared with us is accurate and complete.</li>
      </ul>
    ),
  },
  {
    id: 'fees-payment',
    heading: 'Fees & Payment',
    body: (
      <p>
        Fees and payment terms are as stated in the applicable written agreement. Invoices are due as
        specified in that agreement.
      </p>
    ),
  },
  {
    id: 'scheduling',
    heading: 'Scheduling, Cancellations, and No-Shows',
    body: (
      <ul>
        <li>We aim to accommodate scheduling changes with reasonable notice.</li>
        <li>Missed or repeatedly rescheduled sessions may delay delivery timelines.</li>
      </ul>
    ),
  },
  {
    id: 'intellectual-property',
    heading: 'Intellectual Property',
    body: (
      <ul>
        <li>Client data remains the property of the Client.</li>
        <li>
          Deliverables and any licenses or usage rights are defined in the applicable proposal or
          statement of work.
        </li>
        <li>
          We retain ownership of pre-existing materials, frameworks, and know-how; Client receives
          any license expressly granted in writing.
        </li>
      </ul>
    ),
  },
  {
    id: 'confidentiality',
    heading: 'Confidentiality',
    body: (
      <p>
        Each party will protect the other&rsquo;s confidential information and use it only for
        fulfilling the agreed services, except as required by law.
      </p>
    ),
  },
  {
    id: 'third-party-services',
    heading: 'Third-Party Services',
    body: (
      <p>
        Our solutions may rely on third-party platforms (e.g., hosting providers, analytics,
        calendaring, n8n). We are not responsible for their availability, performance, or changes.
      </p>
    ),
  },
  {
    id: 'disclaimers',
    heading: 'Disclaimers',
    body: (
      <p>
        We provide services on an &ldquo;as is&rdquo; basis and do not guarantee specific business
        outcomes, revenue, or performance results.
      </p>
    ),
  },
  {
    id: 'limitation-of-liability',
    heading: 'Limitation of Liability',
    body: (
      <p>
        To the fullest extent permitted by law, FlowGenixAI&rsquo;s total liability arising out of or
        related to the services is limited to the amounts paid by Client for the services giving rise
        to the claim.
      </p>
    ),
  },
  {
    id: 'indemnification',
    heading: 'Indemnification',
    body: (
      <p>
        Client agrees to indemnify and hold FlowGenixAI harmless from third-party claims arising from
        Client&rsquo;s misuse of the services, violation of law, or infringement of third-party
        rights.
      </p>
    ),
  },
  {
    id: 'termination',
    heading: 'Termination',
    body: (
      <p>
        Either party may terminate as permitted in the applicable agreement. Upon termination, Client
        will pay for services rendered through the termination date.
      </p>
    ),
  },
  {
    id: 'governing-law',
    heading: 'Governing Law',
    body: (
      <p>
        These Terms are governed by the laws of the State of California, USA, without regard to its
        conflict of laws rules.
      </p>
    ),
  },
  {
    id: 'changes',
    heading: 'Changes to Terms',
    body: (
      <p>
        We may update these Terms from time to time. The &ldquo;Last updated&rdquo; date will change
        when revisions are posted. Continued use of our services after changes take effect
        constitutes acceptance.
      </p>
    ),
  },
  {
    id: 'contact',
    heading: 'Contact Us',
    body: <p>Questions about these Terms? Contact us at {EMAIL}.</p>,
  },
];

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms of Service"
      lastUpdated="January 27, 2026"
      intro="The ground rules for working together on AI systems and workflow automation."
      sections={SECTIONS}
    />
  );
}
