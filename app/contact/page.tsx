import SectionHero from "@/components/SectionHero";

export default function Page() {
  return (
    <>
      <SectionHero
        eyebrow="Contact"
        title="Talk to our AI front desk"
        subtitle="We'll capture details and route you appropriately. No public calendar links."
        primaryCta={{ label: "Open chat", onClick: "openChat" }}
      />
      <main className="container mx-auto max-w-3xl px-4 py-12">
      </main>
    </>
  );
}
