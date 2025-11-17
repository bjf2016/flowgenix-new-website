import SectionHero from "@/components/SectionHero";
import Link from "next/link";

export const revalidate = 60;

export default function Page() {
  return (
    <>
      <SectionHero
        eyebrow="Dentists"
        title="AI that books more dental appointments"
        subtitle="Automated intake, insurance pre-qual, recalls and reminders — without exposing your calendar."
        primaryCta={{ label: "Watch 60-sec demo", href: "#demo-video" }}
        secondaryCta={{ label: "Talk to our AI", onClick: "openChat" }}
      />
      <main className="container mx-auto max-w-7xl px-4 py-12">
        <section className="mb-16">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-4">Problems</h2>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✕</span>
                  <span>Missed/abandoned calls</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✕</span>
                  <span>Manual reminders & follow-ups</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✕</span>
                  <span>New patient form chaos (duplicates, missing info)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✕</span>
                  <span>Slow response to web inquiries</span>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-4">Outcomes with AI</h2>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>24/7 intake + triage (web + phone)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Automated reminders, recalls, treatment-plan nudges</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Clean data into your PMS/CRM</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Faster scheduling and fewer no-shows</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">What We Deliver</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">AI Voice Receptionist</h3>
              <p className="text-muted-foreground">
                Answers, qualifies, schedules. After-hours coverage that never misses a lead.
              </p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Website Chatbot</h3>
              <p className="text-muted-foreground">
                Guides patients, captures info, books consults integrated with your forms.
              </p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Workflow Automation</h3>
              <p className="text-muted-foreground">
                From forms to CRM, Slack alerts, and follow-ups less manual work for staff.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">How It Works</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold mb-2">Patient reaches out</h3>
              <p className="text-sm text-muted-foreground">Phone, chat, or web form</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold mb-2">AI Agent collects essentials</h3>
              <p className="text-sm text-muted-foreground">Name, contact info, and consents</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold mb-2">Routes to team</h3>
              <p className="text-sm text-muted-foreground">Books time or alerts staff</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="font-semibold mb-2">Follow-up sequence</h3>
              <p className="text-sm text-muted-foreground">SMS/email runs automatically</p>
            </div>
          </div>
        </section>

        <section className="bg-muted rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to modernize your patient intake?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <Link
              href="/demos/dentist-intake"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Try the AI Receptionist call back
            </Link>
            <a
              href="https://cal.com/b.foroodian/30-min-ai-workflow-audit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Book a 30-min AI Workflow Audit
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
