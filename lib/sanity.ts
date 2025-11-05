import { sanityClient } from './sanity/client';
import { urlForImage } from './sanity/image';
import { LATEST_POSTS_QUERY } from './sanity/queries';

export interface Post {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  category?: string;
  imageUrl?: string;
  imageAlt?: string;
}

const MOCK_POSTS: Post[] = [
  {
    title: "How AI Voice Bots Are Transforming Dental Practice Management",
    slug: "ai-voice-bots-dental-practices",
    excerpt: "Discover how automated intake systems are helping dentists capture more appointments while reducing administrative overhead.",
    publishedAt: "2025-09-15",
    category: "Dentists"
  },
  {
    title: "After-Hours Lead Capture: Never Miss an HVAC Emergency Again",
    slug: "after-hours-hvac-lead-capture",
    excerpt: "Learn how local service businesses are capturing leads 24/7 without hiring night staff.",
    publishedAt: "2025-09-10",
    category: "Local Services"
  },
  {
    title: "Reducing No-Shows: Restaurant Reservation Automation That Works",
    slug: "restaurant-reservation-automation",
    excerpt: "See how AI-powered waitlist management is helping restaurants maximize seating capacity.",
    publishedAt: "2025-09-05",
    category: "Restaurants"
  }
];

export async function fetchLatestPosts(limit: number = 3): Promise<Post[]> {
  const projectId = process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET;

  if (!projectId || !dataset) {
    console.log('[Sanity] Missing environment variables, returning mock posts');
    return MOCK_POSTS.slice(0, limit);
  }

  try {
    const posts = await sanityClient.fetch(LATEST_POSTS_QUERY, { limit });

    return posts.map((post: any) => ({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      publishedAt: post.publishedAt,
      category: post.category,
      imageUrl: post.mainImage?.asset?.url || (post.mainImage?.asset ? urlForImage(post.mainImage.asset).width(800).url() : undefined),
      imageAlt: post.mainImage?.alt || post.title
    }));
  } catch (error) {
    console.error('[Sanity] Error fetching posts:', error);
    return MOCK_POSTS.slice(0, limit);
  }
}
