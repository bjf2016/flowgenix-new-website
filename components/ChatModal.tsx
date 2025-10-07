"use client";
import { useEffect, useRef, useState } from "react";

type Msg = { role: "system" | "user" | "assistant"; content: string };

export default function ChatModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [tab, setTab] = useState<"chat"|"voice">("chat");
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "assistant", content: "Hi! Ask me anything. (LLM disabled for now — Step E will enable it.)" }
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [voiceConsent, setVoiceConsent] = useState<null|boolean>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, open]);

  async function send() {
    const content = input.trim();
    if (!content || sending) return;
    const next: Msg[] = [...msgs, { role: "user", content }];
    setMsgs(next);
    setInput("");
    setSending(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next })
      });
      const json = await res.json();
      const reply = (json?.message?.content as string) ?? "OK.";
      setMsgs(prev => [...prev, { role: "assistant", content: reply }]);
    } catch (err: any) {
      setMsgs(prev => [...prev, { role: "assistant", content: "Request failed. Try again." }]);
    } finally {
      setSending(false);
    }
  }

  function onEnter(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  }

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute inset-x-0 bottom-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-full md:w-[720px] max-h-[85vh]">
        <div className="rounded-t-2xl md:rounded-2xl bg-white shadow-xl border">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <div className="font-semibold">FlowGenix AI</div>
            <button onClick={onClose} className="text-sm text-gray-600 hover:text-black">Close</button>
          </div>

          <div className="px-4 pt-3">
            <div className="inline-flex rounded-md border overflow-hidden">
              <button className={`px-3 py-1.5 text-sm ${tab==="chat"?"bg-[#009CE3] text-white":"bg-white"}`} onClick={()=>setTab("chat")}>Chat</button>
              <button className={`px-3 py-1.5 text-sm ${tab==="voice"?"bg-[#009CE3] text-white":"bg-white"}`} onClick={()=>setTab("voice")}>Voice (confirm first)</button>
            </div>
          </div>

          <div className="px-4 pb-4">
            {tab === "chat" && (
              <>
                <div ref={boxRef} className="mt-3 h-[45vh] md:h-[50vh] overflow-y-auto space-y-3">
                  {msgs.map((m, i) => (
                    <div key={i} className={`text-sm leading-relaxed ${m.role==="user"?"text-right":""}`}>
                      <span className={`inline-block px-3 py-2 rounded-lg ${m.role==="user"?"bg-[#009CE3] text-white":"bg-gray-100 text-gray-900"}`}>
                        {m.content}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-3">
                  <textarea
                    value={input}
                    onChange={(e)=>setInput(e.target.value)}
                    onKeyDown={onEnter}
                    placeholder="Type a message…"
                    className="w-full border rounded-md p-2 text-sm"
                    rows={2}
                  />
                  <div className="mt-2 flex justify-end">
                    <button onClick={send} disabled={sending || !input.trim()} className="rounded-md bg-[#009CE3] text-white px-4 py-2 text-sm disabled:opacity-60">
                      {sending ? "Sending…" : "Send"}
                    </button>
                  </div>
                </div>
              </>
            )}

            {tab === "voice" && (
              <div className="mt-4 space-y-3">
                {voiceConsent !== true ? (
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <div className="font-medium mb-1">Enable voice?</div>
                    <p className="text-sm text-gray-600">
                      We'll request microphone access only after you confirm. No audio leaves the browser until Step F (provider wiring).
                    </p>
                    <div className="mt-3 flex gap-2">
                      <button onClick={()=>setVoiceConsent(true)} className="px-3 py-2 text-sm rounded-md bg-[#009CE3] text-white">I understand — continue</button>
                      <button onClick={()=>{ setVoiceConsent(false); setTab("chat"); }} className="px-3 py-2 text-sm rounded-md border">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div className="border rounded-lg p-4">
                    <div className="font-medium">Voice ready (UI only)</div>
                    <p className="text-sm text-gray-600">
                      Microphone access & streaming will be wired in Step F. For now this is a placeholder after consent.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
