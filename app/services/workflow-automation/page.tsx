"use client";

import { useState, useEffect } from "react";
import SectionHero from "@/components/SectionHero";
import Image from "next/image";
import Lottie from "lottie-react";

function LottieAnimation({ src }: { src: string }) {
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    let mounted = true;

    fetch(src)
      .then((res) => res.json())
      .then((json) => {
        if (mounted) setData(json);
      })
      .catch((err) => {
        console.error("Error loading Lottie:", src, err);
      });

    return () => {
      mounted = false;
    };
  }, [src]);

  if (!data) return null;

  return <Lottie animationData={data} loop autoplay style={{ height: 160 }} />;
}



function WorkflowDemos() {
  const [visibleSteps, setVisibleSteps] = useState<{ hvac: number; law: number }>({
    hvac: 0,
    law: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleSteps((prev) => {
        if (prev.hvac < 4) return { ...prev, hvac: prev.hvac + 1 };
        if (prev.law < 4) return { ...prev, law: prev.law + 1 };
        return prev;
      });
    }, 200);

    return () => clearInterval(timer);
  }, []);

  const workflows = [
    {
      key: "hvac" as const,
      title: "HVAC: Lead-to-Job Automation Flow",
      steps: ["Lead captured", "AI qualifies", "Job created", "Customer notified"],
      visibleCount: visibleSteps.hvac,
      lottie: [
        "/lottie/HVAC-01.json",
        "/lottie/HVAC-02.json",
        "/lottie/HVAC-03.json",
        "/lottie/HVAC-04.json",
      ],
    },
    {
      key: "law" as const,
      title: "Law Firm: Intake-to-Consult Flow",
      steps: ["Case details captured", "AI qualifies lead", "Case created", "Consult scheduled"],
      visibleCount: visibleSteps.law,
      lottie: undefined, // no animations for law yet
    },
  ];

  return (
    <div className="space-y-8">
      {workflows.map((workflow) => (
        <div key={workflow.title}>
          <h3 className="text-xl font-semibold mb-4">{workflow.title}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {workflow.steps.map((step, index) => (
              <div
                key={index}
                className={`border rounded-lg p-3 text-sm bg-white transition-all duration-300 ${
                  index < workflow.visibleCount
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2"
                }`}
              >
                {workflow.lottie && workflow.lottie[index] && (
                  <div className="mb-3 flex justify-center">
                    <LottieAnimation src={workflow.lottie[index]} />
                  </div>
                )}
                <div className="font-medium text-gray-900">{step}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

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
          <WorkflowDemos />
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
