"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import SectionHero from "@/components/SectionHero";

export default function DentistCallbackDemo() {
  const videoExists = true;

  return (
    <>
      <div className="bg-[#CDE4F3] pt-6">
        <div className="container mx-auto max-w-7xl px-6">
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-[#009CE3] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to all demos
          </Link>
        </div>
      </div>

      <SectionHero
        eyebrow="Demo"
        title="Dentist AI Receptionist call-back"
        subtitle="Demo using synthetic data. Baseline → Workflow → Expected outcomes."
        primaryCta={{ label: "Book a strategy call", href: "/contact" }}
        secondaryCta={{ label: "Talk to our AI", onClick: "openChat" }}
      />

      <section
        id="demo-video"
        className="container mx-auto max-w-5xl px-4 py-12"
      >
        {videoExists ? (
          <div className="aspect-video w-full overflow-hidden rounded-xl shadow bg-black">
            <iframe
              className="h-full w-full"
              src="https://www.youtube.com/embed/B4s3mieZlJo"
              title="Dentist AI Receptionist call-back demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <div className="aspect-video rounded-xl border bg-neutral-50 grid place-items-center text-neutral-500 text-sm">
            Upload /public/demos/dentist-intake.mp4
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
                <span>New patient calls missed after-hours</span>
              </li>
              <li className="flex gap-2">
                <span className="text-neutral-400">•</span>
                <span>Long intake times at peak hours</span>
              </li>
              <li className="flex gap-2">
                <span className="text-neutral-400">•</span>
                <span>High no-shows for consults</span>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm hover:shadow transition">
            <h3 className="text-lg font-semibold mb-4">Workflow</h3>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li className="flex gap-2">
                <span className="text-neutral-400">•</span>
                <span>
                  Caller/visitor engages bot → collects name, insurance, intent
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-neutral-400">•</span>
                <span>Validates coverage; captures notes</span>
              </li>
              <li className="flex gap-2">
                <span className="text-neutral-400">•</span>
                <span>Creates lead and routes to staff (no public calendar)</span>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm hover:shadow transition sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Expected Outcomes</h3>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li className="flex gap-2">
                <span className="text-neutral-400">•</span>
                <span>+20–40% more booked consults (varies by baseline)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-neutral-400">•</span>
                <span>Faster intake (&lt;2 min) & fewer no-shows</span>
              </li>
              <li className="flex gap-2">
                <span className="text-neutral-400">•</span>
                <span>Clear audit trail of every interaction</span>
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
