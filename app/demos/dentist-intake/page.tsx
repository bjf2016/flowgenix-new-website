"use client";

import { useState, FormEvent } from "react";

const webhookUrl =
  process.env.NEXT_PUBLIC_N8N_DENTIST_WEBHOOK ??
  "https://n8n.flowgenixai.com/webhook/dentist-intake-demo";

export default function Page() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [reason, setReason] = useState("New patient exam");
  const [preferredTime, setPreferredTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notice, setNotice] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setNotice("");

    // Guard in case webhookUrl is somehow missing
    if (!webhookUrl) {
      setNotice("Configuration error: webhook URL missing.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, reason, preferredTime }),
      });

      if (!response.ok) {
        setNotice("Something went wrong. Please try again.");
        return;
      }

      setNotice("Thanks! Our AI receptionist will call you shortly.");
      setName("");
      setPhone("");
      setReason("New patient exam");
      setPreferredTime("");
    } catch (error) {
      setNotice("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="container max-w-3xl py-12">
      <h1 className="text-3xl font-bold tracking-tight">Dentist Intake Bot — Demo</h1>
      <p className="mt-2 text-muted-foreground">
        This demo will capture name, phone, reason for visit, and a preferred time window.
      </p>

      <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            className="mt-1 w-full rounded-md border px-3 py-2"
            placeholder="Jane Patel"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input
            className="mt-1 w-full rounded-md border px-3 py-2"
            placeholder="(555) 555-1234"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Reason for visit</label>
          <select
            className="mt-1 w-full rounded-md border px-3 py-2"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          >
            <option>New patient exam</option>
            <option>Clear aligner consult</option>
            <option>Cleaning</option>
            <option>Emergency / pain</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Preferred time window</label>
          <input
            className="mt-1 w-full rounded-md border px-3 py-2"
            placeholder="e.g., Tue–Thu, 9–11am"
            value={preferredTime}
            onChange={(e) => setPreferredTime(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="rounded-md px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Connect to Live Bot"}
        </button>

        {notice && (
          <p
            className={`text-sm ${
              notice.includes("Thanks") ? "text-green-600" : "text-red-600"
            }`}
          >
            {notice}
          </p>
        )}

        <p className="text-xs text-muted-foreground">
          This form triggers our AI receptionist to call you back.
        </p>
      </form>
    </main>
  );
}
