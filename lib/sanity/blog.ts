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

const MOCK_BLOG_POSTS: PostListItem[] = [
  {
    title: "How AI Voice Bots Are Transforming Dental Practice Management",
    slug: "ai-voice-bots-dental-practices",
    excerpt: "Discover how automated intake systems are helping dentists capture more appointments while reducing administrative overhead.",
    publishedAt: "2025-09-15",
    categories: [{ title: "Dentists", slug: "dentists" }],
    mainImage: {
      asset: {
        _id: "mock-1",
        url: "https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=800"
      },
      alt: "Dentist using technology"
    }
  },
  {
    title: "After-Hours Lead Capture: Never Miss an HVAC Emergency Again",
    slug: "after-hours-hvac-lead-capture",
    excerpt: "Learn how local service businesses are capturing leads 24/7 without hiring night staff.",
    publishedAt: "2025-09-10",
    categories: [{ title: "Local Services", slug: "local-services" }],
    mainImage: {
      asset: {
        _id: "mock-2",
        url: "https://images.pexels.com/photos/5691542/pexels-photo-5691542.jpeg?auto=compress&cs=tinysrgb&w=800"
      },
      alt: "HVAC technician at work"
    }
  },
  {
    title: "Reducing No-Shows: Restaurant Reservation Automation That Works",
    slug: "restaurant-reservation-automation",
    excerpt: "See how AI-powered waitlist management is helping restaurants maximize seating capacity.",
    publishedAt: "2025-09-05",
    categories: [{ title: "Restaurants", slug: "restaurants" }],
    mainImage: {
      asset: {
        _id: "mock-3",
        url: "https://images.pexels.com/photos/3201921/pexels-photo-3201921.jpeg?auto=compress&cs=tinysrgb&w=800"
      },
      alt: "Restaurant interior"
    }
  }
];

export async function fetchLatest(limit = 3): Promise<PostListItem[]> {
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

  try {
    const allPosts = await client.fetch(PAGED_POSTS_QUERY, {}, { perspective: 'published' });

    let filtered = allPosts && allPosts.length > 0 ? allPosts : MOCK_BLOG_POSTS;

    // Filter by category
    if (params.cat && params.cat !== 'all') {
      filtered = filtered.filter((post: PostListItem) =>
        post.categories?.some(cat => cat.slug === params.cat)
      );
    }

    // Filter by search query
    if (params.q && params.q.trim()) {
      const query = params.q.trim().toLowerCase();
      filtered = filtered.filter((post: PostListItem) =>
        post.title?.toLowerCase().includes(query) ||
        post.excerpt?.toLowerCase().includes(query)
      );
    }

    // Paginate
    const total = filtered.length;
    const from = (page - 1) * limit;
    const to = from + limit;
    const items = filtered.slice(from, to);

    return { items, total };
  } catch (error) {
    console.error('[Sanity] Error fetching posts:', error);
    console.log('[Sanity] Using mock posts as fallback');

    let filtered = MOCK_BLOG_POSTS;

    // Filter by category
    if (params.cat && params.cat !== 'all') {
      filtered = filtered.filter((post: PostListItem) =>
        post.categories?.some(cat => cat.slug === params.cat)
      );
    }

    // Filter by search query
    if (params.q && params.q.trim()) {
      const query = params.q.trim().toLowerCase();
      filtered = filtered.filter((post: PostListItem) =>
        post.title?.toLowerCase().includes(query) ||
        post.excerpt?.toLowerCase().includes(query)
      );
    }

    // Paginate
    const total = filtered.length;
    const from = (page - 1) * limit;
    const to = from + limit;
    const items = filtered.slice(from, to);

    return { items, total };
  }
}

export async function fetchCategories(): Promise<CategoryRef[]> {
  try {
    const categories = await client.fetch(ALL_CATEGORIES_QUERY);
    if (!categories || categories.length === 0) {
      return [
        { title: "Dentists", slug: "dentists" },
        { title: "Local Services", slug: "local-services" },
        { title: "Restaurants", slug: "restaurants" }
      ];
    }
    return categories;
  } catch (error) {
    console.error('[Sanity] Error fetching categories:', error);
    return [
      { title: "Dentists", slug: "dentists" },
      { title: "Local Services", slug: "local-services" },
      { title: "Restaurants", slug: "restaurants" }
    ];
  }
}

export async function fetchPostBySlug(slug: string): Promise<FullBlogPost | null> {
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
