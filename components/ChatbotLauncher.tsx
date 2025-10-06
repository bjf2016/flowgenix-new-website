"use client";

import { useEffect, useState } from "react";

export default function ChatbotLauncher() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("flowgenix:openChat", onOpen);
    return () => window.removeEventListener("flowgenix:openChat", onOpen);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/30 flex items-center justify-center p-4" aria-modal="true" role="dialog">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl border overflow-hidden">
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">Talk to our AI</h2>
          <button onClick={() => setOpen(false)} className="px-2 py-1 rounded-md border hover:bg-neutral-50">Close</button>
        </div>
        <div className="p-6 space-y-4">
          <p className="text-sm text-neutral-600">
            This is a temporary launcher to confirm the CTA wiring. We'll embed the Claude chatbot here next.
          </p>
          <div className="rounded-lg border p-4 bg-neutral-50">
            <p className="text-sm font-medium mb-2">Next step after chat (final flow):</p>
            <ol className="list-decimal ml-5 text-sm text-neutral-700 space-y-1">
              <li>Collect name + phone</li>
              <li>Ask for consent ("YES" to start a voice call)</li>
              <li>Start Retell voice (confirm-first)</li>
            </ol>
          </div>
          <div className="flex gap-3">
            <button
              className="px-4 py-2 rounded-md bg-black text-white"
              onClick={() => alert('Claude widget will mount here in the next step.')}
            >
              Start chat (temp)
            </button>
            <button
              className="px-4 py-2 rounded-md border"
              onClick={async () => {
                const r = await fetch('/api/lead', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ intent:'cta_click', source:'launcher' }) });
                if (r.ok) alert('Lead ping sent (test).');
              }}
            >
              Test lead ping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
