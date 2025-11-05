import { sanityClient } from './client';
import { urlForImage } from './image';
import { POSTS_QUERY, POSTS_COUNT_QUERY, CATEGORIES_QUERY, POST_BY_SLUG_QUERY } from './queries';

export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  category?: string;
  categorySlug?: string;
  imageUrl?: string;
  imageAlt?: string;
}

export interface FullBlogPost extends BlogPost {
  author?: string;
  categories?: string[];
  body?: any;
}

export interface Category {
  title: string;
  slug: string;
}

export interface FetchPostsParams {
  q?: string;
  cat?: string;
  page?: number;
  limit?: number;
}

export interface FetchPostsResult {
  items: BlogPost[];
  total: number;
}

export async function fetchPosts({
  q = '',
  cat = '',
  page = 1,
  limit = 9
}: FetchPostsParams = {}): Promise<FetchPostsResult> {
  const projectId = process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET;

  if (!projectId || !dataset) {
    return { items: [], total: 0 };
  }

  try {
    const searchQuery = q ? `*${q}*` : '';
    const offset = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      sanityClient.fetch(`${POSTS_QUERY}[${offset}...${offset + limit}]`, {
        q: searchQuery,
        cat: cat || ''
      }),
      sanityClient.fetch(POSTS_COUNT_QUERY, {
        q: searchQuery,
        cat: cat || ''
      })
    ]);

    const items = posts.map((post: any) => ({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      publishedAt: post.publishedAt,
      category: post.category,
      categorySlug: post.categorySlug,
      imageUrl: post.mainImage?.asset?.url || (post.mainImage?.asset ? urlForImage(post.mainImage.asset).width(800).url() : undefined),
      imageAlt: post.mainImage?.alt || post.title
    }));

    return { items, total };
  } catch (error) {
    console.error('[Sanity] Error fetching posts:', error);
    return { items: [], total: 0 };
  }
}

export async function fetchCategories(): Promise<Category[]> {
  const projectId = process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET;

  if (!projectId || !dataset) {
    return [];
  }

  try {
    const categories = await sanityClient.fetch(CATEGORIES_QUERY);
    return categories;
  } catch (error) {
    console.error('[Sanity] Error fetching categories:', error);
    return [];
  }
}

export async function fetchPostBySlug(slug: string): Promise<FullBlogPost | null> {
  const projectId = process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET;

  if (!projectId || !dataset) {
    return null;
  }

  try {
    const post = await sanityClient.fetch(POST_BY_SLUG_QUERY, { slug });

    if (!post) {
      return null;
    }

    return {
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      publishedAt: post.publishedAt,
      author: post.author,
      categories: post.categories,
      imageUrl: post.mainImage?.asset?.url || (post.mainImage?.asset ? urlForImage(post.mainImage.asset).width(1200).url() : undefined),
      imageAlt: post.mainImage?.alt || post.title,
      body: post.body
    };
  } catch (error) {
    console.error('[Sanity] Error fetching post by slug:', error);
    return null;
  }
}
