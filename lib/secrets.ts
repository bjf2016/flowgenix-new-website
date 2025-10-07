import "server-only";

const SUPABASE_EDGE_SECRETS_URL = "https://fhsacxbpezzrjkkqiyhu.supabase.co/functions/v1/secrets";

function normalizeKey(key: string): string {
  return key.trim().toUpperCase();
}

export async function getSecret(key: string): Promise<string | null> {
  const normalizedKey = normalizeKey(key);

  const envValue = process.env[normalizedKey];
  if (envValue !== undefined) return envValue;

  try {
    const response = await fetch(SUPABASE_EDGE_SECRETS_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ op: "get", key: normalizedKey }),
    });

    if (!response.ok) return null;

    const result = await response.json();
    return result.value || null;
  } catch (error) {
    console.error(`Error fetching secret "${normalizedKey}":`, error);
    return null;
  }
}

export async function setSecret(key: string, value: string): Promise<void> {
  const normalizedKey = normalizeKey(key);

  const response = await fetch(SUPABASE_EDGE_SECRETS_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ op: "upsert", key: normalizedKey, value: value.trim() }),
  });

  if (!response.ok) {
    throw new Error(`Failed to set secret: ${response.statusText}`);
  }
}

export async function listSecrets(): Promise<Array<{ key: string; updated_at?: string }>> {
  try {
    const response = await fetch(SUPABASE_EDGE_SECRETS_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ op: "list" }),
    });

    if (!response.ok) {
      throw new Error(`Failed to list secrets: ${response.statusText}`);
    }

    const result = await response.json();
    return result.items || [];
  } catch (error) {
    console.error("Error listing secrets:", error);
    return [];
  }
}
