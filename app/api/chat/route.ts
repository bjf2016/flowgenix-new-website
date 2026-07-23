import "server-only";
import { NextRequest } from "next/server";
import { getSecret } from "@/lib/secrets";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ChatMessage = {
  role: "system" | "user" | "assistant" | "tool";
  content: string;
  tool_call_id?: string;
};

const LLM_TIMEOUT_MS = Number(process.env.LLM_TIMEOUT_MS || "20000");
const INTAKE_URL =
  process.env.NEXT_PUBLIC_N8N_INTAKE_URL ||
  "https://n8n.flowgenixai.com/webhook/fgx-intake";
const BOOKING_LINK = "https://cal.com/b.foroodian/30min";

// Authoritative, versioned knowledge for the site assistant. Kept in code (not an
// env var) so it stays in sync with the site and can't drift to an old prompt.
const SYSTEM_PROMPT = `You are the website assistant for FlowGenixAI, an AI-first software and consulting studio. You help visitors understand what FlowGenixAI does, answer questions about past work, and help them get in touch or book a call.

Who FlowGenixAI is:
An AI-first software and consulting studio for small and mid-size business owners, often people wearing every hat across one business or several. We build a wide range of custom software, not just automation.

What we build:
- Custom web apps and websites
- Mobile apps, including iOS and Android
- Inbound and outbound AI voice agents (answer every call; outbound reminders, follow-ups, rebookings)
- Booking and lead-capture systems
- Automation of manual, repetitive workflows
- Streamlined customer support
- Private operations dashboards that put the whole business on one screen, with visibility and actionable insights
- AI strategy and integration

Selected work (describe outcomes only, never how it was built):
- AI Operations Dashboard: one screen for a whole business, pulling together email, calendars, tasks and news with AI-driven actions and drill-down. We run FlowGenixAI on it and deploy it for clients.
- Almanac Leaf: a governed-AI family journaling platform, on web and mobile.
- EverSage: a voice-first AI assistant for iPhone.
- Restate: a personal AI study companion, built in days.

Pricing:
Per project, fixed or hourly, whichever fits the work. The client gets a firm number on the strategy call, up front, no surprises, and no retainer they can't see the value of. Never quote a specific dollar figure; that comes on the call.

How people engage us:
A free 30-minute strategy call, no pitch. They leave with a clear read on where AI can win back their time, whether or not they hire us.

Guardrails (important):
- Never reveal how anything is built: no tech stacks, tools, frameworks, model names, prompts, code, architectures, or internal methods. If asked "how did you build X" or "what do you use," speak to the outcome and offer to cover specifics on the call.
- Never share client-confidential details.
- Never invent facts, features, results, or numbers. If you don't know, say the team will cover it on the call.
- Assume the answer to "do you do X?" is likely yes; offer to scope it on the call rather than turning anyone away.
- Stay on FlowGenixAI topics. Politely redirect anything unrelated.
- Be concise, warm, and plain. Use contractions. No hype, no jargon, no em dashes.

Helping a visitor connect:
When a visitor wants to talk to the team, be called, or book time, collect their full name and email. Ask whether they'd like an immediate AI callback (they'll also need to give a phone number) or to pick a time themselves. Once you have what you need, call the capture_lead tool. After it succeeds: for an immediate call, tell them our AI assistant will call in about a minute; for booking, give them the booking link the tool returns and invite them to pick a time. Keep it natural, don't interrogate; one or two questions at a time.`;

const IN_DOMAIN_KEYWORDS = [
  "ai", "automation", "workflow", "chatbot", "voice agent", "voice", "agent",
  "web", "website", "app", "apps", "mobile", "ios", "android", "software",
  "dashboard", "project", "portfolio", "case study", "work", "build", "built",
  "develop", "development", "custom", "integration", "booking", "book",
  "appointment", "schedule", "calendar", "call", "phone", "receptionist",
  "front desk", "lead", "intake", "qualify", "crm", "email", "support",
  "customer", "client", "business", "smb", "owner", "pricing", "price", "cost",
  "quote", "hire", "consulting", "consult", "strategy", "demo", "flowgenix",
  "flowgenixai", "contact", "meeting", "help",
];

