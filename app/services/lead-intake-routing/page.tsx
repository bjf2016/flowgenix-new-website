"use client";

import { useState } from "react";
import SectionHero from "@/components/SectionHero";

const INTAKE_CONFIG = {
  hvac: {
    label: "HVAC Company",
    description: "AC, heating, and ventilation service requests.",
    questions: [
      { id: "serviceType", label: "What do you need help with?", type: "select", options: ["AC not cooling", "No heat", "Strange noise", "Maintenance"] },
      { id: "urgency", label: "How urgent is this?", type: "select", options: ["Emergency (today)", "Within 2–3 days", "Flexible"] },
      { id: "location", label: "Service address or ZIP", type: "text" },
      { id: "details", label: "Briefly describe the issue", type: "textarea" },
    ],
  },
  law: {
    label: "Law Firm",
    description: "Screen new legal inquiries.",
    questions: [
      { id: "caseType", label: "What type of case is this?", type: "select", options: ["Personal injury", "Family law", "Criminal defense", "Business", "Other"] },
      { id: "incidentDate", label: "When did the main incident happen?", type: "date" },
      { id: "jurisdiction", label: "City / state where this occurred", type: "text" },
      { id: "details", label: "Briefly describe your situation", type: "textarea" },
    ],
  },
} as const;

