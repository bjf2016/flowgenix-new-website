'use client';

import Hero from '@/components/Hero';
import ServiceCard from '@/components/services/ServiceCard';
import { CallToAction } from '@/components/CallToAction';

export default function ServicesPage() {
  const services = [
    {
      title: "AI Voice Receptionist",
      desc: "Answer, qualify, schedule. 24/7 phone coverage that never misses a call or opportunity.",
      href: "/demo/dentist-intake-bot"
    },
    {
      title: "Website Chatbot",
      desc: "Turn your website into a 24/7 AI-powered sales assistant that answers questions, captures leads, and routes conversations to your team.",
      href: "/services/website-chatbot"
    },
    {
      title: "Workflow Automation",
      desc: "Connect apps, remove manual steps. Automate repetitive tasks and free up your team.",
      href: "/services/workflow-automation"
    },
    {
      title: "Lead Intake & Routing",
      desc: "Forms to CRM, alerts, follow-ups. Capture every lead and route it to the right person instantly.",
      href: "/services/lead-intake-routing"
    },
    {
      title: "Training & Playbooks",
      desc: "Team enablement + SOPs. Documentation and training that scales with your business.",
      href: "/demo/restaurant-waitlist"
    },
    {
      title: "Analytics & QA",
      desc: "Call summaries, trend insights. Data-driven decisions backed by real conversation intelligence.",
      href: "/demo/hvac-after-hours"
    }
  ];

  return (
    <div className="space-y-12 pb-20">
      <Hero
        title="AI Solutions that Drive Results"
        subtitle="From voice receptionists to end-to-end workflow automation, we implement fast and iterate."
        primaryCta={{ label: "Talk to our AI", onClick: "openChat" }}
        secondaryCta={{
          label: "Book a 30-min consult",
          href: "https://cal.com/b.foroodian/30-min-ai-workflow-audit"
        }}
        portraitSrc="/brand/ben v4.png"
      />

      <section className="container mx-auto max-w-7xl px-6 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              desc={service.desc}
              href={service.href}
            />
          ))}
        </div>
      </section>

      <CallToAction
        title="Ready to automate the busywork?"
        primary={{
          label: "Talk to our AI",
          onClick: "openChat"
        }}
        secondary={{
          label: "Book a 30-min consult",
          href: "https://cal.com/b.foroodian/30-min-ai-workflow-audit"
        }}
      />
    </div>
  );
}