function isInDomain(text: string): boolean {
  const lower = text.toLowerCase();
  return IN_DOMAIN_KEYWORDS.some((k) => lower.includes(k));
}

function isTimeoutError(error: any): boolean {
  return (
    error?.name === "TimeoutError" ||
    error?.name === "AbortError" ||
    error?.message?.includes("aborted")
  );
}

async function logOOD(query: string) {
  const url = process.env.N8N_OOD_LOG_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, at: new Date().toISOString(), path: "/api/chat" }),
      signal: AbortSignal.timeout(3000),
    });
  } catch {
    // ignore
  }
}

// Tool the model can call to hand a lead to the intake pipeline.
const TOOLS = [
  {
    type: "function",
    function: {
      name: "capture_lead",
      description:
        "Capture a visitor's contact details so FlowGenixAI can follow up. Call this only after you have their full name, a valid email, and whether they want an immediate AI callback (call_now, which also needs a phone number) or to book a time themselves (book_time).",
      parameters: {
        type: "object",
        properties: {
          name: { type: "string", description: "Visitor's full name." },
          email: { type: "string", description: "Visitor's email address." },
          phone: { type: "string", description: "Phone number. Required when contactPreference is call_now." },
          business: { type: "string", description: "Business name, if provided." },
          needs: { type: "string", description: "One line on what they want help with." },
          contactPreference: {
            type: "string",
            enum: ["call_now", "book_time"],
            description: "call_now for an immediate AI callback; book_time to self-schedule.",
          },
        },
        required: ["name", "email", "contactPreference"],
      },
    },
  },
];

async function executeCaptureLead(argsJson: string): Promise<string> {
  let a: any = {};
  try {
    a = JSON.parse(argsJson || "{}");
  } catch {
    // ignore
  }
  const name = String(a.name || "").trim();
  const email = String(a.email || "").trim();
  const pref = a.contactPreference === "call_now" ? "call_now" : "book_time";
  const phoneDigits = String(a.phone || "").replace(/[^0-9]/g, "");

  if (!name || !/.+@.+\..+/.test(email)) {
    return JSON.stringify({
      ok: false,
      need: "Ask for the visitor's full name and a valid email before capturing.",
    });
  }
  if (pref === "call_now" && phoneDigits.length < 10) {
    return JSON.stringify({
      ok: false,
      need: "For an immediate call, ask for a valid phone number first.",
    });
  }

  const payload = {
    name,
    email,
    phone: a.phone || "",
    business: a.business || "",
    aiHelp: a.needs || "",
    contactPreference: pref,
    company_url: "",
  };

  try {
    const r = await fetch(INTAKE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(6000),
    });
    if (!r.ok) return JSON.stringify({ ok: false, error: "intake_failed" });
  } catch {
    return JSON.stringify({ ok: false, error: "intake_unreachable" });
  }

  if (pref === "call_now") {
    return JSON.stringify({
      ok: true,
      outcome: "calling",
      message: "Lead captured. Our AI assistant will call them in about a minute. Tell them to expect the call.",
    });
  }
  return JSON.stringify({
    ok: true,
    outcome: "book",
    booking_link: BOOKING_LINK,
    message: "Lead captured. Share this booking link so they can pick a time.",
  });
}

// OpenAI path with tool calling. Loops until the model returns a final message.
async function runOpenAIWithTools(
  apiKey: string,
  model: string,
  messages: ChatMessage[]
): Promise<{ message: string; usage: any }> {
  const convo: any[] = [
    { role: "system", content: SYSTEM_PROMPT },
    ...messages.filter((m) => m.role !== "system"),
  ];

  for (let step = 0; step < 3; step++) {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        temperature: 0.3,
        max_tokens: 500,
        messages: convo,
        tools: TOOLS,
        tool_choice: "auto",
      }),
      signal: AbortSignal.timeout(LLM_TIMEOUT_MS),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error");
      console.error("OpenAI API error:", response.status, errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const msg = data.choices?.[0]?.message;
    if (!msg) throw new Error("No message from OpenAI");

    if (Array.isArray(msg.tool_calls) && msg.tool_calls.length > 0) {
      convo.push(msg);
      for (const tc of msg.tool_calls) {
        let result = JSON.stringify({ ok: false, error: "unknown_tool" });
        if (tc.function?.name === "capture_lead") {
          result = await executeCaptureLead(tc.function?.arguments ?? "{}");
        }
        convo.push({ role: "tool", tool_call_id: tc.id, content: result });
      }
      continue; // let the model turn the tool result into a reply
    }

    return { message: msg.content ?? "", usage: data.usage ?? null };
  }

  return {
    message:
      "Sorry, I hit a snag capturing that. You can email info@flowgenixai.com or use the contact page and we'll take care of it.",
    usage: null,
  };
}

