import SectionHero from "@/components/SectionHero";

export default function Page() {
  return (
    <>
      <SectionHero
        eyebrow="About"
        title="Why FlowGenixAI"
        subtitle="Founder-led consulting focused on reliable workflows and clear ROI."
        secondaryCta={{ label: "Talk to our AI", onClick: "openChat" }}
      />
      <main className="container mx-auto max-w-7xl px-4 py-12">
      </main>
    </>
  );
}
