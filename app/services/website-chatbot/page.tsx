"use client";

import { useState, useEffect } from "react";
import SectionHero from "@/components/SectionHero";
import { openChat } from "@/lib/handoff";

type Message = {
  role: "visitor" | "assistant";
  text: string;
};

type ScenarioKey = "hvac" | "law" | "dental";

const SCENARIOS: Record<ScenarioKey, { title: string; messages: Message[] }> = {
  hvac: {
    title: "HVAC Company – Emergency After-Hours Request",
    messages: [
      { role: "visitor", text: "Hi, my AC stopped working and it's 90 degrees in the house. Do you handle emergencies in Folsom?" },
      { role: "assistant", text: "Yes, we do provide emergency AC service in Folsom. I can help you get scheduled right away. Is your system completely off, or is it blowing warm air?" },
      { role: "visitor", text: "It's blowing warm air and making a rattling noise." },
      { role: "assistant", text: "Got it. That can indicate a failing compressor or fan motor. I'll flag this as a high-priority call. What's your name and the best phone number for our on-call technician to reach you?" },
      { role: "visitor", text: "I'm Sarah, and my number is 916-555-0123." },
      { role: "assistant", text: "Thanks, Sarah. Last question: when is the best window for our technician to come out in the next few hours? We're currently booking same-day emergency slots." },
      { role: "visitor", text: "Anytime after 5pm works." },
      { role: "assistant", text: "Perfect. I've submitted your request for an emergency AC visit after 5pm today. Our dispatcher will call you shortly to confirm the exact arrival time. You'll also receive a text with your appointment details once it's confirmed." },
    ],
  },
  law: {
    title: "Law Firm – Screening New Client Inquiry",
    messages: [
      { role: "visitor", text: "Hi, I'm looking for help with a car accident case. Do you take personal injury clients in California?" },
      { role: "assistant", text: "Yes, our firm handles personal injury cases throughout California. I can help determine if we're a good fit and schedule a consultation. First, were you injured in the accident in the last two years?" },
      { role: "visitor", text: "Yes, it happened about six months ago." },
      { role: "assistant", text: "I'm sorry you're dealing with that. Were you the driver, passenger, or a pedestrian?" },
      { role: "visitor", text: "I was the driver." },
      { role: "assistant", text: "Understood. We'll want to review the police report and your medical records. What's your full name, and how can our intake team reach you?" },
      { role: "visitor", text: "I'm David Flores, and my number is 510-555-0198." },
      { role: "assistant", text: "Thank you, David. We offer a free 30-minute consultation for car accident cases. Would you prefer a phone call or a Zoom meeting?" },
      { role: "visitor", text: "Zoom would be great." },
      { role: "assistant", text: "Perfect. I've noted your preference for a Zoom consultation. Our intake coordinator will contact you within one business day to confirm a time and send the meeting link." },
    ],
  },
  dental: {
    title: "Dental Office – New Patient & Insurance Check",
    messages: [
      { role: "visitor", text: "Hi, I'm looking for a new dentist. Do you take Delta Dental PPO?" },
      { role: "assistant", text: "Welcome! Yes, we're in-network with Delta Dental PPO. I can help you check availability and get scheduled. Are you interested in a cleaning and exam, or do you have a specific issue like pain or a broken tooth?" },
      { role: "visitor", text: "Just a cleaning and exam for now." },
      { role: "assistant", text: "Great. We usually recommend a new patient visit that includes X-rays, a full exam, and cleaning. When are you hoping to come in—this week, next week, or later?" },
      { role: "visitor", text: "Next week if possible." },
      { role: "assistant", text: "We have several openings next week. What's your name and the best phone number so our front desk can text to confirm a specific time?" },
      { role: "visitor", text: "I'm Maria, and my number is 925-555-0144." },
      { role: "assistant", text: "Thanks, Maria. I've sent your info to our team and flagged it as a new patient with Delta Dental PPO. You'll receive a text from our office shortly with a couple of time options for next week." },
    ],
  },
};

function WebsiteChatExamples() {
  const [activeScenario, setActiveScenario] = useState<ScenarioKey>("hvac");
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    setVisibleCount(0);
    const messages = SCENARIOS[activeScenario].messages;
    let count = 0;

    const timer = setInterval(() => {
      count++;
      setVisibleCount(count);
      if (count >= messages.length) {
        clearInterval(timer);
      }
    }, 150);

    return () => clearInterval(timer);
  }, [activeScenario]);

  const scenario = SCENARIOS[activeScenario];

  return (
    <section id="examples" className="mb-16 scroll-mt-20">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight mb-3">See Example Conversations</h2>
        <p className="text-muted-foreground">
          Here's what your AI website chat could look like for different types of businesses.<br />Click on each business type and see the chat conversation between the client and the AI Chat solution.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 justify-center mb-8">
        <button
          onClick={() => setActiveScenario("hvac")}
          className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
            activeScenario === "hvac"
              ? "bg-primary text-primary-foreground"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          HVAC
        </button>
        <button
          onClick={() => setActiveScenario("law")}
          className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
            activeScenario === "law"
              ? "bg-primary text-primary-foreground"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Law Firm
        </button>
        <button
          onClick={() => setActiveScenario("dental")}
          className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
            activeScenario === "dental"
              ? "bg-primary text-primary-foreground"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Dental
        </button>
      </div>

      <div className="border rounded-lg p-6 bg-white max-w-3xl mx-auto">
        <h3 className="text-sm font-semibold text-muted-foreground mb-6 text-center">
          {scenario.title}
        </h3>
        <div className="space-y-4">
          {scenario.messages.map((message, index) => {
            const isVisible = index < visibleCount;
            return (
              <div
                key={index}
                className={`flex ${message.role === "assistant" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-3 transition-all duration-300 ease-out ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                  } ${
                    message.role === "assistant"
                      ? "bg-primary text-primary-foreground"
                      : "bg-gray-100 text-gray-900"
                  }`}
                  style={{ transitionDelay: `${index * 120}ms` }}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
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
        eyebrow="Website Chatbot"
        title="Your website, now a 24/7 AI sales assistant"
        subtitle="Intelligent chat that answers questions, captures leads, and routes conversations to your team — automatically."
        primaryCta={{ label: "See it in action", onClick: scrollToExamples }}
        secondaryCta={{ label: "Book a demo", href: "https://cal.com/b.foroodian/30-min-ai-workflow-audit" }}
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

        <WebsiteChatExamples />

        <section className="bg-muted rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to turn your website into a sales machine?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            See how our AI chatbot can capture more leads and free up your team. Try it now or book a personalized demo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <button
              onClick={openChat}
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
