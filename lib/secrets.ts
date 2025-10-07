// lib/secrets.ts
// Server-only secrets helper. Uses Supabase Edge Function when configured.
// Falls back to in-memory store in *dev* so you can proceed without DB.
// DO NOT expose any of this client-side.
import "server-only";

const EDGE_URL = process.env.SUPABASE_EDGE_SECRETS_URL;          // e.g. https://.../functions/v1/secrets
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;       // service role key (server-only)

type ListItem = { key: string; updated_at?: string };

// Call your Supabase Edge Function if configured
async function callEdge(body: unknown) {
  if (!EDGE_URL || !SERVICE_KEY) throw new Error("edge_not_configured");
  const res = await fetch(EDGE_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${SERVICE_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`edge_${res.status}:${text}`);
  try { return JSON.parse(text); } catch { return text as any; }
}

// Simple in-memory store for dev only
const mem: Map<string, string> = (globalThis as any).__SECRETS__ ??= new Map<string, string>();

function norm(k: string) { return k.trim().toUpperCase(); }

export async function getSecret(k: string): Promise<string | null> {
  const key = norm(k);
  try {
    const out = await callEdge({ op: "get", key });
    const val = (out && (out.value ?? out?.data?.value)) ?? null;
    return val ? String(val) : null;
  } catch (e) {
    // Dev fallback: memory, then env
    if (process.env.NODE_ENV !== "production") {
      if (mem.has(key)) return mem.get(key)!;
      return process.env[key] ?? null;
    }
    throw e;
  }
}

export async function setSecret(k: string, v: string): Promise<void> {
  const key = norm(k);
  const value = v;
  try {
    await callEdge({ op: "upsert", key, value });
  } catch (e) {
    // Dev fallback: memory
    if (process.env.NODE_ENV !== "production") {
      mem.set(key, value);
      return;
    }
    throw e;
  }
}

export async function listSecrets(): Promise<ListItem[]> {
  try {
    const out = await callEdge({ op: "list" });
    const items = Array.isArray(out?.items) ? out.items : Array.isArray(out) ? out : [];
    return items.map((it: any) => ({
      key: (it.key ?? it.KEY ?? it[0]) as string,
      updated_at: (it.updated_at ?? it.updatedAt) as (string | undefined),
    }));
  } catch (e) {
    // Dev fallback: memory keys
    if (process.env.NODE_ENV !== "production") {
      return [...mem.keys()].map((key) => ({ key }));
    }
    throw e;
  }
}
