import "server-only";
import { NextRequest } from "next/server";
import { getSecret } from "@/lib/secrets";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ChatMessage = { role: "system" | "user" | "assistant" | "tool"; content: string };

function bad(status: number, msg: string) {
  return Response.json({ ok: false, error: msg }, { status });
}

export async function GET() {
  const provider = (await getSecret("LLM_PROVIDER")) ?? process.env.LLM_PROVIDER ?? null;
  const hasKey = !!((await getSecret("LLM_API_KEY")) ?? process.env.LLM_API_KEY);
  return Response.json({
    ok: true,
    ready: true,
    llmConfigured: hasKey,
    provider,
    version: 1,
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null) as
    | { messages?: ChatMessage[]; meta?: Record<string, any> }
    | null;
  if (!body || !Array.isArray(body.messages)) {
    return bad(400, "Body must include messages: ChatMessage[]");
  }
  const messages = body.messages
    .filter((m) => m && typeof m.content === "string" && typeof m.role === "string")
    .map((m) => ({ role: m.role as ChatMessage["role"], content: m.content.trim() }))
    .slice(-30);

  if (!messages.length) return bad(400, "No valid messages provided");

  const provider = (await getSecret("LLM_PROVIDER")) ?? process.env.LLM_PROVIDER ?? null;
  const hasKey = !!((await getSecret("LLM_API_KEY")) ?? process.env.LLM_API_KEY);

  const assistant: ChatMessage = {
    role: "assistant",
    content:
      "Chat endpoint online. LLM is not enabled yet (skeleton). Proceed to Step D/E to turn it on.",
  };

  return Response.json({
    ok: true,
    llmConfigured: hasKey,
    provider,
    message: assistant,
    echo: { lastUser: messages.reverse().find((m) => m.role === "user") ?? null },
    usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
    version: 1,
    timestamp: new Date().toISOString(),
  });
}
