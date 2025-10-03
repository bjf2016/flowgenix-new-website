import SectionHero from "@/components/SectionHero";

export default function Page() {
  return (
    <>
      <SectionHero
        eyebrow="Dentists"
        title="AI that books more dental appointments"
        subtitle="Automated intake, insurance pre-qual, recalls and reminders — without exposing your calendar."
        primaryCta={{ label: "Watch 60-sec demo", href: "/demo/dentist-intake-bot" }}
        secondaryCta={{ label: "Talk to our AI", onClick: "openChat" }}
      />
      <main className="container mx-auto max-w-7xl px-4 py-12">
      </main>
    </>
  );
}
