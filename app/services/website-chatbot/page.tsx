"use client";

import SectionHero from "@/components/SectionHero";

export default function Page() {
  return (
    <>
      <SectionHero
        eyebrow="Website Chatbot"
        title="Your website, now a 24/7 AI sales assistant"
        subtitle="Intelligent chat that answers questions, captures leads, and routes conversations to your team — automatically."
        primaryCta={{ label: "See it in action", onClick: "openChat" }}
        secondaryCta={{ label: "Book a demo", href: "https://cal.com/b.foroodian/30-min-ai-workflow-audit", target: "_blank" }}
      />
      <main className="container mx-auto max-w-7xl px-4 py-12">
        <section className="mb-16">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-4">Problems</h2>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✕</span>
                  <span>Visitors leave without engaging</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✕</span>
                  <span>Contact forms go unanswered for hours</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✕</span>
                  <span>Same questions asked repeatedly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✕</span>
                  <span>No visibility into what prospects need</span>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-4">Outcomes with AI</h2>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Instant answers to common questions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>24/7 lead capture and qualification</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Smart routing to the right team member</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Clear analytics on visitor intent</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">What You Get</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Context-Aware Responses</h3>
              <p className="text-muted-foreground">
                Trained on your services, pricing, and policies. Answers questions accurately without generic responses.
              </p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Lead Qualification</h3>
              <p className="text-muted-foreground">
                Captures contact info, understands needs, and routes hot leads to your team in real-time.
              </p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Seamless Handoff</h3>
              <p className="text-muted-foreground">
                When human support is needed, transfers with full context so your team never starts from scratch.
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
              <h3 className="font-semibold mb-2">Visitor asks a question</h3>
              <p className="text-sm text-muted-foreground">Via chat widget on your site</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold mb-2">AI responds instantly</h3>
              <p className="text-sm text-muted-foreground">Using your business knowledge</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold mb-2">Captures lead details</h3>
              <p className="text-sm text-muted-foreground">Name, contact, and intent</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="font-semibold mb-2">Routes to your team</h3>
              <p className="text-sm text-muted-foreground">CRM, Slack, email, or phone</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">Real Use Cases</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="border rounded-lg p-6 bg-white">
              <h3 className="text-xl font-semibold mb-3">Service Business</h3>
              <p className="text-muted-foreground mb-4">
                HVAC company uses AI chat to answer "Do you service my area?" and "What's your emergency rate?" — then books qualified leads into their dispatch system.
              </p>
              <p className="text-sm text-primary font-medium">
                Result: 40% more quote requests converted
              </p>
            </div>
            <div className="border rounded-lg p-6 bg-white">
              <h3 className="text-xl font-semibold mb-3">Professional Services</h3>
              <p className="text-muted-foreground mb-4">
                Law firm uses AI chat to screen potential clients, explain practice areas, and schedule consultations — while staying compliant with attorney-client rules.
              </p>
              <p className="text-sm text-primary font-medium">
                Result: 3x faster intake, fewer unqualified leads
              </p>
            </div>
          </div>
        </section>

        <section className="bg-muted rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to turn your website into a sales machine?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            See how our AI chatbot can capture more leads and free up your team. Try it now or book a personalized demo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <button
              onClick={() => (window as any).openChat?.()}
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Talk to our AI now
            </button>
            <a
              href="https://cal.com/b.foroodian/30-min-ai-workflow-audit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Book a 30-min consult
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
