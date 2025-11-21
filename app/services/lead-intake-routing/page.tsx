"use client";

import SectionHero from "@/components/SectionHero";

export default function Page() {
  const scrollToExamples = () => {
    const element = document.getElementById("examples");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <SectionHero
        eyebrow="Lead Intake & Routing"
        title="Capture every lead and send it to the right place."
        subtitle="We design intake flows that collect the right details and route each lead to the right person or system automatically."
        primaryCta={{ label: "See intake examples", onClick: scrollToExamples }}
        secondaryCta={{ label: "Book a consult", href: "https://cal.com/b.foroodian/30-min-ai-workflow-audit" }}
      />
      <main className="container mx-auto max-w-7xl px-4 py-12">
        <section id="why" className="mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-6">Why lead intake & routing</h2>
          <ul className="space-y-4 text-lg text-muted-foreground">
            <li className="flex items-start gap-3">
              <span className="text-green-500 mt-1">✓</span>
              <span>No more leads getting lost in inboxes.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 mt-1">✓</span>
              <span>Consistent questions asked every time.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 mt-1">✓</span>
              <span>Faster handoff to the right team or system.</span>
            </li>
          </ul>
        </section>

        <section id="what" className="mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-6">What we build</h2>
          <div className="space-y-4">
            <div className="border rounded-lg p-6 bg-white">
              <h3 className="text-xl font-semibold mb-2">Multi-step website and chat intake forms</h3>
            </div>
            <div className="border rounded-lg p-6 bg-white">
              <h3 className="text-xl font-semibold mb-2">Routing rules by location, service type, or urgency</h3>
            </div>
            <div className="border rounded-lg p-6 bg-white">
              <h3 className="text-xl font-semibold mb-2">Automatic lead creation in your CRM, sheets, or helpdesk</h3>
            </div>
          </div>
        </section>

        <section id="how" className="mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">How it works</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold mb-2">Design your ideal intake</h3>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold mb-2">Connect your tools and routing rules</h3>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold mb-2">Monitor, refine, and scale</h3>
            </div>
          </div>
        </section>

        <section id="examples" className="mb-16 scroll-mt-20">
          <h2 className="text-3xl font-bold tracking-tight mb-6">Intake & routing examples</h2>
          <p className="text-muted-foreground">
            We'll add HVAC and law firm intake flow diagrams here next.
          </p>
        </section>

        <section className="bg-muted rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Ready to stop losing leads?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto"></p>
          <a
            href="https://cal.com/b.foroodian/30-min-ai-workflow-audit"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Book a 30-min consult
          </a>
        </section>
      </main>
    </>
  );
}
