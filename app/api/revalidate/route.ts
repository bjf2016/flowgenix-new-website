import 'server-only';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get('secret');

  if (!secret || secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return new Response('Unauthorized', { status: 401 });
  }

  let body: any = {};
  try {
    body = await req.json();
  } catch (_) {
    // no body is fine
  }

  // Try to extract slug from common Sanity webhook shapes
  const slug =
    body?.slug?.current ||
    body?.slug ||
    body?.document?.slug?.current ||
    body?.transition?.slug?.current ||
    null;

  // Always revalidate the list pages
  revalidatePath('/');
  revalidatePath('/blog');
  revalidateTag('home:posts');

  // Revalidate the specific post page if we can detect it
  if (slug) {
    revalidatePath(`/blog/${slug}`);
  }

  return Response.json({ revalidated: true, slug: slug || null, ts: Date.now() });
}
