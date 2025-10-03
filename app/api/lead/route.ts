import { NextResponse } from "next/server";

function getIp(req: Request) {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd?.split(",")[0]?.trim() || "unknown";
}

const lastHit = new Map<string, number>();
const WINDOW_MS = 10_000;
const MAX_HITS = 5;

export async function POST(req: Request) {
  try {
    const ip = getIp(req);
    const now = Date.now();
    const prev = lastHit.get(ip) ?? 0;
    const hits = prev && now - prev < WINDOW_MS ? (prev as any)._hits + 1 : 1;

    if (hits > MAX_HITS) {
      return NextResponse.json({ ok: false, reason: "rate_limited" }, { status: 429 });
    }

    const body = await req.json();

    (lastHit as any).set(ip, Object.assign(now, { _hits: hits }));

    const target = process.env.N8N_WEBHOOK_URL;
    if (target) {
      await fetch(target, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[/api/lead] error:", e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
