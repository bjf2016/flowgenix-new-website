import { unstable_cache } from 'next/cache';
import { client } from '@/lib/sanity/client';

async function _getLatestPostsRaw() {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc)[0...3]{
       title, slug, excerpt, publishedAt,
       "coverImage": mainImage{asset->},
       categories[]->{title}
     }`
  );
}

export const getLatestPosts = unstable_cache(_getLatestPostsRaw, ['home:posts'], {
  revalidate: 60,
  tags: ['home:posts']
});
