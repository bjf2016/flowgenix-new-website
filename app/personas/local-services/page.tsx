import SectionHero from "@/components/SectionHero";

export default function Page() {
  return (
    <>
      <SectionHero
        eyebrow="HVAC • Electricians • Restaurants • Retail"
        title="AI front desk for local services"
        subtitle="Answer, qualify, schedule, and reduce no-shows — without exposing your calendar."
        primaryCta={{ label: "Watch 60-sec demo", href: "/demo/hvac-after-hours" }}
        secondaryCta={{ label: "Talk to our AI", onClick: "openChat" }}
      />
      <main className="container mx-auto max-w-7xl px-4 py-12">
      </main>
    </>
  );
}
