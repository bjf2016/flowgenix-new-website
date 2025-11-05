export const runtime = 'nodejs';

export async function GET() {
  const keys = [
    'SANITY_PROJECT_ID',
    'SANITY_DATASET',
    'SANITY_API_VERSION',
    'SANITY_READ_TOKEN',
    'NEXT_PUBLIC_SANITY_PROJECT_ID',
    'NEXT_PUBLIC_SANITY_DATASET',
  ];
  const result = Object.fromEntries(
    keys.map(k => [k, Boolean(process.env[k])])
  );
  return new Response(JSON.stringify(result, null, 2), {
    headers: { 'content-type': 'application/json' },
  });
}
