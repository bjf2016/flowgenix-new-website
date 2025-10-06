import "server-only";

const SECRETS_URL = "https://0ec90b57d6e95fcbda19832f.supabase.co/functions/v1/secrets";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJib2x0IiwicmVmIjoiMGVjOTBiNTdkNmU5NWZjYmRhMTk4MzJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4ODE1NzQsImV4cCI6MTc1ODg4MTU3NH0.9I8-U0x86Ak8t2DGaIk0HfvTSLsAyzdnz-Nw00mMkKw";

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
  memoryCache.set(key, {
    value,
    expiresAt: Date.now() + CACHE_TTL_MS,
  });
}

async function fetchSecretFromEdgeFunction(key: string): Promise<string | undefined> {
  try {
    const url = `${SECRETS_URL}?key=${encodeURIComponent(key)}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return undefined;
      }
      throw new Error(`Failed to fetch secret: ${response.statusText}`);
    }

    const result = await response.json();
    return result.data?.value;
  } catch (error) {
    console.error(`Error fetching secret "${key}":`, error);
    return undefined;
  }
}

export async function getSecret(key: string): Promise<string | undefined> {
  const envValue = process.env[key];
  if (envValue !== undefined) {
    return envValue;
  }

  const cachedValue = getCachedValue(key);
  if (cachedValue !== undefined) {
    return cachedValue;
  }

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
    throw new Error(`Required secret "${key}" not found in environment, cache, or database`);
  }
  return value;
}
