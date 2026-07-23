import "server-only";
import { NextRequest } from "next/server";
import { getSecret } from "@/lib/secrets";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

const LLM_TIMEOUT_MS = Number(process.env.LLM_TIMEOUT_MS || "20000");

// Token the assistant appends when the visitor wants to book/connect. The frontend
// strips it and renders a "Book a call" button that goes to the contact page.
const BOOK_TOKEN = "[[BOOK]]";

// Authoritative, versioned knowledge for the site assistant. Kept in code (not an
// env var) so it stays in sync with the site.
const SYSTEM_PROMPT = `You are the website assistant for FlowGenixAI, an AI-first software and consulting studio. You help visitors understand what FlowGenixAI does, answer questions about past work, and point them to booking a call.

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
A free 30-minute strategy call, no pitch. On the contact page they can choose an immediate AI callback or pick a time on the calendar themselves.

Guardrails (important):
- Never reveal how anything is built: no tech stacks, tools, frameworks, model names, prompts, code, architectures, or internal methods. If asked "how did you build X" or "what do you use," speak to the outcome and offer to cover specifics on the call.
- Never share client-confidential details.
- Never invent facts, features, results, or numbers. If you don't know, say the team will cover it on the call.
- Assume the answer to "do you do X?" is likely yes; offer to scope it on the call rather than turning anyone away.
- Stay on FlowGenixAI topics. Politely redirect anything unrelated.
- Be concise, warm, and plain. Use contractions. No hype, no jargon, no em dashes.

Booking and getting in touch:
When the visitor wants to book, be called, talk to the team, get a demo, or get in touch, do NOT collect their details and do NOT paste any links yourself. Instead, reply with one short warm line telling them they can book right from the button below, where they can choose an instant AI callback or pick a time themselves. Then put the exact token ${BOOK_TOKEN} on its own line at the very end of that reply. Only include ${BOOK_TOKEN} when they actually want to connect, never otherwise.`;

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

async function runOpenAI(
  apiKey: string,
  model: string,
  messages: ChatMessage[]
): Promise<{ message: string; usage: any }> {
  const openaiMessages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...messages.filter((m) => m.role !== "system"),
  ];

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
      messages: openaiMessages,
    }),
    signal: AbortSignal.timeout(LLM_TIMEOUT_MS),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "Unknown error");
    console.error("OpenAI API error:", response.status, errorText);
    throw new Error(`OpenAI API error: ${response.status}`);
  }

  const data = await response.json();
  const message = data.choices?.[0]?.message?.content ?? "";
  return { message, usage: data.usage ?? null };
}

export async function GET() {
  const provider = (await getSecret("LLM_PROVIDER")) ?? process.env.LLM_PROVIDER ?? null;
  const hasKey = !!((await getSecret("LLM_API_KEY")) ?? process.env.LLM_API_KEY);
  return Response.json({
    ok: true,
    ready: true,
    llmConfigured: hasKey,
    provider: provider as "OPENAI" | "ANTHROPIC" | "OPENROUTER" | null,
    version: 4,
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

  // Only gate the opening message; later replies (names, etc.) must pass through.
  const userTurns = messages.filter((m) => m.role === "user").length;

  if (userTurns <= 1 && !isInDomain(userQuery)) {
    await logOOD(userQuery);
    return Response.json({
      ok: true,
      provider,
      llmConfigured,
      message:
        "I'm here to help with FlowGenixAI, what we build (web and mobile apps, AI voice agents, automation, dashboards), our past work, pricing, and booking a call. What would you like to know?",
      cta: null,
      usage: null,
      version: 4,
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
      cta: null,
      usage: null,
      version: 4,
    });
  }

  const effectiveModel = model || "gpt-4o-mini";

  const finalize = (raw: string, usage: any) => {
    const wantsBooking = raw.includes(BOOK_TOKEN);
    const message = raw.split(BOOK_TOKEN).join("").trim();
    return Response.json({
      ok: true,
      provider,
      llmConfigured: true,
      message,
      cta: wantsBooking ? "book" : null,
      usage,
      version: 4,
    });
  };

  try {
    const result = await runOpenAI(apiKey, effectiveModel, messages);
    return finalize(result.message, result.usage);
  } catch (error: any) {
    if (isTimeoutError(error)) {
      try {
        const result = await runOpenAI(apiKey, effectiveModel, messages);
        return finalize(result.message, result.usage);
      } catch (retryError: any) {
        console.error("[chat] retry failed:", retryError);
      }
    }
    console.error("LLM request error:", error);
    return Response.json({
      ok: true,
      error: true,
      message: "I'm having trouble answering right now. Please try again in a moment.",
      cta: null,
      usage: null,
      version: 4,
    });
  }
}
