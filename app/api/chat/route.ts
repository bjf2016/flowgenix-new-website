import "server-only";
import { NextRequest } from "next/server";
import { getSecret } from "@/lib/secrets";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

const IN_DOMAIN_KEYWORDS = [
  "ai", "automation", "workflow", "chatbot", "voice agent", "retell", "n8n",
  "lead intake", "dentist", "orthodontic", "local service", "pricing", "booking",
  "contact", "website", "flowgenixai", "consulting", "smb", "sacramento",
  "integration", "cal.com", "twilio", "flowgenix", "service", "appointment",
  "schedule", "intake", "qualification", "qualify", "bot", "agent", "call",
  "phone", "customer", "client", "business"
];

function isInDomain(text: string): boolean {
  const lower = text.toLowerCase();
  return IN_DOMAIN_KEYWORDS.some(keyword => lower.includes(keyword));
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

export async function GET() {
  const provider = (await getSecret("LLM_PROVIDER")) ?? process.env.LLM_PROVIDER ?? null;
  const hasKey = !!((await getSecret("LLM_API_KEY")) ?? process.env.LLM_API_KEY);
  return Response.json({
    ok: true,
    ready: true,
    llmConfigured: hasKey,
    provider: provider as "OPENAI" | "ANTHROPIC" | "OPENROUTER" | null,
    version: 2,
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null) as
    | { messages?: ChatMessage[] }
    | null;

  if (!body || !Array.isArray(body.messages)) {
    return Response.json({ ok: false, error: "Body must include messages: ChatMessage[]" }, { status: 400 });
  }

  const messages = body.messages
    .filter((m) => m && typeof m.content === "string" && typeof m.role === "string")
    .map((m) => ({ role: m.role as ChatMessage["role"], content: m.content.trim() }))
    .slice(-30);

  if (!messages.length) {
    return Response.json({ ok: false, error: "No valid messages provided" }, { status: 400 });
  }

  const provider = ((await getSecret("LLM_PROVIDER")) ?? process.env.LLM_PROVIDER ?? null) as "OPENAI" | "ANTHROPIC" | "OPENROUTER" | null;
  const apiKey = (await getSecret("LLM_API_KEY")) ?? process.env.LLM_API_KEY ?? null;
  const model = (await getSecret("LLM_MODEL")) ?? process.env.LLM_MODEL ?? null;
  const systemPrompt = (await getSecret("LLM_SYSTEM_PROMPT")) ?? process.env.LLM_SYSTEM_PROMPT ?? "You are FlowGenixAI's assistant focused on our services, pricing, lead intake, and booking.";

  const llmConfigured = !!apiKey && !!provider;

  const lastUserMessage = [...messages].reverse().find(m => m.role === "user");
  const userQuery = lastUserMessage?.content ?? "";

  if (!isInDomain(userQuery)) {
    await logOOD(userQuery);
    return Response.json({
      ok: true,
      provider,
      llmConfigured,
      message: "I can help with FlowGenixAI's services (AI voice/chat for dentists and local services, intake, qualification, booking). What would you like to know?",
      usage: null,
      version: 2,
      refused: true,
    });
  }

  if (!llmConfigured) {
    return Response.json({
      ok: true,
      provider,
      llmConfigured: false,
      message: "LLM is not configured yet. Please set LLM_PROVIDER and LLM_API_KEY.",
      usage: null,
      version: 2,
    });
  }

  try {
    if (provider === "OPENAI") {
      const effectiveModel = model || "gpt-4o-mini";
      const userMessages = messages.filter(m => m.role !== "system");
      const openaiMessages = [
        { role: "system", content: systemPrompt },
        ...userMessages
      ];

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: effectiveModel,
          temperature: 0.3,
          max_tokens: 400,
          messages: openaiMessages,
        }),
        signal: AbortSignal.timeout(8000),
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => "Unknown error");
        console.error("OpenAI API error:", response.status, errorText);
        return Response.json({
          ok: true,
          error: true,
          status: response.status,
          message: "I'm having trouble answering right now. Please try again.",
          usage: null,
          version: 2,
        });
      }

      const data = await response.json();
      const assistantMessage = data.choices?.[0]?.message?.content ?? "No response";
      const usage = data.usage ?? null;

      return Response.json({
        ok: true,
        provider,
        llmConfigured: true,
        message: assistantMessage,
        usage,
        version: 2,
      });
    } else if (provider === "ANTHROPIC") {
      const effectiveModel = model || "claude-3-haiku-20240307";
      const anthropicMessages = messages
        .filter(m => m.role !== "system")
        .map(m => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.content }));

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: effectiveModel,
          temperature: 0.3,
          max_tokens: 400,
          system: systemPrompt,
          messages: anthropicMessages,
        }),
        signal: AbortSignal.timeout(8000),
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => "Unknown error");
        console.error("Anthropic API error:", response.status, errorText);
        return Response.json({
          ok: true,
          error: true,
          status: response.status,
          message: "I'm having trouble answering right now. Please try again.",
          usage: null,
          version: 2,
        });
      }

      const data = await response.json();
      const assistantMessage = data.content?.[0]?.text ?? "No response";
      const usage = data.usage ?? null;

      return Response.json({
        ok: true,
        provider,
        llmConfigured: true,
        message: assistantMessage,
        usage,
        version: 2,
      });
    } else if (provider === "OPENROUTER") {
      const effectiveModel = model || "openrouter/auto";
      const baseUrl = process.env.OPENROUTER_BASE_URL || "https://openrouter.ai/api/v1";
      const siteUrl = process.env.OPENROUTER_SITE_URL;
      const appName = process.env.OPENROUTER_APP_NAME;

      const userMessages = messages.filter(m => m.role !== "system");
      const openRouterMessages = [
        { role: "system", content: systemPrompt },
        ...userMessages
      ];

      const headers: Record<string, string> = {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      };

      if (siteUrl) headers["HTTP-Referer"] = siteUrl;
      if (appName) headers["X-Title"] = appName;

      const response = await fetch(`${baseUrl}/chat/completions`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          model: effectiveModel,
          temperature: 0.3,
          max_tokens: 400,
          messages: openRouterMessages,
        }),
        signal: AbortSignal.timeout(8000),
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => "Unknown error");
        console.error("OpenRouter API error:", response.status, errorText);
        return Response.json({
          ok: true,
          provider,
          llmConfigured: true,
          error: true,
          status: response.status,
          message: "I'm having trouble answering right now. Please try again.",
          usage: null,
          version: 2,
        });
      }

      const data = await response.json();
      const assistantMessage = data.choices?.[0]?.message?.content ?? "No response";
      const usage = data.usage ?? null;

      return Response.json({
        ok: true,
        provider,
        llmConfigured: true,
        message: assistantMessage,
        usage,
        version: 2,
      });
    } else {
      return Response.json({
        ok: true,
        provider,
        llmConfigured: false,
        message: "Invalid LLM_PROVIDER. Must be OPENAI, ANTHROPIC, or OPENROUTER.",
        usage: null,
        version: 2,
      });
    }
  } catch (error: any) {
    console.error("LLM request error:", error);
    return Response.json({
      ok: true,
      error: true,
      status: undefined,
      message: "I'm having trouble answering right now. Please try again.",
      usage: null,
      version: 2,
    });
  }
}
