import { NextRequest } from "next/server";
import { z } from "zod";
import { createSupabaseAdmin } from "@/lib/supabaseAdmin";
import { getSecret } from "@/lib/secrets";

export const runtime = "nodejs";
export const dynamic = "force-dynamic"; 
export const revalidate = 0;   


const LeadSchema = z.object({
  tenant: z.string().min(1).optional(),
  name: z.string().min(1),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().min(7).optional().or(z.literal("")),
  intent: z.string().optional(),
  source: z.string().optional(),
  utm: z.record(z.string()).optional(),
});

type LeadInput = z.infer<typeof LeadSchema>;

async function forwardToN8N(payload: any) {
  const url = await getSecret("N8N_WEBHOOK_URL");
  if (!url) return { forwarded: false };

  const attempts = 3;
  for (let i = 1; i <= attempts; i++) {
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 10_000);
      const res = await fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
        signal: ctrl.signal,
      });
      clearTimeout(t);
      if (res.ok) return { forwarded: true, status: res.status };
    } catch {}
    await new Promise(r => setTimeout(r, 400 * i));
  }
  return { forwarded: false };
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) ?? {};
    const parsed = LeadSchema.parse(body) as LeadInput;

    const tenantDefault = process.env.TENANT_DEFAULT || "flowgenixai";
    const payload = {
      tenant: parsed.tenant || tenantDefault,
      name: parsed.name,
      email: parsed.email || null,
      phone: parsed.phone || null,
      intent: parsed.intent || "lead",
      source: parsed.source || "website",
      utm: parsed.utm || {},
      timestamp: new Date().toISOString(),
      _meta: { app: "flowgenix-next", route: "/api/lead", version: 1 },
    };

    let dbId: string | null = null;
    try {
      const sb = await createSupabaseAdmin();
      const { data: tenantRow } = await sb
        .from("tenants")
        .select("id, slug")
        .eq("slug", payload.tenant)
        .maybeSingle();
      const tenant_id = tenantRow?.id ?? null;

      const { data, error } = await sb
        .from("leads")
        .insert({
          tenant_id,
          name: payload.name,
          email: payload.email,
          phone: payload.phone,
          intent: payload.intent,
          source: payload.source,
          utm: payload.utm as any,
        })
        .select("id")
        .single();

      if (!error) dbId = data?.id ?? null;
      else console.error("[/api/lead] Supabase insert error:", error);
    } catch (e) {
      console.warn("[/api/lead] DB skipped:", (e as Error)?.message);
    }

    const forwardResult = await forwardToN8N({ ...payload, dbId });
    return Response.json({ ok: true, id: dbId, forwarded: forwardResult.forwarded });
  } catch (err: any) {
    console.error("[/api/lead] error:", err);
    const msg = err?.issues?.[0]?.message || err?.message || "Invalid payload";
    return Response.json({ ok: false, error: msg }, { status: 400 });
  }
}
