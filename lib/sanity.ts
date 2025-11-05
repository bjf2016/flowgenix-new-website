import { fetchLatest, type PostListItem, type CategoryRef } from './sanity/blog';
import { urlForImage } from './sanity/image';

export interface Post {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  categories?: CategoryRef[];
  imageUrl?: string;
  imageAlt?: string;
}

const MOCK_POSTS: Post[] = [
  {
    title: "How AI Voice Bots Are Transforming Dental Practice Management",
    slug: "ai-voice-bots-dental-practices",
    excerpt: "Discover how automated intake systems are helping dentists capture more appointments while reducing administrative overhead.",
    publishedAt: "2025-09-15",
    categories: [{ title: "Dentists", slug: "dentists" }]
  },
  {
    title: "After-Hours Lead Capture: Never Miss an HVAC Emergency Again",
    slug: "after-hours-hvac-lead-capture",
    excerpt: "Learn how local service businesses are capturing leads 24/7 without hiring night staff.",
    publishedAt: "2025-09-10",
    categories: [{ title: "Local Services", slug: "local-services" }]
  },
  {
    title: "Reducing No-Shows: Restaurant Reservation Automation That Works",
    slug: "restaurant-reservation-automation",
    excerpt: "See how AI-powered waitlist management is helping restaurants maximize seating capacity.",
    publishedAt: "2025-09-05",
    categories: [{ title: "Restaurants", slug: "restaurants" }]
  }
];

export async function fetchLatestPosts(limit: number = 3): Promise<Post[]> {
  const posts = await fetchLatest(limit);

  if (!posts || posts.length === 0) {
    console.log('[Sanity] No posts returned, using mock posts');
    return MOCK_POSTS.slice(0, limit);
  }

  return posts.map((post: PostListItem) => ({
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt || '',
    publishedAt: post.publishedAt || '',
    categories: post.categories,
    imageUrl: post.mainImage?.asset?.url || (post.mainImage?.asset ? urlForImage(post.mainImage.asset).width(800).url() : undefined),
    imageAlt: post.mainImage?.alt || post.title
  }));
}
