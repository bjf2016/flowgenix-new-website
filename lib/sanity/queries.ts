export const LATEST_POSTS_QUERY = `
  *[_type == "post"] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    "category": category->title,
    mainImage {
      asset->{_id, url},
      alt
    }
  }[0...$limit]
`;
