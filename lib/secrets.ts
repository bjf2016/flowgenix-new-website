import "server-only";

const SECRETS_URL =
  "https://fhsacxbpezzrjkkqiyhu.supabase.co/functions/v1/secrets";

const CACHE_TTL_MS = 5 * 60 * 1000;

interface CacheEntry {
  value: string;
  expiresAt: number;
}

const memoryCache = new Map<string, CacheEntry>();

function getCachedValue(key: string): string | undefined {
  const entry = memoryCache.get(key);
  if (!entry) return undefined;
  if (Date.now() > entry.expiresAt) {
    memoryCache.delete(key);
    return undefined;
  }
  return entry.value;
}

function setCachedValue(key: string, value: string): void {
  memoryCache.set(key, { value, expiresAt: Date.now() + CACHE_TTL_MS });
}

async function fetchSecretFromEdgeFunction(
  key: string
): Promise<string | undefined> {
  try {
    const url = `${SECRETS_URL}?key=${encodeURIComponent(key)}`;
    const response = await fetch(url); // no auth needed in dev
    if (!response.ok) return undefined;
    const result = await response.json(); // { data: { value: "..." } }
    return result.data?.value;
  } catch (error) {
    console.error(`Error fetching secret "${key}":`, error);
    return undefined;
  }
}

export async function getSecret(key: string): Promise<string | undefined> {
  const envValue = process.env[key];
  if (envValue !== undefined) return envValue;

  const cachedValue = getCachedValue(key);
  if (cachedValue !== undefined) return cachedValue;

  const fetchedValue = await fetchSecretFromEdgeFunction(key);
  if (fetchedValue !== undefined) {
    setCachedValue(key, fetchedValue);
    return fetchedValue;
  }
  return undefined;
}

export async function getRequiredSecret(key: string): Promise<string> {
  const value = await getSecret(key);
  if (value === undefined) {
    throw new Error(`Required secret "${key}" not found`);
  }
  return value;
}
