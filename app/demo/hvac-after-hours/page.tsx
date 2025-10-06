"use client";

import SectionHero from "@/components/SectionHero";

export default function Page() {
  const videoExists = false;

  return (
    <>
      <SectionHero
        eyebrow="Demo"
        title="HVAC After-Hours Bot — Demo"
        subtitle="Demo using synthetic data. Capture overnight leads → next-day dispatch."
        primaryCta={{ label: "Play demo video", href: "#demo-video" }}
        secondaryCta={{ label: "Talk to our AI", onClick: "openChat" }}
      />

      <section id="demo-video" className="container mx-auto max-w-5xl px-4 py-12">
        {videoExists ? (
          <video
            controls
            className="w-full rounded-xl shadow"
            src="/demos/hvac-after-hours.mp4"
          >
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="aspect-video rounded-xl border bg-neutral-50 grid place-items-center text-neutral-500 text-sm">
            Upload /public/demos/hvac-after-hours.mp4
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
                <span>Most overnight calls go to voicemail</span>
              </li>
              <li className="flex gap-2">
                <span className="text-neutral-400">•</span>
                <span>Morning call-back backlog</span>
              </li>
              <li className="flex gap-2">
                <span className="text-neutral-400">•</span>
                <span>Missed emergency revenue</span>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm hover:shadow transition">
            <h3 className="text-lg font-semibold mb-4">Workflow</h3>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li className="flex gap-2">
                <span className="text-neutral-400">•</span>
                <span>Caller speaks with bot after-hours</span>
              </li>
              <li className="flex gap-2">
                <span className="text-neutral-400">•</span>
                <span>Captures name, address, issue, urgency</span>
              </li>
              <li className="flex gap-2">
                <span className="text-neutral-400">•</span>
                <span>Creates lead + routes to dispatch queue for AM follow-up</span>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm hover:shadow transition sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Expected Outcomes</h3>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li className="flex gap-2">
                <span className="text-neutral-400">•</span>
                <span>+15–30% more booked jobs (varies by baseline)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-neutral-400">•</span>
                <span>Faster morning triage; fewer missed emergencies</span>
              </li>
              <li className="flex gap-2">
                <span className="text-neutral-400">•</span>
                <span>Clear audit trail of every call</span>
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