export async function GET() {
  const provider = (await getSecret("LLM_PROVIDER")) ?? process.env.LLM_PROVIDER ?? null;
  const hasKey = !!((await getSecret("LLM_API_KEY")) ?? process.env.LLM_API_KEY);
  return Response.json({
    ok: true,
    ready: true,
    llmConfigured: hasKey,
    provider: provider as "OPENAI" | "ANTHROPIC" | "OPENROUTER" | null,
    version: 3,
  });
}

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as { messages?: ChatMessage[] } | null;

  if (!body || !Array.isArray(body.messages)) {
    return Response.json(
      { ok: false, error: "Body must include messages: ChatMessage[]" },
      { status: 400 }
    );
  }

  const messages = body.messages
    .filter((m) => m && typeof m.content === "string" && typeof m.role === "string")
    .map((m) => ({ role: m.role as ChatMessage["role"], content: m.content.trim() }))
    .slice(-30);

  if (!messages.length) {
    return Response.json({ ok: false, error: "No valid messages provided" }, { status: 400 });
  }

  const provider = ((await getSecret("LLM_PROVIDER")) ?? process.env.LLM_PROVIDER ?? null) as
    | "OPENAI"
    | "ANTHROPIC"
    | "OPENROUTER"
    | null;
  const apiKey = (await getSecret("LLM_API_KEY")) ?? process.env.LLM_API_KEY ?? null;
  const model = (await getSecret("LLM_MODEL")) ?? process.env.LLM_MODEL ?? null;

  const llmConfigured = !!apiKey && !!provider;

  const lastUserMessage = [...messages].reverse().find((m) => m.role === "user");
  const userQuery = lastUserMessage?.content ?? "";

  if (!isInDomain(userQuery)) {
    await logOOD(userQuery);
    return Response.json({
      ok: true,
      provider,
      llmConfigured,
      message:
        "I'm here to help with FlowGenixAI, what we build (web and mobile apps, AI voice agents, automation, dashboards), our past work, pricing, and booking a call. What would you like to know?",
      usage: null,
      version: 3,
      refused: true,
    });
  }

  if (!llmConfigured || provider !== "OPENAI" || !apiKey) {
    return Response.json({
      ok: true,
      provider,
      llmConfigured,
      message:
        "The assistant isn't fully configured right now. You can reach us at info@flowgenixai.com or through the contact page.",
      usage: null,
      version: 3,
    });
  }

  const effectiveModel = model || "gpt-4o-mini";

  try {
    const result = await runOpenAIWithTools(apiKey, effectiveModel, messages);
    return Response.json({
      ok: true,
      provider,
      llmConfigured: true,
      message: result.message,
      usage: result.usage,
      version: 3,
    });
  } catch (error: any) {
    if (isTimeoutError(error)) {
      try {
        const result = await runOpenAIWithTools(apiKey, effectiveModel, messages);
        return Response.json({
          ok: true,
          provider,
          llmConfigured: true,
          message: result.message,
          usage: result.usage,
          version: 3,
        });
      } catch (retryError: any) {
        console.error("[chat] retry failed:", retryError);
      }
    }
    console.error("LLM request error:", error);
    return Response.json({
      ok: true,
      error: true,
      message: "I'm having trouble answering right now. Please try again in a moment.",
      usage: null,
      version: 3,
    });
  }
}
