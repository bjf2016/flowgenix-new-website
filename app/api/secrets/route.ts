import { NextRequest } from "next/server";
import { getSecret, setSecret, listSecrets } from "@/lib/secrets";

function checkAuth(req: NextRequest): boolean {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return false;

  const token = authHeader.replace(/^Bearer\s+/i, "");
  const adminToken = process.env.ADMIN_TOKEN;

  if (!adminToken) return false;
  return token === adminToken;
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const items = await listSecrets();
    return Response.json({ items });
  } catch (error: any) {
    return Response.json({ error: error.message || "Internal error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { key, value } = body;

    if (!key || typeof key !== "string" || key.trim() === "") {
      return Response.json({ error: "Key is required and must be a non-empty string" }, { status: 400 });
    }

    if (!value || typeof value !== "string" || value.trim() === "") {
      return Response.json({ error: "Value is required and must be a non-empty string" }, { status: 400 });
    }

    await setSecret(key, value);
    return Response.json({ ok: true });
  } catch (error: any) {
    return Response.json({ error: error.message || "Internal error" }, { status: 500 });
  }
}
