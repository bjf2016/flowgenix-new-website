import SectionHero from "@/components/SectionHero";

export default function Page() {
  return (
    <>
      <SectionHero eyebrow="Privacy" title="Privacy Policy" />
      <main className="container mx-auto max-w-3xl px-4 py-12">
        <p className="text-neutral-700">Placeholder privacy content.</p>
      </main>
    </>
  );
}
