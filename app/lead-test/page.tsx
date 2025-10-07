"use client";
import { useState } from "react";

export default function LeadTestPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  async function send() {
    setLoading(true); setError(null); setResult(null);
    const payload = {
      tenant: "flowgenixai",
      name: `Lead Test ${new Date().toISOString()}`,
      phone: "+15550000000",
      intent: "lead",
      source: "website",
      utm: { source: "lead-test" },
      _meta: { app: "flowgenix-next", route: "/lead-test", version: 1 }
    };
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      setResult({ status: res.status, json, payloadSent: payload });
    } catch (err: any) {
      setError(err?.message || "Request failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-semibold mb-2">/lead-test</h1>
      <p className="text-sm text-gray-600 mb-6">
        One-click POST to <code>/api/lead</code>. No DB; forwards to n8n.
      </p>
      <button
        onClick={send}
        disabled={loading}
        className="rounded-md bg-[#009CE3] text-white px-4 py-2 font-medium disabled:opacity-60"
      >
        {loading ? "Sending…" : "Send Test Lead"}
      </button>
      {error && <div className="mt-4 text-red-600 text-sm">Error: {error}</div>}
      {result && (
        <div className="mt-6 space-y-2">
          <div className="text-sm text-gray-700">Status: {result.status}</div>
          <pre className="text-xs bg-gray-100 p-3 rounded-md overflow-auto">
            {JSON.stringify(result.json, null, 2)}
          </pre>
          <details className="mt-2">
            <summary className="text-sm cursor-pointer">Payload sent</summary>
            <pre className="text-xs bg-gray-50 p-3 rounded-md overflow-auto">
              {JSON.stringify(result.payloadSent, null, 2)}
            </pre>
          </details>
        </div>
      )}
    </div>
  );
}
