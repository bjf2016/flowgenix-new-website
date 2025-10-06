"use client";

import SectionHero from "@/components/SectionHero";

export default function Page() {
  const videoExists = false;

  return (
    <>
      <SectionHero
        eyebrow="Demo"
        title="Restaurant Waitlist Bot — Demo"
        subtitle="Demo using synthetic data. Confirmations & fewer no-shows."
        primaryCta={{ label: "Play demo video", href: "#demo-video" }}
        secondaryCta={{ label: "Talk to our AI", onClick: "openChat" }}
      />

      <section id="demo-video" className="container mx-auto max-w-5xl px-4 py-12">
        {videoExists ? (
          <video
            controls
            className="w-full rounded-xl shadow"
            src="/demos/restaurant-waitlist.mp4"
          >
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="aspect-video rounded-xl border bg-neutral-50 grid place-items-center text-neutral-500 text-sm">
            Upload /public/demos/restaurant-waitlist.mp4
          </div>
        )}
      </section>

      <section className="container mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border bg-white p-6 shadow-sm hover:shadow transition">
            <h3 className="text-lg font-semibold mb-4">Baseline</h3>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li className="flex gap-2">
                <span className="text-neutral-400">•</span>
                <span>Long hold times during peak</span>
              </li>
              <li className="flex gap-2">
                <span className="text-neutral-400">•</span>
                <span>Manual confirmations</span>
              </li>
              <li className="flex gap-2">
                <span className="text-neutral-400">•</span>
                <span>High no-show rates</span>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm hover:shadow transition">
            <h3 className="text-lg font-semibold mb-4">Workflow</h3>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li className="flex gap-2">
                <span className="text-neutral-400">•</span>
                <span>Visitor chats with bot for party size, time, phone</span>
              </li>
              <li className="flex gap-2">
                <span className="text-neutral-400">•</span>
                <span>Confirms by SMS; updates waitlist automatically</span>
              </li>
              <li className="flex gap-2">
                <span className="text-neutral-400">•</span>
                <span>Sends reminders and easy cancel/confirm links</span>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm hover:shadow transition sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Expected Outcomes</h3>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li className="flex gap-2">
                <span className="text-neutral-400">•</span>
                <span>Fewer no-shows and smoother table turns</span>
              </li>
              <li className="flex gap-2">
                <span className="text-neutral-400">•</span>
                <span>Faster front-of-house triage</span>
              </li>
              <li className="flex gap-2">
                <span className="text-neutral-400">•</span>
                <span>Happier guests; fewer abandoned calls</span>
              </li>
            </ul>
            <div className="mt-4">
              <span className="inline-flex items-center rounded-md bg-neutral-900 text-white text-xs px-2 py-1">
                Demo (synthetic data)
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