function UniversalIntakeForm() {
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [businessType, setBusinessType] = useState<"hvac" | "law" | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBusinessTypeSelect = (type: "hvac" | "law") => {
    setBusinessType(type);
    setStep(1);
  };

  const handleInputChange = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const isStep1Valid = () => {
    return formData.contactName && formData.contactEmail && formData.contactPhone && formData.preferredContact;
  };

  const handleSubmit = async () => {
    const cfg = businessType ? INTAKE_CONFIG[businessType] : null;
    const answers: Record<string, any> = {};
    if (cfg && businessType) {
      cfg.questions.forEach((q) => {
        const key = `${businessType}_${q.id}`;
        answers[q.id] = formData[key];
      });
    }

    const payload = {
      businessType,
      contact: {
        name: formData.contactName,
        email: formData.contactEmail,
        phone: formData.contactPhone,
        preferredContact: formData.preferredContact,
        preferredTime: formData.preferredTime,
      },
      answers,
      source: "website_universal_intake",
    };

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("https://n8n.flowgenixai.com/webhook/intake-flowgenix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.ok === true) {
        setSubmitted(true);
      } else {
        setError("Something went wrong sending your intake. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong sending your intake. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="border rounded-lg p-6 bg-white text-center">
        <h3 className="text-2xl font-bold text-green-600 mb-2">Thank you!</h3>
        <p className="text-muted-foreground">Your intake has been received. We'll be in touch soon.</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg p-6 bg-white space-y-6">
      {step === 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Select your business type</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {(Object.keys(INTAKE_CONFIG) as Array<keyof typeof INTAKE_CONFIG>).map((key) => {
              const config = INTAKE_CONFIG[key];
              return (
                <button
                  key={key}
                  onClick={() => handleBusinessTypeSelect(key)}
                  className="border rounded-lg p-6 text-left hover:border-primary hover:bg-primary/5 transition-colors"
                >
                  <h4 className="font-semibold text-lg mb-2">{config.label}</h4>
                  <p className="text-sm text-muted-foreground">{config.description}</p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {step === 1 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact details</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name *</label>
              <input
                type="text"
                value={formData.contactName || ""}
                onChange={(e) => handleInputChange("contactName", e.target.value)}
                className="w-full rounded-md border px-3 py-2 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email *</label>
              <input
                type="email"
                value={formData.contactEmail || ""}
                onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                className="w-full rounded-md border px-3 py-2 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone *</label>
              <input
                type="tel"
                value={formData.contactPhone || ""}
                onChange={(e) => handleInputChange("contactPhone", e.target.value)}
                className="w-full rounded-md border px-3 py-2 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Preferred contact method *</label>
              <select
                value={formData.preferredContact || ""}
                onChange={(e) => handleInputChange("preferredContact", e.target.value)}
                className="w-full rounded-md border px-3 py-2 text-sm"
                required
              >
                <option value="">Select...</option>
                <option value="Phone">Phone</option>
                <option value="Email">Email</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Preferred time</label>
              <input
                type="text"
                value={formData.preferredTime || ""}
                onChange={(e) => handleInputChange("preferredTime", e.target.value)}
                className="w-full rounded-md border px-3 py-2 text-sm"
                placeholder="e.g., Weekday mornings"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => {
                setStep(0);
                setBusinessType(null);
              }}
              className="px-4 py-2 rounded-md border text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
            <button
              onClick={() => setStep(2)}
              disabled={!isStep1Valid()}
              className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 2 && businessType && (
        <div>
          <h3 className="text-xl font-semibold mb-4">{INTAKE_CONFIG[businessType].label} details</h3>
          <div className="space-y-4">
            {INTAKE_CONFIG[businessType].questions.map((q) => {
              const key = `${businessType}_${q.id}`;
              return (
                <div key={q.id}>
                  <label className="block text-sm font-medium mb-1">{q.label}</label>
                  {q.type === "text" && (
                    <input
                      type="text"
                      value={formData[key] || ""}
                      onChange={(e) => handleInputChange(key, e.target.value)}
                      className="w-full rounded-md border px-3 py-2 text-sm"
                    />
                  )}
                  {q.type === "date" && (
                    <input
                      type="date"
                      value={formData[key] || ""}
                      onChange={(e) => handleInputChange(key, e.target.value)}
                      className="w-full rounded-md border px-3 py-2 text-sm"
                    />
                  )}
                  {q.type === "textarea" && (
                    <textarea
                      value={formData[key] || ""}
                      onChange={(e) => handleInputChange(key, e.target.value)}
                      className="w-full rounded-md border px-3 py-2 text-sm"
                      rows={3}
                    />
                  )}
                  {q.type === "select" && q.options && (
                    <select
                      value={formData[key] || ""}
                      onChange={(e) => handleInputChange(key, e.target.value)}
                      className="w-full rounded-md border px-3 py-2 text-sm"
                    >
                      <option value="">Select...</option>
                      {q.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => setStep(1)}
              className="px-4 py-2 rounded-md border text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 3 && businessType && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Review your submission</h3>
          <div className="space-y-4">
            <div className="border-b pb-3">
              <p className="text-sm font-medium text-muted-foreground">Business type</p>
              <p className="font-semibold">{INTAKE_CONFIG[businessType].label}</p>
            </div>
            <div className="border-b pb-3">
              <p className="text-sm font-medium text-muted-foreground mb-2">Contact details</p>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">Name:</span> {formData.contactName}</p>
                <p><span className="font-medium">Email:</span> {formData.contactEmail}</p>
                <p><span className="font-medium">Phone:</span> {formData.contactPhone}</p>
                <p><span className="font-medium">Preferred contact:</span> {formData.preferredContact}</p>
                {formData.preferredTime && <p><span className="font-medium">Preferred time:</span> {formData.preferredTime}</p>}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">{INTAKE_CONFIG[businessType].label} details</p>
              <div className="space-y-1 text-sm">
                {INTAKE_CONFIG[businessType].questions.map((q) => {
                  const key = `${businessType}_${q.id}`;
                  const value = formData[key];
                  if (!value) return null;
                  return (
                    <p key={q.id}>
                      <span className="font-medium">{q.label}:</span> {value}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 mt-6">
            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="px-4 py-2 rounded-md border text-sm font-medium hover:bg-gray-50 transition-colors"
                disabled={isSubmitting}
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Submit intake"}
              </button>
            </div>
            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}
          </div>
        </div>
      )}
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
          <p className="text-muted-foreground mb-6">
            Switch between HVAC and Law Firm to see how the same engine adapts questions and routing.
          </p>
          <UniversalIntakeForm />
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
