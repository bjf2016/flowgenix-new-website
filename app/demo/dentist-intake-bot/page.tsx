import SectionHero from "@/components/SectionHero";

export default function Page() {
  return (
    <>
      <SectionHero
        eyebrow="Demo"
        title="Dentist Intake Bot — Demo"
        subtitle="Demo using synthetic data. Baseline → Workflow → Expected outcomes."
        primaryCta={{ label: "Play demo video", href: "#demo-video" }}
        secondaryCta={{ label: "Talk to our AI", onClick: "openChat" }}
      />
      <section id="demo-video" className="container mx-auto max-w-5xl px-4 py-12">
      </section>
    </>
  );
}
