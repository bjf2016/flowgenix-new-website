import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface LeadPayload {
  tenant?: string;
  name: string;
  email?: string;
  phone?: string;
  intent?: string;
  source?: string;
  utm?: Record<string, string>;
}

async function fetchSecretValue(origin: string, key: string): Promise<string | null> {
  try {
    const url = `${origin}/functions/v1/secrets?key=${encodeURIComponent(key)}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch secret "${key}": ${response.statusText}`);
      return null;
    }

    const result = await response.json();
    return result.data?.value || null;
  } catch (error) {
    console.error(`Error fetching secret "${key}":`, error);
    return null;
  }
}

async function forwardToN8N(url: string, payload: any): Promise<boolean> {
  const attempts = 3;
  for (let i = 1; i <= attempts; i++) {
    try {
      const ctrl = new AbortController();
      const timeout = setTimeout(() => ctrl.abort(), 10_000);
      
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: ctrl.signal,
      });
      
      clearTimeout(timeout);
      
      if (res.ok) {
        console.log(`N8N forwarding succeeded (attempt ${i})`);
        return true;
      }
      
      console.warn(`N8N forwarding failed (attempt ${i}): ${res.status} ${res.statusText}`);
    } catch (error) {
      console.warn(`N8N forwarding error (attempt ${i}):`, error);
    }
    
    if (i < attempts) {
      await new Promise(resolve => setTimeout(resolve, 400 * i));
    }
  }
  
  console.error("N8N forwarding failed after all retry attempts");
  return false;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ ok: false, error: "Method not allowed" }),
      {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  try {
    const body: LeadPayload = await req.json();

    if (!body.name || body.name.trim() === "") {
      return new Response(
        JSON.stringify({ ok: false, error: "Name is required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const tenantDefault = Deno.env.get("TENANT_DEFAULT") || "flowgenixai";
    
    const payload = {
      tenant: body.tenant || tenantDefault,
      name: body.name,
      email: body.email || null,
      phone: body.phone || null,
      intent: body.intent || "lead",
      source: body.source || "website",
      utm: body.utm || {},
      timestamp: new Date().toISOString(),
      _meta: {
        app: "flowgenix-next",
        fn: "lead",
        v: 1,
      },
    };

    const origin = new URL(req.url).origin;
    const n8nWebhookUrl = await fetchSecretValue(origin, "N8N_WEBHOOK_URL");
    
    if (n8nWebhookUrl) {
      console.log("N8N_WEBHOOK_URL found, forwarding lead...");
    } else {
      console.log("N8N_WEBHOOK_URL not found, skipping N8N forwarding");
    }

    let forwarded = false;
    if (n8nWebhookUrl) {
      forwarded = await forwardToN8N(n8nWebhookUrl, payload);
    }

    return new Response(
      JSON.stringify({ ok: true, forwarded }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Lead function error:", error);
    return new Response(
      JSON.stringify({ ok: false, error: error.message || "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
