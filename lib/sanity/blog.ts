import { client } from './client';
import { LATEST_POSTS_QUERY, PAGED_POSTS_QUERY, ALL_CATEGORIES_QUERY, POST_BY_SLUG_QUERY } from './queries';

export type CategoryRef = { title: string; slug: string };

export type PostListItem = {
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  categories?: CategoryRef[];
  mainImage?: { asset?: { _id: string; url?: string }; alt?: string };
};

export type FullBlogPost = PostListItem & {
  content?: any;
  body?: any; // Keep for backwards compatibility
};

export async function fetchLatest(limit = 3): Promise<PostListItem[]> {
  const { SANITY_PROJECT_ID, SANITY_DATASET, SANITY_API_VERSION } = process.env;
  if (!SANITY_PROJECT_ID || !SANITY_DATASET || !SANITY_API_VERSION) return [];
  try {
    return await client.fetch(LATEST_POSTS_QUERY, { limit });
  } catch (error) {
    console.error('[Sanity] Error fetching latest posts:', error);
    return [];
  }
}

export async function fetchPosts(params: { q?: string; cat?: string; page?: number; limit?: number }) {
  const page = Math.max(1, params.page ?? 1);
  const limit = Math.max(1, params.limit ?? 9);
  const from = (page - 1) * limit;
  const to = from + limit;

  const vars: any = { from, to };
  if (params.q && params.q.trim()) {
    vars.q = `${params.q.trim()}*`;
  }
  if (params.cat && params.cat !== 'all') {
    vars.cat = params.cat;
  }

  try {
    const res = await client.fetch(PAGED_POSTS_QUERY, vars, { perspective: 'published' });
    return res as { items: PostListItem[]; total: number };
  } catch (error) {
    console.error('[Sanity] Error fetching posts:', error);
    return { items: [], total: 0 };
  }
}

export async function fetchCategories(): Promise<CategoryRef[]> {
  try {
    return await client.fetch(ALL_CATEGORIES_QUERY);
  } catch (error) {
    console.error('[Sanity] Error fetching categories:', error);
    return [];
  }
}

export async function fetchPostBySlug(slug: string): Promise<FullBlogPost | null> {
  const { SANITY_PROJECT_ID, SANITY_DATASET, SANITY_API_VERSION } = process.env;
  if (!SANITY_PROJECT_ID || !SANITY_DATASET || !SANITY_API_VERSION) {
    console.warn('[Sanity] Missing environment variables for fetchPostBySlug');
    return null;
  }

  try {
    const post = await client.fetch(POST_BY_SLUG_QUERY, { slug });
    if (!post) return null;
    // Map content to body for PortableText compatibility
    if (post.content && !post.body) {
      post.body = post.content;
    }
    return post as FullBlogPost;
  } catch (error) {
    console.error('[Sanity] Error fetching post by slug:', error);
    return null;
  }
}
