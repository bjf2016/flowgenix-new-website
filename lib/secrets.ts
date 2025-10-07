// lib/secrets.ts
// Server-only secrets helper.
// DEV: uses in-memory store so you can work without any DB/edge function.
// PROD: uses Supabase Edge Function if configured (EDGE_URL + SERVICE_KEY present).

import "server-only";

const EDGE_URL = process.env.SUPABASE_EDGE_SECRETS_URL;          // e.g. https://<proj>.supabase.co/functions/v1/secrets
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;       // service role key (server-only)

// DEV memory store (persisted in module scope for the dev process)
const mem: Map<string, string> = (globalThis as any).__SECRETS__ ??= new Map<string, string>();

function norm(k: string) {
  return k.trim().toUpperCase();
}

// Only use the edge function in *production* and only if both envs exist.
const USE_EDGE =
  !!EDGE_URL &&
  !!SERVICE_KEY &&
  process.env.NODE_ENV === "production";

async function callEdge(body: unknown) {
  if (!EDGE_URL || !SERVICE_KEY) {
    throw new Error("edge_not_configured");
  }
  const res = await fetch(EDGE_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${SERVICE_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const text = await res.text();
  if (!res.ok) {
    throw new Error(`edge_${res.status}:${text}`);
  }
  try {
    return JSON.parse(text);
  } catch {
    return text as any;
  }
}

export async function getSecret(k: string): Promise<string | null> {
  const key = norm(k);

  if (!USE_EDGE) {
    // DEV: memory store first, then env as fallback
    if (mem.has(key)) return mem.get(key)!;
    return process.env[key] ?? null;
  }

  const out = await callEdge({ op: "get", key });
  const val = (out && (out.value ?? out?.data?.value)) ?? null;
  return val ? String(val) : null;
}

export async function setSecret(k: string, v: string): Promise<void> {
  const key = norm(k);
  const value = v;

  if (!USE_EDGE) {
    // DEV: just write to memory
    mem.set(key, value);
    return;
  }

  await callEdge({ op: "upsert", key, value });
}

export async function listSecrets(): Promise<Array<{ key: string; updated_at?: string }>> {
  if (!USE_EDGE) {
    // DEV: list memory keys
    return [...mem.keys()].map((key) => ({ key }));
  }

  const out = await callEdge({ op: "list" });
  const items = Array.isArray(out?.items) ? out.items : Array.isArray(out) ? out : [];
  return items.map((it: any) => ({
    key: (it.key ?? it.KEY ?? it[0]) as string,
    updated_at: (it.updated_at ?? it.updatedAt) as string | undefined,
  }));
}
