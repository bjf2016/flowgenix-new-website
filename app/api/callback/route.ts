import "server-only";
import { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type CallbackRequest = {
  tenant: string;
  phone: string;
  name?: string;
  bestTime?: "now" | "5m" | "later-evening" | "custom";
  context?: {
    source?: "chat" | "voice";
    page?: string;
    lastUserMsg?: string;
  };
  intent: "callback";
};

export async function GET() {
  return Response.json({
    ok: true,
    route: "/api/callback",
    version: 1,
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null) as CallbackRequest | null;

  if (!body || typeof body !== "object") {
    return Response.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.tenant || !body.phone || body.intent !== "callback") {
    return Response.json(
      { ok: false, error: "Missing required fields: tenant, phone, intent" },
      { status: 400 }
    );
  }

  const payload = {
    ...body,
    _meta: {
      app: "flowgenix-next",
      route: "/api/callback",
      version: 1,
      at: new Date().toISOString(),
    },
  };

  const webhookUrl = process.env.N8N_CALLBACK_URL;

  if (!webhookUrl) {
    return Response.json({
      ok: true,
      forwarded: false,
      reason: "missing_webhook",
    });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(6000),
    });

    if (response.ok) {
      return Response.json({
        ok: true,
        forwarded: true,
        id: null,
      });
    } else {
      return Response.json({
        ok: true,
        forwarded: false,
        reason: `webhook_http_${response.status}`,
      });
    }
  } catch (error: any) {
    return Response.json({
      ok: true,
      forwarded: false,
      reason: "egress_unavailable",
    });
  }
}
