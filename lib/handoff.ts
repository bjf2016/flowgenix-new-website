export function openChat(): void {
  console.log('[FlowGenixAI] Opening chat widget (stub - will integrate Claude widget)');
}

export function openVoice(payload?: Record<string, any>): void {
  console.log('[FlowGenixAI] Opening voice interface (Retell Callback stub)', payload);
}

export async function submitLead(payload: Record<string, any>): Promise<{ ok: boolean }> {
  console.log('[FlowGenixAI] Submitting lead (stub - will POST to /api/lead)', payload);
  return { ok: true };
}
