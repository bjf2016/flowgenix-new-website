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
        eyebrow="Workflow Automation"
        title="Automate your workflows, unlock your time."
        subtitle="We connect your tools and add AI so your team stops doing busywork."
        primaryCta={{ label: "See workflow examples", onClick: scrollToExamples }}
        secondaryCta={{ label: "Book a consult", href: "https://cal.com/b.foroodian/30-min-ai-workflow-audit" }}
      />
      <main className="container mx-auto max-w-7xl px-4 py-12">
        <section id="why" className="mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-6">Why workflow automation</h2>
          <ul className="space-y-4 text-lg text-muted-foreground">
            <li className="flex items-start gap-3">
              <span className="text-green-500 mt-1">✓</span>
              <span>Less manual work means your team focuses on what matters</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 mt-1">✓</span>
              <span>Faster responses to customers and leads</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 mt-1">✓</span>
              <span>Fewer mistakes from copy-paste and repetitive tasks</span>
            </li>
          </ul>
        </section>

        <section id="what" className="mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-6">What we automate</h2>
          <div className="space-y-4">
            <div className="border rounded-lg p-6 bg-white">
              <h3 className="text-xl font-semibold mb-2">HVAC: lead-to-job workflows</h3>
              <p className="text-muted-foreground">
                From first contact to scheduled appointment, dispatch, and follow-up — all automated.
              </p>
            </div>
            <div className="border rounded-lg p-6 bg-white">
              <h3 className="text-xl font-semibold mb-2">Law firms: intake to consult</h3>
              <p className="text-muted-foreground">
                Screen prospects, collect documents, schedule consultations, and sync with your case management system.
              </p>
            </div>
            <div className="border rounded-lg p-6 bg-white">
              <h3 className="text-xl font-semibold mb-2">Cross-tool syncing</h3>
              <p className="text-muted-foreground">
                CRM, email, Slack, phone, forms — we connect them so data flows automatically without manual entry.
              </p>
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
              <h3 className="font-semibold mb-2">Map</h3>
              <p className="text-sm text-muted-foreground">
                We document your current process and identify automation opportunities
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold mb-2">Build</h3>
              <p className="text-sm text-muted-foreground">
                We connect your tools and implement the automated workflow
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold mb-2">Monitor</h3>
              <p className="text-sm text-muted-foreground">
                We track performance and refine based on real-world usage
              </p>
            </div>
          </div>
        </section>

        <section id="examples" className="mb-16 scroll-mt-20">
          <h2 className="text-3xl font-bold tracking-tight mb-6">Workflow examples</h2>
          <div className="border rounded-lg p-8 bg-gray-50">
            <p className="text-muted-foreground text-center">
              We'll add visual HVAC and law firm workflow demos here next.
            </p>
          </div>
        </section>

        <section className="bg-muted rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Ready to stop doing everything manually?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Let's map your workflows and show you what automation can do for your business.
          </p>
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
