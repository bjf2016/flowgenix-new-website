import SectionHero from "@/components/SectionHero";

export default function Page() {
  return (
    <>
      <SectionHero eyebrow="Terms" title="Terms of Service" />
      <main className="container mx-auto max-w-3xl px-4 py-12">
        <p className="text-neutral-700">Placeholder terms content.</p>
      </main>
    </>
  );
}
