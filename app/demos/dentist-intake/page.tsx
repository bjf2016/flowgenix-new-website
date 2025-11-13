"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

const webhookUrl =
  process.env.NEXT_PUBLIC_N8N_DENTIST_WEBHOOK ??
  "https://n8n.flowgenixai.com/webhook/dentist-intake-demo";

export default function Page() {
  const router = useRouter();

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
    <main className="min-h-screen bg-slate-50">
      <div className="container max-w-xl mx-auto py-12">
        <header className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">
            Dentist AI Receptionist call-back
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            This demo will capture a current/new patient information such as name, phone number, reason for visit, and a preferred time to call back. (For demo purposes, the call back will be immediate)
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Once the website visitor clicks on "Request AI Call Back", they will receive a call from the AI Receptionist to help answer their quesitons or address their needs (which can be customized and contained)
          </p>
        </header>

        <div className="rounded-2xl border bg-white shadow-md p-6 sm:p-8">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                className="mt-1 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/60"
                placeholder="Jane Patel"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                className="mt-1 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/60"
                placeholder="+1 555 555 1234"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Reason for visit</label>
              <select
                className="mt-1 w-full rounded-md border px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/60"
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
              <label className="block text-sm font-medium mb-1">Preferred time window</label>
              <input
                className="mt-1 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/60"
                placeholder="e.g., Tue–Thu, 9–11am"
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                required
              />
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 rounded-md px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Request AI Call Back"}
              </button>

              <button
                type="button"
                className="rounded-md border px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                onClick={() => router.back()}
              >
                Cancel
              </button>
            </div>

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
        </div>
      </div>
    </main>
  );
}
