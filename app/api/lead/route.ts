import { NextResponse } from "next/server";

type Hit = { ts: number; hits: number };

const lastHits = new Map<string, Hit>();
const WINDOW_MS = 10_000;
const MAX_HITS = 5;

function getIp(req: Request) {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd?.split(",")[0]?.trim() || "unknown";
}

export async function POST(req: Request) {
  try {
    const ip = getIp(req);
    const now = Date.now();

    const prev = lastHits.get(ip);
    if (!prev || now - prev.ts > WINDOW_MS) {
      lastHits.set(ip, { ts: now, hits: 1 });
    } else {
      const updated = { ts: prev.ts, hits: prev.hits + 1 };
      lastHits.set(ip, updated);
      if (updated.hits > MAX_HITS) {
        return NextResponse.json({ ok: false, reason: "rate_limited" }, { status: 429 });
      }
    }

    const body = await req.json();

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
