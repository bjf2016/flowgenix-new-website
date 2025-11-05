import { PersonaCards } from '@/components/PersonaCards';
import { CallToAction } from '@/components/CallToAction';

export default function PersonasPage() {
  return (
    <div className="space-y-20 pb-20">
      <section className="bg-[#CDE4F3] py-16">
        <div className="container mx-auto max-w-7xl px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Who we help
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Two focused tracks with fast ROI.
          </p>
        </div>
      </section>

      <PersonaCards
        items={[
          {
            title: "Dentists",
            description: "Automated intake, insurance pre-qual, recalls.",
            ctaLabel: "Explore Dentists",
            href: "/personas/dentists"
          },
          {
            title: "Local Services",
            description: "Answer, qualify, schedule for HVAC/Electric/Restaurants.",
            ctaLabel: "Explore Local Services",
            href: "/personas/local-services"
          }
        ]}
      />

      <CallToAction
        title="Not sure where to start?"
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
