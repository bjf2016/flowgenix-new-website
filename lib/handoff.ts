export function openChat() {
  window.dispatchEvent(new CustomEvent("flowgenix:openChat"));
}

export function openVoice(payload?: Record<string, any>) {
  console.log("openVoice() - Retell Callback", payload);
}

export async function submitLead(payload: Record<string, any>) {
  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return { ok: res.ok };
  } catch {
    return { ok: false };
  }
}
