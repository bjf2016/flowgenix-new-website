// app/api/_diag/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const hasAdmin = !!(process.env.ADMIN_TOKEN && process.env.ADMIN_TOKEN.length);
  const hasService = !!(process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.SUPABASE_SERVICE_ROLE_KEY.length);
  return Response.json({
    runtime: "nodejs",
    has_ADMIN_TOKEN: hasAdmin,
    has_SUPABASE_SERVICE_ROLE_KEY: hasService
  });
}
