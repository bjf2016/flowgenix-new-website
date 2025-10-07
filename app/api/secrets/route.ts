// app/api/secrets/route.ts
import { NextRequest } from "next/server";
import { getSecret, setSecret, listSecrets } from "@/lib/secrets";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// TEMP DEV OVERRIDE — remove later if desired
// Ensures ADMIN_TOKEN exists in local dev even if Bolt dev doesn't inject secrets.
if (!process.env.ADMIN_TOKEN && process.env.NODE_ENV !== "production") {
  process.env.ADMIN_TOKEN = "flowgenix_admin_2025_secret";
}

function checkAuth(req: NextRequest): boolean {
  // tolerant header parsing (case + whitespace)
  const raw =
    req.headers.get("authorization") ??
    req.headers.get("Authorization") ??
    "";
  const token = raw.trim().toLowerCase().startsWith("bearer ")
    ? raw.trim().slice(7)
    : raw.trim();

  const adminToken = (process.env.ADMIN_TOKEN ?? "").trim();
  return !!adminToken && token === adminToken;
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const items = await listSecrets();
    return Response.json({ items });
  } catch (error: any) {
    return Response.json(
      { error: error?.message ? `Failed to list secrets: ${error.message}` : "Internal error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json().catch(() => null) as { key?: string; value?: string } | null;
    const key = (body?.key ?? "").trim();
    const value = (body?.value ?? "").trim();

    if (!key) return Response.json({ error: "Key is required" }, { status: 400 });
    if (!value) return Response.json({ error: "Value is required" }, { status: 400 });

    await setSecret(key.toUpperCase(), value);
    return Response.json({ ok: true });
  } catch (error: any) {
    return Response.json(
      { error: error?.message ? `Failed to set secret: ${error.message}` : "Internal error" },
      { status: 500 }
    );
  }
}
